const gameVars = require('../../server-script/game/game-variables');
const game     = require('../../server-script/game/game');
const users    = require('../../server-script/users/users');

const allInAction = (io, socket, bet) => {
    let activePlayers = users.getActivePlayers();
    let bettingPlayers = users.getBettingPlayers();
    const thisPlayer = activePlayers.find(player => player.id === socket.id);

    const lastPlayer = require('./cases/last-player');
    const everyoneAllIn = require('./cases/everyone-all-in');

    //let bettingPot = gameVars.bettingPot.get();

    game.updateOnAllIn(thisPlayer, bet);

                
    //check if all the players are now 'all-in':
    if (activePlayers.every(user => user.isAllIn)) {
        console.log('Everyone are all in!!!!!');
        everyoneAllIn(io);
        gameVars.handIsRunning.set(false);
        return false;
    }
    
    //Check if everyone folded except the winner, no showdown except all-ins
    bettingPlayers = users.getBettingPlayers();
    if(bettingPlayers.length === 1) {
        const last = bettingPlayers[0]
        // let bettingPlayerActed = game.playerActed(last, bettingPot);
        // let bettingPlayerBet = game.getPlayerBet(last, bettingPot);
        let maxBet = game.getMaxBet();
        // if(bettingPlayerActed ||  bettingPlayerBet >= maxBet){                    
        //     lastPlayer(io);
        //     return false;
        // }

        //NEW WAY
        if(last.acted || last.roundBet === maxBet) {
            lastPlayer(io);
            return false;
        }      
    }
    

    return true;
};

module.exports = allInAction;