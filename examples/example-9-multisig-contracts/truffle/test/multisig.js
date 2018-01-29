
const txMined = require('./transactionMined.js')
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

//import advanceToBlock from './helpers/advanceToBlock.js'
console.log(txMined)

// where can we fetch the deployment settings!?????
// how do we import settings here so they are not duplicated
//@todo environment awareness
// can dyamically set truffle config to choose a block in the not too
// distant future
// and build in calls to infura that dont require fucking metamask
//@todo helper functions for doing stuff like
//@q can we use done in this context
// whats the issue with after each?
let MultiSigWallet = artifacts.require("./MultiSigWallet")
//let Multisig = artifacts.require("./Multisig")

// console.log('dep')
// console.log(deployer)

//console.log(MultiSigWallet);

contract('MultiSigWallet', function(accounts) {


  //debug an existing contract


  var msw, address, walletAddress
  console.log(MultiSigWallet.abi)
  accounts = web3.eth.accounts


  //take an alternative approach and deploy from remix and load in new contract here.

  msw = MultiSigWallet.at("0x6413e53cf4d1A4285857412772B9840e03DF8172")
  console.log(msw)

  



//   msw = MultiSigWallet.new(
// ["0x1313734d2d6625173278978ddaa7b63400462745", "0x10b50646ffc614d9df474ee379971185e538714b", "0xf5b1b23448f8f970ce3aec7fd78ab8eec819d161"], 2)

    // function sleep(delay) {
    //   var start = new Date().getTime();
    //   while (new Date().getTime() < start + delay);
    // }

    // function waitForBlock(ahead) {
    //   let currentBlock = parseInt(web3.eth.blockNumber)
    //   let targetBlock = currentBlock + ahead
    //   while(targetBlock < currentBlock) {
    //     console.log('current block: ' + web3.eth.blockNumber)
    //     sleep(2000)
    //   }
    // }

    it("Should deploy MultiSig wallet contract", async () => {
      //msw = await MultiSigWallet.deployed()
      walletAddress = msw.address
      console.log('Wallet address: ' + walletAddress)
    })

    it("Should send funds to wallet", async () =>{
      tx = await web3.eth.sendTransaction({from: accounts[1], to: walletAddress, value: web3.toWei(0.2, "ether"), gas: 4700000})
      console.log(tx)
      txx = await web3.eth.getTransaction(tx)
      console.log(txx)
      let txm = await txMined(tx)
      console.log('txm')
      console.log(txm)

      //await waitForBlock(5)
      txr = await web3.eth.getTransactionReceipt(tx)
      //await waitForBlock(5)
      console.log(txr)
      let walletBalance = await web3.eth.getBalance(walletAddress)
      console.log(walletBalance)
      txr = await web3.eth.getTransactionReceipt(tx)
      console.log(txr)
    })

    // it("Should call method on contract to send funds", async () => {
    //   let txr = await msw.sendTransaction({from: accounts[1], to: walletAddress, value: 0.1})
    //   console.log(txr)
    // })

    //@todo do an example of moving funds to another place

    //@todo withdrawal

})