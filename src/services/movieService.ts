import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MOVIE_API = `${REMOTE_SERVER}/api/movies`;

export const findMovieById = async (tmdbId: number): Promise<any> => {
  try {
    const response = await axios.get(`${MOVIE_API}/movie/${tmdbId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const finTVById = async (tmdbId: number): Promise<any> => {
  try {
    const response = await axios.get(`${MOVIE_API}/tv/${tmdbId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
