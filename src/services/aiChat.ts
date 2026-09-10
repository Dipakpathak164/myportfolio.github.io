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
  // If Gemini API Key is configured in environment, call Google Gemini API with system_instruction and low temperature (0.2)
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    if (!GEMINI_API_KEY.startsWith('AIza')) {
      console.warn('VITE_GEMINI_API_KEY does not start with "AIza". Falling back to local precision assistant.');
    } else {
      try {
        const contents = [
          ...history.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          {
            role: 'user',
            parts: [{ text: userText }]
          }
        ];

        const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        
        for (const model of models) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  system_instruction: {
                    parts: [{ text: CHATBOT_SYSTEM_PROMPT }]
                  },
                  contents,
                  generationConfig: {
                    temperature: 0.2, // Low temperature for high accuracy & precision
                    topP: 0.8,
                    maxOutputTokens: 500
                  }
                })
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

  // High-Relevance Grounded Local Assistant Fallback Engine
  return generateContextualResponse(userText);
}

/**
 * Precision Intent Classifier & Context Grounded Matcher
 */
function generateContextualResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Specific Project Search Grounding
  const matchedProject = PROJECTS.find(p => 
    q.includes(p.title.toLowerCase()) || 
    q.includes(p.id.toLowerCase()) || 
    (p.title.toLowerCase().includes('trilegal') && q.includes('trilegal')) ||
    (p.title.toLowerCase().includes('surf') && q.includes('surf')) ||
    (p.title.toLowerCase().includes('dentscan') && q.includes('dentscan'))
  );

  if (matchedProject) {
    return `### Project Highlight: [${matchedProject.title}](${matchedProject.link})\n\n- **Category**: ${matchedProject.category}\n- **Description**: ${matchedProject.description}\n- **Technologies Used**: ${matchedProject.tags.join(', ')}\n- **Live Deployment**: [Visit ${matchedProject.title}](${matchedProject.link})\n\nWould you like to hear about other recent deployments built by Dipak Pathak?`;
  }

  // 2. Intent: Direct Contact & Availability Info (Only Contact Details)
  if (
    q.includes('contact') || 
    q.includes('email') || 
    q.includes('phone') || 
    q.includes('reach') || 
    q.includes('how can i contact')
  ) {
    return `### Direct Contact & Availability Info:

- **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})
- **Phone / WhatsApp**: [${PERSONAL_INFO.phone}](tel:6000389802)
- **Location**: Bengaluru, India (**100% Open to Remote Roles & Relocation**)
- **Availability**: ${PERSONAL_INFO.availability}
- **LinkedIn**: [Dipak Pathak LinkedIn](${PERSONAL_INFO.socials.linkedin})
- **GitHub**: [Dipak Pathak GitHub](${PERSONAL_INFO.socials.github})`;
  }

  // 3. Intent: Why Dipak is an Ideal Fit for Senior Next.js / React Role
  if (
    q.includes('why') || 
    q.includes('fit') || 
    q.includes('ideal') || 
    q.includes('hire') || 
    q.includes('next.js') || 
    q.includes('nextjs') || 
    q.includes('candidate') || 
    q.includes('reason') || 
    q.includes('qualification')
  ) {
    return `Why Dipak Pathak is an Ideal Fit for a Senior Next.js / React Role:

1. **Proven Experience (Ex-Techasoft)**: 5 years of total professional experience and 1 year of relevant specialized frontend engineering experience taking full ownership from requirements to live release.
2. **Next.js & React Mastery**: Architected 18+ recent web applications and enterprise platforms (Trilegal, Surf Local, Dentscan AI, Certro).
3. **Performance & Clean Code Focus**: Achieves sub-2s initial paint times, high Lighthouse speed scores, and clean maintainable TypeScript architecture.
4. **Product Ownership**: Direct experience working with designers, product managers, and backend engineers to launch production features on schedule.

📧 Contact Dipak at [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email}) or [${PERSONAL_INFO.phone}](tel:6000389802) to schedule an interview!`;
  }

  // 3. Intent: Experience & Techasoft Background
  if (q.includes('experience') || q.includes('years') || q.includes('techasoft') || q.includes('background') || q.includes('role') || q.includes('career')) {
    return `**Dipak Pathak** has **5 years of overall professional experience** and **1 year of relevant experience** as a former Senior Frontend Engineer at **Techasoft Pvt. Ltd** (Bengaluru, India).\n\nKey Experience Highlights:\n- Architected and deployed **18+ recent production web applications** using Next.js, React, and TypeScript.\n- Optimized frontend performance to reach sub-2s page load times.\n- Built responsive design systems and integrated complex REST APIs and auth flows.\n- Currently available for high-impact Senior Frontend Engineering positions (Open to Remote / Relocation).`;
  }

  // 4. Intent: Technical Skills & Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('framework') || q.includes('language') || q.includes('tools') || q.includes('frontend') || q.includes('backend')) {
    return `Dipak Pathak's engineering stack:\n\n- **Core Frontend**: Next.js, React.js, TypeScript, JavaScript (ES6+), HTML5 / CSS3\n- **Design Systems & Styling**: Tailwind CSS, Bootstrap 5, CSS Modules, Responsive & Adaptive UI Design\n- **Backend & APIs**: Node.js, PHP (CodeIgniter), REST APIs, JSON Integration\n- **Databases & Tools**: MySQL, Git, GitHub Actions CI/CD, Vite, Vercel, Netlify`;
  }

  // 5. Intent: Projects & Portfolio Overview
  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built') || q.includes('app') || q.includes('site')) {
    const featured = PROJECTS.slice(0, 5);
    const list = featured.map(p => `- [**${p.title}**](${p.link}) (${p.tags.slice(0, 2).join(', ')}): ${p.description}`).join('\n');
    return `Dipak has delivered **18+ recent production web applications**. Here are featured highlights:\n\n${list}\n\nYou can explore all 18+ recent projects with live site links in the Projects section above!`;
  }

  // 6. Intent: Contact, Remote, Relocation & Availability
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('remote') || q.includes('relocat') || q.includes('location') || q.includes('available')) {
    return `### Direct Contact & Availability Info:\n\n- **Email**: [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})\n- **Phone / WhatsApp**: [${PERSONAL_INFO.phone}](tel:6000389802)\n- **Location**: Bengaluru, India (**100% Open to Remote Roles & Relocation**)\n- **Availability**: ${PERSONAL_INFO.availability}\n- **LinkedIn**: [Dipak Pathak LinkedIn](${PERSONAL_INFO.socials.linkedin})\n- **GitHub**: [Dipak Pathak GitHub](${PERSONAL_INFO.socials.github})`;
  }

  // 7. Intent: Greeting / Introduction
  if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q === 'who are you') {
    return `Hello! I'm **Dipak Pathak's AI Portfolio Representative**.\n\nDipak is a Senior Frontend Engineer (ex-Techasoft) with **5 years of professional experience** (and **1 year relevant experience**) specializing in **React, Next.js, and TypeScript**.\n\nHow can I help you today? You can ask me about:\n- *"Why should we hire Dipak?"*\n- *"What are his top projects?"*\n- *"What is his technical stack?"*\n- *"Is Dipak open for remote work?"*`;
  }

  // Fallback Response
  return `Thank you for your question! Dipak Pathak is a Senior Frontend Engineer with **5 years professional experience** (1 year relevant experience at Techasoft) specializing in **Next.js, React, and TypeScript**.\n\nYou can reach him directly at **[${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})** or **[${PERSONAL_INFO.phone}](tel:6000389802)**. Ask me any question about his projects, skills, or experience!`;
}

