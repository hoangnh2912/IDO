const { onError, onSuccess } = require("../utils/utils");
const { web3, USDTContract, DOGEContract } = require("../utils/web3");

module.exports = {
  getBalance: async (req, res) => {
    try {
      const { address } = req.query;
      const blETH = await web3.eth.getBalance(address);
      const blUSDT = await USDTContract.methods.balanceOf(address).call();
      const blDOGE = await DOGEContract.methods.balanceOf(address).call();
      res.json(
        onSuccess({
          eth: blETH,
          usdt: blUSDT,
          doge: blDOGE,
        })
      );
    } catch (error) {
      res.json(onError(error));
    }
  },
};
