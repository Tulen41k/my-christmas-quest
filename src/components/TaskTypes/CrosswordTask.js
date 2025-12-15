// src/components/TaskTypes/CrosswordTask.js

import React, { useState, useMemo, useCallback } from 'react';
import TaskLayout from '../TaskLayout';

export default function CrosswordTask({ task, onTaskComplete }) {
  const [grid, setGrid] = useState(() => {
    const g = Array(task.rows).fill(null).map(() => Array(task.cols).fill(''));
    const blocked = new Set((task.blockedCells || []).map(([r, c]) => `${r},${c}`));
    for (let r = 0; r < task.rows; r++) {
      for (let c = 0; c < task.cols; c++) {
        if (blocked.has(`${r},${c}`)) {
          g[r][c] = null;
        }
      }
    }
    return g;
  });

  const [activeInput, setActiveInput] = useState(null); // { wordIndex, direction }
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // Карта: клетка → слово(а)
  const cellToWords = useMemo(() => {
    const map = {};
    task.words.forEach((word, idx) => {
      if (word.direction === 'across') {
        for (let i = 0; i < word.answer.length; i++) {
          const key = `${word.row},${word.col + i}`;
          if (!map[key]) map[key] = [];
          map[key].push({ wordIndex: idx, direction: 'across' });
        }
      } else {
        for (let i = 0; i < word.answer.length; i++) {
          const key = `${word.row + i},${word.col}`;
          if (!map[key]) map[key] = [];
          map[key].push({ wordIndex: idx, direction: 'down' });
        }
      }
    });
    return map;
  }, [task.words]);

  // Номера слов (только первые клетки)
  const numberedCells = useMemo(() => {
    const numbers = {};
    let num = 1;
    task.words.forEach(word => {
      const key = `${word.row},${word.col}`;
      if (!numbers[key]) {
        numbers[key] = num++;
      }
    });
    return numbers;
  }, [task.words]);

  // Обработка клика по клетке
  const handleCellClick = useCallback((row, col) => {
    const key = `${row},${col}`;
    if (grid[row][col] === null) return; // заблокированная клетка

    const wordsHere = cellToWords[key] || [];
    if (wordsHere.length === 0) return;

    // Берём первое слово (если два — можно уточнить, но для простоты — первое)
    const { wordIndex, direction } = wordsHere[0];
    setActiveInput({ wordIndex, direction });
    setInputValue('');
    setError('');
  }, [grid, cellToWords]);

  const handleSubmit = () => {
    if (!activeInput) return;

    const { wordIndex } = activeInput;
    const word = task.words[wordIndex];
    const userAnswer = inputValue.trim();

    if (userAnswer.toLowerCase() === word.answer.toLowerCase()) {
      // Заполняем сетку
      const newGrid = [...grid.map(row => [...row])];
      if (word.direction === 'across') {
        for (let i = 0; i < word.answer.length; i++) {
          newGrid[word.row][word.col + i] = word.answer[i].toUpperCase();
        }
      } else {
        for (let i = 0; i < word.answer.length; i++) {
          newGrid[word.row + i][word.col] = word.answer[i].toUpperCase();
        }
      }
      setGrid(newGrid);
      setError('Ой, надо ещё подумать!');

      // Проверяем, всё ли решено
      const allFilled = task.words.every(w => {
        if (w.direction === 'across') {
          return w.answer.split('').every((char, i) =>
            newGrid[w.row][w.col + i]?.toUpperCase() === char.toUpperCase()
          );
        } else {
          return w.answer.split('').every((char, i) =>
            newGrid[w.row + i][w.col]?.toUpperCase() === char.toUpperCase()
          );
        }
      });

      if (allFilled) {
        setTimeout(() => onTaskComplete(task.nextClue), 1000);
      }
    } else {
      setError('Неверное слово. Попробуй ещё!');
    }

    setActiveInput(null);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <TaskLayout title={task.title} onTaskComplete={null}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {/* Сетка */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${task.cols}, 40px)`,
            gap: '1px',
            backgroundColor: '#333',
            padding: '2px',
            borderRadius: '4px'
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isNumbered = numberedCells[`${r},${c}`];
              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: cell === null ? '#333' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: cell !== null ? 'pointer' : 'default',
                    fontWeight: cell ? 'bold' : 'normal',
                    fontSize: '1.2rem',
                    color: cell || '#000'
                  }}
                >
                  {cell === null ? null : (
                    <>
                      {isNumbered && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            fontSize: '0.6rem',
                            color: '#666'
                          }}
                        >
                          {isNumbered}
                        </span>
                      )}
                      {cell || ''}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Подсказки */}
        <div style={{ maxWidth: '500px', textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '0.8rem' }}>Подсказки</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <strong>По горизонтали:</strong>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
                {task.words
                  .filter(w => w.direction === 'across')
                  .map((word, i) => {
                    const num = numberedCells[`${word.row},${word.col}`];
                    return (
                      <li key={i}>
                        <strong>{num}. </strong> {word.clue}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div>
              <strong>По вертикали:</strong>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
                {task.words
                  .filter(w => w.direction === 'down')
                  .map((word, i) => {
                    const num = numberedCells[`${word.row},${word.col}`];
                    return (
                      <li key={i}>
                        <strong>{num}. </strong> {word.clue}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        {/* Ввод слова (появляется при клике на клетку) */}
        {activeInput && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 1000
            }}
          >
            <h3 style={{ margin: '0 0 1rem' }}>
              Введите слово
            </h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1.1rem',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '0.4rem 1.2rem',
                  backgroundColor: '#8B0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}
              >
                OK
              </button>
              <button
                onClick={() => setActiveInput(null)}
                style={{
                  padding: '0.4rem 1.2rem',
                  backgroundColor: '#ccc',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </TaskLayout>
  );
}