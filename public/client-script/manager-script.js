console.log('Client script loaded!');

const socket = io();


const loadBackup = () => {
    console.log('Emitting load backup');
    socket.emit('load backup');
};

const toggleGameLock = () => {
    console.log('Emitting toggle game lock');
    socket.emit('toggle game lock');
};


const tBody = document.getElementById('t-body');

const removeButton = document.createElement('button');
removeButton.innerText = 'remove';
removeButton.style.color = 'red';




const manageSocketActions = () => {
        socket.on('updating users', ({users, handpot, msg}) => {
            tBody.innerHTML = '';       // clearing table contents
                users.forEach((user, idx) => {
                    console.log('Inserting new row.');
                    let thisRow = tBody.insertRow(idx);
                    thisRow.insertCell(0).innerHTML = user.userName;;
                    thisRow.insertCell(1).innerHTML = user.acting   ? '✅' : '❌';
                    thisRow.insertCell(2).innerHTML = user.hasCards ? '✅' : '❌';
                    thisRow.insertCell(3).innerHTML = user.isDealer ? '✅' : '❌';
                    thisRow.insertCell(4).innerHTML = user.isAllIn  ? '✅' : '❌';
                    thisRow.insertCell(5).innerHTML = user.stack;
                    thisRow.insertCell(6).innerHTML = user.roundBet;
                    const buttons = thisRow.insertCell(7);
                    removeClone =  removeButton.cloneNode(true);
                    removeClone.onclick = function(event) {
                        console.log(event.srcElement.parentElement.parentElement.firstChild.innerText);
                        const rmUserName = event.srcElement.parentElement.parentElement.firstChild.innerText;
                        socket.emit('remove user', rmUserName);
                    }
                    buttons.appendChild(removeClone);     
                });
        });

        socket.on('ask user name', (msg) => {
            socket.emit('send user name', 'game manager');
        });
};
manageSocketActions();