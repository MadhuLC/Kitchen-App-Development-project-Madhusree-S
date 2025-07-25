import React, { useState } from 'react';
import './SmartKitchen.css';
import { RECIPES, DIETARY_OPTIONS } from '../data/recipes';
import InventoryList from './InventoryList/InventoryList';
import RecipeSuggestions from './RecipeSuggestions/RecipeSuggestions';
import GroceryList from './GroceryList/GroceryList';
import FilterControls from './FilterControls/FilterControls';
import Button from './Button/Button';

export default function SmartKitchen() {
  const [inventory, setInventory] = useState([]); // [{id, name}]
  const [ingredient, setIngredient] = useState('');
  const [filters, setFilters] = useState([]);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Helper to generate unique IDs (timestamp + random)
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      setInventory([...inventory, { id: generateId(), name: ingredient.trim() }]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  // Helper to get filtered recipes and annotate with missing ingredients
  const getFilteredRecipes = () => {
    let filtered = RECIPES;
    if (filters.length > 0) {
      filtered = filtered.filter(recipe =>
        filters.every(f => (recipe.tags || []).includes(f))
      );
    }
    const invNames = inventory.map(i => i.name.toLowerCase());
    // Annotate each recipe with a 'missing' array
    return filtered.map(recipe => ({
      ...recipe,
      missing: recipe.ingredients.filter(ing => !invNames.includes(ing.toLowerCase())),
    }));
  };

  const handleGetRecipes = () => {
    setShowResults(true);
    setError('');
  };

  // Compute grocery list: all unique missing ingredients from all filtered recipes
  const groceryList = (() => {
    const filteredRecipes = getFilteredRecipes();
    const allMissing = filteredRecipes.flatMap(recipe => recipe.missing || []);
    // Remove duplicates
    return Array.from(new Set(allMissing));
  })();

  return (
    <div className="smart-kitchen">
      <h1>Smart Kitchen</h1>
      <main>
        <section className="user-story" id="inventory-section">
          <h2>My Inventory</h2>
          <img
            alt="Inventory"
            className="story-img"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
          />
          <p>Add ingredients to your inventory so you can quickly see what you have available.</p>
          <form
            onSubmit={handleAddIngredient}
          >
            <input
              placeholder="Enter ingredient name"
              value={ingredient}
              onChange={e => setIngredient(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" enabled={!ingredient.trim()}>
              Add
            </Button>
          </form>
          <InventoryList inventory={inventory} onRemove={handleRemoveIngredient} />
        </section>
        <section className="user-story" id="recipes-section">
          <h2>Recipe Suggestions</h2>
          <img
            alt="Recipes"
            className="story-img"
            src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
          />
          <p>Get recipe suggestions based on what’s in your fridge so you don't have to know what to make.</p>
          <FilterControls filters={filters} onChange={handleFilterChange} options={DIETARY_OPTIONS} />
          <Button
            id="get-recipes-btn"
            variant="primary"
            onClick={handleGetRecipes}
            enabled={inventory.length === 0}
            title={inventory.length === 0 ? 'Add ingredients to inventory first' : ''}
          >
            Get Recipes
          </Button>
          {/* Show error if no recipes match dietary filters at all (regardless of inventory) */}
          {showResults && getFilteredRecipes().length === 0 && (
            <div className="error-message" style={{ color: 'red', marginTop: 16 }}>No recipe suggestions found</div>
          )}
          {showResults && (
            <RecipeSuggestions
              recipes={getFilteredRecipes()}
            />
          )}
        </section>
        <section className="user-story" id="grocery-section">
          <h2>Grocery List</h2>
          <img
            alt="Grocery List"
            className="story-img"
            src="https://worksheets.clipart-library.com/images2/large-printable-grocery-list/large-printable-grocery-list-18.jpg?auto=format&fit=crop&w=400&q=800"
          />
          <p>Generate a grocery list from missing ingredients in recipes.</p>
          {showResults && <GroceryList groceryList={groceryList} />}
        </section>
      </main>
      {error && <div className="error-message" style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}
