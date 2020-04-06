var homebutton;

var OpenForBattle = {
  preload: function () {
    game.load.image("challengeothersbutton", "./assets/images/challengeothersbutton.png");
    game.load.image("checkwinnerbutton", "./assets/images/checkwinnerbutton.png");
    game.load.image("openforbattlebg", "./assets/images/openforbattlebg.png");
    game.load.image(
      "homebutton",
      "./assets/images/homebutton.png"
    );
  },

  create: function () {
    game.add.sprite(0, 0, "openforbattlebg");
    homebutton = this.add.button(1180, 10, "homebutton", this.home, this);
    homebutton.visible = false;
    // If User as Player 1
    if (!BattleId) {
      createBattleButton = this.add.button(
        322,
        513,
        "challengeothersbutton",
        this.createBattle.bind(this),
        this
      );
    } else {
      endBattleButton = this.add.button(322, 513, "checkwinnerbutton", this.endBattle.bind(this), this);
    }
    gText = game.add.text(
      426,
      430,
      "You Scored: " + finalScore / 100 + " sec",
      {
        font: "42px Arial",
        fill: "#fff",
        align: "right",
      }
    );
  },

  createBattle: function () {
    gText.text = "Txn confirming....";
    contract.methods
      .createBattle(selectedCar.index, finalScore)
      .send({ from: web3.eth.defaultAccount, value: web3.utils.toWei("0.001") })
      .then(function (res) {
        console.log(res, "BattleCreated");
        contract.methods
          .getBattlesCount()
          .call()
          .then(function (res) {
            var Battle_Id = res - 1;
            createBattleButton.destroy();
            homebutton.visible = true;
            gText.text = "Battle Id is: " + Battle_Id;
          });
      });
  },

  endBattle: function () {
    gText.text = "Txn confirming....";
    contract.methods
      .endBattle(BattleId, finalScore)
      .send({ from: web3.eth.defaultAccount })
      .then(function (res) {
        contract.methods
          .battles(BattleId)
          .call()
          .then(function (battle) {
            if (battle.winner == web3.eth.defaultAccount)
              gText.text = "YOU WON!! Car Levelled Up!";
            else gText.text = "You did not Win. Better Luck next time.";
            homebutton.visible = true;
            endBattleButton.destroy();
          });
      });
  },

  home: function () {
    game.state.start('Login');
  },
};
