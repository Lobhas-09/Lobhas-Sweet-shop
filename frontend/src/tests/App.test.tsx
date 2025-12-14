import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders the login page by default', () => {
    render(<App />);
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('renders the register page when navigating to /register', () => {
    window.history.pushState({}, 'Register', '/register');
    render(<App />);
    const registerElement = screen.getByText(/register/i);
    expect(registerElement).toBeInTheDocument();
  });

  test('renders the dashboard when navigating to /dashboard', () => {
    window.history.pushState({}, 'Dashboard', '/dashboard');
    render(<App />);
    const dashboardElement = screen.getByText(/dashboard/i);
    expect(dashboardElement).toBeInTheDocument();
  });

  test('renders the admin panel when navigating to /admin', () => {
    window.history.pushState({}, 'Admin Panel', '/admin');
    render(<App />);
    const adminPanelElement = screen.getByText(/admin panel/i);
    expect(adminPanelElement).toBeInTheDocument();
  });
});