var AuthorDonation = artifacts.require("./AuthorDonation.sol")

module.exports = function(deployer) {
  deployer.deploy(AuthorDonation)
}
