import { CSSProperties } from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BASE_URL } from "../constants/config";
import { fromWei } from "../utils/TransactionHelper";

export const NFTItem = (props: any) => {
  const { web3 } = window as any;
  const { token, account, isShowButton = true, showBuyIdo } = props;
  const {
    endTime,
    idoCurrency,
    metadata,
    idoSupply,
    owner,
    tokenCurrency,
    tokenSupply,
    idoLeft,
  } = token;

  const { name, image } = metadata;

  const styleText: CSSProperties = isShowButton
    ? {
        maxWidth: (350 * 3) / 4,
        flexWrap: "wrap",
        wordBreak: "break-all",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }
    : {
        maxWidth: "100%",
      };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          marginRight: "5px",
          marginLeft: "5px",
        }}
      >
        <img
          className="rounded"
          style={{
            height: 350,
            width: 350,
          }}
          src={`${BASE_URL}storage/read?key=${image}`}
        />
      </div>
      <div
        className="ml-2"
        style={{
          flexDirection: "column",
          display: "flex",
        }}
      >
        <p />
        {account != owner && (
          <a
            onClick={() => {
              window.open(`https://rinkeby.etherscan.io/address/${owner}`);
            }}
            className="font-weight-bold text-primary"
            style={{
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
            children={`Owner: ${owner}`}
          />
        )}
        <p />
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                ...styleText,
              }}
            >
              {name}
            </div>
            <ProgressBar
              style={{
                width: 350,
              }}
              now={(idoLeft / idoSupply) * 100}
              animated
              variant="warning"
              label={`${fromWei(idoLeft)}/${fromWei(idoSupply)}`}
            />
            <>
              <div
                style={{
                  ...styleText,
                }}
                className="font-weight-bold text-warning"
                children={`Total IDO: ${fromWei(idoSupply)} DOGE`}
              />
              <div
                style={{
                  ...styleText,
                }}
                className="font-weight-bold text-info"
                children={`Call USDT: ${fromWei(tokenSupply)} USDT`}
              />
              <div
                style={{
                  ...styleText,
                }}
                className="font-weight-bold text"
                children={`End date: ${new Date(
                  parseInt(endTime) * 1000
                ).toLocaleDateString()}`}
              />

              {account.toLowerCase() != owner.toLowerCase() && isShowButton && (
                <Button
                  onClick={() => {
                    showBuyIdo(token);
                  }}
                  style={{
                    color: "white",
                  }}
                  variant="warning"
                >
                  Buy
                </Button>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTItem;
