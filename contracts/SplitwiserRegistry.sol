pragma solidity ^0.4.24;

import "ownable";

contract SplitwiserRegistry is Ownable {
  mapping(string => address) public registeredContracts;

  event RegisteredContract

  constructor () {

  }

  function registerContract(string _name, address _address) onlyOwner {
    registeredContracts[_name] = _address;
    emit RegisteredContract;
  }
}
