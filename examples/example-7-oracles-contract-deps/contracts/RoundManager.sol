pragma solidity ^0.4.11;

import "./Round.sol";
// do we need the .slash
// add steps to deploy round manager
/*.deploy*/

contract RoundManager {

    // percentage to take
    uint public fee;
    address public admin;
    address public owner;
    string public name;

    //uint maxNumberOptions;

    /*struct round {
      string name;
      address owner;
      bool status;
      uint fee;
    }*/

    //topic
    struct Round {}
    // we remember data about the round here and kill the contract
    // should killing the contract
    // killing the contract in different states
    // rememeber

    /*mapping (address => round) rounds*/
    address[] Rounds;

    event UpdatedFee(uint newAmount);
    /*event CreatedRound(address indexed owner, address indexed round, address indexed manager);*/
    event CreatedRound(address indexed round);

    function RoundManager(uint _fee, string _name) {
      admin = 0x8ebaf7E4B9F0D6FDE37677861b0f6B43171C6fd6;
      owner = msg.sender;
      fee = _fee;
      name = _name;
    }

    modifier isAdmin() {
      require(msg.sender == admin);
      _;
    }

    // consider reducing
    function createRound (address owner) {
        address newRound = new Round(owner, fee);
        rounds.push(newRound);
        CreatedRound(newRound);
    }

    // shoudl separate remove round at index
    // and have separate one for killing at an address
    /*function killRound(address round) isAdmin {}*/
    function removeRound(uint index) {
          // -1?
          if (index >= rounds.length) return;
          for (uint i = index; i<rounds.length-1; i++) {
              rounds[i] = rounds[i+1];
          }

          delete rounds[rounds.length-1];
          rounds.length--;
          //set a message
          //call function to remove the contract
    }

    /*function houseKeeping(){}

    function pruneAll() isContract isAdmin isCreator {}*/

    function updateFee(uint _fee) returns (uint fee) {
      fee = _fee;
      UpdatedFee(fee);
      // is there any point in a return here?
      return fee;
    }

    //kill


    //@todo endure number is not the same

    // Should we just have a separate part for making calls so that we can derive
    // the object --> really should have thought much more about this
  }

  //kill
