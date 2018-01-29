var bip39 = require("bip39")
var hdkey = require('ethereumjs-wallet/hdkey')
// var ProviderEngine = require("web3-provider-engine")
// var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js')
// var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js")
// var RpcSubprovider = require("web3-provider-engine/subproviders/rpc.js")

var Web3 = require("web3")
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/MLk3J5EofUa7z4wCB3UB:8545"))
/*
let mnemonic = "adult decade sing mule reject spy clever end give door know neither"
let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))
let wallet_hdpath = "m/44'/60'/0'/0/"

// how do we check which provider we are using

// If we don't already have 10 accounts, create them from mnemonic
for (let i = 0; i < 10; i++) {
  if (typeof web3.eth.accounts[i] === 'undefined') {
    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet()
    web3.personal.importRawKey(wallet.getPrivateKey().toString("hex"), '')
  }
}
*/
// unlock all available accounts
// let accounts = web3.eth.accounts
// accounts.forEach(function(address) {
//   web3.personal.unlockAccount(address, '')
//   console.log('Unlocking account: ' + address)
// })


// let providerUrl = "https://rinkeby.infura.io/MLk3J5EofUa7z4wCB3UB:8545"
//  // let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// //let providerUrl = "https://testnet.infura.io"
// // let engine = new ProviderEngine()
// // engine.addProvider(new WalletSubprovider(wallet, {}))
// // engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
// // engine.start(); // Required by the provider engine.
//
// //var providerUrl = "http://testnet.infura.io";
// var engine = new ProviderEngine()
// engine.addProvider(new WalletSubprovider(wallet, {}))
// // engine.addProvider(new RpcSubprovider({
// //   rpcUrl: providerUrl,
// // }))
// engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
// engine.start(); // Required by the provider engine.

//engine.addProvider(new FilterSubprovider())????
// new RpcSubprovider

//aaarrrghhhh -- it could be the port number
//or mebs RPC call

//console.log(engine)
module.exports = {
  networks: {
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 4700000,
    //  from: web3.eth.accounts[0],
    },
    // rinkeby: {
    //   host: 'https://rinkeby.infura.io/MLk3J5EofUa7z4wCB3UB',//engine,//providerUrl'',
    // //  port: 443,
    //   network_id: "*",
    //   //gas: 4700000,
    //   from: web3.eth.accounts[0],
    // //  gas: 4700000
    // },
    // staging: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: "42",
    // //  from: "0xa4f966F298C182364D9A238aA176667c793AD7D5", //account 0 from mnemonic
    //   gas: 7639484
    // },
    // ropsten: {
    //   provider: provider,
    //   network_id: 3 // official id of the ropsten network
    // },
    // coverage: {
    //   host: "localhost",
    //   network_id: "*",
    //   port: 8555,
    //   gas: 0xfffffffffff,
    //   gasPrice: 0x01
    // }
  },
  // rpc: {
  //   host: 'https://rinkeby.infura.io/MLk3J5EofUa7z4wCB3UB'
  // }
}
