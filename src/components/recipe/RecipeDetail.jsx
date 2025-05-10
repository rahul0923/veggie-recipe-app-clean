import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import VideoTutorial from './VideoTutorial';

import recipeData from '../../data/recipes.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    // Find the recipe with the matching ID
    const foundRecipe = recipeData.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
    
    // Scroll to top when recipe changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!recipe) {
    return (
      <div className="container">
        <div className="recipe-detail-loading">
          <p>Loading recipe...</p>
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