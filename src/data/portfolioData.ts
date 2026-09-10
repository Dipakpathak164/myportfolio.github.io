export interface Project {
  id: string;
  title: string;
  category: 'Featured' | 'Enterprise' | 'Web Apps' | 'Client Work';
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon: string }[];
}

export const PERSONAL_INFO = {
  name: "Dipak Pathak",
  role: "Senior Frontend Engineer",
  tagline: "Product-minded Frontend Engineer with 5+ years of professional experience and 1+ year of relevant specialized experience taking ownership from requirement to release.",
  previousCompany: "Techasoft Pvt. Ltd",
  previousCompanyUrl: "https://www.techasoft.com/",
  experienceYears: "5+",
  email: "dipakofficialbetaid@gmail.com",
  phone: "+91 6000389802",
  location: "India",
  avatar: "./assets/images/dpreal.jpeg",
  aboutImage: "./assets/images/about.png",
  bio: "I build reliable, maintainable interfaces in Next.js, React, and TypeScript. I collaborate closely with product designers, backend teams, and business stakeholders to craft pixel-perfect, highly responsive digital products that boost user engagement and deliver real business value.",
  availability: "Open for High-Impact Projects & Opportunities",
  socials: {
    github: "https://github.com/dipakpathak164",
    linkedin: "https://www.linkedin.com/in/dipak-pathak-1b8403185/",
    phone: "tel:6000389802",
  }
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Techasoft Pvt. Ltd",
    role: "Senior Frontend Engineer & Product Lead",
    period: "2020 - 2026 (5 Yrs Proffessional | 1 Yr Relevant)",
    location: "Bengaluru, India",
    description: [
      "Architected and deployed 18+ recent production web applications and enterprise platforms using React, Next.js, and TypeScript.",
      "Collaborated directly with client product managers and designers to translate requirements into responsive UI components.",
      "Optimized frontend web performance, achieving sub-2s initial paint times and high Lighthouse speed scores.",
      "Integrated complex REST APIs, authentication flows, and state management architectures across high-volume web portals."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Technologies",
    skills: [
      { name: "React.js", level: 95, icon: "Atom" },
      { name: "Next.js", level: 90, icon: "Zap" },
      { name: "TypeScript", level: 88, icon: "Code2" },
      { name: "JavaScript (ES6+)", level: 95, icon: "FileCode" },
      { name: "HTML5 / CSS3", level: 98, icon: "Layout" }
    ]
  },
  {
    title: "Styling & Design System",
    skills: [
      { name: "Tailwind CSS", level: 95, icon: "Palette" },
      { name: "Bootstrap 5", level: 92, icon: "Layers" },
      { name: "CSS Modules / Modern CSS", level: 90, icon: "Sparkles" },
      { name: "Responsive & Adaptive UI", level: 98, icon: "Smartphone" }
    ]
  },
  {
    title: "Backend & Integrations",
    skills: [
      { name: "Node.js", level: 80, icon: "Server" },
      { name: "PHP / CodeIgniter", level: 82, icon: "Database" },
      { name: "REST APIs & JSON", level: 95, icon: "Globe" },
      { name: "MySQL", level: 78, icon: "HardDrive" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "surf-local",
    title: "Surf Local",
    category: "Featured",
    description: "Modern exchange and local marketplace platform with interactive listing discovery.",
    image: "./assets/images/surflocal.png",
    link: "https://www.surflocalx.com/",
    tags: ["React", "TypeScript", "REST API", "Tailwind CSS"],
    featured: true
  },
  {
    id: "surf-local-agent",
    title: "Surf Local Agent Portal",
    category: "Web Apps",
    description: "Agent registration and management dashboard built for real-time onboarding.",
    image: "./assets/images/surflocalagent.png",
    link: "https://agent.surflocalexchange.com/register",
    tags: ["React", "Web Dashboard", "Form Validation", "Bootstrap"],
    featured: true
  },
  {
    id: "trilegal",
    title: "Trilegal Enterprise Portal",
    category: "Enterprise",
    description: "Corporate law firm portal with sleek typography and fast response speed.",
    image: "./assets/images/tl.png",
    link: "https://trilegal.com/",
    tags: ["Next.js", "Enterprise UI", "SEO Optimization"],
    featured: true
  },
  {
    id: "greenspace",
    title: "Greenspace Industrial",
    category: "Enterprise",
    description: "Industrial equipment and solution showcase featuring high-res media components.",
    image: "./assets/images/gs.png",
    link: "https://greenspaceind.com/",
    tags: ["React", "Responsive UI", "Product Showcase"]
  },
  {
    id: "bravopharma",
    title: "Bravopharma International",
    category: "Enterprise",
    description: "Healthcare & pharmaceutical portal built with clean accessibility standards.",
    image: "./assets/images/bf.png",
    link: "https://www.bravopharma.com/",
    tags: ["Web Design", "JavaScript", "Responsive"]
  },
  {
    id: "dentscan",
    title: "Dentscan AI Dental Tech",
    category: "Web Apps",
    description: "Next-gen dental scanning and diagnostic SaaS platform website.",
    image: "./assets/images/dscan.png",
    link: "https://www.dentscan.io/",
    tags: ["React", "SaaS Interface", "Interactive UI"],
    featured: true
  },
  {
    id: "certro",
    title: "Certro Verification System",
    category: "Web Apps",
    description: "Digital certificate authentication and verification portal for Techasoft.",
    image: "./assets/images/certro.png",
    link: "https://certro.techasoft.com/",
    tags: ["React", "API Validation", "Node.js"]
  },
  {
    id: "mentutor",
    title: "Mentutor E-Learning",
    category: "Web Apps",
    description: "EdTech mentorship platform enabling student tutor connections.",
    image: "./assets/images/mentutor.png",
    link: "http://www.mentutor.io/",
    tags: ["React", "EdTech", "UI/UX"]
  },
  {
    id: "parkbay",
    title: "Parkbay",
    category: "Client Work",
    description: "Smart parking reservation web app interface.",
    image: "./assets/images/parkbay.png",
    link: "https://www.park-bay.com/",
    tags: ["Web App", "UI/UX Design"]
  },
  {
    id: "discover-signage",
    title: "Discover Signage",
    category: "Client Work",
    description: "Digital signage solution showcase for enterprise displays.",
    image: "./assets/images/clientdiscover.png",
    link: "https://discoversignage.com/",
    tags: ["Responsive Web", "Bootstrap"]
  },
  {
    id: "instant-genie",
    title: "Instant Genie",
    category: "Web Apps",
    description: "On-demand local services platform interface.",
    image: "./assets/images/project1.png",
    link: "https://instant-genie.com/",
    tags: ["React", "Service Booking"]
  },
  {
    id: "astrohelp",
    title: "AstroHelp",
    category: "Web Apps",
    description: "Consultation web portal with chat integration.",
    image: "./assets/images/astrohelp.png",
    link: "https://astrohelp.co/",
    tags: ["Web Portal", "API Integration"]
  },
  {
    id: "matrix-venture",
    title: "Matrix Venture Studio",
    category: "Enterprise",
    description: "Venture builder portfolio website showcasing studio startups.",
    image: "./assets/images/matrixweb.png",
    link: "https://www.matrixventurestudio.com/",
    tags: ["Next.js", "Venture Capital"]
  },
  {
    id: "sl-nusantara",
    title: "Strategi Lingkar Nusantara",
    category: "Enterprise",
    description: "Strategic corporate website with multilingual support.",
    image: "./assets/images/sln.png",
    link: "https://sl-nusantara.com/",
    tags: ["Corporate Web", "Modern Styling"]
  },
  {
    id: "techastudio",
    title: "Techastudio Creative",
    category: "Client Work",
    description: "Digital studio portfolio showcasing design & development capabilities.",
    image: "./assets/images/techastudio.png",
    link: "https://www.techastudio.com/",
    tags: ["Design Studio", "Animations"],
    featured: true
  },
  {
    id: "pluto-space",
    title: "Plutoplanet Inc. Space Design",
    category: "Client Work",
    description: "Architectural & spatial design showcase website.",
    image: "./assets/images/pluto.png",
    link: "https://plutoplanet.techasoft.com/",
    tags: ["Space Design", "Minimalist UI"]
  },
  {
    id: "dr-spinewala",
    title: "Dr. Spinewala Healthcare",
    category: "Client Work",
    description: "Medical consultation & appointment booking website.",
    image: "./assets/images/spinewala.png",
    link: "https://www.drspinewala.com/",
    tags: ["Healthcare", "Appointment Booking"]
  },
  {
    id: "indian-rda",
    title: "Indian RDA",
    category: "Enterprise",
    description: "National retail & distribution alliance platform built with high performance UI & member resources.",
    image: "./assets/images/rda.png",
    link: "https://www.indianrda.com/",
    tags: ["React", "Enterprise Web", "Responsive UI", "REST API"],
    featured: true
  }
];
