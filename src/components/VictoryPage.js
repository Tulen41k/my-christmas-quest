// src/components/VictoryPage.js

import React from 'react';

export default function VictoryPage() {
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
      <h1 style={{ fontSize: '2.8rem', color: '#8B0000', margin: '0 0 1.5rem' }}>
        Поздравляю! 🎉
      </h1>
      <p style={{ fontSize: '1.3rem', maxWidth: '650px', lineHeight: 1.7 }}>
        Ты прошёл весь квест! Все загадки разгаданы, все подсказки найдены.
        <br />
        Ты — настоящий герой праздника! А теперь иди и забирай свой подарок...
        <br />
        С любовью, твоя Булочка { /* или "Виктория и Санта" */ } ❤️
      </p>

      {/* Необязательно: анимация или эмодзи */}
      <div style={{ marginTop: '2rem', fontSize: '3rem' }}>🎁✨🏆</div>
    </div>
  );
}