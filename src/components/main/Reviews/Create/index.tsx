// src/components/main/Reviews/Create/index.tsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ValidationAlert from '../../Alerts/ValidationAlert';
import * as reviewClient from '../../../../services/reviewService';
import * as movieClient from '../../../../services/movieService';
import Rating from '../rating';
import './index.css';

export default function CreateReview({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const username = 'nanabanana';
  const shortReview = false;

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState('');

  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [nextText, setNextText] = useState('NEXT');

  const navigate = useNavigate();

  const formatTitleForUrl = (review: any): string => {
    const formattedMovieName = selectedMovie.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    const formattedRating = review.rating.toFixed(1).replace('.', '-');
    const reviewYear = review.review_date.getFullYear();
    const textId = `${formattedMovieName}-${formattedRating}-${reviewYear}`;

    return textId;
  };

  const createReview = async (review: any, textId: string) => {
    await reviewClient.createReview(username, review);
    handleClose();
    navigate(`/${username}/review/${textId}`);
  };

  const fetchMovies = async () => {
    const movies = await movieClient.fetchAllMovies();
    setMovies(movies);
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
      const results = await movieClient.findMoviesByPartialTitle(value);
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
      setAlertMessage('Tell us more! Be sure to complete the review section.');
      return false;
    }
    setNextText('PUBLISH');
    return true;
  };

  const getYear = (dateString: any) => {
    return new Date(dateString).getFullYear().toString();
  };

  const handleSaveReview = () => {
    if (validateReview()) {
      const newReview = {
        type: 'SHORT', // TODO: add state for changing between short and long reviews
        author: username, // TODO: replace with actual user data
        movie: selectedMovie,
        rating,
        text_id: '',
        watch_date: watchDate,
        review_date: new Date(),
        text: reviewText,
      };
      const textId = formatTitleForUrl(newReview);
      newReview.text_id = textId;
      try {
        createReview(newReview, textId);
      } catch (error) {
        console.error('Error creating review:', error);
        setAlertMessage('Failed to create review. Please try again.');
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Modal
      show
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
                    {movie.title} ({getYear(movie.release_date)})
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
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              </div>
            </Col>
            <Col xs={12} md={8} className="right-column">
              <h3 className="movie-title">
                {selectedMovie.title} ({getYear(selectedMovie.release_date)})
              </h3>
              <Form>
                <Form.Group controlId="watchedOn" className="form-group-custom">
                  <Form.Label className="form-label-custom">
                    Watched on
                  </Form.Label>
                  <Form.Control
                    className="date-input"
                    type="date"
                    value={watchDate}
                    onChange={(e) => {
                      setShowAlert(false);
                      setWatchDate(dayjs(e.target.value).format('YYYY-MM-DD'));
                    }}
                  />
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
                      rows={3}
                      placeholder="Tell us what you thought..."
                      value={reviewText}
                      onChange={(e) => {
                        setShowAlert(false);
                        setReviewText(e.target.value);
                      }}
                      isInvalid={showAlert && !reviewText}
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="rating" className="form-group-custom">
                  <Form.Label className="form-label-custom">Rating</Form.Label>
                  <Rating rating={rating} setRating={setRating} />
                </Form.Group>
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
