import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [],
};
const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profiles = action.payload;
    },
    updateProfile: (state, { payload: profile }) => {
      state.profiles = state.profiles.map((u: any) =>
        u._id === profile._id ? profile : u
      ) as any;
    },
    editProfile: (state, { payload: userId }) => {
      state.profiles = state.profiles.map((u: any) =>
        u._id === userId ? { ...u, editing: true } : u
      ) as any;
    },
  },
});
export const {

  updateProfile,
  editProfile,
  setProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
