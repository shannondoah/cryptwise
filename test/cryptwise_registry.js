const CryptwiseRegistry = artifacts.require("./CryptwiseRegistry.sol");
const Cryptwise = artifacts.require("./Cryptwise.sol");
var helpers = require("./helpers");

contract('CryptwiseRegistry', (accounts) => {

    let cryptwiseRegistry, cryptwise;
    const alice = accounts[0], bob = accounts[1];

    it("should be deployed", async () => {
        cryptwise = await Cryptwise.deployed();
        cryptwiseRegistry = await CryptwiseRegistry.deployed();
        assert(cryptwiseRegistry !== undefined, "Cryptwise Registry is deployed");
    });

    it("should register the currently deployed Cryptwise contract", async () => {
        try {
            await cryptwiseRegistry.registerContract(cryptwise.address);
            assert(true, "Successfully executed register function")
        } catch (e) {
            assert(false, "Did not register contract");
        }
    });

    it("should be able to return the registered contract address", async () => {
        await cryptwiseRegistry.registerContract(cryptwise.address);
        const registered = await cryptwiseRegistry.registeredContract.call();
        assert(registered == cryptwise.address, "Deployed contract successfully registered");
    });

    it("should not allow bob to register a contract", async () => {
        // anyone who is not the owner of the original contract
        // (presumably, this registry) should not be allowed to
        // register any contract
        try {
            await cryptwiseRegistry.registerContract(cryptwise.address, { from: bob });
            assert(false, "Bob was able to register a new contract")
        } catch (e) {
            assert(true, "Bob was not able to register a new contract");
        }
    });

    it("should allow alice to register a new contract over the previous", async () => {
        // newly deployed contract address should overwrite the old
        const cryptV2 = await Cryptwise.new();
        await cryptwiseRegistry.registerContract(cryptV2.address);
        const registered = await cryptwiseRegistry.registeredContract.call();
        assert(registered == cryptV2.address, "New contract successfully registered");
    });

    it("should fire an event when a contract is registered", async () => {
        const cryptV3 = await Cryptwise.new();
        const tx = await cryptwiseRegistry.registerContract(cryptV3.address);
        assert.eventOfType(tx, "RegisteredContract");
    });

    it("should keep a record of the previous contracts", async () => {
        const firstContract = await cryptwiseRegistry.previousRegisteredContracts.call(1);
        assert(firstContract == cryptwise.address, "Previous contracts contains original deployed cryptwise address");
    });
});
