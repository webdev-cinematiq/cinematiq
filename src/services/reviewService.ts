import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const REVIEWS_API = `${REMOTE_SERVER}/api/reviews`;

export const createReview = async (name: string, review: any) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/${name}/reviews`,
    review
  );
  return response.data;
};

export const findAllReviews = async () => {
  const { data } = await axios.get(REVIEWS_API);
  return data;
};

export const findReviewForId = async (reviewId: any) => {
  const { data } = await axios.get(`${REVIEWS_API}/${reviewId}`);
  return data;
};

export const findReviewsBtyAuthor = async (name: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/${name}/reviews`);
  return response.data;
};

export const findReview = async (author: any, titleId: any) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/${author}/review/${titleId}`
  );
  return response.data;
};

export const updateReview = async (name: string, review: any) => {
  const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
  return response.data;
};

export const deleteReview = async (review: any) => {
  const response = await axios.delete(`${REVIEWS_API}/${review._id}`);
  return response.data;
};
