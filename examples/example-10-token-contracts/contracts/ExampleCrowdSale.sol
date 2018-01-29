pragma solidity ^0.4.11;
//web3.personal.unlockAccount("account","password");
//stable vague chat more web foil stick envelope name hub midnight baby
import './CWCToken.sol';
import './Crowdsale.sol';

contract ExampleCrowdSale is Crowdsale {

function ExampleCrowdSale(uint256 _startBlock, uint256 _endBlock, uint256 _rate, address _wallet)
    Crowdsale(_startBlock, _endBlock, _rate, _wallet) payable {
}

 function createTokenContract() internal returns (MintableToken) {
    return new CWCToken();
  }
}
