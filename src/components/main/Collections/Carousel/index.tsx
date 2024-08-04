import React from 'react';
import { Carousel } from 'react-bootstrap';
import './index.css';

const CollectionCarousel = ({ collections }: { collections: any[] }) => {
  if (collections.length === 0) {
    return <p>No collections available.</p>;
  }

  return (
    <div className="collection-carousel">
      <h2>Collections</h2>
      <Carousel>
        {collections.map((collection) => (
          <Carousel.Item key={collection._id}>
            <div className="collection-item">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <div className="movie-thumbnails">
                {collection.movies.map((movie: any) => (
                  <img
                    key={movie._id}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                ))}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CollectionCarousel;
