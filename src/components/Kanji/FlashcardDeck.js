import React, { useState } from 'react';
import Flashcard from './Flashcard';
import './FlashcardDeck.css';

const FlashcardDeck = ({ kanjiList, level }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [key, setKey] = useState(0); // Add this key to force re-render

  const handleNext = () => {
    // Increment key to force Flashcard to re-render completely
    setKey(prevKey => prevKey + 1);
    setCurrentIndex((prevIndex) => 
      prevIndex === kanjiList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    // Increment key to force Flashcard to re-render completely
    setKey(prevKey => prevKey + 1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? kanjiList.length - 1 : prevIndex - 1
    );
  };

  const markAsKnown = () => {
    setCorrectAnswers(prev => prev + 1);
    handleNext();
  };

  if (kanjiList.length === 0) {
    return (
      <div className="empty-deck">
        <h2>No kanji data available for JLPT {level}</h2>
        <p>Please check back later or try another level.</p>
      </div>
    );
  }

  const currentKanji = kanjiList[currentIndex];
  const progress = ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <div className="flashcard-deck">
      <div className="deck-header">
        <h1>JLPT {level} Kanji Flashcards</h1>
        <div className="level-badge">
          Level {level} • {kanjiList.length} Kanji
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {currentIndex + 1} / {kanjiList.length}
        </span>
      </div>

      {/* Add key prop to force complete re-render */}
      <Flashcard 
        key={key} // This forces React to create a new Flashcard instance
        kanji={currentKanji}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < kanjiList.length - 1}
      />

      <div className="deck-controls">
        <button onClick={markAsKnown} className="known-button">
          ✅ I Know This Kanji
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{correctAnswers}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{kanjiList.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Math.round((correctAnswers / kanjiList.length) * 100)}%
          </div>
          <div className="stat-label">Progress</div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;