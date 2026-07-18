import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ScrolledTooFar() {
  return (
    <>
      <section className="section" style={{ borderBottom: '1px dashed var(--border-color)', textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>Scrolled Too Far</h2>
        <p style={{ color: '#ccc', marginBottom: '2rem' }}>
          If you've read this far, you might be interested in what I do.
        </p>
        <a href="#contact" className="btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '1rem' }}>
          Let's Talk <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </a>
      </section>

      <section className="section" style={{ borderBottom: '1px dashed var(--border-color)', textAlign: 'center', padding: '6rem 2rem' }}>
        <div style={{ color: '#555', marginBottom: '1.5rem', fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>"</div>
        <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.4 }}>
          "As long as I'm alive, there are infinite chances!"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#666', fontSize: '0.85rem', letterSpacing: '2px' }}>
          <span style={{ width: '40px', height: '1px', backgroundColor: '#333' }}></span>
          MONKEY D. LUFFY
          <span style={{ width: '40px', height: '1px', backgroundColor: '#333' }}></span>
        </div>
      </section>
    </>
  );
}
