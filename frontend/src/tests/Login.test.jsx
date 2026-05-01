import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Login from '../pages/Login'; 

describe('Component Test: Login Page', () => {
  it('renders the login button successfully', () => {
    
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /log in/i });
    
    expect(loginButton).toBeInTheDocument();
  });
});