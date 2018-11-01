const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");

contract('SplitwiserRegistry', (accounts) => {

    let splitwiserRegistry;

    it("should assert true", async () => {
        splitwiserRegistry = await SplitwiserRegistry.deployed();
        assert(splitwiserRegistry !== undefined, "Splitwiser Registry is deployed");
    });

    it("should store a ledger of the most up to date contracts", async () => {

    });

    it("should allow alice to register a contract", async () => {

    });

    it("should not allow bob to register a contract", async () => {
        // anyone who is not the owner of the original contract
        // (presumably, this registry) should not be allowed to
        // register any contract
    });

    it("should allow alice to register a new contract over the previous", async () => {
        // newly deployed contract should overwrite the old
    });

    it("should fire an event when a contract is registered", async () => {

    });
});
