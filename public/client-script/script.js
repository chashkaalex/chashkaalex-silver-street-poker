console.log('Client script loaded!');

//Import statements
import {wipeUsersData, removeTableCards, displayCard, updateGameLog, emptyTheTable, rerenderTableUsers, thisUser} from './render.js';
import {peruTrain} from './animation.js';
import { 
    commCardsElems,
    usersData, 
    onTableCards, 
    gameBtns, 
    handPotElem, 
    gameLogElem, 
    currentHandElem, 
    gameLogButton, 
    playHandButton,
    betButton,
    foldButton,
    checkButton,
    allInButton
} from './user-data-elems.js';
import {
    playHand, 
    fold, 
    checkCall, 
    bet, 
    allIn, 
    expandGameLog, 
    updateGameBtnsPosition,
    // getPlayersNum,
    setPlayersNum,
    setCurrentBigBlind
} from './game-intents.js';



const gameLog = [];





//getting the card images
const localDeck = {
    spades: Array(13),
    diamonds: Array(13),
    clubs: Array(13),
    hearts: Array(13)
};

for (const suit in localDeck) {
    console.log(suit);
    console.log(localDeck[suit]);
};

const socket = io();

const socketActions = () => {

    socket.on('ask user name', (msg) => {
        //debugger;
        console.log('Server says: ', msg)
        console.log('Answer: my name is ', thisUser.name);
        socket.emit('send user name', thisUser.name);
      });
      
    socket.on('relogin', (msg) => {
        //debugger;
        console.log('Server says: ', msg);
        window.location.href = "/";
    });

    socket.on('show animation', (name) => {
        if(name === 'peruTrain') {
            peruTrain();
        }
    });
        
    socket.on('updating users', ({users, handPot, msg}) => {
        console.log('Received updated data, rerendering.');
        setPlayersNum(users.length);
        wipeUsersData();
        if(msg) {
            console.log(msg);
            if(msg.includes('Hand is ended.')){
                playHandButton.style.visibility = 'visible';
            } else if (msg === 'Dealing hole cards') {
                const newBigBlind = Math.max(...users.map(user => user.roundBet));
                setCurrentBigBlind(newBigBlind);
                console.log('Big blind bet is ', newBigBlind);
            }
            gameLog.unshift(msg)
        } else {
            console.log('No message.');
        }
        updateGameLog(gameLog);
        if (users.map(user => user.userName).includes(thisUser.name)) {
            while (users[0].userName !== thisUser.name) {
                users.unshift(users.pop());
            }
        }
        rerenderTableUsers(users, handPot);
    });
        
    socket.on('dealing community cards', (obj) => {
        const {commCards, evaledHand} = obj;
        console.log('Server dealed community cards: ', commCards);
        commCards.forEach((card, idx) =>{
            console.log('card name', Object.keys(card)[0]);
            displayCard(commCardsElems[idx], card);     
        });
        if(evaledHand) {
            currentHandElem.innerText = evaledHand;
        } else {
            currentHandElem.innerText = '';
        }
    });

    socket.on('dealing hole cards', (obj) => {
        
        currentHandElem.innerText = '';
        const {userHoleCards, evaledHand} = obj;
        console.log('Server dealed hole cards: ', userHoleCards);

        // displayCard(usersData[0].cards.h1, userHoleCards[0]);
        // displayCard(usersData[0].cards.h2, userHoleCards[1]);
        for (let i=0; i<2; i++) {
            thisUser.holecards[i] = userHoleCards[i];
            displayCard(usersData[0].cards[i], userHoleCards[i]);
        }
        currentHandElem.innerText = evaledHand;
        playHandButton.style.visibility = 'hidden';
    });

    socket.on('empty the table', msg => {
        emptyTheTable()
        //debugger;
    });

    socket.on('time to act', (msg) => {
        //Deal with right button names
        console.log(`Top bet is ${thisUser.topBet}, your bet is ${thisUser.bet}`);
        if(thisUser.topBet > thisUser.bet) {
            checkButton.innerText = 'Call';
        } else if(thisUser.topBet > thisUser.stack) {
            checkButton.style.visibility = 'hidden';
        } else {
            checkButton.innerText = 'Check';
        }  
        gameBtns.forEach(btn => btn.style.visibility = 'visible');
        updateGameBtnsPosition();
        //alert('It is your move!');  
        checkButton.focus();
    });

    socket.on('lost the move', (msg) => {
        //Hide game buttons
        gameBtns.forEach(btn => btn.style.visibility = 'hidden');

    });

    socket.on('hand status', (obj) => {
        const {status, commCards} = obj;
        //Hide 'Play Hand' button if needed:
        if(status) {
            playHandButton.style.visibility = 'hidden';
        } else {
            removeTableCards();
        }
        //Display community cards:
        commCards.forEach((card, idx) =>{
            displayCard(commCardsElems[idx], card);     
        });
    });
};





socketActions();

export {socket};