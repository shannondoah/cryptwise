const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
const Splitwiser = artifacts.require("./Splitwiser.sol");
const Database = artifacts.require("./Database.sol");
var helpers = require("./helpers");

contract('SplitwiserRegistry', (accounts) => {

    let splitwiserRegistry, splitwiser, db;
    const alice = accounts[0], bob = accounts[1];

    it("should be deployed", async () => {
        splitwiser = await Splitwiser.deployed();
        splitwiserRegistry = await SplitwiserRegistry.deployed();
        assert(splitwiserRegistry !== undefined, "Splitwiser Registry is deployed");
    });

    it("should register the currently deployed Splitwiser contract", async () => {
        try {
            await splitwiserRegistry.registerContract(splitwiser.address);
            assert(true, "Successfully executed register function")
        } catch (e) {
            assert(false, "Did not register contract");
        }
    });

    it("should be able to return the registered contract address", async () => {
        await splitwiserRegistry.registerContract(splitwiser.address);
        const registered = await splitwiserRegistry.registeredContract.call();
        assert(registered == splitwiser.address, "Deployed contract successfully registered");
    });

    it("should not allow bob to register a contract", async () => {
        // anyone who is not the owner of the original contract
        // (presumably, this registry) should not be allowed to
        // register any contract
        try {
            await splitwiserRegistry.registerContract(splitwiser.address, { from: bob });
            assert(false, "Bob was able to register a new contract")
        } catch (e) {
            assert(true, "Bob was not able to register a new contract");
        }
    });

    it("should allow alice to register a new contract over the previous", async () => {
        // newly deployed contract address should overwrite the old
        const db = await Database.deployed();
        const splitV2 = await Splitwiser.new(db.address);
        await splitwiserRegistry.registerContract(splitV2.address);
        const registered = await splitwiserRegistry.registeredContract.call();
        assert(registered == splitV2.address, "New contract successfully registered");
    });

    it("should fire an event when a contract is registered", async () => {
        const db = await Database.deployed();
        const splitV3 = await Splitwiser.new(db.address);
        const tx = await splitwiserRegistry.registerContract(splitV3.address);
        assert.eventOfType(tx, "RegisteredContract");
    });

    it("should keep a record of the previous contracts", async () => {
        const firstContract = await splitwiserRegistry.previousRegisteredContracts.call(1);
        assert(firstContract == splitwiser.address, "Previous contracts contains original deployed splitwiser address");
    });
});
