const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://api.baobab.klaytn.net:8651")

const address = "0x3208ca99480f82bfe240ca6bc06110cd12bb6366"

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nKlaytn Balance of ${address} : ${balance}`)
}

main()
