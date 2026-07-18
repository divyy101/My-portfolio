import React, { useEffect, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function SecurityGuard() {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Console warning deterrent message
    console.log(
      '%cSTOP!',
      'color: #ef4444; font-size: 40px; font-weight: bold; -webkit-text-stroke: 1px black;'
    );
    console.log(
      '%cThis is a browser feature intended for developers. Source code inspection deterrent active.',
      'font-size: 16px; color: #888;'
    );

    // Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast('Right-click context menu is disabled.');
    };

    // Keyboard Shortcuts Deterrent
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        showToast('Developer tools (F12) are restricted.');
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        showToast('Inspect element shortcut is restricted.');
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        showToast('View source shortcut is restricted.');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div className="security-toast">
      <ShieldAlert size={18} />
      <span>{toastMessage}</span>
      <button onClick={() => setToastMessage(null)} style={{ color: '#ef4444', marginLeft: 'auto' }}>
        <X size={14} />
      </button>
    </div>
  );
}
