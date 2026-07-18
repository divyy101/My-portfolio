import React, { useState, useEffect } from 'react';
import { Award, Target, Flame, ExternalLink, Code } from 'lucide-react';

export default function LeetcodeActivity() {
  const [stats, setStats] = useState({
    totalSolved: 124,
    easySolved: 67,
    mediumSolved: 51,
    hardSolved: 6,
    totalEasy: 955,
    totalMedium: 2086,
    totalHard: 954,
    totalQuestions: 3995,
    acceptanceRate: 62.0,
    ranking: 1323137,
    contributionPoints: 157,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLeetcodeStats = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/divyy101');
        if (res.ok) {
          const json = await res.json();
          if (json && json.totalSolved !== undefined && isMounted) {
            setStats({
              totalSolved: json.totalSolved ?? 124,
              easySolved: json.easySolved ?? 67,
              mediumSolved: json.mediumSolved ?? 51,
              hardSolved: json.hardSolved ?? 6,
              totalEasy: json.totalEasy ?? 955,
              totalMedium: json.totalMedium ?? 2086,
              totalHard: json.totalHard ?? 954,
              totalQuestions: json.totalQuestions ?? 3995,
              acceptanceRate: json.acceptanceRate ?? 62.0,
              ranking: json.ranking ?? 1323137,
              contributionPoints: json.contributionPoint ?? 157,
            });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log('Public LeetCode API error, trying local server proxy...');
      }

      try {
        const res = await fetch('/api/leetcode/divyy101');
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          const json = await res.json();
          if (json && json.data && isMounted) {
            const data = json.data;
            if (data.matchedUser) {
              const acStats = data.matchedUser.submitStats?.acSubmissionNum || [];
              const easy = acStats.find(s => s.difficulty === 'Easy')?.count ?? 67;
              const medium = acStats.find(s => s.difficulty === 'Medium')?.count ?? 51;
              const hard = acStats.find(s => s.difficulty === 'Hard')?.count ?? 6;
              const total = acStats.find(s => s.difficulty === 'All')?.count ?? 124;
              const rank = data.matchedUser.profile?.ranking ?? 1323137;
              setStats(prev => ({
                ...prev,
                totalSolved: total,
                easySolved: easy,
                mediumSolved: medium,
                hardSolved: hard,
                ranking: rank,
              }));
            } else if (data.totalSolved !== undefined) {
              setStats(data);
            }
          }
        }
      } catch (err) {
        console.log('Using live synced LeetCode stats fallback');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLeetcodeStats();
    return () => { isMounted = false; };
  }, []);

  const easyPercent = Math.round((stats.easySolved / (stats.totalEasy || 955)) * 100);
  const mediumPercent = Math.round((stats.mediumSolved / (stats.totalMedium || 2086)) * 100);
  const hardPercent = Math.round((stats.hardSolved / (stats.totalHard || 954)) * 100);

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
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-serif)' }}>#{stats.ranking ? stats.ranking.toLocaleString() : '1,323,137'}</div>
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
            <span style={{ color: 'var(--text-secondary)' }}>{stats.easySolved} / {stats.totalEasy || 955} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(easyPercent * 3, 7)}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Medium */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>Medium</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.mediumSolved} / {stats.totalMedium || 2086} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(mediumPercent * 3, 5)}%`, height: '100%', backgroundColor: '#f59e0b', borderRadius: '9999px' }} />
          </div>
        </div>

        {/* Hard */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#ef4444', fontWeight: 600 }}>Hard</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.hardSolved} / {stats.totalHard || 954} Solved</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '9999px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(hardPercent * 3, 3)}%`, height: '100%', backgroundColor: '#ef4444', borderRadius: '9999px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

