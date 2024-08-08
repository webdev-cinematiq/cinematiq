import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as reviewClient from '../../../../services/reviewService';
import * as userClient from '../../../../services/userService';
import { Rating } from '../../Reviews/Card/rating';
import './index.css';

const ReviewCard = ({ reviewData }: { reviewData: any }) => {
  const [review, setReview] = useState<any>({});
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState('');
  const [author, setAuthor] = useState<any>({});
  const [avatar, setAvatar] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [textPreview, setTextPreview] = useState('');

  const navigate = useNavigate();

  const fetchReview = async () => {
    if (!reviewData) return;
    const response = await reviewClient.findReviewById(reviewData._id);

    setReview(response);
    setText(review.text);
    setRating(review.rating);
    setAuthorName(review.author);
    setWatchDate(review.watch_date);
    if (text && text.length > 50) {
      setTextPreview(`${text.substring(0, 50)}...`);
    } else {
      setTextPreview(text);
    }
  };

  useEffect(() => {
    if (review) fetchReview();
  }, [review]);

  const fetchUser = async () => {
    if (!authorName) return;

    const user = await userClient.findUserForName(authorName);
    setAuthor(user);
    setAvatar(user.avatar);
  };

  useEffect(() => {
    if (author) fetchUser();
  }, [author]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate(`/${authorName}/review/${review._id}`);
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${authorName}`);
  };

  return (
    <div
      key={review._id}
      className="review-carousel-card"
      onClick={handleCardClick}
    >
      <img
        src={
          avatar ||
          `https://avatar.iran.liara.run/username?username=${authorName}`
        }
        alt={`${authorName}-avatar`}
        className="review-carousel-pfp"
        onClick={handleAvatarClick}
      />

      <div className="review-carousel-content">
        <div className="review-carousel--header">
          <div className="review-carousel-subheaderr">
            <span className="review-carousel-author">review by</span>
          </div>
          <span>{authorName}</span>
        </div>

        <div className="review-carousel-subheaderr">
          <span className="review-carousel-rating">
            <Rating rating={rating} />
          </span>
          <span className="review-carousel-watched-date">
            watched {new Date(watchDate).toDateString()}
          </span>
        </div>

        <div className="review-carousel-separator"></div>
        <div className="review-carousel-text">{text && textPreview}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
