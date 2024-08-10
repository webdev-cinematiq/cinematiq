

import React, { useEffect, useState } from 'react';
import './Home.css'; 
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../services/collectionService';
import * as userClient from '../../../services/userService';
import * as reviewClient from '../../../services/reviewService';
import * as movieClient from '../../../services/movieService';
import Rating from '../Profile/rating';
import { useSelector } from 'react-redux';

import welcome from './welcome';
import Welcome from './welcome';




export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accounts);
  const activeUserName = (currentUser?.name);

  console.log("Name of active user: ", activeUserName);

  const [collections, setCollections] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [films, setFilms] = useState<any[]>([]);
  const [previewCollections, setPreviewCollections] = useState<any[]>([]);
  const [previewReviews, setPreviewReviews] = useState<any[]>([]);
  const [previewFilms, setPreviewFilms] = useState<any[]>([]);

  const [showMoreMovies, setShowMoreMovies] = useState(false); // collections visible
  const [showMoreCollections, setShowMoreCollections] = useState(false); // collections visible
  const [showMoreReviews, setShowMoreReviews] = useState(false); // reviews visible


  const fetchFilms = async () => {
   
    const films = await movieClient.fetchAllMovies();

    // Sort movies/films by 'created' field in descending order on vote average
    const sortedFilms = films.sort((a: any, b: any) => b.vote_average - a.vote_average);

    setFilms(sortedFilms);
    console.log("films from db", films);
    if (showMoreMovies) {
      // setPreviewMovies([...movies]); //choose me if want every movie for all users
      setPreviewFilms(films.slice(0, 9)); //edit me to set how many movies under show more
    } else {
      if (films.length > 1) {
        console.log("sliced array of films ", films.slice(0, 3));
        setPreviewFilms(films.slice(0, 3));
      } else {
        setPreviewFilms([...films]);
      }
    }
    console.log('preview films', previewFilms);
  };
  
  const fetchCollections = async () => {
   
    const collections = await collectionClient.findAllCollections();

    // Sort collections by 'created' field in descending order
    const sortedCollections = collections.sort((a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime());

    setCollections(sortedCollections);
    console.log("collections from db", collections);
    if (showMoreCollections) {
      setPreviewCollections([...collections]); //choose me if want every collection for all users
      // setPreviewCollections(collections.slice(0, 9)); //edit me to set how many collections under show more
    } else {
      if (collections.length > 1) {
        console.log("sliced array of collections ", collections.slice(0, 3));
        setPreviewCollections(collections.slice(0, 3));
      } else {
        setPreviewCollections([...collections]);
      }
    }
    console.log('preview collections', previewCollections);
  };

  const fetchReviews = async () => {
  
    const reviews = await reviewClient.findAllReviews();

    // Sort reviews by 'review_date' field in descending order
    const sortedReviews = reviews.sort((a:any, b:any) => new Date(b.review_date).getTime() - new Date(a.review_date).getTime());
    setReviews(sortedReviews);

    setReviews(reviews);
    console.log('reviews from DB', reviews);

   

    if (showMoreReviews) {
      setPreviewReviews([...reviews]); //to see all reviews ever in show more
      // setPreviewReviews(reviews.slice(0, 9)); // to see a certain amount of reviews in show more
    } else {
      if (reviews.length > 1) {
        console.log("reviews length where >1: ", reviews.length);
        setPreviewReviews(reviews.slice(0, 3));
        console.log("check length of sliced PreviewReviews array where >1: ", previewReviews.length);
        console.log("sliced array of reviews",reviews.slice(0, 3));

      } else {
        console.log("reviews length where <1: ", reviews.length);
        setPreviewReviews([...reviews]);
        console.log("check length of sliced PreviewReviews array where <1: ", previewReviews.length);
      }
    }
    console.log('preview Reviews', previewReviews);

    
  
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




  const toggleShowMoreMovies = () => {
    setShowMoreMovies(!showMoreMovies);
  };

  const toggleShowMoreCollections = () => {
    setShowMoreCollections(!showMoreCollections);
  };

  const toggleShowMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  useEffect(() => {
      fetchFilms();
      fetchCollections();
      fetchReviews();
    
  }, [showMoreMovies, showMoreCollections, showMoreReviews]);


  return (
    <div className="home-container">
     

      {/* Header Section */}
      <div className="cover-photo">
        <img src="/images/duneMother.jpg" alt="Cover" />
      </div>
     

      
      {currentUser && (
        <Welcome />
      )}

     {/* Films Section */}
      <div id="featured-movies">
        <h2 className="section-header-home top-header-home">Featured Movies</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreMovies}>
            {showMoreMovies ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="home-movie-card">
        {previewFilms &&
            previewFilms.map((film: any, index) => {
              console.log(`Film ID: ${film._id}, Film Vote Avg: ${film.vote_average}`);
              
              return(
          
            <Link key={index} to={`/film/details/${film.id}`} >
              <div key={index} className="card">

                <img 
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}` || '/images/default-poster.jpg'} 
                alt={film.title} 
                />                
                
              </div>
           </Link>
            );
          })}

        </div>
      </div>

      <div className="separator-red"></div>
      
      
      {/* Collections Section */}
      <div id="popular-collections">
        <h2 className="section-header top-header">Popular Collections</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreCollections}>
            {showMoreCollections ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="home-collections-container">
          {previewCollections &&
              previewCollections.map((c: any) => {

                console.log(`Collection: ${c.title}`, c);
                return (
               
                  <div key={c.id} className="home-collection-card">

                    <h3 className="home-collection-title">{c.title}</h3>
                    <p className="home-collection-description">{c.description}</p>

                    <div className="home-collection-images">
                     
                      {c.movies?.slice(0,3).map((movie: any, index:any) => {

                        console.log(`Movie Object ${index}:`, movie);

                        return(
                          <img 
                            key={index} 
                            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}` || '/images/default-poster.jpg'}  
                            alt={movie.title} className="collection-image" />
                        );
                        })}
                    </div>

                    <Link to={`/${c.author}/collection/${c.title_id}`} className="home-view-button-collection">
                      View
                    </Link>

                  </div>
                );
            })}
        </div>
      </div>

      <div className="separator-red"></div>


      {/* Reviews Section */}
      <div id="popular-reviews">
        <h2 className="section-header top-header">Popular Reviews</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreReviews}>
            {showMoreReviews ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="home-reviews-container">
       
          {previewReviews &&
            previewReviews.map((review: any, index) => {
              console.log(`Review ID: ${review._id}, Rating: ${review.rating}`);
              console.log('Review movie:', review.movie);
              return(
                <div key={review.id} className="home-review-card">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${review.movie?.poster_path}` || '/images/default-poster.jpg'} 
                    alt={review.movie?.title || 'Movie Poster'}
                    className="home-review-poster" />

                  <div className="home-review-content">

                    <div className="home-review-header">
                      <span className="home-movie-title">{review.movie?.title || "<Unknown Movie>"}</span>
                      <span className="home-release-year">({getYear(review.movie?.release_date)})</span>
                    </div>

                    <div className="home-star-container">                    
                      <span className="home-star-rating">
                        <Rating rating={review.rating}  />                      
                      </span>
                    </div>

                    <div className="home-review-subheader">
                      <span className="home-review-by">
                        Review by {review.author} on {formatDate(review.review_date)}
                      </span>
                  
                      <span className="home-watched-date">watched on {formatDate(review.watch_date)}</span>
                    </div>

                    <div className="home-review-separator"></div>
                    <div className="home-review-text">{review.text}</div>

                    <Link to={`/${review.author}/review/${review._id}`} className="home-view-button">
                        View
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>



      {/* Footer Section */}
      <footer className="footer">
        <p className="developer-label">Developed by: </p>
        <p className="developer-info"> Nancy Onyejiaka</p>
        <p className="developer-info"> Maik Katko</p>
        <p className="developer-info"> Sarah Gallant</p>

        <p className="developer-section">All developers are part of cs5610 Website Development, Summer Full 2024.</p><br/>

        <p>Github links for development environment:</p>
        <p>
          <a href="https://github.com/webdev-cinematiq/cinematiq.git" target="_blank" rel="noopener noreferrer">
            React project
          </a>
        </p>
        <p>
          <a href="https://github.com/webdev-cinematiq/cinematiq-server.git" target="_blank" rel="noopener noreferrer">
            Node server
          </a>
        </p><br/>

        <p>&copy; {new Date().getFullYear()} Northeastern University. All rights reserved.</p>
      </footer>





    </div>
  );
}