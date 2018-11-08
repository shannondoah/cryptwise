pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SplitwiserRegistry is Ownable {
  address public registeredContract;
  address[] public previousRegisteredContracts;

  event RegisteredContract(address indexed _address);

  function registerContract(address _address) onlyOwner public {
    if(_address != registeredContract) {
      previousRegisteredContracts.push(registeredContract);
      registeredContract = _address;
      emit RegisteredContract(_address);
    }
  }

  // This is only here as a fallback, this contract is not
  // intended to be used as a delegator
  function() public {
    if(!registeredContract.delegatecall(msg.data)) revert();
  }
}
