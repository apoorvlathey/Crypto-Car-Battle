var ChallengeChooser = {
  preload: function () {
    game.load.image(
      "createbattlebutton",
      "./assets/images/createbattlebutton.png"
    );
    game.load.image(
      "competeexisting",
      "./assets/images/competeexisting.png"
    );
    game.load.image(
      "challengechooserbg", "./assets/images/challengechooserbg.png"
    );
    game.load.image(
      "homebutton",
      "./assets/images/homebutton.png"
    );
  },

  create: function () {
    game.add.sprite(0, 0, "challengechooserbg");
    this.add.button(0, 220, "createbattlebutton", this.startGame, this);
    this.add.button(660, 504, "competeexisting", this.gotoChallenges, this);
    this.add.button(1180, 10, "homebutton", this.home, this);
  },

  startGame: function () {
    game.state.start('Game');
  },
  
  gotoChallenges: function() {
    game.state.start('ChallengesListLoader');
  },

  home: function () {
    game.state.start('Login');
  },
};
