import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const PROFILES_API = `${REMOTE_SERVER}/api/profiles`;

export const fetchAllProfiles = async () => {
  const { data } = await axios.get(PROFILES_API);
  return data;
};

export const findProfileForId = async (profileId: any) => {
  const { data } = await axios.get(`${PROFILES_API}/${profileId}`);
  return data;
};

export const findProfileForUsername = async (name: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/${name}/profile`);
  return response.data;
};

export const createProfile = async (name: string, profile: any) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/${name}/profile`,
    profile
  );
  return response.data;
};

export const updateProfile = async (name: string, profile: any) => {
  const response = await axios.put(`${PROFILES_API}/${profile._id}`, profile);
  return response.data;
};

export const deleteProfile = async (profile: any) => {
  const response = await axios.delete(`${PROFILES_API}/${profile._id}`);
  return response.data;
};
