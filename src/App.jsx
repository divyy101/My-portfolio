import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Activity from './components/Activity'
import Blog from './components/Blog'
import Favourites from './components/Favourites'
import Contact from './components/Contact'
import ScrolledTooFar from './components/ScrolledTooFar'
import Footer from './components/Footer'

import './index.css'

function App() {
  useEffect(() => {
    // Disable right click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Projects />
      <TechStack />
      <Activity />
      <Blog />
      <Favourites />
      <Contact />
      <ScrolledTooFar />
      <Footer />
    </div>
  )
}

export default App
