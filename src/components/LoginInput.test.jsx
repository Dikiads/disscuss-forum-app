import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'test@test.com');
    expect(emailInput).toHaveValue('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('••••••••');
    await userEvent.type(passwordInput, 'passwordtest');
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'test@test.com');
    const passwordInput = await screen.getByPlaceholderText('••••••••');
    await userEvent.type(passwordInput, 'passwordtest');

    const loginButton = await screen.getByRole('button', {
      name: /Masuk Sekarang/i,
    });
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'test@test.com',
      password: 'passwordtest',
    });
  });
});
