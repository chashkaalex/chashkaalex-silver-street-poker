##  silver-street-poker - Texas Hold'em play room with Node.JS and Socket.io

This application was created as a substitution for a regular game night in times of quarantine. As such it is built to maintain only one room for the maximum of 8 players. Also, just like in a friendly IRL game no one is standing with a stopwatch over another player, so there is actually virtually no asyncronous code in the app - everything is event-driven and implies a good will of the company to play. 

Rules implementation reflects some house rules we apply at our place, so if someone should use the app he or she should be aware:

### 1. Hands evaluation:
  1.1 When evaluating flush hands only the highest card is taken into account. We do not take into account the rest of the cards. 
  
  1.2 There is no evaluation of the cards other then the combination and 1 (one!) kicker card. We do not take into account the rest of non-combination cards in the hand. 
  
### 2. Pot and bet rules. 
Those just don't exist. Any player can bet any amount of his money. It can be less than a blind bet or more than twice the pot. Also all-ins that are not a raise do not reopen the pot for betting. 

### 3. The showdown.
  As of now (I might change this in the future), the showdown in the end of a called hand is madndatory - your opponents will see your hand if you didn't fold (unless you are the last card-holder). This behaviour is actually under an open discussion since the evaluation and awarding the pots is made by the back-end and thus might be a source of a disagreement. At least some online poker clients make the showdown mandatory. 
  
### 4. The stack.
  As of now it is hardcoded, not even a stand-alone variable, just a property of a new user object. Still - very easy to redefine it to your liking.

### 5. Llama.
  There is a llama/Peru train animation. It is somewhat of a private joke I'm not going to explain here, but for us it is (just as is llama Boris on the website icon) an important part of the game. It is very simple to comment out if it bothers you and maybe some day I will branch the animations out of the master. But for now - make of it whatever you like. 


##  Some very basic usage notes:
You will need node.js (and npm) installed on your machine. 
After you download the code, just run `node app.js` from the location of the files with your favorite CLI. 
The room will be immediatly accessible on your localhost:3000. Your friends can access it through a tunnel service (i.e. ngrok) or with the right port forwarding on your router - just through your ip or a ddns service provided url (we use noip, for example). 
Sure, you can just deploy it on some webserver service like Heroku, but for the sake of just a game night for a few friends a local host will definitely suffice. 
Additionally you can use a game manager menu. In order to do that you just have to login as gameManager and will get the menu instead of a regular room. The menu gives some basic backup capabilities, on option to remove an unwanted player and to lock the game (forbid new logins). Other capabilities (make a player fold, rebuy etc.) will be added, hopefully soon. 

As of now the app is still in the beta stage (though I wasn't able to find any "procedural" bugs for a while now), so if you somehow wandered here, tested the app or just reviewed the code and you have found some bug or have a suggestion - you are most welcome to comment.

## Thanks
I am very grateful to my wife who helped me a lot during the process - Olya, you are the best, I love you - and to my faithful team of beta-testers (who also happen to be my poker buddies  =)) -  Gamak, Shoora, Kaban, Baloo, Julia and Kuzya, guys you are the best.
