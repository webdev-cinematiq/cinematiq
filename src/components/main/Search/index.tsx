
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as movieClient from '../../../services/movieService';
import './Search.css'
const TMDB_API = process.env.REACT_APP_TMDB_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB = `${TMDB_API}`;
const API_KEY = `api_key=${TMDB_API_KEY}`;
 



export default function Search() {

  const [movies, setMovies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();



   // Load search term and results from localStorage when the component mounts
   useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    const storedSearchResults = localStorage.getItem('searchResults');
    
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
    if (storedSearchResults) {
      setSearchResults(JSON.parse(storedSearchResults));
    }
  }, []);

  
  // Handle input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);

      localStorage.removeItem('searchTerm');
      localStorage.removeItem('searchResults');

      return;
    }


    try {
      const url = `${TMDB_API}/search/movie?api_key=${TMDB_API_KEY}&query=${value}&page=1`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);

      // Store search term and results in localStorage
      localStorage.setItem('searchTerm', value);
      localStorage.setItem('searchResults', JSON.stringify(data.results));
      
    } catch (error) {
      console.error('Error fetching movie results:', error);
      setSearchResults([]);
      console.log("search results: ", searchResults);
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
      {/* <p className="search-subtext">Search by movie title</p> */}

      <div className="container search-bar">
        <label htmlFor='search_input_block' className="form-label search-subtext">Search by movie title</label>
        <input 
          id="search_input_block"
          type="text" 
          className="form-control form-control-lg search-input" 
          placeholder="Enter a movie title" 
          value={searchTerm}
          onChange={handleSearchChange}/>
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="separator"></div>
    
      <h1 className="results-heading">RESULTS</h1>
      

      <div className="movie-card">
        {searchResults.length > 0 ? (
          searchResults.map((movie: any) => (
            <Link key={movie._id} to={`/search/${movie.id}`} className="card-link">
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
          <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
}
