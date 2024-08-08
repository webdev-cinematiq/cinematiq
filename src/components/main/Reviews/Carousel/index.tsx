import React from 'react';
import { Carousel } from 'react-bootstrap';
import ReviewCard from '../Card/';
import './index.css';

const ReviewCarousel = ({ reviews }: { reviews: any[] }) => {
  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="review-carousel">
      <Carousel>
        {reviews &&
          reviews.map((review) => (
            <Carousel.Item key={review._id}>
              <ReviewCard reviewData={review} />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
