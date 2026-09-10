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

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

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
        position: 'relative',
        overflow: 'hidden'
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
                  backgroundColor: '#34A853',
                  boxShadow: '0 0 10px #34A853'
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

              <button onClick={onOpenVoice} className="btn btn-secondary" style={{ borderColor: 'rgba(234, 67, 53, 0.4)', color: '#EA4335', background: 'rgba(234, 67, 53, 0.08)' }}>
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

          {/* Right Column: Premium Circular Orbital Profile Component */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', perspective: '1200px' }}>
            {/* Ambient Background Glow Orbs */}
            <div
              style={{
                position: 'absolute',
                width: '110%',
                height: '110%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(66, 133, 244, 0.28) 0%, rgba(52, 168, 83, 0.18) 45%, rgba(0, 0, 0, 0) 70%)',
                filter: 'blur(45px)',
                zIndex: 1,
                animation: 'pulseSphere 6s ease-in-out infinite'
              }}
            />

            {/* Main Rounded Circular Avatar Wrapper */}
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="hero-circular-avatar-card"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1/1',
                borderRadius: '50%',
                padding: '6px',
                zIndex: 2,
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
                transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
                boxShadow: isHovered
                  ? '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(66, 133, 244, 0.45), 0 0 40px rgba(52, 168, 83, 0.3)'
                  : '0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(66, 133, 244, 0.3)',
                cursor: 'pointer'
              }}
            >
              {/* Outer Spreading & Reducing Multi-Color Gradient Glow Aura */}
              <div
                className="gradient-glow-spreading-ring"
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC04, #34A853, #4285F4)',
                  animation: 'spinGradient 10s linear infinite, spreadAndReduceGlow 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                  zIndex: -2,
                  filter: 'blur(14px)',
                  opacity: 0.6
                }}
              />

              {/* Outer 360 Rotating Conic Rainbow Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC04, #34A853, #4285F4)',
                  animation: 'spinGradient 10s linear infinite',
                  zIndex: -1,
                  filter: 'brightness(1.2)',
                  boxShadow: '0 0 25px rgba(66, 133, 244, 0.4), 0 0 40px rgba(52, 168, 83, 0.3)'
                }}
              />

              {/* Dashed Orbital Outer Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-16px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(66, 133, 244, 0.45)',
                  animation: 'spinCCW 24s linear infinite',
                  zIndex: -1,
                  pointerEvents: 'none'
                }}
              />

              {/* Inner Circular Photo Container */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#090d16',
                  border: '3px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                {/* Profile Avatar Image */}
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '50%',
                    filter: isHovered ? 'contrast(1.08) brightness(1.04)' : 'contrast(1.04)',
                    transition: 'filter 0.3s ease, transform 0.5s ease',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)'
                  }}
                />

                {/* Bottom Shadow Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '35%',
                    background: 'linear-gradient(to top, rgba(9, 13, 22, 0.75) 0%, rgba(9, 13, 22, 0) 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseSphere {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.55; }
        }
        @keyframes spreadAndReduceGlow {
          0% {
            inset: -4px;
            filter: blur(10px);
            opacity: 0.45;
            transform: scale(0.97);
          }
          50% {
            inset: -22px;
            filter: blur(42px);
            opacity: 0.95;
            transform: scale(1.05);
          }
          100% {
            inset: -4px;
            filter: blur(10px);
            opacity: 0.45;
            transform: scale(0.97);
          }
        }

        @media (max-width: 768px) {
          .hero-circular-avatar-card {
            max-width: min(280px, 70vw) !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 480px) {
          .hero-circular-avatar-card {
            max-width: min(230px, 65vw) !important;
            margin: 0 auto !important;
          }
        }

        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
};
