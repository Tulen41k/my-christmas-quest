// src/App.js

import React, { useState } from 'react';
import HomePage from './components/HomePage';
import VictoryPage from './components/VictoryPage';

// Типы заданий
import CipherTask from './components/TaskTypes/CipherTask';
import SimpleInputTask from './components/TaskTypes/SimpleInputTask';
import QuizTask from './components/TaskTypes/QuizTask';
import WordSearchTask from './components/TaskTypes/WordSearchTask';
import CrosswordTask from './components/TaskTypes/CrosswordTask';

// Данные
import { tasks } from './data/tasks';

function App() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [clue, setClue] = useState('');
  const [isVictory, setIsVictory] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const startQuest = () => {
    setCurrentTaskIndex(0);
  };

  const completeTask = (nextClue) => {
    if (isCompleting) return;
    setIsCompleting(true);

    const currentTask = tasks[currentTaskIndex];
    const isLastTask = currentTask?.isFinal;

    if (!isLastTask) {
      setClue(nextClue);
      setTimeout(() => {
        setCurrentTaskIndex(prev => prev + 1);
        setClue('');
        setIsCompleting(false);
      }, 2000);
    } else {
      // Финальная страница
      setTimeout(() => {
        setIsVictory(true);
        setIsCompleting(false);
      }, 2000);
    }
  };

  // Финальная страница
  if (isVictory) {
    return <VictoryPage />;
  }

  // Главная страница
  if (currentTaskIndex === null) {
    return <HomePage onStart={startQuest} />;
  }

  // Текущее задание
  const task = tasks[currentTaskIndex];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {/* Подсказка после успешного задания */}
      {clue && (
        <div
          style={{
            backgroundColor: '#e9f7ef',
            padding: '1rem',
            textAlign: 'center',
            fontSize: '1.1rem',
            margin: '1rem auto',
            maxWidth: '800px',
            borderRadius: '6px',
            border: '1px solid #a8d8b9'
          }}
        >
          🔑 {clue}
        </div>
      )}

      {/* Рендер задания с уникальным key */}
      {task.type === 'cipher' && (
        <CipherTask key={task.id} task={task} onTaskComplete={completeTask} />
      )}
      {task.type === 'simpleInput' && (
        <SimpleInputTask key={task.id} task={task} onTaskComplete={completeTask} />
      )}
      {task.type === 'quiz' && (
        <QuizTask key={task.id} task={task} onTaskComplete={completeTask} />
      )}
      {task.type === 'wordSearch' && (
        <WordSearchTask key={task.id} task={task} onTaskComplete={completeTask} />
      )}
      {task.type === 'crossword' && (
        <CrosswordTask key={task.id} task={task} onTaskComplete={completeTask} />
      )}
    </div>
  );
}

export default App;