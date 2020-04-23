const gameVars = require('../../server-script/game/game-variables');
const game     = require('../../server-script/game/game');
const users    = require('../../server-script/users/users');

const foldAction = (io, socket) => {
    //Sub-modules
    const lastPlayer = require('./cases/last-player');
    const everyoneAllIn = require('./cases/everyone-all-in');

    //Variables
    let activePlayers = users.getActivePlayers();
    let bettingPlayers = users.getBettingPlayers();
    const thisPlayer = activePlayers.find(player => player.id === socket.id);
    let foldCounter = gameVars.foldCounter.get();
    
    //Updating the counter and commencing Peru animation
    console.log('foldCounter was ', foldCounter);
    foldCounter++;
    console.log('foldCounter now is ', foldCounter);
    if(foldCounter > 2) {
        console.log('emitting animation');
        io.emit('show animation', 'peruTrain');
        foldCounter = 0;
    }
    gameVars.foldCounter.set(foldCounter);

    //Updating the data and active players object after fold 
    game.updateOnFold(thisPlayer);
    activePlayers = users.getActivePlayers();      
    
    //Check if everyone folded except the winner, no showdown except all-ins
    bettingPlayers = users.getBettingPlayers();
    if(bettingPlayers.length === 1) {
        const last = bettingPlayers[0]
        let maxBet = game.getMaxBet();
        if(last.acted || last.roundBet === maxBet) {
            lastPlayer(io);
            return false;
        }
    }
    
    //check if all the players are now 'all-in':
    if (activePlayers.every(player => player.isAllIn)) {
        console.log('Everyone are all in!!!!!');
        everyoneAllIn(io);
        gameVars.handIsRunning.set(false);
        return false;
    }  
    return true;  
};

module.exports = foldAction;