import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarRating from '../StarRating';

describe('StarRating Component', () => {
  it('renders rating with stars', () => {
    render(<StarRating rating={8.5} />);
    expect(screen.getByText('(8.5)')).toBeInTheDocument();
  });

  it('renders "No rating" when rating is null', () => {
    render(<StarRating rating={null} />);
    expect(screen.getByText('No rating')).toBeInTheDocument();
  });

  it('renders correct number of full stars', () => {
    const { container } = render(<StarRating rating={10} />);
    const fullStars = container.querySelectorAll('.star-full');
    expect(fullStars.length).toBe(5);
  });

  it('renders half star for decimal ratings', () => {
    const { container } = render(<StarRating rating={7.5} />);
    const halfStar = container.querySelector('.star-half');
    expect(halfStar).toBeInTheDocument();
  });
});