import React, { useState, useEffect } from 'react';
import { Search, Clock, Tag, BookOpen, ArrowLeft, Share2 } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blogs');
        const json = await res.json();
        setBlogs(json.blogs || []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ['All', 'Web Dev', 'Data Structures', 'AI & Systems', 'System Design', 'Leadership'];

  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activePost) {
    return (
      <div className="section" style={{ minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <button 
            onClick={() => setActivePost(null)}
            className="btn btn-secondary"
            style={{ marginBottom: '2rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} /> Back to Blog List
          </button>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              {activePost.category}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> {activePost.readTime}
            </span>
            <span>•</span>
            <span>{activePost.date}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {activePost.title}
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {activePost.tags.map(tag => (
              <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>

          {/* Render Markdown/Formatted Content */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '2.5rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.8, 
              fontSize: '1.05rem',
              whiteSpace: 'pre-line' 
            }}
          >
            {activePost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Engineering Insights</span>
          <h2 className="section-title">Technical Blog & Articles</h2>
          <p className="section-subtitle">
            Deep dives into full-stack MERN development, DSA problem-solving patterns, system design, and tech leadership.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: '500px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search articles, tags, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem 0.8rem 2.8rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  backgroundColor: selectedCategory === cat ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Loading blog articles...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {filteredBlogs.map((post) => (
              <div 
                key={post.id} 
                className="glass-card" 
                onClick={() => setActivePost(post)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.2rem', flex: 1, lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Read Post <BookOpen size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
