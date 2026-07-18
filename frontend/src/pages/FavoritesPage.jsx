import React, { useState } from 'react';
import { X } from 'lucide-react';

const favoriteCategories = ['All', 'Anime', 'Movies', 'Web Series', 'Games'];

const favoriteItems = [
  // Anime (100% Local Assets)
  {
    id: 1,
    title: 'One Piece',
    category: 'Anime',
    image: '/assets/Onepiece.png',
    rating: '10/10',
    quote: "Inherited Will, The Destiny of the Age, and The Dreams of Its People will never die.",
    desc: 'Eiichiro Oda’s masterwork of world-building, freedom, and epic adventure across the seas.'
  },
  {
    id: 2,
    title: 'Bleach',
    category: 'Anime',
    image: '/assets/bleach.jpg',
    rating: '9.8/10',
    quote: "If I hold a sword, I can't protect you. If I drop the sword, I can't embrace you.",
    desc: 'Soul Reapers, Bankai transformations, and Tite Kubo’s unrivaled stylistic character aesthetics.'
  },
  {
    id: 3,
    title: 'Dragon Ball Super',
    category: 'Anime',
    image: '/assets/Dragonball.jpg',
    rating: '9.5/10',
    quote: "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
    desc: 'The iconic martial arts saga continuing Goku’s journey through gods and multiverse tournaments.'
  },

  // Movies (100% Local Assets)
  {
    id: 4,
    title: 'The Dark Knight',
    category: 'Movies',
    image: '/assets/darkknight.png',
    rating: '10/10',
    quote: "Why so serious?",
    desc: 'Christopher Nolan’s cinematic masterpiece starring Heath Ledger as Joker and Christian Bale as Batman.'
  },
  {
    id: 5,
    title: 'Interstellar',
    category: 'Movies',
    image: '/assets/favorites/interstellar.jpg',
    rating: '10/10',
    quote: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space.",
    desc: 'A sci-fi saga exploring wormholes, black holes, time relativity, and fatherhood.'
  },
  {
    id: 6,
    title: 'Avengers: Endgame',
    category: 'Movies',
    image: '/assets/favorites/avengers.jpg',
    rating: '9.8/10',
    quote: "Part of the journey is the end.",
    desc: 'The ultimate culmination of 11 years of Marvel Cinematic Universe storytelling.'
  },

  // Web Series (100% Local Assets)
  {
    id: 7,
    title: 'Breaking Bad',
    category: 'Web Series',
    image: '/assets/breakinbad.png',
    rating: '10/10',
    quote: "I am the one who knocks!",
    desc: 'Vince Gilligan’s masterclass in character transformation and storytelling.'
  },
  {
    id: 8,
    title: 'Chernobyl',
    category: 'Web Series',
    image: '/assets/chernobyl.png',
    rating: '9.9/10',
    quote: "What is the cost of lies?",
    desc: 'A harrowing historical drama detailing truth, sacrifice, and nuclear fallout.'
  },

  // Games (100% Local Assets)
  {
    id: 9,
    title: 'God of War',
    category: 'Games',
    image: '/assets/godofwar.png',
    rating: '9.9/10',
    quote: "Do not be sorry. Be better.",
    desc: 'Kratos and Atreus in a breathtaking Norse mythological journey.'
  },
  {
    id: 10,
    title: 'Grand Theft Auto V',
    category: 'Games',
    image: '/assets/gta.png',
    rating: '10/10',
    quote: "Los Santos: City of sun, stars, and self-improvement.",
    desc: 'Open-world gameplay freedom, heist mechanics, and Los Santos satire.'
  }
];

export default function FavoritesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = activeCategory === 'All'
    ? favoriteItems
    : favoriteItems.filter(i => i.category === activeCategory);

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <span className="section-tag">Personal Taste</span>
            <h2 className="section-title">My Favorites</h2>
            <p className="section-subtitle">
              A curated collection of anime, movies, series, and games using 100% local assets.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {favoriteCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  backgroundColor: activeCategory === cat ? 'var(--text-primary)' : 'var(--bg-card)',
                  color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.8rem' }}>
          {filtered.map((item) => (
            <div 
              key={item.id} 
              className="glass-card" 
              onClick={() => setSelectedItem(item)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image Frame */}
              <div style={{ width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.2rem', position: 'relative', backgroundColor: 'var(--bg-secondary)' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(6px)',
                    fontSize: '0.75rem',
                    color: '#fff',
                  }}
                >
                  {item.category}
                </span>
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(6px)',
                    fontSize: '0.75rem',
                    color: '#f59e0b',
                    fontWeight: 600,
                  }}
                >
                  {item.rating}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic', flex: 1 }}>
                "{item.quote}"
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Detail View */}
        {selectedItem && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <div 
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                maxWidth: '600px',
                width: '100%',
                padding: '2rem',
                position: 'relative',
              }}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-primary)' }}
              >
                <X size={24} />
              </button>

              <div style={{ width: '100%', height: '280px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {selectedItem.category} • {selectedItem.rating}
              </span>
              <h2 style={{ fontSize: '2rem', margin: '0.4rem 0 1rem 0', color: 'var(--text-primary)' }}>
                {selectedItem.title}
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '1rem', borderLeft: '3px solid var(--text-primary)', paddingLeft: '1rem' }}>
                "{selectedItem.quote}"
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedItem.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
