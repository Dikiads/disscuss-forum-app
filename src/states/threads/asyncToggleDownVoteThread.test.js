import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncToggleDownVoteThread, toggleDownVoteThread } from './slice';

describe('asyncToggleDownVoteThread thunk', () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should abort if unauthenticated', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });

    await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith('Harap login terlebih dahulu');
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch toggleDownVoteThread correctly if API success', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    api.downVoteThread = vi.fn().mockResolvedValue();

    await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should dispatch toggleDownVoteThread twice (undo) if API fails', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    api.downVoteThread = vi.fn().mockRejectedValue(new Error('API Error'));

    await asyncToggleDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledWith('API Error');
  });
});
