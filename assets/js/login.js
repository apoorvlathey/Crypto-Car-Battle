var Login = {
  preload: function () {
    game.load.image(
      "metamask-login",
      "./assets/images/metamask-login.png"
    );
  },

  create: function () {
    this.add.button(0, 0, "metamask-login", this.web3login, this);
  },

  web3login: function () {
    contract.methods
      .balanceOf(web3.eth.defaultAccount)
      .call()
      .then(function (res) {
        console.log(res, "BALANCE");
        NFT_balance = res;
        if(NFT_balance == 0) {
          game.state.start('Mint');
        } else {
          game.state.start('CarsListLoader');
        }
      });
  },
};
