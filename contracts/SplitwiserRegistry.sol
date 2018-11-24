pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Database.sol";

contract SplitwiserRegistry is Ownable {
  Database public database;
  address public registeredContract;
  address[] public previousRegisteredContracts;

  event RegisteredContract(address indexed _address);

  function setDatabase(address _address) onlyOwner external {
    database = Database(_address);
  }

  function registerContract(address _address) onlyOwner external {
    if(_address != registeredContract) {
      previousRegisteredContracts.push(registeredContract);
      registeredContract = _address;
      if (address(database) != address(0)) {
        database.setRegisteredContract();
      }
      emit RegisteredContract(_address);
    }
  }
}
