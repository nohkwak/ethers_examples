const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651')

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)

    for ( int i=0 ; i<transactions.length ; i++ )
        console.log(transactions[i])
}

main()