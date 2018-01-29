let accounts = web3.eth.accounts
let multisigAccounts = [accounts[0], accounts[8], accounts[9]]

let MultiSigWallet = artifacts.require("./MultiSigWallet")

module.exports = function(deployer) {
  //deployer.deploy(MultiSigWallet,["0x1313734d2d6625173278978ddaa7b63400462745", "0x10b50646ffc614d9df474ee379971185e538714b", "0xf5b1b23448f8f970ce3aec7fd78ab8eec819d161"], 2)
}
