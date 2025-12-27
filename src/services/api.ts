import axios from 'axios';
import type { TVShow, SearchResult, CastMember, Episode, Schedule } from '../types';

const API_BASE_URL = 'https://api.tvmaze.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Fetch TV shows with pagination
 * @param page - Page number (0-indexed)
 * @returns Array of TV shows
 */
export const fetchShows = async (page: number = 0): Promise<TVShow[]> => {
  try {
    const response = await apiClient.get<TVShow[]>('/shows', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw new Error('Failed to fetch TV shows. Please try again later.');
  }
};

/**
 * Search TV shows by name
 * @param query - Search query string
 * @returns Array of search results
 */
export const searchShows = async (query: string): Promise<TVShow[]> => {
  try {
    const response = await apiClient.get<SearchResult[]>('/search/shows', {
      params: { q: query },
    });
    return response.data.map((result) => result.show);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw new Error('Failed to search TV shows. Please try again later.');
  }
};

/**
 * Fetch a single TV show by ID
 * @param id - Show ID
 * @returns TV show details
 */
export const fetchShowById = async (id: string): Promise<TVShow> => {
  try {
    const response = await apiClient.get<TVShow>(`/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw new Error('Failed to fetch show details. Please try again later.');
  }
};

/**
 * Fetch cast members for a TV show
 * @param id - Show ID
 * @returns Array of cast members
 */
export const fetchShowCast = async (id: string): Promise<CastMember[]> => {
  try {
    const response = await apiClient.get<CastMember[]>(`/shows/${id}/cast`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cast:', error);
    throw new Error('Failed to fetch cast information. Please try again later.');
  }
};

/**
 * Fetch episodes for a TV show
 * @param id - Show ID
 * @returns Array of episodes
 */
export const fetchShowEpisodes = async (id: string): Promise<Episode[]> => {
  try {
    const response = await apiClient.get<Episode[]>(`/shows/${id}/episodes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw new Error('Failed to fetch episodes. Please try again later.');
  }
};

/**
 * Fetch schedule for a specific date
 * @param date - Date string in YYYY-MM-DD format
 * @returns Array of scheduled episodes
 */
export const fetchSchedule = async (date: string): Promise<Schedule[]> => {
  try {
    const response = await apiClient.get<Schedule[]>('/schedule', {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw new Error('Failed to fetch schedule. Please try again later.');
  }
};