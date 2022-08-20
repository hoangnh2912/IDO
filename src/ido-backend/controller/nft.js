const { LIST_NFT_TYPE, CONFIG } = require("../utils/constant");
const { onError, onSuccess, onSuccessArray } = require("../utils/utils");
const { realEstateContract, marketContract } = require("../utils/web3");
const fetch = require("node-fetch");

module.exports = {
  GetListNFT: async (req, res) => {
    try {
      const { address, type = LIST_NFT_TYPE.INCLUDE } = req.query;
      const totalNFT = await realEstateContract.methods.totalSupply().call();
      let listNFT = [];
      for (let i = 1; i <= parseInt(totalNFT); i++) {
        const owner_of = (
          await realEstateContract.methods.ownerOf(i).call()
        ).toLowerCase();
        if (type == LIST_NFT_TYPE.EXCLUDE && owner_of == address.toLowerCase())
          continue;
        if (type == LIST_NFT_TYPE.INCLUDE && owner_of != address.toLowerCase())
          continue;
        const price = await marketContract.methods.priceOfToken(i).call();
        const bider = await marketContract.methods.biderOfToken(i).call();
        let metadata = {};
        try {
          const uri = await realEstateContract.methods.tokenURI(i).call();
          metadata = await (
            await fetch(
              `http://${req.headers.host}/api/storage/read?key=${uri}`
            )
          ).json();
        } catch (error) {}
        listNFT.push({
          owner_of,
          token_address: CONFIG.Estate.address,
          token_id: i,
          metadata,
          price,
          bider: {
            address: bider[0],
            price: bider[1],
          },
        });
      }
      res.json(onSuccessArray(listNFT));
    } catch (error) {
      res.json(onError(error));
    }
  },
};
