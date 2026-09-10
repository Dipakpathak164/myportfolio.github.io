import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Mic, Volume2, VolumeX, Square } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../../services/aiChat';
import { voiceService } from '../../services/voiceAssistant';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestSpeechRef = useRef<string>('');

  const quickChips = [
    "⭐ Why is Dipak an ideal fit for Next.js/React roles?",
    "📬 How can I contact or hire him?",
    "💼 Tell me about Dipak's experience",
    "🚀 What projects has he built?",
    "🛠️ What is his primary tech stack?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false);
    setIsListening(false);
    setIsSpeaking(false);
    latestSpeechRef.current = '';
    voiceService.stopSpeaking();
    voiceService.stopListening();
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      setIsTyping(true);
      timer = setTimeout(() => {
        setMessages([
          {
            id: 'welcome-msg',
            sender: 'bot',
            text: "👋 Hi! I'm **Dipak's Real-Time AI Voice Agent**. Click the mic 🎙️, speak your question, and I'll automatically answer and speak back to you!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
      }, 800);
    } else {
      resetChat();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleToggleMute = () => {
    const muted = voiceService.toggleMute();
    setIsMuted(muted);
    if (muted) setIsSpeaking(false);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    latestSpeechRef.current = '';
    setIsTyping(true);

    try {
      const responseText = await sendChatMessage(query, messages);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      // Automatically speak out the AI response
      if (!isMuted) {
        setIsSpeaking(true);
        voiceService.speak(responseText, () => setIsSpeaking(false));
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'bot',
        text: "I encountered a connection issue. Feel free to email Dipak directly at **dipakofficialbetaid@gmail.com**!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      latestSpeechRef.current = '';
      voiceService.startListening({
        onInterimResult: (transcript) => {
          setInput(transcript);
          latestSpeechRef.current = transcript;
        },
        onFinalResult: (transcript) => {
          setInput(transcript);
          latestSpeechRef.current = transcript;
          // Auto-send query immediately when user finishes sentence!
          setTimeout(() => {
            if (transcript.trim()) {
              handleSend(transcript);
            }
          }, 300);
        },
        onEnd: () => {
          setIsListening(false);
          // If we had speech content when recognition ended, auto-send
          const pending = latestSpeechRef.current;
          if (pending.trim() && !isTyping) {
            handleSend(pending);
          }
        },
        onError: (err) => {
          console.warn('Voice recognition error:', err);
          setIsListening(false);
        }
      });
      setIsListening(true);
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
      const bulletMatch = line.match(/^[-*]\s+(.*)$/);
      const numberMatch = line.match(/^(\d+\.)\s+(.*)$/);

      const parseInline = (str: string): React.ReactNode[] => {
        if (!str) return [];
        const elements: React.ReactNode[] = [];
        const tokenRegex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = tokenRegex.exec(str)) !== null) {
          if (match.index > lastIndex) {
            elements.push(str.substring(lastIndex, match.index));
          }

          if (match[1] !== undefined && match[2] !== undefined) {
            // Markdown Link [label](url) - parse nested bold/italic inside label
            elements.push(
              <a
                key={`link-${match.index}-${lastIndex}`}
                href={match[2]}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere'
                }}
              >
                {parseInline(match[1])}
              </a>
            );
          } else if (match[3] !== undefined) {
            // Markdown Bold **text** - parse nested links or formatting
            elements.push(
              <strong key={`bold-${match.index}-${lastIndex}`} style={{ fontWeight: 700 }}>
                {parseInline(match[3])}
              </strong>
            );
          } else if (match[4] !== undefined) {
            // Markdown Italic *text*
            elements.push(
              <em key={`italic-${match.index}-${lastIndex}`} style={{ fontStyle: 'italic' }}>
                {parseInline(match[4])}
              </em>
            );
          }

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < str.length) {
          elements.push(str.substring(lastIndex));
        }

        return elements;
      };

      if (headingMatch) {
        return (
          <div key={lineIdx} style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.4rem', marginBottom: '0.2rem', color: 'var(--accent-cyan)', wordBreak: 'break-word' }}>
            {parseInline(headingMatch[2])}
          </div>
        );
      }

      if (bulletMatch) {
        return (
          <div key={lineIdx} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.15rem', marginBottom: '0.1rem', wordBreak: 'break-word' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>•</span>
            <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{parseInline(bulletMatch[1])}</div>
          </div>
        );
      }

      if (numberMatch) {
        return (
          <div key={lineIdx} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem', marginBottom: '0.1rem', wordBreak: 'break-word' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>{numberMatch[1]}</span>
            <div style={{ flex: 1, minWidth: 0, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{parseInline(numberMatch[2])}</div>
          </div>
        );
      }

      return (
        <React.Fragment key={lineIdx}>
          {parseInline(line)}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: 'min(400px, calc(100vw - 32px))',
        height: '580px',
        maxHeight: 'calc(100vh - 48px)',
        zIndex: 100,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(66, 133, 244, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-glow)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: '#34A853',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>Real-Time AI Voice Agent</h3>
            <p style={{ fontSize: '0.75rem', opacity: 0.9, margin: 0 }}>
              {isSpeaking ? '🔊 Speaking response...' : isListening ? '🎙️ Listening & Auto-Responding...' : 'Powered by Gemini & Web Voice API'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Mute Audio Speaker Button */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Window */}
      <div
        style={{
          flexGrow: 1,
          padding: '1rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              width: '100%'
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                padding: '0.75rem 1rem',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.sender === 'user' ? '#34A853' : 'var(--bg-card)',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                wordBreak: 'break-word',
                overflowWrap: 'anywhere'
              }}
            >
              {renderFormattedText(msg.text)}
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', padding: '0 0.25rem' }}>
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isListening && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#EA4335', fontSize: '0.85rem', fontWeight: 600 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EA4335', animation: 'pulseGlow 1s infinite' }} />
            <span>Listening... Speak now and AI will auto-reply</span>
          </div>
        )}

        {isTyping && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1rem',
              borderRadius: '18px 18px 18px 4px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              maxWidth: '85%',
              width: 'fit-content',
              alignSelf: 'flex-start',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Sparkles size={16} style={{ color: '#4285F4', flexShrink: 0 }} className="animate-spin" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>AI Agent is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div
        style={{
          padding: '0.6rem 0.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          maxHeight: '120px',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          flexShrink: 0
        }}
      >
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            style={{
              fontSize: '0.75rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(66, 133, 244, 0.08)',
              border: '1px solid rgba(66, 133, 244, 0.2)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'normal',
              textAlign: 'left',
              wordBreak: 'break-word',
              lineHeight: 1.35
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box & Voice Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          flexShrink: 0
        }}
      >
        {/* Microphone Button */}
        {voiceService.isSpeechSupported() && (
          <button
            type="button"
            onClick={handleToggleListening}
            title={isListening ? 'Stop Listening' : 'Speak into Microphone'}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isListening ? '#EA4335' : 'rgba(66, 133, 244, 0.1)',
              border: isListening ? 'none' : '1px solid rgba(66, 133, 244, 0.3)',
              color: isListening ? '#ffffff' : 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'var(--transition)'
            }}
          >
            {isListening ? <Square size={16} fill="#ffffff" /> : <Mic size={18} />}
          </button>
        )}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={isListening ? 'Listening... Speak your query' : 'Type or speak your question...'}
          style={{
            flexGrow: 1,
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-primary)',
            border: isListening ? '1px solid #EA4335' : '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#34A853',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            opacity: input.trim() ? 1 : 0.5,
            flexShrink: 0
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
