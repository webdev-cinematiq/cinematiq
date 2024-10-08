
import './ProfilePublic.css';
import { FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import * as collectionClient from '../../../services/collectionService';
import * as userClient from '../../../services/userService';
import * as reviewClient from '../../../services/reviewService';
import * as movieClient from '../../../services/movieService';
import Rating from './rating';
import { useSelector } from 'react-redux';

export default function ProfilePublic() {
 
  const { name } = useParams<{ name: string }>(); 
  
 

  const [profile, setProfile] = useState<any>({});
  const [collections, setCollections] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [previewCollections, setPreviewCollections] = useState<any[]>([]);
  const [previewReviews, setPreviewReviews] = useState<any[]>([]);


  const [newUsername, setNewUsername] = useState('');

  const [role, setRole] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reputation, setReputation] = useState('');

  const [rating, setRating] = useState(0);
  const [moviePosters, setMoviePosters] = useState<any>({});


  const [isEditing, setIsEditing] = useState(false);
  const [showMore, setShowMore] = useState(false); // collections visible
  const [showMoreReviews, setShowMoreReviews] = useState(false); // reviews visible


  const fetchProfile = async () => {
    if (!name) return;
    const profile = await userClient.findUserForName(name);
    setProfile(profile);
    setRole(profile.role);
    setJoinDate(profile.join_date);
    setPassword(profile.password);
    setReputation(profile.reputation);
    setNewUsername(profile.name);
  };

  useEffect(() => {
    if (name) fetchProfile();
  }, [name]);

  const fetchCollections = async () => {
    if (!name) return;
    const collections = await collectionClient.findCollectionsByAuthor(name);
    setCollections(collections);
    console.log("collections from db", collections);
    if (showMore) {
      setPreviewCollections([...collections]);
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
    if (!name) return;
    const reviews = await reviewClient.findReviewsByAuthor(name);
    setReviews(reviews);
    console.log('reviews from DB', reviews);



    if (showMoreReviews) {
      setPreviewReviews([...reviews]);
    } else {
      if (reviews.length > 1) {
        console.log("reviews length where >1: ", reviews.length);
        setPreviewReviews(reviews.slice(0, 3));
        console.log("check length of sliced PreviewReviews array where >1: ", previewReviews.length);
        console.log("sliced array of reviews", reviews.slice(0, 3));

      } else {
        console.log("reviews length where <1: ", reviews.length);
        setPreviewReviews([...reviews]);
        console.log("check length of sliced PreviewReviews array where <1: ", previewReviews.length);
      }
    }
    console.log('preview Reviews', previewReviews);



  };


  //update the profile with use of PUT
  const updateProfile = async () => {
    if (!validatePasswords()) return;


    // Create a new profile object with updated info
    const updatedProfile = { ...profile, name: newUsername, password };

    try {
      await userClient.updateUser(updatedProfile);
      alert("Profile updated successfully!");

      // Fetch the updated profile and related data
      await fetchProfile();
      await fetchCollections();
      await fetchReviews();

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };




  useEffect(() => {
    if (name) {
      fetchCollections();
      fetchReviews();
    }
  }, [name, showMore, showMoreReviews]);

  useEffect(() => {
    console.log('Updated previewReviews:', previewReviews);
  }, [previewReviews]);



  if (!profile) {
    return <div>Loading...</div>;
  }

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

  const { avatar, name: username, role: profileRole } = profile;


  const validatePasswords = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };



  const getYear = (dateString: any) => {
    return new Date(dateString).getFullYear().toString();
  };


  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };



  return (
    <div className="profile-container">


      <div className="profile-header">
        <img
          src={avatar || '/images/default-avatar.jpg'}
          alt="Profile"
          className="profile-picture"
        />
        <h2 className="username">{name || 'Username'}</h2>
      </div>

      <div id="user-info" className="user-container">
      
          <div className="public-info">
            <div className="row">
              <div className="col">
                <div className="label">Role</div>
                <div className="value italic" id="profile-status">
                  {role}
                </div>
              </div>
              <div className="col">
                <div className="label ">Join Date</div>
                <div className="value italic" id="profile-induction-date">
                  {formatDate(joinDate)}
                </div>
              </div>
            </div>
            <div className="separator"></div>
            <div className="row">
              <div className="col">
                <div className="label">Reputation</div>
                <div className="value italic" id="profile-film">
                  {reputation}
                </div>
              </div>
              <div className="col">
                {/* empty column */}

              </div>
            </div>{' '}<br />
            <div className="row">
              <div className="col">
                <div className="label">Collections</div>
                <div className="value italic" id="profile-film">
                  {collections.length}
                </div>
              </div>
              <div className="col">
                <div className="label">Reviews</div>
                <div className="value italic" id="profile-director">
                  {reviews.length}
                </div>
              </div>
            </div>{' '}


          </div>

      </div>

      <div className="separator-red"></div>

      <div id="collections">
        <h2 className="section-header ">Collections</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="profile-collections-container">
          {previewCollections &&
            previewCollections.map((c: any) => {

              console.log(`Collection: ${c.title}`, c);
              return (

        
                <div className="profile-collection-card">
                  <h3 className="profile-collection-title">{c.title}</h3>


                  <p className="profile-collection-description">{c.description}</p>


                  <div className="profile-collection-images">
                    {c.movies?.slice(0,3).map((movie: any, index:any) => {


                      console.log(`Movie Object ${index}:`, movie);

                      return (
                        <img
                          key={index}
                          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}` || '/images/default-poster.jpg'}
                          alt={movie.title} className="collection-image" />
                      );
                    })}
                  </div>

                  <Link to={`/${name}/collection/${c.title_id}`} className="view-button-collection">
                    View
                  </Link>
                </div>

              );
            })}
        </div>
      </div>

      <div className="separator-red"></div>

      <div id="reviews">
        <h2 className="section-header">Reviews</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreReviews}>
            {showMoreReviews ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="reviews-container">
          {previewReviews &&
            previewReviews.map((review: any, index) => {
              console.log(`Review ID: ${review._id}, Rating: ${review.rating}`);
              console.log('Review movie:', review.movie);
              return (
                <div key={review._id} className="review-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${review.movie?.poster_path}` || '/images/default-poster.jpg'}
                    alt={review.movie?.title || 'Movie Poster'}
                    className="review-poster"
                  />

                  <div className="review-content">
                    <div className="review-header">
                      <span className="movie-title">{review.movie?.title || "<Unknown Movie>"}</span>
                      <span className="release-year">({getYear(review.movie?.release_date)})</span>
                    </div>

                    <div className="star-container">
                      <span className="star-rating">
                        <Rating rating={review.rating} />
                      </span>
                    </div>

                    <div className="review-subheader">
                      <span className="review-by">
                        Review by {name} on {formatDate(review.review_date)}
                      </span>

                      <span className="watched-date">
                        watched on {formatDate(review.watch_date)}
                      </span>
                    </div>

                    <div className="review-separator"></div>
                    <div className="review-text">{review.text}</div>

                    <Link to={`/${name}/review/${review._id}`} className="view-button">
                      View
                    </Link>
                  </div>
                </div>


              );
            })}
        </div><br /> <br />
      </div>



      <div className="row">

      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
