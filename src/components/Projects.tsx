import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Sparkles, Star } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Featured' | 'Enterprise' | 'Web Apps' | 'Client Work'>('All');

  const categories = ['All', 'Featured', 'Enterprise', 'Web Apps', 'Client Work'] as const;

  const filteredProjects = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab || (activeTab === 'Featured' && p.featured));

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-tag">
          <FolderGit2 size={14} />
          <span>Portfolio Showcase</span>
        </div>

        <h2 className="section-title">
          Recent Projects & <span className="gradient-text">Delivered Products</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          Explore a curated showcase of 18+ recent web application deployments and enterprise solutions.
        </p>

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
                border: activeTab === tab ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                backgroundColor: activeTab === tab ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                color: activeTab === tab ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              }}
            >
              {tab} {tab === 'All' ? `(${PROJECTS.length})` : ''}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* Project Image Preview */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={(e) => {
                    // Fallback visual if thumbnail is loading
                    e.currentTarget.src = './assets/images/about.png';
                  }}
                />

                {project.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'var(--gradient-primary)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Star size={12} fill="#ffffff" /> Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Link Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.6rem 1rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <span>Visit Live Project</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
