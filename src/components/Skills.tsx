import React from 'react';
import { Cpu, Atom, Zap, Code2, FileCode, Layout, Palette, Layers, Sparkles, Smartphone, Server, Database, Globe, HardDrive } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom size={18} />,
  Zap: <Zap size={18} />,
  Code2: <Code2 size={18} />,
  FileCode: <FileCode size={18} />,
  Layout: <Layout size={18} />,
  Palette: <Palette size={18} />,
  Layers: <Layers size={18} />,
  Sparkles: <Sparkles size={18} />,
  Smartphone: <Smartphone size={18} />,
  Server: <Server size={18} />,
  Database: <Database size={18} />,
  Globe: <Globe size={18} />,
  HardDrive: <HardDrive size={18} />
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Tag */}
        <div className="section-tag">
          <Cpu size={14} />
          <span>Technical Skills</span>
        </div>

        <h2 className="section-title">
          My Engineering <span className="gradient-text">Toolkit & Expertise</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '1.05rem', marginBottom: '3rem' }}>
          Over 5+ years of building web applications (2020 – 2026), I have perfected a versatile stack centered around high-performance React architectures and responsive UI engineering.
        </p>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                {category.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                        <span style={{ color: '#4285F4', display: 'flex', alignItems: 'center' }}>
                          {iconMap[skill.icon] || <Code2 size={18} />}
                        </span>
                        <span>{skill.name}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#4285F4', fontWeight: 600 }}>{skill.level}%</span>
                    </div>

                    {/* Premium Sleek Progress Bar */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'var(--border-color)',
                        borderRadius: '9999px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${skill.level}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #4285F4 0%, #34A853 100%)',
                          borderRadius: '9999px',
                          boxShadow: '0 0 10px rgba(66, 133, 244, 0.45)',
                          transition: 'width 1s ease-in-out'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
