import React from 'react';
import './index.css';

const CollectionCard = ({ collection }: { collection: any }) => {
  console.log('collection', collection);
  return (
    <div className="collection-card">
      <h3 className="collection-card-title">{collection.title}</h3>
      <p className="collection-card-description">{collection.description}</p>

      <div className="collection-movies">
        {collection.movies.map((movie: any) => (
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
