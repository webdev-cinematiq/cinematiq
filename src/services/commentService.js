import { REACT_APP_API_URL, api } from './config';

const COMMENT_API_URL = `${REACT_APP_API_URL}/comment`;

const addComment = async (did, comment) => {
  const data = { pid: did, comment: comment };
  const res = await api.post(`${COMMENT_API_URL}/addComment`, data);

  return res.data;
};

export { addComment };
