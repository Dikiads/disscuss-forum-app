import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should call addComment function when form is submitted', async () => {
        const mockAddComment = vi.fn();
        render(<CommentInput addComment={mockAddComment} />);

        const input = await screen.getByPlaceholderText('Tuliskan pendapat Anda...');
        await userEvent.type(input, 'This is a test comment');

        const submitBtn = await screen.getByRole('button', { name: /Kirim Komentar/i });
        await userEvent.click(submitBtn);

        expect(mockAddComment).toBeCalledWith('This is a test comment');
    });
});
