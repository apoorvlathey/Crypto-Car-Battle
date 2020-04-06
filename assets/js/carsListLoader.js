var tokenCount;
var userCars = [];
var selectedCar;

var carLevelWithColor = {
  1: "violet",
  2: "indigo",
  3: "blue",
  4: "green",
  5: "yellow",
  6: "orange",
  7: "red",
};

var CarsListLoader = {
  preload: function () {
    contract.methods
      .balanceOf(web3.eth.defaultAccount)
      .call()
      .then(function (res) {
        tokenCount = res;
        for (var i = 0; i < tokenCount; i++) {
          contract.methods
            .tokenOfOwnerByIndex(web3.eth.defaultAccount, i)
            .call()
            .then(function (index) {
              contract.methods
                .cars(index)
                .call()
                .then(function (car) {
                  userCars.push(car);
                });
            });
        }
      });
  },

  update: function () {
    if (userCars.length >= 1) game.state.start("CarsList");
    else {
      console.log("Loading...");
    }
  },
};
