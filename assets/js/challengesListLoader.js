var AllChallenges = [];
var temp777 = 0;

var ChallengesListLoader = {
  preload: function () {
    game.load.image("mint-car", "./assets/images/mint-car.png");
  },

  create: function () {
    contract.methods
      .getBattlesCount()
      .call()
      .then(function (count) {
        for (var i = 0; i < count; i++) {
          contract.methods
            .battles(i)
            .call()
            .then(function (battle) {
              if (!battle.ended) AllChallenges.push(battle);
            });
        }
      });
  },

  update: function () {
    if (AllChallenges.length >= 1 || temp777 >= 90)
      game.state.start("ChallengesList");
    else {
      console.log("Loading...");
    }
    temp777++;
  },
};
