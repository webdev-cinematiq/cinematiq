// src/components/Reviews/Rating.tsx

import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './rating.css';

interface RatingProps {
  rating: number;
  maxRating?: number; // Optional: max rating value, default is 5
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="star" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star" />);
    } else {
      stars.push(<FaRegStar key={i} className="star" />);
    }
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
