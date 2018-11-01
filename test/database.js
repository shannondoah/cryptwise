const Database = artifacts.require("./Database.sol");

contract('Database', (accounts) => {

    let database;

    it("should assert true", async () => {
        database = await Database.deployed();
        assert(database !== undefined, "Splitwiser Registry is deployed");
    });


    it("should store expenses", async () => {
        // use public getter for expenses
    });

    it("should store a mapping of app account ids to addresses", async () => {
        // should actually look into this - a user can have multiple
        // addresses so maybe there should be some kind of intermediary
        // check to ensure that the stored address is actually valid
        // OR maybe that structure needs to allow for multi addresses
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
    })
});
