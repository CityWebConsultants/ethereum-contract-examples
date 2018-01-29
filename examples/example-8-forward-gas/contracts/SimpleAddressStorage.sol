pragma solidity ^0.4.11;

contract SimpleAddressStorage {

//  mapping(uint256 => address) public users;
  //uint256 usersIndex;
  address[] users;
  address owner;
  address wallet;

  string[] wasteSpace;

  event AddressAdded(address indexed user);
  event FundsForwarded(address indexed from, address indexed to, uint256 amountSent);
  event DebugNumber(string msg, uint256 number);


  function SimpleAddressStorage(address _wallet) {
    wallet = _wallet;
    owner = msg.sender;
    users.push(owner);
  }

  modifier isOwner() {
    if (msg.sender != owner) return;
    _;
  }

  function addUser(address sender) payable {
    users.push(sender);
    /*this.transfer(20000);*/
    for (uint256 i = 0;i<1;i++) {
      // fire event
      burnGas();
      DebugNumber("gas left", msg.gas);
    }

    forwardFunds();
  }

  //lets burn some gas
  function burnGas() {
    wasteSpace.push('wasting away');
  }

  function forwardFunds() payable {
    uint256 value = msg.value;
    wallet.transfer(value);
    FundsForwarded(msg.sender, owner, value);
  }
}
