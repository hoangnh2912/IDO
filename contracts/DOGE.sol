// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DOGE is ERC20, Ownable {
    constructor() ERC20("Dogecoin", "DOGE") {
        _mint(msg.sender, 20000000000000 ether);
    }
}
