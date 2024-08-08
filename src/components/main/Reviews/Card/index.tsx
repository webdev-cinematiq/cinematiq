import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as reviewClient from '../../../../services/reviewService';
import * as movieClient from '../../../../services/movieService';
import * as userClient from '../../../../services/userService';
import { Rating } from '../../Reviews/Card/rating';
import './index.css';

const ReviewCard = ({ reviewData }: { reviewData: any }) => {
  const [review, setReview] = useState<any>({});
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [author, setAuthor] = useState<any>({});
  const [avatar, setAvatar] = useState('');
  const [movie, setMovie] = useState<any>({});
  const [authorName, setAuthorName] = useState('');
  const [reviewPreview, setReviewPreview] = useState<any[]>([]);

  const navigate = useNavigate();

  const getYear = (dateString: any) => {
    return new Date(dateString).getFullYear().toString();
  };

  const fetchReview = async () => {
    if (!reviewData) return;
    const response = await reviewClient.findReviewById(reviewData._id);

    setReview(response);
    setText(review.text);
    setRating(review.rating);
    setAuthorName(review.author);
    setMovie(review.movie);
    setWatchDate(review.watch_date);
    setReleaseDate(review.release_date);
  };

  useEffect(() => {
    if (review) fetchReview();
  }, [review]);

  const fetchUser = async () => {
    if (!authorName) return;

    const user = await userClient.findUserForName(authorName);
    setAuthor(user);
    setAvatar(
      user.avatar ||
        `https://avatar.iran.liara.run/username?username=${authorName}`
    );
  };

  useEffect(() => {
    if (author) fetchUser();
  }, [author]);

  return (
    <div key={review._id} className="review-carousel-card">
      <img src={avatar} alt={review} className="review-carousel-pfp" />

      <div className="review-carousel-content">
        <div className="review-carousel--header">
          <div className="review-carousel-subheaderr">
            <span className="review-carousel-author">review by</span>
          </div>
          <span className="profile-movie-title">{authorName}</span>
        </div>

        <div className="review-carousel-subheaderr">
          <span className="review-carousel-rating">
            <Rating rating={rating} />
          </span>
          <span className="profile-watched-date">
            watched {new Date(watchDate).toDateString()}
          </span>
        </div>

        <div className="profile-review-separator"></div>
        <div className="profile-review-text">
          {text && text.substring(0, 50)}...
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
