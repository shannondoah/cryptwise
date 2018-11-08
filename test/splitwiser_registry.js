const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
const Splitwiser = artifacts.require("./Splitwiser.sol");

contract('SplitwiserRegistry', (accounts) => {

    let splitwiserRegistry, splitwiser;

    assert.eventOfType = function(response, eventName) {
        return this.equal(response.logs[0].event, eventName, eventName + ' event should fire.');
    }

    it("should assert true", async () => {
        splitwiser = await Splitwiser.deployed();
        splitwiserRegistry = await SplitwiserRegistry.deployed();
        assert(splitwiserRegistry !== undefined, "Splitwiser Registry is deployed");
    });

    it("should register the currently deployed Splitwiser contract", async () => {
        try {
            await splitwiserRegistry.registerContract(splitwiser);
            assert(true, "Successfully executed register function")
        } catch (e) {
            assert(false, "Did not register contract");
        }
    });

    it("should be able to return the registered contract address", async () => {
        await splitwiserRegistry.registerContract(splitwiser);
        const registered = await splitwiserRegistry.registeredContract.call();
        assert(registered == splitwiser, "Deployed contract successfully registered");
    });

    it("should not allow bob to register a contract", async () => {
        // anyone who is not the owner of the original contract
        // (presumably, this registry) should not be allowed to
        // register any contract
        try {
            await splitwiserRegistry.registerContract(splitwiser, { from: bob });
            assert(false, "Bob was able to register a new contract")
        } catch (e) {
            assert(true, "Bob was not able to register a new contract");
        }
    });

    it("should allow alice to register a new contract over the previous", async () => {
        // newly deployed contract should overwrite the old
        const splitV2 = await Splitwiser.new();
        await splitwiserRegistry.registerContract(splitV2);
        const registered = await splitwiserRegistry.registeredContract.call();
        assert(registered == splitV2, "New contract successfully registered");
    });

    it("should fire an event when a contract is registered", async () => {
        const splitV3 = await Splitwiser.new();
        const tx = await splitwiserRegistry.registerContract(splitV3);
        assert.eventOfType(tx, "RegisteredContract");
    });

    it("should keep a record of the previous contracts", async () => {
        const contractArray = await splitwiserRegistry.previousRegisteredContracts.call();
        assert(contractArray[0] == splitwiser, "Previous contracts contains original deployed splitwiser address");
    });
});
