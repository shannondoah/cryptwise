const CryptwiseRegistry = artifacts.require("./CryptwiseRegistry.sol");
const Cryptwise = artifacts.require("./Cryptwise.sol");
var helpers = require("./helpers");

contract('Cryptwise', (accounts) => {

    let cryptwiseRegistry, cryptwise, escrow;
    const alice = accounts[0], bob = accounts[1];

    it("should be deployed", async () => {
        cryptwise = await Cryptwise.deployed();
        assert(cryptwise!== undefined, "Cryptwise is deployed");
    });

    it("should have an owner", async () => {
        const owner = await cryptwise.owner();
        assert(owner === alice, "Alice is the account owner");
    })

    it("should have an Escrow", async () => {
        const escrow = await cryptwise.escrow();
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

    it("should not allow anyone else to transfer the escrow", async () => {
        const cryptV1 = await Cryptwise.new();
        const cryptV2 = await Cryptwise.new();
        try {
            await cryptwise.transferEscrow(cryptwise.address, {from: bob});
            assert(false, "Bob strikes again")
        } catch (e) {
            assert(true, "Bob got told to stuff it")
        }
    })
});
