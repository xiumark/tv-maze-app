import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getFallbackImage } from '../utils/helpers';
import '../styles/LazyImage.css';

interface LazyImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

/**
 * LazyImage component with lazy loading and fallback support
 * @param src - Image source URL
 * @param alt - Alt text for the image
 * @param className - Additional CSS classes
 */
const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const imageSrc = src || getFallbackImage();
  const finalSrc = hasError ? getFallbackImage() : imageSrc;

  return (
    <div ref={ref} className={`lazy-image-container ${className}`}>
      {inView ? (
        <>
          {!isLoaded && <div className="lazy-image-placeholder" />}
          <img
            src={finalSrc}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        </>
      ) : (
        <div className="lazy-image-placeholder" />
      )}
    </div>
  );
};

export default LazyImage;