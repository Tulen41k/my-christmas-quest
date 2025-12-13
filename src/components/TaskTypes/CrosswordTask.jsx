// src/components/TaskTypes/CrosswordTask.jsx

import React, { useState } from 'react';
import TaskLayout from '../TaskLayout';

export default function CrosswordTask({ task, onTaskComplete }) {
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const checkAnswers = () => {
    // Пока просто подтверждаем, что пользователь попытался
    setIsComplete(true);
    setTimeout(() => onTaskComplete(task.nextClue), 1000);
  };

  return (
    <TaskLayout title={task.title} onTaskComplete={isComplete ? null : checkAnswers}>
      <p>Разгадай подсказки и впиши ответы:</p>
      <div style={{ marginTop: '1rem' }}>
        {task.clues.map((clue, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <p>
              <strong>{clue.number}. {clue.direction}:</strong> {clue.hint}
            </p>
            <input
              type="text"
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              style={{
                padding: '0.4rem',
                width: '100%',
                maxWidth: '300px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        ))}
      </div>
      {!isComplete && (
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
          Введи свои варианты и нажми "Задание выполнено!"
        </p>
      )}
    </TaskLayout>
  );
}