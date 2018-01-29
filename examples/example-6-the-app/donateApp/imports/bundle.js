module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	"contract_name": "Donation",
	"abi": [
		{
			"constant": true,
			"inputs": [],
			"name": "payeesIndexSize",
			"outputs": [
				{
					"name": "",
					"type": "int8"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_payee",
					"type": "address"
				},
				{
					"name": "_weight",
					"type": "uint256"
				}
			],
			"name": "addPayee",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_payee",
					"type": "address"
				},
				{
					"name": "_weight",
					"type": "uint256"
				}
			],
			"name": "updatePayeeWeight",
			"outputs": [],
			"payable": false,
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "int8"
				}
			],
			"name": "payeesIndex",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"payable": true,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_payee",
					"type": "address"
				}
			],
			"name": "disablePayee",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getStatus",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"name": "payees",
			"outputs": [
				{
					"name": "status",
					"type": "bool"
				},
				{
					"name": "weight",
					"type": "uint256"
				},
				{
					"name": "balance",
					"type": "uint256"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "enablePayee",
			"outputs": [],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": true,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getUserBalance",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwner",
			"outputs": [
				{
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_from",
					"type": "address"
				},
				{
					"name": "_to",
					"type": "address"
				},
				{
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferBalance",
			"outputs": [],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getWeight",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "deposit",
			"outputs": [],
			"payable": true,
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getBalance",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "donator",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "amt",
					"type": "uint256"
				}
			],
			"name": "NewDonation",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "amt",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "payee",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "action",
					"type": "bytes32"
				}
			],
			"name": "PayeeAction",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "payee",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "amt",
					"type": "uint256"
				}
			],
			"name": "Withdrawal",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnerChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "contractAddress",
					"type": "address"
				}
			],
			"name": "ContractDestroyed",
			"type": "event"
		}
	],
	"unlinked_binary": "0x6060604052341561000c57fe5b5b60008054600160a060020a03338116600160a060020a03199283161780845581168352600160208181526040808620805460ff199081168517909155865485168752908620600a90840155855495805260029091527fac33ff75c19e70fe83507db0d683fd3465c996598dc972688b7ace676c89077b805490941694909216939093179091556003805490911690911790555b5b610dcc806100b06000396000f300606060405236156100d55763ffffffff60e060020a6000350416631673121b81146100d757806318f9b0231461010057806319bf02c4146101335780632221d6ec146101545780632e1a7d4d146101865780632fc9ee6b1461019357806330ccebb5146101c3578063310441fa146101f3578063314ffefd1461022f57806341c0e1b51461024d57806347734892146102575780634fb2e45d146102855780638da5cb5b146102b5578063a606b94a146102e1578063ac6c525114610308578063d0e30db014610336578063f8b2cb4f14610257575bfe5b34156100df57fe5b6100e761036e565b60408051600092830b90920b8252519081900360200190f35b341561010857fe5b61011f600160a060020a0360043516602435610377565b604080519115158252519081900360200190f35b341561013b57fe5b610152600160a060020a036004351660243561042f565b005b341561015c57fe5b61016a60043560000b6104b1565b60408051600160a060020a039092168252519081900360200190f35b6101526004356104cc565b005b341561019b57fe5b61011f600160a060020a03600435166105f0565b604080519115158252519081900360200190f35b34156101cb57fe5b61011f600160a060020a0360043516610681565b604080519115158252519081900360200190f35b34156101fb57fe5b61020f600160a060020a03600435166106a3565b604080519315158452602084019290925282820152519081900360600190f35b341561023757fe5b610152600160a060020a03600435166106c9565b005b61015261073e565b005b341561025f57fe5b610273600160a060020a0360043516610878565b60408051918252519081900360200190f35b341561028d57fe5b61011f600160a060020a03600435166108c7565b604080519115158252519081900360200190f35b34156102bd57fe5b61016a61096b565b60408051600160a060020a039092168252519081900360200190f35b34156102e957fe5b610152600160a060020a036004358116906024351660443561097a565b005b341561031057fe5b610273600160a060020a0360043516610a7c565b60408051918252519081900360200190f35b610152610acc565b005b341561025f57fe5b610273600160a060020a0360043516610878565b60408051918252519081900360200190f35b60035460000b81565b6000805433600160a060020a039081169116146103945760006000fd5b600160a060020a0383166000818152600160208181526040808420808401889055805460ff19908116851790915560038054860b860b860b8652600284528286208054600160a060020a03191688179055805480870b90950190950b60ff16931692909217909255805160da60020a6418591919590281529051600080516020610d61833981519152929181900390910190a25b5b92915050565b60005433600160a060020a0390811691161461044b5760006000fd5b60408051609260020a6d1dd95a59da1d081d5c19185d19590281529051600160a060020a03841691600080516020610d61833981519152919081900360200190a2600160a060020a0382166000908152600160208190526040909120018190555b5b5050565b600260205260009081526040902054600160a060020a031681565b600160a060020a03331660009081526001602081905260409091205460ff161515146104f85760006000fd5b600160a060020a03331660009081526001602081905260409091205460ff1615151415806105405750600160a060020a03331660009081526001602052604090206002015481115b1561054b5760006000fd5b604051600160a060020a0333169082156108fc029083906000818181858888f19350505050151561057c5760006000fd5b604080518281529051600160a060020a03331691600080516020610d81833981519152919081900360200190a2600160a060020a0333166000908152600160205260409020600201546105cf9082610c86565b600160a060020a0333166000908152600160205260409020600201555b5b50565b6000805433600160a060020a0390811691161461060d5760006000fd5b600054600160a060020a03838116911614156106295760006000fd5b600160a060020a038216600081815260016020908152604091829020805460ff19169055815160c260020a67191a5cd8589b19590281529151600080516020610d618339815191529281900390910190a25b5b919050565b600160a060020a03811660009081526001602052604090205460ff165b919050565b600160208190526000918252604090912080549181015460029091015460ff9092169183565b60005433600160a060020a039081169116146106e55760006000fd5b600160a060020a038116600081815260016020818152604092839020805460ff1916909217909155815160ca60020a66195b98589b19590281529151600080516020610d618339815191529281900390910190a25b5b50565b60008054819033600160a060020a0390811691161461075d5760006000fd5b600091505b600354600090810b810b9083900b12156108315750600081810b810b815260026020818152604080842054600160a060020a03168085526001909252832090910154909190111561082457600160a060020a03811660008181526001602052604080822060020154905181156108fc0292818181858888f193505050501561082457600160a060020a0381166000818152600160209081526040918290206002015482519081529151600080516020610d818339815191529281900390910190a25b5b5b600190910190610762565b604051600160a060020a033016907f3ab1d7915d663a46c292b8f01ac13567c748cff5213cb3652695882b5f9b2e0f90600090a2600054600160a060020a0316ff5b5b5050565b600160a060020a033316600090815260016020819052604082205460ff161515146108a35760006000fd5b50600160a060020a0381166000908152600160205260409020600201545b5b919050565b6000805433600160a060020a039081169116146108e45760006000fd5b600160a060020a03821660009081526001602081905260409091205460ff161514156109105760006000fd5b60008054604051600160a060020a03808616939216917fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c91a360008054600160a060020a031916600160a060020a0384161790555b5b919050565b600054600160a060020a031681565b60005433600160a060020a039081169116146109965760006000fd5b600160a060020a038316600090815260016020526040902060020154819010156109c05760006000fd5b600160a060020a0383166000908152600160205260409020600201546109e69082610c86565b600160a060020a038085166000908152600160205260408082206002908101949094559185168152200154610a1b9082610c9a565b600160a060020a0380841660008181526001602090815260409182902060020194909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35b5b505050565b600160a060020a033316600090815260016020819052604082205460ff16151514610aa75760006000fd5b50600160a060020a038116600090815260016020819052604090912001545b5b919050565b600080808080341515610adf5760006000fd5b349350610aea610cae565b92508284811515610af757fe5b049150600094505b600354600090810b810b9086900b1215610bf057600085810b810b815260026020908152604080832054600160a060020a031683526001918290529091205460ff1615151415610be457600085810b810b815260026020908152604080832054600160a060020a031683526001918290529091200154610b80908390610d4c565b600086810b810b815260026020818152604080842054600160a060020a0316845260019091529091200154909150610bb89082610c9a565b600086810b810b815260026020818152604080842054600160a060020a03168452600190915290912001555b5b600190940193610aff565b604080513481529051600160a060020a033316917f0e04c8e83a5595ba6381972e5e9fe2926bb0a7439dace880c83ccc34b99c5477919081900360200190a25b5050505050565b600160a060020a033316600090815260016020819052604082205460ff161515146108a35760006000fd5b50600160a060020a0381166000908152600160205260409020600201545b5b919050565b8082038281111561042857fe5b5b92915050565b8082018281101561042857fe5b5b92915050565b600080805b600354600090810b810b9083900b1215610d4357600082810b810b815260026020908152604080832054600160a060020a031683526001918290529091205460ff1615151415610d3757600082810b810b815260026020908152604080832054600160a060020a031683526001918290529091200154610d34908290610c9a565b90505b5b600190910190610cb3565b8092505b505090565b8082028281101561042857fe5b5b929150505600e1756b42353ce13c29a189505892beff801cf050bb62887d6191c4c64895b9f67fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65a165627a7a72305820728d8a8d52ec1afef68117e1c7859b31d137058a8d209b0d96a990905bef31f40029",
	"networks": {
		"1493290026603": {
			"events": {
				"0x0e04c8e83a5595ba6381972e5e9fe2926bb0a7439dace880c83ccc34b99c5477": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "donator",
							"type": "address"
						},
						{
							"indexed": false,
							"name": "amt",
							"type": "uint256"
						}
					],
					"name": "NewDonation",
					"type": "event"
				},
				"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "from",
							"type": "address"
						},
						{
							"indexed": true,
							"name": "to",
							"type": "address"
						},
						{
							"indexed": false,
							"name": "amt",
							"type": "uint256"
						}
					],
					"name": "Transfer",
					"type": "event"
				},
				"0xe1756b42353ce13c29a189505892beff801cf050bb62887d6191c4c64895b9f6": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "payee",
							"type": "address"
						},
						{
							"indexed": false,
							"name": "action",
							"type": "bytes32"
						}
					],
					"name": "PayeeAction",
					"type": "event"
				},
				"0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "payee",
							"type": "address"
						},
						{
							"indexed": false,
							"name": "amt",
							"type": "uint256"
						}
					],
					"name": "Withdrawal",
					"type": "event"
				},
				"0xb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "owner",
							"type": "address"
						},
						{
							"indexed": true,
							"name": "newOwner",
							"type": "address"
						}
					],
					"name": "OwnerChanged",
					"type": "event"
				},
				"0x3ab1d7915d663a46c292b8f01ac13567c748cff5213cb3652695882b5f9b2e0f": {
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"name": "contractAddress",
							"type": "address"
						}
					],
					"name": "ContractDestroyed",
					"type": "event"
				}
			},
			"links": {},
			"address": "0xcd258681769408224828fa7fecbde878eea3248a",
			"updated_at": 1493290038774
		}
	},
	"schema_version": "0.0.5",
	"updated_at": 1496754351145
};

/***/ })
/******/ ]);