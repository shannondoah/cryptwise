pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Cryptwise is Ownable {
  Escrow private _escrow;

  constructor() public {
    _escrow = new Escrow();
  }

  function escrow() external view onlyOwner returns(address) {
    return address(_escrow);
  }

  function setEscrow(address _address) internal {
    _escrow = Escrow(_address);
  }

  function transferEscrow(address _address) external onlyOwner {
    // ensure address is the new registered contract address
    _escrow.transferPrimary(_address);
  }

}
