const Web3 = require("web3");

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const main = async () => {
    const block = await web3.eth.getBlockNumber();

    console.log(`\nBlock Number: ${block}\n`)

    await web3.eth.getBlock(block).then(console.log);

    console.log(`\nFirst transaction in block:\n`)

    await web3.eth.getTransactionFromBlock(block, 0).then(console.log); 
}

main()