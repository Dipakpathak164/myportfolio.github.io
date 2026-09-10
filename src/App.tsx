import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/Chatbot/ChatWidget';
import { VoiceOverlay } from './components/Chatbot/VoiceOverlay';
import { voiceService } from './services/voiceAssistant';
import { sendChatMessage } from './services/aiChat';
import { Sparkles, Mic } from 'lucide-react';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Voice Overlay State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [lastAIResponse, setLastAIResponse] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('dipak_portfolio_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.className = 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dipak_portfolio_theme', nextTheme);
    document.documentElement.className = nextTheme;
  };

  const handleOpenVoice = () => {
    setIsChatOpen(false);
    setIsVoiceOpen(true);
    startVoiceInteraction();
  };

  const handleToggleVoiceMute = () => {
    const muted = voiceService.toggleMute();
    setIsMuted(muted);
    if (muted) setIsSpeaking(false);
  };

  const startVoiceInteraction = () => {
    setVoiceTranscript('');
    setLastAIResponse('');
    voiceService.startListening({
      onInterimResult: (transcript) => {
        setVoiceTranscript(transcript);
      },
      onFinalResult: (finalText) => {
        setVoiceTranscript(finalText);
        handleSendVoiceQuery(finalText);
      },
      onEnd: () => {
        setIsListening(false);
      },
      onError: (err) => {
        console.warn('Voice error:', err);
        setIsListening(false);
      }
    });
    setIsListening(true);
  };

  const handleSendVoiceQuery = async (query: string) => {
    if (!query.trim() || isTyping) return;

    setIsListening(false);
    voiceService.stopListening();
    setIsTyping(true);

    try {
      const answer = await sendChatMessage(query);
      setLastAIResponse(answer);

      if (!isMuted) {
        setIsSpeaking(true);
        voiceService.speak(answer, () => setIsSpeaking(false));
      }
    } catch (err) {
      setLastAIResponse("I'm having a connection issue, but you can email Dipak directly at dipakofficialbetaid@gmail.com!");
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleListeningInOverlay = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      startVoiceInteraction();
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Background Orbs */}
      <div className="ambient-glow">
        <div className="orb-1" />
        <div className="orb-2" />
      </div>

      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenChat={() => {
          setIsVoiceOpen(false);
          setIsChatOpen(true);
        }}
        onOpenVoice={handleOpenVoice}
      />

      {/* Main Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero
          onOpenChat={() => {
            setIsVoiceOpen(false);
            setIsChatOpen(true);
          }}
          onOpenVoice={handleOpenVoice}
        />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons (Bottom Right) */}
      {!isChatOpen && !isVoiceOpen && (
        <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 90, display: 'flex', gap: '0.75rem' }}>
          {/* Voice AI Circular Button */}
          <button
            onClick={handleOpenVoice}
            className="crimson-voice-btn"
            aria-label="Open Voice AI Assistant"
            title="Open Voice Assistant 🎙️"
          >
            <Mic size={24} />
          </button>

          {/* Chat Bot Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            aria-label="Open AI Assistant Chat"
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-glow)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'var(--transition)'
            }}
          >
            <Sparkles size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span>AI Bot</span>
          </button>
        </div>
      )}

      {/* Floating Chatbot Widget (Drawer) */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Center-Screen Immersive Voice Agent Overlay */}
      <VoiceOverlay
        isOpen={isVoiceOpen}
        onClose={() => {
          setIsVoiceOpen(false);
          voiceService.stopListening();
          voiceService.stopSpeaking();
        }}
        isListening={isListening}
        isSpeaking={isSpeaking}
        isTyping={isTyping}
        transcript={voiceTranscript}
        lastResponse={lastAIResponse}
        onToggleListening={handleToggleListeningInOverlay}
        onToggleMute={handleToggleVoiceMute}
        isMuted={isMuted}
      />
    </div>
  );
};
