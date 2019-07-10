pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol';
import './IdManager.sol';


/// @dev Extension of `ERC20` that allows token transactions only between addresses authorized (or identified) by a 3rd party (or consortium of 3rd parties)
/// @title A token for authorized users
/// @author Aristide Piazza

contract IdToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {

  /// @dev reference to Identity Manager contract
  IdManager private _idManager;

  /// @dev constructor
  constructor (string memory name, string memory symbol, uint8 decimals, address idManagerAddress) ERC20Detailed(name, symbol, decimals) public {
    _idManager = IdManager(idManagerAddress);
  }


  /// @return Identity Manager contract address
  function idManager() public view returns (address) {
      return address(_idManager);
  }

  /// @dev require that an address is authorized perform token transactions
  modifier checkAuthorized(address addr) {
     require(_checkAuthorized(addr) == true, 'Address not authorized');
    _;
  }

  /// @dev query the Identity Manager Contract
  function _checkAuthorized(address addr) private view returns (bool) {
     return(_idManager.verifyAddress(addr));
  }

  /// @dev overwrites ERC20 transfer function checking if the token sender and recipient are authorized
  function transfer(address recipient, uint256 amount) public checkAuthorized(msg.sender) checkAuthorized(recipient) returns (bool) {
    return super.transfer(recipient, amount);
  }

  /// @dev overwrites ERC20 transferFrom function checking if the token sender and recipient are authorized
  function transferFrom(address sender, address recipient, uint256 amount) checkAuthorized(sender) checkAuthorized(recipient) public returns (bool) {
    return super.transferFrom(sender, recipient, amount);
  }

  /// @dev overwrites ERC20 mint function checking if the recipient accojnt is authorized
  function mint(address account, uint256 amount) public checkAuthorized(account) returns (bool) {
    return super.mint(account, amount);
  }

}
