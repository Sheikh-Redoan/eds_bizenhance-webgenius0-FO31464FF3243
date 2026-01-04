import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  subscription: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.subscription = null;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    }
  },
});

export const { login, logout, setSubscription } = authSlice.actions;
export default authSlice.reducer;
