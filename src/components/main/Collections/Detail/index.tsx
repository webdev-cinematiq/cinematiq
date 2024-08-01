import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../../services/collectionService';
import * as movieClient from '../../../../services/movieService';
import './index.css';

export default function CollectionDetail() {
  const { name, titleId } = useParams<{ name: string; titleId: string }>();
  const [collection, setCollection] = useState<any>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  const populateMovies = async () => {
    if (!collection) return;
    collection.movies.map(async (id: any) => {
      const film = await movieClient.findMovieForId(id);
      setMovies([...movies, film]);
    });
  };

  const fetchCollection = async () => {
    if (!name || !titleId) return;
    const collection = await collectionClient.findCollection(name, titleId);

    setCollection(collection);
    setTitle(collection.title);
    setDescription(collection.description);
    setAuthor(collection.author);
    populateMovies();
  };

  useEffect(() => {
    if (titleId) fetchCollection();
  }, [titleId]);

  if (!collection || !collection.movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-detail-container">
      {movies[0] && (
        <div
          className="collection-backdrop-container"
          style={{ backgroundImage: `url(${movies[0].backdrop})` }}
        >
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      )}
      <div className="horizontal-line"></div>
      <div className="collection-header">
        <p className="collection-author">
          <img src={author} alt="Author avatar" />
          collection by&nbsp;
          <span className="collection-author-name">{author}</span>
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
                <Image src={movie.poster} fluid className="movie-poster" />
                <div className="movie-index">{index + 1}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
