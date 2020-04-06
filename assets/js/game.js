var cursors;
var velocity = 0;
var initTime;
var trigger1, trigger2, trigger3;
var started = 0,
  checkpoint = 0,
  end = 0;

var finalScore;

var Game = {
  preload: function () {
    game.load.spritesheet("map2", "./assets/images/map2.jpg");
    game.load.image(
      "car",
      `./assets/images/cars/${carLevelWithColor[selectedCar.level]}.png`
    );
    game.load.spritesheet("building", "./assets/images/building.png");
    game.load.physics("collision", "./assets/js/collision.json");
    game.load.image("trigger", "./assets/images/trigger1.png");
  },

  create: function () {
    /*Enable Phyics Engine*/
    game.physics.startSystem(Phaser.Physics.P2JS);
    /*Adding Map*/
    var map = game.add.sprite(0, 0, "map2");
    /*Adding car*/
    car = game.add.sprite(570, 100, "car");
    game.physics.p2.enable(car);
    car.body.angle = 90;

    cursors = game.input.keyboard.createCursorKeys();

    /*Create Collision Groups*/
    var carCollisionGroup = game.physics.p2.createCollisionGroup();
    var buildingCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    /*Adding Building*/
    var building = game.add.sprite(640, 420, "building");
    game.physics.p2.enable(building);
    building.body.kinematic = true; //Building is static
    building.body.clearShapes(); //Remove standard Bounding Box
    building.body.loadPolygon("collision", "building"); //Load Bounding Box from Physics Editor File

    //Set Collision Groups
    car.body.setCollisionGroup(carCollisionGroup);
    building.body.setCollisionGroup(buildingCollisionGroup);

    //Set Collision
    car.body.collides([carCollisionGroup, buildingCollisionGroup]);
    building.body.collides([buildingCollisionGroup, carCollisionGroup]);

    initTime = 0;
    clockText = game.add.text(0, 0, "Time: 0 sec", {
      font: "42px Arial",
      fill: "#fff",
      align: "right",
    });
    trigger1 = game.add.sprite(708, 38, "trigger");
    trigger2 = game.add.sprite(236, 656, "trigger");
    trigger3 = game.add.sprite(632, 38, "trigger");

    finalScore = 999999;
  },

  checkOverlap: function (spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },

  update: function () {
    /*Update Velocity*/
    if (cursors.up.isDown && velocity <= 400) {
      velocity += 7;
    } else if (cursors.down.isDown && velocity >= -400) {
      velocity -= 7;
    } else {
      if (velocity >= 7) velocity -= 7;
      if (velocity <= -7) velocity += 7;
    }

    /*Set X and Y Speed of Velocity*/
    car.body.velocity.x = velocity * Math.cos((car.angle - 90) * 0.01745);
    car.body.velocity.y = velocity * Math.sin((car.angle - 90) * 0.01745);

    /*Rotation of Car*/
    if (cursors.left.isDown) car.body.angularVelocity = -5 * (velocity / 1000);
    else if (cursors.right.isDown)
      car.body.angularVelocity = 5 * (velocity / 1000);
    else car.body.angularVelocity = 0;

    if (!started && this.checkOverlap(car, trigger1)) {
      // Game Started
      initTime = Date.now();
      started = 1;
    }
    if (started && this.checkOverlap(car, trigger2)) {
      checkpoint = 1;
    }
    if (started && checkpoint && !end && this.checkOverlap(car, trigger3)) {
      end = 1;
      finalScore = (Math.floor((Date.now() - initTime) / 10));
      game.state.start("OpenForBattle");
    }
  },

  render: function () {
    if (started)
      clockText.text = "Time: " + (Math.floor((Date.now() - initTime) / 10))/100 + " sec";
  },
};
