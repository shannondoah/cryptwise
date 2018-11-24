const SplitwiserRegistry = artifacts.require("./SplitwiserRegistry.sol");
const Database = artifacts.require("./Database.sol");
const Splitwiser = artifacts.require("./Splitwiser.sol");
var helpers = require("./helpers");

contract('Database', (accounts) => {

    let database, splitwiser, registry;
    const alice = accounts[0],
          bob = accounts[1],
          eve = accounts[2];

    it("should be deployed", async () => {
        registry = await SplitwiserRegistry.deployed();
        database = await Database.deployed();
        splitwiser = await Splitwiser.deployed();
        await registry.setDatabase(database.address);
        assert(database !== undefined, "Splitwiser Database is deployed");
    });

    it("should be able to read the currently registered contract", async () => {
        const splitV2 = await Splitwiser.new(database.address);
        await registry.registerContract(splitV2.address);
        const addr = await database.registeredContract.call();
        assert(addr == splitV2.address, "Database can get the registered contract address");
    });

    it("should not persist the old registered contract when it is changed", async () => {
        await registry.registerContract(splitwiser.address);
        const addr = await database.registeredContract.call();
        assert(addr == splitwiser.address, "Database knows the updated contract address");
    });

    it("should not be able to set its own registered contract", async () => {
        try {
            await database.setRegisteredContract();
            assert(false, "Database could set its own registered contract");
        } catch (e) {
            assert(true, "This function can only be executed by the registry contract");
        }
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

    // ======== BIDIRECTIONAL USER IDS/ACCOUNTS

    it("should be able to register a user id to an eth address", async () => {
        try {
            await splitwiser.registerAccount(1, { from: alice });
            assert(true, "Alice could register her address to user id 1");
        } catch (e) {
            assert(false, "Alice could not register her address to user id 1");
        }
    });

    // Maybe an admin could unset a 'hacked' address
    it("should not be able to reset the user id", async () => {
        try {
            await splitwiser.registerAccount(2, { from: alice });
            assert(false, "Alice could register her address to user id 2");
        } catch (e) {
            assert(true, "Alice could not register her address to user id 2");
        }
    });

    it("should be able to get a user id by eth account", async () => {
        acc = await database.addressToUserIds.call(alice);
        assert(acc.toNumber() === 1, "Alice is registered to user id 1");
    });

    it("should be able to get an eth account by user id", async () => {
        acc = await database.registeredAccounts.call(1);
        assert(acc === alice, "Alice is registered to user id 1");
    });

    it("should not be able to reset the eth account", async () => {
        try {
            await splitwiser.registerAccount(1, { from: bob });
            assert(false, "Bob could register his address to user id 1");
        } catch (e) {
            assert(true, "Bob could not register his address to user id 1");
        }
    });

    // ======== EXPENSES

    it("should fail to write an expense when alice calls the contract directly", async () => {
        try {
            await database.addExpense(100, "CAD", "Dinner at Luigis", 1, [1,2,3]);
            assert(false, "A")
        } catch (e) {
            assert(true, "Alice could not write an expense by calling the contract directly");
        }
    });

    it("should write an expense when called by the registered contract", async () => {
        try {
            await splitwiser.recordExpense(100, "CAD", "Dinner at Luigis", 1, [1,2,3]);
            assert(true, "Could write an expense");
        } catch (e) {
            assert(false, "Failed to write an expense");
        }
    });

    // Events fired through other contracts are not accessible via
    // tx.logs. They are available via tx.receipt.logs, but are
    // encrypted with all the return information.
    it("should fire an event when an expense is created", async () => {
        let tx = await splitwiser.recordExpense(30, "CAD", "Movie tickets", 1, [1,2]);
        assert.equal(tx.receipt.logs.length, 1, "1 event should fire.");
    });

    it("should be able to read an expense", async () => {
        let exp = await database.expenses.call(0);
        assert(exp[3] === "Dinner at Luigis", "Description matches first recorded expense");
    });

    it("should be able to delete an expense", async () => {
        assert(false, "Functionality not implemented")
    });

    it("should fire an event when an expense is deleted", async () => {
        assert(false, "Functionality not implemented")
    });

    it("should set an expense owner when creating an expense", async () => {
        let ownedExps = await database.ownedExpensesFor(1);
        assert(ownedExps.length == 2, "User id 1 created 2 expenses");
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
