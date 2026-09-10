import React from 'react';
import { User, Briefcase, Calendar, MapPin, CheckCircle, Award } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textTransform: 'uppercase' }} className="section-tag">
          <User size={14} />
          <span>About Me</span>
        </div>

        <h2 className="section-title">
          Engineering with <span className="gradient-text">Purpose & Ownership</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            marginTop: '3rem',
            alignItems: 'start'
          }}
          className="about-grid"
        >
          {/* Left Column: Bio Card */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Product-Minded Frontend Engineer
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {PERSONAL_INFO.bio}
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              With over <strong>5+ years of professional experience</strong> (and <strong>1+ year of relevant specialized experience</strong>), formerly at <strong>Techasoft Pvt. Ltd</strong>, I have designed and delivered scalable web applications, enterprise management platforms, and SaaS products.
            </p>

            {/* Key Deliverable Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Sub-2s Web Performance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-indigo)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Next.js & React Mastery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Seamless API Integrations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Cross-Device Responsiveness</span>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Roadmap */}
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Briefcase style={{ color: 'var(--accent-cyan)' }} size={22} />
              <span>Professional Experience</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.role}</h4>
                      <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem' }}>{exp.company}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {exp.description.map((item, i) => (
                      <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
