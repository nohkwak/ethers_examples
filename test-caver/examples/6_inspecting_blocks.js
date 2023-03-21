const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const main = async () => {
    const block = await caver.rpc.klay.getBlockNumber();

    console.log(`\nBlock Number: ${block}\n`)

    await caver.rpc.klay.getBlock('latest').then(console.log);

    // // not working
    // await caver.rpc.klay.getBlock(block).then(console.log);

    console.log(`\nFirst transaction in block:\n`)

    await caver.rpc.klay.getTransactionFromBlock('latest', 0).then(console.log); 
    
    // // not working
    // await caver.rpc.klay.getTransactionFromBlock(block, 0).then(console.log); 
}

main()