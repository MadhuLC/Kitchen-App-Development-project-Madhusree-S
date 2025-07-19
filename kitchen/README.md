# SmartKitchen App (React + Vite)

This project is a modern React app built with Vite. It features a SmartKitchen component that helps users manage their kitchen inventory, get recipe suggestions, and generate grocery lists.

## How to Start the App

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port shown in your terminal).

3. **Run tests:**

   ```sh
   npm run test:smartkitchen
   ```

## Main Functionalities

- **Inventory Management:**

  - Add ingredients to your kitchen inventory.
  - Remove ingredients from the inventory.
  - Prevents adding duplicate or empty ingredients.

- **Recipe Suggestions:**

  - Get recipe suggestions based on your current inventory.
  - Filter recipes by dietary preferences (Vegan, Vegetarian, Gluten-Free).
  - Only recipes for which you have all required ingredients are suggested.
  - If no recipes match, an error message is shown.

- **Grocery List Generation:**

  - When you don't have all the ingredients for a recipe, the app generates a grocery list of missing items for the first unmatched recipe.
  - The grocery list excludes items already present in your inventory.

- **Robust Error Handling:**
  - The app displays clear error messages when no recipes can be suggested or when dietary filters exclude all recipes.
