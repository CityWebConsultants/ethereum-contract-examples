


import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/minimongo'
//const web3NetworkDetective = require('web3-network-detective')

import './main.html'
//@todo what is a tidier way to do this than import all the small bits and pieces here
import './templates/widgets/createContractButton.html'

Web3 = require('web3')

Meteor.startup(() => {
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  }


  console.log(web3.currentProvider)

  Session.setPersistent('userAccountAddress', web3.eth.accounts[0])
  web3.eth.defaultAccount=web3.eth.accounts[0]

  const contractArtifacts = require('../imports/bundle.js')
  donationBytecode = contractArtifacts.unlinked_binary
  donationContract = web3.eth.contract(contractArtifacts.abi)

  console.log(donationContract)
})

Template.frontPage.events({
  'submit #loginForm': (event, instance) => {
    event.preventDefault()
    let contractAddress = event.target.loginField.value
    let userAddress = web3.eth.accounts[0]

    if (!web3.isAddress(contractAddress)) {
      instance.$('#loginFormError').html('Please enter a valid Ethereum address')
      return false
    }

    donationContract.at(contractAddress).owner.call(function(err, ownerAddress) {

      if (!err)
        if (userAddress === ownerAddress) {
          Session.setPersistent('isOwner', true)
        }
        Session.setPersistent('ownerAddress', ownerAddress)
        Session.setPersistent('contractAddress', contractAddress)
        FlowRouter.go('/contract/' + contractAddress + '/my-account')
      })
    },
    'submit #donutButton': (event, instance) => {
      console.log('clicked donut button')
      event.preventDefault()

      let contractAddress = event.target.buttonField.value

      if (!web3.isAddress(contractAddress)) {
        instance.$('#donutButtonError').html('Please enter a valid Ethereum address')
        return false
      }

      FlowRouter.go('/donut-button/' + contractAddress)
    }
})

Template.frontPage.onRendered(function() {
  // console.log(web3.currentProvider)
  // web3NetworkDetective(web3.currentProvider, function(detectiveError, detectiveResult){
  //   if (!detectiveError) {
  //     if (detectiveResult.mainnet === true) {
  //       $('#notificationArea').html('<h1 style="text-align: center; color: red">You are using mainnet, please use a testnet otherwise YOU WILL LOSE ETHER</h1>')
  //     }
  //   }
  // })
})

Template.createContractButton.events({
  'click button'(event, instance) {
    event.preventDefault()
    let primaryAddress = web3.eth.accounts[0]
    //@todo add notification area - switch out jquery
    //@todo add throw catch
    if (primaryAddress === undefined || primaryAddress === null) {
      $('h2.subtitle').text('Cannot connect to client').css({color: 'red'})
      return
    } else {

    }
    /*
    console.log('b')
    let bytecode = '0x606060405234610000575b60008054600160a060020a03338116600160a060020a03199283161780845581168352600160208181526040808620805460ff199081168517909155865485168752908620600a90840155855495805260029091527fac33ff75c19e70fe83507db0d683fd3465c996598dc972688b7ace676c89077b805490941694909216939093179091556003805490911690911790555b5b610c57806100ad6000396000f300606060405236156100ca5763ffffffff60e060020a6000350416631673121b81146100cf57806318f9b023146100f557806319bf02c4146101255780632221d6ec146101435780632e1a7d4d146101725780632fc9ee6b1461017f57806330ccebb5146101ac578063310441fa146101d9578063314ffefd1461021257806341c0e1b51461022d5780634fb2e45d146102375780638da5cb5b14610264578063a606b94a1461028d578063ac6c5251146102b1578063d0e30db0146102dc578063f8b2cb4f146102e6575b610000565b34610000576100dc610311565b60408051600092830b90920b8252519081900360200190f35b3461000057610111600160a060020a036004351660243561031a565b604080519115158252519081900360200190f35b3461000057610141600160a060020a0360043516602435610405565b005b346100005761015660043560000b610445565b60408051600160a060020a039092168252519081900360200190f35b610141600435610460565b005b3461000057610111600160a060020a0360043516610573565b604080519115158252519081900360200190f35b3461000057610111600160a060020a0360043516610626565b604080519115158252519081900360200190f35b34610000576101f2600160a060020a0360043516610648565b604080519315158452602084019290925282820152519081900360600190f35b3461000057610141600160a060020a036004351661066e565b005b610141610707565b005b3461000057610111600160a060020a0360043516610852565b604080519115158252519081900360200190f35b3461000057610156610901565b60408051600160a060020a039092168252519081900360200190f35b3461000057610141600160a060020a0360043581169060243516604435610910565b005b34610000576102ca600160a060020a03600435166109ca565b60408051918252519081900360200190f35b610141610a19565b005b34610000576102ca600160a060020a0360043516610b4b565b60408051918252519081900360200190f35b60035460000b81565b6000805433600160a060020a0390811691161461033657610000565b600160a060020a0383166000818152600160208181526040808420808401889055805460ff19908116851790915560038054860b860b860b865260028452828620805473ffffffffffffffffffffffffffffffffffffffff191688179055805480870b90950190950b60ff1693169290921790925580517f6164646564000000000000000000000000000000000000000000000000000000815290517fe1756b42353ce13c29a189505892beff801cf050bb62887d6191c4c64895b9f6929181900390910190a25b5b92915050565b60005433600160a060020a0390811691161461042057610000565b600160a060020a0382166000908152600160208190526040909120018190555b5b5050565b600260205260009081526040902054600160a060020a031681565b600160a060020a03331660009081526001602081905260409091205460ff1615151461048b57610000565b600160a060020a03331660009081526001602081905260409091205460ff1615151415806104d35750600160a060020a03331660009081526001602052604090206002015481115b156104dd57610000565b604051600160a060020a0333169082156108fc029083906000818181858888f19350505050151561050d57610000565b604080518281529051600160a060020a033316917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a2600160a060020a0333166000908152600160205260409020600201805482900390555b5b50565b6000805433600160a060020a0390811691161461058f57610000565b600054600160a060020a03838116911614156105aa57610000565b600160a060020a038216600081815260016020908152604091829020805460ff1916905581517f64697361626c6564000000000000000000000000000000000000000000000000815291517fe1756b42353ce13c29a189505892beff801cf050bb62887d6191c4c64895b9f69281900390910190a25b5b919050565b600160a060020a03811660009081526001602052604090205460ff165b919050565b600160208190526000918252604090912080549181015460029091015460ff9092169183565b60005433600160a060020a0390811691161461068957610000565b600160a060020a038116600081815260016020818152604092839020805460ff191690921790915581517f656e61626c656400000000000000000000000000000000000000000000000000815291517fe1756b42353ce13c29a189505892beff801cf050bb62887d6191c4c64895b9f69281900390910190a25b5b50565b60008054819033600160a060020a0390811691161461072557610000565b600091505b600354600090810b810b9083900b121561080b5750600081810b810b815260026020818152604080842054600160a060020a0316808552600190925283209091015490919011156107fe57600160a060020a03811660008181526001602052604080822060020154905181156108fc0292818181858888f19350505050156107fe57600160a060020a03811660008181526001602090815260409182902060020154825190815291517f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659281900390910190a25b5b5b60019091019061072a565b604051600160a060020a033016907f3ab1d7915d663a46c292b8f01ac13567c748cff5213cb3652695882b5f9b2e0f90600090a2600054600160a060020a0316ff5b5b5050565b6000805433600160a060020a0390811691161461086e57610000565b600160a060020a03821660009081526001602081905260409091205460ff1615141561089957610000565b60008054604051600160a060020a03808616939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0384161790555b5b919050565b600054600160a060020a031681565b60005433600160a060020a0390811691161461092b57610000565b600160a060020a0383166000908152600160205260409020600201548190101561095457610000565b600160a060020a038084166000818152600160209081526040808320600290810180548890039055948716808452928190209094018054860190558351858152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a35b5b505050565b600160a060020a033316600090815260016020819052604082205460ff161515146109f457610000565b50600160a060020a038116600090815260016020819052604090912001545b5b919050565b60008080341515610a2957610000565b60009150610a35610b99565b9150600092505b600354600090810b810b9084900b1215610b0657600083810b810b815260026020908152604080832054600160a060020a031683526001918290529091205460ff1615151415610afa57600083810b810b815260026020908152604080832054600160a060020a031683526001918290529091200154828115610000570490508034811561000057600085810b810b815260026020818152604080842054600160a060020a0316845260019091529091200180549290910490910190555b5b600190920191610a3c565b604080513481529051600160a060020a033316917f0e04c8e83a5595ba6381972e5e9fe2926bb0a7439dace880c83ccc34b99c5477919081900360200190a25b505050565b600160a060020a033316600090815260016020819052604082205460ff16151514610b7557610000565b50600160a060020a0381166000908152600160205260409020600201545b5b919050565b600080805b600354600090810b810b9083900b1215610c2257600082810b810b815260026020908152604080832054600160a060020a031683526001918290529091205460ff1615151415610c1657600082810b810b815260026020908152604080832054600160a060020a031683526001918290529091200154015b5b600190910190610b9e565b8092505b5050905600a165627a7a723058200404b369ef60a1e5e1c8ffa87ca0935419cf4259603dbbe6483c82eaa3aba4f00029'
*/
    //let gasEstimate = web3.eth.estimateGas({data: bytecode}, )
    //console.log(gasEstimate)
    let donation = donationContract.new({
     gas: 4400000, //@TODO ESTIMATE GAS FIRST
     from: web3.eth.accounts[0],
     data: donationBytecode }, function (err, res) {
      $('#donutSplash').addClass('spin').one()
      $('.subtitle').addClass('.info').removeClass('.subtitle').text('Deploying new donut. Hang on a mo...').css('color', 'orange').one()
      if (!err) {
        console.log(res)
        console.log(res.transactionHash)
        Session.setPersistent('ownerAddress', web3.eth.accounts[0])
        web3.eth.getTransaction(res.transactionHash, function(err, res) {
          console.log(err)
          if (!err && res !== null) {
             console.log('Contract mined! address: ' + res.creates + ' transactionHash: ' + res.creates)
             Session.setPersistent('contractAddress', res.creates)
             FlowRouter.go('/contract/' + res.creates + '/my-account')
          }
        })
    } else {
      console.log('Unable to mine contract.')
      console.log(err)
    }
  })
  return false
  }
  // return false
})

// Set this as a global helper
//this should fire on every pageload
function _fetchPayees() {
  if (Session.get('contractAddress')) {
    // Make this a utility
    let contractInstance = donationContract.at(Session.get('contractAddress'))
    let payeeList = []
    let indexSize = 0
    console.log(contractInstance)
    contractInstance.payeesIndexSize((err, indexSize) => {
      console.log('There was a problem: ', err)
      if (!err) {
        console.log(indexSize.toNumber())
        for (let i=0;i<indexSize.toNumber();i++) {
          contractInstance.payeesIndex(i, (err, address) => {
            if (!err) {
              contractInstance.payees(address, (err, payee) => {
                if (!err) {
                  //@todo get timestamp of creation so we can order by this
                  //@todo make sure we set who the owner is so can be used elsewhere
                  let newPayee = {}
                  newPayee.status = payee[0]
                  newPayee.weight = payee[1].toNumber()
                  newPayee.balance = payee[2].toNumber()
                  console.log(address)
                  newPayee.address = address
                  newPayee.color = address.substring(address.length - 6)

                  let ownerAddress = Session.get('ownerAddress')
                  console.log(ownerAddress)
                  if (newPayee.address === ownerAddress) {
                    console.log(newPayee)
                    newPayee.isOwner = true
                  }

                  payeeList.push(newPayee)
                  if (Object.keys(payeeList).length === indexSize.toNumber()) {
                    // Order results... @todo add creation date and name to contract.
                    // @todo set owner to top
                    payeeList.sort((a, b) => {
                      return a.address.localeCompare(b.address)
                    })
                    // Storing in the session changes the nature of the object
                    Session.setPersistent('payeeList', payeeList)
                  }
                }
              })
            }
          })
        }
      }
    })
  }
}

Template.mainMenu.helpers({
  contractAddress: () => {
    return Session.get('contractAddress')
  },
})

Template.accounts.onCreated(function() {
  _fetchPayees()
})

Template.transferOwner.onCreated(function(){
  _fetchPayees()
})

Template.destroy.events({
  'submit #destroy': () => {
    event.preventDefault()
    if (event.target.destroyConfirmation.value === 'I UNDERSTAND') {
      let contractInstance = donationContract.at(Session.get('contractAddress'))
      contractInstance.kill(function(err, res) {
        if (!err) {
          console.log('destroying contract')
        } else {
          console.log('couldn\'t kill contract')
        }
      })
    }
    return false
  }
})

Template.registerHelper('listAccounts', () => {
    let listAccounts = Session.get('payeeList')

    if (listAccounts !== undefined && listAccounts.length > 0) {
    listAccounts.forEach(function(el, i){
      if (el.balance !== undefined) {
        listAccounts[i].balance = web3.fromWei(el.balance, 'ether')
      }
    })
      return listAccounts
    }
    //return Session.get('payeeList')
})

// Template.registerHelper('getContractAddress', (foo, boo) => {
//   console.log('*****this******')
//   console.log(this)
//   console.log(foo)
//   console.log(boo)
// })

Template.registerHelper('getDefaultAccountAddress', () => {
  return web3.eth.accounts[0]
})

Template.registerHelper('verifyAddress', (address) => {
  return web3.isAddress(address)
})

Template.accounts.helpers({

  isOwner: () => {
    return Session.get('isOwner')
  },
  accountObjects: () => {
    return Session.get('payeeList')
  },
})

//@todo put this in a reactive var so will be displayed when changing numbers
//@todo can do this when refactoring the diff function
//and place in a reaactive dict
Template.accountsDonutChart.onRendered(function() {

  let accounts = Session.get('payeeList')
  let data = []
  let totalValue = 0

  if (accounts !== undefined && accounts.length > 0) {
    accounts.forEach(function(el, i) {
      let color = el.address.substring(el.address.length - 6)
      let highlight = colorLuminance(color, 0.3)
      let address = el.address
      let value = el.weight
      totalValue += value
      data.push({
        value: value,
        color: '#' + color,
        highlight: highlight,
        label: address
      })
    })
  }

  if (totalValue !== 0) {
    let ctx  = document.getElementById("accountsChart").getContext("2d");
    let myDoughnutChart = new Chart(ctx).Doughnut(data,{
        /*animateScale: true*/
    })
  } else {
    // Nothing to display
    //@todo display empty donut image
    document.getElementById("accountsChart").remove()
  }
})

// Pinched from https://www.sitepoint.com/javascript-generate-lighter-darker-color/
function colorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
  lum = lum || 0;

	// convert to decimal and change luminosity
	let rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		let c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
  console.log('rgb', rgb)
	return rgb;
}

Template.accounts.events({
  'submit #newAccount': (event, instance) => {
    event.preventDefault()
  //  let payeeEnabled = event.target.newAccountEnabled.value
    let payeeAddress = event.target.newAccountAddress.value
    console.log(payeeAddress)
    let payeeWeight = event.target.newAccountWeight.value
    console.log(Session.get('contractAddress'))
    let contractInstance = donationContract.at(Session.get('contractAddress'))
    contractInstance.addPayee(/*{from: web3.eth.accounts[0]},*/payeeAddress, payeeWeight, function(err, res) {
      $('#donutLogo').addClass('spin').one()
      if (!err) {

        console.dir(res)
        if (res) {
          console.log('got result')
          $('#donutLogo').removeClass('spin').one()
        }
      }
    })
  },
  // @todo refactor -- should be able to cut his in half
  // mebs be good to abstract it a little more but don't want to optimise
  // prematurely
  // @todo fix batch and multiple confirmations
  'submit #updateAccounts': (event, instance) => {
    event.preventDefault()

    let payeeList = Session.get('payeeList')
    let formValues = []
    // Marshall form values
    for (let i=0; i<payeeList.length; i++) {

      let payee = {}
      console.log(i)
      payee.address = event.target['accountAddress-' + i].value
      payee.weight = parseInt(event.target['accountWeight-' + i].value)
      payee.status = event.target['accountStatus-' + i].checked
      //payee.balance = payeeList[i].balance

      formValues.push(payee)
    }

    changedValues = []
    // Make a list of values to change
    payeeList.forEach(function(element, index){
      let payeeChanged = {}

      if (payeeList[index].weight !== formValues[index].weight) {
        payeeChanged.weight = formValues[index].weight
      }

      if (payeeList[index].status !== formValues[index].status) {
        console.log(formValues[index].status)
        payeeChanged.status = formValues[index].status
      }

      // If the object is not empty
     if (Object.keys(payeeChanged).length !== 0) {
        changedValues.push(payeeChanged)
     } else {
       changedValues.push(null)
     }

      let contractInstance = donationContract.at(Session.get('contractAddress'))
    //  let batch = web3.createBatch()

      console.log(changedValues)
      changedValues.forEach(function(element, index) {
        if (element !== null) {
          console.log('el', element)
          if (element.weight !== undefined) {
             /*batch.add(*/contractInstance.updatePayeeWeight(payeeList[index].address, element.weight, function(err, res) {
               console.log(err)
               if (!err){
                 console.log(res)
               }
             })/*)*/
          }

          if (element.status !== undefined) {
            if (element.status === true) {
              /*batch.add(*/contractInstance.enablePayee(payeeList[index].address, function(err, res) {

                if (!err){
                  console.log(res)
                  console.log('updated status')
                } else {
                  console.log(err)
                }
              })/*)*/
            }
            else if(element.status === false) {
              /*batch.add(*/contractInstance.disablePayee(payeeList[index].address, function(err, res) {
                console.log(err)
                if (!err){
                  console.log(res)
                }
              })/*)*/
            }
          }
        }
      })
    })

    //console.log(changedValues)
  //  _fetchPayees
    return false
  }
})

Template.header.onCreated(function() {

  // web3NetworkDetective(web3.currentProvider, function(err, res){
  //   if (!err) {
  //     console.log('onCreated')
  //     console.log(res)
  //     if (res.custom === true) {
  //       Session.set('etherscanLink', 'https://kovan.etherscan.io/address')
  //     }
  //     else if (res.testnet === true) {
  //       Session.set('etherScanLink', 'https://ropsten.etherscan.io/address')
  //     }
  //     else if (res.mainnet === true) {
  //       Session.set('etherScanLink', 'https://etherscan.io/address')
  //     } else {
  //       Session.set('poo')
  //     }
  //   }
  // })
})

// Launching these in the header is a bit of hack!!!!
Template.header.helpers({
  getContractAddress: () => {
    return FlowRouter.getParam('contractAccountId')
  },
  // getEtherscanLink: () => {
  //   console.log('fetching')
  //   console.log(Session.get('etherScanLink'))
  //   return Session.get('etherScanLink')
  // },
  getUserAccountAddress: () => {
    if (Session.get('contractAddress')) {
      let contractInstance = donationContract.at(Session.get('contractAddress'))

      contractInstance.owner.call(function(err, owner) {
        if (!err) {
           Session.setPersistent('ownerAddress', owner)
          if (Session.get('userAccountAddress') === owner) {
            Session.setPersistent('isOwner', true)
          }
        }
      })
      return Session.get('userAccountAddress')
    }
  },
  getContractAddress: function() {
    return Session.get('contractAddress')
  },
  //add this to perms
  getContractOwner: function() {
    let contractInstance = donationContract.at(Session.get('contractAddress'))

    contractInstance.owner.call(function(err, owner) {
      if (!err) {
        return owner
      }
    })
  },
  getContractPayee: function() {
    contractInstance.payees.call((err, payees) => {
      if(!err) {
        console.dir(payees)
      }
    })
  }
})



Template.transferOwner.onCreated(() => {
  // Get owner address from blockchain
  let contractInstance = donationContract.at(Session.get('contractAddress'))
  contractInstance.owner.call(function(err, owner) {
    if (!err) {
     Session.set('contractOwnerAddress', owner)
    }
  })
})


Template.transferOwner.helpers({
  getContractOwner: function() {
    console.log('fetching owner')
    if (Session.get('isOwner')) {
      return Session.get('userAccountAddress')
    }
  },
  getContractOwnerAddress: function() {
    return Session.get('contractOwnerAddress')
  }
})

Template.transferOwner.events({
  'submit #transferOwner': () => {
    event.preventDefault()
    console.log(Session.get('ownerAddress'))

    let transferTo = event.target.transferOwnerTo.value
    let contractInstance = donationContract.at(Session.get('contractAddress'))

    contractInstance.transferOwner(transferTo, function(err, res) {
      console.log(err)
      if (!err) {
        console.log(res)
      }
    })

    return false
  }
})

Template.myAccount.onCreated(() => {

  userAccountBalance = new ReactiveVar(0)
  userWeighting = new ReactiveVar(0)
  let contractInstance = donationContract.at(Session.get('contractAddress'))
  contractInstance.getUserBalance.call(Session.get('userAccountAddress'), function(err, res){
    if(!err) {
       this.userAccountBalance.set(parseInt(res))
    }
  })

  contractInstance.getWeight.call(Session.get('userAccountAddress'), function(err, res){
    if(!err) {
       this.userWeighting.set(parseInt(res))
    } else {
      console.log('can\'t retrieve contact balance')
    }
  })
})

Template.myAccount.helpers({
  getUserAccountAddress: () => {
    //  move the call to oncreate can we set something to give off when a
    // group is accessed?

      let coinbase = web3.eth.accounts[0]
      return coinbase
  },
  getUserAccountBalance: () => {
    return web3.fromWei(userAccountBalance.get(), 'ether')
  },
  getUserWeighting: () => {
    return userWeighting.get()
  }
})

Template.myAccount.events({
  'submit #withdraw': () => {
    event.preventDefault()
    let weiAmount = web3.toWei(event.target.amount.value, 'ether')
    console.log('amt',weiAmount)
    //let fromAddress = Session.get('userAccountAddress')
    // @todo this should be a hidden value in the form

    let contractInstance = donationContract.at(Session.get('contractAddress'))
    contractInstance.withdraw(weiAmount, function(err, res) {
      console.log(err)
      if (!err) {
        console.log('withdrawn')
        console.log(res)
      }
    })
  }
})

Template.donutButton.onCreated(function() {
  Session.setPersistent('contractAddress', FlowRouter.getParam('contractAccountId'))
})


Template.donutButton.helpers({
  'getContractAddress': () => {
    return Session.get('contractAddress')
  }
})

Template.donutButton.events({
  'submit #donateButton': () => {
    event.preventDefault()
    let ethAmount = event.target.donateAmountField.value
    let contractId = Session.get('contractAddress')
    console.log('id', contractId)
//    let contractId = event.target.contractIdField.value
    console.log(donationContract)
    let contractInstance = donationContract.at(Session.get('contractAddress'))
    console.log(contractInstance)

    contractInstance.deposit({from: web3.eth.accounts[0], to: contractId, value: web3.toWei(ethAmount, "ether")}, function(err, res) {

      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    })
  },
  'submit #buttonEmbedCodeForm': () => {
    event.preventDefault()
  }
})

Template.donutButton.onRendered(function() {
  //document.activeElement.blur()
  let clipboard = new Clipboard('#clipboardButton')

  // clipboard.on('success', function(e) {
  //     console.info('Action:', e.action)
  //     console.info('Text:', e.text)
  //     console.info('Trigger:', e.trigger)
  //
  //     e.clearSelection()
  // });
  //
  // clipboard.on('error', function(e) {
  //   console.error('Action:', e.action)
  //   console.error('Trigger:', e.trigger)
  // })

})

Template.transferBalances.onCreated(function(){
  _fetchPayees()

  web3.eth.getBalance(Session.get('contractAddress'), function(err, res) {
    if (!err) {
      let contractEthBalance = web3.fromWei(res, 'ether').toNumber()
      Session.setPersistent('contractBalance', contractEthBalance)
    } else {
      console.log(err)
    }
  })
})

Template.transferBalances.helpers({
  'getContractBalance' : () => {
    return Session.get('contractBalance')
  }
})

Template.transferBalances.events({
  'submit #transferBalance': () => {
    event.preventDefault()
    let fromAddress = event.target.transferFrom.value
    let toAddress = event.target.transferTo.value
    let etherAmount = event.target.transferAmount.value
    let weiAmount = web3.toWei(etherAmount, 'ether')

    console.log(fromAddress, toAddress, etherAmount, weiAmount)

    let contractInstance = donationContract.at(Session.get('contractAddress'))
    contractInstance.transferBalance(fromAddress, toAddress, weiAmount, function(err, res){
      if (!err) {
        // @todo add a watcher for this
        console.log(res)
      }
    })
  }
})

// Template.transactionLog.onCreated({})

Template.transactionLog.helpers({
  logDisplay: () => {

    let contractInstance = donationContract.at(Session.get('contractAddress'))

    // Watch for donations
    contractInstance.NewDonation(function(err, res) {
      if(!err) {

        let msg = 'New donation of ' + web3.fromWei(parseInt(res.args.amt), 'ether') + ' eth from ' + res.args.donator
        let txId = res.transactionHash
        let timestamp = Date.now()
        //@todo -- we need another function which watches for addition of transaction receipts
        // no idea why this keeps failing
        // to the db and then tracks and updates
        // should probably move the eatchwr
        //@todo add proper transactionReceipt
      if (TransactionLogsDb.findOne({receiptHash: txId}) === undefined) {
        TransactionLogsDb.insert(
          {
            item: {},
            message: msg,
            receiptHash: txId,
            confirmationCount: 1
          })
        }
      }
    })

    contractInstance.Withdrawal(function(err, res) {
      if (!err) {
        let msg = 'Withdrawal by ' + res.args.payee + ' of ' + web3.fromWei(res.args.amt, 'ether')
        console.log('event')
        console.log(res)
        if (TransactionLogsDb.findOne({receiptHash: res.transactionHash}) === undefined) {
          TransactionLogsDb.insert(
            {
              item: {},
              message: msg,
              receiptHash: res.transactionHash,
              confirmationCount: 1
              // _id: res.transactionHash
            }
          )
        }
      }
    })

    contractInstance.OwnerChanged(function(err, res) {

      if (!err) {
          let msg = 'Transferred ownership from ' + res.args.owner + '  to  ' + res.args.newOwner
          let txId = res.transactionHash

        if (TransactionLogsDb.findOne({receiptHash: res.transactionHash}) === undefined) {
          TransactionLogsDb.insert(
            {
              item: {},
              message: msg,
              receiptHash: res.transactionHash,
              confirmationCount: 1
              // _id: res.transactionHash
            }
          )
        }
      }
    })

    contractInstance.Transfer(function(err, res) {
      let msg = 'Transferred ' + web3.fromWei(res.args.amt, 'ether') + ' eth from ' + res.args.from + 'to ' + res.args.to
      let txId = res.transactionHash
      let timestamp = Date.now()

      console.log('tfr')
      console.log(res)

      if (TransactionLogsDb.findOne({receiptHash: res.transactionHash}) === undefined) {
        TransactionLogsDb.insert(
          {
            item: {},
            message: msg,
            receiptHash: res.transactionHash,
            confirmationCount: 1
            // _id: res.transactionHash
          }
        )
      }
    })

    contractInstance.PayeeAction(function(err, res){
      if(!err) {
        // console.log(res)
        let action = web3.toAscii(res.args.action).replace(/\u0000/g, '')
        let message = 'default'

        switch(action) {
            case 'added':
                message = 'Added new payee ' + res.args.payee  + 'to contract'
                break
            case 'disabled':
                message = 'Disabled user ' + res.args.payee
                break
            case 'enabled':
                message = 'Enabled user ' + res.args.payee
                break
            //@todo update add update weight to contract
            default:
                message = 'Unknown action'
        }

        //@todo use ID
        //@todo make this an upsert
        if (TransactionLogsDb.findOne({receiptHash: res.transactionHash}) === undefined) {
          TransactionLogsDb.insert(
            {
              item: {},
              message: message,
              receiptHash: res.transactionHash,
              confirmationCount: 1
              // _id: res.transactionHash
            }
          )
        }
      }
    })

    //@todo create watcher for number of confirmations

    let unconfirmedTransactions = TransactionLogsDb.find({'confirmationCount': {$lt: 13}}, {receiptHash: true}).fetch()

    //let filter = web3.eth.filter('latest')

    // see if we can do this by getting a list of tranaction hashes in a block range
    // enough to

    //fetch latest 12 block
    //maybe using a database was a terrible idea
    //eesh -- reacvtiev programming
    // get all events via web 3
    // create
    //need to create and destroy a filter

    // filter.watch(function(err, res) {
    //   if (!err) {
    //     web3.eth.getBlock(web3.eth.blockNumber - 11, function(err, res) {
    //       if (!err) {
    //         res.transactions.forEach(function(txId, i) {
    //
    //         })
    //       }
    //     })
    //   }
    //
    //
    // })

    // unconfirmedTransactions.forEach(function(){
    //
    // })





    return TransactionLogsDb.find({}, {message: true}).fetch()

    // let options = {
    //   address: Session.get('contractAddress'),
    //   fromBlock: 'latest'
    // }
/*
    let filter = web3.eth.filter(options)
    filter.watch(function(err, res) {
      console.log(res)
      if (!err) {
        web3.eth.getTransaction(res.transactionHash, function (err, res){
          console.log('tx', res)
        })
        web3.eth.getBlock(res.blockHash, function(req, res){
          console.log('blk', res)
        })
      }
      if (res.topics !== undefined && res.topics.length > 0) {
        // get transaction
        res.topics.forEach(function(el, i){
          console.log(el)
          console.log(web3.toAscii(el))
        })
      }
    })
*/
  },
  getLogs: () => {
    return TransactionLogsDb.find({}, {message: true}).fetch()
  }
})

Template.contractAddress.helpers({
  getContractAddress: function() {
    console.log(Session.get('contractAddress'))

    return Session.get('contractAddress') || FlowRouter.getParam('contractAccountId')

    // need to create a conditional to verify this is actually our contract.
    // need a js function to validate as a real contract
    // before returning
    //return FlowRouter.getParam('contractAccountId')
  },
})
