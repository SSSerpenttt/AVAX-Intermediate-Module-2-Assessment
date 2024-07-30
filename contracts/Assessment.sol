// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    //Displays the current balance
    function getBalance() public view returns (uint256) {
        return balance;
    }

    //Function that accepts ETH deposit based on user input
    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        //Ensure address is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        //Perform transaction
        balance += _amount;

        //Assert a successful transaction
        assert(balance == _previousBalance + _amount);

        //Emit event
        emit Deposit(_amount);
    }

    //Error handling
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    //Function that manages ETH withdraw based on user input
    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        //Withdraw the given amount
        balance -= _withdrawAmount;

        //Assert if balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        //Emit event
        emit Withdraw(_withdrawAmount);
    }
}
