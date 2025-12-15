// src/components/HomePage.js

import React from 'react';

export default function HomePage({ onStart }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontSize: '2.2rem', margin: '0 0 1rem' }}>
        Ха-ха, ты попался!
      </h1>
      <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 'normal' }}>
        Теперь тебе придется опять пройти квест!
      </h2>

      <p style={{ fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 2rem' }}>
        Тебя предупреждали, что если ты ничего не придумаешь, тебе снова придется страдать? Да!
        <br />
        Ну что же, теперь тебе придется выполнить несколько заданий, прежде чем ты сможешь получить свой подарок...
      </p>

      <button
        onClick={onStart}
        style={{
          padding: '0.8rem 2.5rem',
          fontSize: '1.3rem',
          backgroundColor: '#8B0000', // бордовый
          color: 'white',
          border: '3px solid #660000',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#A52A2A')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#8B0000')}
      >
        Начать страдать
      </button>
    </div>
  );
}