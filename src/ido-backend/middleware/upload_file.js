const multer = require("multer");
const { MAX_FILE_UPLOAD, PATH_UPLOAD_MEDIA } = require("../utils/constant");
const fs = require("fs");
const { keccak256 } = require("js-sha3");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathSave = `${PATH_UPLOAD_MEDIA}`;
    if (!fs.existsSync(pathSave)) fs.mkdirSync(pathSave, { recursive: true });
    cb(null, pathSave);
  },
  filename: function (req, file, cb) {
    let endFile = file.mimetype.split("/")[1];
    cb(
      null,
      `${keccak256(`${file.filename + endFile + Date.now()}`)}.${endFile}`
    );
  },
});
const upload = multer({ storage: storage });
const upload_file_array = (field) => upload.array(field, MAX_FILE_UPLOAD);
const upload_file_fields = (fields = []) =>
  upload.fields(
    fields.map((e) => ({
      name: e,
      maxCount: MAX_FILE_UPLOAD,
    }))
  );
module.exports = {
  upload_file_array,
  upload_file_fields,
};
