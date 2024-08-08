import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './index.css';

export const Star = ({
  filled,
  halfFilled,
}: {
  filled: boolean;
  halfFilled: boolean;
}) => (
  <div className="review-star-container">
    {filled ? (
      <FaStar className="review-star" color="var(--color-star)" />
    ) : halfFilled ? (
      <FaStarHalfAlt className="review-star" color="var(--color-star)" />
    ) : (
      <FaStar className="review-star" color="gray" />
    )}
  </div>
);

export function Rating({ rating }: { rating: number }) {
  return (
    <div className="review-star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i + 1 <= Math.floor(rating)}
          halfFilled={
            i + 0.5 === rating ||
            (i + 1 > Math.floor(rating) && i + 0.5 < rating)
          }
        />
      ))}
    </div>
  );
}
