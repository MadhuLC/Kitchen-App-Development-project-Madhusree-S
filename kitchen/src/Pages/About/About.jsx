// src/pages/About/About.jsx
import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <main className="main-content">
      <h2>About Smart Kitchen</h2>
      <p>
        <strong>Smart Kitchen</strong> was created by a passionate team of foodies and technologists who wanted to make meal planning and kitchen management effortless for everyone.
      </p>
      <h3>Our Mission</h3>
      <p>
        To help you save time, reduce food waste, and enjoy cooking by providing smart, personalized tools for your kitchen.
      </p>
      <h3>How It Works</h3>
      <ul>
        <li>Built with React and modern web technologies for speed and reliability</li>
        <li>Modular, maintainable codebase for easy feature expansion</li>
        <li>Open source and community-driven</li>
      </ul>
      </main>
    
    </div>
  );
}
