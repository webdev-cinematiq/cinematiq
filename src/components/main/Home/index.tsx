import { Link } from 'react-router-dom';
import { useState } from "react";
import './Home.css';
import { useSelector } from 'react-redux';
import welcome from './welcome';
import Welcome from './welcome';



export default function Home() {

  const [showMoreMovies, setShowMoreMovies] = useState(false); // collections visible
  const [showMoreCollections, setShowMoreCollections] = useState(false); // collections visible
  const [showMoreReviews, setShowMoreReviews] = useState(false); // reviews visible

  const { currentUser } = useSelector((state: any) => state.accounts);

  const movies = [
    {
      "poster_path": "/images/reacher2016.jpg",
      "overview": "Jack Reacher must uncover the truth behind a major government conspiracy...",
      "release_date": "2016-10-19",
      "title": "Jack Reacher: Never Go Back",
      "genres": ["Action", "Crime", "Thriller"]
    },
    {
      "poster_path": "/images/reacher2012.jpg",
      "overview": "One morning in an ordinary town, five people are shot dead in a seemingly random attack; all evidence points to a single suspect: an ex-military sniper who is quickly brought into custody; Reacher, an enigmatic ex-Army investigator, believes the authorities have the right man but agrees to help the sniper's defense attorney.. However, the more Reacher delves into the case, the less clear-cut it appears.",
      "release_date": "2012-12-19",
      "title": "Jack Reacher",
      "genres": ["Action", "Crime", "Thriller"]
    },
    {
      "poster_path": "/images/dune.jpg",
      "overview": "On the planet known as Dune...",
      "release_date": "2021-10-22",
      "title": "Dune",
      "genres": ["Action", "Sci-Fi", "Thriller"]
    },
    {
      "poster_path": "/images/dune2.jpg",
      "overview": "Returning to the planet known as Dune...",
      "release_date": "2021-11-17",
      "title": "Dune: Part Two",
      "genres": ["Action", "Sci-Fi", "Thriller"]
    }
  ];

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


  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="profile-star full">★</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="profile-star empty">☆</span>);
    }

    return stars;
  };

  const visibleMovies = showMoreMovies ? movies : movies.slice(0, 3);
  const visibleCollections = showMoreCollections ? collections : collections.slice(0, 3);
  const visibleReviews = showMoreReviews ? reviews : reviews.slice(0, 2);


  const toggleShowMoreMovies = () => {
    setShowMoreMovies(!showMoreMovies);
  };

  const toggleShowMoreCollections = () => {
    setShowMoreCollections(!showMoreCollections);
  };

  const toggleShowMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };


  return (
    <div className="home-container">
      <div className="cover-photo">
        <img src="/images/duneMother.jpg" alt="Cover" />
      </div>
      {currentUser && (
        <Welcome />
      )}
      <div id="featured-movies">
        <h2 className="section-header top-header">Featured Movies</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreMovies}>
            {showMoreMovies ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="profile-movie-card">
          {visibleMovies.map((movie, index) => (
            <Link key={index} to={`/search/${index}`} >
              <div key={index} className="card">
                <img src={movie.poster_path} alt={movie.title} />

              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="separator-red"></div>

      <div id="popular-collections">
        <h2 className="section-header top-header">Popular Collections</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreCollections}>
            {showMoreCollections ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="profile-collections-container">
          {visibleCollections.map((collection) => (
            <div key={collection.id} className="profile-collection-card">

              <h3 className="profile-collection-title">{collection.title}</h3>
              <p className="profile-collection-description">{collection.description}</p>

              <div className="profile-collection-images">
                {collection.images.map((image, index) => (
                  <img key={index} src={image} alt={collection.title} className="profile-collection-image" />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>


      <div className="separator-red"></div>

      <div id="popular-reviews">
        <h2 className="section-header top-header">Popular Reviews</h2>

        <div className="show-more-container">
          <button className="show-more-button" onClick={toggleShowMoreReviews}>
            {showMoreReviews ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="profile-reviews-container">
          {visibleReviews.map((review) => (
            <div key={review.id} className="profile-review-card">
              <img src={review.poster} alt={review.movieTitle} className="profile-review-poster" />

              <div className="profile-review-content">

                <div className="profile-review-header">
                  <span className="profile-movie-title">{review.movieTitle}</span>
                  <span className="profile-release-year">({review.releaseYear})</span>
                </div>

                <div className="profile-review-subheader">
                  <span className="profile-review-by">Review by {review.reviewBy}</span>
                  <span className="profile-star-rating">{generateStars(review.starRating)}</span>
                  <span className="profile-watched-date">watched {review.watchedDate}</span>
                </div>

                <div className="profile-review-separator"></div>
                <div className="profile-review-text">{review.reviewText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p className="developer-label">Developed by: </p>
        <p className="developer-info"> Nancy Onyejiaka</p>
        <p className="developer-info"> Maik Katko</p>
        <p className="developer-info"> Sarah Gallant</p>

        <p className="developer-section">All developers are part of cs5610 Website Development, Summer Full 2024.</p>

        <p>&copy; {new Date().getFullYear()} Northeastern University. All rights reserved.</p>
      </footer>





    </div>
  );
}