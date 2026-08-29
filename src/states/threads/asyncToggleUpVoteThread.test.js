import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncToggleUpVoteThread, toggleUpVoteThread } from './slice';

describe('asyncToggleUpVoteThread thunk', () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should abort if unauthenticated', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith('Harap login terlebih dahulu');
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch toggleUpVoteThread correctly if API success', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    api.upVoteThread = vi.fn().mockResolvedValue();

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' })
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should dispatch toggleUpVoteThread twice (undo) if API fails', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    api.upVoteThread = vi.fn().mockRejectedValue(new Error('API Error'));

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledWith('API Error');
  });
});
