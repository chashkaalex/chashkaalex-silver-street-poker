require('colors');

const gameVars = require('./game-variables');
const users = require('../users/users');

const getNextPlayerById = (players, thisPlayerId) => {
    const thisPlayerIdx = players.findIndex((player) => player.id === thisPlayerId);
    if(thisPlayerIdx === players.length-1) {
        return players[0];
    } else {
        return players[thisPlayerIdx + 1];
    }
};

const getMaxBet = () => {
    const activePlayers = users.getActivePlayers();
    return Math.max(...activePlayers.map(player => player.roundBet));
    
}

const updateOnRaise = (player) => {
    console.log('This was a raise, resetting "acted" property');
    const bettingPLayers = users.getBettingPlayers();
    bettingPLayers.forEach(bettingPlayer => {
        if(bettingPlayer.userName !== player.userName) {
            bettingPlayer.acted = false;
        }
    });
};

const updateOnFold = (player) => {
    player.hasCards = false;
    player.currentHand = [];
    player.folded = true;
    player.acted = true;
};

const updateOnAllIn = (player, bet) => {
    player.acted = true;
    player.isAllIn = true;
    player.stack = 0;
    player.roundBet += bet;
    gameVars.roundAllInQue.add({player, bet: player.roundBet});
};

const roundEndCheck = () => {
    console.log('Round end check fired');
    users.getBettingPlayers().forEach(user => {
        console.log(`${user.userName} - is acted: ${user.acted}`);
    });
    const bettingPLayers = users.getBettingPlayers();
    return bettingPLayers.every(player => player.acted);
};




module.exports = {
    getMaxBet,
    getNextPlayerById,
    updateOnRaise,
    updateOnFold,
    updateOnAllIn,
    roundEndCheck,
};