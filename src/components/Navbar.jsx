import React from 'react';
import { Home, FolderOpen, MoreHorizontal, History } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Divyansh</div>
      <div className="nav-links">
        <a href="#home" className="active" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Home
        </a>
        <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Projects
        </a>
        <a href="#more" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          More <MoreHorizontal size={14} />
        </a>
        <a href="#history">
          <History size={16} />
        </a>
      </div>
    </nav>
  );
}
