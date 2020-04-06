var game;
var NFT_balance;

//new game instance
game = new Phaser.Game(1280, 839, Phaser.AUTO, '');

game.state.add('Login', Login);
game.state.add('Mint', Mint);
game.state.add('CarsListLoader', CarsListLoader);
game.state.add('CarsList', CarsList);
game.state.add('Game', Game);


game.state.start('Login');