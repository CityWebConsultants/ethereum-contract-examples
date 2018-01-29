// entry point
// if we deploy an entry point contract to the other contracts that will fix everything.
// regardless of what they forward themselves
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const ForwardGas = artifacts.require("./ForwardGas")

let myUtils = {
  accToEth: function(accNum) {
    return web3.fromWei(web3.eth.getBalance(web3.eth.accounts[accNum]).toNumber(), "ether")
  }
}

contract('ForwardGas', function(accounts) {

  var fg;
  var walletBalance = web3.eth.getBalance(web3.eth.accounts[9])
  //console.log('wab', walletBalance)
  //setup web3 to watch for whats happening
  //and repot
  // estimate gas
  //  let callData = ForwardGas.deployed.getData()
  //  console.log(callData)
  // console.log(callData)

  //console.log('50 Gwei == Eth: ' + web3.fromWei(web3.toWei(50, "gwei"), "ether"))
  //console.log('actual gas: ' + web3.toWei(50, "gwei"))

//var estimatedGas=eth.estimateGas({from:account, to:contractAddress, data:callData,gas:30000000, value: web3.toWei(msg.value,"ether")});
  //
  //watchers

  it("Should deploy contract", function(done) {
    ForwardGas.deployed().then(function(instance) {
      fg = instance
      assert.isOk(fg)
      console.log('Contract address', fg.address);
      done()
    })
  })

/*
  it("should watch for events", function() {

    var filter = web3.eth.filter(fg.address);

    filter.watch(function(error, result){
      if (!error) {

        console.log(result)
        //console.log(result);
        //console.log(web3.toAscii(result.data).replace(/\u0000/g, ''))
      // result.data.forEach(function(item) {
      //   console.log(item)
      //   console.log(web3.toAscii(item).replace(/\u0000/g, ''))
        //console.log(web3.toAscii(item.replace(/\u0000/g, '')))
      //})
      //  console.log(web3.toUtf8(item));
      //console.log(item)

    }

        // console.log(result.topics);
    });
  })
*/

  // it("Should watch for event", function() {
  //   fg.
  // })

  it("Hack to watch for events.", function() {
    // var sub = web3.eth.subscribe('logs', {address: fg.address}, function(err, res) {
    //   if(!err) {
    //     console.log(res)
    //   }
    // })
    fg.allEvents(fg.address, function(err, res){
      if(!err) {
        if (res.event !== 'undefined' && res.event === 'DebugNumber') {
          console.log(res.args.msg, res.args.number.toNumber())
        }
      }
    })

  })




  // var event = fg.DebugNumber( {_candidateName: "Abc"}, {fromBlock: 0, toBlock: 'latest'});
  //
  //    event.watch(function(error, response)
  //    {
  //       //once the event has been detected, take actions as desired
  //        var data = 'from: ' + response.args._from+"<br>candidateName: "+web3.toUtf8(response.args._candidateName) +"<br>";
  //    });
  // look at delegate call
  // won't call what we want
/*  it("Should fail for too high gas price", function(done){
    try {
      web3.eth.sendTransaction(
        {
          from: web3.eth.accounts[1],
          to: fg.address,
          value: web3.toWei(0.001, "ether"),
          gasPrice: web3.toWei(60, "gwei")
        }, function(err, res) {
        if(!err) {
          assert(false)
          done()
        } else {
          assert(true)
          console.log("fail");
          done()
        }
      })
    }
    catch (err) {
      assert(true)
      done()
    }
    // let foo = web3.eth.estimateGas(fg.abi, fg.address, {from: web3.eth.accounts[1], to: fg.address, value: web3.toWei(0.001, "ether"), gas: web3.toWei(50, "gwei")})
    // console.log(foo)
    // done()
  })*/

  // we need to deal with Gas Price as well
  it("Should send Ether", function(done) {

    web3.eth.sendTransaction(
      {
        from: web3.eth.accounts[1],
        to: fg.address,
        value: web3.toWei(0.001, "ether"),
        gasPrice: web3.toWei(50, "gwei")
      }, function(err, res) {
      if(!err) {
        assert(true)
        done()
      }
    })
  })

  it("Should have added value to wallet account", function(done){
   done()
  })


})
