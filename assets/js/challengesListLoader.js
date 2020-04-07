var AllChallenges = [];
var temp777 = 0, temptotal, tempcounter=0;

var ChallengesListLoader = {
  preload: function () {
  },

  create: function () {
    contract.methods
      .getBattlesCount()
      .call()
      .then(function (count) {
        temptotal = count;
        for (var i = 0; i < count; i++) {
          contract.methods
            .battles(i)
            .call()
            .then(function (battle) {
              if (!battle.ended) AllChallenges.push(battle);
              tempcounter++;
            });
        }
      });
  },

  update: function () {
    if (temptotal == tempcounter)
      game.state.start("ChallengesList");
    else {
      console.log("Loading...");
    }
    temp777++;
  },
};
