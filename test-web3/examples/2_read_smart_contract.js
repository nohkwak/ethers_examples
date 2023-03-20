const Web3 = require("web3");
const fs = require('fs')

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const TOKEN_ABI = JSON.parse(fs.readFileSync('../contracts/ServiceChainToken.abi', 'utf8'));
const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)

const main = async () => {

    console.log(`\nReading from ${TOKEN_ADDRESS}`)

    await contract.methods.NAME().call( function(error, result){
        console.log(`Name: ${result}`)
    });
    await contract.methods.SYMBOL().call( function(error, result){
        console.log(`Symbol: ${result}`)
    });
    await contract.methods.totalSupply().call( function(error, result){
        console.log(`Total Supply: ${result}`)
    });
    await contract.methods.balanceOf('0x3208ca99480f82bfe240ca6bc06110cd12bb6366').call( function(error, result){
        console.log(`Balance Returned: ${result}`)
    });
}

main()