import React, { useEffect } from 'react';
import { X, Mic, Volume2, VolumeX, Sparkles, Square, ArrowLeft } from 'lucide-react';
import { voiceService } from '../../services/voiceAssistant';

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  isTyping: boolean;
  transcript: string;
  lastResponse: string;
  onToggleListening: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
}

export const VoiceOverlay: React.FC<VoiceOverlayProps> = ({
  isOpen,
  onClose,
  isListening,
  isSpeaking,
  isTyping,
  transcript,
  lastResponse,
  onToggleListening,
  onToggleMute,
  isMuted
}) => {
  useEffect(() => {
    if (!isOpen) {
      voiceService.stopSpeaking();
      voiceService.stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isActive = isListening || isSpeaking || isTyping;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        backgroundColor: 'rgba(5, 8, 15, 0.92)',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 1.5rem',
        animation: 'fadeIn 0.4s ease'
      }}
    >
      {/* Background Fluid Ambient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: isActive
            ? 'radial-gradient(circle, rgba(52, 168, 83, 0.35) 0%, rgba(52, 168, 83, 0.15) 40%, rgba(0, 0, 0, 0) 70%)'
            : 'radial-gradient(circle, rgba(234, 67, 53, 0.35) 0%, rgba(234, 67, 53, 0.15) 40%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          transition: 'background 0.5s ease'
        }}
      />

      {/* Top Floating Navigation Bar (Borderless) */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        {/* Brand Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.06)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Sparkles size={16} style={{ color: isActive ? '#34A853' : '#EA4335' }} />
          <span>Dipak's AI Voice Assistant</span>
        </div>

        {/* Top Controls */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={onClose}
            title="Exit Voice Mode"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Center Section: Floating Borderless Orb & Equalizer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          margin: 'auto 0'
        }}
      >
        {/* Pulsating Glowing Sound Orb */}
        <div
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}
        >
          {/* Wave Ripples */}
          {isActive && (
            <>
              <div
                className="voice-ripple-1"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(52, 168, 83, 0.7)',
                  pointerEvents: 'none'
                }}
              />
              <div
                className="voice-ripple-2"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(52, 168, 83, 0.5)',
                  pointerEvents: 'none'
                }}
              />
              <div
                className="voice-ripple-3"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(52, 168, 83, 0.4)',
                  pointerEvents: 'none'
                }}
              />
            </>
          )}

          {/* Core Interactive Glowing Sphere */}
          <div
            onClick={onToggleListening}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: isActive
                ? 'linear-gradient(135deg, #34A853 0%, #2d9247 50%, #257a3b 100%)'
                : 'linear-gradient(135deg, #EA4335 0%, #d93025 50%, #c5221f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isActive
                ? '0 0 75px rgba(52, 168, 83, 0.95), inset 0 0 35px rgba(255, 255, 255, 0.6)'
                : '0 0 60px rgba(234, 67, 53, 0.75), inset 0 0 30px rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              transform: isActive ? 'scale(1.08)' : 'scale(1)'
            }}
          >
            {isListening ? (
              <Square size={44} fill="#ffffff" style={{ color: '#ffffff' }} />
            ) : isSpeaking ? (
              <Volume2 size={46} style={{ color: '#ffffff' }} />
            ) : (
              <Mic size={46} style={{ color: '#ffffff' }} />
            )}
          </div>
        </div>

        {/* Equalizer Visualizer Bars */}
        <div style={{ display: 'flex', gap: '8px', height: '54px', alignItems: 'center', marginBottom: '1.5rem' }}>
          {isActive ? (
            <>
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
              <div className="eq-bar" style={{ width: '6px', background: '#34A853' }} />
            </>
          ) : (
            <span style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.05em' }}>
              Tap orb to start speaking
            </span>
          )}
        </div>

        {/* Floating Minimal Status Pill */}
        <div
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            padding: '0.5rem 1.5rem',
            borderRadius: 'var(--radius-full)',
            background: isActive ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)',
            color: isActive ? '#34A853' : '#EA4335',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isActive ? '#34A853' : '#EA4335',
              animation: 'pulseGlow 1s infinite'
            }}
          />
          <span>
            {isListening
              ? 'Listening...'
              : isTyping
              ? 'AI Agent Thinking...'
              : isSpeaking
              ? 'AI Speaking Response...'
              : 'Voice Assistant Active'}
          </span>
        </div>
      </div>

      {/* Bottom Floating Minimal Speech & Response Transcript (Borderless) */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {/* Seamless Transcript Area */}
        <div
          style={{
            width: '100%',
            maxHeight: '160px',
            overflowY: 'auto',
            textAlign: 'center',
            color: '#ffffff',
            padding: '0 1rem'
          }}
        >
          {transcript && (
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: isActive ? '#34A853' : '#EA4335', marginBottom: '0.5rem' }}>
              "{transcript}"
            </p>
          )}

          {lastResponse && (
            <p style={{ fontSize: '1.05rem', color: '#f3f4f6', lineHeight: 1.6, opacity: 0.95 }}>
              {lastResponse.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').replace(/[*_#`~]/g, '')}
            </p>
          )}

          {!transcript && !lastResponse && (
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
              Try asking: "Why should I hire Dipak for a Senior Next.js role?"
            </p>
          )}
        </div>

        {/* Bottom Floating Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={onToggleListening}
            className="btn"
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              color: '#ffffff',
              background: isListening ? '#EA4335' : '#34A853',
              boxShadow: isListening ? '0 4px 15px rgba(234, 67, 53, 0.4)' : '0 4px 15px rgba(52, 168, 83, 0.3)',
              transition: 'var(--transition)'
            }}
          >
            <Mic size={20} style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>{isListening ? 'Stop' : 'Speak Question'}</span>
          </button>

          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff'
            }}
          >
            <ArrowLeft size={18} style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>Exit Voice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
