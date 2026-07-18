import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      style={{
        padding: '4rem 0 2rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center', textAlign: 'center' }}>
        {/* Quote */}
        <div style={{ maxWidth: '600px' }}>
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              marginBottom: '0.5rem',
            }}
          >
            "As long as I'm alive, there are infinite chances."
          </p>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>— Personal Philosophy</span>
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a 
            href="https://github.com/divyy101" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/divyansh-singh-9b61b1286" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="mailto:divyanshsingh74178@gmail.com" 
            style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>© 2026 Divyansh Singh. Engineered with</span>
          <Heart size={14} style={{ color: '#ef4444' }} />
          <span>and clean architecture.</span>
        </div>
      </div>
    </footer>
  );
}
