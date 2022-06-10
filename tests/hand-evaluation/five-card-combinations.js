const theDeck = require('./test-deck')
const d = theDeck.getDeck()

const fiveCardCombs = {
    highCard: {hand: [d.spades[5], d.diamonds[2], d.hearts.j, d.spades.a, d.diamonds[7]], string: 'Highcard Ace'},
    pair: {hand: [d.spades[5], d.diamonds[2], d.hearts.j, d.spades.a, d.diamonds[5]], string: 'Pair of Fives, the kicker is Ace'},
    twoPairs: {hand: [d.spades[5], d.diamonds[2], d.hearts.a, d.spades.a, d.diamonds[5]], string: 'Two pair of Aces and Fives, the kicker is Two'},
    //three of a kind
    //straight
    //flush
    //three of a kind and flush
    //full house
    //quad
    //straight flush
}