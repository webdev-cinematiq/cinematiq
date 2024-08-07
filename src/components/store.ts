import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './main/Reviews/reducer';
import moviesReducer from './main/Movies/reducer';
import collectionsReducer from './main/Collections/reducer';
import profileReducer from './main/Collections/reducer';
import accountsReducer from './main/Account/reducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
    collections: collectionsReducer,
    profiles: profileReducer, 
    accounts: accountsReducer
  },
});

export default store;
