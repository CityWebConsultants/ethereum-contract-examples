# Watching the chain

## Requirements

Node / NPM

Geth (Go Ethereum) is a command line tool for running a local Ethereum node, interacting with the blockchain and managing user accounts. It is available from [source](https://github.com/ethereum/go-ethereum/releases), [binaries](https://geth.ethereum.org/downloads/) or [common package managers](https://www.ethereum.org/cli).

## Setup


Once Geth is available on our system we need to fetch the blockchain. Even in "Fast mode" this may take considerable time. Depending on you network connection and CPU speed, it could take anything from 30 minutes to several hours to get bootstrapped.

```
geth --testnet --fast --cache=1024 --rpc console
```

This will start the blockchain downloading on the Ropsten Testnet in fast mode (1Gb cache), allow incoming RPC http requests on port 8545 (default) and opens an interactive console. Typing ```eth.syncing``` will return the current chain sync state.

In the example directory ```npm install``` to fetch dependencies, then ```node watchLatestBlock.js``` to run.

## About the code

```
let filter = web3.eth.filter({
  fromBlock: 'latest',
  address: account,
})

filter.watch(function(error, tx) {
  if (!error) {
    console.log(tx)
  } else {
    console.error(error)
  }
})

```



We use the [filter()](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethfilter) method to retrieve an object which can watch our conditions. In this case, we only care about transactions involving one account appearing on the most recently mined block. ```tx``` will contain a transaction reciept like @todo example

If we were dealing with large amounts of Ether as a business, we would want to wait for at least 12 confirmations (blocks) before considering a transaction complete.
