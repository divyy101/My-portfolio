import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Code2, Phone, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message.');

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      value: 'divyanshsingh74178@gmail.com',
      href: 'mailto:divyanshsingh74178@gmail.com',
      icon: <Mail size={20} />,
      color: '#ea4335'
    },
    {
      name: 'Phone / WhatsApp',
      value: '+91 9555807076',
      href: 'tel:+919555807076',
      icon: <Phone size={20} />,
      color: '#22c55e'
    },
    {
      name: 'GitHub',
      value: 'github.com/divyy101',
      href: 'https://github.com/divyy101',
      icon: <Github size={20} />,
      color: '#f0f6fc'
    },
    {
      name: 'LeetCode',
      value: 'leetcode.com/u/divyy101',
      href: 'https://leetcode.com/u/divyy101/',
      icon: <Code2 size={20} />,
      color: '#ffa116'
    },
    {
      name: 'LinkedIn',
      value: 'LinkedIn Profile',
      href: 'https://linkedin.com/in/divyansh-singh-9b61b1286',
      icon: <Linkedin size={20} />,
      color: '#0a66c2'
    },
    {
      name: 'GeeksforGeeks & HackerRank',
      value: 'Divyansh Singh Coding Profiles',
      href: 'https://leetcode.com/u/divyy101/',
      icon: <FileText size={20} />,
      color: '#10b981'
    }
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Connect & Build</h2>
          <p className="section-subtitle">
            Based in Lucknow, India. Open for Software Development Engineer (SDE), Full Stack Developer, and Backend opportunities.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Social Links Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  padding: '1.2rem 1.5rem',
                  textDecoration: 'none',
                }}
              >
                <div 
                  style={{
                    padding: '0.6rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.name}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</div>
                </div>
                <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form className="glass-card" onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Send Me a Message
            </h3>

            {status.success && (
              <div 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid #22c55e',
                  color: '#22c55e',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.9rem',
                }}
              >
                <CheckCircle2 size={18} /> Message received! Divyansh will respond to you soon.
              </div>
            )}

            {status.error && (
              <div 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.9rem',
                }}
              >
                <AlertCircle size={18} /> {status.error}
              </div>
            )}

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Your Name
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Divyansh Singh"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Your Email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Hi Divyansh, I saw your portfolio and would like to connect regarding..."
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={status.loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {status.loading ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
