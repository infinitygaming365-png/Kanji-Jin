// src/pages/KanjiPractice.js
import React, { useState } from 'react';
import FlashcardDeck from '../components/Kanji/FlashcardDeck';
import KanjiGrid from '../components/Kanji/KanjiGrid';
import { kanjiData } from '../data/kanjiData';
import './KanjiPractice.css';

const KanjiPractice = ({ level }) => {
  const [view, setView] = useState('flashcards'); // 'flashcards' or 'grid'
  const kanjiList = kanjiData[level.toLowerCase()] || [];

  return (
    <div className="kanji-practice">
      <div className="practice-header">
        <h1>JLPT {level} Kanji Practice</h1>
        <p>Master {kanjiList.length} kanji characters for JLPT {level}</p>
        
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${view === 'flashcards' ? 'active' : ''}`}
            onClick={() => setView('flashcards')}
          >
            📚 Flashcards
          </button>
          <button 
            className={`toggle-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
          >
            🔢 Kanji Grid
          </button>
        </div>
      </div>

      {view === 'flashcards' ? (
        <FlashcardDeck kanjiList={kanjiList} level={level} />
      ) : (
        <KanjiGrid kanjiList={kanjiList} level={level} />
      )}
    </div>
  );
};

export default KanjiPractice;