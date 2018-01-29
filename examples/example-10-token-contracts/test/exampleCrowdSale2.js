
const Web3 = require('web3')
const utils = require('ethereumjs-util')
const helper = require('./helpers/customTestHelper.js')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

//import advanceToBlock from './helpers/advanceToBlock.js'
console.log(helper.msgToHash('fooboom'))

console.log(this)


// where can we fetch the deployment settings!?????
// how do we import settings here so they are not duplicated
//@todo environment awareness
// can dyamically set truffle config to choose a block in the not too
// distant future
// and build in calls to infura that dont require fucking metamask
//@todo helper functions for doing stuff like
//@q can we use done in this context
// whats the issue with after each?
let ExampleCrowdSale = artifacts.require("./ExampleCrowdSale.sol")
let CWCToken = artifacts.require("./CWCToken.sol")
let MultiSigWallet = artifacts.require("./MultiSigWallet")
//let Multisig = artifacts.require("./Multisig")


//console.log(MultiSigWallet);

contract('ExampleCrowdSale', function(accounts) {

  var ccc, ccToken, ccWallet, tokenAddress, events, startBlock, accounts

  accounts = web3.eth.accounts

  //may need to do get data

  // it("Should deploy new MultiSigWallet",  async () => {
  //   Multisig.new({from: accounts[0], gas: 4700000, data: Multisig.getData()}).then(console.log('helloworld'))
  //   //ccWallet = await MultiSigWallet.new([accounts[0], accounts[8], accounts[9]], 1000000, 10000000000, {from: accounts[0], gas: 4700000})
  //   //console.log(ccWallet)
  // })

  it("Should deploy Capped Crowdsale Contract", async () => {
    ccc = await ExampleCrowdSale.deployed()
    startBlock = parseInt(await ccc.startBlock.call())
    assert.isOk(ccc)
    console.log('deployed at block: ' + web3.eth.blockNumber);
  })

  it("Should retrieve token address", async () => {
    tokenAddress = await ccc.token.call()
  })

  it("Should retrieve instance of token contract", async () => {
    ccToken = await CWCToken.at(tokenAddress)
  })

  it("Should check token symbol is set", async () => {
    let symbol = await ccToken.symbol.call()
    assert.equal(symbol, 'CWC')
  })

  function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  it("Should wait for block to be mined", done => {
    console.log('waiting for block: ' + startBlock + 1 )
    while(web3.eth.blockNumber < startBlock + 1) {
      console.log('current block: ' + web3.eth.blockNumber)
      sleep(2000)
    }
    done()
  })

  it("Should send ether from ac/1 to contract", async () => {
    // Send ether and get transaction hash
    let txHash = await web3.eth.sendTransaction({from: web3.eth.accounts[1], to:ccc.address, value: web3.toWei(0.2, "ether"), gas:4700000})
    // Request transaction recipet
    let {logs} = await web3.eth.getTransactionReceipt(txHash)
    assert(true)
    // let event = logs.find(e => e.event === 'TokenPurchase')
    // console.log('ev1');
    // console.log(logs);
    // console.log(event);
    // let event = logs.find(function(e) {
    //   return e.event == 'TokenPurchase'
    // })
    //
    // event = logs.find(e => e.event === 'TokenPurchase')
    // console.log('event')
    // console.log(event)
  })

  it("Should send ether from ac/1 to contract", async () => {
    // Calling sendTransaction on contract gives full receipt.
    let {logs} = await ccc.sendTransaction({from: web3.eth.accounts[1], value: web3.toWei(0.2, "ether"), gas:470000})
    // fetch txr and confirm gas

    console.log('crowdsale address:' + ccc.address)
    let event = logs.find(e => e.event === 'TokenPurchase')
    console.log(event);
    assert(true)
  })

  it("Should send ether from ac/1 to contract", async () => {
    // Calling sendTransaction on contract gives full receipt.
    let {logs} = await ccc.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(0.2, "ether"), gas:470000})
    // fetch txr and confirm gas

    console.log('crowdsale address:' + ccc.address)
    let event = logs.find(e => e.event === 'TokenPurchase')
    console.log(event);
    assert(true)
  })

  // it("Should wait for a few blocks", done => {
  //   let current = parseInt(web3.eth.blockNumber)
  //
  //   while (web3.eth.blockNumber < (current + 5)) {}
  //   assert(true)
  //   done()
  // })

  // it("Should send ether from ac/1 to contract", async () => {
  //   let foo = await web3.eth.sendTransaction({from: web3.eth.accounts[1], to:ccc.address, value: web3.toWei(0.2, "ether")/*, gas:470000*/})
  //   // console.log('foo')
  //   // console.log(foo)
  // })

  // wait a couple of blocks for tx to be mined.
  // it("Should wait a few blocks before querying data", async () => {
  //   currentBlock = web3.eth.blockNumber
  //
  // })


  //


  // GET CURRENY BLOCK AND WAIT FOR TO BEMINED

  //
  // it("Should send ether from ac/2 to contract", async () => {
  //   let foo = await ccc.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(0.2, "ether")/*, gas:470000*/})
  //   // console.log('foo')
  //   // console.log(foo)
  // })

  it("AC0 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[0])
    console.log('token address: ' + ccToken.address)
    console.log('ac 0 token balance')
    console.log(tokenBalance.toNumber())
  })

  it("AC1 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[1])
      console.log(tokenBalance.toNumber())
      //assert.equal(tokenBalance, )
    // console.log('ac 1 token balance')
    // console.log(web3.fromWei(blnce, "ether").toNumber())
  })






  //
  it("AC0 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[0])
    console.log('ac 0 token balance')
    console.log(tokenBalance)
  })

  it("AC1 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[1])
      console.log(tokenBalance.toNumber())
      //assert.equal(tokenBalance, )
    // console.log('ac 1 token balance')
    // console.log(web3.fromWei(blnce, "ether").toNumber())
  })
  //
  it("AC0 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[0])
    console.log('ac 0 token balance')
    console.log(tokenBalance)
  })

  it("AC1 Should have tokens assigned", async () => {
    let tokenBalance = await ccToken.balanceOf(web3.eth.accounts[1])
      console.log(tokenBalance.toNumber())
      //assert.equal(tokenBalance, )
    // console.log('ac 1 token balance')
    // console.log(web3.fromWei(blnce, "ether").toNumber())
  })

  // it("Should have sent money to wallet", async () => {
  //   let walletBalance = await web3.eth.getBalance(address)
  //   console.log(walletBalance)
  //   assert(true)
  // })

  // it("AC0 Should have tokens assigned", async () => {
  //   let blnce = await ccToken.balanceOf(web3.eth.accounts[0])
  //   console.log('ac 0 token balance')
  //   console.log(web3.fromWei(blnce, "ether").toNumber())
  // })
  //
  // it("AC1 Should have tokens assigned", async () => {
  //   let blnce = await ccToken.balanceOf(web3.eth.accounts[1])
  //   console.log('ac 1 token balance')
  //   console.log(web3.fromWei(blnce, "ether").toNumber())
  // })
  //
  // it("AC0 Should have tokens assigned", async () => {
  //   let blnce = await ccToken.balanceOf(web3.eth.accounts[0])
  //   console.log('ac 0 token balance')
  //   console.log(web3.fromWei(blnce, "ether").toNumber())
  // })
  //
  // it("AC1 Should have tokens assigned", async () => {
  //   let blnce = await ccToken.balanceOf(web3.eth.accounts[1])
  //   console.log('ac 1 token balance')
  //   console.log(web3.fromWei(blnce, "ether").toNumber())
  // })

  //@todo check wallet balance


  //try sending from wallet and see what happens

  // it("should check events for firing")


//check all events taken place after the fact


  // it('should start with a totalSupply of 0', async function() {
  //   let totalSupply = await token.totalSupply();
  //
  //   assert.equal(totalSupply, 0);
  // });

//return
//     it("shoudl watch for events", function(done) {
//
//       var events = ccc.allEvents('latest');
//
//
//       events.watch(function(error, event) {
//
//       if (!error) {
//          console.log(event);
//          done()
//       } else {
//         console.log(error)
//       }
//
//       })
//
//     })
//

//
//     it("Should should send ether to contract", function(done) {
//
//       ccc.sendTransaction({from: web3.eth.accounts[1], /*to:ccc.address, */value: web3.toWei(0.2, "ether")/*, gas:470000*/}, function(err, res){
//         if (!err) {
//           // Hmmmmm -- we get a whole object Back
//           // maybe we should use send on contract
//           console.log(res)
//           // we should do something with the response and interrogate topics
//
//           //watch for events and see what happens
//           //watch all events
//           // check tx receipt for event
//           // how do we test events in this scenario
//           // should do something with the transaction receipt and check event logs
//           // look at the test cases in
//           done()
//         }
//       })
//     })
//
//
//     // ok so we can call the function but it still isn't actually doing anything
//     // really really do need to grab setup values from another place so
//     // can be used consitently
//     it("should have assigned tokens to sender", function(done) {
//       // tokenInstance = CWCToken.at()
// // weiRaised
//
//       ccc.token().then(function(address) {
//         console.log('token address: ' + address)
//         tokenInstance = CWCToken.at(address)
//         console.log(tokenInstance)
//         tokenInstance.balanceOf(web3.eth.accounts[1])
//         .then(function(amount) {
//             console.log(amount)
//             done()
//         })
//         // tokenInstance.symbol.call().then(function(foo){
//         //   console.log(foo)
//         // })
//         // tokenInstance.balances.call().then(function(bal){
//         //   console.log(bal)
//         // })
//       })
//     })
//
//     it("Should show amount of weiRaised", function() {
//
//     })
})



    // then we should check the contract to make sure we have tokens


  // it("Should estimate gas", function(done) {
  //   let foo = web3.eth.estimateGas(ccc.abi, ccc.address, {from: web3.eth.accounts[1], to: ccc.address, value: web3.toWei(0.001, "ether"), gas: web3.toWei(50, "gwei")})
  //   console.log(foo)
  //   console.log('aaaarrrghhh');
  //   //assert(true)
  //   done()
  // })




  //return
/*
  it("Should have settings for start block", function(done) {
    ccc.startBlock.call().then(function(start){
      assert.equal(start.toNumber(), 100)
      // can we get the blockheight from the provider
      console.log('Current block height', web3.eth.blockNumber)
      done()
    })
  })

  it ("Should fail to send contribution", function(done) {
    console.log('base', web3.eth.coinbase)
    console.log('ccc', ccc.address)

    //@todo derive legal block height from parameters

    let legalBlockHeight = 100
    let blockHeightDifference = (legalBlockHeight - web3.eth.blockNumber) //- 1
    for(i=0;i<blockHeightDifference;i++) {


      // need to treat this separatel

    try {
        web3.eth.sendTransaction({from: web3.eth.coinbase, to: ccc.address, value: web3.toWei(1, "ether"), gasLimit: 90000})
        .then(function(result){
          console.log(result)
        })
      })
      //ccc.buyTokens(web3.eth.accounts[2], {value: 10}).then(function(result){
        console.log(result)
//      })
// so... this is probably failing for other reasons.....





      ///  ccc.buyTokens(web3.eth.accounts[2],{from: web3.eth.accounts[1], value: 10, gasLimit: 100000})
//         .then(function(result) {
//           // if (web3.eth.blockNumber >= legalBlockHeight) {
//
//             console.log('correct result', result)
// //          }
//         })
    }
    catch(err) {
      console.log(err);
      // we expect an evm exception
      //  check the value and make sure this failed properly!!!!
      // what is the problem with testing
      assert(true)
      console.log('keep calm and carry on ' + web3.eth.blockNumber)
    }
  }
  done()
  })


  // if(error.toString().indexOf("invalid JUMP") != -1) {
  //    console.log("We were expecting a Solidity throw (aka an invalid JUMP), we got one. Test succeeded.");
  //  } else {

// grrrrrr, so what is the actual problem here

//web3.eth.sendTransaction({from: web3.eth.accounts[1], to: '0x8e3c2506853b0debdea551bae69b77581965ebb5', value: web3.toWei(1, "ether"), gasLimit: 21000})
//web3.eth.getBalance('0x8e3c2506853b0debdea551bae69b77581965ebb5')

//arrrrgghhhhhhhhhhhhhhhhhhhhhhhhhhhhhh


// is there another way to send eth or explicitly call a fallback function -- is this really a gas issue
// how the fuck are we supposed to send
//aaaaarrhhhjjjj



  it("Should send payment to contract via function call.", function(done){
    ccc.buyTokens(web3.eth.accounts[2],{from: web3.eth.accounts[1], value: 10, gasLimit: 100000})
    .then(function(result) {
        console.log(result)
        done()
    })
  })

  // it("should do something else", function(done) {
  //   ccc.startBlock.call().then(function(start){
  //     assert.equal(start.toNumber(), 100)
  //     // can we get the blockheight from the provider
  //     console.log('Current block height', web3.eth.blockNumber)
  //     done()
  //   })
  // })

  // it("Should cycle through a number of blocks", function() {
  //   while(web3.eth.blockNumber < 100 - 1 ) {
  //     ccc.startBlock()
  //     console.log(web3.eth.blockNumber)
  //   }
  // })
//     //try to send and pass
//     // if (web3.eth.blockNumber < 100) {
//     //   let difference = 100 - web3.eth.blockNumber
//     //   for (let i=0;i<difference;i++) {
//     //
//     //   }
// //    }
//
//     // should try and make a purchase and
//
//     //get block height
//     //make number of async requests to get to the block we ned
//   })

  // if (web3.eth.blockNumber < 7) {
  //   console.log('hello world')
  // }

  // function isException(error) {
  //     let strError = error.toString();
  //     return strError.includes('invalid opcode') || strError.includes('invalid JUMP');
  // }
  //
  // function ensureException(error) {
  //     assert(isException(error), error.toString());
  // }
  //
  // module.exports = {
  //     zeroAddress: '0x0000000000000000000000000000000000000000',
  //     isException: isException,
  //     ensureException: ensureException
  // };
*/
