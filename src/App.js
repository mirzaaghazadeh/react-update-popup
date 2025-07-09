import React, { useState, useEffect } from 'react';
import UpdatePopup from './components/UpdatePopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Restore localStorage data after hard reload
    const backupData = sessionStorage.getItem('__temp_localStorage_backup');
    if (backupData) {
      try {
        const localStorageData = JSON.parse(backupData);
        Object.keys(localStorageData).forEach(key => {
          localStorage.setItem(key, localStorageData[key]);
        });
        // Clean up the temporary backup
        sessionStorage.removeItem('__temp_localStorage_backup');
        console.log('localStorage restored after update');
      } catch (error) {
        console.error('Failed to restore localStorage:', error);
        sessionStorage.removeItem('__temp_localStorage_backup');
      }
    }

    // Simulate checking for updates after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateNow = () => {
    // Save localStorage data before hard reload
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageData[key] = localStorage.getItem(key);
    }
    
    // Store the data temporarily in sessionStorage
    sessionStorage.setItem('__temp_localStorage_backup', JSON.stringify(localStorageData));
    
    // Force hard reload (equivalent to Ctrl+F5) - clears CDN cache for JS/CSS files
    window.location.reload(true);
  };

  const handleDismiss = () => {
    setShowPopup(false);
  };

  // Sample "What's New" data with 5-6 items
  const whatsNewData = [
    {
      type: 'feature',
      title: 'Enhanced User Interface',
      description: 'Redesigned dashboard with improved navigation and modern design elements.'
    },
    {
      type: 'improvement',
      title: 'Performance Optimizations',
      description: 'Faster loading times and improved responsiveness across all pages.'
    },
    {
      type: 'security',
      title: 'Security Updates',
      description: 'Enhanced security measures and updated encryption protocols.'
    },
    {
      type: 'fix',
      title: 'Bug Fixes',
      description: 'Resolved issues with form validation and mobile compatibility.'
    },
    {
      type: 'feature',
      title: 'New API Integration',
      description: 'Added support for third-party services and webhook notifications.'
    },
    {
      type: 'improvement',
      title: 'Accessibility Improvements',
      description: 'Better screen reader support and keyboard navigation enhancements.'
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Amazing Update Popup Demo</h1>
        <p>This is a sample React application demonstrating a beautiful update notification popup.</p>
        <div className="demo-content">
          <div className="feature-card">
            <h3>🎨 Modern UI Design</h3>
            <p>Clean, minimalist design with smooth animations</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Works perfectly on all devices and screen sizes</p>
          </div>
          <div className="feature-card">
            <h3>♿ Accessible</h3>
            <p>Built with accessibility best practices in mind</p>
          </div>
        </div>
        <button 
          className="trigger-button"
          onClick={() => setShowPopup(true)}
        >
          Show Update Popup
        </button>
      </header>
      
      {showPopup && (
        <UpdatePopup
          onUpdateNow={handleUpdateNow}
          onDismiss={handleDismiss}
          whatsNew={whatsNewData}
        />
      )}
    </div>
  );
}

export default App;