import { describe, it, expect, vi } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';

describe('asyncPopulateUsersAndThreads thunk', () => {
    it('should dispatch asyncReceiveUsers and asyncReceiveThreads', () => {
        const dispatch = vi.fn();

        // Simulate thunk action
        const thunk = asyncPopulateUsersAndThreads();
        thunk(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});
