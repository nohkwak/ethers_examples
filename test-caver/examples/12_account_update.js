const fs = require('fs')

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

const oldPrivateKey = fs.readFileSync('../oldPrivateKey', 'utf8') // Private key of sender 

async function main() {
	console.log(`old private key string: ${oldPrivateKey}`)
	let sender = caver.wallet.keyring.createFromPrivateKey(oldPrivateKey)
	caver.wallet.add(sender)

	const newPrivateKey = caver.wallet.keyring.generateSingleKey()
	console.log(`new private key string: ${newPrivateKey}`)
	const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

	// create an Account instance
	const account = newKeyring.toAccount()

	const updateTx = caver.transaction.accountUpdate.create({
		from: sender.address,
		account: account,
		gas: 50000,
	})
	await caver.wallet.sign(sender.address, updateTx)
	const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
	console.log(receipt)

	// result 
	// {
	//   blockHash: '0x39a9c8cf53efe32b7aeba09bd4b059a6670fe66577e726523ffb5ad537cbf2f0',
	//   blockNumber: '0x708158a',
	//   contractAddress: null,
	//   effectiveGasPrice: '0x5d21dba00',
	//   from: '0x9003df2d076784a5d82dd73bab226ccaf5744314',
	//   gas: '0xc350',
	//   gasPrice: '0xba43b7400',
	//   gasUsed: '0xa028',
	//   key: '0x02a1032abde0a93fc59d16e593b98586a22980582b83dfa9b19d39935791426dee6726',
	//   logs: [],
	//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	//   nonce: '0x0',
	//   senderTxHash: '0xbec1089ff074f70243d40dfdc55813cb47d9558703f7c1f2d7240067703f4833',
	//   signatures: [
	//     {
	//       V: '0x7f5',
	//       R: '0xd9f43cb043d08a0ec7d452769a059246206cfc0ef20dab971be68e578562f91a',
	//       S: '0x6e43e5881b2cc0fd11e90e6d7d59c11aef7b4db60dbcce0fb498ef93c18daf5e'
	//     }
	//   ],
	//   status: '0x1',
	//   transactionHash: '0xbec1089ff074f70243d40dfdc55813cb47d9558703f7c1f2d7240067703f4833',
	//   transactionIndex: '0x1',
	//   type: 'TxTypeAccountUpdate',
	//   typeInt: 32
	// }


	// Update the keyring in caver.wallet for signing afterward.
	sender = caver.wallet.updateKeyring(newKeyring)
}

main()


