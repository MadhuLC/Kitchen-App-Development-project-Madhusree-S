// src/components/InventoryList/InventoryList.jsx
import React from 'react';
import Button from '../Button/Button';
import './InventoryList.css';

export default function InventoryList({ inventory, onRemove }) {
  return (
    <ul className="inventory-list">
      {inventory.map(item => (
        <li key={item.id}>
          {item.name} <Button onClick={() => onRemove(item.id)} variant="secondary">Remove</Button>
        </li>
      ))}
    </ul>
  );
}
