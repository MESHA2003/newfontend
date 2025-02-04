import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import BACKEND_URL from "../component/BackendUrl";
import toastr from "toastr";
import "toastr/build/toastr.css";  // Import Toastr CSS

const DeleteDiaryModal = ({ show, handleClose, handleDelete, entry }) => {
  const handleDeleteEntry = async (id) => {
    try {
      // Get token from local storage
      const token = localStorage.getItem("authToken");

      // Make DELETE request to the API
      await axios.delete(`${BACKEND_URL}/api/diary-entries/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      // Show success message with Toastr
      toastr.success("Diary entry deleted successfully!");

      // Call the handleDelete prop to update parent component (if needed)
      handleDelete(id);

      // Close the modal
      handleClose();
    } catch (error) {
      // Log error for debugging
      console.error("Error deleting entry:", error.response?.data || error.message);

      // Show error message with Toastr
      toastr.error("Failed to delete diary entry. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the entry titled "{entry?.title}"?</p>
        <p>This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteEntry(entry?.id)} // Pass the entry ID to handle deletion
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteDiaryModal;
