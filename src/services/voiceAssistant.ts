// Web Speech API Voice Service for Zero-Cost Real-Time Voice Agent

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface VoiceRecognitionHandlers {
  onInterimResult: (text: string) => void;
  onFinalResult: (text: string) => void;
  onEnd: () => void;
  onError: (error: string) => void;
}

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const ELEVENLABS_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Rachel voice

export class VoiceAssistantService {
  private recognition: any = null;
  private isListening: boolean = false;
  private isMuted: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;

  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }

    if (this.isTTSSupported()) {
      this.initVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.isTTSSupported()) return;
    this.voices = window.speechSynthesis.getVoices();
    this.selectedVoice = this.pickBestNeuralVoice(this.voices);
  }

  private pickBestNeuralVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    const englishVoices = voices.filter(v => v.lang.startsWith('en'));

    const googleVoice = englishVoices.find(v => v.name.includes('Google') && (v.name.includes('US') || v.name.includes('UK') || v.name.includes('Natural')));
    if (googleVoice) return googleVoice;

    const msNatural = englishVoices.find(v => v.name.includes('Natural') || v.name.includes('Online'));
    if (msNatural) return msNatural;

    const appleVoice = englishVoices.find(v => v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel') || v.name.includes('Enhanced'));
    if (appleVoice) return appleVoice;

    const anyGoogle = englishVoices.find(v => v.name.includes('Google'));
    if (anyGoogle) return anyGoogle;

    return englishVoices[0] || voices[0] || null;
  }

  public isSpeechSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public isTTSSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  public startListening(handlers: VoiceRecognitionHandlers) {
    if (!this.recognition) {
      handlers.onError('Speech recognition is not supported in this browser.');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.stopSpeaking();

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        handlers.onFinalResult(finalTranscript);
      } else if (interimTranscript) {
        handlers.onInterimResult(interimTranscript);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      handlers.onEnd();
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      handlers.onError(event.error);
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      this.isListening = false;
      handlers.onError('Failed to start microphone.');
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
      this.isListening = false;
    }
  }

  public async speak(rawText: string, onEnd?: () => void) {
    if (this.isMuted) return;

    this.stopSpeaking();

    const cleanText = this.sanitizeTextForSpeech(rawText);
    if (!cleanText) return;

    // Option 1: ElevenLabs API (If valid key is provided in .env)
    if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_') && ELEVENLABS_API_KEY.length > 20) {
      try {
        console.log('🎙️ Contacting ElevenLabs Voice API...');
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
          {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': ELEVENLABS_API_KEY.trim()
            },
            body: JSON.stringify({
              text: cleanText,
              model_id: 'eleven_multilingual_v2',
              voice_settings: { stability: 0.5, similarity_boost: 0.75 }
            })
          }
        );

        if (response.ok) {
          console.log('✅ ElevenLabs Audio Stream Received & Playing!');
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          this.currentAudioElement = new Audio(audioUrl);
          if (onEnd) {
            this.currentAudioElement.onended = onEnd;
          }
          await this.currentAudioElement.play();
          return;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn('ElevenLabs API Key check failed (Status:', response.status, errData, '). Smoothly falling back to HD Neural Voice.');
        }
      } catch (err) {
        console.warn('ElevenLabs network call error, smoothly falling back to HD Neural Voice:', err);
      }
    }

    // Option 2: Browser HD Neural Voice Selection (100% Free Fallback)
    if (!this.isTTSSupported()) return;

    if (!this.selectedVoice || this.voices.length === 0) {
      this.initVoices();
    }

    console.log('🎙️ Playing HD Neural Voice:', this.selectedVoice?.name || 'Default');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.98;
    utterance.pitch = 1.02;
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  private sanitizeTextForSpeech(rawText: string): string {
    if (!rawText) return '';

    return rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/[*_#`~>]/g, ' ')
      .replace(/email\s*:\s*email/gi, 'Email:')
      .replace(/phone\s*:\s*phone/gi, 'Phone:')
      .replace(/^\s*[-•]\s*/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public stopSpeaking() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if (this.isTTSSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeaking();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const voiceService = new VoiceAssistantService();
