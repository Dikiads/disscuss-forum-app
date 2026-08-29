import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Ketik nama Anda');
    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Ketik nama Anda');
    await userEvent.type(nameInput, 'John Doe');
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'test@test.com');
    const passwordInput =
      await screen.getByPlaceholderText('Minimal 6 karakter');
    await userEvent.type(passwordInput, 'passwordtest');

    const registerButton = await screen.getByRole('button', {
      name: /Daftarkan Akun/i,
    });
    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name: 'John Doe',
      email: 'test@test.com',
      password: 'passwordtest',
    });
  });
});
