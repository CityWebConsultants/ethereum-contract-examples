
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
let Donation = artifacts.require("./Donation")

contract('Donation', function(accounts) {
  var donation

  it("Should retrive deployed contract.", function(done) {
    Donation.deployed().then(function(instance) {
      donation = instance
      assert.isOk(donation)
      done()
    })
  })

  // test if sender has been added as a user


  it("Should add a new payee.", function(done) {
    donation.addPayee(accounts[1], 20)
    .then(function(tx) {
      assert.equal(tx.logs[0].event, 'PayeeAction')
      assert.equal(accounts[1], tx.logs[0].args.payee)
      donation.getWeight.call(accounts[1])
      .then(function(weight){
        assert.equal(20, weight)
      })
      done()
    })
  })

  it("Should add a another payee.", function(done) {
    donation.addPayee(accounts[2], 10)
    .then(function(tx) {
      assert.equal(tx.logs[0].event, 'PayeeAction')
      assert.equal(accounts[2], tx.logs[0].args.payee)
      donation.getWeight.call(accounts[2])
      .then(function(weight){
        assert.equal(10, weight)
      })
      done()
    })
  })

  it("Should change weight of second payee", function(done) {
    donation.updatePayeeWeight(accounts[1], 10)
    .then(function(tx) {
      donation.getWeight.call(accounts[1])
      .then(function(weight){
        assert.equal(10, weight)
      })
      done()
    })
  })

  it("Should retrieve all payee objects", function(done){
    let i = 0
    donation.payeesIndexSize.call()
    .then(function(payeesIndexSize) {
      let indexSize = payeesIndexSize.toNumber()
      for (i=0;i<indexSize;i++) {
        donation.payeesIndex.call(i)
        .then(function(address) {
          donation.payees.call(address)
          .then(function(payee){
            assert.isOk(payee)
            assert.equal(payee[0], true)
            assert.equal(payee[2].toNumber(), 666666666666666666)
          })
        })
      }
      assert.equal(i,3)
      done()
    })
  })

  it("Should send ether and update account balances", function(done) {
    donation.deposit({from:accounts[3], to:donation.address, value: web3.toWei(2, "ether")})
    .then(function(tx) {
      assert.isOk(tx.receipt)
      for (let i=0;i<3;i++) {
        donation.getBalance.call(accounts[i])
        .then(function(res) {
          assert.equal(web3.fromWei(res.toNumber(), 'ether'), 0.6666666666666666);
        })
      }
      done()
    })
  })

  it("Should transfer balance", function(done) {
    let ac1 = 0
    let ac2 = 0
    donation.getBalance.call(accounts[1])
    .then(function(balance1) {
      ac1 = balance1.toNumber()
      donation.getBalance.call(accounts[2])
      .then(function(balance2) {
        ac2 = balance2.toNumber()
        donation.transferBalance(accounts[1], accounts[2], ac1)
        .then(function(tx) {
          donation.getBalance.call(accounts[2])
          .then(function(balance2) {
            let ac2After = balance2.toNumber()
            assert.equal(ac1 + ac2, ac2After)
            done()
          })
        })
      })
    })
  })

  it("Should set payee status false", function(done) {
    donation.disablePayee(accounts[1])
    .then(function(tx) {
      donation.getStatus.call(accounts[1])
      .then(function(isActive) {
        assert.equal(isActive, false)
        done()
      })
    })
  })

  it("Should set payee status true", function(done){
    let account = accounts[1]
    donation.getStatus.call(account)
    .then(function(status){
      assert.equal(status, false)
      donation.enablePayee(account)
      .then(function(tx) {
        assert.isOk(tx.receipt)
        donation.getStatus.call(account)
        .then(function(enabled){
          assert.equal(enabled, true)
          done()
        })
      })
    })
  })

  it("Should withdraw funds", function(done) {
    var ethBalanceBefore, contractBalanceBefore, gasCost
    let account = accounts[2]
    let amount = web3.toWei(0.5, "ether")
    donation.contract._eth.coinbase = account
    donation.getBalance.call(account)
    .then(function(balance) {
       contractBalanceBefore = balance
       ethBalanceBefore = web3.eth.getBalance(account)
       donation.withdraw(amount, {from:account})
       .then(function(tx) {
         assert.equal(tx.logs[0].event, 'Withdrawal')
         assert.equal(account, tx.logs[0].args.payee)
         assert.equal(amount, tx.logs[0].args.amt.toString(10))
         // web3.eth.gasPrice gives the wrong value in this context so hardcoding gas price
         gasCost = web3.toBigNumber(tx.receipt.gasUsed).times(100000000000)
         donation.getBalance.call(account)
         .then(function(balance) {
            let contractBalanceAfter = balance
            ethBalanceAfter = web3.eth.getBalance(account)
            assert.equal(ethBalanceBefore.plus(amount).minus(gasCost).toString(10), ethBalanceAfter.toString(10))
            done()
        })
      })
    })
  })

  it("Should transfer owner", function(done) {
    let account = accounts[2]
    donation.transferOwner(account)
    .then(function(tx) {
      assert.equal(tx.logs[0].event, 'OwnerChanged')
      assert.equal(account, tx.logs[0].args.newOwner)
      donation.owner()
      .then(function(owner) {
        assert.equal(account, owner)
        done()
      })
    })
  })

  it("Should destroy contract", function(done) {
    let account = accounts[2]
    donation.kill({from:account})
    .then(function(tx) {
      assert.equal(tx.logs[0].event, 'Withdrawal')
      assert.equal(tx.logs[1].event, 'Withdrawal')
      assert.equal(tx.logs[2].event, 'Withdrawal')
      assert.equal(tx.logs[3].event, 'ContractDestroyed')
      done()
    })
  })

  function printBalances(accounts) {
    accounts.forEach(function(ac, i) {
      console.log(i, web3.fromWei(web3.eth.getBalance(ac), 'ether').toNumber())
    })
  }
})
