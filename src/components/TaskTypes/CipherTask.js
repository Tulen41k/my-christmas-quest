import React, { useState } from 'react';
import TaskLayout from '../TaskLayout';

export default function CipherTask({ task, onTaskComplete }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const correct = task.correctAnswer.toLowerCase();
    const answer = userAnswer.trim().toLowerCase();

    if (answer === correct) {
      setFeedback('Верно! 🎉');
      setTimeout(() => onTaskComplete(task.nextClue), 1200);
    } else {
      setFeedback('Ой, кажется, это не верно.');
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    // Сбрасываем сообщение при новом вводе
    if (feedback) setFeedback('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: '1.5rem 0' }}>
        {task.description}
      </p>

      {/* Зашифрованное число */}
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        margin: '1.5rem 0', 
        textAlign: 'center',
        color: '#2c3e50'
      }}>
        {task.encoded}
      </div>

      {/* Картинка с шифром */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <img
          src="/images/cipher-key.jpg"
          alt="Ключ шифра"
          style={{
            maxWidth: '100%',
            height: 'auto',
            border: '1px solid #eee',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Поле ввода */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Введите слово..."
          style={{
            padding: '0.6rem 1rem',
            fontSize: '1.1rem',
            width: '240px',
            textAlign: 'center',
            border: '2px solid #ccc',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Проверить
        </button>
      </div>

      {/* Обратная связь */}
      {feedback && (
        <p
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: feedback.includes('Верно') ? 'green' : 'red',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          {feedback}
        </p>
      )}
    </TaskLayout>
  );
}
