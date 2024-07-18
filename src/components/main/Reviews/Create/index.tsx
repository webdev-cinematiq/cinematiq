import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as reviewClient from '../../../../services/reviewService';
import * as movieClient from '../../../../services/movieService';
import { addReview } from '../reducer';
import { setMovies } from '../../Movies/reducer';
import { useDispatch } from 'react-redux';
import './index.css';

export default function CreateReview({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const shortReview = true;

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState('');

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
    setSearchTerm(e.target.value);
    const results = await movieClient.findMoviesForTitle(e.target.value);
    setSearchResults(results);
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleSaveReview = () => {
    const newReview = {
      type: 'SHORT', // TODO: add state for changing between short and long reviews
      author: username, // Replace with actual user data
      movie: selectedMovie,
      rating,
      watch_date: watchDate,
      review_date: new Date(),
      text: reviewText,
    };
    createReview(newReview);
    handleClose();
    navigate('/reviews');
  };

  return (
    <Modal
      show
      onHide={handleClose}
      backdrop="static"
      centered
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Write a Review...</Modal.Title>
      </Modal.Header>
      <Modal.Body className={selectedMovie ? 'expanded-body' : ''}>
        {!selectedMovie ? (
          <Form.Group controlId="searchMovie">
            <Form.Label>Movie Title</Form.Label>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for a movie..."
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
                variant="link"
                className="back-button"
                onClick={() => setSelectedMovie(null)}
              >
                Back
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
                <Form.Group controlId="watchedOn">
                  <Form.Label>Watched on</Form.Label>
                  <Form.Control
                    type="date"
                    value={watchDate}
                    onChange={(e) => setWatchDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {!shortReview && (
                  <Form.Group controlId="reviewText">
                    <Form.Label>Add a review...</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </Form.Group>
                )}
              </Form>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="btn-create" onClick={handleSaveReview}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
