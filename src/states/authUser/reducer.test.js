import { describe, it, expect } from 'vitest';
import authUserReducer, { setAuthUser, unsetAuthUser } from './slice';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser object when given setAuthUser action', () => {
    const initialState = null;
    const action = {
      type: setAuthUser.type,
      payload: { id: 1, name: 'User 1' },
    };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload);
  });

  it('should return null when given unsetAuthUser action', () => {
    const initialState = { id: 1, name: 'User 1' };
    const action = { type: unsetAuthUser.type };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(null);
  });
});
