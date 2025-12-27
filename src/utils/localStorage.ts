import type { TVShow } from '../types';

const FAVORITES_KEY = 'tv-maze-favorites';

/**
 * Get all favorite shows from local storage
 * @returns Array of favorite TV shows
 */
export const getFavorites = (): TVShow[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

/**
 * Save a show to favorites
 * @param show - TV show to save
 */
export const addFavorite = (show: TVShow): void => {
  try {
    const favorites = getFavorites();
    const exists = favorites.some((fav) => fav.id === show.id);
    
    if (!exists) {
      favorites.push(show);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite to localStorage:', error);
  }
};

/**
 * Remove a show from favorites
 * @param showId - ID of the show to remove
 */
export const removeFavorite = (showId: number): void => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter((fav) => fav.id !== showId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing favorite from localStorage:', error);
  }
};

/**
 * Check if a show is in favorites
 * @param showId - ID of the show to check
 * @returns True if the show is in favorites
 */
export const isFavorite = (showId: number): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.id === showId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};