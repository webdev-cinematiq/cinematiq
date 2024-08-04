import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as movieClient from '../../../../services/movieService';
import * as userClient from '../../../../services/userService';
import CollectionCarousel from '../../Collections/Carousel';
import ReviewCarousel from '../../Reviews/Carousel';
import './index.css';

const TMDB_API = process.env.REACT_APP_TMDB_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB = `${TMDB_API}`;
const API_KEY = `api_key=${TMDB_API_KEY}`;

export default function MovieDetail() {
  const { tmdbId } = useParams();
  const [movie, setMovie] = useState<any>({});
  const [genres, setGenres] = useState<any[]>([]);

  const fetchMovie = async () => {
    if (!tmdbId) return;

    const url = `${TMDB}/movie/${tmdbId}?${API_KEY}`;

    console.log('url', url);

    fetch(url)
      .then((res: any) => res.json())
      .then((json: any) => setMovie(json))
      .catch((err: any) => console.error('error:' + err));

    console.log('Film', movie);

    setGenres(movie.genres);
  };

  useEffect(() => {
    if (tmdbId) fetchMovie();
  }, [tmdbId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail-page">
      <div className="hero-section">
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
        <div className="hero-content">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
          <div className="movie-info">
            <h1>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <p>{genres && genres.map((genre: any) => genre.name).join(', ')}</p>
            <div className="user-score">
              Critic Score: {movie.vote_average * 10}%
            </div>
            <div className="tagline">{movie.tagline}</div>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
