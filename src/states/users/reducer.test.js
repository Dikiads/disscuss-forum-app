import { describe, it, expect } from 'vitest';
import usersReducer, { asyncReceiveUsers } from './slice';

describe('usersReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN' };
        const nextState = usersReducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it('should return the users when given asyncReceiveUsers.fulfilled action', () => {
        const initialState = [];
        const action = {
            type: asyncReceiveUsers.fulfilled.type,
            payload: [
                { id: 'user-1', name: 'User 1' },
            ]
        };
        const nextState = usersReducer(initialState, action);
        expect(nextState).toEqual(action.payload);
    });
});
