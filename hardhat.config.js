require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY =
  "4e50ea4fcf009e8604d7c69bff73ee2b1a8c77caefd9ad1eeb9beffcdad43323";
module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/afa9553623db44b388348836b654f819`,
      accounts: [`${PRIVATE_KEY}`],
    },
    ganache: {
      url: `http://127.0.0.1:7545`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: "2ST54JNJTBR3CANFFTQA5RNEXKF65NN39E",
    },
  },
};
