const express = require("express");
const router = express.Router();
const { UploadJSON, UploadImage, Read } = require("../controller/storage");
const { upload_file_array } = require("../middleware/upload_file");

router.post("/upload-json", UploadJSON);
router.post("/upload-image", upload_file_array("image"), UploadImage);
router.get("/read", Read);
module.exports = router;
