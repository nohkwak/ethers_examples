const fs = require('fs')

const Caver = require('caver-js');
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const sender = '0x3208ca99480f82bfe240ca6bc06110cd12bb6366' // sender address 
const privateKey = fs.readFileSync('../../privateKey', 'utf8') // Private key of sender 

  
const tokenAbi = JSON.parse(fs.readFileSync('../../contracts/ERC20/HelloToken.abi', 'utf8'));
const tokenCode = fs.readFileSync('../../contracts/ERC20/HelloToken.bin', 'utf8');


const main = async () => {

  const keyring = new caver.wallet.keyring.singleKeyring(sender, privateKey);
  await caver.wallet.add( keyring );

  try {
      // const instance = new caver.contract(tokenAbi);
      // console.log( instance.options.jsonInterface )

      // instance.deploy({
      //   from: sender, 
      //   gas: 250000000,
      // }, `0x${tokenCode}`)
      // .on('error', function(error) { 
      //   console.log(error)
      // })
      // .on('transactionHash', function(transactionHash) { 
      //   console.log(transactionHash)
      // })
      // .on('receipt', function(receipt) {
      //   console.log(receipt.contractAddress) 
      //  })
      // .then(function(newContractInstance) {
      //   contractAddress = newContractInstance.options.address
      //   console.log( contractAddress ) 
      // })

      const instance = new caver.klay.Contract(tokenAbi);
      const newInstance = await instance.deploy({data: tokenCode, arguments:[]})
          .send({ from: sender, gas: 250000000, value: 0 });
      console.log(`contract address: ${newInstance._address}`);

      // const contract = new caver.contract(tokenAbi, newInstance._address)
      // await contract.methods.NAME().call( function(error, result){
      //   console.log(`NAME: ${result}`)
      // });
  } catch (e) {
      console.log("Error:", e);
  }
}

main()