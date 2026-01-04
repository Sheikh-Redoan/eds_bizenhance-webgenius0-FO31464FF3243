import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  isComplete: false,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      state.answers.push(action.payload);
      state.currentQuestion += 1;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    completeQuiz: (state) => {
      state.isComplete = true;
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.answers = [];
      state.isComplete = false;
    }
  },
});

export const { answerQuestion, setScore, completeQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
