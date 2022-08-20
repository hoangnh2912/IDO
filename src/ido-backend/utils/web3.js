const Web3 = require("web3");
const { RPC_URL, CONFIG } = require("./constant");

const web3 = new Web3(RPC_URL);

const wETHContract = new web3.eth.Contract(
  CONFIG.WrapETH.abi,
  CONFIG.WrapETH.address
);

const realEstateContract = new web3.eth.Contract(
  CONFIG.Estate.abi,
  CONFIG.Estate.address
);

const marketContract = new web3.eth.Contract(
  CONFIG.Market.abi,
  CONFIG.Market.address
);

module.exports = {
  web3,
  wETHContract,
  realEstateContract,
  marketContract,
};
