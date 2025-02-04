import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import BACKEND_URL from "../component/BackendUrl";
import toastr from "toastr";
import "toastr/build/toastr.css"; // Ensure Toastr CSS is imported

const CreateDiaryModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    entry_date: "",
    tag: "",
  });
  const [tags, setTags] = useState([]);

  // Fetch tags
  useEffect(() => {
    if (show) {
      const fetchTags = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.get(`${BACKEND_URL}/api/tags/`, {
            headers: { Authorization: `Token ${token}` },
          });
          setTags(response.data);
        } catch (error) {
          toastr.error("Failed to fetch tags. Please try again.");
        }
      };
      fetchTags();
    }
  }, [show]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(`${BACKEND_URL}/api/diary-entries/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      toastr.success("Entry saved successfully!");
      setFormData({ title: "", content: "", entry_date: "", tag: "" });
      handleClose();
    } catch (error) {
      toastr.error(
        error.response?.data?.error || "Failed to save entry. Please try again."
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a New Entry</Modal.Title>
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
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))
              ) : (
                <option disabled value="">
                  No tags available
                </option>
              )}
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Entry
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateDiaryModal;
