import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  currentPageIndex: 0,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload;
      state.currentPageIndex = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setPage: (state, action) => {
      state.currentPageIndex = action.payload;
    }
  },
});

export const { setSong, togglePlay, setCurrentTime, setPage } = playerSlice.actions;
export default playerSlice.reducer;
