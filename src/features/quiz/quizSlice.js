import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  selectedAnswerIndex: null,
  isAnswered: false,
  isCorrect: false,
  isComplete: false,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.questions = action.payload;
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.answers = [];
      state.selectedAnswerIndex = null;
      state.isAnswered = false;
      state.isCorrect = false;
      state.isComplete = false;
    },
    selectAnswer: (state, action) => {
      if (state.isAnswered) return;
      state.selectedAnswerIndex = action.payload;
      state.isAnswered = true;
      
      const currentQ = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload === currentQ.correctAnswer;
      state.isCorrect = isCorrect;
      
      if (isCorrect) {
        state.score += 1;
      }
      state.answers.push({
        questionIndex: state.currentQuestionIndex,
        answer: action.payload,
        isCorrect
      });
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.selectedAnswerIndex = null;
        state.isAnswered = false;
        state.isCorrect = false;
      } else {
        state.isComplete = true;
      }
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.answers = [];
      state.selectedAnswerIndex = null;
      state.isAnswered = false;
      state.isCorrect = false;
      state.isComplete = false;
    }
  },
});

export const { startQuiz, selectAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
