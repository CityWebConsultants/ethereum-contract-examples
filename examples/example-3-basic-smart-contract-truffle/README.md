# Basic Smart Contract development

## Requirements

* NPM
* Web3
* [Ethereum TestRPC](https://github.com/ethereumjs/testrpc) mocks Ethereum blockchain for faster development.
* [Truffle](https://github.com/ConsenSys/truffle) is a framework for developing, testing and deploying Smart Contracts. 

## Setup 

```npm install -g ethereumjs-testrpc```

```npm install -g truffle```

### TestRPC

Ethereum TestRPC is a fast and flexible way to emulate calls to the blockchain without the overheads of running an actual Ethereum node. Features include:

* Accounts can be re-used and reset.
* The live blockchain can be forked at a given block to test existing in-the-wild contracts.
* Specific accounts can be instantiated with a fixed amount of Ether (no need for faucets or mining).
* Gas price and mining speed can be modifed.

To get up and running with the same accounts (brain wallet) used in this example launch with:
```
testrpc -m "warrior minimum breeze raven garden express solar flavor obvious twenty alpha actress"
```
[include a sentence decribing what the above is doing]

We can now use this running instance with Truffle.

### Truffle (official docs [here](http://truffleframework.com/docs/))

Running ```truffle init``` will create an example project with folder structure 

```
Truffle
├── build/
├── contracts/
├── migrations/
└── test/
```

* ```build``` contains the compiled version of contracts after running ```truffle compile```
* ```contracts``` is where we will build our Solidity based contracts
* ```migrations``` helps us manage migration of contracts as we make changes over the contracts lifetime
* ```test``` contains [Mocha](https://mochajs.org/) based tests

We can add scaffolding for our own contract with ```truffle create contract MyExampleContract``` and add an initial test with  ```truffle create test MyExampleContract```. Truffle does not create _all_ of the code we need to launch, migrate and test our contracts, so we need add a few lines manually.

The migration file should include something like
```
let MyExampleContract = artifacts.require("./MyExampleContract")

module.exports = function(deployer) {
  deployer.deploy(MyExampleContract)
}
```

And the test file should also import artifacts
```
let MyExampleContract = artifacts.require("./MyExampleContract")
```
We can then remove references to the initial example project. Hopefully the developer experience for initialising projects will be [improved in the near future](https://github.com/ConsenSys/truffle/issues/205)

### Contract code

```
// Tell the compiler what version of Solidity we're using.
pragma solidity ^0.4.4;

// TestRPC HD wallet
// warrior minimum breeze raven garden express solar flavor obvious twenty alpha actress
contract AuthorDonation {

  // Accounts for each of the two participants in the contract with the 'address' type.
  address author = 0x34f06373e492e6ba87cbcb655ccc1d0951f734d3;
  address editor = 0x7a8f86c5c3ca815e182188567cc44ca9738549af;

  // This method will be called from the Dapp.
  // Any function which uses funds must contain the keyword payable.
  function donate() payable {
    // If no Ether has been sent we have nothing to do.
    if (msg.value == 0) throw;

    // Do some arithmetic for an 80/20 split between Author and Editor.
    uint editorAmount = msg.value / 5;
    uint authorAmount = msg.value - editorAmount;

    // Attempt to forward Ether to the Author and then the Editor.
    // Throw an exception if transfer fails. Ether is returned to sender.
    if (!author.send(authorAmount)) throw;
    if (!editor.send(editorAmount)) throw;
  }
}
``` 

There are good reasons to avoid immediately forwarding Ether and using ```throw``` in this context. See this [post for more information](http://vessenes.com/ethereum-griefing-wallets-send-w-throw-considered-harmful/).

### Test code
```
// Include web3 library so we can query accounts.
const Web3 = require('web3')
// Instantiate new web3 object pointing toward an Ethereum node.
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// Include AuthorDonation contract
let AuthorDonation = artifacts.require("./AuthorDonation")

// Test with Mocha
contract('AuthorDonation', function(accounts) {
  // Setup a variable to hold the contract object.
  var authorDonation
  // A convenience to view account balances in the console before changes.
  printBalances(accounts)
  // Create a test case for retreiving the deployed contract.
  // We pass 'done' to allow us to step through each test synchronously.
  it("Should retrive deployed contract.", function(done) {
    // Check if our instance has deployed
    AuthorDonation.deployed().then(function(instance) {
      // Assign our contract instance for later use
      authorDonation = instance
      console.log('author donation', authorDonation)
      // Pass test if we have an object returned.
      assert.isOk(authorDonation)
      // Tell Mocha move on to the next sequential test.
      done()
    })
  })

  // Test for depositing 1 Ether
  it("Should deposit 1 ether.", function(done) {
    // Call the donate method on the contract. Since that method is tagged payable,
    // we can send Ether by passing an object containing from, to and amount.
    // All transactions are carried sent in wei. We use a web3 utility to convert from Ether.
    authorDonation.donate({from:accounts[3], to:authorDonation.address, value: web3.toWei(1, "ether")})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })

  // Utility function to display the balances of each account.
  function printBalances(accounts) {
    accounts.forEach(function(ac, i) {
      console.log(i, web3.fromWei(web3.eth.getBalance(ac), 'ether').toNumber())
    })
  }
})
```


 
