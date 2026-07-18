import React, { useState } from 'react';

const techCategories = ['All', 'Frontend', 'Backend', 'Design', 'Tools'];
const allTech = [
  { name: 'JavaScript', category: 'Frontend', icon: 'JS' },
  { name: 'TypeScript', category: 'Frontend', icon: 'TS' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'Next.js', category: 'Frontend', icon: 'N' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '〰' },
  { name: 'Framer Motion', category: 'Frontend', icon: 'F' },
  { name: 'Node.js', category: 'Backend', icon: 'js' },
  { name: 'Express.js', category: 'Backend', icon: 'ex' },
  { name: 'MongoDB', category: 'Backend', icon: '🍃' },
  { name: 'JWT', category: 'Backend', icon: '🔑' },
  { name: 'Git', category: 'Tools', icon: 'git' },
  { name: 'GitHub', category: 'Tools', icon: '🐙' },
  { name: 'Vercel', category: 'Tools', icon: '▲' },
  { name: 'Figma', category: 'Design', icon: 'F' },
  { name: 'Postman', category: 'Tools', icon: 'P' },
  { name: 'Axios', category: 'Tools', icon: 'A' },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('All');
  
  const filteredTech = activeTab === 'All' 
    ? allTech 
    : allTech.filter(tech => tech.category === activeTab);

  return (
    <section className="section" style={{ borderBottom: '1px dashed var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Tech Stack <span style={{ fontSize: '0.8rem', color: '#555', fontFamily: 'var(--font-sans)' }}>( hover to play )</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {techCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === cat ? '#fff' : '#888',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'color 0.2s',
                fontWeight: activeTab === cat ? 500 : 400
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredTech.map(tech => (
          <div 
            key={tech.name} 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              cursor: 'default',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#222';
              e.currentTarget.style.borderColor = '#444';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#111';
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <span style={{ opacity: 0.7 }}>{tech.icon}</span>
            {tech.name}
          </div>
        ))}
      </div>
    </section>
  );
}
