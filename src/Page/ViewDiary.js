import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewDiaryModal = ({ show, handleClose, entry }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{entry?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Date:</strong> {entry?.entry_date}</p>
        <p><strong>Tag:</strong> {entry?.tag_name ? entry.tag_name : "No tag selected"}</p>

        <p><strong>Content:</strong></p>
        <div>{entry?.content}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
};

export default ViewDiaryModal;
