import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalWithdrawWETH = (props: any) => {
  const [price, setPrice] = useState("");
  const clearData = () => {
    setPrice("");
  };
  const { onClose, onSubmit, isShow } = props;
  return (
    <Modal show={isShow} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Withdraw NFT</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <p></p>
        <input
          type="text"
          placeholder="Amount of WETH"
          onChange={(event) => setPrice(event.target.value)}
        />
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onSubmit(price);
            clearData();
          }}
          className="btn btn-info"
          variant="primary"
        >
          Withdraw
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalWithdrawWETH;
