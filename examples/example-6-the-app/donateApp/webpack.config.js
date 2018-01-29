const path = require('path')

module.exports = {
  entry: './.contract/truffle/build/contracts/Donation.json',
//  entry: './imports/build.js',
  output: {
      path: __dirname + '/imports',
      filename: "bundle.js",
      libraryTarget: "commonjs2"
  },
  module: {
    rules: [
     { test: /\.json$/, use: 'json-loader' }
    ]
  }
}
