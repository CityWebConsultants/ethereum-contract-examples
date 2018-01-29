const Web3 = require('web3')
// Point web3 toward our geth RPC endpoint.
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8000"))
// Some wallets use mixed case for error checking, but geth uses lower case.
//let account = '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277'.toLowerCase()
let account = '0x05430f5201585C2601bB75d9658007202864c993'.toLowerCase()
let filter = web3.eth.filter('latest')
filter.watch(function(error, result) {
  if (!error) {
    let confirmedBlock = web3.eth.getBlock(web3.eth.blockNumber - 1)
    console.log('gotblock')
    if (confirmedBlock.transactions.length > 0) {
      confirmedBlock.transactions.forEach(function(txId) {
        let transaction = web3.eth.getTransaction(txId)
          if (transaction.to == account) {
            // Do something useful.
            console.log(transaction.from)
          }
      })
    }
  }
})
