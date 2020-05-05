console.log('Client script loaded!');

const gameLog = [];
let playersNum = 0;

//Saving the templated username in the client script
const thisUserName = document.getElementById("userName").innerText;
console.log('Captured the username:', thisUserName);

//creating data object for the user
const thisUser = {name: thisUserName, holecards: ['', ''], stack: 0, bet:0, topBet: 0};
const playHandButton = document.getElementById('playHandButton');
const gameBtns = Array.from(document.getElementsByClassName('game-btn'));
const currentHandElem = document.getElementById('currentHand');

const socket = io();

const socketActions = () => {

    socket.on('ask user name', (msg) => {
        //debugger;
        console.log('Server says: ', msg)
        console.log('Answer: my name is ', thisUserName);
        socket.emit('send user name', thisUserName);
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
            playersNum = users.length;
            wipeUsersData();
            if(msg) {
                console.log(msg);
                if(msg.includes('Hand is ended.')){
                    playHandButton.style.visibility = 'visible';
                }
                gameLog.unshift(msg)
            } else {
                console.log('No message.');
            }
            updateGameLog(gameLog);
            if (users.map(user => user.userName).includes(thisUserName)) {
                while (users[0].userName !== thisUserName) {
                    users.unshift(users.pop());
                }
            }
            rerenderTableUsers(users, handPot);
        });
        
        socket.on('dealing community cards', (obj) => {
            const {commCards, evaledHand} = obj;
            console.log('Server dealed community cards: ', commCards);
            commCards.forEach((card, idx) =>{
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
            for (let i=0; i<2; i++) {
                thisUser.holecards[i] = userHoleCards[i];
                displayCard(holeCardsElems[i], userHoleCards[i]);
            }
            currentHandElem.innerText = evaledHand;
            playHandButton.style.visibility = 'hidden';
          });

        socket.on('empty the table', msg => {
            console.log('Empty the table.');
            onTableCards.forEach(elem => wipeElem(elem));
            //debugger;
          });

        socket.on('time to act', (msg) => {
            //Deal with right button names
            console.log(`Top bet is ${thisUser.topBet}, your bet is ${thisUser.bet}`);
            const checkButton = document.getElementById('checkButton')
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
                onTableCards.forEach(elem => wipeElem(elem));
                playHandButton.style.visibility = 'visible';
            }
            //Display community cards:
            commCards.forEach((card, idx) =>{
                displayCard(commCardsElems[idx], card);     
            });
        });
};





socketActions();