import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./DiaryList.css";
import AppNavBar from "../component/AppNavBar";
import CreateDiaryModal from "./CreateDiary";
import ViewDiaryModal from "./ViewDiary";
import DeleteDiaryModal from "./DeleteDiary";
import EditDiaryModal from "./EditDiary";
import BACKEND_URL from "../component/BackendUrl";


const DiaryList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Fetch diary entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BACKEND_URL}/api/diary-entries/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEntries(response.data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleShowViewModal = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const handleShowEditModal = (entry) => {
    setSelectedEntry(entry);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (entry) => {
    setSelectedEntry(entry);
    setShowDeleteModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleEdit = (updatedEntry) => {
    console.log("Entry updated:", updatedEntry);
    setShowEditModal(false);
  };

  const handleDelete = (entryId) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== entryId));
    console.log(`Entry with ID ${entryId} deleted.`);
    setShowDeleteModal(false);
  };

  return (
    <>
      <AppNavBar />
      <Container fluid className="diary-page">
        <Row className="align-items-center g-0">
          {/* Left Side - Text Content */}
          <Col md={4} className="text-section px-5">
            <h1 className="diary-title">Diary</h1>
            <p className="diary-description">
              Capture your thoughts, memories, and moments in a beautifully
              designed diary. Stay connected to your personal journey every day.
            </p>
            <Button
              variant="dark"
              className="start-button mt-3"
              onClick={handleShowCreateModal}
            >
              Start Writing
            </Button>
          </Col>

          {/* Right Side - Diary List */}
          <Col md={8} className="diary-list-section">
            <div className="scrollable-container">
              {loading ? (
                <p>Loading entries...</p>
              ) : entries.length === 0 ? (
                <p className="text-muted">No entries available.</p>
              ) : (
                <Row>
                  {entries.map((entry) => (
                    <Col key={entry.id} sm={12} md={6} lg={4} className="mb-4">
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                          <Card.Title className="fs-4 fw-bold">
                            {entry.title}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {entry.entry_date}
                          </Card.Subtitle>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowViewModal(entry)}
                          >
                            View
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowEditModal(entry)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleShowDeleteModal(entry)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>

        {/* Modals */}
        <CreateDiaryModal
          show={showCreateModal}
          handleClose={handleCloseCreateModal}
        />
        <ViewDiaryModal
          show={showViewModal}
          handleClose={handleCloseViewModal}
          entry={selectedEntry}
        />
        <DeleteDiaryModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
          entry={selectedEntry}
        />
        <EditDiaryModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleEdit={handleEdit}
          entry={selectedEntry}
        />
      </Container>
    </>
  );
};

export default DiaryList;
