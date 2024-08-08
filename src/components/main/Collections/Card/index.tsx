import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../../services/collectionService';
import * as movieClient from '../../../../services/movieService';
import * as userClient from '../../../../services/userService';
import './index.css';

const CollectionCard = ({ collectionData }: { collectionData: any }) => {
  const [collection, setCollection] = useState<any>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState<any>({});
  const [authorName, setAuthorName] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [moviePreview, setMoviePreview] = useState<any[]>([]);
  const [titleId, setTitleId] = useState('');

  const navigate = useNavigate();

  const fetchCollection = async () => {
    if (!collectionData) return;
    const collection = await collectionClient.findCollectionById(
      collectionData._id
    );

    setCollection(collection);
    setTitle(collection.title);
    setDescription(collection.description?.toLowerCase());
    setAuthorName(collection.author);
    setMovies(collection.movies);
    setTitleId(collection.title_id);

    if (movies.length > 3) {
      setMoviePreview(movies.splice(0, 3));
    } else {
      setMoviePreview(movies);
    }
  };

  useEffect(() => {
    if (collection) fetchCollection();
  }, [collection]);

  return (
    <div className="collection-card">
      <h3 className="collection-card-title">{title}</h3>
      <p className="collection-card-description">{description}</p>

      <div className="collection-movies">
        {moviePreview &&
          moviePreview.map((movie: any) => (
            <img
              key={movie._id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="collection-movie-poster"
            />
          ))}
      </div>
    </div>
  );
};

export default CollectionCard;
