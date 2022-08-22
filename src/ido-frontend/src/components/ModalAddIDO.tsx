import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { resizeImageFn } from "../utils/MintFunc";

export const ModalAddIDO = (props: any) => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenRate, setTokenRate] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);
  const clearData = () => {
    setAddress("");
    setDescription("");
    setImage("");
    setEndTime("");
    setTokenAddress("");
    setTokenAmount("");
    setTokenRate("");
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
        <h3>Title : </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          onChange={(event) => setAddress(event.target.value)}
        />
        <p></p>
        <h3>Image: </h3>
        <input
          type="file"
          style={{
            width: "100%",
          }}
          accept="image/*"
          onChange={(event) => {
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
        />
        <img width={350} src={image} />
        <p></p>
        <h3>Token IDO address: </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          onChange={(event) => setTokenAddress(event.target.value)}
        />
        <p></p>
        <h3>Token IDO amount: </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          onChange={(event) => setTokenAmount(event.target.value)}
        />
        <p></p>
        <h3>Token IDO rate with USDT: </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          onChange={(event) => setTokenRate(event.target.value)}
        />
        <p></p>
        <h3>End time: </h3>
        <input
          type="datetime-local"
          style={{
            width: "100%",
          }}
          onChange={(event) => setEndTime(event.target.value)}
        />
        <p></p>
        <h3>Description: </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          onChange={(event) => setDescription(event.target.value)}
        />

        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            onSubmit({
              address,
              description,
              image: await resizeImageFn(imageFile),
              endTime,
              tokenAddress,
              tokenAmount,
              tokenRate,
            });
            clearData();
          }}
          variant="primary"
        >
          Mint
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddIDO;
