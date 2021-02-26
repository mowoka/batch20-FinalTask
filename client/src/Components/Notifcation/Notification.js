import React from "react";
import { Modal } from "react-bootstrap";
import "./Notification.css";

const Notification = ({ show, handleClose, message }) => {
  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="notification--landing">{message}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notification;
