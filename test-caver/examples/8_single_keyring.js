const fs = require('fs')

const Caver = require('caver-js')
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey1 = fs.readFileSync('../privateKey', 'utf8') // Private key of sender 

const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 


const main = async () => {
	
	// // Generate new keyring
	// const keyring = caver.wallet.keyring.generate()
	// caver.wallet.add(keyring)

	// Add a keyring to caver.wallet with an address and a private key
	const keyring = caver.wallet.newKeyring(account1, privateKey1)

	const tx = caver.transaction.valueTransfer.create({
			from: keyring.address,
			to: account2,
			value: 1000,
			gas: 25000,
	});

	caver.wallet.sign(keyring.address, tx ).then(signed => {
		caver.rpc.klay.sendRawTransaction(signed).then(console.log)
	});

}

main()