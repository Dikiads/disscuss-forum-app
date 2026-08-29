import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncToggleNeutralVoteThread, toggleNeutralVoteThread, asyncReceiveThreads } from './slice';

describe('asyncToggleNeutralVoteThread thunk', () => {
    beforeEach(() => {
        window.alert = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should abort if unauthenticated', async () => {
        const dispatch = vi.fn();
        const getState = () => ({ authUser: null });

        await asyncToggleNeutralVoteThread('thread-1')(dispatch, getState);

        expect(window.alert).toHaveBeenCalledWith('Harap login terlebih dahulu');
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch toggleNeutralVoteThread correctly if API success', async () => {
        const dispatch = vi.fn();
        const getState = () => ({ authUser: { id: 'user-1' } });
        api.neutralVoteThread = vi.fn().mockResolvedValue();

        await asyncToggleNeutralVoteThread('thread-1')(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(toggleNeutralVoteThread({ threadId: 'thread-1', userId: 'user-1' }));
        expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
    });

    it('should fallback trigger asyncReceiveThreads if API fails', async () => {
        const dispatch = vi.fn();
        const getState = () => ({ authUser: { id: 'user-1' } });
        api.neutralVoteThread = vi.fn().mockRejectedValue(new Error('API Error'));

        await asyncToggleNeutralVoteThread('thread-1')(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2); // One for toggleNeutralVoteThread, one for asyncReceiveThreads
        expect(window.alert).toHaveBeenCalledWith('API Error');
    });
});
