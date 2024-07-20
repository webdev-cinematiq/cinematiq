import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './index.css';

const Star = ({
  filled,
  halfFilled,
  onClick,
}: {
  filled: boolean;
  halfFilled: boolean;
  onClick: () => void;
}) => (
  <div className="star-container" onClick={onClick}>
    {filled ? (
      <FaStar className="star" color="var(--color-star)" />
    ) : halfFilled ? (
      <FaStarHalfAlt className="star" color="var(--color-star)" />
    ) : (
      <FaStar className="star" color="gray" />
    )}
  </div>
);

export default function Rating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) {
  const handleClick = (value: number) => {
    if (rating === value) {
      setRating(value - 0.5);
    } else if (rating === value - 0.5) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i + 1 <= rating}
          halfFilled={i + 0.5 === rating}
          onClick={() => handleClick(i + 1)}
        />
      ))}
    </div>
  );
}
