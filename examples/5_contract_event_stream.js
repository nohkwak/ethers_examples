const { ethers } = require("ethers");
const fs = require('fs')

const provider = new ethers.providers.JsonRpcProvider("https://api.baobab.klaytn.net:8651")

const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const TOKEN_ABI = JSON.parse(fs.readFileSync('./contracts/ServiceChainToken.abi', 'utf8'));

const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()

    const transferEvents = await contract.queryFilter('Transfer', 0, block)
    console.log(transferEvents)
}

main()