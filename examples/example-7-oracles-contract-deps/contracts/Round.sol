pragma solidity ^0.4.11;

// Simplify simplify simplify

// Is there anythign in style that says we should not set values outside of constructor
//@todo safe math in another library
//@todo parent rounds
// can have parents
//tree
//choosing the right number several times in a tournament
//@consider -> renaming manager to delegat
// how can we conceal nonce until both players have participated

//does the app generate a new or --- could we charge the last to create a new options
// what can we do to abstract this wholw thing ----
// perhaps been thinking thre wrong way about generalisation


contract Round {
  // RESULT MECHANISM
  //string name;
  address owner;
  address manager;
  address winner;

  uint numOptions;

  //shoudl be able to take these out just use a fixed array size
  uint maxParticipants;
  uint numParticipants;
  uint randomNumber;

  bool roundState;
  uint fee;

  struct Participant {
    address account;
    uint deposit;
    int8 choice;
    uint nonce;
  }

  Participant[] participants;
//  string[] topic;
//  string[] options;

  // 1 or 2
  int8 result;

  event ParticipantAction(address indexed participant, address indexed round, uint deposit);
  event Message(string msg);
  event ResultGenerated(address indexed round, uint result);

  // how do we enforce creation by another contract
  //or checking whether it is an account or a wallet
  function Round(address _owner, uint _fee) {
    owner = _owner;
    manager = msg.sender;
    fee = _fee;
    maxParticipants = 2;
    numParticipants = 0;
    roundState = true;
    randomNumber = 0;
  }

  modifier isOwner {
    require(msg.sender == owner);
    _;
  }

  modifier isWinner() {
    require(msg.sender == winner);
    _;
  }

  modifier isManager() {
    require(msg.sender == manager);
    _;
  }

  modifier roundOpen() {
    require(roundState == true);
    _;
  }

  modifier roundClosed() {
    require(roundState == false);
    _;
  }

  function safeDiv() {}

  function safeMul() {}

  function safeCalcFee() {}

//@todo check return values and effect on gas
//may need to fefund
function addParticipant(int8 _choice, uint _nonce) roundOpen payable returns (bool) {

  // @todo find a way to tidy up this logic
  if (numParticipants == 2) {

    if (!msg.sender.send(msg.value)) {
      throw;
    }

    Message('Round is full');
    return false;
  }

  if (numParticipants == 1 && participants[0].choice == _choice) {
    if (!msg.sender.send(msg.value)) {
      throw;
    }

    Message('This option has already be taken');
    return false;
    // throw
  }

  if (numParticipants == 1 && participants[0].account == msg.sender) {
    if (!msg.sender.send(msg.value)) {
      throw
    }
    
    Message('This account has already chosen an option');
    return false;
    // throw
  }

  if (numParticipants < maxParticipants) {
    Participant memory p = Participant ({account: msg.sender, deposit: msg.value, choice: _choice, nonce: _nonce});
    participants.push(p);
    numParticipants++;
    ParticipantAction(msg.sender, this, msg.value);
    // generateResult()
    // maybe we should be storing these values in the roundManager so that a user can play again.

    return true;
  }
}

  // When taking second position result should be generated.
  // @todo tighern up return values.
  function generateResult() roundOpen public returns (uint) {
    // This will be a call to oracilze.
    randomNumber = getRandomNumber();
    if (randomNumber != 0) {
      roundState = false;
      ResultGenerated(this, randomNumber);
      // check choices from participants
      // and set winner
      return randomNumber;
    } else {
      return 0;
    }
    // set winner
    // what are the conditions
  }
  //@todo rename this to generate
  function getRandomNumber() private returns (uint randomNumber) {
    // random number unset
    if (randomNumber == 0) {
      return uint(sha3(participants[0].nonce+participants[1].nonce+block.timestamp))%(2) + 1;
    } else {
      return 0;
    }
  }

  function cashOut() roundClosed payable isWinner {
    //transfer fee to originating contract
    //at a URL
    // @todo add safe math (possibly in separate library)
    //@todo safe div
    if (fee > 0) {
      manager.transfer(fee / 100 * this.balance);
    }
    // whats the difference between transfer and send???
    winner.transfer(this.balance)
    //distirbuted
    //Event notifiy
  }

  function isParticipant(address _account) returns (bool) {
    for (uint i = 1; i < numParticipants; i++) {
      if (participants[i].account == _account) {
        return true;
      }
    }
    return false;
  }
}


//kill
