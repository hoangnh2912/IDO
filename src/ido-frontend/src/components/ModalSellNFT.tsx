import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NFTItem from "./NFTItem";

export const ModalSellNFT = (props: any) => {
  const [price, setPrice] = useState("");
  const clearData = () => {
    setPrice("");
  };
  const { onClose, onSubmit, isShow, token } = props;
  return (
    <Modal
      show={isShow}
      size="lg"
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Đặt lệnh bán NFT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {token && <NFTItem token={token} isShowButton={false} />}
        <p></p>
        <input
          type="text"
          style={{
            width: "97%",
            marginLeft: "10px",
          }}
          placeholder="Giá trị NFT (WETH)"
          onChange={(event) => setPrice(event.target.value)}
        />
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onSubmit(token.token_id, price);
            clearData();
          }}
          className="btn btn-info"
          variant="primary"
        >
          Đặt lệnh bán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSellNFT;
