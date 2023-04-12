https://docs.soliditylang.org/en/latest/installing-solidity.html

To use the Docker image to compile Solidity files on the host machine mount a local folder for input and output, and specify the contract to compile. 

docker run -v /local/path:/sources ethereum/solc:0.4.24 -o /sources/ --overwrite --abi --bin /sources/HelloToken.sol
