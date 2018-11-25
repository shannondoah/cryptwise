const CryptwiseRegistry = artifacts.require("./CryptwiseRegistry.sol");
const Cryptwise = artifacts.require("./Cryptwise.sol");
const Escrow = artifacts.require("openzeppelin-solidity/contracts/payment/escrow/Escrow.sol");
var helpers = require("./helpers");

contract('Cryptwise', (accounts) => {

    let cryptwiseRegistry, cryptwise, escrow;
    const alice = accounts[0],
          bob = accounts[1],
          eve = accounts[2],
          greg = accounts[3];

    it("should be deployed", async () => {
        cryptwise = await Cryptwise.deployed();
        assert(cryptwise!== undefined, "Cryptwise is deployed");
    });

    it("should have an owner", async () => {
        const owner = await cryptwise.owner();
        assert(owner === alice, "Alice is the account owner");
    })

    it("should have an Escrow", async () => {
        escrow = await cryptwise.escrow();
        const isAddr = escrow.match(/^0x/).length > 0
        const notZeroAddr = escrow !== "0x0000000000000000000000000000000000000000";
        assert(isAddr && notZeroAddr, "Value is an address")
    })

    it("should not provide escrow address to anyone besides owner", async () => {
        try {
            await cryptwise.escrow({ from: bob });
            assert(false, "Bob can do whatever he wants D:");
        } catch (e) {
            assert(true, "Bob got kicked to the curb");
        }
    })

    it("should allow the owner to transfer an Escrow", async () => {
        const cryptV1 = await Cryptwise.new();
        const cryptV2 = await Cryptwise.new();
        try {
            await cryptV1.transferEscrow(cryptV2.address);
            assert(true, "Escrow owner could transfer ownership");
        } catch (e) {
            assert(false, "Escrow owner could not transfer ownership");
        }
    })

    it("should be able to set the private escrow variable", async () => {
        const cryptV1 = await Cryptwise.new();
        const e1 = await cryptV1.escrow();

        const cryptV2 = await Cryptwise.new();
        await cryptV2.setEscrow(e1);
        const e2 = await cryptV2.escrow();
        assert(e1 === e2, "New contract should use the same escrow");
    });


    it("should not allow anyone else to transfer the escrow", async () => {
        const cryptV1 = await Cryptwise.new();
        const cryptV2 = await Cryptwise.new();
        try {
            await cryptV1.transferEscrow(cryptV2.address, {from: bob});
            assert(false, "Bob strikes again")
        } catch (e) {
            assert(true, "Bob got told to stuff it")
        }
    });

    it("should not be able to deposit to the escrow if the escrow has been set but has not been transferred", async () => {
        const cryptV1 = await Cryptwise.new();
        await cryptV1.setEscrow(escrow);
        try {
            await cryptV1.deposit(bob);
            assert(false, "H4CK3D")
        } catch (e) {
            assert(true, "Random contract can't set my escrow as its own")
        }
    });

    it("should not let a contract that is not the primary transfer the escrow", async () => {
        const cryptV1 = await Cryptwise.new();
        await cryptV1.setEscrow(escrow);
        try {
            await cryptV1.transferEscrow(cryptV1);
            assert(false, "PWNED")
        } catch (e) {
            assert(true, "New contract can't set itself as the primary of my escrow, even with it's address")
        }
    });

    it("should allow bob to deposit funds for alice", async () => {
        try {
            let debt = web3.toWei(2, "ether")
            await cryptwise.deposit(alice, {from: bob, value: debt})
            assert(true, "Bob was able to submit some value for alice to withdraw");
        } catch (e) {
            assert(false, "Bob failed to deposit the funds, whatta cheapskate")
        }
    });

    it("should be able to read how much alice can withdraw", async () => {
        const payments = await cryptwise.paymentsFor(alice, {from: bob})
        assert(payments > 0, "Alice has a balance to withdraw");
    });

    it("should allow alice to withdraw her balance", async () => {
        const balance1 = await web3.eth.getBalance(alice)
        await cryptwise.withdraw()
        const balance2 = await web3.eth.getBalance(alice)
        assert(balance2 > balance1, "Alice's balance increased after withdrawing her funds");
    });
});
