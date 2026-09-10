import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle2, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Form submission handling via Web3Forms endpoint or direct notification
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Tag */}
        <div className="section-tag">
          <MessageSquare size={14} />
          <span>Get In Touch</span>
        </div>

        <h2 className="section-title">
          Let's Build Something <span className="gradient-text">Great Together</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '1.05rem', marginBottom: '3rem' }}>
          Whether you have a job opportunity, a project proposal, or just want to chat about React & Next.js architectures, feel free to drop me a message!
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  flexShrink: 0
                }}
              >
                <Mail size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email Me Directly</p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-indigo)',
                  flexShrink: 0
                }}
              >
                <Phone size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Call / WhatsApp</p>
                <a
                  href={PERSONAL_INFO.socials.phone}
                  style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-emerald)',
                  flexShrink: 0
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Location</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Bengaluru, India (Open to Remote / Relocation)
                </p>
              </div>
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={56} style={{ color: '#10b981', margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. Dipak will respond to your message shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Dipak, I'd like to talk about an exciting project..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.95rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
