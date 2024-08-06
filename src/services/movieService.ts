import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MOVIES_API = `${REMOTE_SERVER}/api/movies`;

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
