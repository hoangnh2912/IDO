const express = require("express");
const router = express.Router();
const { GetListIDO } = require("../controller/ido");

router.get("/get-list-ido", GetListIDO);
module.exports = router;
