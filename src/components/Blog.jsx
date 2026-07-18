import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Blog() {
  return (
    <section className="section" style={{ borderBottom: '1px dashed var(--border-color)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Blog</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Thoughts, learnings, and experiences on engineering, cybersecurity, and design.
      </p>

      <div style={{ padding: '2rem 0', borderTop: '1px dashed var(--border-color)', borderBottom: '1px dashed var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem' }}>
              July 16, 2026 • 2 min read
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-sans)' }}>
              Hello World: My Introduction
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              A brief introduction about who I am, what I do, and why I started this blog.
            </p>
          </div>
          <ArrowUpRight size={20} color="var(--text-muted)" />
        </div>
      </div>
    </section>
  );
}
