
const argv = require('minimist')(process.argv.slice(2));
const Web3 = require("web3")
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))



//geth --networkid=4 --datadir=$HOME/.rinkeby --cache=512  --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 --rpc --rpcapi="personal,eth,network, net, web3"

//web3.personal.unlockAccount("0xa4f966F298C182364D9A238aA176667c793AD7D5", '')

// var provider;
// var HDWalletProvider = require('truffle-hdwallet-provider');
// var mnemonic = 'stable vague chat more web foil stick envelope name hub midnight baby';
//
// if (!process.env.SOLIDITY_COVERAGE){
//   provider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/')
// }

//var mnemonic = "couch solve unique spirit wine fine occur rhythm foot feature glory away";

//@see http://truffleframework.com/tutorials/using-infura-custom-provider
//var bip39 = require("bip39");
var bip39 = require("bip39")
var hdkey = require('ethereumjs-wallet/hdkey')
// var ProviderEngine = require("web3-provider-engine")
// var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js')
// var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js")
// var RpcSubprovider = require("web3-provider-engine/subproviders/rpc.js")


//setup accounts --- if provider connected and no accounts listed -- import them automagically

//web3 --- account import --- can automate this here if it doesn't exist!!!

//let mnemonic = "stable vague chat more web foil stick envelope name hub midnight baby"

let mnemonic = "adult decade sing mule reject spy clever end give door know neither"
let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))

// Get the first account using the standard hd path.
let wallet_hdpath = "m/44'/60'/0'/0/"
let wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet()
let address = "0x" + wallet.getAddress().toString("hex")

if (argv.network !== 'undefined' && argv.network === 'rinkeby') {
  let accounts = web3.eth.accounts
  accounts.forEach(function(ac) {
   web3.personal.unlockAccount(ac, '', 99999999)
   //console.log('unlocking: ' + ac);
  })
}

//


// testing gas need to do it on the real thing!!!!!!
// find out what network we are on....
// and then setup accordingly



//console.log(web3.eth.accounts)
//get account list and unlock them all


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
//console.log(util.inspect(this, false, null))
//console.log(engine)

//where is this export found
//how would one import it
//could add a function here to call var and import !?
module.exports = {
 something: 'foomboom',
 networks: {
   local: {
     host: "localhost",
     port: 8545,
     network_id: "*",
     gas: 4700000,
     address: address,
     something: 'fooboom2'
   },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4",
      address: address,
      gas: 4700000,
    },
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
 }
}
