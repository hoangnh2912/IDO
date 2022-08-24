/* global BigInt */
import { useEffect, useState } from "react";
import Web3 from "web3"; // Only when using npm/yarn
import logo from "../../assets/images/logo512.png";
import ModalAddIDO from "../../components/ModalAddIDO";
import NFTItem from "../../components/NFTItem";
import { LIST_NFT_TYPE, NETWOKR } from "../../constants/config";
import { addIDO } from "../../contracts/Pool";
import { getBalanceAPI, getListIDOAPI } from "../../services";
import "./index.css";

const Application = () => {
  const wdx = window as any;

  const [isShowMintNFT, setIsShowNewIdo] = useState(false);

  const [balance, setBalance] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [balanceDOGE, setBalanceDOGE] = useState("");
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

        setBalance(
          `${parseFloat(wdx.web3.utils.fromWei(eth, "ether")).toFixed(5)}`
        );
        setBalanceUSDT(
          `${parseFloat(wdx.web3.utils.fromWei(usdt, "ether")).toFixed(5)}`
        );
        setBalanceDOGE(
          `${parseFloat(wdx.web3.utils.fromWei(doge, "ether")).toFixed(5)}`
        );
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
      getOnwerNFTs();
      getMarketNFTs();
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

  const getOnwerNFTs = async () => {
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

  const getMarketNFTs = async () => {
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
    hideIdo();
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
      await getOnwerNFTs();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const showNewIdo = () => {
    setIsShowNewIdo(true);
  };

  const hideIdo = () => {
    setIsShowNewIdo(false);
  };

  return (
    <div className="App">
      <ModalAddIDO
        isShow={isShowMintNFT}
        onSubmit={onPressAddIDO}
        onClose={hideIdo}
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
                // alignItems: "center",
              }}
            >
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
                  children={`Address: ${account}`}
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
                    {balanceDOGE} DOGE
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
                <NFTItem token={item} account={account} />
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
