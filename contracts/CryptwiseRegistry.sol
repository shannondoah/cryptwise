pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";

contract CryptwiseRegistry is Ownable {
  Escrow private escrow;
  address public registeredContract;
  address[] public previousRegisteredContracts;

  event RegisteredContract(address indexed _address);

  function setEscrow(address _address) onlyOwner external {
    escrow = Escrow(_address);
  }

  function registerContract(address _address) onlyOwner external {
    if(_address != registeredContract) {
      previousRegisteredContracts.push(registeredContract);
      registeredContract = _address;
      if (address(escrow) != address(0)) {
        Cryptwise(registeredContract).transferPrimary(_address);
      }
      emit RegisteredContract(_address);
    }
  }
}
