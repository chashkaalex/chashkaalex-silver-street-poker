const users = require('../../server-script/users/users');
const gameVars = require('../../server-script/game/game-variables');
//const bettingPot = gameVars.bettingPot.get();
const handPot = gameVars.handPot.get();
const hand = require('../../server-script/cards/hand-eval');


module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('send user name', (userName) => {
            if(userName === '') {
                console.log('Lost the username, reconnecting');
                io.to(socket.id).emit('relogin', 'please relogin');
            } else if (userName === 'game manager')  {
                gameVars.managerSocket.set(socket.id);
                console.log('Game manager connected'.green);
            } else if (users.connectUser({userName, id: socket.id})==='user is connected') {
                console.log('user with this name is already connected, redirecting');
                gameVars.landingMessage.set('User with that name is already connected, please choose another.');
                io.to(socket.id).emit('relogin', 'please relogin');
            } else {
                console.log(`${userName} is now connected`.green);
                const msg = `Everyone, please, welcome ${userName}!`
                io.emit('updating users', {users: users.getUsersPublicData(), handPot, msg});
                console.log('Rerendered on connection'.yellow);
                const thisPlayer = users.getAllUsers().find(player => player.userName === userName);
                if(thisPlayer.hasCards) {
                    const evaledHand = hand.evaluateHand(thisPlayer.currentHand);
                    io.to(thisPlayer.id).emit('dealing hole cards', {userHoleCards: thisPlayer.currentHand, evaledHand: evaledHand.string});
                    if(thisPlayer.acting) {
                        io.to(thisPlayer.id).emit('time to act', `ACT`);
                    }
                }
            }
          });    
      });
};