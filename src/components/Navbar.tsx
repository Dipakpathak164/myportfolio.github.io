import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Code2, Sparkles, Mic } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenChat: () => void;
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenChat, onOpenVoice }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        backgroundColor: scrolled
          ? theme === 'dark' ? 'rgba(11, 15, 25, 0.85)' : 'rgba(248, 250, 252, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
            }}
          >
            <Code2 size={22} />
          </div>
          <span>
            DiPak<span style={{ color: 'var(--accent-cyan)' }}>.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Voice Assistant Launcher */}
          <button
            onClick={onOpenVoice}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: 'var(--accent-purple)',
              background: 'rgba(168, 85, 247, 0.08)'
            }}
          >
            <Mic size={16} />
            <span>Voice AI</span>
          </button>

          {/* AI Assistant Chat Button */}
          <button
            onClick={onOpenChat}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.85rem',
              gap: '0.4rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: 'var(--accent-cyan)',
              background: 'rgba(56, 189, 248, 0.08)'
            }}
          >
            <Sparkles size={16} />
            <span>AI Bot</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#f59e0b' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
