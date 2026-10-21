import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeWing: 'guild-gate',
  drafts: {
    posts: {},
    threads: {},
    comments: {},
  },
  savedThreads: [],
  filters: {
    tag: 'All',
    category: 'All',
    search: '',
  },
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setActiveWing: (state, action) => {
      state.activeWing = action.payload;
    },
    saveDraft: (state, action) => {
      const { type, id, data } = action.payload; // type: 'posts' | 'threads'
      if (!state.drafts[type]) state.drafts[type] = {};
      state.drafts[type][id || 'current'] = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
    },
    discardDraft: (state, action) => {
      const { type, id } = action.payload;
      if (state.drafts[type]) {
        delete state.drafts[type][id || 'current'];
      }
    },
    toggleSaveThread: (state, action) => {
      const threadId = action.payload;
      if (state.savedThreads.includes(threadId)) {
        state.savedThreads = state.savedThreads.filter((id) => id !== threadId);
      } else {
        state.savedThreads.push(threadId);
      }
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setActiveWing,
  saveDraft,
  discardDraft,
  toggleSaveThread,
  setFilter,
} = communitySlice.actions;

export const selectActiveWing = (state) => state.community?.activeWing || 'guild-gate';
export const selectDraft = (type, id = 'current') => (state) =>
  state.community?.drafts?.[type]?.[id];
export const selectSavedThreads = (state) => state.community?.savedThreads || [];

export default communitySlice.reducer;
