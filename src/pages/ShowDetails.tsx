import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShowById, fetchShowCast } from '../services/api';
import type { TVShow, CastMember } from '../types';
import StarRating from '../components/StarRating';
import LazyImage from '../components/LazyImage';
import CastGallery from '../components/CastGallery';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ScheduleCalendar from '../components/ScheduleCalendar';
import { stripHtml, getYear } from '../utils/helpers';
import { isFavorite, addFavorite, removeFavorite } from '../utils/localStorage';
import '../styles/ShowDetails.css';

/**
 * ShowDetails page component displaying detailed information about a TV show
 */
const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<TVShow | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    if (id) {
      loadShowDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (show) {
      setIsFav(isFavorite(show.id));
    }
  }, [show]);

  const loadShowDetails = async (showId: string) => {
    setLoading(true);
    setError(null);

    try {
      const [showData, castData] = await Promise.all([
        fetchShowById(showId),
        fetchShowCast(showId),
      ]);

      setShow(showData);
      setCast(castData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load show details');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!show) return;

    if (isFav) {
      removeFavorite(show.id);
    } else {
      addFavorite(show);
    }

    setIsFav(!isFav);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    if (id) {
      loadShowDetails(id);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading show details..." />;
  }

  if (error || !show) {
    return (
      <div className="show-details-page">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Home
        </button>
        <ErrorMessage message={error || 'Show not found'} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="show-details-page">
      <button className="back-btn" onClick={handleBack}>
        ← Back to Home
      </button>

      <div className="show-details-hero">
        <div className="show-details-image">
          <LazyImage
            src={show.image?.original || null}
            alt={show.name}
            className="details-image"
          />
        </div>

        <div className="show-details-info">
          <div className="show-header">
            <h1 className="show-title">{show.name}</h1>
            <button
              className={`favorite-btn-large ${isFav ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFav ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>

          <div className="show-rating">
            <StarRating rating={show.rating.average} />
          </div>

          <div className="show-meta">
            <span className="meta-item">
              <strong>Type:</strong> {show.type}
            </span>
            <span className="meta-item">
              <strong>Language:</strong> {show.language}
            </span>
            <span className="meta-item">
              <strong>Premiered:</strong> {getYear(show.premiered)}
            </span>
            {show.status && (
              <span className="meta-item">
                <strong>Status:</strong> {show.status}
              </span>
            )}
          </div>

          {show.genres && show.genres.length > 0 && (
            <div className="show-genres">
              {show.genres.map((genre) => (
                <span key={genre} className="genre-badge">
                  {genre}
                </span>
              ))}
            </div>
          )}

          {show.summary && (
            <div className="show-summary">
              <h2>Summary</h2>
              <p>{stripHtml(show.summary)}</p>
            </div>
          )}

          {show.schedule && (show.schedule.days.length > 0 || show.schedule.time) && (
            <div className="show-schedule-info">
              <h3>Schedule</h3>
              <p>
                {show.schedule.days.length > 0 && (
                  <>
                    <strong>Days:</strong> {show.schedule.days.join(', ')}
                    <br />
                  </>
                )}
                {show.schedule.time && (
                  <>
                    <strong>Time:</strong> {show.schedule.time}
                  </>
                )}
              </p>
            </div>
          )}

          {show.network && (
            <div className="show-network">
              <strong>Network:</strong> {show.network.name} ({show.network.country.name})
            </div>
          )}

          {show.webChannel && (
            <div className="show-network">
              <strong>Web Channel:</strong> {show.webChannel.name}
            </div>
          )}

          {show.officialSite && (
            <a
              href={show.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="official-site-link"
            >
              🔗 Visit Official Site
            </a>
          )}
        </div>
      </div>

      <div className="show-details-sections">
        <CastGallery cast={cast} />

        <div className="schedule-section">
          <div className="schedule-header">
            <h2>Episode Schedule</h2>
            <button
              className="toggle-schedule-btn"
              onClick={() => setShowSchedule(!showSchedule)}
            >
              {showSchedule ? 'Hide Schedule' : 'Show Schedule'}
            </button>
          </div>
          {showSchedule && <ScheduleCalendar />}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;