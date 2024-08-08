
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as movieClient from '../../../services/movieService';
import './Search.css'



export default function Search() {

  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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
  
  // Handle input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const results = await movieClient.findMoviesByPartialTitle(value);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching movie results:', error);
      setSearchResults([]);
    }
  };

  // Handle search button click 
  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      handleSearchChange({ target: { value: searchTerm } } as React.ChangeEvent<HTMLInputElement>);
    }
  };


  
  return (
    <div className="search-page">
      <h1 className="search-heading">SEARCH</h1>
      <p className="search-subtext">Search by movie title</p>

      <div className="search-bar">
      
        <input 
          type="text" 
          className="search-input" 
          placeholder="Enter movie title" 
          value={searchTerm}
          onChange={handleSearchChange}/>
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="separator"></div>
    
      <h1 className="results-heading">RESULTS</h1>
      

      <div className="movie-card">
        {searchResults.length > 0 ? (
          searchResults.map((movie: any) => (
            <Link key={movie._id} to={`/search/${movie._id}`} className="card-link">
              <div className="card">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="poster" 
                />
              </div>
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
