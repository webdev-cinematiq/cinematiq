import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as userClient from '../../../../services/userService';
import * as reviewClient from '../../../../services/reviewService';
import * as movieClient from '../../../../services/movieService';
import './reviewDetail.css'; 
import Rating from  '../../Profile/rating';

const TMDB_API = process.env.REACT_APP_TMDB_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB = `${TMDB_API}`;
const API_KEY = `api_key=${TMDB_API_KEY}`;


export default function Reviews() {
  const { name, rid } = useParams<{ name: string; rid: string }>();
  console.log("Name, review detail page: ", name);
  console.log("rid, review detail page: ",rid);
  const [review, setReview] = useState<any>({});

  const [author, setAuthor] = useState<any>({});
  const [authorName, setAuthorName] = useState('');
 
  const [movie, setMovie] = useState<any>({});
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');


  const navigate = useNavigate();

  const fetchReview = async () => {
    if (!name || !rid) return;

    console.log("2 Name, review detail page: ", name);
    console.log("2 rid, review detail page: ",rid);
    const review = await reviewClient.findReviewById(rid);
    console.log("fetched review: ", review);
    setReview(review);
    setMovie(review.movie);
    setRating(review.rating);
    setAuthorName(review.author);
    setText(review.text);
    
  };

  useEffect(() => {
    if (rid) fetchReview();
  }, [rid]);

  const fetchAuthor = async () => {
    if (!authorName) return;
    const author = await userClient.findUserForName(authorName);
    setAuthor(author);
  };

  useEffect(() => {
    if (authorName) fetchAuthor();
  }, [authorName]);

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${authorName}`);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Ensure date is interpreted as UTC
    };
    return date.toLocaleDateString('en-US', options);
  }

  const getYear = (dateString: any) => {
    return new Date(dateString).getFullYear().toString();
  };

  console.log("Review, Review Detail Page: ",review);
  console.log("Movie, Review Detail Page: ",movie);

  return (
    <div>
      <div className="hero-section-reviews">
        {movie && (
          <div       
            className="review-backdrop-container"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            }}
          >


          <div className="fade-left"></div>
          <div className="fade-right"></div>   
          <div className="movie-info-reviews">
            <h1>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
          </div>
              
          </div>
        )}
       </div>

     <div className="horizontal-line"></div>
     <div className="review-detail-header">
     {movie && (
        <div >     
          {/* <span className="movie-title">{review.movie?.title || "<Unknown Movie>"}</span> */}
          {/* <span className="release-year "> ({getYear(review.movie?.release_date)})</span> */}
          <span className="star-rating">
            <Rating rating={review.rating}  />                      
          </span>
        </div>

        )}
    
        <div className="review-author-section">
          <div className="review-author" onClick={handleUserClick}>
            <img src={author.avatar} alt="Author avatar" />
            <span className="review-author-name">{author.name}</span>&nbsp;
            <span> reviewed</span>
            <span className="review-date">on {formatDate(review.review_date)}</span>
          </div>
          <div className="review-watched">
            watched on {formatDate(review.watch_date)}
          </div>
        </div>
        <div className="review-text">
          <p>{text}</p>
        </div>
      

      </div>
      <div className="horizontal-line"></div><br/><br/><br/>


    </div>

         
  );
}
