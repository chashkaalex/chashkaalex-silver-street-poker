const theDeck = require('./test-deck')
const testDeck = theDeck.getDeck()

const holeCardCombinations = {
    pairOfTwos: {hand: [testDeck.spades[2], testDeck.diamonds[2]], string: 'Pair of Twos'},
    twoAndThree: {hand: [testDeck.spades[2], testDeck.diamonds[3]], string: 'Highcard Three'},
    twoAndFour: {hand: [testDeck.spades[2], testDeck.diamonds[4]], string: 'Highcard Four'},
    twoAndFive: {hand: [testDeck.spades[2], testDeck.diamonds[5]], string: 'Highcard Five'},
    twoAndSix: {hand: [testDeck.spades[2], testDeck.diamonds[6]], string: 'Highcard Six'},
    twoAndSeven: {hand: [testDeck.spades[2], testDeck.diamonds[7]], string: 'Highcard Seven'},
    twoAndEight: {hand: [testDeck.spades[2], testDeck.diamonds[8]], string: 'Highcard Eight'},
    twoAndNine: {hand: [testDeck.spades[2], testDeck.diamonds[9]], string: 'Highcard Nine'},
    twoAndTen: {hand: [testDeck.spades[2], testDeck.diamonds[10]], string: 'Highcard Ten'},
    twoAndJack: {hand: [testDeck.spades[2], testDeck.diamonds.j], string: 'Highcard Jack'},
    twoAndQueen: {hand: [testDeck.spades[2], testDeck.diamonds.q], string: 'Highcard Queen'},
    twoAndKing: {hand: [testDeck.spades[2], testDeck.diamonds.k], string: 'Highcard King'},
    twoAndAce: {hand: [testDeck.spades[2], testDeck.diamonds.a], string: 'Highcard Ace'},
    pairOfThrees: {hand: [testDeck.spades[3], testDeck.diamonds[3]], string: 'Pair of Threes'},
    threeAndFour: {hand: [testDeck.spades[3], testDeck.diamonds[4]], string: 'Highcard Four'},
    threeAndFive: {hand: [testDeck.spades[3], testDeck.diamonds[5]], string: 'Highcard Five'},
    threeAndSix: {hand: [testDeck.spades[3], testDeck.diamonds[6]], string: 'Highcard Six'},
    threeAndSeven: {hand: [testDeck.spades[3], testDeck.diamonds[7]], string: 'Highcard Seven'},
    threeAndEight: {hand: [testDeck.spades[3], testDeck.diamonds[8]], string: 'Highcard Eight'},
    threeAndNine: {hand: [testDeck.spades[3], testDeck.diamonds[9]], string: 'Highcard Nine'},
    threeAndTen: {hand: [testDeck.spades[3], testDeck.diamonds[10]], string: 'Highcard Ten'},
    threeAndJack: {hand: [testDeck.spades[3], testDeck.diamonds.j], string: 'Highcard Jack'},
    threeAndQueen: {hand: [testDeck.spades[3], testDeck.diamonds.q], string: 'Highcard Queen'},
    threeAndKing: {hand: [testDeck.spades[3], testDeck.diamonds.k], string: 'Highcard King'},
    threeAndAce: {hand: [testDeck.spades[3], testDeck.diamonds.a], string: 'Highcard Ace'},
    pairOfFours: {hand: [testDeck.spades[4], testDeck.diamonds[4]], string: 'Pair Of Fours'},
    fourAndFive: {hand: [testDeck.spades[4], testDeck.diamonds[5]], string: 'Four And Five'},
    fourAndSix: {hand: [testDeck.spades[4], testDeck.diamonds[6]], string: 'Four And Six'},
    fourAndSeven: {hand: [testDeck.spades[4], testDeck.diamonds[7]], string: 'Four And Seven'},
    fourAndEight: {hand: [testDeck.spades[4], testDeck.diamonds[8]], string: 'Four And Eight'},
    fourAndNine: {hand: [testDeck.spades[4], testDeck.diamonds[9]], string: 'Four And Nine'},
    fourAndTen: {hand: [testDeck.spades[4], testDeck.diamonds[10]], string: 'Four And Ten'},
    fourAndJack: {hand: [testDeck.spades[4], testDeck.diamonds.j], string: 'Four And Jack'},
    fourAndQueen: {hand: [testDeck.spades[4], testDeck.diamonds.q], string: 'Four And Queen'},
    fourAndKing: {hand: [testDeck.spades[4], testDeck.diamonds.k], string: 'Four And King'},
    fourAndAce: {hand: [testDeck.spades[4], testDeck.diamonds.a], string: 'Four And Ace'},
};












const getHoleCardCombs = () => {
    return holeCardCombinations
};

module.exports = getHoleCardCombs;