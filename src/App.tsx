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

// --- Particle Canvas Background ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
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

// --- Section Title ---
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-center mb-16 relative">
    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent inline-block">
      {children}
    </h2>
    <div className="mt-4 flex items-center justify-center gap-3">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500" />
    </div>
  </div>
);

// --- Glowing Card Wrapper ---
const GlowCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-40 blur transition-all duration-500" />
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/60 h-full">
      {children}
    </div>
  </div>
);

// --- Skill Icon ---
const SkillIcon: React.FC<Skill> = ({ icon, name }) => (
  <div className="relative group flex flex-col items-center gap-3 p-5 bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 cursor-default overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] relative z-10">
      {icon}
    </div>
    <span className="text-xs font-semibold text-gray-400 group-hover:text-cyan-300 transition-colors duration-300 relative z-10 tracking-wider uppercase">{name}</span>
  </div>
);

// --- Project Card ---
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div
    className="group bg-gray-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 flex flex-col"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Card header graphic area */}
    <div className="relative flex items-center justify-center h-44 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-sm" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-sm" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-sm" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40 rounded-br-sm" />
      {/* Icon */}
      <div className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
        {project.icon}
      </div>
    </div>

    {/* Divider with glow */}
    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors duration-300 tracking-tight">{project.title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium bg-gray-800/80 text-cyan-300/80 px-2.5 py-0.5 rounded-full border border-cyan-500/20 tracking-wide">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold px-4 py-2.5 rounded-lg border border-gray-600/50 hover:border-cyan-500/40 transition-all duration-300">
            Source Code
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- Experience Card (Timeline style) ---
const ExperienceCard: React.FC<{ experience: Experience; index: number; total: number }> = ({ experience, index, total }) => (
  <div className="relative flex gap-6">
    {/* Timeline line & dot */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] z-10 mt-6" />
      {index < total - 1 && (
        <div className="flex-1 w-px bg-gradient-to-b from-cyan-500/60 to-transparent mt-1" style={{ minHeight: '40px' }} />
      )}
    </div>

    {/* Card */}
    <div className="flex-1 mb-8 group bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/40 transition-all duration-400 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-3">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1">{experience.title}</h3>
            <p className="text-cyan-400 font-semibold">{experience.company}</p>
          </div>
          <div className="flex flex-col lg:items-end gap-2">
            <span className="text-gray-400 text-sm font-medium bg-gray-800/60 px-3 py-1 rounded-full border border-gray-700/50">{experience.period}</span>
            <span className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/20">
              {experience.type}
            </span>
          </div>
        </div>

        <ul className="text-gray-300 mb-5 space-y-3">
          {experience.description.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1 text-xs flex-shrink-0">◆</span>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <span key={i} className="text-xs bg-gray-800/80 text-gray-300 px-3 py-1 rounded-full border border-gray-700/50">
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
  <div className="flex items-center gap-4 p-5 bg-gray-900/60 rounded-xl border border-gray-700/50 hover:border-cyan-500/40 hover:bg-gray-800/60 transition-all duration-300 group">
    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300 flex-shrink-0">
      {icon}
    </div>
    <div className="text-left min-w-0">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</p>
      <div className="text-gray-200 font-medium text-sm truncate">{value}</div>
    </div>
  </div>
);

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

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
      { name: "Python", icon: <SiPython color="#3776AB" size={48} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={48} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={48} /> },
      {
        name: "RASA",
        icon: (
          <img
            src="/rasa.jpg"
            alt="RASA"
            className="w-12 h-12"
          />
        ),
      },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={48} /> },
      { name: "Express", icon: <SiExpress color="#ffffff" size={48} /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={48} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={48} /> },
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={48} /> },
      { name: "CSS3", icon: <SiCss color="#1572B6" size={48} /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" size={48} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={48} /> },
      { name: "C", icon: <SiC color="#00599C" size={48} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={48} /> },
      { name: "GitHub", icon: <SiGithub color="#ffffff" size={48} /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={48} /> },
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <circle cx="12" cy="5" r="2" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="5" cy="19" r="2" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="19" cy="19" r="2" stroke="#22d3ee" strokeWidth="2" />
            <path
              d="M12 7V12M12 12L6 17M12 12L18 17"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <rect x="9" y="9" width="6" height="6" rx="1" stroke="#22d3ee" strokeWidth="1.8" />
            <rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="12" y1="6" x2="12" y2="9" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="6" y1="12" x2="9" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="18" y1="12" x2="15" y2="12" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="12" y1="18" x2="12" y2="15" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 11.5h.5l.5-1 .5 2 .5-1H5.5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <path
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              stroke="#22d3ee"
              strokeWidth="1.2"
              fill="none"
            />
            <path d="M8 17v-4M12 17v-6M16 17v-4" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11" r="1.5" fill="#22d3ee" />
            <circle cx="12" cy="9" r="1.5" fill="#22d3ee" />
            <circle cx="16" cy="11" r="1.5" fill="#22d3ee" />
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <rect x="3" y="12" width="3" height="9" rx="1" stroke="#22d3ee" strokeWidth="1.8" />
            <rect x="8" y="8" width="3" height="13" rx="1" stroke="#22d3ee" strokeWidth="1.8" />
            <rect x="13" y="5" width="3" height="16" rx="1" stroke="#22d3ee" strokeWidth="1.8" />
            <rect x="18" y="9" width="3" height="12" rx="1" stroke="#22d3ee" strokeWidth="1.8" />
            <path
              d="M4.5 11L9.5 7L14.5 4L19.5 8"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 1"
            />
            <circle cx="19" cy="4" r="2.5" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M19 2.5V3M19 5V5.5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M17.8 3.8h1.5a.7.7 0 0 1 0 1.4H17.8" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <path
              d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z"
              stroke="#22d3ee"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M9 12h6M9 14.5h4"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 6v1M10.5 7.5l.7.7M13.5 7.5l-.7.7"
              stroke="#22d3ee"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M9 20l1.5-2.5L12 20M12 20l1.5-2.5L15 20"
              stroke="#22d3ee"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <circle cx="12" cy="10" r="4" stroke="#22d3ee" strokeWidth="2" />
            <path
              d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 19H19M7 21H17"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
            />
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
    <div className="bg-[#040d14] text-white font-sans leading-relaxed min-h-screen">

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * { font-family: 'Space Grotesk', sans-serif; }
        code, .mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float 6s ease-in-out infinite 2s; }
        .animate-float-delay2 { animation: float 6s ease-in-out infinite 4s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
        .animate-fade-up-delay { animation: fade-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-up-delay2 { animation: fade-up 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-up-delay3 { animation: fade-up 0.8s ease-out 0.6s forwards; opacity: 0; }

        .shimmer-text {
          background: linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa, #22d3ee);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .gradient-border {
          position: relative;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6);
          border-radius: inherit;
          z-index: -1;
        }
        .hex-bg {
          background-image: radial-gradient(rgba(34,211,238,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .scanline-overlay::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(transparent, rgba(34,211,238,0.1), transparent);
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }
        .glow-cyan { box-shadow: 0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1); }
        .text-glow { text-shadow: 0 0 20px rgba(34,211,238,0.5); }
      `}</style>

      {/* Particle Canvas */}
      <ParticleBackground />

      {/* Ambient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] bg-blue-600/4 rounded-full blur-[120px] animate-float-delay" />
        <div className="absolute -bottom-60 right-1/3 w-[500px] h-[500px] bg-violet-600/4 rounded-full blur-[120px] animate-float-delay2" />
      </div>

      {/* ====== NAVBAR ====== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-bold tracking-tight">
            <span className="shimmer-text">GSS Surya Prakash</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                {link.title}
                {activeSection === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,1)]" />
                )}
              </a>
            ))}
          </nav>
          <button className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/98 backdrop-blur-xl border-t border-gray-800/50">
            <nav className="flex flex-col items-center gap-2 py-6 px-4">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-center py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
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
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative overflow-hidden">
          {/* Decorative ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] border border-cyan-500/5 rounded-full animate-spin-slow" />
            <div className="absolute w-[800px] h-[800px] border border-blue-500/4 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
          </div>

          {/* Profile image */}
          <div className="relative mb-8 animate-fade-up">
            <div className="relative w-48 h-48 mx-auto">
              {/* Rotating gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 animate-spin-slow p-0.5">
                <div className="w-full h-full rounded-full bg-gray-950" />
              </div>
              <img
                className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover shadow-2xl"
                src="/profile.png"
                alt="G S S Surya Prakash"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = 'https://placehold.co/192x192/0d1117/22d3ee?text=Surya';
                }}
              />
              {/* Online dot */}
              <div className="absolute bottom-2 right-2 z-20">
                <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-gray-950">
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                </div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="animate-fade-up-delay">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              Available for Opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-up-delay">
            Hi, I'm{' '}
            <span className="shimmer-text">{portfolioData.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed animate-fade-up-delay2">
            {portfolioData.tagline}
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mb-10 animate-fade-up-delay2">
            {[
              {
                href: portfolioData.socials.linkedin,
                icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              },
              {
                href: portfolioData.socials.github,
                icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              },
              {
                href: `mailto:${portfolioData.contactEmail}`,
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-900/80 border border-gray-700/60 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-110">
                {social.icon}
              </a>
            ))}
          </div>

          <a href={portfolioData.resumeUrl} download
            className="relative group animate-fade-up-delay3 inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Resume
            </div>
          </a>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </section>

        {/* ====== ABOUT SECTION ====== */}
        <section id="about" className="py-28 px-6">
          <div className="container mx-auto max-w-5xl">
            <SectionTitle>About Me</SectionTitle>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-violet-600/20 rounded-2xl blur-xl" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Top decorative bar */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
                <div className="p-10 md:p-14">
                  {/* Terminal-style header */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-3 text-gray-600 text-xs mono">~/about.md</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">{portfolioData.bio}</p>

                  {/* Stats row */}
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'CGPA', value: '8.73' },
                      { label: 'Projects', value: '6+' },
                      { label: 'Internships', value: '1' },
                      { label: 'Clubs', value: '2+' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/40 hover:border-cyan-500/30 transition-colors duration-300">
                        <div className="text-2xl font-extrabold text-cyan-400 text-glow">{stat.value}</div>
                        <div className="text-xs text-gray-500 font-semibold tracking-widest uppercase mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SKILLS SECTION ====== */}
        <section id="skills" className="py-28 px-6 relative">
          {/* Subtle hex background */}
          <div className="absolute inset-0 hex-bg opacity-50 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <SectionTitle>My Tech Stack</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {portfolioData.skills.map(skill => <SkillIcon key={skill.name} {...skill} />)}
            </div>
          </div>
        </section>

        {/* ====== EXPERIENCE SECTION ====== */}
        <section id="experience" className="py-28 px-6">
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
          <div className="absolute inset-0 hex-bg opacity-30 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ====== CONTACT SECTION ====== */}
        <section id="contact" className="py-28 px-6">
          <div className="container mx-auto max-w-3xl">
            <SectionTitle>Connect With Me</SectionTitle>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/15 via-blue-600/15 to-violet-600/15 rounded-2xl blur-xl" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
                <div className="p-8 md:p-12">

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <ContactCard
                      icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                      label="Location"
                      value={portfolioData.location}
                    />
                    <ContactCard
                      icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      label="Email"
                      value={<a href={`mailto:${portfolioData.contactEmail}`} className="hover:text-cyan-400 transition-colors">{portfolioData.contactEmail}</a>}
                    />
                    <ContactCard
                      icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                      label="Phone"
                      value={portfolioData.phone}
                    />
                    <ContactCard
                      icon={<svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      label="Status"
                      value={<span className="text-green-400 font-semibold">Open to Opportunities</span>}
                    />
                  </div>

                  {/* Social links */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-gray-800/60">
                    {[
                      { href: portfolioData.socials.github, label: 'GitHub', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                      { href: portfolioData.socials.linkedin, label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                      { href: `mailto:${portfolioData.contactEmail}`, label: 'Email', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                      { href: `tel:${portfolioData.phone}`, label: 'Phone', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
                    ].map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                        className="w-12 h-12 bg-gray-800/60 border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-110">
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 border-t border-gray-800/60 bg-gray-950/60 backdrop-blur-sm">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="container mx-auto px-6 py-10 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-gray-400 font-medium">{portfolioData.name}</span>. All Rights Reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2 tracking-wide">
            Built with React · TypeScript · Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-11 h-11 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center group"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default App;
