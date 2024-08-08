import React from 'react';
import { Carousel } from 'react-bootstrap';
import CollectionCard from '../Card';
import './index.css';

const CollectionCarousel = ({ collections }: { collections: any[] }) => {
  return (
    <div className="collection-carousel">
      <Carousel>
        {collections.map((collection) => (
          <Carousel.Item key={collection._id}>
            <CollectionCard collection={collection} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CollectionCarousel;
