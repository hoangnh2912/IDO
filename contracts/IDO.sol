// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract IDOModifier {
    mapping(uint256 => IDO) internal _ido;
    modifier expired(uint256 endTime) {
        require(block.timestamp < endTime, "IDO is expired");
        _;
    }

    modifier balanceCheck(address _token, uint256 _value) {
        require(IERC20(_token).balanceOf(msg.sender) >= _value);
        _;
    }

    modifier supplyCheck(uint256 _id, uint256 _value) {
        require(_ido[_id].idoSupply >= _value);
        require(_ido[_id].tokenSupply >= _value);
        _;
    }

    modifier valueCheck(uint256 _value) {
        require(_value > 0);
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

    function addIDO(
        address tokenCurrency,
        address idoCurrency,
        uint256 tokenSupply,
        uint256 idoSupply,
        string memory idoMetadata,
        uint256 endTime
    )
        public
        expired(endTime)
        balanceCheck(idoCurrency, idoSupply)
        valueCheck(tokenSupply)
        valueCheck(idoSupply)
    {
        IDO memory newIDO = IDO(
            msg.sender,
            tokenCurrency,
            idoCurrency,
            tokenSupply,
            idoSupply,
            idoMetadata,
            endTime
        );
        IERC20(idoCurrency).transferFrom(msg.sender, address(this), idoSupply);
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

    function buyIDO(uint256 _id, uint256 _valueToken)
        public
        expired(_ido[_id].endTime)
        balanceCheck(_ido[_id].tokenCurrency, _valueToken)
        valueCheck(_valueToken)
    {
        IERC20(_ido[_id].tokenCurrency).transferFrom(
            msg.sender,
            _ido[_id].owner,
            _valueToken
        );
        uint256 valueIDO = (_ido[_id].idoSupply / _ido[_id].tokenSupply) *
            _valueToken;
        IERC20(_ido[_id].idoCurrency).transfer(msg.sender, valueIDO);
    }

    function claimIDOTokenAfterEnd(uint256 _id) public {
        IDO memory ido = _ido[_id];
        require(ido.owner == msg.sender, "Must be owner of IDO");
        require(block.timestamp > ido.endTime, "IDO must be expired");
        IERC20(_ido[_id].idoCurrency).transfer(
            _ido[_id].owner,
            IERC20(_ido[_id].idoCurrency).balanceOf(address(this))
        );
    }
}
// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// 1759374231
