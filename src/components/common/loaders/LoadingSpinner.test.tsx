// components/LoadingSpinner.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders the loading spinner', () => {
    render(<LoadingSpinner />);

    // Check if the spinner is rendered
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();

    // Check if the spinner has the expected size and color
    expect(spinner).toHaveStyle({
      width: '40px',
      height: '40px',
      color: 'var(--secondary-color)', // Verify the color style
    });
  });

  it('renders in the center of the screen', () => {
    render(<LoadingSpinner />);

    // Get the spinner's container (the Box component)
    const spinnerContainer = screen.getByRole('progressbar').parentElement;

    // Check if the container has styles to center the spinner
    expect(spinnerContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    });
  });
});
