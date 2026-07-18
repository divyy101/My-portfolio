import React, { useState } from 'react';
import { ExternalLink, Github, Info, ChevronLeft, ChevronRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Campus Cognition',
    status: 'LIVE',
    subtitle: 'Multi-Agent AI System for Student Success',
    desc: 'AI-powered platform with multiple agents for syllabus analysis, PYQ-based exam prep, code debugging, and scholarship recommendations. Centralized decision engine delivers personalized insights across devices.',
    detailedDesc: 'Campus Cognition was engineered to address academic fragmentation. Powered by Google Gemini API and FastAPI microservices, the system uses autonomous agents to parse complex syllabi, curate tailored past-year question solutions, analyze coding errors, and auto-match students with eligible scholarships.',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['MERN Stack', 'Gemini API', 'FastAPI', 'MongoDB', 'Vercel'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://campus-cognition-bk6e.vercel.app/login'
  },
  {
    id: 2,
    title: 'Temple & Pilgrimage Crowd Management System',
    status: 'LIVE',
    subtitle: 'Intelligent High-Density Crowd Control & Analytics',
    desc: 'Intelligent crowd control and monitoring solution designed for high-density pilgrimage sites in Gujarat. Includes real-time crowd analytics visuals and AI surveillance illustrations.',
    detailedDesc: 'Built for high-footfall pilgrimage locations like Somnath and Dwarka, this system integrates video analytics telemetry, queue density heatmaps, and bottleneck warning algorithms to ensure safety and optimized flow during major festivals.',
    images: [
      '/assets/temple.png',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['System Design', 'Crowd Analytics', 'AI Surveillance', 'Web Dev', 'Vercel'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://temple-crowd-management-two.vercel.app/'
  },
  {
    id: 3,
    title: 'Event Registration & Management System',
    status: 'LIVE',
    subtitle: 'College Events, Hackathons & Seminar Platform',
    desc: 'Comprehensive registration platform for college hackathons, tech stage events, and seminars with data validation and dynamic participant management.',
    detailedDesc: 'Handles participant check-ins, automated ticket confirmation badges, dynamic team formation for ideathons, and real-time event analytics dashboards.',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['Java', 'OOP', 'Data Validation', 'React', 'Vercel'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://event-registration-system-xd5f.vercel.app/'
  },
  {
    id: 4,
    title: 'DSA Pattern Tracker',
    status: 'LIVE',
    subtitle: 'Full-Stack Progress Analytics Platform',
    desc: 'Full-stack app to track DSA progress across topics, patterns, and platforms. Features secure CRUD, interactive dashboards, and performance analytics.',
    detailedDesc: 'Helps competitive programmers track their mastery of essential algorithmic patterns (Sliding Window, Two Pointers, Dynamic Programming, Graphs) with streak analytics and solution notes.',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1516116211223-48a12725236c?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Axios'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://dsa-pattern-tracker-foec.vercel.app/'
  },
  {
    id: 5,
    title: 'Study GPS / Campus Portal',
    status: 'LIVE',
    subtitle: 'Academic Topic Prioritizer & Roadmap Tracker',
    desc: 'Navigation app to prioritize topics, analyze syllabus, and track customized study roadmaps for IT undergraduates.',
    detailedDesc: 'Features custom topic weighting algorithms, progress trackers, syllabus breakdown views, and browser state persistence.',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['React', 'Vite', 'LocalStorage', 'Netlify'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://fanciful-dusk-0d9c3c.netlify.app/'
  },
  {
    id: 6,
    title: 'Online Quiz Portal',
    status: 'LIVE',
    subtitle: 'Interactive Testing & Performance Analytics Platform',
    desc: 'Interactive quiz platform featuring multi-language support, real-time timers, category selection, and instant score charts.',
    detailedDesc: 'Built to evaluate technical proficiency with timed tests, interactive Chart.js performance breakdowns, and dynamic question banks.',
    images: [
      'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500'
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'Vercel'],
    githubUrl: 'https://github.com/divyy101',
    liveUrl: 'https://online-quiz-portal-zeta.vercel.app/'
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  const handleNextImage = (projId, total) => {
    setActiveImageIndexes(prev => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % total
    }));
  };

  const handlePrevImage = (projId, total) => {
    setActiveImageIndexes(prev => ({
      ...prev,
      [projId]: ((prev[projId] || 0) - 1 + total) % total
    }));
  };

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Portfolio Showcase</span>
          <h2 className="section-title">Selected 6 Live Projects</h2>
          <p className="section-subtitle">
            A curated showcase of 6 core production web applications, algorithmic trackers, AI platforms, and interactive portals.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((proj) => {
            const currentImgIndex = activeImageIndexes[proj.id] || 0;
            return (
              <div key={proj.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Carousel Image Header */}
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.2rem', backgroundColor: 'var(--bg-secondary)' }}>
                  <img 
                    src={proj.images[currentImgIndex]} 
                    alt={proj.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Status Badge */}
                  <span 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      color: '#22c55e',
                      border: '1px solid #22c55e',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {proj.status}
                  </span>

                  {/* Carousel Controls if multiple images */}
                  {proj.images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => handlePrevImage(proj.id, proj.images.length)}
                        style={{ padding: '0.3rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => handleNextImage(proj.id, proj.images.length)}
                        style={{ padding: '0.3rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                  {proj.subtitle}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', flex: 1 }}>
                  {proj.desc}
                </p>

                {/* Stack Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {proj.stack.map(t => (
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

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
                  <button 
                    onClick={() => setSelectedProject(proj)} 
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    <Info size={14} /> Details
                  </button>
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                    title="View Source on GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={proj.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                    title="Open Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal View for Project Details */}
        {selectedProject && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <div 
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem',
                position: 'relative',
              }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)' }}
              >
                <X size={24} />
              </button>

              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{selectedProject.subtitle}</p>

              <div style={{ width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src={selectedProject.images[0]} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Architecture & Overview</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedProject.detailedDesc}
              </p>

              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Technologies Used</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {selectedProject.stack.map(t => (
                  <span key={t} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Launch Live Demo <ExternalLink size={16} />
                </a>
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View Repository <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
