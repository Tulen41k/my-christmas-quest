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
        backgroundColor: '#fffaf0',
        color: '#8b0000',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        textAlign: 'center',
        boxSizing: 'border-box',
        position: 'relative', // важно для наложения снежинок
        overflowX: 'hidden', // чтобы снежинки не вылезали за границы
      }}
    >
      {/* Гирлянда сверху */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '60px',
          backgroundImage: `url(/images/snowflake.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          zIndex: 10,
        }}
      />

      {/* Основной контент */}
      <div style={{ zIndex: 20, marginTop: '60px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            margin: '0 0 1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Ха-ха, ты попался!
        </h1>
        <h2
          style={{
            fontSize: '1.8rem',
            margin: '0 0 2rem',
            fontWeight: 'normal',
          }}
        >
          Теперь тебе придется опять пройти квест!
        </h2>

        <p
          style={{
            fontSize: '1.2rem',
            maxWidth: '600px',
            lineHeight: 1.6,
            margin: '0 0 2.5rem',
          }}
        >
          Тебя предупреждали, что если ты ничего не придумаешь, тебе снова придется страдать? Да!
          <br />
          Ну что же, теперь тебе придется выполнить несколько заданий, прежде чем ты сможешь получить свой подарок...
        </p>

        <button
          onClick={onStart}
          style={{
            padding: '0.8rem 2.5rem',
            fontSize: '1.3rem',
            backgroundColor: '#d42a2a',
            color: 'white',
            border: '3px solid #8b0000',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.15s, background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#b22222')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#d42a2a')}
        >
          Начать страдать
        </button>

        <div style={{ marginTop: '3rem', fontSize: '2rem', opacity: 0.6 }}>❄️</div>
      </div>

      {/* Анимированные снежинки */}
      <Snowflakes />
    </div>
  );
}

// Компонент с анимацией снежинок
function Snowflakes() {
  const flakes = Array.from({ length: 25 }); // 25 снежинок

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // чтобы не мешали кликам
        zIndex: 5,
      }}
    >
      {flakes.map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 20}px`,
            opacity: 0.7 + Math.random() * 0.3,
            backgroundImage: `url(/images/snowflake.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: `fall ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Стили анимации (встроенные) */}
      <style>
        {`
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}