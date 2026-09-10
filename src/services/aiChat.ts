import { CHATBOT_SYSTEM_PROMPT } from '../data/chatbotPrompt';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export async function sendChatMessage(
  userText: string,
  history: ChatMessage[] = []
): Promise<string> {
  // If Gemini API Key is configured in environment, call Google Gemini API
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    if (!GEMINI_API_KEY.startsWith('AIza')) {
      console.warn('VITE_GEMINI_API_KEY does not start with "AIza". Google AI Studio requires keys generated at https://aistudio.google.com/app/apikey. Falling back to local assistant.');
    } else {
      try {
        const contents = [
          {
            role: 'user',
            parts: [{ text: `${CHATBOT_SYSTEM_PROMPT}\n\nUser Question: ${userText}` }]
          }
        ];

        const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
        
        for (const model of models) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents })
              }
            );

            if (response.ok) {
              const data = await response.json();
              const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidateText) {
                return candidateText;
              }
            }
          } catch (mErr) {
            // continue to next model candidate
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed:', err);
      }
    }
  }

  // Standalone Pitch Assistant Response
  return generateLocalAssistantResponse(userText);
}

function generateLocalAssistantResponse(query: string): string {
  const q = query.toLowerCase();

  // Why Hire Dipak / Next.js / Senior Role Questions
  if (q.includes('why') || q.includes('hire') || q.includes('next.js') || q.includes('nextjs') || q.includes('candidate') || q.includes('reason')) {
    return `### Why Hire Dipak Pathak for a Senior Next.js / React Role?\n\n1. **5 Years Professional / 1 Year Relevant Experience (Ex-Techasoft)**: Dipak doesn't just write code—he takes full ownership of web projects from initial requirements to production releases.\n2. **Next.js & React Mastery**: Architected 18+ recent high-performance web applications including enterprise platforms (*Trilegal*), healthcare (*Bravopharma*), SaaS (*Dentscan*), and marketplace portals (*Surf Local*).\n3. **Performance & Clean Code Focus**: Achieves sub-2s web paint times, high Lighthouse speed scores, and clean maintainable TypeScript architecture.\n4. **Seamless Collaboration**: Experienced working with product managers, UI/UX designers, and backend teams to deliver business value on time.\n\nContact Dipak at **${PERSONAL_INFO.email}** or **+91 6000389802** to schedule an interview!`;
  }

  if (q.includes('experience') || q.includes('years') || q.includes('work') || q.includes('techasoft')) {
    return `**Dipak Pathak** has **5 years of professional experience** overall and **1 year of relevant experience** as a former Senior Frontend Engineer at **Techasoft Pvt. Ltd** (Bengaluru, India), and is currently open for new senior frontend opportunities.\n\nHe specializes in taking ownership of web applications from technical requirements to production releases, specializing in **Next.js, React, TypeScript, and modern responsive UI design**.`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('framework')) {
    return `Dipak's primary tech stack includes:\n- **Frontend**: Next.js, React.js, TypeScript, JavaScript (ES6+)\n- **Styling**: Tailwind CSS, Bootstrap 5, Modern CSS Modules, Glassmorphic Design Systems\n- **Backend & APIs**: Node.js, PHP (CodeIgniter), REST APIs, JSON\n- **Databases & Tools**: MySQL, Git, Vite, Vercel, GitHub Pages`;
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
    const featured = PROJECTS.slice(0, 4);
    const projectList = featured.map(p => `- [${p.title}](${p.link}): ${p.description}`).join('\n');
    return `Dipak has architected and delivered **18+ recent web applications & enterprise platforms**. Here are a few recent highlights:\n\n${projectList}\n\nYou can explore all 18+ recent projects right in the Projects section!`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('message')) {
    return `You can reach Dipak Pathak directly via:\n- **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})\n- **Phone**: [${PERSONAL_INFO.phone}](tel:6000389802)\n- **LinkedIn**: [Dipak Pathak LinkedIn](${PERSONAL_INFO.socials.linkedin})\n- **GitHub**: [Dipak Pathak GitHub](${PERSONAL_INFO.socials.github})\n\nOr scroll down to send him a direct message using the contact form!`;
  }

  return `Thanks for reaching out! I'm **Dipak's AI Portfolio Assistant**. Dipak Pathak is a Senior Frontend Engineer (ex-Techasoft) with **5 years professional experience** (and **1 year relevant experience**) building web products in **React, Next.js, and TypeScript**.\n\nFeel free to ask me about his **projects**, **skills**, **work experience**, or **why you should hire him**!`;
}
