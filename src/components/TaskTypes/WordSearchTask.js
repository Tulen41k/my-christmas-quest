// src/components/TaskTypes/WordSearchTask.js

import React, { useState, useMemo } from 'react';
import TaskLayout from '../TaskLayout';

export default function WordSearchTask({ task, onTaskComplete }) {
  const [userWords, setUserWords] = useState(new Set());
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  // Создаём карту: слово → массив координат
  const wordToCoords = useMemo(() => {
    const map = {};
    task.words.forEach(({ word, coords }) => {
      map[word.toLowerCase()] = coords;
    });
    return map;
  }, [task.words]);

  // Создаём сетку координат → статус (найдено/нет)
  const [highlighted, setHighlighted] = useState(new Set());

  const handleSubmit = () => {
    const word = inputValue.trim().toLowerCase();
    if (!word) return;

    if (wordToCoords[word]) {
      // Слово найдено!
      const newHighlighted = new Set(highlighted);
      wordToCoords[word].forEach(coord => {
        newHighlighted.add(`${coord[0]},${coord[1]}`);
      });
      setHighlighted(newHighlighted);
      setUserWords(prev => new Set([...prev, word]));
      setFeedback('Найдено! 🎯');
      setInputValue('');

      // Проверяем, все ли слова найдены
      if (newHighlighted.size === task.totalCellsToHighlight) {
        setTimeout(() => onTaskComplete(task.nextClue), 1500);
      }
    } else {
      setFeedback('Такого слова нет в сетке.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // Генерация сетки 10x10
  const grid = useMemo(() => {
    const g = Array(10).fill(null).map(() => Array(10).fill(''));
    // Сначала заполняем случайными буквами
    const letters = 'абвгдежзиклмнопрстуфхцчшщэюя';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        g[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
    // Теперь **перезаписываем** нужные позиции из слов
    task.words.forEach(({ coords }) => {
      coords.forEach(([row, col], idx) => {
        // Здесь можно добавить логику, но пока оставим как есть
        // Ты сама заполнишь буквы вручную позже
      });
    });
    return g;
  }, [task.words]);

  // Пока просто показываем сетку с заглушками (ты заполнишь буквы позже)
  // Но для демонстрации сделаем фиксированную сетку из task.grid

  const displayGrid = task.grid || grid;

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Найди {task.words.length} слов и введи их по одному.
      </p>

      {/* Сетка */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '2px',
          maxWidth: '320px',
          margin: '0 auto 1.5rem',
          border: '2px solid #ccc',
          borderRadius: '4px',
          padding: '4px'
        }}
      >
        {displayGrid.map((row, i) =>
          row.map((letter, j) => {
            const isHighlighted = highlighted.has(`${i},${j}`);
            return (
              <div
                key={`${i}-${j}`}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isHighlighted ? '#a8e6a1' : '#f0f0f0',
                  border: '1px solid #ccc',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      {/* Поле ввода */}
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите слово..."
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '180px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '0.5rem',
            padding: '0.4rem 1rem',
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Добавить слово
        </button>
      </div>

      {feedback && (
        <p style={{ textAlign: 'center', color: feedback.includes('Найдено') ? 'green' : 'red', marginTop: '0.5rem' }}>
          {feedback}
        </p>
      )}

      <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
        Найдено: {userWords.size} из {task.words.length}
      </div>
    </TaskLayout>
  );
}