const { onError, onSuccess } = require("../utils/utils");
const path = require("path");
const { writeFileSync, readFileSync, mkdirSync, existsSync } = require("fs");
const { keccak256 } = require("js-sha3");
const { PATH_UPLOAD_JSON } = require("../utils/constant");
module.exports = {
  UploadJSON: async (req, res) => {
    try {
      const json = req.body;
      if (!existsSync(PATH_UPLOAD_JSON))
        mkdirSync(PATH_UPLOAD_JSON, { recursive: true });
      const jsonPath = `${PATH_UPLOAD_JSON}${keccak256(
        JSON.stringify(json) + Date.now()
      )}.json`;
      writeFileSync(jsonPath, JSON.stringify(json));
      res.json(onSuccess(jsonPath.replace("./uploads/", "")));
    } catch (err) {
      res.json(onError(err));
    }
  },
  UploadImage: async (req, res) => {
    try {
      const image = req.files[0];
      res.json(onSuccess(image.path.replace("uploads/", "")));
    } catch (err) {
      res.json(onError(err));
    }
  },
  Read: async (req, res) => {
    try {
      const { key } = req.query;
      const data = readFileSync(path.join(__dirname, "../uploads", key));
      try {
        res.json(JSON.parse(data));
      } catch (errorParse) {
        let img = Buffer.from(data);
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length,
        });
        res.end(img);
      }
    } catch (err) {
      res.json(onError(err));
    }
  },
};
