// src/data/recipes.js

export const RECIPES = [
  {
    name: "Vegan Salad",
    ingredients: ["lettuce", "tomato", "cucumber"],
    tags: ["vegan", "vegetarian", "gluten-free"],
  },
  {
    name: "Vegetarian Pizza",
    ingredients: ["flour", "cheese", "tomato"],
    tags: ["vegetarian"],
  },
  {
    name: "Chicken Curry",
    ingredients: ["chicken", "onion", "spices"],
    tags: ["non-vegetarian"],
  },
  {
    name: "Gluten-Free Pancakes",
    ingredients: ["egg", "banana"],
    tags: ["gluten-free"],
  },
];

export const DIETARY_OPTIONS = [
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Non-Vegetarian", value: "non-vegetarian" },
];