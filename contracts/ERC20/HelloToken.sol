// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "./ERC20.sol";

contract HelloToken is ERC20{

    string public constant NAME = "HelloToken";
    string public constant SYMBOL = "HLT";
    uint8 public constant DECIMALS = 18;

    constructor() ERC20() {
        _mint(msg.sender,1000*10**18);
    }
}