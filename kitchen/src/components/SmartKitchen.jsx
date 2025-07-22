import React, { useState } from 'react';
import './SmartKitchen.css';

const RECIPES = [
  { name: 'Vegan Salad', ingredients: ['lettuce', 'tomato', 'cucumber'], tags: ['vegan', 'vegetarian', 'gluten-free'] },
  { name: 'Vegetarian Pizza', ingredients: ['flour', 'cheese', 'tomato'], tags: ['vegetarian'] },
  { name: 'Chicken Curry', ingredients: ['chicken', 'onion', 'spices'], tags: ['non-vegetarian'] },
  { name: 'Gluten-Free Pancakes', ingredients: ['egg', 'banana'], tags: ['gluten-free'] },
];

const DIETARY_OPTIONS = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Gluten-Free', value: 'gluten-free' },
];

export default function SmartKitchen() {
  const [inventory, setInventory] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [filters, setFilters] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [error, setError] = useState('');

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed.length === 0) {
      setIngredient('');
      return;
    }
    if (inventory.includes(trimmed)) {
      setIngredient('');
      return;
    }
    setInventory([...inventory, trimmed]);
    setIngredient('');
  };

  // Remove ingredient by value (case-insensitive)
  const handleRemoveIngredient = (ingredient) => {
    setInventory(prev => prev.filter(item => item.toLowerCase() !== ingredient.toLowerCase()));
  };

  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  // Suggest recipes and update error/grocery list to match test expectations
  const getRecipeSuggestions = () => {
    setError('');
    const inv = inventory.map(i => i.toLowerCase());
    // Filter recipes by dietary filters
    let filtered = RECIPES.filter(recipe => {
      if (filters.length && !filters.every(f => recipe.tags.includes(f))) return false;
      return true;
    });
    // Find recipes that are fully matched
    const matchingRecipes = filtered.filter(recipe =>
      recipe.ingredients.every(ing => inv.includes(ing))
    );
    // Set recipes for display (with missing info)
    setRecipes(matchingRecipes.map(recipe => ({ name: recipe.name, missing: [] })));
    // Error message logic
    if (matchingRecipes.length === 0) {
      setError('No recipe suggestions found');
    } else {
      setError('');
    }
    // Grocery list: show missing for first unmatched recipe in filtered
    const firstUnmatched = filtered.find(recipe => recipe.ingredients.some(ing => !inv.includes(ing)));
    if (firstUnmatched) {
      const missing = firstUnmatched.ingredients.filter(ing => !inv.includes(ing));
      setGroceryList(missing);
    } else {
      setGroceryList([]);
    }
  };

  return (
    <div className="smart-kitchen">
      <h1>Smart Kitchen</h1>
      <main>
        {/* Inventory */}
        <section className="user-story" id="inventory-section">
          <h2>My Inventory</h2>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Inventory" className="story-img" />
          <p>Add ingredients to your inventory so you can quickly see what you have available.</p>
          <form onSubmit={handleAddIngredient}>
            <input
              type="text"
              value={ingredient}
              onChange={e => setIngredient(e.target.value)}
              placeholder="Enter ingredient name"
              required
            />
            <button type="submit">Add</button>
          </form>
          <ul id="inventory-list">
            {inventory.map((item) => (
              <li key={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)} <button type="button" onClick={() => handleRemoveIngredient(item)}>Remove</button>
              </li>
            ))}
          </ul>
        </section>
        {/* Recipe Suggestions */}
        <section className="user-story" id="recipes-section">
          <h2>Recipe Suggestions</h2>
          <img src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80" alt="Recipes" className="story-img" />
          <p>Get recipe suggestions based on what’s in your fridge so you don't have to know what to make.</p>
          <div id="dietary-filters">
            {DIETARY_OPTIONS.map(opt => (
              <label key={opt.value}>
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={filters.includes(opt.value)}
                  onChange={() => handleFilterChange(opt.value)}
                /> {opt.label}
              </label>
            ))}
          </div>
          <button id="get-recipes-btn" onClick={getRecipeSuggestions}>Get Recipes</button>
          <ul id="recipe-list">
            {recipes.map((recipe, idx) => (
              <li key={idx}>
                {recipe.name}
                {recipe.missing.length > 0 && ` (missing: ${recipe.missing.join(', ')})`}
              </li>
            ))}
          </ul>
          {error && <div style={{ color: '#c0392b', marginTop: '1rem' }}>{error}</div>}
        </section>
        {/* Grocery List */}
        <section className="user-story" id="grocery-section">
          <h2>Grocery List</h2>
          <img src="https://worksheets.clipart-library.com/images2/large-printable-grocery-list/large-printable-grocery-list-18.jpg?auto=format&fit=crop&w=400&q=80" alt="Grocery List" className="story-img" />
          <p>Generate a grocery list from missing ingredients in recipes.</p>
          <ul id="grocery-list">
            {groceryList.length > 0 && groceryList
              .filter(item => !inventory.includes(item))
              .map((item, idx) => (
                <li key={idx}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>
              ))}
          </ul>
        </section>
      </main>
      <footer>
        <p>2025 Smart Kitchen</p>
      </footer>
    </div>
  );
}
