import React, { useState, useEffect, useRef } from 'react';
import {
  SiPython,
  SiMysql,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMongodb,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiExpress,
  SiFirebase
} from "react-icons/si";

// --- Type Definitions ---
interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
}

// --- Noise/Glitch Canvas Background ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanlines
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = `rgba(0,0,0,${0.03 + Math.sin(y * 0.1 + frame * 0.02) * 0.01})`;
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // Glitch horizontal lines
      if (frame % 60 < 3) {
        const glitchY = Math.random() * canvas.height;
        const glitchH = Math.random() * 40 + 10;
        ctx.fillStyle = `rgba(255,0,128,0.03)`;
        ctx.fillRect(0, glitchY, canvas.width, glitchH);
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(0,255,200,0.025)';
      ctx.lineWidth = 1;
      const cellSize = 80;
      for (let x = 0; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- Glitch Text ---
const GlitchText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <span className={`glitch-text ${className}`} data-text={children}>
    {children}
  </span>
);

// --- Section Title ---
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-20 relative">
    <div className="flex items-center gap-4 mb-2">
      <div className="w-3 h-3 bg-acid rotate-45 animate-pulse" />
      <span className="text-xs font-mono text-acid tracking-[0.4em] uppercase opacity-70">// section</span>
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white relative">
      <span className="relative inline-block">
        {children}
        <span className="absolute inset-0 text-pink-500 opacity-30 translate-x-1 translate-y-0.5 select-none" aria-hidden>{children}</span>
        <span className="absolute inset-0 text-cyan-400 opacity-20 -translate-x-0.5 translate-y-0.5 select-none" aria-hidden>{children}</span>
      </span>
    </h2>
    <div className="mt-3 h-px bg-gradient-to-r from-acid via-pink-500 to-transparent w-1/2" />
  </div>
);

// --- Skill Icon ---
const SkillIcon: React.FC<Skill> = ({ icon, name }) => (
  <div className="skill-card group relative flex flex-col items-center gap-3 p-4 border border-white/10 bg-black cursor-default overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-acid/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-acid to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    <div className="w-10 h-10 flex items-center justify-center group-hover:scale-125 transition-transform duration-200 relative z-10">
      {icon}
    </div>
    <span className="text-[10px] font-mono font-bold text-white/50 group-hover:text-acid transition-colors duration-200 tracking-widest uppercase relative z-10">{name}</span>
  </div>
);

// --- Project Card ---
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div
    className="project-card group relative border border-white/10 bg-black overflow-hidden flex flex-col"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    {/* Index number */}
    <div className="absolute top-4 right-4 font-mono text-xs text-white/20 z-10">
      [{String(index + 1).padStart(2, '0')}]
    </div>

    {/* Corner bracket decorations */}
    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-acid opacity-60 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300" />
    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-pink-500 opacity-60 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-300" />

    {/* Icon area */}
    <div className="relative flex items-center justify-center h-36 overflow-hidden bg-gradient-to-b from-white/3 to-transparent">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at center, rgba(0,255,200,0.08) 0%, transparent 70%)' }} />
      <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_20px_rgba(0,255,200,0.6)]">
        {project.icon}
      </div>
    </div>

    {/* Glitch divider */}
    <div className="h-px bg-gradient-to-r from-acid via-pink-500 to-transparent opacity-40" />

    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-black uppercase text-sm tracking-tight text-white group-hover:text-acid transition-colors duration-200 mb-2 leading-tight">{project.title}</h3>
      <p className="text-white/40 mb-4 text-xs leading-relaxed flex-1 font-mono">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-[9px] font-mono font-bold bg-white/5 text-acid/70 px-2 py-0.5 border border-acid/20 uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center bg-acid text-black text-xs font-black uppercase px-3 py-2 tracking-widest hover:bg-pink-400 transition-colors duration-150">
            LIVE
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center border border-white/20 text-white/60 text-xs font-black uppercase px-3 py-2 tracking-widest hover:border-acid hover:text-acid transition-all duration-150">
            CODE
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- Experience Card (Timeline style) ---
const ExperienceCard: React.FC<{ experience: Experience; index: number; total: number }> = ({ experience, index, total }) => (
  <div className="relative flex gap-6 group">
    {/* Timeline */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative w-5 h-5 flex-shrink-0 mt-7">
        <div className="absolute inset-0 border-2 border-acid rotate-45 group-hover:rotate-[90deg] transition-transform duration-300" />
        <div className="absolute inset-1.5 bg-acid group-hover:bg-pink-400 transition-colors duration-300" />
      </div>
      {index < total - 1 && (
        <div className="flex-1 w-px bg-gradient-to-b from-acid/60 to-transparent mt-1" style={{ minHeight: '40px' }} />
      )}
    </div>

    {/* Card */}
    <div className="flex-1 mb-8 relative border border-white/10 bg-black p-6 overflow-hidden
      group-hover:border-acid/40 transition-all duration-300">
      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-acid to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,0,128,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-3">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-acid transition-colors duration-200 mb-1">{experience.title}</h3>
            <p className="text-pink-400 font-mono text-sm font-bold">{experience.company}</p>
          </div>
          <div className="flex flex-col lg:items-end gap-2">
            <span className="text-white/40 text-xs font-mono bg-white/5 px-3 py-1 border border-white/10">{experience.period}</span>
            <span className="inline-block bg-acid text-black px-3 py-1 text-xs font-black uppercase tracking-wider">
              {experience.type}
            </span>
          </div>
        </div>

        <ul className="text-white/50 mb-5 space-y-2.5">
          {experience.description.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-acid font-mono text-xs mt-1 flex-shrink-0">›</span>
              <span className="text-xs leading-relaxed font-mono">{point}</span>
            </li>
          ))}
        </ul>

        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, i) => (
              <span key={i} className="text-[9px] font-mono bg-white/5 text-white/40 px-2 py-1 border border-white/10 uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Contact Info Card ---
const ContactCard: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="group flex items-center gap-4 p-5 border border-white/10 bg-black hover:border-acid/50 transition-all duration-200 relative overflow-hidden">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style={{ background: 'radial-gradient(circle at 0% 50%, rgba(0,255,200,0.04) 0%, transparent 70%)' }} />
    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-acid/50 transition-colors duration-200 flex-shrink-0 relative z-10">
      {icon}
    </div>
    <div className="text-left min-w-0 relative z-10">
      <p className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.3em] mb-1">{label}</p>
      <div className="text-white/70 font-mono text-sm truncate group-hover:text-acid transition-colors duration-200">{value}</div>
    </div>
  </div>
);

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  // --- Portfolio Data ---
  const portfolioData = {
    name: "Gonella Siva Sai Surya Prakash",
    tagline: "A CSE Undergrad & AI Enthusiast | Exploring the Future of Technology",
    bio: "I am a passionate Computer Science Engineering student at PES University, Bengaluru, with a strong foundation in full-stack development and emerging technologies. Currently in my third year, I've developed expertise in modern web technologies, machine learning, and cloud computing through both academic projects and self-directed learning. My journey in tech began with curiosity about how applications work behind the scenes, which led me to explore everything from responsive front-end interfaces to robust backend architectures. I thrive in collaborative environments and have experience working in agile teams during hackathons and group projects. I'm particularly interested in the intersection of AI and web development, and I'm actively contributing to open-source projects while seeking internship opportunities where I can apply my skills to solve real-world problems and continue growing as a developer.",
    contactEmail: "gonellasurya2005@gmail.com",
    phone: "+91 9880410689",
    location: "Bengaluru, Karnataka, India",
    resumeUrl: "/GonellaSuryaPrakash_Resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
      github: "https://github.com/GSuryaP",
      twitter: "https://twitter.com/yourusername",
    },

    skills: [
      { name: "Python", icon: <SiPython color="#3776AB" size={40} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={40} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={40} /> },
      {
        name: "RASA",
        icon: (
          <img
            src="/rasa.jpg"
            alt="RASA"
            className="w-10 h-10"
          />
        ),
      },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={40} /> },
      { name: "Express", icon: <SiExpress color="#ffffff" size={40} /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={40} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={40} /> },
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={40} /> },
      { name: "CSS3", icon: <SiCss color="#1572B6" size={40} /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" size={40} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={40} /> },
      { name: "C", icon: <SiC color="#00599C" size={40} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={40} /> },
      { name: "GitHub", icon: <SiGithub color="#ffffff" size={40} /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={40} /> },
    ],

    experiences: [
      {
        title: "Computer Science Engineering Student",
        company: "PES University",
        period: "2023 - Present",
        type: "Education",
        description: [
          "I am currently pursuing a B.Tech in Computer Science and Engineering at PES University, maintaining a CGPA of 8.73 through my 5th semester. I have been honored with the Prof. CNR Scholarship for the 1st, 3rd, 4th semesters, awarded to the top 20%. Other than academics, I actively participate in campus life as a member of multiple clubs.",
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"]
      },
      {
        title: "Research Intern",
        company: "Center of Computer Networks and CyberSecurity (CCNCS)",
        period: "June 2025 - July 2025",
        type: "Summer Internship",
        description: [
          "As a Research Intern at CCNCS, I developed an intelligent SDN management system by integrating the ONOS distributed controller cluster using Mininet with a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection through REST APIs and a visualization dashboard."
        ],
        technologies: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"]
      },
      {
        title: "Logistics Head",
        company: "Equinox - The Space Club, PESU ECC",
        period: "May 2025 - Present",
        type: "Club domain head",
        description: [
          "As the Logistics Head of Equinox – The Space Club, I oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and other activities with efficient logistical support and timely operations."
        ],
        technologies: []
      },
      {
        title: "SMCC Head",
        company: "Equinox - The Space Club, PESU ECC",
        period: "Sep 2024 - May 2025",
        type: "Club domain head",
        description: [
          "As the Social Media and Content Creator for Equinox – The Space Club, I handled digital outreach by designing engaging posts, managing social media campaigns, and creating content to promote events."
        ],
        technologies: []
      }
    ] as Experience[],

    projects: [
      {
        title: "RASA-Driven SDN Tool",
        description:
          "Built a RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet with custom RASA actions for automated flow queries and troubleshooting.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <circle cx="12" cy="5" r="2" stroke="#00ffc8" strokeWidth="2" />
            <circle cx="5" cy="19" r="2" stroke="#00ffc8" strokeWidth="2" />
            <circle cx="19" cy="19" r="2" stroke="#00ffc8" strokeWidth="2" />
            <path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#00ffc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
        repoUrl: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
      },
      {
        title: "Distributed Image Processing Pipeline",
        description:
          "A distributed image processing system using Apache Kafka for async communication between a FastAPI master node and multiple PIL-based worker nodes. The master splits images into tiles, publishes them to Kafka, workers process and return results, and the master reconstructs the final image — with a real-time heartbeat monitoring dashboard.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <rect x="9" y="9" width="6" height="6" rx="1" stroke="#00ffc8" strokeWidth="1.8" />
            <rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#00ffc8" strokeWidth="1.5" />
            <line x1="12" y1="6" x2="12" y2="9" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#00ffc8" strokeWidth="1.5" />
            <line x1="6" y1="12" x2="9" y2="12" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#00ffc8" strokeWidth="1.5" />
            <line x1="18" y1="12" x2="15" y2="12" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#00ffc8" strokeWidth="1.5" />
            <line x1="12" y1="18" x2="12" y2="15" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker", "Distributed Systems"],
        repoUrl: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
      },
      {
        title: "GitHub Repository Tracker",
        description:
          "A modern interactive dashboard for tracking GitHub repositories, users, commits, and open issues. Features a real-time stats overview, live search, aurora-style animated background with floating orbs, and quick-access tools — all powered by a Node.js API and a Python GitHub sync script.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="#00ffc8" strokeWidth="1.2" fill="none" />
            <path d="M8 17v-4M12 17v-6M16 17v-4" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
        repoUrl: "https://github.com/GSuryaP/Github-Repository-Tracker",
      },
      {
        title: "Personal Finance Analytics Dashboard",
        description:
          "A FinTech analytics dashboard built with React and Tailwind CSS for managing personal transactions in real time. Supports full CRUD operations, dynamic Recharts visualizations (line & pie charts), dark/light mode toggle, real-time search, and auto-recalculated metrics for income, expenses, net balance, and savings rate.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <rect x="3" y="12" width="3" height="9" rx="1" stroke="#00ffc8" strokeWidth="1.8" />
            <rect x="8" y="8" width="3" height="13" rx="1" stroke="#00ffc8" strokeWidth="1.8" />
            <rect x="13" y="5" width="3" height="16" rx="1" stroke="#00ffc8" strokeWidth="1.8" />
            <rect x="18" y="9" width="3" height="12" rx="1" stroke="#00ffc8" strokeWidth="1.8" />
            <path d="M4.5 11L9.5 7L14.5 4L19.5 8" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1" />
          </svg>
        ),
        tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript", "CRUD"],
        repoUrl: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
      },
      {
        title: "AdaptiveLearn AI",
        description:
          "An AI-powered teacher analytics dashboard built on AWS free-tier services. Reads student scores and progress from S3 CSV files via a Python Lambda function, uses Amazon Bedrock (Titan) for LLM-driven insights, and surfaces weak topics and struggling students through a clean HTML frontend — no server required.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#00ffc8" strokeWidth="1.5" fill="none" />
            <path d="M9 12h6M9 14.5h4" stroke="#00ffc8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["AWS S3", "AWS Lambda", "Amazon Bedrock", "Python", "HTML", "CSV"],
        repoUrl: "https://github.com/GSuryaP/AdaptiveLearn-AI",
      },
      {
        title: "Weather & AQI Tracker",
        description:
          "Built a Tkinter-based application that verifies city names using OpenWeatherMap API and displays comprehensive environmental data including Air Quality Index (AQI) and detailed weather information with user-friendly interface and error handling.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14">
            <circle cx="12" cy="10" r="4" stroke="#00ffc8" strokeWidth="2" />
            <path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#00ffc8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON", "GUI"],
        repoUrl: "https://github.com/GSuryaP/Weather-AQI_Tracker",
      },
    ] as Project[],
  };

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-[#030303] text-white font-sans leading-relaxed min-h-screen">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap');

        :root {
          --acid: #00ffc8;
          --pink: #ff0080;
          --yellow: #ffee00;
        }

        * { box-sizing: border-box; }
        body { cursor: crosshair; }
        a, button { cursor: crosshair; }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        h1, h2, h3 { font-family: 'Bebas Neue', sans-serif; }

        .text-acid { color: var(--acid); }
        .bg-acid { background-color: var(--acid); }
        .border-acid { border-color: var(--acid); }
        .text-pink-400 { color: var(--pink); }
        .border-pink-500 { border-color: var(--pink); }

        /* Glitch Text Effect */
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          color: var(--pink);
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          animation: glitch-clip-1 4s infinite;
          opacity: 0.6;
        }
        .glitch-text::after {
          color: var(--acid);
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          animation: glitch-clip-2 4s infinite 0.1s;
          opacity: 0.4;
        }
        @keyframes glitch-clip-1 {
          0%, 92%, 96%, 100% { transform: none; opacity: 0; }
          93% { transform: translate(-2px, 0); opacity: 0.6; }
          95% { transform: translate(2px, 0); opacity: 0.6; }
        }
        @keyframes glitch-clip-2 {
          0%, 92%, 96%, 100% { transform: none; opacity: 0; }
          93% { transform: translate(2px, 0); opacity: 0.4; }
          95% { transform: translate(-2px, 0); opacity: 0.4; }
        }

        /* Big name glitch */
        .hero-name-glitch {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 8vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: white;
          position: relative;
          display: block;
        }
        .hero-name-glitch::before {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          color: var(--pink);
          animation: hero-glitch-1 5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          opacity: 0;
        }
        .hero-name-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          color: var(--acid);
          animation: hero-glitch-2 5s infinite 0.08s;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          opacity: 0;
        }
        @keyframes hero-glitch-1 {
          0%, 88%, 94%, 100% { transform: none; opacity: 0; }
          89% { transform: translate(-4px, 2px) skew(-2deg); opacity: 0.8; }
          91% { transform: translate(3px, -1px) skew(1deg); opacity: 0.8; }
          93% { transform: translate(-2px, 0); opacity: 0.8; }
        }
        @keyframes hero-glitch-2 {
          0%, 88%, 94%, 100% { transform: none; opacity: 0; }
          89% { transform: translate(4px, -2px) skew(2deg); opacity: 0.6; }
          91% { transform: translate(-3px, 1px) skew(-1deg); opacity: 0.6; }
          93% { transform: translate(2px, 0); opacity: 0.6; }
        }

        /* Scanline overlay */
        .scanlines::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
          z-index: 1000;
        }

        /* Noise overlay */
        .noise-overlay::before {
          content: '';
          position: fixed;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
          z-index: 999;
          animation: noise-shift 0.5s steps(1) infinite;
        }
        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-5%, -5%); }
          50% { transform: translate(5%, 0); }
          75% { transform: translate(0, 5%); }
          100% { transform: translate(-5%, 5%); }
        }

        /* Skill card */
        .skill-card {
          transition: transform 0.15s ease, border-color 0.15s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px) skewX(-1deg);
          border-color: rgba(0,255,200,0.4);
        }

        /* Project card */
        .project-card {
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,255,200,0.3);
          box-shadow: 0 20px 60px rgba(0,255,200,0.08), 0 0 0 1px rgba(0,255,200,0.1);
        }

        /* Nav active */
        .nav-active {
          color: var(--acid) !important;
          position: relative;
        }
        .nav-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--acid);
        }

        /* Marquee */
        .marquee-track {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Fade up */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fade-up 0.6s ease forwards; }
        .anim-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .anim-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .anim-delay-3 { animation-delay: 0.35s; opacity: 0; }
        .anim-delay-4 { animation-delay: 0.5s; opacity: 0; }

        /* Blink cursor */
        .blink::after {
          content: '_';
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* CRT flicker */
        @keyframes crt-flicker {
          0%, 97%, 100% { opacity: 1; }
          98% { opacity: 0.8; }
          99% { opacity: 1; }
        }
        .crt-flicker { animation: crt-flicker 6s infinite; }

        /* Stat number */
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          line-height: 1;
          color: var(--acid);
          text-shadow: 0 0 20px rgba(0,255,200,0.5);
        }

        /* Stripe diagonal bg */
        .stripe-bg {
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(0,255,200,0.015) 8px,
            rgba(0,255,200,0.015) 16px
          );
        }

        /* Profile image container */
        .profile-container {
          position: relative;
          width: 180px;
          height: 180px;
        }
        .profile-container::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, var(--acid), var(--pink), var(--yellow), var(--acid));
          background-size: 300% 300%;
          animation: gradient-border-spin 3s linear infinite;
          clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
        }
        .profile-container::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: #030303;
          clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
          z-index: 1;
        }
        @keyframes gradient-border-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .profile-img {
          position: absolute;
          inset: 5px;
          z-index: 2;
          object-fit: cover;
          clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
        }

        /* Section number */
        .section-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 8rem;
          line-height: 1;
          color: rgba(255,255,255,0.02);
          position: absolute;
          right: 0;
          top: -1rem;
          pointer-events: none;
          user-select: none;
        }

        /* Diagonal divider */
        .diagonal-divider {
          height: 60px;
          background: #030303;
          clip-path: polygon(0 0, 100% 100%, 0 100%);
        }
      `}</style>

      {/* Overlays */}
      <div className="scanlines noise-overlay pointer-events-none" />

      {/* Canvas Grid Background */}
      <ParticleBackground />

      {/* Ambient colored blobs — very subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #00ffc8 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)' }} />
      </div>

      {/* ====== NAVBAR ====== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 border-b border-white/5' : 'bg-transparent'
      }`}>
        {/* Top accent bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-acid to-transparent" />
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="font-display text-xl tracking-widest text-white flex items-center gap-2">
            <span className="text-acid">[</span>
            <span>GSS<span className="text-acid">.</span>DEV</span>
            <span className="text-acid">]</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}
                className={`text-xs font-mono uppercase tracking-widest transition-colors duration-200 hover:text-acid ${
                  activeSection === link.id ? 'nav-active text-acid' : 'text-white/40'
                }`}>
                {link.title}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-2 text-white/40 hover:text-acid transition-colors font-mono text-xs" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/5">
            <nav className="flex flex-col items-center gap-0 py-4">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-center py-3 text-xs font-mono uppercase tracking-widest border-b border-white/5 transition-colors duration-200 ${
                    activeSection === link.id ? 'text-acid' : 'text-white/40 hover:text-white'
                  }`}>
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* ====== HOME SECTION ====== */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 py-24 relative overflow-hidden">

          {/* Large decorative text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="font-display text-[25vw] text-white/[0.015] leading-none select-none whitespace-nowrap">
              SURYA
            </div>
          </div>

          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: Text */}
              <div>
                {/* Status badge */}
                <div className="anim-fade-up anim-delay-1 inline-flex items-center gap-2 mb-8 border border-acid/30 bg-acid/5 px-4 py-2">
                  <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] text-acid uppercase tracking-[0.4em]">Available for Opportunities</span>
                </div>

                <div className="anim-fade-up anim-delay-2 mb-6">
                  <span className="font-mono text-xs text-white/30 tracking-widest">Hello World, I'm</span>
                  <span
                    className="hero-name-glitch block mt-1"
                    data-text={portfolioData.name}
                  >
                    {portfolioData.name}
                  </span>
                </div>

                <p className="anim-fade-up anim-delay-3 font-mono text-sm text-white/40 mb-10 leading-loose max-w-md">
                  <span className="text-acid">›</span> {portfolioData.tagline}
                </p>

                {/* CTA buttons */}
                <div className="anim-fade-up anim-delay-4 flex flex-wrap gap-3 mb-10">
                  <a href={portfolioData.resumeUrl} download
                    className="group inline-flex items-center gap-2 bg-acid text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-white transition-colors duration-150">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Resume
                  </a>
                  <a href="#contact"
                    className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-acid hover:text-acid transition-all duration-150">
                    Get In Touch
                    <span className="text-acid">→</span>
                  </a>
                </div>

                {/* Social icons */}
                <div className="anim-fade-up anim-delay-4 flex gap-2">
                  {[
                    { href: portfolioData.socials.linkedin, label: 'LI', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { href: portfolioData.socials.github, label: 'GH', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                    { href: `mailto:${portfolioData.contactEmail}`, label: 'ML', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="group relative w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-acid hover:border-acid/50 transition-all duration-150">
                      <span className="absolute inset-0 bg-acid/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Profile + floating stats */}
              <div className="flex flex-col items-center lg:items-end gap-8">
                {/* Profile image */}
                <div className="relative">
                  {/* Floating accent squares */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border border-acid/40 rotate-12 animate-pulse" />
                  <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-500/20 border border-pink-500/40 -rotate-12" />
                  <div className="absolute top-1/2 -right-8 w-3 h-3 bg-acid/40 rotate-45" />

                  <div className="profile-container">
                    <img
                      className="profile-img"
                      src="/profile.png"
                      alt="G S S Surya Prakash"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = 'https://placehold.co/180x180/030303/00ffc8?text=SURYA';
                      }}
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 w-full max-w-xs">
                  {[
                    { label: 'CGPA', value: '8.73' },
                    { label: 'Projects', value: '6+' },
                    { label: 'Internships', value: '1' },
                    { label: 'Clubs', value: '2+' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-black text-center stripe-bg group hover:bg-acid/5 transition-colors duration-200">
                      <div className="stat-num">{stat.value}</div>
                      <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling marquee */}
          <div className="absolute bottom-0 left-0 right-0 py-3 border-t border-white/5 bg-black/50 overflow-hidden">
            <div className="flex whitespace-nowrap">
              <div className="marquee-track flex gap-8 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                {Array(10).fill(['FULL STACK DEV', '◆', 'AI ENTHUSIAST', '◆', 'CSE UNDERGRAD', '◆', 'OPEN TO WORK', '◆']).flat().map((item, i) => (
                  <span key={i} className={item === '◆' ? 'text-acid/40' : ''}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== ABOUT SECTION ====== */}
        <section id="about" className="py-28 px-6 relative">
          <div className="absolute right-0 top-0 section-number">02</div>
          <div className="container mx-auto max-w-5xl">
            <SectionTitle>About Me</SectionTitle>

            <div className="grid lg:grid-cols-5 gap-0 border border-white/10">
              {/* Left panel */}
              <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-white/10 p-8 bg-white/[0.01] stripe-bg flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-white/30 mb-4 flex items-center gap-2">
                    <span className="text-acid">●</span> about.md
                  </div>
                  <div className="font-mono text-xs text-white/20 mb-8 space-y-1">
                    <p>name: <span className="text-acid/60">Surya Prakash</span></p>
                    <p>role: <span className="text-acid/60">CSE Student</span></p>
                    <p>uni: <span className="text-acid/60">PES University</span></p>
                    <p>cgpa: <span className="text-acid/60">8.73</span></p>
                    <p>status: <span className="text-green-400/60">open_to_work: true</span></p>
                  </div>
                </div>

                {/* Vertical "skills" label */}
                <div className="hidden lg:flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">BLR, KA</span>
                </div>
              </div>

              {/* Right panel */}
              <div className="lg:col-span-3 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-acid/20 to-transparent" />
                <p className="font-mono text-sm text-white/50 leading-loose mb-8">
                  {portfolioData.bio}
                </p>

                <div className="grid grid-cols-3 gap-px bg-white/5">
                  {[
                    { label: 'CGPA', value: '8.73' },
                    { label: 'Projects', value: '6+' },
                    { label: 'Clubs', value: '2+' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-black text-center">
                      <div className="stat-num text-2xl">{s.value}</div>
                      <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SKILLS SECTION ====== */}
        <section id="skills" className="py-28 px-6 relative">
          <div className="absolute right-0 top-0 section-number">03</div>
          <div className="container mx-auto max-w-6xl relative">
            <SectionTitle>My Tech Stack</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-px bg-white/5 border border-white/5">
              {portfolioData.skills.map(skill => (
                <div key={skill.name} className="bg-black">
                  <SkillIcon {...skill} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== EXPERIENCE SECTION ====== */}
        <section id="experience" className="py-28 px-6 relative">
          <div className="absolute right-0 top-0 section-number">04</div>
          <div className="container mx-auto max-w-4xl">
            <SectionTitle>Education & Experience</SectionTitle>
            <div className="relative">
              {portfolioData.experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  experience={experience}
                  index={index}
                  total={portfolioData.experiences.length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECTS SECTION ====== */}
        <section id="projects" className="py-28 px-6 relative">
          <div className="absolute right-0 top-0 section-number">05</div>
          <div className="container mx-auto max-w-6xl relative">
            <SectionTitle>Featured Projects</SectionTitle>

            {/* Projects count */}
            <div className="flex items-center gap-4 mb-8 -mt-10">
              <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{portfolioData.projects.length} projects found</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-black">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CONTACT SECTION ====== */}
        <section id="contact" className="py-28 px-6 relative">
          <div className="absolute right-0 top-0 section-number">06</div>
          <div className="container mx-auto max-w-3xl">
            <SectionTitle>Connect With Me</SectionTitle>

            <div className="border border-white/10 bg-black overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-3 font-mono text-xs text-white/20">contact@gss.dev — bash</span>
              </div>

              <div className="p-8">
                <div className="font-mono text-xs text-white/30 mb-6">
                  <span className="text-acid">$</span> cat contact.json <span className="blink" />
                </div>

                <div className="grid sm:grid-cols-2 gap-px bg-white/5 mb-8">
                  <div className="bg-black">
                    <ContactCard
                      icon={<svg className="w-4 h-4 text-acid" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                      label="Location"
                      value={portfolioData.location}
                    />
                  </div>
                  <div className="bg-black">
                    <ContactCard
                      icon={<svg className="w-4 h-4 text-acid" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      label="Email"
                      value={<a href={`mailto:${portfolioData.contactEmail}`} className="hover:text-acid transition-colors">{portfolioData.contactEmail}</a>}
                    />
                  </div>
                  <div className="bg-black">
                    <ContactCard
                      icon={<svg className="w-4 h-4 text-acid" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                      label="Phone"
                      value={portfolioData.phone}
                    />
                  </div>
                  <div className="bg-black">
                    <ContactCard
                      icon={<svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      label="Status"
                      value={<span className="text-green-400 font-bold">Open to Opportunities</span>}
                    />
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { href: portfolioData.socials.github, label: 'GitHub', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                    { href: portfolioData.socials.linkedin, label: 'LinkedIn', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { href: `mailto:${portfolioData.contactEmail}`, label: 'Email', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                    { href: `tel:${portfolioData.phone}`, label: 'Phone', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs text-white/40 hover:text-acid hover:border-acid/40 transition-all duration-150">
                      {s.icon}
                      <span className="uppercase tracking-widest text-[9px]">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 border-t border-white/5 bg-black">
        <div className="h-px bg-gradient-to-r from-transparent via-acid/30 to-transparent" />
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            © {new Date().getFullYear()} <span className="text-white/40">{portfolioData.name}</span>
          </p>
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            React · TypeScript · Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-10 h-10 border border-white/20 bg-black text-white/40 hover:text-acid hover:border-acid/50 transition-all duration-150 z-40 flex items-center justify-center font-mono text-xs"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
