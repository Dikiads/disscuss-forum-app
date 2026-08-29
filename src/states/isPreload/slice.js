import { createSlice } from '@reduxjs/toolkit';
import { asyncPreloadProcess } from '../authUser/slice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPreloadProcess.fulfilled, () => false);
  },
});

export const { setIsPreload } = isPreloadSlice.actions;
export default isPreloadSlice.reducer;
