// src/shared/components/RecipeCardView.jsx - Presentational component
import { memo } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

// Pure UI component with no business logic
const RecipeCardView = ({ 
  recipe,
  isFavorite,
  onFavoriteToggle,
  onCardClick
}) => {
  return (
    <div className="recipe-card" onClick={onCardClick}>
      <div className="recipe-image-container">
        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
        {recipe.videoUrl && (
          <div className="video-indicator">
            <PlayCircleIcon className="video-icon" />
          </div>
        )}
        <div className="recipe-card-favorite">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(recipe.id);
            }}
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
      <div className="recipe-content">
        <div className="recipe-header">
          <h3 className="recipe-title">{recipe.name}</h3>
          <span className={`recipe-type ${recipe.type}`}>
            {recipe.type}
          </span>
        </div>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-time">
          ⏱️<span>{recipe.prepTime}</span>
        </div>
        <div className="recipe-ingredients">
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <span key={index} className="ingredient-tag">
              {typeof ingredient === 'string' ? ingredient : ingredient.name}
            </span>
          ))}
          {recipe.ingredients.length > 3 && (
            <span className="ingredient-tag">+{recipe.ingredients.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(RecipeCardView);
