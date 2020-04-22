//Symbol definitions
const cardBack = '🂠';
const dealerSymbol = 'Ⓓ';

//This player hole card elements
const holeCard1Elem = document.getElementById('H1');
const holeCard2Elem = document.getElementById('H2');
const holeCardsElems = [holeCard1Elem, holeCard2Elem];

//Community cards elements 
const flopCard1Elem = document.getElementById('F1');
const flopCard2Elem = document.getElementById('F2');
const flopCard3Elem = document.getElementById('F3');
const turnCardElem = document.getElementById('T');
const riverCardElem = document.getElementById('R');
const commCardsElems = [flopCard1Elem, flopCard2Elem, flopCard3Elem, turnCardElem, riverCardElem];

const handPotElem = document.getElementById('handPot');

//Opponents cards and info elements
    //menu element
const gameLogElem = document.getElementById('gameLog');
    //this user (user 0)
const user0InfoCont = document.getElementById('user0infocont');
const user0dealer = document.getElementById('user0dealer');
const user0H1Card1Elem = document.getElementById('H1');
const user0H2Card1Elem = document.getElementById('H2');
const user0NameElem = document.getElementById('user0name');
const user0StackElem = document.getElementById('user0stack');
const user0BetElem = document.getElementById('user0Bet');
const user0data = {
    infoCont: user0InfoCont,
    dealer: user0dealer,
    cards: {h1: user0H1Card1Elem, h2: user0H2Card1Elem}, 
    name: user0NameElem, 
    stack: user0StackElem, 
    bet: user0BetElem
};
    //user1
const user1InfoCont = document.getElementById('user1infocont'); 
const user1dealer = document.getElementById('user1dealer');   
const user1H1Card1Elem = document.getElementById('user1H1');
const user1H2Card1Elem = document.getElementById('user1H2');
const user1NameElem = document.getElementById('user1name');
const user1StackElem = document.getElementById('user1stack');
const user1BetElem = document.getElementById('user1Bet');
const user1data = {
    infoCont: user1InfoCont,
    dealer: user1dealer,
    cards: {h1: user1H1Card1Elem, h2: user1H2Card1Elem}, 
    name: user1NameElem, 
    stack: user1StackElem, 
    bet: user1BetElem
};
    //user2
const user2InfoCont = document.getElementById('user2infocont');
const user2dealer = document.getElementById('user2dealer');
const user2H1Card1Elem = document.getElementById('user2H1');
const user2H2Card1Elem = document.getElementById('user2H2');
const user2NameElem = document.getElementById('user2name');
const user2StackElem = document.getElementById('user2stack');
const user2BetElem = document.getElementById('user2Bet');
const user2data = {
    infoCont: user2InfoCont,
    dealer: user2dealer,
    cards: {h1: user2H1Card1Elem, h2: user2H2Card1Elem}, 
    name: user2NameElem, 
    stack: user2StackElem, 
    bet: user2BetElem
};
    //user3
const user3InfoCont = document.getElementById('user3infocont');
const user3dealer = document.getElementById('user3dealer');
const user3H1Card1Elem = document.getElementById('user3H1');
const user3H2Card1Elem = document.getElementById('user3H2');
const user3NameElem = document.getElementById('user3name');
const user3StackElem = document.getElementById('user3stack');
const user3BetElem = document.getElementById('user3Bet');
const user3data = {
    infoCont: user3InfoCont,
    dealer: user3dealer,
    cards: {h1: user3H1Card1Elem, h2: user3H2Card1Elem}, 
    name: user3NameElem, 
    stack: user3StackElem, 
    bet: user3BetElem
};
    //user4
const user4InfoCont = document.getElementById('user4infocont');
const user4dealer = document.getElementById('user4dealer');
const user4H1Card1Elem = document.getElementById('user4H1');
const user4H2Card1Elem = document.getElementById('user4H2');
const user4NameElem = document.getElementById('user4name');
const user4StackElem = document.getElementById('user4stack');
const user4BetElem = document.getElementById('user4Bet');
const user4data = {
    infoCont: user4InfoCont,
    dealer: user4dealer,
    cards: {h1: user4H1Card1Elem, h2: user4H2Card1Elem}, 
    name: user4NameElem, 
    stack: user4StackElem, 
    bet: user4BetElem
};
    //user5
const user5InfoCont = document.getElementById('user5infocont');
const user5dealer = document.getElementById('user5dealer');
const user5H1Card1Elem = document.getElementById('user5H1');
const user5H2Card1Elem = document.getElementById('user5H2');
const user5NameElem = document.getElementById('user5name');
const user5StackElem = document.getElementById('user5stack');
const user5BetElem = document.getElementById('user5Bet');
const user5data = {
    infoCont: user5InfoCont,
    dealer: user5dealer,
    cards: {h1: user5H1Card1Elem, h2: user5H2Card1Elem}, 
    name: user5NameElem, 
    stack: user5StackElem, 
    bet: user5BetElem
};
    //user6
const user6InfoCont = document.getElementById('user6infocont');
const user6dealer = document.getElementById('user6dealer');
const user6H1Card1Elem = document.getElementById('user6H1');
const user6H2Card1Elem = document.getElementById('user6H2');
const user6NameElem = document.getElementById('user6name');
const user6StackElem = document.getElementById('user6stack');
const user6BetElem = document.getElementById('user6Bet');
const user6data = {
    infoCont: user6InfoCont,
    dealer: user6dealer,
    cards: {h1: user6H1Card1Elem, h2: user6H2Card1Elem}, 
    name: user6NameElem, 
    stack: user6StackElem, 
    bet: user6BetElem
};
    //user7
const user7InfoCont = document.getElementById('user7infocont');
const user7dealer = document.getElementById('user7dealer');
const user7H1Card1Elem = document.getElementById('user7H1');
const user7H2Card1Elem = document.getElementById('user7H2');
const user7NameElem = document.getElementById('user7name');
const user7StackElem = document.getElementById('user7stack');
const user7BetElem = document.getElementById('user7Bet');
const user7data = {
    infoCont: user7InfoCont,
    dealer: user7dealer,
    cards: {h1: user7H1Card1Elem, h2: user7H2Card1Elem}, 
    name: user7NameElem, 
    stack: user7StackElem, 
    bet: user7BetElem
};

const usersData = [user0data, user1data, user2data, user3data, user4data, user5data, user6data, user7data];

const onTableCards = [...commCardsElems];
usersData.forEach(data => {
    onTableCards.push(data.cards.h1);
    onTableCards.push(data.cards.h2);
});