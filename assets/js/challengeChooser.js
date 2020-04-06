var ChallengeChooser = {
  preload: function () {
    game.load.image(
      "mint-car",
      "./assets/images/mint-car.png"
    );
    game.load.image(
      "cup",
      "./assets/images/cup.png"
    );
  },

  create: function () {
    this.add.button(0, 0, "mint-car", this.startGame, this);
    this.add.button(350, 0, "cup", this.gotoChallenges, this);
  },

  startGame: function () {
    game.state.start('Game');
  },
  
  gotoChallenges: function() {
    game.state.start('ChallengesListLoader');
  }
};
