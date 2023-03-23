const fs = require('fs')

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')


const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey1 = fs.readFileSync('../privateKey', 'utf8') // Private key of sender 

const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 


async function main() {
	const sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const feeDelegatedTx = caver.transaction.feeDelegatedValueTransfer.create({
		from: sender.address,
		to: '0xc40b6909eb7085590e1c26cb3becc25368e249e9',
		value: 5,
		gas: 50000,
	})

	await caver.wallet.sign(sender.address, feeDelegatedTx)

	const rlpEncoded = feeDelegatedTx.getRLPEncoding()
	console.log(rlpEncoded)

	feePay( rlpEncoded )
}


async function feePay( _rlpEncoded ) {
	const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(feePayer)

	const rlpEncoded = _rlpEncoded

	const feeDelegateTxFromRLPEncoding = caver.transaction.feeDelegatedValueTransfer.create(rlpEncoded)

	// Set the fee payer address.
	feeDelegateTxFromRLPEncoding.feePayer = feePayer.address
	await caver.wallet.signAsFeePayer(feePayer.address, feeDelegateTxFromRLPEncoding)
	console.log(feeDelegateTxFromRLPEncoding.getRLPEncoding())

	const receipt = await caver.rpc.klay.sendRawTransaction(feeDelegateTxFromRLPEncoding.getRLPEncoding())
	console.log(receipt)
}

main()