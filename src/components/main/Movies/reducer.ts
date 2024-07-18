import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovie: (state, { payload: movie }) => {
      const newMovie: any = {
        _id: new Date().getTime().toString(),
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        rating: movie.rating,
        release_date: movie.release_date,
        poster: movie.poster,
      };
      state.movies = [...state.movies, newMovie] as any;
    },
    deleteMovie: (state, { payload: movieId }) => {
      state.movies = state.movies.filter((r: any) => r._id !== movieId);
    },
    updateMovie: (state, { payload: movie }) => {
      state.movies = state.movies.map((r: any) =>
        r._id === movie._id ? movie : r
      ) as any;
    },
    editMovie: (state, { payload: movieId }) => {
      state.movies = state.movies.map((r: any) =>
        r._id === movieId ? { ...r, editing: true } : r
      ) as any;
    },
  },
});
export const { addMovie, deleteMovie, updateMovie, editMovie, setMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
