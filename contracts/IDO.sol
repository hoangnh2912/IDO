// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

abstract contract IDOModifier {
    modifier expired(uint256 endTime) {
        require(block.timestamp < endTime, "IDO is expired");
        _;
    }

    modifier balanceCheck(address _token, uint256 _value) {
        require(IERC20(_token).balanceOf(msg.sender) >= _value);
        _;
    }
}

struct IDO {
    address owner;
    address tokenCurrency;
    address idoCurrency;
    uint256 tokenSupply;
    uint256 idoSupply;
    string idoMetadata;
    uint256 endTime;
}

contract IDOContract is IDOModifier {
    uint256 private _totalIDO;
    mapping(uint256 => IDO) private _ido;

    function addIDO(
        address tokenCurrency,
        address idoCurrency,
        uint256 tokenSupply,
        uint256 idoSupply,
        string memory idoMetadata,
        uint256 endTime
    ) public expired(endTime) balanceCheck(idoCurrency, idoSupply) {
        IDO memory newIDO = IDO(
            msg.sender,
            tokenCurrency,
            idoCurrency,
            tokenSupply,
            idoSupply,
            idoMetadata,
            endTime
        );
        _ido[++_totalIDO] = newIDO;
    }

    function isIDOEnded(uint256 _id) public view returns (bool) {
        return block.timestamp >= _ido[_id].endTime;
    }

    function getIDO(uint256 _id) public view returns (IDO memory) {
        return _ido[_id];
    }

    function getTotalIDO() public view returns (uint256) {
        return _totalIDO;
    }

    function buyIDO(uint256 _id, uint256 _value)
        public
        expired(_ido[_id].endTime)
        balanceCheck(_ido[_id].tokenCurrency, _value)
    {
        IERC20(_ido[_id].tokenCurrency).transfer(msg.sender, _value);
        IERC20(_ido[_id].idoCurrency).transfer(
            _ido[_id].owner,
            _ido[_id].idoSupply
        );
    }
}
// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// 1759374231
