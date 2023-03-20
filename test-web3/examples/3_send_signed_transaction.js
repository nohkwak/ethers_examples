const Web3 = require("web3");

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const account1 = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey1 = '' // Private key of sender 

const account2 = '0xc40b6909eb7085590e1c26cb3becc25368e249e9' // reciever address 


const main = async () => {

    await web3.eth.accounts.wallet.add( {
                privateKey: privateKey1,
                address: account1
            });

    console.log(`\nSender balance before: `)
    await web3.eth.getBalance(account1).then( console.log );
    console.log(`reciever balance before: `)
    await web3.eth.getBalance(account2).then( console.log );

    await web3.eth.sendTransaction({
        from: account1,
        to: account2,
        value: 1000,
        gas: 21000
    }).on('receipt', function(receipt){
        console.log( receipt )
    }).on('error', console.error); 

    console.log(`\nSender balance after: `)
    await web3.eth.getBalance(account1).then( console.log );
    console.log(`reciever balance after: `)
    await web3.eth.getBalance(account2).then( console.log );
}

main()