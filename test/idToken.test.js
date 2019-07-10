var IdToken = artifacts.require("./IdToken.sol");
var IdManager = artifacts.require("./IdManager.sol");

const truffleAssert = require('truffle-assertions');


contract('IdToken', function(accounts) {

  const addr1 = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd76"
  const addr2 = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd77"
  const amount = 1000;

  beforeEach(async () => {
    idManagerInstance = await IdManager.deployed();
    idTokenInstance = await IdToken.deployed();
  })

  // mint

  // test that minting cannot take place when recipient is not authorized
  it("Should not mint to unauthorized address", async () => {
    await truffleAssert.fails(
      idTokenInstance.mint(addr1, amount),
      truffleAssert.ErrorType.REVERT,
      "Address not authorized"
    );
  });

  // test that minting can take place when recipient is authorized
  it("Should mint to authorized address", async () => {
    await idManagerInstance.addMember(addr1)
    await idTokenInstance.mint(addr1, amount)
    var balance = await idTokenInstance.balanceOf(addr1)
    assert.equal(balance, amount, 'the balance is not correct')
  })

  // transfer

  // test that a transfer cannot take place when recipient is not authorized
  it("Should not transfer to unauthorized address", async () => {
    await truffleAssert.fails(
      idTokenInstance.transfer(addr2, amount),
      truffleAssert.ErrorType.REVERT,
      "Address not authorized"
    );
  });

  // test that a transfer cannot take place when sender is not authorized
  it("Should not transfer from unauthorized address", async () => {
    await idManagerInstance.addMember(addr2)
    await truffleAssert.fails(
      idTokenInstance.transfer(addr2, amount, {
        from: accounts[1]
      }),
      truffleAssert.ErrorType.REVERT,
      "Address not authorized"
    );
  });

  // test that a transfer can take place when sender and recipient are authorized
  it("Should transfer from authorized address to authorized address", async () => {
    await idManagerInstance.addMember(accounts[1])
    await idManagerInstance.addMember(addr2)
    await idTokenInstance.mint(accounts[1], amount)
    await idTokenInstance.transfer(addr2, amount, {
      from: accounts[1]
    });
    var balance = await idTokenInstance.balanceOf(addr2)
    assert.equal(balance, amount, 'the balance is not correct')
  });

})
