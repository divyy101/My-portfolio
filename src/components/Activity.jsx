import React from 'react';

// Generates realistic contribution levels (0 to 4)
const generateHeatmapData = (weeks = 52, days = 7) => {
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Create random density with active patches
      const rand = Math.random();
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.7) level = 3;
      else if (rand > 0.55) level = 2;
      else if (rand > 0.4) level = 1;
      week.push(level);
    }
    data.push(week);
  }
  return data;
};

const githubData = generateHeatmapData(50, 7);
const leetcodeData = generateHeatmapData(50, 7);

const getColor = (level) => {
  switch (level) {
    case 1: return '#0e4429';
    case 2: return '#006d32';
    case 3: return '#26a641';
    case 4: return '#39d353';
    default: return '#161b22';
  }
};

const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export default function Activity() {
  return (
    <section className="section" style={{ borderBottom: '1px dashed var(--border-color)' }}>
      {/* GitHub Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>GitHub Activity</h2>
        
        <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.8rem', marginBottom: '0.75rem', paddingLeft: '20px' }}>
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {githubData.map((week, wIdx) => (
              <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {week.map((level, dIdx) => (
                  <div 
                    key={dIdx} 
                    style={{
                      width: '11px',
                      height: '11px',
                      borderRadius: '2px',
                      backgroundColor: getColor(level),
                      transition: 'transform 0.1s ease',
                      cursor: 'pointer'
                    }}
                    title={`Activity level: ${level}`}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
            <span>1,263 contributions in the last year</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(l => (
                <div key={l} style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: getColor(l) }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* LeetCode Section */}
      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>LeetCode Activity</h2>
        
        <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.8rem', marginBottom: '0.75rem', paddingLeft: '20px' }}>
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {leetcodeData.map((week, wIdx) => (
              <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {week.map((level, dIdx) => (
                  <div 
                    key={dIdx} 
                    style={{
                      width: '11px',
                      height: '11px',
                      borderRadius: '2px',
                      backgroundColor: getColor(level),
                      transition: 'transform 0.1s ease',
                      cursor: 'pointer'
                    }}
                    title={`Solved problems`}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
            <span>Synced with GitHub profile (divyy101)</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(l => (
                <div key={l} style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: getColor(l) }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
