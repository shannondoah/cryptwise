pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SplitwiserRegistry is Ownable {
  address public registeredContract;
  address[] public previousRegisteredContracts;

  event RegisteredContract(address indexed _address);

  function registerContract(address _address) onlyOwner external {
    if(_address != registeredContract) {
      previousRegisteredContracts.push(registeredContract);
      registeredContract = _address;
      emit RegisteredContract(_address);
    }
  }
}
