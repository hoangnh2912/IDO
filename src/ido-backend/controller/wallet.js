const { onError, onSuccess } = require("../utils/utils");
const { web3, wETHContract } = require("../utils/web3");

module.exports = {
  getBalance: async (req, res) => {
    try {
      const { address } = req.query;
      const blETH = await web3.eth.getBalance(address);
      const blWETH = await wETHContract.methods.balanceOf(address).call();
      res.json(
        onSuccess({
          eth: blETH,
          weth: blWETH,
        })
      );
    } catch (error) {
      res.json(onError(error));
    }
  },
};
