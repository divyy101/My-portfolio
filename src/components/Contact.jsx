import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitting: false, success: false, error: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Failed to connect to the server. Is it running?' });
    }
  };

  return (
    <section id="contact" className="section" style={{ borderBottom: '1px dashed var(--border-color)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Let's Connect</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Have a project in mind or just want to say hi? I'd love to hear from you.
      </p>
      
      <div style={{ maxWidth: '600px' }}>
        {status.success && (
          <div style={{ padding: '1rem', backgroundColor: '#064e3b', color: '#34d399', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #047857' }}>
            Thanks for reaching out! I'll get back to you soon.
          </div>
        )}
        
        {status.error && (
          <div style={{ padding: '1rem', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #b91c1c' }}>
            {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', fontSize: '1rem' }}
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', fontSize: '1rem' }}
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
              rows="5"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', fontSize: '1rem', resize: 'vertical' }}
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status.submitting}
            className="btn" 
            style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', alignSelf: 'flex-start', opacity: status.submitting ? 0.7 : 1, cursor: status.submitting ? 'not-allowed' : 'pointer' }}
          >
            {status.submitting ? 'Sending...' : (
              <>Send Message <Send size={16} /></>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
