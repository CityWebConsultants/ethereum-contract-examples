//const Web3 = require('web3')
//let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
let accounts = web3.eth.accounts
console.log(accounts)


//console.log(web3)
let MultisigWallet = artifacts.require("./MultisigWallet")
let ExampleCrowdSale = artifacts.require("./ExampleCrowdSale")

// so why would they create a mock!!!!????


module.exports = function(deployer) {

  let startBlock = parseInt(web3.eth.blockNumber) + 8
  console.log('startBlock: ' + startBlock)
  let endBlock = startBlock + 1400
  console.log('endBlock: ' + endBlock)
  let tokenValue = 1000 // per ether
  let walletAddress = '0xa4f966f298c182364d9a238aa176667c793ad7d5'


  // issue passing an array to the deployer!??
  deployer.deploy(MultisigWallet, accounts, 10000, 1000000)
  deployer.deploy(ExampleCrowdSale, startBlock, endBlock, tokenValue, walletAddress)
}
