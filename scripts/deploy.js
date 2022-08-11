const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Pool = await ethers.getContractFactory("Pool");
  const WrapETH = await ethers.getContractFactory("WrapETH");
  const USDT = await ethers.getContractFactory("USDT");
  const DOGE = await ethers.getContractFactory("DOGE");

  const pool = await Pool.deploy();
  const usdt = await USDT.deploy();
  const doge = await DOGE.deploy();
  const wrapETH = await WrapETH.deploy();

  fs.writeFileSync(
    "./config.json",
    JSON.stringify({
      Pool: {
        address: pool.address,
        abi: require("../build/contracts/Pool.json").abi,
        contractName: require("../build/contracts/Pool.json").contractName,
      },
      WrapETH: {
        address: wrapETH.address,
        abi: require("../build/contracts/WrapETH.json").abi,
        contractName: require("../build/contracts/WrapETH.json").contractName,
      },
      USDT: {
        address: usdt.address,
        abi: require("../build/contracts/USDT.json").abi,
        contractName: require("../build/contracts/USDT.json").contractName,
      },
      DOGE: {
        address: doge.address,
        abi: require("../build/contracts/DOGE.json").abi,
        contractName: require("../build/contracts/DOGE.json").contractName,
      },
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
