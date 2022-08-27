import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

export const ModalCreateERC20 = (props: any) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const clearData = () => {
    setTokenName("");
    setTokenSymbol("");
    setTokenAmount("");
  };
  const { onClose, onSubmit, isShow, addressErc20 } = props;

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
        <Modal.Title>Create ERC20</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!addressErc20 ? (
          <>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Name
              </InputGroup.Text>
              <Form.Control
                onChange={(e: any) => {
                  setTokenName(`${e.target.value}`);
                }}
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Symbol
              </InputGroup.Text>
              <Form.Control
                onChange={(e: any) => {
                  setTokenSymbol(`${e.target.value}`);
                }}
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Amount
              </InputGroup.Text>
              <Form.Control
                onChange={(e: any) => {
                  setTokenAmount(`${e.target.value}`);
                }}
                type="number"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </>
        ) : (
          <>
            <Alert variant={"success"}>Name: {tokenName}</Alert>
            <Alert variant={"success"}>Symbol: {tokenSymbol}</Alert>
            <Alert variant={"success"}>
              Amount: {tokenAmount} {tokenSymbol}
            </Alert>
            <Alert variant={"success"}>
              ERC20 Address: <Alert.Link href="#">{addressErc20}</Alert.Link>
            </Alert>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!addressErc20 && (
          <Button
            onClick={async () => {
              onSubmit({ tokenName, tokenAmount, tokenSymbol });
            }}
            variant="warning"
            style={{
              color: "white",
            }}
          >
            Create
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateERC20;
