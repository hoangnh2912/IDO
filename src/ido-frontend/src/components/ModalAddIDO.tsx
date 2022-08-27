import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { resizeImageFn } from "../utils/MintFunc";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const ModalAddIDO = (props: any) => {
  const [title, setTitle] = useState("");
  const [endTime, setEndTime] = useState("");
  const [idoAddress, setIdoAddress] = useState("");
  const [idoAmount, setIdoAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);
  const clearData = () => {
    setTitle("");
    setImage("");
    setEndTime("");
    setIdoAddress("");
    setIdoAmount("");
    setUsdtAmount("");
  };
  const { onClose, onSubmit, isShow } = props;
  return (
    <Modal
      show={isShow}
      onHide={() => {
        onClose();
        clearData();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>New IDO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Title
          </InputGroup.Text>
          <Form.Control
            onChange={(event: any) => {
              setTitle(event.target.value);
            }}
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            accept="image/*"
            onChange={(event: any) => {
              try {
                if (
                  event &&
                  event.target &&
                  event.target.files &&
                  event.target.files.length > 0
                ) {
                  const file = event.target.files[0];
                  setImageFile(file);
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = function () {
                    if (reader && reader.result) {
                      setImage(reader.result as string);
                    }
                  }.bind(this);
                }
              } catch (error) {}
            }}
            type="file"
          />
        </Form.Group>
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            style={{
              maxWidth: 350,
              maxHeight: 350,
              borderRadius: 10,
            }}
            src={image}
          />
        </div>
        <p />
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Token IDO address
          </InputGroup.Text>
          <Form.Control
            onChange={(event: any) => setIdoAddress(event.target.value)}
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            IDO amount
          </InputGroup.Text>
          <Form.Control
            type="number"
            onChange={(event: any) => setIdoAmount(event.target.value)}
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            USDT amount
          </InputGroup.Text>
          <Form.Control
            type="number"
            onChange={(event: any) => setUsdtAmount(event.target.value)}
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            End time
          </InputGroup.Text>
          <Form.Control
            type="datetime-local"
            onChange={(event: any) => setEndTime(event.target.value)}
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            onSubmit({
              title,
              image: await resizeImageFn(imageFile),
              endTime,
              idoAddress,
              idoAmount,
              usdtAmount,
            });
            clearData();
          }}
          variant="primary"
        >
          New IDO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddIDO;
