import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId, { rejectWithValue }) => {
    try {
      const threadDetail = await api.getDetailThread(threadId);
      return threadDetail;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const comment = await api.createComment({ threadId, content });
      return comment;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncClearThreadDetail = createAsyncThunk(
  'threadDetail/clear',
  async () => null
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    toggleUpVoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      if (state.upVotesBy.includes(userId)) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      } else {
        state.upVotesBy.push(userId);
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      }
    },
    toggleDownVoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      if (state.downVotesBy.includes(userId)) {
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      } else {
        state.downVotesBy.push(userId);
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      }
    },
    toggleNeutralVoteThreadDetail: (state, action) => {
      const { userId } = action.payload;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
    },
    toggleUpVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        if (comment.upVotesBy.includes(userId)) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        } else {
          comment.upVotesBy.push(userId);
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        if (comment.downVotesBy.includes(userId)) {
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        } else {
          comment.downVotesBy.push(userId);
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleNeutralVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => action.payload)
      .addCase(asyncClearThreadDetail.fulfilled, () => null)
      .addCase(asyncAddComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  }
});

export const {
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  toggleNeutralVoteThreadDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
  toggleNeutralVoteComment
} = threadDetailSlice.actions;

export const asyncToggleUpVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleUpVoteThreadDetail({ userId: authUser.id }));
  try {
    await api.upVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteThreadDetail({ userId: authUser.id }));
  }
};

export const asyncToggleDownVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleDownVoteThreadDetail({ userId: authUser.id }));
  try {
    await api.downVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteThreadDetail({ userId: authUser.id }));
  }
};

export const asyncToggleNeutralVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleNeutralVoteThreadDetail({ userId: authUser.id }));
  try {
    await api.neutralVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
    dispatch(asyncReceiveThreadDetail(threadDetail.id));
  }
};

export const asyncToggleUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
  try {
    await api.upVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));
  }
};

export const asyncToggleDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
  try {
    await api.downVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));
  }
};

export const asyncToggleNeutralVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Harap login terlebih dahulu');
    return;
  }
  dispatch(toggleNeutralVoteComment({ commentId, userId: authUser.id }));
  try {
    await api.neutralVoteComment(threadDetail.id, commentId);
  } catch (error) {
    alert(error.message);
    dispatch(asyncReceiveThreadDetail(threadDetail.id));
  }
};

export default threadDetailSlice.reducer;
