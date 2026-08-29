import { describe, it, expect } from 'vitest';
import threadsReducer, { toggleUpVoteThread, toggleDownVoteThread, toggleNeutralVoteThread, asyncReceiveThreads, asyncAddThread } from './slice';

describe('threadsReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN' };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it('should return threads when given asyncReceiveThreads.fulfilled action', () => {
        const initialState = [];
        const action = {
            type: asyncReceiveThreads.fulfilled.type,
            payload: [{ id: 'thread-1', title: 'Thread 1' }]
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual(action.payload);
    });

    it('should add thread when given asyncAddThread.fulfilled action', () => {
        const initialState = [{ id: 'thread-1', title: 'Thread 1' }];
        const action = {
            type: asyncAddThread.fulfilled.type,
            payload: { id: 'thread-2', title: 'Thread 2' }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual([action.payload, ...initialState]);
    });

    it('should toggle upvote logic correctly', () => {
        const initialState = [{ id: 'thread-1', upVotesBy: [], downVotesBy: ['user-1'] }];
        const action = {
            type: toggleUpVoteThread.type,
            payload: { threadId: 'thread-1', userId: 'user-1' }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState[0].upVotesBy).toContain('user-1');
        expect(nextState[0].downVotesBy).not.toContain('user-1');
    });

    it('should toggle downvote logic correctly', () => {
        const initialState = [{ id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] }];
        const action = {
            type: toggleDownVoteThread.type,
            payload: { threadId: 'thread-1', userId: 'user-1' }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState[0].upVotesBy).not.toContain('user-1');
        expect(nextState[0].downVotesBy).toContain('user-1');
    });

    it('should toggle neutral vote logic correctly', () => {
        const initialState = [{ id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] }];
        const action = {
            type: toggleNeutralVoteThread.type,
            payload: { threadId: 'thread-1', userId: 'user-1' }
        };
        const nextState = threadsReducer(initialState, action);
        expect(nextState[0].upVotesBy).not.toContain('user-1');
        expect(nextState[0].downVotesBy).not.toContain('user-1');
    });
});
