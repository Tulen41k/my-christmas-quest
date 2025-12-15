// src/components/TaskLayout.js

import React from 'react';

export default function TaskLayout({ title, children, onTaskComplete }) {
  return (
    <div style={{ padding: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          textAlign: 'center', // ← центрируем!
          color: '#8B0000',
          fontSize: '1.8rem',
          margin: '0 0 1.5rem',
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
      {onTaskComplete && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onTaskComplete}
            style={{
              padding: '0.6rem 1.8rem',
              backgroundColor: '#8B0000',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1rem',
            }}
          >
            ✅ Задание выполнено!
          </button>
        </div>
      )}
    </div>
  );
}