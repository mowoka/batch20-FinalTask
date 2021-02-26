import React from "react";
import { Modal } from "react-bootstrap";

const CheckoutNotfication = ({ show, handleClose }) => {
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <div
            style={{ color: "#469F74", fontSize: "18px", textAlign: "center" }}
          >
            Thank you for ordering in us, please wait 1 x 24 hours to verify you
            order
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutNotfication;
