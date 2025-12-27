import React from 'react';
import '../styles/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * ErrorMessage component displays error messages with optional retry button
 * @param message - Error message to display
 * @param onRetry - Optional callback for retry action
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;