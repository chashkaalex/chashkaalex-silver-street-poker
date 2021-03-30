import {usersData, onTableCards, handPotElem, gameLogElem } from './user-data-elems.js';

//Saving the templated username in the client script
const thisUserName = document.getElementById("userName").innerText;
console.log('Captured the username:', thisUserName);

//getting the card images
const imgURL = 'https://cdn.jsdelivr.net/gh/chashkaalex/silver-street-poker@svg-cards/public/img/svg-cards/';
const localDeck = {
    spades: Array(13),
    diamonds: Array(13),
    clubs: Array(13),
    hearts: Array(13)
};

for (const suit in localDeck) {
    console.log(suit);
    console.log(localDeck[suit]);
    localDeck[suit].forEach((cardImg, idx) => {
        cardImg = new Image;
        cardImg.onload= function() {
            console.log(suit, idx, 'loaded');
        };
        cardImg.src = imgURL + suit + idx +'.svg';
    });
};

//creating data object for the user
const thisUser = {name: thisUserName, holecards: ['', ''], stack: 0, bet:0, topBet: 0};

const dealerSymbol = 'Ⓓ';

const wipeUsersData = () => {
    handPotElem.innerText = '';
    handPotElem.style.visibility = 'hidden';
    console.log('Wiping user data');
    usersData.forEach(user => {
        wipeElem(user.bet);
        user.infoCont.style.visibility = 'hidden';
        user.cards.forEach(card => {
            wipeElem(card);
        });
        // wipeElem(user.cards.h1);
        // wipeElem(user.cards.h2);
        wipeElem(user.name);
        wipeElem(user.stack);
        wipeElem(user.dealer);
    });
};

const removeTableCards = () => {
    onTableCards.forEach(elem => wipeElem(elem));
    playHandButton.style.visibility = 'visible';
}

const updateGameLog = (gameLog) => {
    gameLogElem.textContent = '';
    gameLog.forEach(entry => {
        //console.log(user.userName);
        const entryDiv = document.createElement('DIV');
        entryDiv.innerText = entry;
        gameLogElem.appendChild(entryDiv);            
    });
};

const emptyTheTable = () => {
    console.log('Empty the table.');
    onTableCards.forEach(elem => wipeElem(elem));
};

// const renderHoleCards = (holeCards) => {
//     for (let i=0; i<2; i++) {
//         thisUser.holecards[i] = holeCards[i];
//         displayCard(holeCardsElems[i], userHoleCards[i]);
//     }
// };

const rerenderTableUsers = (users, handPot) => {
    // console.log(users);
    // console.log(handPot);
    const topBet = Math.max(...users.map(data => data.roundBet));
    
    if(handPot) {
        console.log('Rerendering public pot');
        handPotElem.style.visibility = 'visible';
        handPotElem.style.border = '4px solid gold';
        handPotElem.innerText = handPot + '$';
    }

    users.forEach((user, idx) => {
        displayUserInfo(user, idx);
        
        //Updating this user's data object const thisUser = {name: thisUserName, stack: 0, bet:0};
        if(idx === 0) {
            thisUser.stack = user.stack;
            thisUser.bet = user.roundBet;
            thisUser.topBet = topBet;
            console.log('Top bet is ', topBet);
        }

        displayBet(user, usersData[idx].bet);
        
        


        if(idx === 0 && user.hasCards && thisUser.holecards[0].symbol) {
            console.log('DISPLAING THIS PLAYER CARDS')
            usersData[idx].cards.forEach((card, idx) => {
                displayCard(card, thisUser.holecards[idx])
            });
            // displayCard(usersData[idx].cards.h1, thisUser.holecards[0]);
            // displayCard(usersData[idx].cards.h2, thisUser.holecards[1]);
        }
        
        if(idx > 0 && user.hasCards) {
            usersData[idx].cards.forEach(card => {
                card.style.visibility = 'visible';
            })
            // usersData[idx].cards.h1.style.visibility = 'visible';
            // usersData[idx].cards.h2.style.visibility = 'visible';
            //console.log(user);
            if(user.currentHand && user.currentHand.length) {
                usersData[idx].cards.forEach((card, idx) => {
                    displayCard(card, user.currentHand[idx]);
                })
                // displayCard(usersData[idx].cards.h1, user.currentHand[0]);
                // displayCard(usersData[idx].cards.h2, user.currentHand[1]);
            } else {
                usersData[idx].cards.forEach(card => {
                    card.style.backgroundImage = `url('/img/svg-cards/card_back.svg')`;
                });
                // for (let card in usersData[idx].cards) {
                //     usersData[idx].cards[card].style.backgroundImage = `url('/img/svg-cards/card_back.svg')`;
                // }
            }
        } 
    });

};

const displayUserInfo = (user, idx) => {
    usersData[idx].infoCont.style.visibility = 'visible';
    if(user.status !== 'connected') {
        usersData[idx].infoCont.style.borderColor = "gray";
    } else if(user.acting){
        usersData[idx].infoCont.style.borderColor = "gold";
    } else {
        usersData[idx].infoCont.style.borderColor = "lime";
    }
    if(user.isDealer) {
        usersData[idx].dealer.style.visibility = 'visible';
        usersData[idx].dealer.innerText = dealerSymbol;
    }
    usersData[idx].name.style.visibility = 'visible';
    usersData[idx].name.innerText = user.userName;
    usersData[idx].stack.style.visibility = 'visible';
    usersData[idx].stack.innerText = user.stack + '$';
}

const displayCard = (elem, card) => {
    elem.style.visibility = 'visible';
    //elem.innerText = card.symbol;
    console.log(card.name);
    // elem.style.backgroundImage = `url('/img/svg-cards/${card.name}.svg')`;
    const svgcard = new Image();
    svgcard.onload = function() {
        elem.style.backgroundImage = "url(" + this.src + ")";;
    };
    if (localDeck[card.suit][card.strength]) {
        svgcard.src = localDeck[card.suit][card.strength].src;
    } else {
        svgcard.src = imgURL + `${card.suit}${card.strength}.svg`;
    }
                
};

const wipeElem = (elem) => {
    elem.style.visibility = 'hidden';
    elem.innerText = '';
};

const displayBet = (user, betElem) => {
    if(user.roundBet) {
        betElem.style.visibility = 'visible';
        betElem.innerText = '\xa0'+'\xa0'+'\xa0'+ user.roundBet +'$'+'\xa0'+'\xa0'+'\xa0';
        if(!user.hasCards) {
            betElem.style.border = '2px solid grey';
            betElem.style.color = 'black';
            betElem.innerText = '\xa0' + 'fold:' +'\xa0'+'\xa0'+ user.roundBet + '$' + '\xa0';
        } else if(user.isAllIn) {
            betElem.style.border = '2px solid gold';
            betElem.style.color = 'gold';
            betElem.innerText = '\xa0' + user.roundBet + '$' + '\xa0';
        } 
        else {
            betElem.style.border = '1px solid white';
            betElem.style.color = 'wheat';   
        }
    } else if (user.isAllIn) {
        betElem.style.visibility = 'visible';
        betElem.style.border = '2px solid gold';
        betElem.style.color = 'gold';
        betElem.innerText = '\xa0' + 's.p.:' + user.sidePot + '$' + '\xa0';
    }
};

export {wipeUsersData, removeTableCards, displayCard, updateGameLog, emptyTheTable, rerenderTableUsers, thisUser};