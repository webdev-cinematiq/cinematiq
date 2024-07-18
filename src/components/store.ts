import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './main/Reviews/reducer';
import moviesReducer from './main/Movies/reducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
  },
});

export default store;
