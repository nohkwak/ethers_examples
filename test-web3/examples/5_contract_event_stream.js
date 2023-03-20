const Web3 = require("web3");
const fs = require('fs')

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 

const TOKEN_ABI = JSON.parse(fs.readFileSync('../contracts/ServiceChainToken.abi', 'utf8'));
const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)


const main = async () => {

    await contract.getPastEvents('Transfer', {
        filter: {from: [account1]}, // Using an array means OR: e.g. account1 or account2
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ 
        console.log(events); 
    }).then(function(events){
        console.log(events) // same results as the optional callback above
    });

}

main()