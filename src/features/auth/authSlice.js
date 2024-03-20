import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  userToken: localStorage.getItem('userToken') || null,
  isLoggedIn: localStorage.getItem('userId') ? true : false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
      state.isLoggedIn = true;
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('userToken', action.payload.userToken);
    },
    clearUser: (state) => {
      state.userId = null;
      state.userToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
