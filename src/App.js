// src/App.js - COMPLETE VERSION WITH JLPT LEVELS
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import FlashcardDeck from './components/Kanji/FlashcardDeck';
import { kanjiData } from './data/kanjiData';
import JLPTLevels from './pages/JLPTLevels';

// Login Component
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, name: username });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">漢字ジン</h1>
        <p className="login-subtitle">Kanji Jin - Master Japanese</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter any username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Start Learning Journey
          </button>
        </form>
        
        <p className="demo-note">
          Demo: Any username will work
        </p>
      </div>
    </div>
  );
};

// Level Selection Component
const LevelSelection = ({ onLevelSelect }) => {
  const levels = [
    { id: 'N5', name: 'Basic Level', color: '#4CAF50', description: '~100 Kanji, Basic Grammar' },
    { id: 'N4', name: 'Elementary Level', color: '#2196F3', description: '~300 Kanji, Everyday Expressions' },
    { id: 'N3', name: 'Intermediate Level', color: '#FF9800', description: '~650 Kanji, Daily Life Situations' },
    { id: 'N2', name: 'Pre-Advanced Level', color: '#F44336', description: '~1000 Kanji, Complex Texts' },
    { id: 'N1', name: 'Advanced Level', color: '#9C27B0', description: '~2000 Kanji, Abstract Topics' }
  ];
  
  return (
    <div className="level-selection-container">
      <div className="level-selection-header">
        <h1>Choose Your JLPT Level</h1>
        <p>Select your current proficiency level to start learning</p>
      </div>
      
      <div className="levels-grid">
        {levels.map((level) => {
          const kanjiCount = kanjiData[level.id.toLowerCase()]?.length || 0;
          return (
            <div
              key={level.id}
              className="level-card"
              style={{ background: level.color }}
              onClick={() => onLevelSelect(level.id)}
            >
              <div className="level-badge">{level.id}</div>
              <h3 className="level-name">{level.name}</h3>
              <p className="level-description">{level.description}</p>
              <div className="level-stats">
                {kanjiCount} Kanji Available
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ level, user, onLogout, onStartPractice, onViewLevels }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Kanji Jin! 🎉</h1>
        <p>Hello <strong>{user?.name}</strong>, you're learning <strong>JLPT {level}</strong></p>
      </div>

      <div className="dashboard-content">
        <div className="feature-cards">
          <div className="feature-card" onClick={onStartPractice}>
            <h3>📚 Kanji Practice</h3>
            <p>Learn kanji with interactive flashcards</p>
            <button className="feature-button">Start Practicing</button>
          </div>
          
          <div className="feature-card" onClick={onViewLevels}>
            <h3>🎯 JLPT Levels</h3>
            <p>Explore all JLPT proficiency levels</p>
            <button className="feature-button">View Levels</button>
          </div>
          
          <div className="feature-card">
            <h3>📊 Progress</h3>
            <p>Track your learning journey</p>
            <button className="feature-button">Coming Soon</button>
          </div>
        </div>

        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

// Kanji Practice Component
const KanjiPractice = ({ level, user, onBack, onLogout }) => {
  const kanjiList = kanjiData[level.toLowerCase()] || [];

  return (
    <div className="kanji-practice">
      <div className="practice-header">
        <button onClick={onBack} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>JLPT {level} Kanji Practice</h1>
        <p>Master {kanjiList.length} kanji characters for JLPT {level}</p>
        
        <button onClick={onLogout} className="logout-button-small">
          Logout
        </button>
      </div>

      <FlashcardDeck kanjiList={kanjiList} level={level} />
    </div>
  );
};

// Header Component for Navigation
const Header = ({ user, onLogout, currentView, onNavigate }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <h1 className="main-title">漢字ジン - Kanji Jin</h1>
        </div>
        
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={currentView === 'dashboard' ? 'active' : ''}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('practice')}
              className={currentView === 'practice' ? 'active' : ''}
            >
              Kanji Practice
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('levels')}
              className={currentView === 'levels' ? 'active' : ''}
            >
              JLPT Levels
            </button>
          </li>
        </ul>
        
        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'practice', 'levels'

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedLevel(null);
    setCurrentView('dashboard');
  };

  const handleStartPractice = () => {
    setCurrentView('practice');
  };

  const handleViewLevels = () => {
    setCurrentView('levels');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : !selectedLevel ? (
        <LevelSelection onLevelSelect={handleLevelSelect} />
      ) : (
        <>
          <Header 
            user={user} 
            onLogout={handleLogout}
            currentView={currentView}
            onNavigate={handleNavigate}
          />
          
          <main className="main-content">
            {currentView === 'practice' ? (
              <KanjiPractice 
                level={selectedLevel} 
                user={user} 
                onBack={handleBackToDashboard}
                onLogout={handleLogout}
              />
            ) : currentView === 'levels' ? (
              <JLPTLevels onLevelChange={handleLevelSelect} />
            ) : (
              <Dashboard 
                level={selectedLevel} 
                user={user} 
                onLogout={handleLogout}
                onStartPractice={handleStartPractice}
                onViewLevels={handleViewLevels}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;