import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncReceiveUsers = createAsyncThunk(
  'users/receive',
  async (_, { rejectWithValue }) => {
    try {
      const users = await api.getAllUsers();
      return users;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncReceiveUsers.fulfilled,
      (state, action) => action.payload
    );
  },
});

export default usersSlice.reducer;
