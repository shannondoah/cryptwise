const CryptwiseRegistry = artifacts.require("./CryptwiseRegistry.sol");
const Cryptwise = artifacts.require("./Cryptwise.sol");
var helpers = require("./helpers");

contract('Cryptwise', (accounts) => {

    let cryptwiseRegistry, cryptwise;
    const alice = accounts[0], bob = accounts[1];

    it("should be deployed", async () => {
        cryptwise = await Cryptwise.deployed();
        assert(cryptwise!== undefined, "Cryptwise is deployed");
    });

    it("should have an Escrow", async () => {

    })

});
