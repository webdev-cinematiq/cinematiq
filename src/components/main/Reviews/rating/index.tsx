import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './index.css';

export const Star = ({
  filled,
  halfFilled,
  onClick,
  disabled,
}: {
  filled: boolean;
  halfFilled: boolean;
  onClick: () => void;
  disabled: boolean;
}) => (
  <div
    className={`star-container ${disabled ? 'disabled' : ''}`}
    onClick={!disabled ? onClick : undefined}
  >
    {filled ? (
      <FaStar className="star" color="var(--color-star)" />
    ) : halfFilled ? (
      <FaStarHalfAlt className="star" color="var(--color-star)" />
    ) : (
      <FaStar className="star" color="gray" />
    )}
  </div>
);

export function Rating({
  rating,
  setRating,
  disabled = false,
}: {
  rating: number;
  setRating?: (rating: number) => void;
  disabled?: boolean;
}) {
  const handleClick = (value: number) => {
    if (!disabled && setRating) {
      if (rating === value) {
        setRating(value - 0.5);
      } else if (rating === value - 0.5) {
        setRating(0);
      } else {
        setRating(value);
      }
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i + 1 <= Math.floor(rating)}
          halfFilled={
            i + 0.5 === rating ||
            (i + 1 > Math.floor(rating) && i + 0.5 < rating)
          }
          onClick={() => handleClick(i + 1)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
