import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
};
const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    addCollection: (state, { payload: collection }) => {
      const newCollection: any = {
        _id: new Date().getTime().toString(),
        title: collection.title,
        author: collection.author,
        movies: collection.movies,
        description: collection.description,
        created: collection.created,
      };
      state.collections = [...state.collections, newCollection] as any;
    },
    deleteCollection: (state, { payload: collectionId }) => {
      state.collections = state.collections.filter(
        (c: any) => c._id !== collectionId
      );
    },
    updateCollection: (state, { payload: collection }) => {
      state.collections = state.collections.map((c: any) =>
        c._id === collection._id ? collection : c
      ) as any;
    },
    editCollection: (state, { payload: collectionId }) => {
      state.collections = state.collections.map((c: any) =>
        c._id === collectionId ? { ...c, editing: true } : c
      ) as any;
    },
  },
});
export const {
  addCollection,
  deleteCollection,
  updateCollection,
  editCollection,
  setCollections,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
