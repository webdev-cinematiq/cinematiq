import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
};
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    addReview: (state, { payload: review }) => {
      const newReview: any = {
        _id: new Date().getTime().toString(),
        type: review.type,
        author: review.author,
        movie: review.movie,
        rating: review.rating,
        watch_date: review.watch_date,
        review_date: review.review_date,
      };
      state.reviews = [...state.reviews, newReview] as any;
    },
    deleteReview: (state, { payload: reviewId }) => {
      state.reviews = state.reviews.filter((r: any) => r._id !== reviewId);
    },
    updateReview: (state, { payload: review }) => {
      state.reviews = state.reviews.map((r: any) =>
        r._id === review._id ? review : r
      ) as any;
    },
    editReview: (state, { payload: reviewId }) => {
      state.reviews = state.reviews.map((r: any) =>
        r._id === reviewId ? { ...r, editing: true } : r
      ) as any;
    },
  },
});
export const { addReview, deleteReview, updateReview, editReview, setReviews } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;
