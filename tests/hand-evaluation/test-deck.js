//card deck in the native object form to create specific hands more easily

const cardDeck = require('../../server-script/cards/deck');

const fullDeck = cardDeck.getFullDeckObj().deck

const spades = {
    2:  fullDeck[0],
    3:  fullDeck[1],
    4:  fullDeck[2],
    5:  fullDeck[3],
    6:  fullDeck[4],
    7:  fullDeck[5],
    8:  fullDeck[6],
    9:  fullDeck[7],
    10: fullDeck[8],
    j:  fullDeck[9],
    q: fullDeck[10],
    k: fullDeck[11],
    a: fullDeck[12]
};

const diamonds = {
    2:  fullDeck[13],
    3:  fullDeck[14],
    4:  fullDeck[15],
    5:  fullDeck[16],
    6:  fullDeck[17],
    7:  fullDeck[18],
    8:  fullDeck[19],
    9:  fullDeck[20],
    10: fullDeck[21],
    j:  fullDeck[22],
    q:  fullDeck[23],
    k:  fullDeck[24],
    a:  fullDeck[25]
};

const clubs = {
    2:fullDeck[26],
    3:fullDeck[27],
    4:fullDeck[28],
    5:fullDeck[29],
    6:fullDeck[30],
    7:fullDeck[31],
    8:fullDeck[32],
    9: fullDeck[33],
    10: fullDeck[34],
    j: fullDeck[35],
    q: fullDeck[36],
    k: fullDeck[37],
    a: fullDeck[38]
};

const hearts = {
    2:fullDeck[39],
    3:fullDeck[40],
    4:fullDeck[41],
    5:fullDeck[42],
    6:fullDeck[43],
    7:fullDeck[44],
    8:fullDeck[45],
    9:fullDeck[46],
    10:fullDeck[47],
    j:fullDeck[48],
    q:fullDeck[49],
    k:fullDeck[50],
    a: fullDeck[51]
}
const orderedFullDeck = {spades, diamonds, clubs, hearts}
const getDeck = () => {
    return orderedFullDeck
}
module.exports = {
    getDeck
};