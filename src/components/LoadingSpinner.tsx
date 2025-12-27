import React from 'react';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * LoadingSpinner component displays a loading indicator
 * @param message - Optional loading message
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;