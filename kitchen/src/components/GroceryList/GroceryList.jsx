// src/components/GroceryList/GroceryList.jsx
import React from 'react';
import './GroceryList.css';

export default function GroceryList({ groceryList }) {
  return (
    <ul className="grocery-list">
      {groceryList.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}