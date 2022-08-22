const Web3 = require("web3");
const { RPC_URL, CONFIG } = require("./constant");

const web3 = new Web3(RPC_URL);

const USDTContract = new web3.eth.Contract(
  CONFIG.USDT.abi,
  CONFIG.USDT.address
);

const PoolContract = new web3.eth.Contract(
  CONFIG.Pool.abi,
  CONFIG.Pool.address
);

module.exports = {
  web3,
  USDTContract,
  PoolContract,
};
