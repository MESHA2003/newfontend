import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import BACKEND_URL from "../component/BackendUrl";
import toastr from "toastr";
import "toastr/build/toastr.css";  // Import Toastr CSS

const EditDiaryModal = ({ show, handleClose, handleEdit, entry }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    entry_date: "",
    tag: "",
  });

  const [tags, setTags] = useState([]); // State for the list of tags

  useEffect(() => {
    // Fetch the list of tags from the API
    const token = localStorage.getItem("authToken");
    axios
      .get(`${BACKEND_URL}/api/tags/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setTags(response.data);
      });

    if (entry) {
      setFormData({
        title: entry.title || "",
        content: entry.content || "",
        entry_date: entry.entry_date || "",
        tag: entry.tag || "",
      });
    }
  }, [entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the entry via the API
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${BACKEND_URL}/api/diary-entries/${entry.id}/`,
        formData,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log(response.data.message);
      
      // Show success message using Toastr
      toastr.success("Diary entry updated successfully!");

      handleEdit(response.data.entry); // Pass the updated entry back
    } catch (error) {
      console.error(
        "Error updating entry:",
        error.response?.data || error.message
      );
      
      // Show error message using Toastr
      toastr.error("Failed to update diary entry. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Diary Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write your thoughts here..."
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEntryDate" className="mt-3">
            <Form.Label>Entry Date</Form.Label>
            <Form.Control
              type="date"
              name="entry_date"
              value={formData.entry_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTag" className="mt-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              as="select"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              
            >
              <option value="">Select a tag</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDiaryModal;
