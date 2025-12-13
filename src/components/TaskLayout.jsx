// src/components/TaskLayout.jsx

import React from 'react';

export default function TaskLayout({ title, children, onTaskComplete }) {
  return (
    <div style={{ padding: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#d42a2a' }}>{title}</h2>
      <div style={{ marginTop: '1.5rem' }}>
        {children}
      </div>
      {onTaskComplete && (
        <button
          onClick={onTaskComplete}
          style={{
            marginTop: '2rem',
            padding: '0.6rem 1.5rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ✅ Задание выполнено!
        </button>
      )}
    </div>
  );
}