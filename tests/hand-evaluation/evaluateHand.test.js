const handEval = require('../../server-script/cards/hand-eval');
const theDeck = require('./test-deck')
const holeCombs = require('./hole-card-combinations')()
const testDeck = theDeck.getDeck()

const cardStrengthArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

// checking basic single card evaluations
for(let suit in testDeck) {
    let theSuit = testDeck[suit]
    for(let card in theSuit) {
        let theCard = theSuit[card]
        test(`checks if  ${theCard.name} is evaluated as Highcard ${cardStrengthArray[theCard.strength-1]}`, () => {
            expect(handEval.evaluateHand([theCard]).string).toBe(`Highcard ${cardStrengthArray[theCard.strength-1]}`);
          });
    }
}

//checking hole card pairs evaluations
for(let comb in holeCombs) {
    let theComb = holeCombs[comb]
    test(`checks if  ${comb} is evaluated as ${theComb.string}`, () => {
        expect(handEval.evaluateHand(theComb.hand).string).toBe(theComb.string);
      });    
}
