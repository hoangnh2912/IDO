import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { resizeImageFn } from "../utils/MintFunc";

export const ModalMintNFT = (props: any) => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);
  const clearData = () => {
    setAddress("");
    setDescription("");
    setImage("");
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
        <Modal.Title>Mint a House 🏠</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Address : </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          placeholder="Ví dụ: 234 Hoàng Quốc Việt"
          onChange={(event) => setAddress(event.target.value)}
        />
        <p></p>
        <h3>Description: </h3>
        <input
          type="text"
          style={{
            width: "100%",
          }}
          placeholder="Ví dụ: Nhà 5 phòng ngủ , ban công nhìn ra tây hồ"
          onChange={(event) => setDescription(event.target.value)}
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
        <p></p>
        <img width={350} src={image} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            onSubmit(address, description, await resizeImageFn(imageFile));
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

export default ModalMintNFT;
