var OpenForBattle = {
  preload: function () {
    game.load.image("mint-car", "./assets/images/mint-car.png");
    game.load.image("cup", "./assets/images/cup.png");
  },

  create: function () {
    // If User as Player 1
    if (!BattleId) {
      createBattleButton = this.add.button(
        0,
        0,
        "mint-car",
        this.createBattle.bind(this),
        this
      );
    } else {
      endBattleButton = this.add.button(0, 300, "cup", this.endBattle.bind(this), this);
    }
    gText = game.add.text(
      200,
      200,
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
            endBattleButton.destroy();
          });
      });
  },
};
