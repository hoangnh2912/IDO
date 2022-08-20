const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const walletRouter = require("./routes/wallet");
const nftRouter = require("./routes/nft");
const storageRouter = require("./routes/storage");
const cors = require("cors");
const { PORT } = require("./utils/constant");
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

const logger = require("./utils/logger");
const mainRouter = express.Router();
const loggerAuth = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

mainRouter.use("/wallet", walletRouter);
mainRouter.use("/nft", nftRouter);
mainRouter.use("/storage", storageRouter);
app.use("/api", loggerAuth, mainRouter);

console.log("Server start at " + new Date().toUTCString(), "PORT", PORT);
app.listen(PORT);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
