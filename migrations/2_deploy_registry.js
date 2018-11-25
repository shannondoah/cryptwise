var CryptwiseRegistry = artifacts.require("./CryptwiseRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptwiseRegistry);
};
