import React from 'react';
import { Clapperboard, Film, Tv } from 'lucide-react';

const favouritesList = [
  { 
    id: 1, 
    title: 'Dragon Ball Super', 
    category: 'Anime',
    image: 'https://m.media-amazon.com/images/M/MV5BY2I2MzI1ODYtMWRlOS00MDBjLWE4Egt-NDQyNzU3MTJiMGEyXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 2, 
    title: 'One Piece', 
    category: 'Anime',
    image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxGPFmXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 3, 
    title: 'Bleach', 
    category: 'Anime',
    image: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjODItZGIyNi00124LWE4MDAtNTQ1NDhhYjVkYjVlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 4, 
    title: 'Oppenheimer', 
    category: 'Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 5, 
    title: 'The Dark Knight', 
    category: 'Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 6, 
    title: 'Iron Man', 
    category: 'Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 7, 
    title: 'The Batman', 
    category: 'Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_FMjpg_UX1000_.jpg' 
  },
  { 
    id: 8, 
    title: '12th Fail', 
    category: 'Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BZWQwOWFiOWItZWUxZC00ZDQ5LWE0ZGEtMWM0ZmQzZTQ4ZTkyXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX1000_.jpg' 
  }
];

export default function Favourites() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px dashed var(--border-color)', paddingBottom: '3rem' }}>
      {/* Waterfall Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.15,
          pointerEvents: 'none'
        }}
      >
        <source src="https://videos.pexels.com/video-files/1448735/1448735-hd_1280_720_25fps.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Favourites</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          A curated collection of movies, series, anime, and games that I highly recommend.
        </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
        <Clapperboard size={18} /> Movies & Anime
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
        gap: '1.25rem' 
      }}>
        {favouritesList.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              borderRadius: '10px', 
              overflow: 'hidden', 
              border: '1px solid #222',
              backgroundColor: '#111',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = '#444';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#222';
            }}
          >
            <div style={{ aspectRatio: '2/3', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.backgroundColor = '#1a1a1a';
                  e.target.parentNode.style.display = 'flex';
                  e.target.parentNode.style.alignItems = 'center';
                  e.target.parentNode.style.justifyContent = 'center';
                  e.target.parentNode.innerHTML = `<span style="padding:10px;text-align:center;font-size:0.85rem;color:#888;">${item.title}</span>`;
                }}
              />
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#0f0f0f' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#eee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
