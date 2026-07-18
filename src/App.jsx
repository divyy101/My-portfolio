import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SecurityGuard from './components/SecurityGuard.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import BlogPage from './pages/BlogPage.jsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [theme, setTheme] = useState('dark');

  // Sync Theme Attribute to Root Document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Browser History & Hash Back Button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/projects':
        return <ProjectsPage />;
      case '/favorites':
        return <FavoritesPage />;
      case '/blog':
        return <BlogPage />;
      case '/':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SecurityGuard />
      <Navbar 
        currentPath={currentPath} 
        setCurrentPath={handleNavigate} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      <Footer />
    </div>
  );
}
