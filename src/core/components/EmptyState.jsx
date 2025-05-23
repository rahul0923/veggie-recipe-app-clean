// src/core/components/EmptyState.jsx
export const EmptyState = ({ 
  message, 
  icon = '📭',
  action,
  actionText 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <p className="empty-message">{message}</p>
      {action && actionText && (
        <button onClick={action} className="empty-action-button">
          {actionText}
        </button>
      )}
    </div>
  );
};
