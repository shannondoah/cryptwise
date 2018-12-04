# Cryptwise

Simple series of contracts to enable pull payments between parties. Integrated with the [Cryptwise Rails Application](https://github.com/shannondoah/cryptwise-app) as a method of settling debts between users. 

The two main contracts are the CryptwiseRegistry and Cryptwise. The registry is a simply registry for maintaining the most up to date version of the contract and inherits from open zeppelin's Ownable contract. Cryptwise is responsible for depositing and withdrawing payments, and initializes an instance of zeppelin's Escrow, which inherits from Secondary. Cryptwise is also responsible for assigning the Escrow to a new Cryptwise if the contract is ever updated. 

My original idea was to have a lot more functionality on the blockchain side of things (you can get an idea of where things were going if you check out the Cryptwise contract in the `RIP` branch). I had originally designed for all expenses to be recorded on the blockchain, but I ultimately scrapped most of it because it was expensive, messy, and contrary to one of the personal objectives I wanted to accomplish with this project, namely, in this case, for the blockchain aspect of the app to be a value added, not a requirement. The reason for that being that I think you can introduce more reluctant adopters of the technology if you integrate it into a service that they're already using.

