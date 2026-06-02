import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  currentStep: 0,
  hasCompleted: localStorage.getItem('tutorialCompleted') === 'true',
};

const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    startTutorial: (state) => {
      if (!state.hasCompleted) {
        state.isActive = true;
        state.currentStep = 1;
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    endTutorial: (state) => {
      state.isActive = false;
      state.currentStep = 0;
      state.hasCompleted = true;
      localStorage.setItem('tutorialCompleted', 'true');
    },
  },
});

export const { startTutorial, nextStep, setStep, endTutorial } = tutorialSlice.actions;
export const selectTutorialActive = (state) => state.tutorial.isActive;
export const selectCurrentStep = (state) => state.tutorial.currentStep;
export const selectHasCompleted = (state) => state.tutorial.hasCompleted;
export default tutorialSlice.reducer;
