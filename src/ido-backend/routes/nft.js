const express = require("express");
const router = express.Router();
const { GetListNFT } = require("../controller/nft");

router.get("/get-list-nft", GetListNFT);
module.exports = router;
