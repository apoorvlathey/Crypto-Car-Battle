var CarsList = {
  preload: function () {
    for (var i = 1; i <= 7; i++) {
      game.load.image(
        carLevelWithColor[i],
        `./assets/images/cars/${carLevelWithColor[i]}.png`
      );
    }
  },

  create: function () {
    for(var i = 0; i < userCars.length; i++) {
      this.add.button(
        0,
        0 + i*130,
        carLevelWithColor[userCars[i].level],
        this.selectCar.bind(this, userCars[i]),
        this
      );
    }
    console.log(userCars);
  },

  selectCar: function (car) {
    selectedCar = car;
    game.state.start('Game');
  },
};
