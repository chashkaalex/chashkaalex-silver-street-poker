//Game functions
const users = require('../../server-script/users/users');
const hand = require('../../server-script/cards/hand-eval');
const game = require('../../server-script/game/game');
const gameVars = require('../../server-script/game/game-variables');
const allIn = require('../../server-script/game/all-in');



module.exports = function(io) {
    io.on('connection', (socket) => {
        
        //Action modules
        const foldAction = require('./fold');
        const allInAction = require('./all-in');

        //Sub-modules
        const lastPlayer = require('./cases/last-player');
        const roundEnded = require('./cases/round-ended');
                
        socket.on('player acted', (actionObj) => {
            //Destructuring the action
            let {act, bet, name, raise} = actionObj;
            
            //Getting game variables
            let allUsers = users.getAllUsers();
            let activePlayers = users.getActivePlayers();
            let bettingPlayers = users.getBettingPlayers();
            let thisPlayer = activePlayers.find(player => player.id === socket.id);

            //Dealing with action of the temporarily disconnected user
            if(!thisPlayer) {
                console.log('This player lost his name, trying to user the name property.');
                if (users.connectUser({userName: name, id: socket.id})==='user is connected') {
                    console.log('user with this name is already connected, redirecting');
                    landingMessage = 'User with that name is already connected, please choose another.';
                    io.to(socket.id).emit('relogin', 'please relogin');                    
                } else {
                    thisPlayer = allUsers.find(player => player.userName === name);
                   if(thisPlayer.hasCards) {
                       const evaledHand = hand.evaluateHand(thisPlayer.currentHand);
                       io.to(thisPlayer.id).emit('dealing hole cards', {userHoleCards: thisPlayer.currentHand, evaledHand: evaledHand.string});
                       if(thisPlayer.acting) {
                        io.to(thisPlayer.id).emit('time to act', `ACT`);
                       }
                   }
                }
                return;
            }
            
            console.log(thisPlayer.userName.blue + ': ' + act.green);
            
            //Checking if it is the right turn
            if(!thisPlayer.acting) {
                console.log('hacking detected');
                return;
            } else {
                thisPlayer.acting = false;
            }

            let handPot = gameVars.handPot.get();
            let nextPlayer = game.getNextPlayerById(bettingPlayers, socket.id);
            let msg = ''; 
            

            //If there was a raise - resetting the 'acted' property
            if(raise) {
                game.updateOnRaise(thisPlayer);
            }
            
            //Action cases:
            let proceed = true;
            switch(act){
                case 'fold':
                    proceed = foldAction(io, socket);
                    msg = `${thisPlayer.userName} folded`;
                    if(!proceed) {
                        io.emit('updating users', {users: users.getPlayersData(), handPot: gameVars.handPot.get(), msg});
                        return;
                    }
                    break;
                case 'all in':
                    proceed = allInAction(io, socket, bet);
                    msg = `${thisPlayer.userName}: All in, (${bet})!`;
                    if(!proceed) {
                        io.emit('updating users', {users: users.getPlayersData(), handPot: gameVars.handPot.get(), msg});
                        return;
                    } 
                    break;
                default:
                    thisPlayer.stack -= bet;
                    thisPlayer.roundBet += bet;     
                    thisPlayer.acted = true;
                    if(bet === 0) {
                        //console.log('user checked');
                        msg = `${thisPlayer.userName}: check`;
                    } else {
                        //console.log('user didnt fold, betting');
                        msg = `${thisPlayer.userName}: ${act}( ${bet})`;
                    }
                    
                    bettingPlayers = users.getBettingPlayers();
                    if(bettingPlayers.length === 1) {
                        const last = bettingPlayers[0];
                        const maxBet = game.getMaxBet();
                        if(last.acted || last.roundBet === maxBet){                    
                            lastPlayer(io);
                            //Reset the betting pot and do last renders:
                            io.emit('updating users', {users: users.getPlayersData(), handPot: gameVars.handPot.get(), msg});
                            console.log('Rerendered on "last player" after bet'.yellow);
                            return;
                        }
                    } 
                    break;
            }
            
            if (game.roundEndCheck()) {  
                console.log('BETTING ROUND IS COMPLETE'.green);
                if(!roundEnded(io)) { 
                    console.log('the hand has ended!');
                    return; 
                }
                
                //Updating all-in ques if necessary and moving the bets to the hand pot:
                allIn.updatePotsAndQues()
                handPot = gameVars.handPot.get();
                io.emit('updating users', {users: users.getPlayersData(), handPot, msg: undefined});
                console.log('Rerendered on round end'.yellow);
                console.log(`handpot is now ${handPot}`);
                nextPlayer = users.getNextToDealer();
            } 

            //Setting game variables
            // console.log('Updated hand pot: ', handPot);
            // gameVars.handPot.set(handPot);
            nextPlayer.acting = true;
            console.log(`Next player is ${nextPlayer.userName}`);
            io.emit('updating users', {users: users.getPlayersData(), handPot, msg});
            console.log('Rerendered on action end'.yellow);
            io.to(nextPlayer.id).emit('time to act', `ACT`);
        });    
    });
};