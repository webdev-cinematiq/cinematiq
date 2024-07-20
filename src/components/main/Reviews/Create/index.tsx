// src/components/main/Reviews/Create/index.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ValidationAlert from '../../Alerts/ValidationAlert';
import * as reviewClient from '../../../../services/reviewService';
import * as movieClient from '../../../../services/movieService';
import { addReview } from '../reducer';
import { setMovies } from '../../Movies/reducer';
import Rating from '../rating';
import { CiSquareChevLeft } from 'react-icons/ci';
import './index.css';

export default function CreateReview({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [show, setShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const shortReview = true;
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [nextText, setNextText] = useState('NEXT');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = 'nanabanana';

  const createReview = async (review: any) => {
    const newReview = await reviewClient.createReview(username, review);
    dispatch(addReview(newReview));
  };

  const fetchMovies = async () => {
    const movies = await movieClient.fetchAllMovies();
    dispatch(setMovies(movies));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowAlert(false);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const results = await movieClient.findMoviesForTitle(value);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching movie results:', error);
      setSearchResults([]);
    }
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie(movie);
  };

  const validateReview = () => {
    if (!selectedMovie) {
      setAlertMessage('What movie do you want to review?');
      return false;
    }
    if (!watchDate) {
      setAlertMessage('When did you watch this movie?');
      return false;
    }
    if (dayjs(watchDate).isAfter(dayjs())) {
      setAlertMessage('Time traveler? Watch date cannot be in the future.');
      return false;
    }
    if (rating === 0) {
      setAlertMessage("Don't be shy! Tell us your rating!");
      return false;
    }
    if (!shortReview && !reviewText) {
      setAlertMessage('Tell us more!');
      return false;
    }
    setNextText('PUBLISH');
    return true;
  };

  const handleSaveReview = () => {
    if (validateReview()) {
      const newReview = {
        _id: dayjs().format(),
        type: 'SHORT', // TODO: add state for changing between short and long reviews
        author: username, // TODO: replace with actual user data
        movie: selectedMovie,
        rating,
        watch_date: watchDate,
        review_date: new Date(),
        text: reviewText,
      };
      createReview(newReview);
      handleClose();
      navigate(`/reviews/${newReview._id}`);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="create-review-modal"
    >
      <Modal.Body className={selectedMovie ? 'expanded-body' : ''}>
        <Button
          variant="outline-secondary"
          className="close-button"
          onClick={handleClose}
        >
          &times;
        </Button>
        {showAlert && (
          <ValidationAlert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
        {!selectedMovie ? (
          <Form.Group controlId="searchMovie">
            <h3 className="movie-title">Movie Title</h3>
            <Form.Control
              size="lg"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="I watched..."
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((movie: any) => (
                  <div
                    key={movie._id}
                    className="search-result-item"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    {movie.title} ({movie.year}) {movie.director}
                  </div>
                ))}
              </div>
            )}
          </Form.Group>
        ) : (
          <Row className="review-form">
            <Col xs={12} md={4} className="left-column">
              <Button
                variant="outline-secondary"
                className="back-button"
                onClick={() => setSelectedMovie(null)}
              >
                &#8592; {/* Long left arrow */}
              </Button>
              <div className="movie-poster">
                <img src={selectedMovie.poster} alt={selectedMovie.title} />
              </div>
            </Col>
            <Col xs={12} md={8} className="right-column">
              <h3 className="movie-title">
                {selectedMovie.title} ({selectedMovie.year})
              </h3>
              <Form>
                <Form.Group controlId="watchedOn" className="form-group-custom">
                  <Form.Label className="form-label-custom">
                    Watched on
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={watchDate}
                    onChange={(e) => {
                      setShowAlert(false);
                      setWatchDate(dayjs(e.target.value).format('YYYY-MM-DD'));
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="rating" className="form-group-custom">
                  <Form.Label className="form-label-custom">Rating</Form.Label>
                  <Rating rating={rating} setRating={setRating} />
                </Form.Group>
                {!shortReview && (
                  <Form.Group
                    controlId="reviewText"
                    className="form-group-custom"
                  >
                    <Form.Label className="form-label-custom">
                      Add a review...
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={reviewText}
                      onChange={(e) => {
                        setShowAlert(false);
                        setReviewText(e.target.value);
                      }}
                      isInvalid={showAlert && !reviewText}
                    />
                  </Form.Group>
                )}
              </Form>
            </Col>
          </Row>
        )}
        <div className="review-actions">
          <Button variant="outline-secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button className="btn-create" onClick={handleSaveReview}>
            {nextText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
