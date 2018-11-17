const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
var Database = artifacts.require("./Database.sol");

module.exports = function(deployer) {
  deployer.deploy(Database, SplitwiserRegistry.address);
};
