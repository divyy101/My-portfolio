import React, { useState, useEffect } from 'react';
import { Github, RefreshCw } from 'lucide-react';

export default function GithubHeatmap({ username = 'divyy101' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGithubContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github/contributions/${username}`);
      if (!res.ok) throw new Error('Failed to fetch GitHub contributions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubContributions();
  }, [username]);

  const getColor = (level) => {
    switch (level) {
      case 1: return '#0e4429';
      case 2: return '#006d32';
      case 3: return '#26a641';
      case 4: return '#39d353';
      default: return 'var(--bg-secondary)';
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <span className="section-tag">Open Source & Activity</span>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Github size={32} /> GitHub Contributions
            </h2>
            <p className="section-subtitle">Real-time commit telemetry synced via backend proxy for username: <strong>{username}</strong></p>
          </div>

          <button 
            onClick={fetchGithubContributions}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
            }}
          >
            <RefreshCw size={14} className={loading ? 'spin-icon' : ''} /> Refresh
          </button>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              Loading contribution telemetry from GitHub API...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#ef4444' }}>
              Could not load GitHub data: {error}
            </div>
          ) : (
            <div>
              {/* Month Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem', paddingLeft: '20px' }}>
                {months.map((m) => <span key={m}>{m}</span>)}
              </div>

              {/* Heatmap Grid */}
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {(data?.contributions || []).slice(-52).map((week, wIdx) => (
                  <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {(week.days || []).map((day, dIdx) => (
                      <div 
                        key={dIdx}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '2px',
                          backgroundColor: getColor(day.level || (day.count > 0 ? Math.min(4, Math.ceil(day.count / 2)) : 0)),
                          border: '1px solid var(--border-color)',
                          transition: 'transform 0.15s ease',
                          cursor: 'pointer'
                        }}
                        title={`${day.count || 0} contributions on date`}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend & Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>1,200+ contributions in the past year</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: getColor(l) }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
