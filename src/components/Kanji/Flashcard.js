import React, { useState, useEffect } from 'react';
import './Flashcard.css';

const Flashcard = ({ kanji, onNext, onPrevious, canGoPrevious, canGoNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when kanji changes
  useEffect(() => {
    setIsFlipped(false);
  }, [kanji]); // This runs every time the kanji prop changes

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNext();
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    onPrevious();
  };

  const handleFlipButton = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <button 
          onClick={handlePrevious} 
          disabled={!canGoPrevious}
          className="nav-button"
        >
          ← Previous
        </button>
        <span className="progress-text">
          {isFlipped ? 'Click to see kanji' : 'Click to reveal meaning'}
        </span>
        <button 
          onClick={handleNext} 
          disabled={!canGoNext}
          className="nav-button"
        >
          Next →
        </button>
      </div>

      <div className="flashcard-wrapper">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleCardClick}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="kanji-character">{kanji.character}</div>
              <div className="hint">Click to reveal meaning</div>
            </div>
            
            <div className="flashcard-back">
              <div className="kanji-details">
                <h2>{kanji.character}</h2>
                <p className="meaning"><strong>Meaning:</strong> {kanji.meaning}</p>
                <p className="reading"><strong>Onyomi:</strong> {kanji.onyomi}</p>
                <p className="reading"><strong>Kunyomi:</strong> {kanji.kunyomi}</p>
                <p className="stroke-count"><strong>Strokes:</strong> {kanji.strokeCount}</p>
                <p className="example"><strong>Example:</strong> {kanji.example}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-footer">
        <button onClick={handleFlipButton} className="flip-button">
          {isFlipped ? 'Show Kanji' : 'Show Meaning'}
        </button>
      </div>
    </div>
  );
};

export default Flashcard;