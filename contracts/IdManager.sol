pragma solidity ^0.5.0;

/// @dev Provides a source of truth, to be used by external contract, to verify if an address is authorized to perform certain kind of operations.
/// @title Identity Manager Contract
/// @author Aristide Piazza
contract IdManager {

  mapping (address => bool) private _whitelist;

  address private _owner;

  /// @dev constructor
  constructor () public {
    _owner = msg.sender;
  }

  /// @dev requires that _owner == msg.sender
  modifier checkSender () {
    require (msg.sender == _owner, "Address not authorized");
    _;
  }

  /// @dev emitted when a new member is added to the whitelist
  event MemberAdded(address member);

  /// @dev emitted when a member is removed from the whitelist
  event MemberRemoved(address member);

  /// @dev add a member to the whitelist. It can be called only by the contract owner
  function addMember(address addr) public checkSender() {
    _whitelist[addr] = true;
    emit MemberAdded(addr);
  }

  /// @dev remove a member from the whitelist. It can be called only by the contract owner
  function removeMember(address addr) public checkSender() {
    _whitelist[addr] = false;
    emit MemberRemoved(addr);
  }

  /// @dev check if a member is in the whitelist, and thus authorized to perform token transactions
  /// @return bool
  function verifyAddress(address addr) public view returns (bool) {
    return _whitelist[addr];
  }

}
