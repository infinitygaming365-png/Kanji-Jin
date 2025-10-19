// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 800 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, accept any login
    onLogin({ username, name: username });
  };

  return (
    <animated.div style={fadeIn} className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Kanji Jin</h1>
          <p className="login-subtitle">Master Japanese Kanji</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            Start Learning
          </button>
        </form>
        
        <div className="demo-note">
          <p>Demo: Any username/password will work</p>
        </div>
      </div>
    </animated.div>
  );
};

export default Login;