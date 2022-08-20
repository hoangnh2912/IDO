import { AbiItem } from "web3-utils/types";
import CONFIG from "../constants/config.json";
import { getTransactionReceiptMined } from "../utils/TransactionHelper";

const sell = async (payload: any, from: string) => {
  try {
    const { token, price } = payload;
    const { web3 } = window as any;

    const contractEstate = new web3.eth.Contract(
      CONFIG.Estate.abi as AbiItem[],
      CONFIG.Estate.address
    );

    if (
      (await contractEstate.methods.getApproved(token).call()).toLowerCase() !=
      CONFIG.Market.address.toLowerCase()
    )
      await contractEstate.methods
        .approve(CONFIG.Market.address, token)
        .send({ from });

    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const res = await contractMarket.methods
      .openSellToken(token, web3.utils.toWei(price.toString(), "ether"))
      .send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("sell", error.message);
  }
};

const buy = async (payload: any, from: string) => {
  try {
    const { token } = payload;
    const { web3 } = window as any;

    const contractWrapETH = new web3.eth.Contract(
      CONFIG.WrapETH.abi as AbiItem[],
      CONFIG.WrapETH.address
    );

    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const price = await contractMarket.methods.priceOfToken(token).call();

    if (
      (await contractWrapETH.methods
        .allowance(from, CONFIG.Market.address)
        .call()) != price
    )
      await contractWrapETH.methods
        .approve(CONFIG.Market.address, parseInt(price))
        .send({ from });

    const res = await contractMarket.methods.buy(token).send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("buy", error.message);
  }
};

const bid = async (payload: any, from: string) => {
  try {
    const { token, price } = payload;
    const { web3 } = window as any;

    const contractWrapETH = new web3.eth.Contract(
      CONFIG.WrapETH.abi as AbiItem[],
      CONFIG.WrapETH.address
    );
    if (
      (await contractWrapETH.methods
        .allowance(from, CONFIG.Market.address)
        .call()) != `${web3.utils.toWei(price.toString(), "ether")}`
    )
      await contractWrapETH.methods
        .approve(
          CONFIG.Market.address,
          web3.utils.toWei(price.toString(), "ether")
        )
        .send({ from });

    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const res = await contractMarket.methods
      .bid(token, web3.utils.toWei(price.toString(), "ether"))
      .send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("bid", error.message);
  }
};

const acceptBid = async (payload: any, from: string) => {
  try {
    const { token } = payload;
    const { web3 } = window as any;

    const contractEstate = new web3.eth.Contract(
      CONFIG.Estate.abi as AbiItem[],
      CONFIG.Estate.address
    );
    if (
      (await contractEstate.methods.getApproved(token).call()).toLowerCase() !=
      CONFIG.Market.address.toLowerCase()
    )
      await contractEstate.methods
        .approve(CONFIG.Market.address, token)
        .send({ from });
    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const res = await contractMarket.methods.acceptBid(token).send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("acceptBid", error.message);
  }
};

const cancelBid = async (payload: any, from: string) => {
  try {
    const { token } = payload;
    const { web3 } = window as any;

    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const res = await contractMarket.methods.cancelBid(token).send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("acceptBid", error.message);
  }
};

const cancelSellToken = async (payload: any, from: string) => {
  try {
    const { token } = payload;
    const { web3 } = window as any;
    const contractMarket = new web3.eth.Contract(
      CONFIG.Market.abi as AbiItem[],
      CONFIG.Market.address
    );
    const res = await contractMarket.methods
      .cancelSellToken(token)
      .send({ from });
    await getTransactionReceiptMined(res.transactionHash);
  } catch (error: any) {
    console.log("acceptBid", error.message);
  }
};

const priceOfToken = async (payload: any) => {
  const { token } = payload;
  const { web3 } = window as any;
  const contract = new web3.eth.Contract(
    CONFIG.Market.abi as AbiItem[],
    CONFIG.Market.address
  );
  const price = await contract.methods.priceOfToken(token).call();
  return price;
};

export { sell, priceOfToken, buy, bid, acceptBid, cancelSellToken, cancelBid };
