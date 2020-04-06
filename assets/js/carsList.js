var CarsList = {
  preload: function () {
    game.load.image(
      "carslistbg",
      "./assets/images/carslistbg.png"
    );
    for (var i = 1; i <= 7; i++) {
      game.load.image(
        carLevelWithColor[i],
        `./assets/images/cars/${carLevelWithColor[i]}.png`
      );
    }
    game.load.image(
      "homebutton",
      "./assets/images/homebutton.png"
    );
    game.load.image(
      "transferbutton",
      "./assets/images/transferbutton.png"
    );
  },

  create: function () {
    game.add.sprite(0, 0, "carslistbg");
    this.add.button(1180, 10, "homebutton", this.home, this);
    for(var i = 0; i < userCars.length; i++) {
      car = this.add.button(
        145,
        270 + i*130,
        carLevelWithColor[userCars[i].level],
        this.selectCar.bind(this, userCars[i]),
        this
      );
      car.inputEnabled = true;
      car.input.useHandCursor = true;
      game.add.text(
        250,
        300 + i*130,
          `Level: ${userCars[i].level}     Speed: ${userCars[i].speed}`,
        {
          font: "38px Arial",
          fill: "#fff",
          align: "right",
        });
        this.add.button(
          700,
          300 + i*130,
          "transferbutton",
          this.transferCar.bind(this, userCars[i].index, userCars[i].level),
          this
        );
    }
    console.log(userCars);
  },

  selectCar: function (car) {
    selectedCar = car;
    game.state.start('ChallengeChooser');
  },

  transferCar: function(tokenId, level) {
    window.location.href = "./transfer.html?tokenId="+tokenId+"&level="+level;
  },

  home: function () {
    game.state.start('Login');
  },
};
