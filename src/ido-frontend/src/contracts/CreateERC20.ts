import Web3 from "web3";
import { AbiItem } from "web3-utils/types";
import CONFIG from "../constants/config.json";
import { getTransactionReceiptMined, toWei } from "../utils/TransactionHelper";

const contract = () => {
  const { web3 } = window as any;

  return new (web3 as Web3).eth.Contract(
    CONFIG.CreateERC20.abi as AbiItem[],
    CONFIG.CreateERC20.address
  );
};
const contractCustom = (address: string) => {
  const { web3 } = window as any;

  return new (web3 as Web3).eth.Contract(CONFIG.USDT.abi as AbiItem[], address);
};

const trim = (str: string, ch: string) => {
  var start = 0,
    end = str.length;

  while (start < end && str[start] === ch) ++start;

  while (end > start && str[end - 1] === ch) --end;

  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const createERC20 = async (payload: any, from: string) => {
  const { tokenName, tokenAmount, tokenSymbol } = payload;
  const res = await contract()
    .methods.createERC20(tokenName, tokenSymbol, toWei(tokenAmount))
    .send({ from });
  const mined = (await getTransactionReceiptMined(res.transactionHash)) as any;
  const erc20Address =
    "0x" + trim(mined.logs[1].topics[1].replace("0x", ""), "0");

  try {
    const balance = await contractCustom(erc20Address)
      .methods.balanceOf(from)
      .call();
    console.log(balance);
  } catch (error: any) {
    console.log(error.message);
  }
  return {
    erc20Address,
    tokenName,
    tokenAmount,
    tokenSymbol,
  };
};

export { createERC20 };
