import Web3 from "web3";
import { AbiItem } from "web3-utils/types";
import CONFIG from "../constants/config.json";
import { getTransactionReceiptMined } from "../utils/TransactionHelper";

const contract = () => {
  const { web3 } = window as any;

  return new (web3 as Web3).eth.Contract(
    CONFIG.USDT.abi as AbiItem[],
    CONFIG.USDT.address
  );
};

const web3 = (): Web3 => {
  return (window as any).web3;
};

// const deposit = async (value: number, from: string) => {
//   const res = await contract()
//     .methods.deposit()
//     .send({ from, value: web3().utils.toWei(value.toString(), "ether") });
//   await getTransactionReceiptMined(res.transactionHash);
// };

// const withdraw = async (value: number, from: string) => {
//   const res = await contract()
//     .methods.withdraw(web3().utils.toWei(value.toString(), "ether"))
//     .send({ from });
//   await getTransactionReceiptMined(res.transactionHash);
// };

export {};
