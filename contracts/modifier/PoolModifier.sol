// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract PoolModifier {
    modifier expired(uint256 endTime) {
        require(block.timestamp < endTime, "IDO is expired");
        _;
    }

    modifier balanceCheck(address _token, uint256 _value) {
        require(IERC20(_token).balanceOf(msg.sender) >= _value);
        _;
    }

    modifier greaterThanZero(uint256 _value) {
        require(_value > 0);
        _;
    }

    modifier onlyOwner(address _owner) {
        require(msg.sender == _owner);
        _;
    }
}
