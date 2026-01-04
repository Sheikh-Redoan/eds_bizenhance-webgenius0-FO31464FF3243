import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import quizReducer from '../features/quiz/quizSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    quiz: quizReducer,
  },
});
