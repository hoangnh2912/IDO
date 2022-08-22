module.exports = {
  PORT: 8001,
  WS_PORT: 8002,
  PATH_UPLOAD_MEDIA: "./uploads/media/",
  PATH_UPLOAD_JSON: "./uploads/json/",
  MAX_FILE_UPLOAD: 5,
  RPC_URL: "http://127.0.0.1:7545",
  // RPC_URL: "https://rinkeby.infura.io/v3/afa9553623db44b388348836b654f819",
  CONFIG: require("./config.json"),
  LIST_IDO_TYPE: {
    INCLUDE: 0,
    EXCLUDE: 1,
  },
};
