const users = require('../../server-script/users/users');
const gameVars = require('../../server-script/game/game-variables');

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log(`New user connected, user id is ${socket.id}`);
        io.to(socket.id).emit('ask user name', `what is your name, ${socket.id}?`);

        socket.on('disconnect', () => {
            if(socket.id === gameVars.managerSocket.get()) {
                console.log('Game manager disconnected'.red);
                gameVars.managerSocket.set(undefined);
            } else {
                const thisUser = users.getUserFromId(socket.id);
                if(thisUser) {
                    console.log(`${thisUser.userName} disconnected.`.red);
                }
                users.disconnectUser(socket.id);
                io.emit('updating users', {users: users.getPlayersData(), handPot: gameVars.handPot.get()});
            }
        });
    });
};