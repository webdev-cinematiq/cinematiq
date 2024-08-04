import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MOVIES_API = `${REMOTE_SERVER}/api/movies`;

const TMDB_API = process.env.REACT_APP_TMDB_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB = `${TMDB_API}`;
const API_KEY = `api_key=${TMDB_API_KEY}`;

export const updateMovie = async (collection: any) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/${collection.author}/collections/${collection._id}`,
    collection
  );
  return response.data;
};

export const fetchAllMovies = async () => {
  const { data } = await axios.get(MOVIES_API);
  return data;
};

export const findMovieForId = async (movieId: any) => {
  const { data } = await axios.get(`${MOVIES_API}/${movieId}`);
  return data;
};

export const findMoviesForTitle = async (title: string) => {
  const { data } = await axios.get(`${MOVIES_API}/${title}`);
  return data;
};

export const findMoviesByPartialTitle = async (title: string) => {
  const response = await axios.get(`${MOVIES_API}?title=${title}`);
  return response.data;
};

export const findMovieDetails = async (tmdbId: any) => {
  try {
    const url = `${TMDB}/movie/${tmdbId}?${API_KEY}`;
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error('Error fetching movie details:', err);
    throw err;
  }
};

// export const findMovieDetails = async (tmdbId: any) => {
//   const url = `${TMDB}/movie/${tmdbId}?${API_KEY}`;
//   const data = await fetch(url)
//     .then((res: any) => res.json())
//     .catch((err: any) => console.error('error:' + err));
//   return data;

//   // const { data } = await axios.get(`${TMDB}/movie/${tmdbId}?${API_KEY}`);
//   // console.log(data);
//   // return data;
// };

/**
 * Documentation for searching through the TMDB API can be found here:
 * https://developer.themoviedb.org/reference/search-movie
 *
 * @param searchTerm search input from user
 * @returns a JSON object (see documentation)
 */
export const searchMoviesByPartialTitle = async (searchTerm: string) => {
  const { data } = await axios.get(
    `${TMDB}/search/movie?${API_KEY}&query=${searchTerm}`
  );
  return data;
};
