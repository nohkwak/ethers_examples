const fs = require('fs')

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const TOKEN_ABI = JSON.parse(fs.readFileSync('../contracts/ServiceChainToken.abi', 'utf8'));
const TOKEN_ADDRESS = '0xaa0A40391Df2eD1bd2A3FE3b9AC869619Cc4eD8e' 

const contract = new caver.contract(TOKEN_ABI, TOKEN_ADDRESS)

const main = async () => {
    const block = await caver.rpc.klay.getBlockNumber()

    await caver.rpc.klay.getLogs({
        fromBlock: block-30000,
        toBlock: block,
        address: TOKEN_ADDRESS
    }).then(console.log)
}

main()