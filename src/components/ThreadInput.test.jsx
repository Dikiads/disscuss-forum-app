import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

describe('ThreadInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should call addThread function when form is submitted', async () => {
        const mockAddThread = vi.fn();
        render(<ThreadInput addThread={mockAddThread} cancelAdd={() => { }} />);

        const titleInput = await screen.getByPlaceholderText('Contoh: Bagaimana cara optimasi React?');
        await userEvent.type(titleInput, 'Test Title');

        const categoryInput = await screen.getByPlaceholderText('Contoh: reactjs');
        await userEvent.type(categoryInput, 'test');

        const bodyInput = await screen.getByPlaceholderText('Tuliskan cerita komplit Anda di sini...');
        await userEvent.type(bodyInput, 'Test Body Content');

        const submitButton = await screen.getByRole('button', { name: /Lempar Diskusi/i });
        await userEvent.click(submitButton);

        expect(mockAddThread).toBeCalledWith({ title: 'Test Title', body: 'Test Body Content', category: 'test' });
    });
});
