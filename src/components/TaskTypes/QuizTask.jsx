// src/components/TaskTypes/QuizTask.jsx

import React, { useState } from 'react';
import TaskLayout from '../TaskLayout';

export default function QuizTask({ task, onTaskComplete }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (option) => {
    setSelected(option);
    if (option === task.correctAnswer) {
      setFeedback('Правильно! 🎉');
      setTimeout(() => onTaskComplete(task.nextClue), 1500);
    } else {
      setFeedback('Попробуй ещё раз!');
    }
  };

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <p><strong>{task.question}</strong></p>
      <div style={{ marginTop: '1rem' }}>
        {task.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            style={{
              padding: '0.75rem',
              margin: '0.5rem 0',
              backgroundColor: selected === option ? '#f0f0f0' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {option}
          </div>
        ))}
      </div>
      {feedback && (
        <p style={{ marginTop: '1rem', color: feedback.includes('Правильно') ? 'green' : 'red' }}>
          {feedback}
        </p>
      )}
    </TaskLayout>
  );
}