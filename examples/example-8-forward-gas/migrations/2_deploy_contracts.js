const ForwardGas = artifacts.require("./ForwardGas")
//const SimpleAddressStorage = artifacts.require("./SimpleAddressStorage")

module.exports = function(deployer) {
  // address corresponds -- can we not set this up in the deployer
  deployer.deploy(ForwardGas, '0x03c53c2941ebb7c743dd1d4f1b80405c532fc458')
}
