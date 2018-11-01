const Splitwiser = artifacts.require("./Splitwiser.sol");

contract('Splitwiser', (accounts) => {

    let splitwiser;

    it("should assert true", async () => {
        splitwiser = await Splitwiser.deployed();
        assert(splitwiser !== undefined, "Splitwiser Registry is deployed");
    });

    it("should register itself on deploy", async () => {
        // May need to look into registry pattern to see exactly
        // how this should work - some mechanism to ensure new contract
        // owner is the same as prev contract owner
    });

    it("should be able to read from the database contract", async () => {
        // test custom getBalance methods by user
    });

    it("should be able to record and expense", async () => {

    });

    it("should be able to register an account", async () => {
        // see database to determine exactly how those accounts are
        // stored, in the event that the same user id is connected to
        // multiple addresses
    });

    it("should be able to record an off-chain payment", async () => {
        // recordPayment function
    });

    it("should emit an event when recording an off-chain payment", async () => {
        // "hey, I did a thing"
    });

    it("should allow bob to settle their debt to eve for a single expense", async () => {
        // bob should be able to settle an individual debt
    });

    it("should allow bob to settle their total debt to eve, for multiple expenses", async () => {
        // bob should be able to settle all debts to one account
    });

    it("should allow bob to settle all debts with a single payment", async () => {
        // stretch --> bob should be able to settle up with eve, alice, and carole by making a single payment
    });

    it("should allow eve to withdraw her funds", async () => {
        // bob and alice have both settled their debts with eve.
        // eve should be able to withdraw the all funds from
        // their available pool
    });
});
