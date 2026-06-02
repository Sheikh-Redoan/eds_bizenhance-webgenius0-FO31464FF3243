import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, isFirstLogin } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      if (token) {
        localStorage.setItem("token", token);
      }
      
      // Store flag to trigger tutorial after state update
      if (isFirstLogin) {
        localStorage.setItem("shouldStartTutorial", "true");
      }
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsPremium = (state) => state.auth.user?.is_premium || false;
export default authSlice.reducer;
