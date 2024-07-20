import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CiSquarePlus } from 'react-icons/ci';
import '../../header/NavBar.css';
import CreateReview from '../Reviews/Create';

export default function CreatePost({ dialogTitle }: { dialogTitle: string }) {
  const [show, setShow] = useState(false);
  const [postType, setPostType] = useState('Review');
  const [showCreateReview, setShowCreateReview] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setShowCreateReview(false);
  };

  const handleShow = () => setShow(true);

  const handleNext = () => {
    if (postType === 'Review') {
      setShowCreateReview(true);
    } else {
      handleClose();
      navigate('/discussion/create');
    }
  };

  return (
    <>
      <Button className="btn-create" onClick={handleShow}>
        <CiSquarePlus className="icon" /> CREATE
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{dialogTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showCreateReview ? (
            <CreateReview handleClose={handleClose} />
          ) : (
            <Form>
              <Form.Group controlId="postType">
                <Form.Label>Select Post Type</Form.Label>
                <Form.Control
                  as="select"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                >
                  <option value="Review">Review</option>
                  <option value="Discussion">Discussion</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          {!showCreateReview && (
            <Button className="btn-create" onClick={handleNext}>
              Next
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {showCreateReview && <CreateReview handleClose={handleClose} />}
    </>
  );
}
