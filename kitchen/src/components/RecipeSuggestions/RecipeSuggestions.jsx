// src/components/RecipeSuggestions/RecipeSuggestions.jsx
import React from 'react';
import './RecipeSuggestions.css';

export default function RecipeSuggestions({ recipes, error }) {
  return (
    <ul className="recipe-list">
      {error && <li className="error">{error}</li>}
      {recipes.map((recipe, idx) => (
        <li key={recipe.name}>
          {recipe.name}
          {recipe.missing.length > 0 && ` (missing: ${recipe.missing.join(', ')})`}
        </li>
      ))}
    </ul>
  );
}
