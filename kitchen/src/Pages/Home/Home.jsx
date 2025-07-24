// src/pages/Home/Home.jsx
import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <main className="main-content">
      <h2>Welcome to Smart Kitchen!</h2>
      <p>
        Smart Kitchen is your all-in-one solution for managing your kitchen, planning meals, and shopping smarter.
      </p>
      <div className="features-section">
        <h3>Key Features</h3>
        <ul>
          <li><strong>Inventory Management:</strong> Add, remove, and track your kitchen ingredients in real time.</li>
          <li><strong>Recipe Suggestions:</strong> Instantly get recipe ideas based on what you have and your dietary preferences.</li>
          <li><strong>Dietary Filters:</strong> Vegan, vegetarian, and gluten-free options for personalized results.</li>
          <li><strong>Smart Grocery List:</strong> Automatically generate a list of missing ingredients for your chosen recipes.</li>
          <li><strong>Modern UI:</strong> Clean, responsive, and easy to use on any device.</li>
        </ul>
        <div className="try-link">
          <a href="/kitchen" className="try-btn">Try Smart Kitchen Now</a>
        </div>
      </div>
      <p className="home-note">
        Start by adding ingredients to your inventory and let Smart Kitchen do the rest!
      </p>
      </main>
    </div>
  );
}
