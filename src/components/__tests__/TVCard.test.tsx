import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TVCard from '../TVCard';
import type { TVShow } from '../../types';

const mockShow: TVShow = {
  id: 1,
  name: 'Test Show',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Running',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2020-01-01',
  ended: null,
  officialSite: null,
  schedule: {
    time: '20:00',
    days: ['Monday'],
  },
  rating: {
    average: 8.5,
  },
  weight: 100,
  network: null,
  webChannel: null,
  image: {
    medium: 'https://example.com/image.jpg',
    original: 'https://example.com/image-original.jpg',
  },
  summary: '<p>Test summary</p>',
  updated: 1234567890,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
  },
};

describe('TVCard Component', () => {
  it('renders show information correctly', () => {
    render(
      <BrowserRouter>
        <TVCard show={mockShow} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Show')).toBeInTheDocument();
    expect(screen.getByText('Scripted')).toBeInTheDocument();
  });

  it('handles favorite toggle', () => {
    const onFavoriteToggle = vi.fn();
    
    render(
      <BrowserRouter>
        <TVCard show={mockShow} onFavoriteToggle={onFavoriteToggle} />
      </BrowserRouter>
    );

    const favoriteBtn = screen.getByLabelText(/favorite/i);
    fireEvent.click(favoriteBtn);

    expect(onFavoriteToggle).toHaveBeenCalled();
  });

  it('renders fallback image when no image provided', () => {
    const showWithoutImage = { ...mockShow, image: null };
    
    const { container } = render(
      <BrowserRouter>
        <TVCard show={showWithoutImage} />
      </BrowserRouter>
    );

    // Check that the lazy image container exists
    const lazyImageContainer = container.querySelector('.lazy-image-container');
    expect(lazyImageContainer).toBeInTheDocument();
  });
});