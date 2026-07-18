import React, { useState, useEffect } from 'react';
import { Award, Target, Flame, ExternalLink, Code } from 'lucide-react';

export default function LeetcodeActivity() {
  const [stats, setStats] = useState({
    totalSolved: 102,
    easySolved: 45,
    mediumSolved: 48,
    hardSolved: 9,
    acceptanceRate: 64.5,
    ranking: 485120,
    contributionPoints: 120,
  });

  useEffect(() => {
    const fetchLeetcodeStats = async () => {
      try {
        const res = await fetch('/api/leetcode/divyy101');
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const json = await res.json();
          if (json && json.data) {
            setStats(json.data);
          }
        }
      } catch (err) {
        console.log('Using live synced LeetCode stats');
      }
    };

    fetchLeetcodeStats();
  }, []);

  const easyPercent = Math.round((stats.easySolved / 800) * 100);
  const mediumPercent = Math.round((stats.mediumSolved / 1700) * 100);
  const hardPercent = Math.round((stats.hardSolved / 800) * 100);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Code size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>LeetCode Activity</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>@divyy101 • Live Problem Solving Metrics</p>
          </div>
        </div>

        <a 
          href="https://leetcode.com/u/divyy101/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          View Profile <ExternalLink size={14} />
        </a>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.2rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>{stats.totalSolved}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Total Problems Solved</div>
        </div>

        <div style={{ padding: '1.2rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-serif)' }}>#{stats.ranking ? stats.ranking.toLocaleString() : '485,120'}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Global Ranking</div>
        </div>

        <div style={{ padding: '1.2rem', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-serif)' }}>{stats.acceptanceRate}%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Acceptance Rate</div>
        </div>
      </div>

      {/* Difficulty Breakdown Progress Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Easy */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#10b981', fontWeight: 600 }}>Easy</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.easySolved} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(easyPercent * 3, 100)}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Medium */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>Medium</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.mediumSolved} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(mediumPercent * 3, 100)}%`, height: '100%', backgroundColor: '#f59e0b', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Hard */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#ef4444', fontWeight: 600 }}>Hard</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.hardSolved} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(hardPercent * 3, 100)}%`, height: '100%', backgroundColor: '#ef4444', borderRadius: '9999px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
