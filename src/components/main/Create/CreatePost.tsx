import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CiSquarePlus } from 'react-icons/ci';
import '../../header/NavBar.css';
import './CreatePost.css';
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
      setShow(false);
    } else {
      handleClose();
      navigate('/collection/create');
    }
  };

  return (
    <>
      <Button className="btn btn-create" onClick={handleShow}>
        <CiSquarePlus className="icon" /> CREATE
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="create-post-modal"
      >
        <Modal.Body>
          <Button
            variant="outline-secondary"
            className="close-button"
            onClick={handleClose}
          >
            &times;
          </Button>
          <h3 className="modal-title-custom">{dialogTitle}</h3>
          {showCreateReview ? (
            <CreateReview handleClose={handleClose} />
          ) : (
            <Form>
              <Form.Group controlId="postType" className="form-group-custom">
                <Form.Label className="form-label-custom">
                  Let's create a...
                </Form.Label>
                <Form.Control
                  as="select"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="form-control-custom"
                >
                  <option value="Review">Review</option>
                  <option value="Collection">Collection</option>
                </Form.Control>
              </Form.Group>
              <div className="modal-actions">
                <Button
                  variant="outline-secondary"
                  onClick={handleClose}
                  className="me-2"
                >
                  cancel
                </Button>
                <Button className="btn-create" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {showCreateReview && <CreateReview handleClose={handleClose} />}
    </>
  );
}
