// src/pages/JLPTLevels.js - FINAL WORKING VERSION
import React from 'react';
import './JLPTLevels.css';

// Fallback data in case the import fails
const fallbackJlptLevels = [
  {
    level: 'N5',
    name: 'Basic Level',
    description: '~100 Kanji, Basic Grammar',
    color: '#4CAF50'
  },
  {
    level: 'N4',
    name: 'Elementary Level',
    description: '~300 Kanji, Everyday Expressions',
    color: '#2196F3'
  },
  {
    level: 'N3',
    name: 'Intermediate Level',
    description: '~650 Kanji, Daily Life Situations',
    color: '#FF9800'
  },
  {
    level: 'N2',
    name: 'Pre-Advanced Level',
    description: '~1000 Kanji, Complex Texts',
    color: '#F44336'
  },
  {
    level: 'N1',
    name: 'Advanced Level',
    description: '~2000 Kanji, Abstract Topics',
    color: '#9C27B0'
  }
];

// Fallback kanji data
const fallbackKanjiData = {
  n5: [],
  n4: [],
  n3: [],
  n2: [],
  n1: []
};

const JLPTLevels = ({ onLevelChange }) => {
  // Try to import the data, use fallback if it fails
  let jlptLevels = fallbackJlptLevels;
  let kanjiData = fallbackKanjiData;
  
  try {
    const jlptData = require('../data/jlptLevels');
    jlptLevels = jlptData.default || jlptData.jlptLevels || jlptData;
  } catch (error) {
    console.log('Using fallback JLPT levels data');
  }
  
  try {
    const kanjiDataImport = require('../data/kanjiData');
    kanjiData = kanjiDataImport.kanjiData || kanjiDataImport.default || kanjiDataImport;
  } catch (error) {
    console.log('Using fallback kanji data');
  }

  const getDifficultyDots = (level) => {
    const dots = [];
    const activeDots = 
      level === 'N5' ? 1 :
      level === 'N4' ? 2 :
      level === 'N3' ? 3 :
      level === 'N2' ? 4 : 5;
    
    for (let i = 0; i < 5; i++) {
      dots.push(
        <span 
          key={i} 
          className={`difficulty-dot ${i < activeDots ? 'active' : ''}`}
        />
      );
    }
    return dots;
  };

  // Common JLPT N5 kanji for floating animation
  const floatingKanjis = [
    '日', '月', '水', '火', '木', '金', '土', '人', '山', '川',
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '百', '千', '万', '父', '母', '友', '女', '男', '子', '学',
    '生', '先', '校', '本', '語', '文', '字', '名', '田', '町'
  ];

  const features = [
    {
      icon: '📚',
      title: 'Interactive Flashcards',
      description: 'Learn with beautiful flip animations and spaced repetition'
    },
    {
      icon: '🎯',
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed statistics'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Earn badges and rewards as you master kanji'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Learn anywhere, anytime on any device'
    }
  ];

  return (
    <div className="jlpt-levels">
      {/* Animated Background with MORE Floating Kanji */}
      <div className="levels-background">
        {floatingKanjis.map((kanji, index) => (
          <div 
            key={index}
            className="floating-kanji"
            style={{
              animationDelay: `${index * 0.7}s`,
              left: `${10 + (index % 10) * 8}%`,
              top: `${5 + (index % 7) * 13}%`,
              fontSize: `${2 + (index % 4)}rem`,
              opacity: `${0.05 + (index % 10) * 0.02}`
            }}
          >
            {kanji}
          </div>
        ))}
      </div>

      <div className="levels-container">
        <div className="levels-header">
          <h1>Choose Your JLPT Journey</h1>
          <p>Select your proficiency level and start mastering Japanese kanji</p>
          <p className="levels-subtitle">Each level builds upon the previous one - start where you feel comfortable!</p>
        </div>
        
        <div className="levels-grid">
          {jlptLevels.map((level) => {
            const levelKey = level.level ? level.level.toLowerCase() : level.id ? level.id.toLowerCase() : 'n5';
            const kanjiCount = kanjiData[levelKey]?.length || 0;
            return (
              <div
                key={level.level || level.id}
                className="level-card"
                style={{ 
                  background: `linear-gradient(135deg, ${level.color}20, ${level.color}40)`,
                  borderLeft: `5px solid ${level.color}`
                }}
                onClick={() => onLevelChange(level.level || level.id)}
              >
                <div className="level-header">
                  <div 
                    className="level-badge"
                    style={{ background: level.color }}
                  >
                    {level.level || level.id}
                  </div>
                  <h3>{level.name}</h3>
                </div>
                
                <p className="level-description">{level.description}</p>
                
                <div className="level-stats">
                  <span className="kanji-count">
                    {kanjiCount} Kanji Available
                  </span>
                  <div 
                    className="level-difficulty"
                    style={{ color: level.color }}
                  >
                    {getDifficultyDots(level.level || level.id)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="levels-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JLPTLevels;