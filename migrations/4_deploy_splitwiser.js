var Database = artifacts.require("./Database.sol");
var Splitwiser = artifacts.require("./Splitwiser.sol");

module.exports = function(deployer) {
  deployer.deploy(Splitwiser, Database.address);
};
