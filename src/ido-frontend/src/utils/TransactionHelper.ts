const getTransactionReceiptMined = (txHash: string, interval = 500) => {
  const { web3 } = window as any;

  return new Promise((resolve, reject) => {
    const transactionReceiptAsync = (_resolve: any, _reject: any) => {
      web3.eth.getTransactionReceipt(txHash, (error: any, receipt: any) => {
        if (error) {
          reject(error);
        } else if (receipt == null) {
          setTimeout(
            () => transactionReceiptAsync(_resolve, _reject),
            interval
          );
        } else {
          resolve(receipt);
        }
      });
    };
    transactionReceiptAsync(resolve, reject);
  });
};

const fromWei = (amount: string, fixed: number = 8) => {
  const { web3 } = window as any;
  return parseFloat(
    parseFloat(web3.utils.fromWei(amount, "ether")).toFixed(fixed)
  );
};
const toWei = (amount: string) => {
  if (!amount) return "0";
  const { web3 } = window as any;
  return web3.utils.toWei(amount, "ether");
};

export { getTransactionReceiptMined, fromWei, toWei };
