import React from 'react';
import { GraduationCap, Award, CheckCircle, Flame, Code2, Users, BookOpen, Music, Sparkles } from 'lucide-react';

export default function About() {
  const education = [
    {
      institution: 'RR Institute of Modern Technology, Lucknow (AKTU)',
      degree: 'Bachelor of Technology, Information Technology',
      year: '2023 – Present',
      score: 'CGPA: 8.1 (81%)'
    },
    {
      institution: 'St. Fidelis College, Lucknow',
      degree: 'Intermediate (ISC)',
      year: '2023',
      score: 'Percentage: 81.5%'
    },
    {
      institution: 'St. Fidelis College, Lucknow',
      degree: 'High School (ICSE)',
      year: '2021',
      score: 'Percentage: 85.8%'
    }
  ];

  const certifications = [
    { name: 'LLM for Young Developers', issuer: 'IndiaAI & Meta, Nasscom FutureSkills Prime (2026)' },
    { name: 'Data Structures & Algorithms (Intermediate)', issuer: 'TrainX (2026)' },
    { name: 'Python Basics', issuer: 'Infosys Springboard (2025) & HackerRank (2026)' },
    { name: 'Data Analytics for Beginners', issuer: 'Simplilearn (2026)' },
  ];

  const achievements = [
    {
      title: '2nd Runner-Up — Purvanchal Ideathon 2025',
      desc: 'Secured podium finish among competing teams for technical innovation, prototype design, and problem solving.'
    },
    {
      title: 'Smart India Hackathon (SIH) Lead Coordinator',
      desc: 'Organized and coordinated the SIH Internal Hackathon, managing event planning, logistics, and team shortlisting.'
    },
    {
      title: 'Vice President of NIITS & Tech Leadership',
      desc: 'Led technical society initiatives, hosted ideathons, coding contests, and peer developer mentorship programs.'
    },
    {
      title: '100+ Coding Problems Solved',
      desc: 'Strengthened core DSA across LeetCode, GeeksforGeeks, and HackerRank platforms.'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">About & Credentials</span>
          <h2 className="section-title">Driven by Engineering & Innovation</h2>
          <p className="section-subtitle">
            B.Tech IT undergraduate at RR Institute of Modern Technology combining full-stack development, AI applications, and tech society leadership.
          </p>
        </div>

        {/* Bio & Education Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
          {/* Left Column: Detailed Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            <p>
              I am a <strong style={{ color: 'var(--text-primary)' }}>Motivated B.Tech Information Technology Student</strong> with strong expertise in Java, Python, JavaScript, and the MERN Stack, combined with a solid foundation in Data Structures & Algorithms and full-stack web engineering.
            </p>
            <p>
              Passionate about building <strong style={{ color: 'var(--text-primary)' }}>AI-powered applications</strong> and scalable software solutions. As the <strong style={{ color: 'var(--text-primary)' }}>Vice President of NIITS</strong> and coordinator for the Smart India Hackathon (SIH) internal event, I enjoy fostering developer communities and taking on high-impact coding challenges.
            </p>
            <p>
              When I'm not debugging or optimizing algorithms, I enjoy open-source contributions, exploring AI LLM agents, and singing.
            </p>

            {/* Quote Block */}
            <div 
              style={{
                marginTop: '1rem',
                padding: '1.5rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-card)',
                borderLeft: '4px solid var(--text-primary)',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
              }}
            >
              "Good software is built twice — once in logic, once in code."
            </div>
          </div>

          {/* Right Column: Education Timeline */}
          <div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <GraduationCap size={24} /> Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {education.map((edu, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.2rem 1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      {edu.degree}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {edu.year}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {edu.institution}
                  </p>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {edu.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Achievements Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          {/* Achievements */}
          <div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={24} /> Key Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {achievements.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.2rem 1.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle size={24} /> Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {certifications.map((cert, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {cert.name}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
