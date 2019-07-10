var IdManager = artifacts.require("./IdManager.sol");

const truffleAssert = require('truffle-assertions');

contract('IdManager', function(accounts) {

  const addr1 = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"

  beforeEach(async () => {
    instance = await IdManager.new()
  })


  // test that at the beginning all addresses are not authorized (using a random address)
  it("Should start empty", async () => {
    var authorized = await instance.verifyAddress(addr1);
    assert.equal(authorized, false, 'the address should not be authorized')
  });

  // test that accounts different from contract owner cannot add new members
  it("Should not be able to add or remove an address", async () => {
    await truffleAssert.fails(
      instance.addMember(addr1, {
        from: accounts[1]
      }),
      truffleAssert.ErrorType.REVERT,
      "Address not authorized"
    );
  });

  // test that contract owner can add or delete members
  it("Should add and remove an address", async () => {
    await instance.addMember(addr1);
    var authorized = await instance.verifyAddress(addr1);
    assert.equal(authorized, true, 'the address should be authorized')
    await instance.removeMember(addr1);
    var authorized = await instance.verifyAddress(addr1);
    assert.equal(authorized, false, 'the address should not be authorized')
  });

  // test that MemberAdded is emitted when a member is added
  it("should emit MemberAdded event when a member is added", async () => {
    var eventEmitted = false
    const tx = await instance.addMember(addr1)
    if (tx.logs[0].event == "MemberAdded") {
      eventEmitted = true
    }
    assert.equal(eventEmitted, true, 'adding a member should emit a MemberAdded')
  });


  // test that MemberRemoved is emitted when a member is removed
  it("should emit MemberRemoved event when a member is removed", async () => {
    var eventEmitted = false
    const tx = await instance.removeMember(addr1)
    if (tx.logs[0].event == "MemberRemoved") {
      eventEmitted = true
    }
    assert.equal(eventEmitted, true, 'removing a member should emit a MemberRemoved')
  });

})
