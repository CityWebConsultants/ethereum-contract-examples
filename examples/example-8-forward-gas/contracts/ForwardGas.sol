pragma solidity ^0.4.11;

import "./SimpleAddressStorage.sol";

// Explain constructor
contract ForwardGas is SimpleAddressStorage {

  event eUint256(string msg, uint256 number);

  function ForwardGas(address _wallet) SimpleAddressStorage(_wallet) {
    //
  }

  uint256 maxGasPrice = 50000000000;

  function() payable {
    require(msg.value > 0 && tx.gasprice <= maxGasPrice);
    addUser(msg.sender);
  }
}
