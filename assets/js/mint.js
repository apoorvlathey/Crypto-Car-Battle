var Mint = {
  preload: function () {
    game.load.image(
      "mint-car",
      "./assets/images/mint-car.png"
    );
  },

  create: function () {
    this.add.button(0, 0, "mint-car", this.mintCar, this);
  },

  mintCar: function () {
    contract.methods
      .mintCar()
      .send({ from: web3.eth.defaultAccount })
      .then(function (res) {
        console.log(res, "MINTED");
        game.state.start('CarsListLoader');
      });
  },
};
