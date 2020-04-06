var BattleId;

var ChallengesList = {
  preload: function () {
    game.load.image("challengeslistbg", "./assets/images/challengeslistbg.png");
    game.load.image("battlebutton", "./assets/images/battlebutton.png");
    game.load.image(
      "homebutton",
      "./assets/images/homebutton.png"
    );
  },

  create: function () {
    game.add.sprite(0, 0, "challengeslistbg");
    this.add.button(1180, 10, "homebutton", this.home, this);
    game.add.text(
      80,
      380,
        "SNo.  Time To Beat  Bet Amount    ",
      {
        font: "38px Arial",
        fill: "#333",
        align: "right",
      }
    );
    for (var i = 0; i < AllChallenges.length; i++) {
      game.add.text(
        100,
        450 + 100 * i,
          (i+1) +
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
        447 + 97 * i,
        "battlebutton",
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

  home: function () {
    game.state.start('Login');
  },
};
