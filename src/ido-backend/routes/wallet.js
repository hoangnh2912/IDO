const express = require("express");
const router = express.Router();
const { getBalance } = require("../controller/wallet");

router.get("/get-balance", getBalance);

module.exports = router;
