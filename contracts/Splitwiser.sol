pragma solidity ^0.4.24;

import "openzeppelin/escrow"

contract Splitwiser {

  constructor () {
  }

  getExpenses()

  getBalancesOf(uint256 _userId)

  getTotalBalanceOf(uint256 _userId)

  getFundsInEscrow(uint256 _userId) returns (uint256) {
    account = accounts[_userId]
    return fundsInEscrow[account];
  }

  recordExpense(
    uint256 _amount,
    uint64 _created,
    string _description,
    uint256 _payor,
    uint256[] _debtors
  ) {
    // register the expense and then split the amounts evenly between debtors
  }

  registerAccount(uint256 _userId) {
    accounts[_userId] = msg.sender;
  }

  recordPayment(uint256 _from, uint256 _to) {
    // for off-chain settlements
  }


  // for following two methods, ensure recipient has registered an address,
  // otherwise return an error and force them to settle off-chain
  settleDebt(uint256 _userId) external payable {
    // transfer value to contract
    // contract sets a withdrawal balance for _userId
    // update totalBalanceOf and balancesOf[msg.sender][_userId]
  }

  settleAllDebts() {
    // ensure value sent is equal to totalBalanceOf
    // transfer value to contract to hold in escrow
    // need to find some safe way to loop through user’s balancesOf,
    // zero out positive balances and increase the amount for
    // withdrawal for each person owed
  }

  withdrawFunds(uint256 _amount) {
    fundsInEscrow[msg.sender]
  }

}
