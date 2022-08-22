import CONFIG from "./config.json";

const NETWOKR = {
  chainId: 1337,
  chainName: "Ganache",
  currencyName: "ETH",
  currencySymbol: "ETH",
  // rpc: "https://rinkeby.infura.io/v3/afa9553623db44b388348836b654f819",
  rpc: "http://127.0.0.1:7545",
  rpcwss: "wss://rinkeby.infura.io/ws/v3/afa9553623db44b388348836b654f819",
};

const BASE_URL = "http://localhost:8001/api/";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

const LIST_NFT_TYPE = {
  INCLUDE: 0,
  EXCLUDE: 1,
};
export { NETWOKR, CONFIG, BASE_URL, LIST_NFT_TYPE, ADDRESS_ZERO };
