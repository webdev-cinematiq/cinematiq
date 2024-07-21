import axios from 'axios';
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COLLECTIONS_API = `${REMOTE_SERVER}/api/collections`;

export const fetchAllCollections = async () => {
  const { data } = await axios.get(COLLECTIONS_API);
  return data;
};

export const findCollectionForId = async (collectionId: any) => {
  const { data } = await axios.get(`${COLLECTIONS_API}/${collectionId}`);
  return data;
};

export const findCollectionsForTitle = async (title: string) => {
  const response = await axios.get(`${COLLECTIONS_API}/${title}`);
  return response.data;
};

export const findCollectionsForUserName = async (username: string) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/${username}/collections`
  );
  return response.data;
};

export const findUserCollectionByTitle = async (
  username: string,
  titleId: string
) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/${username}/collection/${titleId}`
  );
  return response.data;
};

export const createCollection = async (name: string, collection: any) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/${name}/collection`,
    collection
  );
  return response.data;
};

export const updateCollection = async (username: string, collection: any) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/${username}/collections/${collection._id}`,
    collection
  );
  return response.data;
};

export const deleteCollection = async (
  username: string,
  collectionId: string
) => {
  const response = await axios.delete(
    `${REMOTE_SERVER}/api/${username}/collections/${collectionId}`
  );
  return response.data;
};
