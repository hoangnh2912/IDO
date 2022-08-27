import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { calculateRateIdo } from "../contracts/Pool";
import { fromWei, toWei } from "../utils/TransactionHelper";
import NFTItem from "./NFTItem";
export const ModalBuyIDO = (props: any) => {
  const [tokenAmount, setTokenAmount] = useState("");
  const [idoAmount, setIdoAmount] = useState("0");
  const clearData = () => {
    setTokenAmount("");
  };
  const { onClose, onSubmit, isShow, account } = props;

  const getIdoAmount = async (_amount: string) => {
    const _idoAmount = await calculateRateIdo({
      id: isShow.id,
      usdtAmount: toWei(_amount),
    });
    setIdoAmount(_idoAmount);
  };

  return (
    <Modal
      show={!!isShow}
      onHide={() => {
        onClose();
        clearData();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Buy IDO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!isShow && (
          <>
            <NFTItem account={account} token={isShow} isShowButton={false} />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Amount USDT
              </InputGroup.Text>
              <Form.Control
                value={tokenAmount}
                onChange={(e: any) => {
                  if (
                    parseFloat(e.target.value) > fromWei(isShow.tokenSupply)
                  ) {
                    getIdoAmount(`${fromWei(isShow.tokenSupply)}`);
                    setTokenAmount(`${fromWei(isShow.tokenSupply)}`);
                  } else {
                    getIdoAmount(`${e.target.value}`);
                    setTokenAmount(`${e.target.value}`);
                  }
                }}
                type="number"
                aria-label="Amount USDT"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <div
              className="font-weight-bold text"
              children={`You got : ${fromWei(idoAmount)} ${isShow.symbol}`}
            />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            onSubmit({ id: isShow.id, tokenAmount });
            clearData();
          }}
          variant="warning"
          style={{
            color: "white",
          }}
        >
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBuyIDO;
