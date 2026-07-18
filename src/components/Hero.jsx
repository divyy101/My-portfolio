import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const roles = [
  "Full Stack Developer",
  "MERN Developer",
  "Java Developer",
  "Problem Solver",
  "Tech Enthusiast"
];

export default function Hero({ onNavigate }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect Logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section 
      style={{
        paddingTop: '2rem',
        paddingBottom: '3rem',
        borderBottom: '1px dashed var(--border-color)',
      }}
    >
      <div className="container">
        {/* 1. LOCAL ANIMATED WATERFALL BANNER VIDEO (Looping) */}
        <div 
          style={{ 
            width: '100%', 
            height: '250px', 
            borderRadius: '16px', 
            overflow: 'hidden',
            marginBottom: '2.5rem',
            position: 'relative',
            border: '1px solid var(--border-color)',
            backgroundColor: '#050505',
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              objectPosition: 'center 50%',
              filter: 'brightness(0.9) contrast(1.08)',
            }}
          >
            <source src="/assets/bg-waterfall.mp4" type="video/mp4" />
          </video>
          {/* Subtle Vignette Gradient */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, var(--bg-primary) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* 2. Profile Info Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem', 
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Profile Picture Frame */}
          <div 
            style={{ 
              position: 'relative',
              width: '130px', 
              height: '130px', 
              borderRadius: '20px', 
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              flexShrink: 0,
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            }}
          >
            {/* Blurred animated glow background behind */}
            <div 
              style={{
                position: 'absolute',
                inset: '-10px',
                backgroundImage: 'url(/assets/profile.jpg)',
                backgroundSize: 'cover',
                filter: 'blur(20px) opacity(0.5)',
                zIndex: 0,
              }}
            />
            <img 
              src="/assets/profile.jpg" 
              alt="Divyansh Singh" 
              style={{ 
                position: 'relative',
                zIndex: 1,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
              }}
            />
          </div>

          {/* Profile Text Details */}
          <div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: '0.3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              Divyansh Singh
            </h1>
            <div style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>I'm a</span>
              <span style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--text-primary)' }}>
                {displayText}
                <span style={{ opacity: 0.7, animation: 'pulseGlow 1s infinite' }}>|</span>
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              B.Tech IT • Java, DSA & MERN Stack • Lucknow, India
            </p>
          </div>
        </div>

        {/* 3. About Bullet Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            About
          </h2>
          <ul 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.05rem', 
              lineHeight: 1.7, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              paddingLeft: '1.4rem' 
            }}
          >
            <li>
              I'm an <strong>IT Developer</strong> and <strong>Java/DSA Enthusiast</strong> passionate about building scalable web applications and mastering complex data structures & algorithms.
            </li>
            <li>
              I design and build modern applications using <strong>React, Node.js, Express, and Java</strong>, focusing on clean architecture, optimized performance, and delightful user interactions.
            </li>
            <li>
              Currently a <strong>B.Tech IT Final Year student</strong> at RR Institute of Modern Technology, I serve as the <strong>Vice President of NIITS</strong> and enjoy solving complex engineering challenges.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('/projects')} className="btn btn-primary">
            View All 6 Projects <ArrowRight size={16} />
          </button>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
