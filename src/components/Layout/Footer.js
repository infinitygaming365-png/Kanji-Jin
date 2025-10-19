// src/components/Layout/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="founders-section">
          <h3>Founders</h3>
          <div className="founders-list">
            <div className="founder">
              <strong>John Doe</strong>
              <a href="mailto:john@kanjijin.com">john@kanjijin.com</a>
            </div>
            <div className="founder">
              <strong>Jane Smith</strong>
              <a href="mailto:jane@kanjijin.com">jane@kanjijin.com</a>
            </div>
            <div className="founder">
              <strong>Mike Johnson</strong>
              <a href="mailto:mike@kanjijin.com">mike@kanjijin.com</a>
            </div>
          </div>
        </div>
        
        <div className="improvement-request">
          <h3>Have Suggestions?</h3>
          <p>We'd love to hear your ideas for improvement!</p>
          <a href="mailto:improvements@kanjijin.com" className="improvement-btn">
            Send Improvement Request
          </a>
        </div>
        
        <div className="quick-links">
          <h3>Quick Links</h3>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Kanji Jin. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;