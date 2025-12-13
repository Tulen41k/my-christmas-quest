// src/App.js

import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuizTask from './components/TaskTypes/QuizTask';
import CrosswordTask from './components/TaskTypes/CrosswordTask';
import { tasks } from './data/tasks';
import CipherTask from './components/TaskTypes/CipherTask';

function App() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [clue, setClue] = useState('');

  const startQuest = () => {
    setCurrentTaskIndex(0);
  };

  const completeTask = (nextClue) => {
    setClue(nextClue);
    if (currentTaskIndex < tasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setClue('');
      }, 2000);
    } else {
      // Последнее задание — можно показать финал
      alert('Поздравляем! Ты прошёл весь квест! 🎁');
    }
  };

  if (currentTaskIndex === null) {
    return <HomePage onStart={startQuest} />;
  }

  const task = tasks[currentTaskIndex];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff9f9', minHeight: '100vh' }}>
      {clue && (
        <div style={{
          backgroundColor: '#fff3cd',
          padding: '1rem',
          textAlign: 'center',
          fontSize: '1.1rem',
          margin: '1rem auto',
          maxWidth: '800px'
        }}>
          🔑 {clue}
        </div>
      )}
      {task.type === 'cipher' && <CipherTask task={task} onTaskComplete={completeTask} />}
      {task.type === 'quiz' && <QuizTask task={task} onTaskComplete={completeTask} />}
      {task.type === 'crossword' && <CrosswordTask task={task} onTaskComplete={completeTask} />}
    </div>
  );
}

export default App;
