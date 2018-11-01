var Database = artifacts.require("./Database.sol");

module.exports = function(deployer) {
  deployer.deploy(Database);
};
