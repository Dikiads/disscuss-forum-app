import { describe, it, expect } from 'vitest';
import isPreloadReducer, { setIsPreload } from './slice';

describe('isPreloadReducers function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the correct state when given setIsPreload action', () => {
    const initialState = true;
    const action = {
      type: setIsPreload.type,
      payload: false,
    };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(false);
  });
});
