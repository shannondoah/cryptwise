const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
const Database = artifacts.require("./Database.sol");
const Splitwiser = artifacts.require("./Splitwiser.sol");
var helpers = require("./helpers");

contract('Database', (accounts) => {

    let database, splitwiser, registry;

    it("should be deployed", async () => {
        registry = await SplitwiserRegistry.deployed();
        database = await Database.deployed();
        splitwiser = await Splitwiser.deployed();
        assert(database !== undefined, "Splitwiser Database is deployed");
    });

    it("should be able to read the currently registered contract", async () => {
        const splitV2 = await Splitwiser.new(database.address);
        await registry.registerContract(splitV2.address);
        const addr = await database.getRegisteredContract();
        assert(addr == splitV2.address, "Database can get the registered contract address");
    });

    it("should not persist the old registered contract when it is changed", async () => {
        await registry.registerContract(splitwiser.address);
        const addr = await database.getRegisteredContract();
        assert(addr == splitwiser.address,"Database knows the updated contract address");
    });

    it("should not be able to modify the registry", async () => {
        // verify that database should not be able to register a new contract
        try {
            await registry.registerContract(splitwiser.address, { from: database });
            assert(false, "Database could update registered contract");
        } catch (e) {
            assert(true, "Database could not register a new contract");
        }
    });

    // describe("expense is created", async () => {})
    // describe("expense is deleted", async () => {})

    it("should be able to write an expense", async () => {

    });

    it("should fire an event when an expense is created", async () => {

    });

    it("should be able to read an expense", async () => {

    });

    it("should be able to delete an expense", async () => {
    });

    it("should fire an event when an expense is deleted", async () => {

    });

    it("should set an expense owner when creating an expense", async () => {
        // see ownedExpenses
    });

    it("should have a function that returns all expense ids/indices created by that user", async () => {
        // this can only be used from web 3, cannot return dynamic array within solidity - can then iterate over that array app-side to retrieve
    });

    it("should remove an expense from a user's owned expenses when the expense is deleted", async () => {
        // see ownedExpenses
    });

    it("should add an expense to each persons involved expenses", async () => {
        // paidBy as well as owedBy should be added
    });

    it("should have a function that returns all involved expense ids/indices for that user", async () => {
        // this can only be used from web 3, cannot return dynamic array within solidity - can then iterate over that array app-side to retrieve
    });


    it("should remove an expense from a user's involved expenses if the expense is deleted", async () => {
        // see involvedExpenses
    });

    it("should store a mapping of app account ids to addresses", async () => {
        //  user can only have one registered address at a time but
        // can change it
    });

    // ======== BIDIRECTIONAL USER IDS/ACCOUNTS

    it("should be able to register a user id to an eth account", async () => {
    });

    it("should be able to get a user id by eth account", async () => {
    });

    it("should be able to get an eth account by user id", async () => {
    });

    it("should be able to reset the eth account", async () => {

    });

    it("should not be able to reset the user id", async () => {
        // should not be able to assign someone else's user id to your account...
    });

    it("should allow account to be unset from user_id if authorized by account", async () => {
        // maybe request prev account authorization for all changes to account registration?
    })


    // =========== BALANCES

    it("should adjust each user to user balance on expense create", async () => {

    })

    it("should be able to store a negative balance", async () => {

    })

    it("should be able to read the balances of each user", async () => {
        // ensure that a mapping of mappings works... may need to use
        // the custom getter from other contract to actually read the
        // values though
    });

    it("should be able to read the balance between two specific users", async () => {

    });

    it("should adjust balances when an off-chain payment is recorded", async () => {

    })

    it("should adjust balances when a deposit is made", async () => {

    })

    it("should set the total balance for each user when an expense is created or payment or deposit made", async () => {
        // this is mostly for easy reading by the app
    });

    it("should also store the total balance for each user", async () => {
        // this is mostly for easy reading by the app
    });
});
