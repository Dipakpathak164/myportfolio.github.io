import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Mic } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenChat: () => void;
  onOpenVoice: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onOpenVoice }) => {
  const titles = [
    'Senior Frontend Engineer',
    'Next.js & React Specialist',
    'TypeScript Developer',
    'Product-Minded UI Architect'
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentTitle.length) {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentTitle.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Bio & CTA */}
          <div>
            {/* Status Pill */}
            <div className="section-tag" style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
              />
              <span>{PERSONAL_INFO.availability}</span>
            </div>

            {/* Greeting & Name */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1rem'
              }}
            >
              Hi, I'm <span className="gradient-text">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{displayText}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.4em',
                  backgroundColor: 'var(--accent-cyan)',
                  animation: 'pulseGlow 1s infinite'
                }}
              />
            </div>

            {/* Short Tagline */}
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}
            >
              {PERSONAL_INFO.tagline} Formerly Senior Frontend Engineer at{' '}
              <a
                href={PERSONAL_INFO.previousCompanyUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}
              >
                {PERSONAL_INFO.previousCompany}
              </a>, now open for high-impact roles.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View My Work</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenVoice} className="btn btn-secondary" style={{ borderColor: 'rgba(168, 85, 247, 0.4)', color: 'var(--accent-purple)' }}>
                <Mic size={18} />
                <span>Voice Agent 🎙️</span>
              </button>

              <button onClick={onOpenChat} className="btn btn-secondary">
                <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>AI Chat</span>
              </button>
            </div>

            {/* Stat Counters */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.25rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>5+ Yrs</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Proffessional (1 Yr Relevant)</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>18+</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Recent Deliveries</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-purple)' }}>100%</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Avatar Frame */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-lg)',
                padding: '8px',
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}
              className="animate-float"
            >
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'calc(var(--radius-lg) - 6px)',
                  filter: 'contrast(1.05)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
};
