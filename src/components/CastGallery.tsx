import React from 'react';
import type { CastMember } from '../types';
import LazyImage from './LazyImage';
import '../styles/CastGallery.css';

interface CastGalleryProps {
  cast: CastMember[];
}

/**
 * CastGallery component displays a gallery of cast members
 * @param cast - Array of cast members
 */
const CastGallery: React.FC<CastGalleryProps> = ({ cast }) => {
  if (cast.length === 0) {
    return <p className="no-cast">No cast information available.</p>;
  }

  return (
    <div className="cast-gallery">
      <h2 className="cast-gallery-title">Cast</h2>
      <div className="cast-grid">
        {cast.map((member) => (
          <div key={`${member.person.id}-${member.character.id}`} className="cast-card">
            <LazyImage
              src={member.person.image?.medium || null}
              alt={member.person.name}
              className="cast-image"
            />
            <div className="cast-info">
              <p className="actor-name">{member.person.name}</p>
              <p className="character-name">as {member.character.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastGallery;