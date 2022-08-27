/* global BigInt */
import { useEffect, useState } from "react";
import Web3 from "web3"; // Only when using npm/yarn
import logo from "../../assets/images/logo512.png";
import ModalAddIDO from "../../components/ModalAddIDO";
import ModalBuyIDO from "../../components/ModalBuyIDO";
import ModalCreateERC20 from "../../components/ModalCreateERC20";
import NFTItem from "../../components/NFTItem";
import { CONFIG, LIST_NFT_TYPE, NETWOKR } from "../../constants/config";
import { createERC20 } from "../../contracts/CreateERC20";
import { addIDO, buyIDO } from "../../contracts/Pool";
import { getBalanceAPI, getListIDOAPI } from "../../services";
import { fromWei } from "../../utils/TransactionHelper";
import "./index.css";

const Application = () => {
  const wdx = window as any;

  const [isShowAddIDO, setIsShowNewIdo] = useState(false);
  const [isShowBuyIDO, setIsShowBuyIDO] = useState(null);
  const [isShowCreateERC20, setIsShowCreateERC20] = useState(false);
  const [addressErc20, setAddressErc20] = useState("");

  const [balance, setBalance] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [ownerIDOs, setOwnerIDOs] = useState<any>([]);
  const [marketIDOs, setMarketIDOs] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMarket, setLoadingMarket] = useState(false);
  const [isLoadingOwner, setLoadingOwner] = useState(false);
  const [account, setAccount] = useState("");
  const chainId = wdx.ethereum.networkVersion;
  const [isConnect, setIsConnect] = useState(false);

  const getBalance = async () => {
    if (account) {
      try {
        const balance = await getBalanceAPI({
          address: account,
        });
        const { eth, usdt, doge } = balance.data;

        setBalance(`${fromWei(eth)}`);
        setBalanceUSDT(`${fromWei(usdt)}`);
      } catch (error) {}
    }
  };

  const connectWallet = async () => {
    if (wdx.ethereum) {
      try {
        wdx.web3 = new Web3(wdx.ethereum);
        await wdx.ethereum.enable();
        await switchToNetwork();
        const accounts = await wdx.web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].toLowerCase());
        }
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      wdx.alert("Please Install MetaMask as a Chrome Extension");
    }
  };

  useEffect(() => {
    wdx.ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0].toLowerCase());
      }
    });
    connectWallet();
  }, []);

  useEffect(() => {
    if (isConnect) {
      getBalance();
      getOnwerIDOs();
      getMarketIDOs();
    }
  }, [isConnect, account, chainId]);

  const switchToNetwork = async () => {
    const web3 = wdx.web3;
    if (wdx.ethereum.networkVersion != NETWOKR.chainId) {
      try {
        await wdx.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(NETWOKR.chainId) }],
        });
        setIsConnect(true);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      setIsConnect(true);
    }
  };

  const getOnwerIDOs = async () => {
    if (account) {
      setLoadingOwner(true);
      setOwnerIDOs([]);
      try {
        const response = await getListIDOAPI({
          address: account,
          type: LIST_NFT_TYPE.INCLUDE,
        });
        setOwnerIDOs(response.data);
      } catch (error) {}
      setLoadingOwner(false);
    }
  };

  const getMarketIDOs = async () => {
    if (account) {
      setLoadingMarket(true);
      setMarketIDOs([]);
      try {
        const response = await getListIDOAPI({
          address: account,
          type: LIST_NFT_TYPE.EXCLUDE,
        });
        setMarketIDOs(response.data);
      } catch (error) {}
      setLoadingMarket(false);
    }
  };

  const onPressAddIDO = async ({
    title,
    usdtAmount,
    endTime,
    idoAddress,
    idoAmount,
    image,
  }: any) => {
    hideNewIdo();
    try {
      setLoading(true);
      if (account)
        await addIDO(
          {
            title,
            usdtAmount,
            image,
            endTime,
            idoAddress,
            idoAmount,
          },
          account
        );
      await getBalance();
      await getOnwerIDOs();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onPressBuyIDO = async ({ id, tokenAmount }: any) => {
    hideBuyIdo();
    try {
      setLoading(true);
      if (account)
        await buyIDO(
          {
            id,
            usdtAmount: tokenAmount,
          },
          account
        );
      await getBalance();
      await getMarketIDOs();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onPressCreateERC20 = async (payload: any) => {
    try {
      setLoading(true);
      if (account) {
        const { erc20Address } = await createERC20(payload, account);
        setAddressErc20(erc20Address);
      }
      await getBalance();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const showBuyIdo = (token: any) => {
    setIsShowBuyIDO(token);
  };

  const hideBuyIdo = () => {
    setIsShowBuyIDO(null);
  };

  const showNewIdo = () => {
    setIsShowNewIdo(true);
  };

  const hideNewIdo = () => {
    setIsShowNewIdo(false);
  };

  const showCreateERC20 = () => {
    setIsShowCreateERC20(true);
  };

  const hideCreateERC20 = () => {
    setAddressErc20("");

    setIsShowCreateERC20(false);
  };

  return (
    <div className="App">
      <ModalCreateERC20
        addressErc20={addressErc20}
        isShow={isShowCreateERC20}
        onSubmit={onPressCreateERC20}
        onClose={hideCreateERC20}
      />
      <ModalBuyIDO
        isShow={isShowBuyIDO}
        account={account}
        onSubmit={onPressBuyIDO}
        onClose={hideBuyIdo}
      />
      <ModalAddIDO
        isShow={isShowAddIDO}
        onSubmit={onPressAddIDO}
        onClose={hideNewIdo}
      />
      <span> </span>
      <nav className="navbar navbar-dark fixed-top bg-light flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 text-secondary"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          <img
            src={logo}
            style={{
              height: 40,
              marginRight: "15px",
            }}
          />
          IDO Launchpad
        </a>

        <ul className="navbar-nav px-3">
          {isConnect && account ? (
            <li
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <button
                style={{
                  marginRight: "15px",
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "white",
                }}
                onClick={showCreateERC20}
                className="btn btn-warning"
              >
                Create ERC20
              </button>
              <button
                style={{
                  marginRight: "15px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                onClick={showNewIdo}
                className="btn btn-success"
              >
                New IDO
              </button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="text-secondary"
              >
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(account);
                    alert(`Copy address : ${account}`);
                  }}
                  children={`Your address: ${account}`}
                />
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(CONFIG.USDT.address);
                  }}
                  children={`USDT: ${CONFIG.USDT.address}`}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                    className="text-primary"
                  >
                    {balanceUSDT} USDT
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                    className="text-primary"
                  >
                    {balance} ETH
                  </span>
                </div>
              </div>
            </li>
          ) : (
            <button onClick={connectWallet} className="btn-3">
              Connect Wallet
            </button>
          )}
        </ul>
      </nav>
      {!!isLoading && (
        <div className="overlay">
          <div className="overlayDoor"></div>
          <div className="overlayContent">
            <div className="loader">
              <div className="inner"></div>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 4 }}>
        <h1 style={{ marginTop: 100 }} id="title">
          Launchpad
        </h1>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            wordBreak: "break-all",
          }}
        >
          {isLoadingMarket ? (
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            marketIDOs.map((item: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginTop: 30,
                }}
              >
                <NFTItem
                  token={item}
                  showBuyIdo={showBuyIdo}
                  account={account}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <h1
        style={{
          marginTop: 80,
        }}
        id="title"
      >
        Your IDO
      </h1>
      <div style={{ flexDirection: "row", display: "flex" }}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            overflowY: "scroll",
          }}
        >
          {isLoadingOwner ? (
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            ownerIDOs.map((item: any, idx: number) => (
              <div
                key={idx}
                style={{
                  marginTop: 30,
                  flexDirection: "column",
                  display: "flex",
                  width: 380,
                }}
              >
                <NFTItem account={account} token={item} />
                <div
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    display: "flex",
                  }}
                ></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Application;
