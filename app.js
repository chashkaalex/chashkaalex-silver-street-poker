//Modules:
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
//const io = require('socket.io')(http);
const io = require('socket.io')(http, { pingInterval: 1500 });
const hbs = require('hbs');

const gameVars = require('./server-script/game/game-variables');
const users = require('./server-script/users/users');

//Socket functions:
require('./socket-io/server-action/connection')(io);
require('./socket-io/server-action/load-backup')(io);
require('./socket-io/server-action/send-user-name')(io);
require('./socket-io/server-action/user-manipulation')(io);
require('./socket-io/player-action/play-hand')(io);
require('./socket-io/player-action/game-actions')(io);

// Setup express and handlebars
const viewsPath = path.join(__dirname, '/public/views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Serving the landing page
app.get('/', (req, res) => {
    res.render('landing', {
        message: gameVars.landingMessage.get(),
    })
    gameVars.landingMessage.set('Please input your name below');
});

//Getting the username from the form on the landing page and rdirecting to the game page
let username = ''
app.post('/submit-form', (req, res) => {
    username = req.body.username;
    console.log('logged username is:', username);
    if(username === 'gameManager') {
      if(gameVars.managerSocket.get()) {
        console.log('another user is trying to connect to management endpoint');
        gameVars.landingMessage.set('Manager is already connected.');
        res.redirect('/');
      } else {
        res.redirect('../management');
      }
    } else if(gameVars.gamelock.get()) {
        gameVars.landingMessage.set('The game was locked by the game manager.');
        res.redirect('/');
    } else if (users.getAllUsers().length > 7 && !users.getAllUsers().map(user => user.userName).includes(username)) {
        gameVars.landingMessage.set('Game quota is full, talk to the game manager.');
        res.redirect('/');
    } else {
      res.redirect('../theGame');
    }
  });

//Serving the game page with rendered username
app.get('/theGame', (req, res) => {
  res.render('theGame', {
    username: username,
})
    username = '';
});

//Serving the management page
app.get('/management', (req, res) => {
  res.render('management', {
    username: username,
})
    username = '';
});

//Start listening
http.listen(3000, () => {
  console.log('listening on *:3000');
});