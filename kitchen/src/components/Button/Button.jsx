// src/components/Button/Button.jsx
import React from 'react';
import './Button.css';

export default function Button({ children, disabled, loading, variant = 'primary', ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}