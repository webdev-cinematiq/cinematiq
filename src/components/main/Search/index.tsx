import './Search.css'
import MovieCard from './MovieCard'



export default function Search() {
  
  
  return (
    <div className="search-page">
      <h1 className="search-heading">SEARCH</h1>
      <p className="search-subtext">Search by movie title</p>

      <div className="search-bar">
      
        <input type="text" className="search-input" placeholder="Enter movie title" />
        <button className="search-button">Search</button>
      </div>

      <div className="separator"></div>
    
      <h1 className="results-heading">RESULTS</h1>
      
      <MovieCard/>
    
    </div>
  );
}
