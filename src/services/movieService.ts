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

export const findAndUpdateMovieCollections = async (
  tmdbId: any,
  movieData: any,
  collectionId: any
) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/movies/${tmdbId}/collections`,
    { movieData, collectionId }
  );
  return response.data;
};

export const findAndUpdateMovieReviews = async (
  tmdbId: any,
  movieData: any,
  reviewId: any
) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/movies/${tmdbId}/reviews`,
    { movieData, reviewId }
  );
  return response.data;
};

export const findAndUpdateMovie = async (tmdbId: any, movieData: any) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/movies/${tmdbId}`,
    movieData
  );
  return response.data;
};
