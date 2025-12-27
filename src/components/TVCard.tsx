import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TVShow } from '../types';
import StarRating from './StarRating';
import LazyImage from './LazyImage';
import { isFavorite, addFavorite, removeFavorite } from '../utils/localStorage';
import '../styles/TVCard.css';

interface TVCardProps {
  show: TVShow;
  onFavoriteToggle?: () => void;
}

/**
 * TVCard component displays a TV show card with basic information
 * @param show - TV show data
 * @param onFavoriteToggle - Callback when favorite status changes
 */
const TVCard: React.FC<TVCardProps> = ({ show, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = React.useState(isFavorite(show.id));

  const handleCardClick = () => {
    navigate(`/show/${show.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(show.id);
    } else {
      addFavorite(show);
    }
    
    setIsFav(!isFav);
    onFavoriteToggle?.();
  };

  return (
    <div className="tv-card" onClick={handleCardClick}>
      <button
        className={`favorite-btn ${isFav ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? '❤️' : '🤍'}
      </button>
      
      <LazyImage
        src={show.image?.medium || null}
        alt={show.name}
        className="tv-card-image"
      />
      
      <div className="tv-card-content">
        <h3 className="tv-card-title">{show.name}</h3>
        
        <div className="tv-card-rating">
          <StarRating rating={show.rating.average} />
        </div>
        
        <div className="tv-card-type">
          <span className="type-badge">{show.type}</span>
        </div>
      </div>
    </div>
  );
};

export default TVCard;