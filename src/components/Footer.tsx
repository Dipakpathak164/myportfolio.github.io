import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.2rem' }}>
          <Code2 size={22} style={{ color: 'var(--accent-cyan)' }} />
          <span>Dipak Pathak Portfolio</span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Gemini AI.
        </p>

        <button
          onClick={scrollToTop}
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          <span>Back to top</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};
