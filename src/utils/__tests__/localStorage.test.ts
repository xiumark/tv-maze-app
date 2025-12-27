import { describe, it, expect, beforeEach } from 'vitest';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../localStorage';
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
  image: null,
  summary: '<p>Test summary</p>',
  updated: 1234567890,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
  },
};

describe('LocalStorage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no favorites', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('adds a favorite show', () => {
    addFavorite(mockShow);
    const favorites = getFavorites();
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe(1);
  });

  it('does not add duplicate favorites', () => {
    addFavorite(mockShow);
    addFavorite(mockShow);
    const favorites = getFavorites();
    expect(favorites).toHaveLength(1);
  });

  it('removes a favorite show', () => {
    addFavorite(mockShow);
    removeFavorite(1);
    const favorites = getFavorites();
    expect(favorites).toHaveLength(0);
  });

  it('checks if show is favorite', () => {
    expect(isFavorite(1)).toBe(false);
    addFavorite(mockShow);
    expect(isFavorite(1)).toBe(true);
  });
});