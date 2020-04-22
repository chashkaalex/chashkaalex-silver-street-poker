const playHandButton = document.getElementById('playHandButton');
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

const fold = () => {
    console.log('player folded'); 
    thisUser.holecards = ['', ''];
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    socket.emit('player acted', {act: 'fold', bet: undefined, name: thisUserName, raise: false});
};

const checkCall = () => {
    console.log('player called/checked'); 
    gameBtns.forEach(btn => btn.style.visibility = 'hidden');
    if(thisUser.topBet - thisUser.bet >= thisUser.stack) {
        socket.emit('player acted', {act: 'all in', bet: thisUser.stack, raise: false}); //all in with less money 
    } else if(thisUser.topBet === 0) {
        socket.emit('player acted', {act: 'check', bet: 0, name: thisUserName, raise: false});
    }
    else {
        socket.emit('player acted', {act: 'call', bet: thisUser.topBet - thisUser.bet, name: thisUserName, raise: false});
    }
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
        socket.emit('player acted', {act: 'all in', bet: theBet, name: thisUserName, raise: theBet > thisUser.topBet});
    } else if (theBet === (thisUser.topBet - thisUser.bet)) {
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');
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