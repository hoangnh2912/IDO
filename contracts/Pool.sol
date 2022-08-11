// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./struct/IDO.sol";
import "./modifier/PoolModifier.sol";

contract Pool is PoolModifier {
    uint256 private _totalIdo;
    mapping(uint256 => IDO) private _ido;
    mapping(uint256 => uint256) private _rateTokenToIdo;

    constructor() {}

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
        greaterThanZero(tokenSupply)
        greaterThanZero(idoSupply)
    {
        IERC20(idoCurrency).transferFrom(msg.sender, address(this), idoSupply);

        IDO memory newIDO = IDO(
            msg.sender,
            tokenCurrency,
            idoCurrency,
            tokenSupply,
            idoSupply,
            idoMetadata,
            endTime
        );

        uint256 idoID = ++_totalIdo;
        _rateTokenToIdo[idoID] = idoSupply / tokenSupply;
        _ido[idoID] = newIDO;
    }

    function buyIDO(uint256 _id, uint256 _amountToken)
        public
        expired(_ido[_id].endTime)
        balanceCheck(_ido[_id].tokenCurrency, _amountToken)
        greaterThanZero(_amountToken)
    {
        IERC20(_ido[_id].tokenCurrency).transferFrom(
            msg.sender,
            address(this),
            _amountToken
        );
        IERC20(_ido[_id].idoCurrency).transfer(
            msg.sender,
            _amountToken * _rateTokenToIdo[_id]
        );
    }

    function claimLeftIdo(uint256 _id) public onlyOwner(_ido[_id].owner) {
        require(isIDOEnded(_id), "IDO is not ended");
        IERC20 idoERC20 = IERC20(_ido[_id].idoCurrency);
        idoERC20.transfer(_ido[_id].owner, idoERC20.balanceOf(address(this)));
    }

    function isIDOEnded(uint256 _id) public view returns (bool) {
        return block.timestamp >= _ido[_id].endTime;
    }

    function getIDO(uint256 _id) public view returns (IDO memory) {
        return _ido[_id];
    }

    function getTotalIDO() public view returns (uint256) {
        return _totalIdo;
    }
}
// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// 1759374231
