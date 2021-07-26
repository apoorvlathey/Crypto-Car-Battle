# Crypto Car Battle
NFT (ERC721) based HTML5 game with Crypto Payouts to the Winner.
![](https://i.imgur.com/irWxoGw.png)
### (Demo deployed on Rinkeby Network)
### Try it out: [Web Demo Link](https://apoorvlathey.com/projects/crypto-car-battle/)

## Game Walkthrough
1. Login via Metamask
	![](https://i.imgur.com/Kxsg3ww.png)

2. i) a. New Users get to Mint new Cars token.
![](https://i.imgur.com/3XTALGi.png)
b. Confirm Metamask Transaction![](https://i.imgur.com/74FiICm.png)

ii) View your ERC-721 Cars collection
![](https://i.imgur.com/BMQUbPj.png)

**New Cars Minted start from Level 1. With each win, their level increases by 1.
(Max. level: 7)**
![](https://i.imgur.com/q8Yu3qL.png)

***Higher Level corresponds to Higher Speeds***

3. Click on your desired car to get to the following menu:
![](https://i.imgur.com/BOvsUQS.png)
4. Let's Create New Battle!
The Main Game Loads up:
![](https://i.imgur.com/gJBFUsT.jpg)
**The Aim of this game is quite simple, the player has to complete the lap in minimum time possible.**
(Here you may observe that the car that we chose above is being used as player here.)
As soon as the user cross the start line, the timer starts. **User has to pass through checkpoint, so no cheating is possible.** On crossing the finish line, game ends.

5. After completing the level, we are greeted with the following screen:
![](https://i.imgur.com/m2QN5mk.png)

6. On clicking the "Challenge Others" button, our score gets saved in the Smart Contract. 
![](https://i.imgur.com/MfYsd56.png)**We have to deposit 0.001 Eth into this match (Explainatory figure below)**

![](https://i.imgur.com/tIOUXCk.png)

After transaction goes through, we get Battle Id:
![](https://i.imgur.com/V6Vl8Fc.png)

### PLAYER 2
Say some other player wants to compete in an existing battle, so the second button is clicked.
![](https://i.imgur.com/BOvsUQS.png)

We get a list of Battles available:
![](https://i.imgur.com/K7WzAwM.png)

Click Battle button and Deposit 0.001 Eth into the Match Pool.
![](https://i.imgur.com/pale6mp.png)

After transaction confirmation, the Game Starts.
**Goal? To finish faster then the opponent!**
![](https://i.imgur.com/OWX1ZS2.jpg)

After game ends:
![](https://i.imgur.com/wpcmIru.png)

Click the Button and Confirm Contract Interaction, to get this (in case you win) :
![](https://i.imgur.com/ri35KBu.png)

If we now view our cars, we observe increased level as well as new color!

## TRANSFER CARS TO ANOTHER USER
Being the ERC-721 standard NFT tokens, the Cars can be traded with players and change ownership.

1. Click on the Transfer button:
![](https://i.imgur.com/IwL5qkq.png)

2. Just fill-up the "Transfer To" address field and click Transfer.
![](https://i.imgur.com/NZHUJW2.png)

3. Confirm the Metamask popup
![](https://i.imgur.com/toBrzUJ.png)

4. And the token has been success fully transferred!
![](https://i.imgur.com/xvBgzYM.png)

5. Login to that account to view your new Car:
![](https://i.imgur.com/XSWMfWf.png)

## Project Setup
1. Clone the Repository
2. Deploy contracts via Remix. Save the abi and contract address in `'./assets/js/web3setup.js'`
3.  Use live-server or any custom server (js, python, php) to serve the HTML5 Phaser Game.
4. Visit `./index.html`in browser to start the game.

## Stack Used
1. Phaser
2. Web3.js
3. HTML5, Vanilla Javascript
