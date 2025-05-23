// src/core/components/ErrorState.jsx
export const ErrorState = ({ 
  error, 
  onRetry, 
  retryText = 'Try Again',
  showRetry = true 
}) => {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{error}</p>
      {showRetry && onRetry && (
        <button onClick={onRetry} className="retry-button">
          {retryText}
        </button>
      )}
    </div>
  );
};
