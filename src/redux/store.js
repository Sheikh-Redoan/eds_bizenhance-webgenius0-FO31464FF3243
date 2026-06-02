import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "./api/baseApi";
import playerReducer from "../features/player/playerSlice";
import quizReducer from "../features/quiz/quizSlice";
import tutorialReducer from "./slices/tutorialSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    player: playerReducer,
    quiz: quizReducer,
    tutorial: tutorialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
