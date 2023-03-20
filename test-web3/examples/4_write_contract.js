const Web3 = require("web3");
const fs = require('fs')

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey1 = '' // Private key of sender 

const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 

const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const TOKEN_ABI = JSON.parse(fs.readFileSync('../contracts/ServiceChainToken.abi', 'utf8'));

const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)


const main = async () => {

    await web3.eth.accounts.wallet.add( {
        privateKey: privateKey1,
        address: account1
    });

    console.log(`\nReading from contract ${TOKEN_ADDRESS}\n`)

    await contract.methods.balanceOf(account1).call( function(error, result){
        console.log(`Sender balance before: ${result}`)
    });
    await contract.methods.balanceOf(account2).call( function(error, result){
        console.log(`reciever balance before: ${result}`)
    });

    await contract.methods.transfer(account2, 100).send({from: account1, gas: 25000000})
    .on('receipt', function(receipt){
        console.log(receipt)
    }).on('error', console.error); 

    await contract.methods.balanceOf(account1).call( function(error, result){
        console.log(`Sender balance after: ${result}`)
    });
    await contract.methods.balanceOf(account2).call( function(error, result){
        console.log(`reciever balance after: ${result}`)
    });
}

main()