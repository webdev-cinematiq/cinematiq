import axios from 'axios';
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const COLLECTIONS_API = `${REMOTE_SERVER}/api/collections`;

export const createCollection = async (author: any, collection: any) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/${author}/collections`,
    collection
  );
  return response.data;
};

export const findAllCollections = async () => {
  const response = await axios.get(COLLECTIONS_API);
  return response.data;
};

export const findCollectionsByTitle = async (title: string) => {
  const response = await axios.get(`${COLLECTIONS_API}/${title}`);
  return response.data;
};

export const findCollectionsByAuthor = async (author: string) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/${author}/collections`
  );
  return response.data;
};

export const findCollectionById = async (collectionId: string) => {
  const response = await axios.get(
    `${COLLECTIONS_API}/details/${collectionId}`
  );
  return response.data;
};

export const findCollectionsByPartialTitle = async (title: string) => {
  const response = await axios.get(`${COLLECTIONS_API}?title=${title}`);
  return response.data;
};

export const findCollectionsByMovie = async (tmdbId: any) => {
  const response = await axios.get(
    `${COLLECTIONS_API}/api/collections/film/${tmdbId}`
  );
  return response.data;
};

export const findCollection = async (author: any, titleId: any) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/${author}/collection/${titleId}`
  );
  return response.data;
};

export const deleteCollection = async (author: any, collectionId: string) => {
  const response = await axios.delete(
    `${REMOTE_SERVER}/api/${author}/collections/${collectionId}`
  );
  return response.data;
};

export const updateCollection = async (collection: any) => {
  const response = await axios.put(
    `${REMOTE_SERVER}/api/${collection.author}/collections/${collection._id}`,
    collection
  );
  return response.data;
};
