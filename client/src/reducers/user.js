import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },

    registrationDone: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registrationDone,
} = userSlice.actions;
export default userSlice.reducer;
