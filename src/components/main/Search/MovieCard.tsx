import { Link } from 'react-router-dom';
import './MovieCard.css';





export default function Search() {
  
    const movieData = [
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
      }
    ];

  
    return (
        <div className="movie-card">
      {movieData.map((movie, index) => (
        <Link key={index} to={`/search/${index}`} className="card-link">
          <div key={index} className="card">
            <img src={movie.poster_path} alt={movie.title} className="poster" />

            {/* <div className="details">
              <h2 className="title">{movie.title}</h2>

              <p className="release-date">
                <span className="label">Released:</span> {movie.release_date}
              </p>
              <p className="genres">
                <span className="label">Genres:</span> {movie.genres.join(', ')}
              </p>


              <p className="overview">{movie.overview}</p>
            </div> */}
            
            
          </div>
        </Link>
      ))}
    </div>
  );


 
}