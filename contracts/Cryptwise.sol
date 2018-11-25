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

  /**
    Would only need to use this in future versions of the
    contract, to sync up the old escrow
  */
  function setEscrow(address _address) external onlyOwner {
    _escrow = Escrow(_address);
  }

  function transferEscrow(address _address) external onlyOwner {
    // ensure address is the new registered contract address
    _escrow.transferPrimary(_address);
  }

  function paymentsFor(address _payee) external view returns(uint256) {
    uint256 payments = _escrow.depositsOf(_payee);
    return payments;
  }

  function deposit(address _payee) external payable {
    _escrow.deposit.value(msg.value)(_payee);
  }

  function withdraw() external {
    _escrow.withdraw(msg.sender);
  }
}
