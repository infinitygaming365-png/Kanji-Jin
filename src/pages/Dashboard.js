// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './Dashboard.css';

const Dashboard = ({ level, user }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 600 }
  });

  const slideUp = useSpring({
    from: { transform: 'translateY(30px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    delay: 200,
    config: { duration: 600 }
  });

  return (
    <animated.div style={fadeIn} className="dashboard">
      <div className="dashboard-header">
        <animated.h1 style={slideUp}>Welcome back, {user?.name}! 👋</animated.h1>
        <animated.p style={slideUp}>You're currently studying <strong>JLPT {level}</strong></animated.p>
      </div>

      <animated.div style={slideUp} className="dashboard-stats">
        <div className="stat-card">
          <h3>Kanji Mastered</h3>
          <div className="stat-number">24</div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '32%' }}></div>
            </div>
            <span>32%</span>
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Current Streak</h3>
          <div className="stat-number">7 days</div>
          <div className="stat-label">Keep going! 🔥</div>
        </div>
        
        <div className="stat-card">
          <h3>Time Studied</h3>
          <div className="stat-number">3.5h</div>
          <div className="stat-label">This week</div>
        </div>
      </animated.div>

      <animated.div style={slideUp} className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/kanji-practice" className="action-card primary">
            <div className="action-icon">📚</div>
            <h3>Kanji Practice</h3>
            <p>Practice kanji with interactive flashcards</p>
          </Link>
          
          <Link to="/jlpt-levels" className="action-card secondary">
            <div className="action-icon">🎯</div>
            <h3>Change Level</h3>
            <p>Switch to a different JLPT level</p>
          </Link>
          
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h3>Progress</h3>
            <p>View your learning statistics</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon">🏆</div>
            <h3>Achievements</h3>
            <p>Unlock badges and rewards</p>
          </div>
        </div>
      </animated.div>

      <animated.div style={slideUp} className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <p>Completed 15 N5 Kanji</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🎯</div>
            <div className="activity-content">
              <p>Perfect score on 日, 月, 水 kanji</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Dashboard;