const { LIST_IDO_TYPE, CONFIG } = require("../utils/constant");
const { onError, onSuccess, onSuccessArray } = require("../utils/utils");
const { PoolContract } = require("../utils/web3");
const fetch = require("node-fetch");

module.exports = {
  GetListIDO: async (req, res) => {
    try {
      const { address, type = LIST_IDO_TYPE.INCLUDE } = req.query;
      const totalIdo = await PoolContract.methods.getTotalIDO().call();
      let listIDO = [];
      for (let i = 1; i <= parseInt(totalIdo); i++) {
        const ido = await PoolContract.methods.getIDO(i).call();
        const owner_of = ido.owner.toLowerCase();
        if (type == LIST_IDO_TYPE.EXCLUDE && owner_of == address.toLowerCase())
          continue;
        if (type == LIST_IDO_TYPE.INCLUDE && owner_of != address.toLowerCase())
          continue;
        let metadata = {};
        try {
          const uri = ido.idoMetadata;
          metadata = await (
            await fetch(
              `http://${req.headers.host}/api/storage/read?key=${uri}`
            )
          ).json();
        } catch (error) {}
        listIDO.push({
          owner_of,
          token_address: CONFIG.Estate.address,
          token_id: i,
          metadata,
        });
      }
      res.json(onSuccessArray(listIDO));
    } catch (error) {
      res.json(onError(error));
    }
  },
};
