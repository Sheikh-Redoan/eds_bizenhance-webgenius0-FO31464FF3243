import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentPageIndex: 0,
  autoFlip: true,
  volume: 1,
  isMuted: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload;
      state.currentPageIndex = 0;
      state.currentTime = 0;
      state.isPlaying = false;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setPage: (state, action) => {
      state.currentPageIndex = action.payload;
    },
    toggleAutoFlip: (state) => {
      state.autoFlip = !state.autoFlip;
    },setVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },  setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { 
  setSong, 
  togglePlay, 
  setIsPlaying, 
  setCurrentTime, 
  setDuration, 
  setPage, 
  toggleAutoFlip ,
  setCurrentSong,
  setVolume,
  toggleMute,
} = playerSlice.actions;

export default playerSlice.reducer;