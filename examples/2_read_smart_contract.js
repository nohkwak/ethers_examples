const { ethers } = require("ethers");
const fs = require('fs')

const provider = new ethers.providers.JsonRpcProvider("https://api.baobab.klaytn.net:8651")

const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const TOKEN_ABI = JSON.parse(fs.readFileSync('./contracts/ServiceChainToken.abi', 'utf8'));

const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)

const main = async () => {
    const name = await contract.NAME()
    const symbol = await contract.SYMBOL()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${TOKEN_ADDRESS}`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}`)

    const balance = await contract.balanceOf('0x3208ca99480f82bfe240ca6bc06110cd12bb6366')

    console.log(`Balance Returned: ${balance}`)
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

main()