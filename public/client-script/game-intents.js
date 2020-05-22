import {socket} from './script.js';
import { 
    // usersData, 
    // onTableCards, 
    gameBtns, 
    // handPotElem, 
    gameLogElem, 
    // currentHandElem, 
    gameLogButton, 
    playHandButton,
    betButton,
    foldButton,
    checkButton,
    allInButton
} from './user-data-elems.js';

import {
    // wipeUsersData, 
    // removeTableCards, 
    // displayCard, 
    // updateGameLog, 
    // rerenderTableUsers, 
    thisUser
} from './render.js'

let playersNum = 0;
const setPlayersNum = (value) => {
    playersNum = value;
};

let currentBigBlind = 0;
const setCurrentBigBlind = (value) => {
    currentBigBlind = value;
};

const playHand = () => {
    if(playersNum < 2){
        alert('You cannot play alone, wait untill someone else enters.');
       return;
    }
    console.log('play hand button clicked!')
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    playHandButton.style.visibility = 'hidden'
    socket.emit('play hand', 'lets play a hand');
};
playHandButton.addEventListener('click', playHand);


const fold = () => {
    console.log('player folded'); 
    thisUser.holecards = ['', ''];
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    socket.emit('player acted', {act: 'fold', bet: undefined, name: thisUser.name, raise: false});
};
foldButton.addEventListener('click', fold);

const checkCall = () => {
    console.log('player called/checked'); 
    const newBet = thisUser.topBet - thisUser.bet;
    if(newBet >= thisUser.stack) {
        socket.emit('player acted', {act: 'all in', bet: thisUser.stack, raise: false}); //all in with less money 
    } else if(thisUser.topBet === 0) {
        socket.emit('player acted', {act: 'check', bet: 0, name: thisUser.name, raise: false});
    } else {    //just a simple call
        if(newBet > 5 && newBet > currentBigBlind && !confirm(`This means betting ${newBet}$. Sure?`)) {
            return;           
        } 
        socket.emit('player acted', {act: 'call', bet: newBet, name: thisUser.name, raise: false});        
    }
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
};
checkButton.addEventListener('click', checkCall);

const betInput = document.getElementById('betAmount');
const bet = () => {
    console.log('player made a bet'); 
    const theBet = parseInt(betInput.value);
    console.log(`the bet is ${theBet} and its isInteger is ${Number.isInteger(10)}`);
    if(!Number.isInteger(theBet)){
        alert('You cannot bet this amount, the bet must an integer');
    } else if (theBet < (thisUser.topBet - thisUser.bet)) {
        alert('You cannot bet this amount, the bet is not enough to call');
    } else if (theBet > thisUser.stack) {
        alert('You cannot bet this amount, you do not have that kind of money');
    } else if (theBet === thisUser.stack) {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        betInput.value = '';
        socket.emit('player acted', {act: 'all in', bet: theBet, name: thisUser.name, raise: theBet > thisUser.topBet});
    } else if (theBet === (thisUser.topBet - thisUser.bet)) {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        betInput.value = '';
        socket.emit('player acted', {act: 'call', bet: theBet, name: thisUser.name, raise: false});
    } else {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        betInput.value = '';
        socket.emit('player acted', {act: 'bet', bet: theBet, name: thisUser.name, raise: true});
    }
};
betButton.addEventListener('click', bet);

betInput.addEventListener("keyup", (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        bet();
    }
});

const allIn = () => {
    console.log('player made a bet'); 
    const theBet = thisUser.stack;
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    socket.emit('player acted', {act: 'all in', bet: theBet, name: thisUser.name, raise: theBet > thisUser.topBet});
};
allInButton.addEventListener('click', allIn);

const expandGameLog = () => {
    //const gameLog = document.getElementById('gameLog');
    let elPx = window.getComputedStyle(gameLogElem).height;
    console.log('element px height string: ', elPx);
    elPx = elPx.slice(0,elPx.length-2);
    console.log('element px height: ', elPx);
    const windowPx = window.innerHeight;
    console.log('window px height: ', windowPx);
    const elHeight = 100*elPx/windowPx;
    console.log('computed vh% of elem: ', elHeight);
    if(elHeight < 10) {
        gameLogElem.style.height = '50vh';
    } else {
        gameLogElem.style.height = '4.5vh';
    }
};
gameLogButton.addEventListener('click', expandGameLog);


function updateGameBtnsPosition() {
    const gamebuttonsCont = document.getElementById('game-buttons');
    const windowPx = window.innerHeight;
    const betInput = document.getElementById('bet-input');
    const foldCall = document.getElementById('fold-call');
    
    let betContHeight = window.getComputedStyle(betInput).height;
    betContHeight = betContHeight.slice(0,betContHeight.length-2);
    betContHeight = 100*betContHeight/windowPx;

    let foldCallHeight = window.getComputedStyle(foldCall).height;
    foldCallHeight = foldCallHeight.slice(0,foldCallHeight.length-2);
    foldCallHeight = 100*foldCallHeight/windowPx;

    if(gameBtns.some(btn => window.getComputedStyle(btn).visibility === 'visible')) {
        console.log('game buttons visible');
        console.log(`buttons constainer height is ${betContHeight}`);
        if(betContHeight + foldCallHeight > 20) {
            gamebuttonsCont.style.top = '-35vh';
            console.log('container pushed all the way up.');
        } else if (betContHeight + foldCallHeight > 16) {
            gamebuttonsCont.style.top = '-30vh';
            console.log('container pushed half way up.');
        } else {
            gamebuttonsCont.style.top = '-25vh';
            console.log('container is back down.');
        }
    }
};

//Adding button position events
window.onresize = updateGameBtnsPosition;
window.onload = updateGameBtnsPosition;

export {
    playHand, 
    fold, 
    checkCall, 
    bet, 
    allIn, 
    expandGameLog, 
    updateGameBtnsPosition,
    setPlayersNum,
    setCurrentBigBlind
};
