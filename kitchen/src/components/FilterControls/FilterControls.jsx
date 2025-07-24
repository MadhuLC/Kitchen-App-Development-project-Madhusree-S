// src/components/FilterControls/FilterControls.jsx
import React from 'react';
import './FilterControls.css';

export default function FilterControls({ options, filters, onChange }) {
  return (
    <div className="dietary-filters">
      {options.map(opt => (
        <label key={opt.value}>
          <input
            type="checkbox"
            value={opt.value}
            checked={filters.includes(opt.value)}
            onChange={() => onChange(opt.value)}
          /> {opt.label}
        </label>
      ))}
    </div>
  );
}