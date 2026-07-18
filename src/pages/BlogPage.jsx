import React, { useState, useEffect } from 'react';
import { Search, Clock, Tag, BookOpen, ArrowLeft } from 'lucide-react';

const initialBlogs = [
  {
    id: 1,
    title: 'Mastering the Sliding Window & Two Pointer Patterns in DSA',
    category: 'Data Structures',
    readTime: '6 min read',
    date: 'July 12, 2026',
    tags: ['DSA', 'Algorithms', 'LeetCode', 'Java'],
    excerpt: 'A comprehensive guide on how to spot and solve two-pointer and sliding window problems efficiently with O(N) time complexity.',
    content: `Data structures and algorithms form the core of scalable software engineering. Among the 14 core patterns for algorithmic problem solving, the **Sliding Window** and **Two Pointers** techniques are paramount for optimizing array and string problems from O(N²) brute force down to linear O(N) time.

### When to Use Two Pointers
Two pointers are typically used when working with sorted arrays or searching for pairs that satisfy a specific condition.
- **Fixed Pointers**: Opposite direction (left starting at 0, right starting at N-1).
- **Fast and Slow Pointers**: Same direction (Floyd's Cycle Finding algorithm for linked lists).

### The Sliding Window Technique
Sliding window expands and shrinks a contiguous subarray window to find optimal substrings or subsegments.
1. **Fixed Window Size**: Calculate the sum or target property of the first K elements, then slide the window by adding the next element and subtracting the leftmost element.
2. **Dynamic Window Size**: Expand the right boundary until the condition breaks, then shrink the left boundary until valid again.

### Key Takeaway
Mastering these pattern recognition techniques allows you to tackle 100+ LeetCode problems effortlessly without memorizing individual solutions.`
  },
  {
    id: 2,
    title: 'Building Resilient Full-Stack Architecture with MERN & FastAPI',
    category: 'Web Dev',
    readTime: '8 min read',
    date: 'July 15, 2026',
    tags: ['MERN', 'React', 'Node.js', 'FastAPI', 'System Design'],
    excerpt: 'How to architect high-performance full-stack web applications using React, Express, MongoDB, and Python microservices for AI workloads.',
    content: `Modern full-stack web applications require a clean separation of concerns between responsive user interfaces, fast CRUD REST APIs, and compute-heavy AI/ML background services.

### Frontend Layer (React 18 + Vite)
- Component-driven architecture using atomic design principles.
- Global state management using lightweight React Context or Zustand.
- Optimized bundle splitting and asset caching with Vite.

### Backend Layer (Node.js & Express)
- Handles authentication (JWT tokens, bcrypt password hashing).
- Express rate-limiting middleware to guard against DDoS attacks.
- In-memory caching layer for proxying third-party API telemetry.

### Microservices Layer (FastAPI & Python)
- Handles heavy AI workloads (LLM prompt orchestration with Gemini API).
- Asynchronous Pydantic data validation for high-throughput concurrency.

Combining Node.js for I/O bound web requests with FastAPI for AI inference gives you the best of both worlds!`
  },
  {
    id: 3,
    title: 'Tech Leadership & Hackathon Management: Lessons from Organising SIH',
    category: 'Leadership',
    readTime: '5 min read',
    date: 'June 28, 2026',
    tags: ['Leadership', 'Hackathon', 'NIITS', 'Management'],
    excerpt: 'Key takeaways and operational strategies from leading the NIITS executive board and managing campus hackathons.',
    content: `Serving as Vice President of NIITS and organizing college-wide hackathons like the Smart India Hackathon (SIH) internal round taught me invaluable lessons in tech leadership, logistics, and team execution.

### 1. Clear Delegation & Ownership
Great leaders don't micromanage; they empower squad leaders with full ownership over specific verticals (Problem Statements, Tech Infrastructure, Judging Rubrics, Logistics).

### 2. Rapid Crisis Management
During live 24-hour hackathons, unexpected challenges will arise—network throttling, power fluctuations, or mentor schedule shifts. Calm decision-making under pressure is essential.

### 3. Fostering Innovation
Building a supportive developer culture encourages first-time hackers to pitch ambitious solutions and turn ideas into production prototypes.`
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const json = await res.json();
          if (json.blogs && json.blogs.length > 0) {
            setBlogs(json.blogs);
          }
        }
      } catch (err) {
        console.log('Using local fallback blogs');
      }
    };

    fetchBlogs();
  }, []);

  const categories = ['All', 'Web Dev', 'Data Structures', 'Leadership'];

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

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            {activePost.title}
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {activePost.tags.map(tag => (
              <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Tag size={12} /> #{tag}
              </span>
            ))}
          </div>

          {/* Render Content */}
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
      </div>
    </div>
  );
}
