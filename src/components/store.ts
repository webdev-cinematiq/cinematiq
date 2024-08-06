import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './main/Reviews/reducer';
import moviesReducer from './main/Movies/reducer';
import collectionsReducer from './main/Collections/reducer';
import profileReducer from './main/Collections/reducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
    collections: collectionsReducer,
    profiles: profileReducer, 
  },
});

export default store;
