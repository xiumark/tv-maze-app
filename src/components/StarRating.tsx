import React from 'react';
import '../styles/StarRating.css';

interface StarRatingProps {
  rating: number | null;
  maxStars?: number;
}

/**
 * StarRating component displays a rating using star icons
 * @param rating - Rating value (0-10)
 * @param maxStars - Maximum number of stars to display (default: 5)
 */
const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  if (rating === null) {
    return <span className="rating-text">No rating</span>;
  }

  // Convert rating from 0-10 scale to 0-5 scale
  const normalizedRating = (rating / 10) * maxStars;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} className="star star-full">
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="star star-half">
          <span className="star-half-inner">★</span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="star star-empty">
          ☆
        </span>
      ))}
      <span className="rating-text">({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;