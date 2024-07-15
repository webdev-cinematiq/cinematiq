import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const DISCUSSIONS_API = `${REMOTE_SERVER}/api/discussions`;

export const fetchAllDiscussions = async () => {
  const { data } = await axios.get(DISCUSSIONS_API);
  return data;
};

export const findDiscussionForId = async (discussionId: any) => {
  const { data } = await axios.get(`${DISCUSSIONS_API}/${discussionId}`);
  return data;
};

export const createDiscussion = async (discussion: any) => {
  const response = await axios.post(`${DISCUSSIONS_API}`, discussion);
  return response.data;
};

export const updateDiscussion = async (discussion: any) => {
  const response = await axios.put(
    `${DISCUSSIONS_API}/${discussion._id}`,
    discussion
  );
  return response.data;
};

export const deleteDiscussion = async (discussionId: string) => {
  const response = await axios.delete(`${DISCUSSIONS_API}/${discussionId}`);
  return response.data;
};
