// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BaseERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 total
    ) ERC20(name, symbol) {
        _mint(tx.origin, total);
    }
}

contract CreateERC20 {
    constructor() {}

    event create(address indexed erc20Address);

    function createERC20(
        string memory name,
        string memory symbol,
        uint256 total
    ) public {
        emit create(address(new BaseERC20(name, symbol, total)));
    }
}
