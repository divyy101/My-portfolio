import React from 'react';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import TechStack from '../components/TechStack.jsx';
import GithubHeatmap from '../components/GithubHeatmap.jsx';
import LeetcodeActivity from '../components/LeetcodeActivity.jsx';
import Contact from '../components/Contact.jsx';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const featuredProjects = [
    {
      id: 'dsa-tracker',
      title: 'DSA Pattern Tracker',
      desc: 'Full-stack progress analytics platform to track DSA progress across topics, patterns, and platforms.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: 'https://dsa-pattern-tracker-foec.vercel.app/',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      id: 'temple-crowd',
      title: 'Temple Crowd Management System',
      desc: 'Intelligent crowd control and surveillance solution designed for high-density Gujarat pilgrimage sites.',
      stack: ['System Design', 'Crowd Analytics', 'AI Surveillance'],
      liveUrl: 'https://temple-crowd-management-two.vercel.app/',
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      id: 'campus-cognition',
      title: 'Campus Cognition',
      desc: 'Multi-agent AI platform with decision engines for student success, PYQ prep, and syllabus analysis.',
      stack: ['MERN Stack', 'Gemini API', 'FastAPI'],
      liveUrl: 'https://campus-cognition-bk6e.vercel.app/login',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600&h=400'
    }
  ];

  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <About />
      <TechStack />

      {/* Featured Projects Preview Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-tag">Featured Work</span>
              <h2 className="section-title">Selected Projects</h2>
              <p className="section-subtitle">A preview of production applications and intelligent systems I've built.</p>
            </div>

            <button onClick={() => onNavigate('/projects')} className="btn btn-secondary">
              View All 6 Projects <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '1.2rem',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', flex: 1 }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                  {proj.stack.map((t) => (
                    <span 
                      key={t}
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a 
                  href={proj.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', justifyContent: 'center' }}
                >
                  Live Demo <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GithubHeatmap />
      <LeetcodeActivity />
      <Contact />
    </div>
  );
}
