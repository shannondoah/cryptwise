var Cryptwise = artifacts.require("./Cryptwise.sol");

module.exports = function(deployer) {
  deployer.deploy(Cryptwise);
};
