import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { putAccessToken } from '../../utils/api';

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await api.login({ email, password });
      putAccessToken(token);
      const authUser = await api.getOwnProfile();
      return authUser;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncRegisterUser = createAsyncThunk(
  'authUser/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const user = await api.register({ name, email, password });
      return user;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncPreloadProcess = createAsyncThunk(
  'authUser/preload',
  async () => {
    try {
      const authUser = await api.getOwnProfile();
      return authUser;
    } catch (error) {
      putAccessToken('');
      return null;
    }
  }
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'authUser/logout',
  async () => {
    putAccessToken('');
    return null;
  }
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    unsetAuthUser: () => null
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => action.payload)
      .addCase(asyncPreloadProcess.fulfilled, (state, action) => action.payload)
      .addCase(asyncUnsetAuthUser.fulfilled, () => null);
  }
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
