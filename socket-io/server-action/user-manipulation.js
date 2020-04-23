const users = require('../../server-script/users/users');
const gameVars = require('../../server-script/game/game-variables');

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('remove user', rmUserName => {
            if(socket.id === gameVars.managerSocket.get()) {
                console.log('user to remove: ', rmUserName );
                const idToRemove = users.removeUser(rmUserName);
                if(idToRemove) {
                    console.log('id to remove is ', idToRemove);
                    gameVars.landingMessage.set('You have been removed from the game by game manager.');
                    io.to(idToRemove).emit('relogin', 'please relogin');                
                    console.log(`Successfully removed ${rmUserName}`.red);
                } else {
                    console.log('Name not found');
                }
                
                io.emit('updating users', {users: users.getUsersPublicData(), handPot: gameVars.handPot.get()});
            }
            else {
                console.log('Management hacking detected');
                return;
            }
          });   
          
          socket.on('toggle game lock', () => {
            if(socket.id === gameVars.managerSocket.get()) {
                const gameLock = gameVars.gamelock.toggle();
                if(gameLock) {
                    console.log('Game is now locked'.magenta);
                } else {
                    console.log('Game is now unlocked'.green);
                }
            }
            else {
                console.log('Management hacking detected');
                return;
            }
          }); 

          socket.on('rebuy user', (rebuyUserName) => {
            if(socket.id === gameVars.managerSocket.get()) {
                users.rebuyUser(rebuyUserName);
            }
            else {
                console.log('Management hacking detected');
                return;
            }
            io.emit('updating users', {users: users.getUsersPublicData(), handPot: gameVars.handPot.get()});
          }); 
    });
};