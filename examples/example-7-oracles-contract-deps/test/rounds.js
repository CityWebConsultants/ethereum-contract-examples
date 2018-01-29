//
const Web3 = require('web3')
//
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

let roundManagerContract = artifacts.require("RoundManager")
// first player pays gas to generate a positon
// p1 generates a new game by taking a position
// p2 finishes a game by taking a position

// Mmmmmm how do we associate a contract with the artifacts and stuff we have here.
let roundContract = artifacts.require("Round")

contract('roundManagerContract', function(accounts) {
  // Round manager contract.
  var rm;
  var round1;
  var round2;

  it ("Should deploy contract", (done) => {
    roundManagerContract.new(1, 'test').then(function(instance){
      rm = instance
      assert.isOk(rm)
      done()
    })
  })

  it("Should update fee.", (done) => {
    rm.updateFee(2)
    .then((txr) => {
        let newFee = txr.logs[0].args.newAmount.toNumber()
        assert.equal(newFee, 2)
        done()
    })
  })

  it("Should deploy a new round.", (done) => {
    rm.createRound(accounts[0], 2)
    .then(function(txr) {
      assert.isOk(txr)
      let roundAddress = txr.logs[0].args.round
      roundContract.at(roundAddress)
      .then((instance) => {
        round1 = instance
        assert.isOk(round1)
        //assert owner and manager of contract
        done()
      })
    })
  })

  it("Should add a deposit from new participant.", (done) => {
    round1.addParticipant(1, 15, {from: accounts[1], value: web3.toWei(0.1, 'ether')})
    .then((txr) => {
      assert.equal(web3.fromWei(txr.logs[0].args.deposit.toNumber()), 0.1)
      assert.equal(txr.logs[0].args.participant, accounts[1])
      done()
    })
  })

  it("Should fail to add new participant (choice taken)", (done) => {
    round1.addParticipant(1, 20, {from: accounts[2], value: web3.toWei(0.1, 'ether')})
    .then((txr) => {
      // how do we test throw
      assert.equal(txr.logs[0].args.msg, 'This option has already be taken')
      //assert.equal(web3.fromWei(txr.logs[0].args.deposit.toNumber()), 0.1)
    //  assert.equal(txr.logs[0].args.participant, accounts[2])
      done()
    })
  })

  it("Should add deposit from second participant", (done) => {
    round1.addParticipant(0, 5, {from: accounts[2], value: web3.toWei(0.1, 'ether')})
    .then((txr) => {
      assert.equal(web3.fromWei(txr.logs[0].args.deposit.toNumber()), 0.1)
      assert.equal(txr.logs[0].args.participant, accounts[2])
      done()
    })
  })

  it("Should fail add a third participant", (done) => {
    round1.addParticipant(1, 1, {from: accounts[4], value: web3.toWei(0.1, 'ether')})
    .then((txr) => {
      assert.equal(txr.logs[0].args.msg, 'Round is full')
      done()
    })
  })

  it("Should generate a random number", (done) => {
    round1.generateResult()
    .then((txr) => {
      assert(txr.logs[0].args.result.toNumber() !== 0)
      assert.oneOf(txr.logs[0].args.result.toNumber(), [1,2], 'Not found')
    })
    done()
  })


//  it("Should declare a winner and post results")

  // @todo genrate result from random number generator
  // then add contract for doing same





  // it("Should ", (done) => {
  //   roundContract.at(1, 'test').then(function(instance) {
  //   round1 = instance
  //   console.log(round1)
  // })



    //
    // it("Should create new round", function(done) {
    //   rm.
    // })

})


// it should create a new contract
// it should place an option
// define a RoundManager define rounds
// need to choose either side of a binary option
// payout on amount put in

//the dailydabble

// $ truffle test
// Alternatively, you can specify a path to a specific file you want to run, e.g.,
//
// $ truffle test ./path/to/test/file.js


//
// let uvu = artifacts.require("YoutubeViews")
//
// contract('uvu', function(accounts) {
//   var uvud
//
//   it("Should retrive deployed contract.", function(done) {
//     uvu.deployed().then(function(instance) {
//       uvud = instance
//       assert.isOk(uvud)
//       done()
//     })
//   })
//
//   it("Should call youtube views function", function(done) {
//     uvud.update({from:web3.eth.accounts[0]})
//     .then(function(tx) {
//       assert.isOk(tx.receipt)
//       console.log(tx)
//       done()
//     }, function(err) {
//
//       })
//     })
//
//     it("Should receive youtube count", function(done){
//         var events = uvud.allEvents()
//         events.watch(function(err, ev){
//         if (!err) {
//           if (ev.event === 'newYoutubeViewsCount') {
//             console.log(ev)
//             console.log(ev.args.views)
//             done()
//             break
//           }
//         } else {
//           assert.equal(true, false)
//           console.error(err)
//           console.log("Error: " + err)
//         }
//       })
//     })
// })
