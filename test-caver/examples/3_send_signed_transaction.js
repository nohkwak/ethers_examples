const fs = require('fs')
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey1 = fs.readFileSync('../privateKey', 'utf8') // Private key of sender 

const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 


const main = async () => {

    const keyring = new caver.wallet.keyring.singleKeyring(account1, privateKey1);
    console.log( keyring );

    await caver.wallet.add( keyring );

    console.log(`\nSender balance before: `)
    await caver.rpc.klay.getBalance(account1).then( console.log );
    console.log(`reciever balance before: `)
    await caver.rpc.klay.getBalance(account2).then( console.log );

    // const tx = await caver.transaction.legacyTransaction.create({
    //     from: account1,
    //     to: account2,
    //     value: 1000,
    //     gas: 25000
    // });
    // console.log( tx )

    const tx = caver.transaction.valueTransfer.create({
        from: account1,
        to: account2,
        value: 1000,
        gas: 25000
    });
    console.log( tx )

    const signed = await caver.wallet.sign(account1, tx)
    console.log( signed )

    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log( receipt )

    // 
    // not working
    // 
    // await caver.rpc.klay.sendTransaction(tx)
    // .on('receipt', r => {
    //     console.log(r)
    // }).on('error', console.error); 


    console.log(`\nSender balance after: `)
    await caver.rpc.klay.getBalance(account1).then( console.log );
    console.log(`reciever balance after: `)
    await caver.rpc.klay.getBalance(account2).then( console.log );
}

main()