const { ethers } = require("ethers");
const fs = require('fs')

const provider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651')

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 

const privateKey1 = '' // Private key of sender 
const wallet = new ethers.Wallet(privateKey1, provider)

const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e'

const TOKEN_ABI = JSON.parse(fs.readFileSync('./contracts/ServiceChainToken.abi', 'utf8'));

const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)

const main = async () => {
    const balance1 = await contract.balanceOf(account1)
    const balance2 = await contract.balanceOf(account2)

    console.log(`\nReading from ${TOKEN_ADDRESS}\n`)
    console.log(`Balance of sender: ${balance1}\n`)
    console.log(`Balance of reciever: ${balance2}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, 100)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()