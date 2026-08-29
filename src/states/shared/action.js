import { asyncReceiveUsers } from '../users/slice';
import { asyncReceiveThreads } from '../threads/slice';

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(asyncReceiveUsers());
  dispatch(asyncReceiveThreads());
};
