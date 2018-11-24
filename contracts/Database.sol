pragma solidity ^0.4.24;

import "./SplitwiserRegistry.sol";

contract Database is Ownable {
  // using SafeMath for uint256; <- would also need to import this contract
  SplitwiserRegistry public registry;
  address public registeredContract;
  Expense[] public expenses;

  struct Expense {
    uint256 amount;
    string currency;
    uint64 created;
    string description;
    uint256 paidBy;
    uint256[] owedBy;
  }

  // User id (account who created expense) to Expense id
  mapping(uint256 => uint256[]) public ownedExpenses;

  // User id (involved as paid by or owed by) to Expense id
  mapping(uint256 => uint256[]) public involvedExpenses;

  // Use account ids in place of addresses in order to enable a user
  // to record transactions including users that may not have
  // registered yet
  mapping(uint256 => address) public registeredAccounts;
  // Bi-directional mapping
  mapping(address => uint256) public addressToUserIds;

  // uint256 keys represent user ids , ex:
  // user1: { owes user2: 10 }, { owes user3: 20 }
  // user2: { user1: -10 } , {user3: 10}
  // user3: {user1: -20}, {user2: -10}
  // positive balance indicates primary owes them,
  // negative indicates that the primary is owed
  mapping(uint256 => mapping(uint256 => int)) public balancesOf;

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
    registeredContract = registry.registeredContract();
  }

  modifier onlyRegistry {
    require(msg.sender == address(registry), "This function can only be executed by the registry contract");
    _;
  }

  // modifier to ensure only the registered contract is attempting to make changes to the Database
  modifier onlyRegisteredContract {
    require(msg.sender == address(registeredContract), "Only registered Splitwiser contract may make updates to the database, refer to SplitwiserRegistry for latest version.");
    _;
  }

  // ---- GETTERS ----
  function ownedExpensesFor(uint256 _userId) view public returns(uint256[]) {
    return ownedExpenses[_userId];
  }

  // ---- SETTERS ----
  function setRegisteredContract() external onlyRegistry {
    registeredContract = registry.registeredContract();
  }

  // Should only be able to set account ONCE, and user Ids should not be their rails incremented id but a random number and length to avoid pre-registering accounts to userids
  function setAccount(uint256 _userId) external onlyRegisteredContract {
    require(registeredAccounts[_userId] == address(0), "User must not have a registered address");
    require(addressToUserIds[tx.origin] == 0, "Address must not be registered to another user id");
    registeredAccounts[_userId] = tx.origin;
    addressToUserIds[tx.origin] = _userId;

    emit AccountSet(_userId, tx.origin);
  }

  function addExpense(
    uint256 _amount,
    string _currency,
    string _description,
    uint256 _paidBy,
    uint256[] _owedBy) external onlyRegisteredContract {
    uint256 newExpenseId = expenses.push(
      Expense(
        _amount,
        _currency,
        uint64(now),
        _description,
        _paidBy,
        _owedBy
      )
    ) - 1;

    ownedExpenses[addressToUserIds[tx.origin]].push(newExpenseId);

    // uint256 splitAmount = _amount / _owedBy.length;

    for (let i = 0; i < _owedBy.length; i++) {
      // involvedExpenses[_owedBy[i]].push(newExpenseId);
      // balancesOf[_owedBy[i]][_paidBy].add(splitAmount);
      // balancesOf[_paidBy][_owedBy[i]].subtract(splitAmount);
    }

    emit ExpenseAdded(newExpenseId, _amount, _description);
  }


}
