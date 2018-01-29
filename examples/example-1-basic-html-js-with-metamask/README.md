# Simple Dapp

## Requirements

* Google Chrome
* Chrome MetaMask plugin
* NPM

##  Introduction

For this tutorial we have created a simple  Ethereum application (a form with submit) for users to send Ether to an author as a tip. There are many tools available for developing and deploying Smart Contracts and Dapps; for this example we’re going to use MetaMask, HTML and Javascript.

MetaMask is a Chrome plugin that allows users to interact with accounts and contracts on Ethereum without having to run a local node (though it can use that too). On first install it creates a randomly generated HD Brain Wallet - so we can use the same accounts later.

## Setting up

Install [MetaMask](https://metamask.io/) and select the Ropsten Testnet,  then we need to get some Ether. Since mining is so easy on the Testnet many users have setup Faucets which will drip (send small amounts) of Ether into other accounts on request. [Visit the fauctet](http://faucet.ropsten.be:3001]) and submit a request for an Ether - it should take less than a minute to come through.

Now we need to serve our web page. Any server will do. I like to use Node’s http-server which you can install with

```
npm install -G http-server
```

and then in the example folder run

```
http-server
```

This command should start a server and return a list of IPs with port numbers. Visiting our page at something like ```127.0.0.1:8080/simple-dapp.html```.

You should now be able to enter an amount, click the donate button and approve the transaction via MetaMask's pop up (and help subsidise the starving author).

## About the code

```
function send() {
  web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',
    value: web3.toWei(document.getElementById("amount").value, 'ether')
  }, function(error, result) {
    if (!error) {
      document.getElementById('response').innerHTML = 'Success: <a href="https://testnet.etherscan.io/tx/' + result + '"> View Transaction </a>'
    } else {
      document.getElementById('response').innerHTML = '<pre>' + error + '</pre>'
    }
  })
}
```



MetaMask injects the web3 object for us. The [web3 javascript library](https://github.com/ethereum/wiki/wiki/JavaScript-API) allows interactions with running nodes and the blockchain on a web page.

[sendTransaction()](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendtransaction) can be used to send messages and data but here we're just sending ether. It is possible to add a specific amount of Ether to cover the cost of making the transaction (gas price) and by excluding this value we allow MetaMask to make this decision for us.

to: '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277': Send this to the poor authors account

[from: web3.eth.coinbase](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcoinbase):  Tell the transaction to take ether from the account we have currently authorized in our wallet.

[toWei()](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3towei): Our input field is expecting values set in Ether but transactions on the network itself are measured in a smaller unit called Wei. 1 Ether equals 1,000,000,000,000,000,000 Wei.

[Return object](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks): If the callback succeeds we get a hash of the pending transaction which we use to generate a link on the Testnet blockchain explorer. Here, we can watch the progress of our transaction as it gets mined. If our the transaction fails, we get an error object.
