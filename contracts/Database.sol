pragma solidity ^0.4.24;

contract Database {

  Expense[] public expenses;

  struct Expense {
    uint256 amount;
    uint64 created;
    string description;
    uint256 payor;
    uint256[] debtors;
  }

  // Use account ids in place of addresses in order to enable a usr to record transactions including users that may not have registered yet
  mapping(uint256 => address) public accounts;

  // uint256 keys represent user ids , ex:
  // user1: { owes user2: $10 }, { owes user3: $20 }
  // user2: { user1: -10 } , {user3: 10}
  // user3: {user1: -20}, {user2: -10}
  // positive balance indicates primary owes them, negative indicates that the primary is owed
  mapping(uint256 => mapping(uint256 => uint256)) public balancesOf;

  mapping(uint256 => uint256) public totalBalanceOf;

  mapping(address => uint256) public fundsInEscrow;

  constructor () public {

  }

  function setAccount(uint256 _userId, address _address) external {
    accounts[_userId] = _address;
  }

}
