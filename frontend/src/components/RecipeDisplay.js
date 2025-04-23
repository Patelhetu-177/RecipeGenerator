import React from 'react';
import './RecipeDisplay.css';

const RecipeDisplay = ({ recipe }) => {
  if (!recipe) {
    return <p>No recipe generated yet.</p>;
  }

  return (
    <div className="recipe-display">
      <h2>Generated Recipe</h2>
      <h3>{recipe.title}</h3>
      <p>{recipe.instructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDisplay;