const Web3 = require("web3");

const web3 = new Web3("https://api.baobab.klaytn.net:8651")

const address = "0x3208ca99480f82bfe240ca6bc06110cd12bb6366"

const main = async () => {
    web3.eth.getBalance(address).then(console.log)
}

main()
