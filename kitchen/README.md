# React Vite Smart Kitchen App

## Overview

A modern React app for managing your kitchen inventory, getting recipe suggestions, and generating grocery lists. Built with Vite, React 19, and tested with Jest.

## Getting Started

### Install dependencies

```sh
npm install
```

### Run the development server

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

### Preview the production build

```sh
npm run preview
```

## Running Tests

### Run all tests (Jest)

```sh
npm test
```

### Watch tests

```sh
npm run test:watch
```

### Run only SmartKitchen tests

```sh
npm run test:smartkitchen
```

## Linting

```sh
npm run lint
```

## Project Structure

- `src/components/` - React components
- `src/data/` - Recipe and dietary data
- `jest.config.cjs` - Jest configuration
- `babel.config.js` - Babel configuration

## Notes

- Uses Jest and @testing-library/react for robust component testing.
- CSS modules are mocked in Jest for compatibility.
- For any issues, check the configuration files or open an issue.

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
