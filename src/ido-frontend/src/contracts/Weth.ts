import Web3 from "web3";
import { AbiItem } from "web3-utils/types";
import CONFIG from "../constants/config.json";
import { getTransactionReceiptMined } from "../utils/TransactionHelper";
const deposit = async (value: number, from: string) => {
  const { web3 } = window as any;

  const contract = new web3.eth.Contract(
    CONFIG.WrapETH.abi as AbiItem[],
    CONFIG.WrapETH.address
  );
  const res = await contract.methods
    .deposit()
    .send({ from, value: web3.utils.toWei(value.toString(), "ether") });
  await getTransactionReceiptMined(res.transactionHash);
};

const withdraw = async (value: number, from: string) => {
  const { web3 } = window as any;
  const contract = new web3.eth.Contract(
    CONFIG.WrapETH.abi as AbiItem[],
    CONFIG.WrapETH.address
  );
  const res = await contract.methods
    .withdraw(web3.utils.toWei(value.toString(), "ether"))
    .send({ from });
  await getTransactionReceiptMined(res.transactionHash);
};

export { deposit, withdraw };
