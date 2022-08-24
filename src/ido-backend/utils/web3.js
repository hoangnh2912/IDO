const Web3 = require("web3");
const { RPC_URL, CONFIG } = require("./constant");

const web3 = new Web3(RPC_URL);

const USDTContract = new web3.eth.Contract(
  CONFIG.USDT.abi,
  CONFIG.USDT.address
);

const DOGEContract = new web3.eth.Contract(
  CONFIG.DOGE.abi,
  CONFIG.DOGE.address
);

const PoolContract = new web3.eth.Contract(
  CONFIG.Pool.abi,
  CONFIG.Pool.address
);

module.exports = {
  web3,
  USDTContract,
  PoolContract,
  DOGEContract,
};
