


const wipeUsersData = () => {
    handPotElem.innerText = '';
    handPotElem.style.visibility = 'hidden';
    usersData.forEach(user => {
        user.bet.innerText = '';
        user.bet.style.visibility = 'hidden';
        user.infoCont.style.visibility = 'hidden';
        user.cards.h1.innerText = '';
        user.cards.h1.style.visibility = 'hidden'; 
        user.cards.h2.innerText = '';
        user.cards.h2.style.visibility = 'hidden'; 
        user.name.innerText = '';
        user.name.style.visibility = 'hidden'; 
        user.stack.innerText = '';
        user.stack.style.visibility = 'hidden';
        user.dealer.innerText = '';
        user.dealer.style.visibility = 'hidden';
    });
};

const updateGameLog = (gameLog) => {
    gameLogElem.textContent = '';
    gameLog.forEach(entry => {
        //console.log(user.userName);
        const entryDiv = document.createElement('DIV');
        entryDiv.innerText = entry;
        gameLogElem.appendChild(entryDiv);            
    });
};

const rerenderTableUsers = (users, handPot) => {
    console.log(users);
    console.log(handPot);
    const topBet = Math.max(...users.map(data => data.roundBet));

    users.forEach((user, idx) => {
        console.log(user.userName, ':');
        displayUserInfo(user, idx)
        const userBet = user.roundBet;
        
        //Updating this user's data object const thisUser = {name: thisUserName, stack: 0, bet:0};
        if(idx === 0) {
            thisUser.stack = user.stack;
            thisUser.bet = user.roundBet;
            thisUser.topBet = topBet;
            console.log('Top bet is ', topBet);
        }

        displayBet(user, usersData[idx].bet);
        
        
        if(handPot) {
            console.log('Rerendering public pot');
            handPotElem.style.visibility = 'visible';
            handPotElem.style.border = '4px solid gold';
            handPotElem.innerText = handPot + '$';
        } else {
            console.log('public pot is empty the cell will stay hidden')
        }

        usersData[idx].stack.style.visibility = 'visible';
        usersData[idx].stack.innerText = user.stack + '$';
        if(idx === 0 && user.hasCards && thisUser.holecards[0].symbol) {
            displayCard(usersData[idx].cards.h1, thisUser.holecards[0]);
            displayCard(usersData[idx].cards.h2, thisUser.holecards[1]);
        }
        if(idx > 0 && user.hasCards) {
            usersData[idx].cards.h1.style.visibility = 'visible';
            usersData[idx].cards.h2.style.visibility = 'visible';
            //console.log(user);
            if(user.currentHand && user.currentHand.length) {
                displayCard(usersData[idx].cards.h1, user.currentHand[0]);
                displayCard(usersData[idx].cards.h2, user.currentHand[1]);
            } else {
                usersData[idx].cards.h1.innerText = cardBack;
                usersData[idx].cards.h1.style.color = 'darkblue'
                usersData[idx].cards.h2.innerText = cardBack;
                usersData[idx].cards.h2.style.color = 'darkblue'
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
}

const displayCard = (elem, card) => {
    elem.style.visibility = 'visible';
    elem.innerText = card.symbol;
    if(card.suit === 'diamonds' || card.suit === 'hearts') {
        elem.style.color = 'red';
    } else {
        elem.style.color = 'black';
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