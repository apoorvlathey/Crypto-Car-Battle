var BattleId;

var ChallengesList = {
  preload: function () {
    game.load.image("mint-car", "./assets/images/mint-car.png");
  },

  create: function () {
    for (var i = 0; i < AllChallenges.length; i++) {
      game.add.text(
        100,
        150 + 100 * i,
          i +
          "             " +
          AllChallenges[i].scoreToBeat/100 +
          "      " +
          web3.utils.fromWei('' + AllChallenges[i].amount) + " ETH",
        {
          font: "42px Arial",
          fill: "#fff",
          align: "right",
        }
      );
      this.add.button(
        700,
        150 + 97 * i,
        "mint-car",
        this.acceptChallenge.bind(this, AllChallenges[i].index, selectedCar.index, AllChallenges[i].amount),
        this
      );
    }
  },

  acceptChallenge: function (battleId, carid, value) {
    contract.methods
      .acceptBattle(battleId, carid)
      .send({ from: web3.eth.defaultAccount, value: value })
      .then(function (res) {
        BattleId = battleId;
        console.log(res, "Accepted");
        game.state.start("Game");
      });
  },
};
