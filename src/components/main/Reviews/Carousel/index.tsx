import React from 'react';
import { Carousel } from 'react-bootstrap';
import './index.css';

const ReviewCarousel = ({ reviews }: { reviews: any[] }) => {
  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="review-carousel">
      <Carousel>
        {reviews.map((review) => (
          <Carousel.Item key={review._id}>
            <div className="review-item">
              <h3>{review.author}</h3>
              <p>{review.text}</p>
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
