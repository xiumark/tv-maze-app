import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSticky?: boolean;
}

/**
 * SearchBar component with sticky positioning support
 * @param onSearch - Callback function when search is triggered
 * @param isSticky - Whether the search bar should stick to top on scroll
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSticky = true }) => {
  const [query, setQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isSticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`search-bar-wrapper ${isSticky ? 'sticky' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search TV shows..."
            value={query}
            onChange={handleInputChange}
            aria-label="Search TV shows"
          />
          {query && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn" aria-label="Search">
          🔍 Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;