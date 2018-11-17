const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
const Database = artifacts.require("./Database.sol");
const Splitwiser = artifacts.require("./Splitwiser.sol");
var helpers = require("./helpers");

contract('Database', (accounts) => {

    let database, splitwiser, registry;

    it("should be deployed", async () => {
        registry = await SplitwiserRegistry.deployed();
        database = await Database.deployed();
        assert(database !== undefined, "Splitwiser Database is deployed");
    });

    it("should be deployed", async () => {
        splitwiser = await Splitwiser.deployed();
        assert(splitwiser !== undefined, "Splitwiser Database is deployed");
    });

    it("should be able to access the currently registered contract", async () => {
        await registry.registerContract(splitwiser.address);
        const addr = await database.getRegisteredContract();
        assert(addr == splitwiser.address, "Database can get the registered contract address");
    });

    it("does not have owner access to the registry", async () => {
        // verify that database should not be able to register a new contract
        try {
            await registry.registerContract(splitwiser.address, { from: database });
            assert(false, "Database could update registry");
        } catch (e) {
            assert(true, "Database could not register a new contract");
        }
    });

    it("should store an array of expenses", async () => {
        // solidity does not return a whole array by default, need to pass an index or create a custom getter
    });

    it("should have a mapping of expense ids (array position) to accounts", async () => {
        //
    });

    it("should store a mapping of app account ids to addresses", async () => {
        // should actually look into this - a user can have multiple
        // addresses so maybe there should be some kind of intermediary
        // check to ensure that the stored address is actually valid
        // OR maybe that structure needs to allow for multi addresses
        // Maybe user can only have one registered address at a time but
        // can change it
    });

    it("should store a mapping of addresses to user ids", async () => {
        // needs to store two mappings to each value is accessible when only one is known - can also be used to validate
    });

    it("should store the balances of each user", async () => {
        // ensure that a mapping of mappings works... may need to use
        // the custom getter from other contract to actually read the
        // values though
    });

    it("should also store the total balance for each user", async () => {
        // this is mostly for easy reading by the app
    });

    it("should store the total funds available in escrow for a given account", async () => {
        // also for easy reading by the app
    });
});
