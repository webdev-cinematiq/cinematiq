import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;

export const fetchAllComments = async () => {
  const { data } = await axios.get(COMMENTS_API);
  return data;
};

export const findCommentForId = async (commentId: any) => {
  const { data } = await axios.get(`${COMMENTS_API}/${commentId}`);
  return data;
};

export const findCommentsByReview = async (reviewId: string) => {
  const { data } = await axios.get(`${COMMENTS_API}/review/${reviewId}`);
  return data;
};

export const createComment = async (comment: any) => {
  const response = await axios.post(
    `${COMMENTS_API}/comments`,
    comment
  );
  return response.data;
};

export const updateComment = async (comment: any) => {
  const response = await axios.put(`${COMMENTS_API}/${comment._id}`, comment);
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  console.log(commentId)
  const response = await axios.delete(`${COMMENTS_API}/${commentId}`);
  return response.data;
};
