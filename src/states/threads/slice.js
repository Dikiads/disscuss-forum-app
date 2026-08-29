import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncReceiveThreads = createAsyncThunk(
  'threads/receive',
  async (_, { rejectWithValue }) => {
    try {
      const threads = await api.getAllThreads();
      return threads;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAddThread = createAsyncThunk(
  'threads/add',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const thread = await api.createThread({ title, body, category });
      return thread;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    toggleUpVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const threadIndex = state.findIndex((t) => t.id === threadId);
      if (threadIndex !== -1) {
        const thread = state[threadIndex];
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const threadIndex = state.findIndex((t) => t.id === threadId);
      if (threadIndex !== -1) {
        const thread = state[threadIndex];
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleNeutralVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      const threadIndex = state.findIndex((t) => t.id === threadId);
      if (threadIndex !== -1) {
        const thread = state[threadIndex];
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => action.payload)
      .addCase(asyncAddThread.fulfilled, (state, action) => [action.payload, ...state]);
  }
});

export const { toggleUpVoteThread, toggleDownVoteThread, toggleNeutralVoteThread } = threadsSlice.actions;

export const asyncToggleUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
  try {
    await api.upVoteThread(threadId);
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
  }
};

export const asyncToggleDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
  try {
    await api.downVoteThread(threadId);
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
  }
};

export const asyncToggleNeutralVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleNeutralVoteThread({ threadId, userId: authUser.id }));
  try {
    await api.neutralVoteThread(threadId);
  } catch (error) {
    alert(error.message);
    dispatch(asyncReceiveThreads());
  }
};

export default threadsSlice.reducer;
