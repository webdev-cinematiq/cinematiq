
import Subheader from './Subheader';
import './Profile.css'
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [showMore, setShowMore] = useState(false); // collections visible
  const [showMoreReviews, setShowMoreReviews] = useState(false); // reviews visible
  const [showMoreFollowers, setShowMoreFollowers] = useState(false); // followers  visible
  const [showMoreFollowing, setShowMoreFollowing] = useState(false); // following visible


  const user = {
    profilePicture: '/images/judi-dench.jpg',
    username: 'nanabanana',
    email: 'nanabanana@gmail.com',
    password: 'movieS!10'
  };

  const collections = [
    {
      id: 1,
      title: "Action Classics",
      description: "A collection of all-time great action movies. Packed with thrilling sequences and high-octane stunts.",
      images: ["/images/reacher2012.jpg", "/images/reacher2016.jpg", "/images/avengersIF.jpg"],
    },
    {
      id: 2,
      title: "Dune Movies",
      description: "A collection of the movies of the planet Dune.",
      images: ["/images/dune.jpg", "/images/dune2.jpg"],
    },
    {
      id: 3,
      title: "Sci-Fi Adventures",
      description: "Explore the universe with a selection of the best science fiction movies.",
      images: ["/images/avatarWoW.jpg", "/images/dune.jpg", "/images/avengersIF.jpg"],
    },
    {
      id: 4,
      title: "More Action/Sci-Fi Adventures",
      description: "Explore the universe with a selection of the best science fiction movies.",
      images: ["/images/avatarWoW.jpg", "/images/dune.jpg", "/images/avengersIF.jpg"],
    }
  ];



  const reviews = [
    {
      id: 1,
      movieTitle: "Dune Part Two",
      releaseYear: 2023,
      reviewBy: "nanabanana",
      starRating: 5,
      watchedDate: "2023-07-20",
      reviewText: "An epic continuation of the Dune saga. Stunning visuals and gripping storytelling.",
      poster: "/images/dune2.jpg"
    },
    {
      id: 2,
      movieTitle: "Dune",
      releaseYear: 2021,
      reviewBy: "nanabanana",
      starRating: 4.5,
      watchedDate: "2021-12-15",
      reviewText: "A fantastic introduction to the world of Dune. Exceptional performances and a faithful adaptation.",
      poster: "/images/dune.jpg"
    },
    {
      id: 3,
      movieTitle: "Inception",
      releaseYear: 2010,
      reviewBy: "nanabanana",
      starRating: 5,
      watchedDate: "2010-07-22",
      reviewText: "A mind-bending masterpiece. Nolan at his best, with a stellar cast and groundbreaking visuals.",
      poster: "/images/inception.jpg"
    }
  ];



  const followers = [
    { id: 1, username: 'JohnO10', image: '/images/mMcconaughey.jpg' },
    { id: 2, username: 'samuelLJ', image: '/images/sLJackson.jpg' },
    { id: 3, username: 'IAlb20', image: '/images/iElba.jpg' },
  ];

  const following = [
    { id: 1, username: 'johnO10', image: '/images/mMcconaughey.jpg' },
    { id: 2, username: 'cinemaLvr07', image: '/images/kWinslet.jpg' },
    { id: 3, username: 'IAlb20', image: '/images/iElba.jpg' },
  ];

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  const visibleCollections = showMore ? collections : collections.slice(0, 3);

  const visibleReviews = showMoreReviews ? reviews : reviews.slice(0, 2);

  const visibleFollowers = showMoreFollowers ? followers : followers.slice(0, 2);

  const visibleFollowing = showMoreFollowing ? following : following.slice(0, 2);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  const toggleShowMoreFollowers = () => {
    setShowMoreFollowers(!showMoreFollowers);
  };

  const toggleShowMoreFollowing = () => {
    setShowMoreFollowing(!showMoreFollowing);
  };



  return (
    <div className="profile-container">

      <Subheader scrollToSection={scrollToSection} toggleEditMode={toggleEditMode} />

      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2 className="username">{user.username}</h2>
      </div><br />


      <div id="user-info" className="user-container">



        {!isEditing && (
          <div className="public-info">
            <div className="row">
              <div className="col">
                <div className="label" >Status</div>
                <div className="value italic" id="profile-status">Critic</div>
              </div>
              <div className="col">
                <div className="label ">Induction Date</div>
                <div className="value italic" id="profile-induction-date">January 5, 2022</div>
              </div>
            </div>
            <div className="separator"></div>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Film</div>
                <div className="value italic" id="profile-film">Inception</div>
              </div>
              <div className="col">
                <div className="label">Favorite Director</div>
                <div className="value italic" id="profile-director">Christopher Nolan</div>
              </div>
            </div> <br />
            <div className="row">
              <div className="col">
                <div className="label">Favorite Genre</div>
                <div className="value italic" id="profile-genre">Sci-Fi</div>
              </div>
              <div className="col">
                <div className="label">Favorite Actor</div>
                <div className="value italic" id="profile-actor">Leonardo DiCaprio</div>
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="rectangle edit-info">
            <div className="edit-reminder-text italic">*denotes a required field</div>
            <div className="row">
              <div className="col">
                <div className="label">Status</div>
                <input type="text" defaultValue="Critic" className="value-input" id="profile-status-edit" />
              </div>
              <div className="col">
                <div className="label ">Induction Date</div>
                <input type="date" defaultValue="2022-01-05" className="value-input" id="profile-induction-edit" />
              </div>
            </div>
            <div className="separator"></div>
            <div className="row">
              <div className="col">
                <div className="label">Favorite Film</div>
                <input type="text" defaultValue="Remember the Titans" className="value-input" id="profile-film-edit" />
              </div>
              <div className="col">
                <div className="label">Favorite Director</div>
                <input type="text" defaultValue="Christopher Nolan" className="value-input" id="profile-director-edit" />
              </div>
            </div> <br />
            <div className="row">
              <div className="col">
                <div className="label">Favorite Genre</div>
                <input type="text" defaultValue="Sci-Fi" className="value-input" id="profile-genre-edit" />
              </div>
              <div className="col">
                <div className="label">Favorite Actor</div>
                <input type="text" defaultValue="Viggo Moretensen" className="value-input" id="profile-actor-edit" />
              </div>
            </div>
            <div className="separator"></div>

            <div className="row">
              <div className="col">
                <div className="label">Username*</div>
                <input type="text" defaultValue={user.username} className="value-input" id="profile-username-edit" />
              </div>
              <div className="col">
                <div className="label">Email*</div>
                <input type="text" defaultValue={user.email} className="value-input" id="profile-email-edit" />
              </div>
            </div> <br />

            <div className="row">
              <div className="col">
                <div className="label">Password*</div>
                <input type="text" defaultValue='****' className="value-input" id="profile-password-edit" />
              </div>
              <div className="col">
                <div className="label">Confirm Password*</div>
                <input type="text" defaultValue='' className="value-input" id="profile-confirm-password-edit" />
              </div>
            </div> <br />



            <button className="save-button" onClick={toggleEditMode}>Save</button>
          </div>




        )}
      </div>


      <div className="separator-red"></div>

      <div id="collections">
        <h2 className="section-header ">Collections</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMore}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="collections-container">
          {visibleCollections.map((collection) => (
            <div key={collection.id} className="collection-card">



              <h3 className="collection-title">{collection.title}</h3>

              <p className="collection-description">{collection.description}</p>

              <div className="collection-images">
                {collection.images.map((image, index) => (
                  <img key={index} src={image} alt={collection.title} className="collection-image" />
                ))}
              </div>

            </div>
          ))}
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
          {visibleReviews.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.poster} alt={review.movieTitle} className="review-poster" />

              <div className="review-content">

                <div className="review-header">
                  <span className="movie-title">{review.movieTitle}</span>
                  <span className="release-year">({review.releaseYear})</span>
                </div>

                <div className="review-subheader">
                  <span className="review-by">Review by {review.reviewBy}</span>
                  <span className="star-rating">{generateStars(review.starRating)}</span>
                  <span className="watched-date">watched {review.watchedDate}</span>
                </div>

                <div className="review-separator"></div>
                <div className="review-text">{review.reviewText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>





      <div className="separator-red"></div>

      <div className="row">
        <div id="followers" className="col">
          <h2 className="section-header">Followers</h2>

          <div className="show-more-container">
            <button className="show-more-button" onClick={toggleShowMoreFollowers}>
              {showMoreFollowers ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <div className="followers-container">
            {visibleFollowers.map((follower) => (
              <div key={follower.id} className={`follower-card ${isEditing ? 'editing' : ''}`}>
                {isEditing && <FaTrash className="trashcan-icon" />}
                <img src={follower.image} alt={follower.username} className="follower-image" />
                <span className="follower-username">{follower.username}</span>
              </div>
            ))}
          </div>
        </div>




        <div id="following" className="col">
          <h2 className="section-header">Following</h2>

          <div className="show-more-container">
            <button className="show-more-button" onClick={toggleShowMoreFollowing}>
              {showMoreFollowing ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <div className="following-container">
            {visibleFollowing.map((follow) => (
              <div key={follow.id} className={`following-card ${isEditing ? 'editing' : ''}`}>
                {isEditing && <FaTrash className="trashcan-icon" />}
                <img src={follow.image} alt={follow.username} className="following-image" />
                <span className="following-username">{follow.username}</span>
              </div>
            ))}
          </div>

        </div>
      </div><br /><br /><br /><br /><br /><br /><br /><br /><br />


    </div>
  );
}