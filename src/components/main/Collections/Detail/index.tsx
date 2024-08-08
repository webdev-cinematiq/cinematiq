import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../../services/collectionService';
import * as movieClient from '../../../../services/movieService';
import * as userClient from '../../../../services/userService';
import './index.css';

export default function CollectionDetail() {
  const { name, titleId } = useParams<{ name: string; titleId: string }>();
  const [collection, setCollection] = useState<any>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState<any>({});
  const [authorName, setAuthorName] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchCollection = async () => {
    if (!name || !titleId) return;
    const collection = await collectionClient.findCollection(name, titleId);

    setCollection(collection);
    console.log(collection);
    setTitle(collection.title);
    setDescription(collection.description);
    setAuthorName(collection.author);
    setMovies(collection.movies);
  };

  useEffect(() => {
    if (titleId) fetchCollection();
  }, [titleId]);

  const fetchAuthor = async () => {
    if (!authorName) return;
    const author = await userClient.findUserForName(authorName);
    setAuthor(author);
  };

  useEffect(() => {
    if (authorName) fetchAuthor();
  }, [authorName]);

  const redirectToFilmDetail = async (movie: any) => {
    const filmId = await movieClient.findAndUpdateMovie(movie.id, movie);
    console.log('filmId response', filmId);
    const film = await movieClient.findMovieForId(filmId);
    console.log('film response', film);
    navigate(`/film/details/${film.id}`);
  };

  if (!collection || !movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-detail-container">
      {movies[0] && (
        <div
          className="collection-backdrop-container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movies[0].backdrop_path})`,
          }}
        >
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      )}
      <div className="horizontal-line"></div>
      <div className="collection-header">
        <p className="collection-author">
          <img src={author.avatar} alt="Author avatar" />
          collection by&nbsp;
          <span className="collection-author-name">{author.name}</span>
        </p>
      </div>
      <div className="horizontal-line"></div>
      <Container>
        <Row className="collection-header">
          <Col>
            <div className="collection-info">
              <h2 className="collection-title">{title}</h2>
              <p className="collection-description">{description}</p>
            </div>
          </Col>
        </Row>

        <Row className="movie-grid">
          {movies.map((movie: any, index: any) => (
            <Col
              key={movie._id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="movie-item"
            >
              <div className="movie-poster-container">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  fluid
                  className="movie-poster"
                  onClick={() => redirectToFilmDetail(movie)}
                />
                <div className="movie-index">{index + 1}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
