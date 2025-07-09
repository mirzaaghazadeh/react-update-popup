import React, { useEffect, useState } from 'react';
import './UpdatePopup.css';

const UpdatePopup = ({ onUpdateNow, onDismiss, whatsNew = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const handleUpdateClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onUpdateNow();
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`popup-overlay ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
    >
      <div className={`popup-container ${isVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="popup-header">
          <div className="update-icon">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="spinning-icon"
            >
              <path 
                d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Close popup"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        <div className="popup-content">
          <h2 id="popup-title" className="popup-title">
            🚀 New Update Available!
          </h2>
          <p id="popup-description" className="popup-description">
            We've released a new version with improvements and bug fixes. Update now to get the latest features!
          </p>
          
          {whatsNew.length > 0 && (
            <div className="whats-new-section">
              <button
                className="whats-new-toggle"
                onClick={() => setShowWhatsNew(!showWhatsNew)}
                aria-expanded={showWhatsNew}
              >
                <span>What's New</span>
                <svg
                  className={`chevron-icon ${showWhatsNew ? 'rotated' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {showWhatsNew && (
                <div className="whats-new-content">
                  <ul className="whats-new-list">
                    {whatsNew.map((item, index) => (
                      <li key={index} className="whats-new-item">
                        <div className="item-icon">
                          {item.type === 'feature' && '✨'}
                          {item.type === 'fix' && '🐛'}
                          {item.type === 'improvement' && '⚡'}
                          {item.type === 'security' && '🔒'}
                          {!item.type && '📋'}
                        </div>
                        <div className="item-content">
                          <strong>{item.title}</strong>
                          {item.description && <p>{item.description}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="popup-actions">
            <button
              className="update-button"
              onClick={handleUpdateClick}
              autoFocus
            >
              <span className="button-text">Update Now</span>
              <div className="button-shine"></div>
            </button>
            <button
              className="dismiss-button"
              onClick={handleClose}
            >
              Maybe Later
            </button>
          </div>
        </div>
        
        <div className="popup-decoration">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;