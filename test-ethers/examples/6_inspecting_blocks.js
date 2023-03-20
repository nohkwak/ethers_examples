const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651')

const main = async () => {
    const block = await provider.getBlockNumber();

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block);

    console.log(blockInfo)

    const result = await provider.getBlockWithTransactions(block);

    console.log(`\nLogging first transaction in block:\n`)

    for ( var i=0 ; i<result.transactions.length ; i++ )
        console.log(result.transactions[i])
}

main()