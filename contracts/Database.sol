pragma solidity ^0.4.24;

import "./SplitwiserRegistry.sol";

contract Database {
  // For calculating balances
  // using SafeMath for uint256; <- would also need to import this contract
  SplitwiserRegistry public registry;
  Expense[] public expenses;

  struct Expense {
    uint256 amount;
    uint64 created;
    string description;
    uint256 paidBy;
    uint256[] owedBy;
  }

  // User id (account who created expense) to Expense id
  mapping(uint256 => uint256[]) public ownedExpenses;

  // User id (involved as paid by or owed by) to Expense id
  mapping(uint256 => uint256[]) public involvedExpenses;

  // Use account ids in place of addresses in order to enable a user to record transactions including users that may not have registered yet
  mapping(uint256 => address) public registeredAccounts;
  // Bi-directional mapping
  mapping(address => uint256) public addressToUserIds;

  // uint256 keys represent user ids , ex:
  // user1: { owes user2: 10 }, { owes user3: 20 }
  // user2: { user1: -10 } , {user3: 10}
  // user3: {user1: -20}, {user2: -10}
  // positive balance indicates primary owes them, negative indicates that the primary is owed
  mapping(uint256 => mapping(uint256 => int) public balancesOf;

  mapping(uint256 => int) public totalBalanceOf;

  event AccountSet(
    uint256 indexed _userId,
    address indexed _address
  );
  event ExpenseAdded(
    uint256 indexed _expenseId,
    uint256 _amount,
    string _description
  );

  constructor (address _registryAddress) public {
    registry = SplitwiserRegistry(_registryAddress);
  }

  // modifier to ensure only the registered contract is attempting to make changes to the Database
  modifier validCaller {
    require(msg.sender == getRegisteredContract(), "Only registered Splitwiser contract may make updates to the database, refer to SplitwiserRegistry for latest version.");
    _;
  }

  function getRegisteredContract() public constant returns (address) {
    return registry.registeredContract();
  }

  // Do I need to create an interface to access these methods?
  // https://ethereum.stackexchange.com/questions/46335/change-state-variable-content-in-contract-a-from-contract-b
  function setAccount(uint256 _userId, address _address) external validCaller {
    registeredAccounts[_userId] = _address;
    addressToUserIds[_address] = _userId;

    emit AccountSet(_userId, _address);
  }

  function addExpense(uint256 _amount, string _description, uint256 _paidBy, uint256[] _owedBy) external validCaller {
    // verify owedBy length < 100
    uint256 newExpenseId = expenses.push(Expense(_amount, uint64(now), _description, _paidBy, _owedBy)) - 1;

    ownedExpenses[addressToUserIds[msg.sender]].push(newExpenseId);
    emit ExpenseAdded(newExpenseId, _amount, _description);
  }

}
