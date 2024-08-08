import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as movieClient from '../../../../services/movieService';
import * as userClient from '../../../../services/userService';
import CollectionCarousel from '../../Collections/Carousel';
import ReviewCarousel from '../../Reviews/Carousel';
import { Rating } from '../../Reviews/rating';
import './index.css';

const TMDB_API = process.env.REACT_APP_TMDB_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB = `${TMDB_API}`;
const API_KEY = `api_key=${TMDB_API_KEY}`;

export default function MovieDetail() {
  const { tmdbId } = useParams();
  const [movie, setMovie] = useState<any>({});
  const [genres, setGenres] = useState<any[]>([]);
  const [collections, setCollections] = useState<[]>([]);
  const [reviews, setReviews] = useState<[]>([]);
  const [backdrop, setBackdrop] = useState('');
  const [poster, setPoster] = useState('');

  const fetchMovie = async () => {
    if (!tmdbId) return;

    const url = `${TMDB}/movie/${tmdbId}?${API_KEY}`;

    console.log('url', url);

    fetch(url)
      .then((res: any) => res.json())
      .then((json: any) => {
        // console.log('api response', json);
        setMovie(json);
      })
      .catch((err: any) => console.error('error:' + err));
    const film = await movieClient.findMovie(tmdbId);
    setMovie(film);
    setBackdrop(`https://image.tmdb.org/t/p/original${film.backdrop_path}`);
    setPoster(`https://image.tmdb.org/t/p/w500${film.poster_path}`);
    setGenres(film.genres);
    setCollections(film.collections);
    console.log('api response', collections);
    setReviews(film.reviews);
  };

  useEffect(() => {
    if (tmdbId) fetchMovie();
    console.log('Film', movie);
  }, [tmdbId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail-page">
      <div className="hero-section">
        <img
          className="backdrop"
          src={backdrop}
          alt={`${movie.title} backdrop`}
        />
        <div className="hero-content">
          <img className="poster" src={poster} alt={`${movie.title} poster`} />
          <div className="movie-info">
            <h1>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <p>{genres && genres.map((genre: any) => genre.name).join(', ')}</p>
            <div className="user-score">
              <Rating rating={movie.vote_average / 2} disabled={true} />
            </div>
            <div className="tagline">{movie.tagline}</div>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <Container>
        {collections && (
          <Row className="collections-section">
            <Col>
              <h2>Collections</h2>
              <div className="horizontal-line"></div>
              <CollectionCarousel collections={collections} />
            </Col>
          </Row>
        )}
        {reviews && (
          <Row className="reviews-section">
            <Col>
              <h2>Reviews</h2>
              <div className="horizontal-line"></div>
              <ReviewCarousel reviews={reviews} />
            </Col>
          </Row>
        )}
      </Container>
      <div className="horizontal-line"></div>
    </div>
  );
}
