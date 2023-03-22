const Caver = require("caver-js");

// const caver = new Caver("https://api.baobab.klaytn.net:8651")
const caver = new Caver("http://localhost:8551")

const main = async () => {

    const block = await caver.rpc.klay.getBlockNumber();
    console.log(`\n${block}`)

    console.log(`\ngovernance.getItemsAt`)
    await caver.rpc.governance.getItemsAt('latest').then( console.log );
    await caver.rpc.governance.getItemsAt().then( console.log );

    console.log(`\ngovernance.getParams`)
    await caver.rpc.governance.getParams('latest').then( console.log );
    await caver.rpc.governance.getParams().then( console.log );
    
    console.log(`\ngovernance.getChainConfigAt`)
    await caver.rpc.governance.getChainConfigAt(block).then( console.log );

    console.log(`\ngovernance.getChainConfig`)
    await caver.rpc.governance.getChainConfig('latest').then( console.log );
    // await caver.rpc.governance.getChainConfig().then( console.log );

    console.log(`\nklay.getGovParamsAt`)
    await caver.rpc.klay.getGovParamsAt('latest').then( console.log );
    await caver.rpc.klay.getGovParamsAt().then( console.log );

    console.log(`\nklay.getParams`)
    await caver.rpc.klay.getParams('latest').then( console.log );
    await caver.rpc.klay.getParams().then( console.log );
 
    console.log(`\nklay.getChainConfigAt`)
    await caver.rpc.klay.getChainConfigAt(block).then( console.log );

    console.log(`\nklay.getChainConfig`)
    await caver.rpc.klay.getChainConfig('latest').then( console.log );
    // await caver.rpc.klay.getChainConfig().then( console.log );   

    console.log(`\nklay.getGasPriceAt`)
    await caver.rpc.klay.getGasPriceAt(block).then( console.log );

    console.log(`\nklay.getGasPrice`)
    await caver.rpc.klay.getGasPrice().then( console.log );
}

main()
