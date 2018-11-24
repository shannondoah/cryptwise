pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "./Database.sol";

contract Splitwiser is Escrow {
  Database public data;

  constructor (address _dbAddress) public {
    data = Database(_dbAddress);
  }

  modifier registeredAccount {
    // ensure msg.sender is a registered account (see Database)
    _;
  }

  function getExpenses() public {}

  function getRegisteredAccount(uint256 _userId) public returns (address) {}

  function getBalancesOf(uint256 _userId) public {}

  function getTotalBalanceOf(uint256 _userId) public returns (uint256) {}

  // function getFundsInEscrow(uint256 _userId) public returns (uint256) {
  //   address account = data.registeredAccounts(_userId);
  //   return data.fundsInEscrow(account);
  // }

  function recordExpense(
    uint256 _amount,
    string _currency,
    string _description,
    uint256 _paidBy,
    uint256[] _owedBy) external {
    require(_owedBy.length < 100, "Payment splitting limited to 99 participants");
    data.addExpense(_amount, _currency, _description, _paidBy, _owedBy);
  }

  function registerAccount(uint256 _userId) public {
    data.setAccount(_userId);
  }

 function  recordPayment(uint256 _from, uint256 _to) public {
    // for off-chain settlements
  }


  // for following two methods, ensure recipient has registered an address,
  // otherwise return an error and force them to settle off-chain
  function settleDebt(uint256 _userId) external payable {
    // transfer value to contract
    // contract sets a withdrawal balance for _userId
    // update totalBalanceOf and balancesOf[msg.sender][_userId]
  }

  function settleAllDebts() public {
    // ensure value sent is equal to totalBalanceOf
    // transfer value to contract to hold in escrow
    // need to find some safe way to loop through user’s balancesOf,
    // zero out positive balances and increase the amount for
    // withdrawal for each person owed
  }

  function withdrawFunds(uint256 _amount) public {
    /// see Escrow.sol
  }

}
