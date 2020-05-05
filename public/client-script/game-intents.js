
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

const betInput = document.getElementById('betAmount');
betInput.addEventListener("keyup", (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        bet();
    }
  });

const fold = () => {
    console.log('player folded'); 
    thisUser.holecards = ['', ''];
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    socket.emit('player acted', {act: 'fold', bet: undefined, name: thisUserName, raise: false});
};

const checkCall = () => {
    console.log('player called/checked'); 
    const newBet = thisUser.topBet - thisUser.bet;
    if(newBet >= thisUser.stack) {
        socket.emit('player acted', {act: 'all in', bet: thisUser.stack, raise: false}); //all in with less money 
    } else if(thisUser.topBet === 0) {
        socket.emit('player acted', {act: 'check', bet: 0, name: thisUserName, raise: false});
    } else {    //just a simple call
        if(newBet > 5 && !confirm(`This means betting ${newBet}$. Sure?`)) {
            return;           
        } 
        socket.emit('player acted', {act: 'call', bet: newBet, name: thisUserName, raise: false});        
    }
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
};

const bet = () => {
    console.log('player made a bet'); 
    const theBet = parseInt(document.getElementById('betAmount').value);
    console.log(`the bet is ${theBet} and its isInteger is ${Number.isInteger(10)}`);
    if(!Number.isInteger(theBet)){
        alert('You cannot bet this amount, the bet must an integer');
    } else if (theBet < (thisUser.topBet - thisUser.bet)) {
        alert('You cannot bet this amount, the bet is not enough to call');
    } else if (theBet > thisUser.stack) {
        alert('You cannot bet this amount, you do not have that kind of money');
    } else if (theBet === thisUser.stack) {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        document.getElementById('betAmount').value = '';
        socket.emit('player acted', {act: 'all in', bet: theBet, name: thisUserName, raise: theBet > thisUser.topBet});
    } else if (theBet === (thisUser.topBet - thisUser.bet)) {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        document.getElementById('betAmount').value = '';
        socket.emit('player acted', {act: 'call', bet: theBet, name: thisUserName, raise: false});
    } else {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
        document.getElementById('betAmount').value = '';
        socket.emit('player acted', {act: 'bet', bet: theBet, name: thisUserName, raise: true});
    }
};

const allIn = () => {
    console.log('player made a bet'); 
    const theBet = thisUser.stack;
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    socket.emit('player acted', {act: 'all in', bet: theBet, name: thisUserName, raise: theBet > thisUser.topBet});
};

const expandGameLog = () => {
    const gameLog = document.getElementById('gameLog');
    let elPx = window.getComputedStyle(gameLog).height;
    console.log('element px height string: ', elPx);
    elPx = elPx.slice(0,elPx.length-2);
    console.log('element px height: ', elPx);
    const windowPx = window.innerHeight;
    console.log('window px height: ', windowPx);
    const elHeight = 100*elPx/windowPx;
    console.log('computed vh% of elem: ', elHeight);
    if(elHeight < 10) {
        gameLog.style.height = '50vh';
    } else {
        gameLog.style.height = '4.5vh';
    }
};


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

window.onresize = updateGameBtnsPosition;
window.onload = updateGameBtnsPosition;