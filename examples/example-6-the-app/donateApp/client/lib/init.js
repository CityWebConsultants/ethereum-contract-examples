import { Minimongo } from 'meteor/minimongo'
import SimpleSchema from 'simpl-schema'
import { Session } from 'meteor/session'


// Web3 = require('web3')
//
// // window.addEventListener('load', function() {
//
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider
//     window.web3 = new Web3(web3.currentProvider)
//     console.log(web3.currentProvider)
//   } else {
//     console.log('No web3? You should consider trying MetaMask!')
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//     console.log(web3.currentProvider)
//   }
//
//   console.log(web3.currentProvider)
//     // Run webpack in terminal to create new bundle.
// // })
//
// Session.setPersistent('userAccountAddress', web3.eth.accounts[0])

// const contractArtifacts = require('../../imports/bundle.js')
// donationBytecode = contractArtifacts.unlinked_binary
// donationContract = web3.eth.contract(contractArtifacts.abi)

if (typeof TransactionLogsDb == 'undefined') {
  TransactionLogsDb = new Mongo.Collection(null)

  TransactionLogsDb.attachSchema(new SimpleSchema({
      item: {
        type: Object,
        label: 'response obj',
      },
      receiptHash: {
        type: String,
        label: 'tx hash',
      },
      message: {
        type: String,
        label: 'Log message'
      },
      confirmationCount: {
        type: Number,
        label: 'Confirmation count'
      }
    })
  )
}

// Meteor.Spinner.options = {
//     lines: 13, // The number of lines to draw
//     length: 10, // The length of each line
//     width: 5, // The line thickness
//     radius: 15, // The radius of the inner circle
//     corners: 0.7, // Corner roundness (0..1)
//     rotate: 0, // The rotation offset
//     direction: 1, // 1: clockwise, -1: counterclockwise
//     color: '#fff', // #rgb or #rrggbb
//     speed: 1, // Rounds per second
//     trail: 60, // Afterglow percentage
//     shadow: true, // Whether to render a shadow
//     hwaccel: false, // Whether to use hardware acceleration
//     className: 'spinner', // The CSS class to assign to the spinner
//     zIndex: 2e9, // The z-index (defaults to 2000000000)
//     top: 'auto', // Top position relative to parent in px
//     left: '300' // Left position relative to parent in px
// };
