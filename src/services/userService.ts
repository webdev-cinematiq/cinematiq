import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const fetchAllUsers = async () => {
  const { data } = await axios.get(USERS_API);
  return data;
};

export const findUserForId = async (userId: any) => {
  const { data } = await axios.get(`${USERS_API}/${userId}`);
  return data;
};

export const findUsersForUsername = async (name: string) => {
  const response = await axios.get(`${USERS_API}/${name}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
