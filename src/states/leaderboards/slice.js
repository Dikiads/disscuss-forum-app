import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncReceiveLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async (_, { rejectWithValue }) => {
    try {
      const leaderboards = await api.getLeaderboards();
      return leaderboards;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncReceiveLeaderboards.fulfilled,
      (state, action) => action.payload
    );
  },
});

export default leaderboardsSlice.reducer;
