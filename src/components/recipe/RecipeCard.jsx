// src/components/recipe/RecipeCard.jsx
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline'; 
import FavoriteButton from './FavoriteButton';

const RecipeCard = ({ recipe }) => {

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card">
        <div className="recipe-image-container">
          <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
          {recipe.videoUrl && (
            <div className="video-indicator">
              <PlayCircleIcon className="video-icon" />
            </div>
          )}
          {/* Position the favorite button on the image */}
          <div className="recipe-card-favorite">
            <FavoriteButton recipeId={recipe.id} />
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
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {typeof ingredient === 'string' ? ingredient : ingredient.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Wrap with memo to prevent unnecessary re-renders
export default memo(RecipeCard);
