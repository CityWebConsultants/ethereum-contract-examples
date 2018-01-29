const utils = require('ethereumjs-util')

module.exports = {
  msgToHash: message => new Buffer(utils.sha3(message).toString('hex'), 'hex')
}
