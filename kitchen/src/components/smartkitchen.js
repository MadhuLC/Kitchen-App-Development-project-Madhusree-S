// smart-kitchen.js
// Basic interactivity for inventory, recipe suggestions, dietary filters, and grocery list

// --- Inventory ---
const inventoryForm = document.getElementById("add-ingredient-form");
const inventoryInput = document.getElementById("ingredient-name");
const inventoryList = document.getElementById("inventory-list");

function getInventory() {
  return JSON.parse(localStorage.getItem("inventory") || "[]");
}
function setInventory(items) {
  localStorage.setItem("inventory", JSON.stringify(items));
}
function renderInventory() {
  const items = getInventory();
  inventoryList.innerHTML = "";
  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.innerHTML += ` <button data-idx="${idx}" class="remove-btn">Remove</button>`;
    inventoryList.appendChild(li);
  });
}

inventoryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = inventoryInput.value.trim();
  if (value) {
    const items = getInventory();
    items.push(value);
    setInventory(items);
    inventoryInput.value = "";
    renderInventory();
  }
});

inventoryList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const idx = e.target.getAttribute("data-idx");
    const items = getInventory();
    items.splice(idx, 1);
    setInventory(items);
    renderInventory();
  }
});

renderInventory();

// --- Recipe Suggestions ---
const recipeList = document.getElementById("recipe-list");
const getRecipesBtn = document.getElementById("get-recipes-btn");
const dietaryFilters = document.querySelectorAll(
  '#dietary-filters input[type="checkbox"]'
);

// Example recipes database
const RECIPES = [
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
    tags: [],
  },
  {
    name: "Gluten-Free Pancakes",
    ingredients: ["egg", "banana"],
    tags: ["gluten-free"],
  },
];

function getSelectedFilters() {
  return Array.from(dietaryFilters)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);
}

function suggestRecipes() {
  const inventory = getInventory();
  const filters = getSelectedFilters();
  let filtered = RECIPES.filter((recipe) => {
    // Filter by dietary tags
    if (filters.length && !filters.every((f) => recipe.tags.includes(f)))
      return false;
    return true;
  });
  recipeList.innerHTML = "";
  let missingIngredients = [];
  if (filtered.length === 0) {
    if (inventory.length > 0) {
      const li = document.createElement("li");
      li.textContent =
        "No recipe suggestions found. Your inventory: " + inventory.join(", ");
      li.style.color = "#c0392b";
      recipeList.appendChild(li);
    } else {
      const li = document.createElement("li");
      li.textContent =
        "No recipe suggestions found for your current inventory and filters.";
      li.style.color = "#c0392b";
      recipeList.appendChild(li);
    }
  } else {
    filtered.forEach((recipe) => {
      const missing = recipe.ingredients.filter(
        (ing) => !inventory.includes(ing)
      );
      missing.forEach((m) => {
        if (m && !missingIngredients.includes(m)) missingIngredients.push(m);
      });
      const li = document.createElement("li");
      li.textContent =
        recipe.name +
        (missing.length ? " (missing: " + missing.join(", ") + ")" : "");
      li.dataset.missing = missing.join(",");
      recipeList.appendChild(li);
    });
  }
  // Update grocery list
  groceryList.innerHTML = "";
  if (missingIngredients.length > 0) {
    missingIngredients.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      groceryList.appendChild(li);
    });
  }
}

getRecipesBtn.addEventListener("click", suggestRecipes);

// Remove auto-update on dietary filter change. Only update on button click.

// --- Grocery List ---
const groceryList = document.getElementById("grocery-list");

function generateGroceryList() {
  // Collect missing ingredients from suggested recipes
  const items = [];
  recipeList.querySelectorAll("li").forEach((li) => {
    const missing = li.dataset.missing
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    missing.forEach((m) => {
      if (m && !items.includes(m)) items.push(m);
    });
  });
  groceryList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    groceryList.appendChild(li);
  });
}

// Regenerate grocery list when recipes are suggested
getRecipesBtn.addEventListener("click", generateGroceryList);

document.addEventListener("DOMContentLoaded", () => {
  renderInventory();
  suggestRecipes();
  generateGroceryList();
});
