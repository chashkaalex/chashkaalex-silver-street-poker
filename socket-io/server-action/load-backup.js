const users = require('../../server-script/users/users');
const gameVars = require('../../server-script/game/game-variables');

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('load backup', () => {
            console.log("Starting backup load process.")
            const backup = gameVars.usersBackup.get();
            if(backup.length) {
                console.log('Backup is present'.green);
                //console.log(backup);
                users.setAllUsers(backup);
                users.resetUsersState();
                gameVars.handIsRunning.set(false);
                const handPot = gameVars.handPot.get();
                io.emit('updating users', {users: users.getUsersPublicData(), handPot, msg: 'loading backup.'});
            } else {
                console.log('There is no backup to use');
                return;
            }
        });
      });
};