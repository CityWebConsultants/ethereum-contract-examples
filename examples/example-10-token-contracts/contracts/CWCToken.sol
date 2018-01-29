pragma solidity ^0.4.11;

import './MintableToken.sol';

contract CWCToken is MintableToken {
  string public name = "CWC Coin";
  string public symbol = "CWC";
  uint256 public decimals = 18;
  uint256 totalSupply = 1000000;

  function CWCToken() {
    totalSupply = 1000000;
    balances[msg.sender] = 100;
  }

}
