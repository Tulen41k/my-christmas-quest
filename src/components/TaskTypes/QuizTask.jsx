// src/components/TaskTypes/QuizTask.js

import React, { useState } from 'react';
import TaskLayout from '../TaskLayout';

export default function QuizTask({ task, onTaskComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // ← добавили состояние

  const currentQuestion = task.questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option); // ← сохраняем выбор
    const message = currentQuestion.feedback?.[option] || 'Интересный выбор...';
    setFeedbackMessage(message);

    if (option === currentQuestion.correctAnswer) {
      setTimeout(() => {
        if (currentQuestionIndex < task.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setFeedbackMessage('');
          setSelectedOption(null); // сбрасываем при переходе
        } else {
          onTaskComplete(task.nextClue);
        }
      }, 1800);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Вопрос {currentQuestionIndex + 1} из {task.questions.length}
        </p>
        <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
          {currentQuestion.question}
        </p>
      </div>

      <div>
        {currentQuestion.options.map((option, idx) => (
          <div
            key={idx}
            onClick={() => handleAnswer(option)}
            style={{
              padding: '0.75rem',
              margin: '0.5rem 0',
              backgroundColor: selectedOption === option ? '#e0f7fa' : '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'background-color 0.2s'
            }}
          >
            {option}
          </div>
        ))}
      </div>

      {feedbackMessage && (
        <p
          style={{
            textAlign: 'center',
            marginTop: '1.2rem',
            color: isCorrect ? '#27ae60' : '#e74c3c',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            lineHeight: 1.4
          }}
        >
          {feedbackMessage}
        </p>
      )}
    </TaskLayout>
  );
}