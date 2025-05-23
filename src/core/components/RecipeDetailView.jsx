// src/core/components/RecipeDetailView.jsx
// Pure presentational component with no platform dependencies
import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const RecipeDetailView = ({ 
  recipe, 
  isFavorite,
  onBack,
  onToggleFavorite,
  onVideoClick
}) => {
  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <button onClick={onBack} className="back-button">
          ← Back to recipes
        </button>
        <h1 className="recipe-detail-title">{recipe.name}</h1>
        <span className={`recipe-type ${recipe.type}`}>
          {recipe.type}
        </span>          
        <button 
          onClick={() => onToggleFavorite(recipe.id)}
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className="recipe-detail-content">
        <div className="recipe-detail-image-container">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name} 
            className="recipe-detail-image" 
          />
        </div>
        
        <div className="recipe-detail-info">
          <div className="recipe-detail-description">
            <h2>Description</h2>
            <p>{recipe.description}</p>
          </div>
          
          <div className="recipe-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Prep Time:</span>
              <span className="meta-value">{recipe.prepTime}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Meal:</span>
              <span className="meta-value">{recipe.mealTime}</span>
            </div>
          </div>

          {recipe.videoUrl && (
            <div className="video-tutorial">
              <h2>Video Tutorial</h2>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(recipe.videoUrl)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-links">
                <button 
                  onClick={() => onVideoClick(recipe.videoUrl)}
                  className="youtube-link"
                >
                  Watch on YouTube
                </button>
              </div>
            </div>
          )}

          <div className="recipe-detail-ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {typeof ingredient === 'string' ? ingredient : ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div className="recipe-detail-instructions">
              <h2>Instructions</h2>
              <ol className="instructions-list">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="instruction-step">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function (could also move to a utils file)
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default RecipeDetailView;