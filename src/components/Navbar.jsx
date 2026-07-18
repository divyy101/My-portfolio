import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, Menu, X, FileText, Award, Mail } from 'lucide-react';

export default function Navbar({ currentPath, setCurrentPath, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Favorites', path: '/favorites' },
  ];

  const handleNavigate = (path) => {
    setCurrentPath(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: scrolled 
          ? (theme === 'dark' ? 'rgba(5, 5, 5, 0.85)' : 'rgba(248, 250, 252, 0.85)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontFamily: 'var(--font-mono)' }}
        >
          <span style={{ color: 'var(--text-muted)' }}>&lt;</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            Divyansh
          </span>
          <span style={{ color: 'var(--text-muted)' }}>/&gt;</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigate(link.path)}
              style={{
                color: currentPath === link.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: currentPath === link.path ? 600 : 400,
                fontSize: '0.95rem',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
            >
              {link.name}
              {currentPath === link.path && (
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '2px',
                    backgroundColor: 'var(--text-primary)',
                    borderRadius: '2px'
                  }} 
                />
              )}
            </button>
          ))}

          {/* More Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '6px',
              }}
            >
              More <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {dropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  minWidth: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                }}
              >
                <a
                  href="#contact"
                  onClick={() => { setDropdownOpen(false); if(currentPath !== '/') handleNavigate('/'); }}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FileText size={14} /> Resume Details
                </a>
                <a
                  href="#about"
                  onClick={() => { setDropdownOpen(false); if(currentPath !== '/') handleNavigate('/'); }}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Award size={14} /> Achievements
                </a>
                <a
                  href="#contact"
                  onClick={() => { setDropdownOpen(false); if(currentPath !== '/') handleNavigate('/'); }}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Mail size={14} /> Contact Me
                </a>
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(15deg)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div style={{ display: 'none' }} className="mobile-toggle-btn">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'var(--text-primary)' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
