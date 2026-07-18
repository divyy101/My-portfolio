import React, { useState } from 'react';

const categories = ['All', 'Frontend', 'Backend', 'Java & DSA', 'Tools & Cloud'];

const techList = [
  { name: 'Java', category: 'Java & DSA', level: 90, desc: 'Core Java, OOPs, Collections, Exception Handling, Threading', icon: '☕' },
  { name: 'Data Structures & Algorithms', category: 'Java & DSA', level: 88, desc: 'Arrays, Trees, Graphs, DP, Dynamic Optimization', icon: '🧩' },
  { name: 'React.js', category: 'Frontend', level: 88, desc: 'Hooks, State Management, Custom Components, Router', icon: '⚛️' },
  { name: 'Node.js', category: 'Backend', level: 85, desc: 'Async I/O, Event Loop, REST API Architecture', icon: '🟢' },
  { name: 'Express.js', category: 'Backend', level: 85, desc: 'Middleware, Routing, Error Handling, Controller Patterns', icon: '⚡' },
  { name: 'MongoDB', category: 'Backend', level: 82, desc: 'Aggregations, Schema Modeling, Mongoose ODM', icon: '🍃' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 90, desc: 'Async/Await, Closures, DOM, Modules', icon: '🟨' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 92, desc: 'Semantic Layouts, Responsive Grid, Animations', icon: '🎨' },
  { name: 'FastAPI', category: 'Backend', level: 75, desc: 'Python microservices, Pydantic, async endpoints', icon: '🚀' },
  { name: 'Git & GitHub', category: 'Tools & Cloud', level: 88, desc: 'Version control, branching, PR workflows', icon: '🐙' },
  { name: 'Vercel / Netlify', category: 'Tools & Cloud', level: 85, desc: 'Continuous deployment, Serverless functions', icon: '▲' },
  { name: 'Postman', category: 'Tools & Cloud', level: 85, desc: 'API testing, environment variables, documentation', icon: '📫' },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' 
    ? techList 
    : techList.filter(item => item.category === activeTab);

  return (
    <section className="section" id="skills">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <span className="section-tag">Technical Proficiency</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">Core technologies and frameworks I use to build scalable systems.</p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === cat ? 600 : 400,
                  backgroundColor: activeTab === cat ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: activeTab === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((item, index) => (
            <div key={index} className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {item.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', minHeight: '2.5rem' }}>
                {item.desc}
              </p>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>Proficiency</span>
                  <span>{item.level}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${item.level}%`, 
                      height: '100%', 
                      backgroundColor: 'var(--text-primary)',
                      borderRadius: '3px',
                      transition: 'width 0.8s ease'
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
