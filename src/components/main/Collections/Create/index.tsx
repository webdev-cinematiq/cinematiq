import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ValidationAlert from '../../Alerts/ValidationAlert';
import * as collectionClient from '../../../../services/collectionService';
import * as movieClient from '../../../../services/movieService';
import './index.css';

export default function CollectionCreate() {
  const username = 'nanabanana';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState<any[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();

  const formatTitleForUrl = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w\-]+/g, '');
  };

  const createCollection = async (collection: any, titleId: string) => {
    await collectionClient.createCollection(username, collection);
    await movieClient.updateMovie
    navigate(`/${username}/collection/${titleId}`);
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
    if (selectedMovies.some((selected) => selected._id === movie._id)) {
      setAlertMessage(`${movie.title} is already in the collection`);
      setShowAlert(true);
    } else {
      setSelectedMovies([...selectedMovies, movie]);
      setShowAlert(false);
    }
    console.log(movie.poster);
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleRemoveMovie = (movieId: string) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie._id !== movieId));
  };

  const validateCollection = () => {
    if (title.trim() === '') {
      setAlertMessage(
        'Every collection needs a name. What should we call this one?'
      );
      return false;
    } else if (selectedMovies.length === 0) {
      setAlertMessage('A collection must have at least one film!');
      return false;
    } else {
      return true;
    }
  };

  const handleSaveCollection = async () => {
    if (validateCollection()) {
      const titleId = formatTitleForUrl(title);
      const newCollection = {
        _id: dayjs().format(),
        title: title,
        title_id: titleId,
        author: username,
        movies: selectedMovies,
        description,
        created: new Date(),
      };
      try {
        createCollection(newCollection, titleId);
      } catch (error) {
        console.error('Error creating collection:', error);
        setAlertMessage('Failed to create collection. Please try again.');
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };

  const getYear = (dateString: any) => {
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <div className="create-collection-container">
      <h3>New Collection</h3>
      {showAlert && (
        <ValidationAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <Form>
        <Row>
          <Col className="title-col">
            <Form.Group controlId="collectionName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setShowAlert(false);
                  setTitle(e.target.value);
                }}
                placeholder="Enter collection name"
              />
            </Form.Group>
          </Col>
          <Col className="description-col">
            <Form.Group controlId="collectionDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter collection description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="searchMovie">
          <Form.Label>Add a Film</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter the name of a film..."
            className="search-input"
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
        <div className="movie-previews">
          {selectedMovies.map((movie) => (
            <div key={movie._id} className="movie-preview">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h5>{movie.title}</h5>
              <p>({getYear(movie.release_date)})</p>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleRemoveMovie(movie._id)}
                className="remove-button"
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
        <div className="collection-actions">
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/collections')}
          >
            cancel
          </Button>
          <Button className="btn-create" onClick={handleSaveCollection}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}