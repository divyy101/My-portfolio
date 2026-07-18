import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Event Registration System',
    description: 'College event registration platform with data validation and dynamic array management.',
    status: 'Live',
    stack: ['Java', 'OOP', 'Data Validation', 'Vercel'],
    liveUrl: 'https://event-registration-system-xd5f.vercel.app/',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 2,
    title: 'DSA Pattern Tracker',
    description: 'Full-stack progress analytics platform to track DSA progress across topics, patterns, and platforms.',
    status: 'Live',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://dsa-pattern-tracker-foec.vercel.app/',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 3,
    title: 'Temple & Pilgrimage Crowd Management',
    description: 'Intelligent crowd control and monitoring solution designed for high-density pilgrimage sites.',
    status: 'Live',
    stack: ['System Design', 'Crowd Analytics', 'Web Dev'],
    liveUrl: 'https://temple-crowd-management-two.vercel.app/',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 4,
    title: 'Online Quiz Portal',
    description: 'Interactive quiz platform featuring multi-language support, real-time timers, and performance charts.',
    status: 'Live',
    stack: ['HTML/CSS', 'JavaScript', 'Chart.js'],
    liveUrl: 'https://online-quiz-portal-zeta.vercel.app/',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 5,
    title: 'Study GPS / Campus Portal',
    description: 'Navigation app to prioritize topics, analyze syllabus, and track customized study roadmaps.',
    status: 'Live',
    stack: ['React', 'Vite', 'LocalStorage', 'Netlify'],
    liveUrl: 'https://fanciful-dusk-0d9c3c.netlify.app/',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=400',
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ borderBottom: '1px dashed var(--border-color)' }}>
      <div className="section-header" style={{ padding: '0 2rem 2rem 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Selected Projects</h2>
        <p style={{ color: 'var(--text-muted)' }}>A collection of production applications and systems I've built.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '0' }}>
        {projects.map((project, index) => (
          <div key={project.id} style={{ 
            padding: '3rem 2rem', 
            borderBottom: '1px dashed var(--border-color)',
            borderRight: index % 2 === 0 ? '1px dashed var(--border-color)' : 'none',
          }}>
            <div style={{ 
              backgroundColor: '#111', 
              borderRadius: '8px', 
              overflow: 'hidden',
              marginBottom: '1.5rem',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #222'
            }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{project.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#10b981' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                {project.status}
              </div>
            </div>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem', minHeight: '2.8rem' }}>
              {project.description}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {project.stack.map(tech => (
                  <span key={tech} style={{ 
                    padding: '4px 10px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem',
                    color: '#ccc'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn" 
                  style={{ padding: '6px 14px', fontSize: '0.85rem', borderRadius: '6px', gap: '6px' }}
                >
                  Live Demo <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
