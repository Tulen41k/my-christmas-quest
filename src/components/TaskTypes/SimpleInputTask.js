// src/components/TaskTypes/SimpleInputTask.js

import React, { useState } from 'react';
import TaskLayout from '../TaskLayout';

export default function SimpleInputTask({ task, onTaskComplete }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const correct = task.correctAnswer.toLowerCase();
    const userAnswer = answer.trim().toLowerCase();

    if (userAnswer === correct) {
      setFeedback('Верно! ✅');
      setTimeout(() => onTaskComplete(task.nextClue), 1000);
    } else {
      setFeedback(task.wrongMessage || 'Неправильно. Попробуй ещё раз.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '1.5rem 0' }}>
        {task.description}
      </p>

      {task.image && (
        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <img
            src={task.image}
            alt={task.imageAlt || 'Подсказка'}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={task.placeholder || 'Введите ответ...'}
          style={{
            padding: '0.6rem 1rem',
            fontSize: '1.1rem',
            width: '240px',
            textAlign: 'center',
            border: '2px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Проверить
        </button>
      </div>

      {feedback && (
        <p
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: feedback.includes('Верно') ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {feedback}
        </p>
      )}
    </TaskLayout>
  );
}