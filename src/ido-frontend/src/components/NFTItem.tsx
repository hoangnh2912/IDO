import React, { CSSProperties } from "react";
import { BASE_URL } from "../constants/config";
import { shortAddress } from "../utils/AddressHelper";

export const NFTItem = (props: any) => {
  const { web3 } = window as any;
  const { token, account, isShowButton = true } = props;
  const {
    endTime,
    idoCurrency,
    metadata,
    idoSupply,
    owner,
    tokenCurrency,
    tokenSupply,
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
        {/* <a
          onClick={() => {
            window.open(
              `https://rinkeby.etherscan.io/token/${token_address}?a=${token_id}`
            );
          }}
          className="font-weight-bold text-primary"
          style={{
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
          children={`NFT ID: ${token_id}`}
        /> */}
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
            <progress
              style={{
                width: 350,
              }}
              value="32"
              max="100"
            ></progress>
            {idoSupply != "0" && (
              <>
                <div
                  style={{
                    ...styleText,
                  }}
                  className="font-weight-bold text-warning"
                  children={`${`${parseFloat(
                    web3.utils.fromWei(idoSupply, "ether")
                  ).toFixed(8)}`} DOGE`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTItem;
