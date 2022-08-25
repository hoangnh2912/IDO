import Web3 from "web3";
import { AbiItem } from "web3-utils/types";
import CONFIG from "../constants/config.json";
import { pinDataToIPFS, pinFileToIPFS } from "../utils/MintFunc";
import { getTransactionReceiptMined, toWei } from "../utils/TransactionHelper";

const contract = () => {
  const { web3 } = window as any;

  return new web3.eth.Contract(
    CONFIG.Pool.abi as AbiItem[],
    CONFIG.Pool.address
  );
};

const customContract = (address: string, abi: any) => {
  const { web3 } = window as any;

  return new web3.eth.Contract(abi, address);
};

const addIDO = async (payload: any, from: string) => {
  try {
    const { web3 } = window as any;
    const { title, usdtAmount, image, endTime, idoAddress, idoAmount } =
      payload;

    const approveRes = await customContract(idoAddress, CONFIG.USDT.abi)
      .methods.approve(
        CONFIG.Pool.address,
        web3.utils.toWei(idoAmount, "ether")
      )
      .send({ from });

    await getTransactionReceiptMined(approveRes.transactionHash);

    const imageResponse = await pinFileToIPFS(image);
    const metadata = {
      image: imageResponse.pinataUrl,
      name: title,
      attributes: [
        {
          trait_type: "Address",
          value: title,
        },
        {
          display_type: "date",
          trait_type: "created",
          value: new Date().getTime() / 1000,
        },
      ],
    };
    const pinataResponse = await pinDataToIPFS(metadata);
    if (!pinataResponse) throw new Error("Metadata not pinned");
    const res = await contract()
      .methods.addIDO(
        CONFIG.USDT.address,
        idoAddress,
        web3.utils.toWei(usdtAmount, "ether"),
        web3.utils.toWei(idoAmount, "ether"),
        `${pinataResponse.pinataUrl}`,
        parseInt(`${new Date(endTime).getTime() / 1000}`)
      )
      .send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error) {
    console.log(error);
  }
};

const buyIDO = async (payload: any, from: string) => {
  try {
    const { id, usdtAmount } = payload;

    const approveRes = await customContract(
      CONFIG.USDT.address,
      CONFIG.USDT.abi
    )
      .methods.approve(CONFIG.Pool.address, toWei(usdtAmount))
      .send({ from });

    await getTransactionReceiptMined(approveRes.transactionHash);

    const res = await contract()
      .methods.buyIDO(id, toWei(usdtAmount))
      .send({ from });
    console.log(res);

    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    // console.log(error.message, error.stack);
  }
};

const claimLeftIdo = async (payload: any) => {
  const { token } = payload;
  const tokenURI = await contract().methods.tokenURI(token).call();
  return tokenURI;
};
const getIDO = async (payload: any) => {
  const { token } = payload;
  const _ido = await contract().methods.getIDO(token).call();
  return _ido;
};
const getTotalIDO = async (payload: any) => {
  const { token } = payload;
  const _totalIdo = await contract().methods.getTotalIDO(token).call();
  return _totalIdo;
};
const isIDOEnded = async (payload: any) => {
  const { token } = payload;
  const _ended = await contract().methods.isIDOEnded(token).call();
  return _ended;
};

const calculateRateIdo = async (payload: any) => {
  const { id, usdtAmount } = payload;
  const _idoAmount = await contract()
    .methods.calculateRateIdo(id, usdtAmount)
    .call();
  return _idoAmount;
};

export {
  addIDO,
  claimLeftIdo,
  buyIDO,
  getIDO,
  getTotalIDO,
  isIDOEnded,
  calculateRateIdo,
};
