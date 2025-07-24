import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SmartKitchen from './SmartKitchen';

describe('SmartKitchen', () => {
  test('adds ingredient to inventory (positive)', async () => {
    render(<SmartKitchen />);
    const input = screen.getAllByPlaceholderText(/enter ingredient name/i)[0];
    const addBtn = screen.getAllByText(/add/i).find(el => el.tagName === 'BUTTON');
    fireEvent.change(input, { target: { value: 'Tomato' } });
    fireEvent.click(addBtn);
    expect(await screen.findByText('Tomato')).toBeTruthy();
  });

  test('does not add empty ingredient (negative)', async () => {
    render(<SmartKitchen />);
    const inventoryList = document.getElementById('inventory-list');
    const initialCount = inventoryList ? inventoryList.children.length : 0;
    const addBtn = screen.getAllByText(/add/i).find(el => el.tagName === 'BUTTON');
    fireEvent.click(addBtn);
    // Wait for DOM update
    await new Promise(r => setTimeout(r, 50));
    const afterCount = inventoryList ? inventoryList.children.length : 0;
    expect(afterCount).toBe(initialCount);
  });

  test('shows recipe suggestions with all missing ingredients if no inventory matches (UI logic)', async () => {
    render(<SmartKitchen />);
    // Add a non-matching ingredient so the button is enabled
    const input = screen.getAllByPlaceholderText(/enter ingredient name/i)[0];
    const addBtn = screen.getAllByText(/add/i).find(el => el.tagName === 'BUTTON');
    fireEvent.change(input, { target: { value: 'xyzabc' } });
    fireEvent.click(addBtn);
    // Now click Get Recipes
    const getRecipesBtn = screen.getAllByText(/get recipes/i).find(el => el.tagName === 'BUTTON');
    fireEvent.click(getRecipesBtn);
    // Should show all recipes with all ingredients missing
    expect(await screen.findByText(/Vegan Salad/i)).toBeTruthy();
    expect(screen.getByText(/missing: lettuce, tomato, cucumber/i)).toBeTruthy();
    expect(screen.getByText(/Vegetarian Pizza/i)).toBeTruthy();
    expect(screen.getByText(/missing: flour, cheese, tomato/i)).toBeTruthy();
  });

  test('shows error when dietary filter excludes all recipes (negative)', async () => {
    render(<SmartKitchen />);
    // Add an ingredient so the button is enabled
    const input = screen.getAllByPlaceholderText(/enter ingredient name/i)[0];
    const addBtn = screen.getAllByText(/add/i).find(el => el.tagName === 'BUTTON');
    fireEvent.change(input, { target: { value: 'Tomato' } });
    fireEvent.click(addBtn);
    // Apply all dietary filters to exclude all recipes
    const veganCheckbox = screen.getAllByLabelText(/vegan/i)[0];
    const vegetarianCheckbox = screen.getAllByLabelText(/vegetarian/i)[0];
    const glutenFreeCheckbox = screen.getAllByLabelText(/gluten-free/i)[0];
    const nonVegCheckbox = screen.getAllByLabelText(/non-vegetarian/i)[0];
    if (!veganCheckbox.checked) fireEvent.click(veganCheckbox);
    if (!vegetarianCheckbox.checked) fireEvent.click(vegetarianCheckbox);
    if (!glutenFreeCheckbox.checked) fireEvent.click(glutenFreeCheckbox);
    if (!nonVegCheckbox.checked) fireEvent.click(nonVegCheckbox);
    // Now click Get Recipes
    const getRecipesBtn = screen.getAllByText(/get recipes/i).find(el => el.tagName === 'BUTTON');
    fireEvent.click(getRecipesBtn);
    // Wait for UI update
    await new Promise(r => setTimeout(r, 100));
    // Should show error message
    const error = await screen.findByText(/no recipe suggestions found/i);
    expect(error).toBeTruthy();
  });

  test('removing non-existent ingredient does not crash (negative)', () => {
    render(<SmartKitchen />);
    // Try to remove when inventory is empty
    expect(() => {
      const removeBtn = screen.queryAllByText(/remove/i).find(el => el.tagName === 'BUTTON');
      if (removeBtn) fireEvent.click(removeBtn);
    }).not.toThrow();
  });
});
