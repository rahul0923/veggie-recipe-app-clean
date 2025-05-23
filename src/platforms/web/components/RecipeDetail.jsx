import { useParams, Link } from 'react-router-dom';

import { useRecipeDetail } from '../../../core/hooks/useRecipeDetail';
import FavoriteButton from '../../../shared/components/FavoriteButton';
import VideoTutorial from '../../../shared/components/VideoTutorial';

const RecipeDetail = ({onFavoriteToggle}) => {
  const { id } = useParams();
  const { recipe, isLoading, error, handleFavoriteToggle } = useRecipeDetail(id);

    // Create a handler that calls both the local toggle and parent notification
  const handleToggle = async () => {
    await handleFavoriteToggle();
    
    // Notify parent that favorites changed
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container">
        <div className="recipe-detail-loading">
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }
    // Handle error state
  if (error) {
    return (
      <div className="container">
        <div className="recipe-detail-error">
          <p>{error}</p>
          <Link to="/" className="back-button">
            ← Back to recipes
          </Link>
        </div>
      </div>
    );
  }
    // Handle recipe not found
  if (!recipe) {
    return (
      <div className="container">
        <div className="recipe-detail-error">
          <p>Recipe not found</p>
          <Link to="/" className="back-button">
            ← Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <Link to="/" className="back-button">
          ← Back to recipes
        </Link>
        <h1 className="recipe-detail-title">{recipe.name}</h1>
        <span className={`recipe-type ${recipe.type}`}>
          {recipe.type}
        </span>          
        <FavoriteButton 
          recipeId={recipe.id} 
          onToggle={handleToggle}
        />
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

          {recipe.videoUrl && <VideoTutorial videoUrl={recipe.videoUrl} />}

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
          
          {recipe.videoUrl && (
            <div className="recipe-detail-video">
              <h2>Video Tutorial</h2>
              <a 
                href={recipe.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                Watch video tutorial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;