const { catchRevert } = require("./exceptionsHelpers.js");
const NFTLuxWine = artifacts.require("./NFTLuxWine.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NFTLuxWine", function (accounts) {
  const [Winery, User] = accounts;

  beforeEach(async () => {
    instance = await NFTLuxWine.new();
  });

  describe("Ready to be tested", () => {
    it("should assert true", async function () {});
  });

  describe("Contract", () => {
    it("should have an owner", async () => {
      assert.equal(typeof instance.owner, "function", "the contract has no owner");
    });
    it("is owned by Winery", async () => {
      assert.equal(await instance.owner.call(), Winery, "owner is not correct");
    });
  });

  describe("Mint", () => {
    it("should be minted only by the Winery", async () => {
      await instance.mintWine("www.uri.it", "Barolo", 100, true, { from: Winery });
      await catchRevert(instance.mintWine("www.uri.it", "Barolo", 100, true, { from: User }));
    });
  });

  describe("Purchase", () => {
    it("should be purchased only by other account", async () => {
      await instance.mintWine("www.uri.it", "Barolo", 100, true, { from: Winery });
      await instance.purchaseWine(1, { from: User, value: 100 });
    });

    it("should be not purchased by the owner", async () => {
      await instance.mintWine("www.uri.it", "Barolo", 100, true, { from: Winery });
      await catchRevert(instance.purchaseWine(1, { from: Winery, value: 100 }));
    });

    it("price should be equal to the price offers", async () => {
      await instance.mintWine("www.uri.it", "Barolo", 2000, true, { from: Winery });
      await instance.purchaseWine(1, { from: User, value: 2000 });
      await catchRevert(instance.purchaseWine(1, { from: User, value: 1999 }));
      await catchRevert(instance.purchaseWine(1, { from: User, value: 2001 }));
    });
  });
});
