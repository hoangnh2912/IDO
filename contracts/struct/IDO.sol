// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct IDO {
    address owner;
    address tokenCurrency;
    address idoCurrency;
    uint256 tokenSupply;
    uint256 idoSupply;
    string idoMetadata;
    uint256 endTime;
}
