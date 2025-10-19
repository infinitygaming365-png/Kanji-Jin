import React from 'react';
import './Header.css';

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

export default Header;