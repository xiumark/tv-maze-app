import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchShows, searchShows } from '../services/api';
import type { TVShow } from '../types';
import SearchBar from '../components/SearchBar';
import TVCard from '../components/TVCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getFavorites } from '../utils/localStorage';
import '../styles/Home.css';

/**
 * Home page component displaying TV show list with search and pagination
 */
const Home: React.FC = () => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  // Load initial shows
  useEffect(() => {
    loadShows(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && hasMore && !loading && !isSearching) {
      loadShows(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, loading, isSearching, page]);

  const loadShows = async (pageNum: number) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchShows(pageNum);
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setShows((prev) => (pageNum === 0 ? data : [...prev, ...data]));
        setPage(pageNum);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load TV shows');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // Reset to normal browsing
      setIsSearching(false);
      setShowFavorites(false);
      setShows([]);
      setPage(0);
      setHasMore(true);
      loadShows(0);
      return;
    }

    setIsSearching(true);
    setLoading(true);
    setError(null);
    setHasMore(false);

    try {
      const results = await searchShows(query);
      setShows(results);
      
      if (results.length === 0) {
        setError('No shows found. Try a different search term.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search TV shows');
    } finally {
      setLoading(false);
    }
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    
    if (!showFavorites) {
      const favorites = getFavorites();
      setShows(favorites);
      setIsSearching(true);
      setHasMore(false);
      
      if (favorites.length === 0) {
        setError('No favorite shows yet. Add some by clicking the heart icon on any show!');
      }
    } else {
      setIsSearching(false);
      setShows([]);
      setPage(0);
      setHasMore(true);
      setError(null);
      loadShows(0);
    }
  };

  const handleFavoriteToggle = () => {
    if (showFavorites) {
      // Refresh favorites list
      const favorites = getFavorites();
      setShows(favorites);
    }
  };

  const handleRetry = () => {
    if (isSearching && searchQuery) {
      handleSearch(searchQuery);
    } else {
      setShows([]);
      setPage(0);
      setHasMore(true);
      setError(null);
      loadShows(0);
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="site-title">📺 TV Maze Explorer</h1>
        <p className="site-subtitle">Discover your next favorite TV show</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="home-controls">
        <button
          className={`favorites-toggle ${showFavorites ? 'active' : ''}`}
          onClick={handleShowFavorites}
        >
          {showFavorites ? '📋 Show All' : '❤️ My Favorites'}
        </button>
        <p className="results-count">
          {shows.length} {shows.length === 1 ? 'show' : 'shows'} found
        </p>
      </div>

      {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}

      <div className="shows-grid">
        {shows.map((show) => (
          <TVCard key={show.id} show={show} onFavoriteToggle={handleFavoriteToggle} />
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {!loading && !error && hasMore && !isSearching && (
        <div ref={loadMoreRef} className="load-more-trigger">
          <p>Scroll for more...</p>
        </div>
      )}

      {!loading && !hasMore && !isSearching && shows.length > 0 && (
        <p className="end-message">You've reached the end! 🎬</p>
      )}
    </div>
  );
};

export default Home;