import React, { useState, useEffect, useRef } from 'react';
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase
} from "react-icons/si";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */
interface Skill      { name: string; icon: React.ReactNode; }
interface Project    { title: string; description: string; icon: React.ReactNode; tags: string[]; liveUrl?: string; repoUrl?: string; }
interface Experience { title: string; company: string; period: string; type: string; description: string[]; technologies: string[]; }

/* ─────────────────────────────────────────────────────────────────────────────
   CURSOR TRAIL
───────────────────────────────────────────────────────────────────────────── */
const CursorTrail: React.FC = () => {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const id = counter.current++;
      setTrails(t => [...t.slice(-16), { x: e.clientX, y: e.clientY, id }]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((t, i) => (
        <div key={t.id} className="absolute rounded-full"
          style={{
            left: t.x - 4, top: t.y - 4, width: 8, height: 8,
            background: `rgba(74,222,128,${(i / trails.length) * 0.45})`,
            transform: `scale(${i / trails.length})`,
            boxShadow: `0 0 6px rgba(74,222,128,${(i / trails.length) * 0.35})`,
          }} />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   NOISE + SCANLINES
───────────────────────────────────────────────────────────────────────────── */
const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.025]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }} />
);

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────────────────────── */
const AnimCounter: React.FC<{ value: string; suffix?: string; label: string }> = ({ value, suffix = '', label }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const end = parseFloat(value);
      const dur = 1400;
      const step = (ts: number, start: number) => {
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = end * eased;
        setDisplay(value.includes('.') ? cur.toFixed(2) : Math.floor(cur).toString());
        if (p < 1) requestAnimationFrame(ts2 => step(ts2, start));
      };
      requestAnimationFrame(ts => step(ts, ts));
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="group relative p-7 border border-green-900/40 hover:border-green-500/50 transition-all duration-400 cursor-default overflow-hidden">
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/[0.04] transition-colors duration-400" />
      {/* corner brackets */}
      {[['top-0 left-0','border-t border-l'],['top-0 right-0','border-t border-r'],['bottom-0 left-0','border-b border-l'],['bottom-0 right-0','border-b border-r']].map(([pos, border], i) => (
        <div key={i} className={`absolute ${pos} w-3 h-3 ${border} border-green-500/60`} />
      ))}
      <div className="text-5xl font-black text-green-400 leading-none group-hover:text-green-300 transition-colors duration-300"
        style={{ fontFamily: "'Orbitron', monospace" }}>
        {display}<span className="text-green-600/80 text-3xl">{suffix}</span>
      </div>
      <div className="text-sm font-semibold tracking-widest text-gray-500 uppercase mt-3 group-hover:text-gray-300 transition-colors duration-300"
        style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.2em' }}>
        {label}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SKILL CHIP
───────────────────────────────────────────────────────────────────────────── */
const SkillChip: React.FC<Skill & { index: number }> = ({ icon, name, index }) => (
  <div className="group relative flex items-center gap-3 px-5 py-4 border-r border-b border-gray-800/60 hover:border-green-500/40 transition-all duration-300 cursor-default overflow-hidden"
    style={{ animationDelay: `${index * 35}ms` }}>
    <div className="absolute inset-0 translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-green-500/8 to-transparent" />
    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.7)] transition-all duration-300">
      {icon}
    </div>
    <span className="text-sm font-semibold text-gray-400 group-hover:text-green-300 transition-colors duration-300 relative z-10"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}>
      {name}
    </span>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 6px rgba(74,222,128,1)' }} />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────────────────────── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div className="group relative flex flex-col border border-gray-800/60 hover:border-green-500/40 transition-all duration-400 overflow-hidden bg-[#050a05]"
    style={{ transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease' }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(74,222,128,0.07)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}>

    {/* top accent line */}
    <div className="h-px bg-gradient-to-r from-green-500 via-amber-400/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-600" />

    {/* icon area */}
    <div className="relative h-40 flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(rgba(74,222,128,0.035) 1px, transparent 1px)', backgroundSize: '20px 20px', background: '#030803' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* big index number behind icon */}
      <span className="absolute right-4 bottom-2 text-7xl font-black text-gray-900/60 group-hover:text-gray-800/70 select-none leading-none transition-colors"
        style={{ fontFamily: "'Orbitron', monospace" }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(74,222,128,0.55)]">
        {project.icon}
      </div>
    </div>

    {/* body */}
    <div className="flex flex-col flex-1 p-6">
      <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors duration-300 mb-3 leading-snug"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-300 transition-colors duration-300"
        style={{ fontFamily: "'Syne', sans-serif", lineHeight: '1.75' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/20 px-2.5 py-1 rounded-sm font-medium"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm py-2.5 bg-green-500/10 border border-green-500/40 text-green-400 hover:bg-green-500/20 hover:text-green-300 transition-all duration-200 font-semibold"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            ▶ Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm py-2.5 bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200 font-semibold"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            {'</>'}  Source Code
          </a>
        )}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   EXPERIENCE ACCORDION
───────────────────────────────────────────────────────────────────────────── */
const ExpEntry: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className={`border-b transition-all duration-300 ${open ? 'border-green-500/20' : 'border-gray-900'}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-6 px-4 group text-left hover:bg-green-500/[0.025] transition-colors duration-200 gap-4">
        <div className="flex items-start gap-5 flex-1 min-w-0">
          <span className="text-xs text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0 mt-1 font-mono"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <p className="text-base font-bold text-white group-hover:text-green-300 transition-colors leading-snug"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {exp.title}
            </p>
            <p className="text-sm text-gray-500 mt-1.5 group-hover:text-amber-500/80 transition-colors"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {exp.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
          <div className="hidden sm:flex flex-col items-end gap-1.5">
            <span className="text-xs text-gray-600" style={{ fontFamily: "'Share Tech Mono', monospace" }}>{exp.period}</span>
            <span className="text-xs border border-amber-500/30 text-amber-500/70 px-2 py-0.5 hidden md:block" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              {exp.type.toUpperCase()}
            </span>
          </div>
          <span className={`text-green-500 text-2xl font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-7 pl-[52px] border-l-2 border-green-500/25 ml-4 mb-2">
          {exp.description.map((d, i) => (
            <p key={i} className="text-gray-300 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Syne', sans-serif", lineHeight: '1.85' }}>
              {d}
            </p>
          ))}
          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-900">
              {exp.technologies.map((t, i) => (
                <span key={i} className="text-xs text-green-500/80 border border-green-900/60 px-2.5 py-1 font-medium"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────────────────────────────────────── */
const SectionHeading: React.FC<{ num: string; title: string; accent: string }> = ({ num, title, accent }) => (
  <div className="flex items-center gap-5 mb-16">
    <span className="text-xs text-green-700/80 font-mono" style={{ fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.3em' }}>{num}</span>
    <div className="h-px w-16 bg-green-900/60" />
    <h2 className="text-3xl md:text-5xl font-black text-white leading-none" style={{ fontFamily: "'Orbitron', monospace", letterSpacing: '-0.01em' }}>
      {title}<span className="text-green-400">{accent}</span>
    </h2>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   GLITCH TEXT (hover only)
───────────────────────────────────────────────────────────────────────────── */
const GlitchText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <span className={`glitch-wrap ${className}`} data-text={children}>
    <span>{children}</span>
  </span>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderVis(window.scrollY > 60);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const mid = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── DATA ──────────────────────────────────────────────────────────────── */
  const portfolioData = {
    name: "Gonella Siva Sai Surya Prakash",
    tagline: "CSE Undergrad & AI Enthusiast · Exploring the Future of Technology",
    bio: "I'm a passionate Computer Science Engineering student at PES University, Bengaluru, with a strong foundation in full-stack development and emerging technologies. Currently in my third year, I've built expertise across modern web technologies, machine learning, and cloud computing through both academic projects and self-directed learning.\n\nMy journey in tech started with curiosity about how applications work behind the scenes — which led me to explore everything from responsive front-end interfaces to robust backend architectures. I thrive in collaborative, agile environments and am particularly interested in the intersection of AI and web development.",
    contactEmail: "gonellasurya2005@gmail.com",
    phone: "+91 9880410689",
    location: "Bengaluru, Karnataka, India",
    resumeUrl: "/GonellaSuryaPrakash_Resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
      github: "https://github.com/GSuryaP",
    },
    skills: [
      { name: "Python",     icon: <SiPython     color="#3776AB" size={28} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={28} /> },
      { name: "React",      icon: <SiReact      color="#61DAFB" size={28} /> },
      { name: "RASA",       icon: <img src="/rasa.jpg" alt="RASA" style={{ width: 28, height: 28 }} /> },
      { name: "Node.js",    icon: <SiNodedotjs  color="#339933" size={28} /> },
      { name: "Express",    icon: <SiExpress    color="#cccccc" size={28} /> },
      { name: "MongoDB",    icon: <SiMongodb    color="#47A248" size={28} /> },
      { name: "MySQL",      icon: <SiMysql      color="#4479A1" size={28} /> },
      { name: "HTML5",      icon: <SiHtml5      color="#E34F26" size={28} /> },
      { name: "CSS3",       icon: <SiCss       color="#1572B6" size={28} /> },
      { name: "Tailwind",   icon: <SiTailwindcss color="#06B6D4" size={28} /> },
      { name: "C++",        icon: <SiCplusplus  color="#00599C" size={28} /> },
      { name: "C",          icon: <SiC          color="#6699cc" size={28} /> },
      { name: "Git",        icon: <SiGit        color="#F05032" size={28} /> },
      { name: "GitHub",     icon: <SiGithub     color="#cccccc" size={28} /> },
      { name: "Firebase",   icon: <SiFirebase   color="#FFCA28" size={28} /> },
    ],
    experiences: [
      {
        title: "Computer Science Engineering Student",
        company: "PES University, Bengaluru",
        period: "2023 – Present",
        type: "Education",
        description: [
          "Pursuing a B.Tech in Computer Science and Engineering, maintaining a CGPA of 8.61 through my 6th semester. Awarded the Prof. CNR Scholarship for the 1st, 3rd, and 4th semesters — given to the top 20% of the batch.",
          "Actively involved in campus life as a member of multiple technical and non-technical clubs, participating in hackathons and collaborative engineering projects.",
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
      },
      {
        title: "Research Intern",
        company: "Center of Computer Networks & CyberSecurity (CCNCS)",
        period: "June 2025 – July 2025",
        type: "Summer Internship",
        description: [
          "Designed and built an intelligent SDN management system integrating the ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI agent.",
          "The system enables real-time network monitoring, automated flow control, and fault detection through REST APIs, with a live visualization dashboard for operator insights.",
        ],
        technologies: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"],
      },
      {
        title: "Logistics Head",
        company: "Equinox – The Space Club, PESU ECC",
        period: "May 2025 – Present",
        type: "Club Lead",
        description: [
          "Oversee event planning and resource coordination for workshops, hackathons, and club activities. Responsible for scheduling, team management, and ensuring smooth execution of all logistical operations.",
        ],
        technologies: [],
      },
      {
        title: "Social Media & Content Creator Head",
        company: "Equinox – The Space Club, PESU ECC",
        period: "Sep 2024 – May 2025",
        type: "Club Lead",
        description: [
          "Led digital outreach by designing visual content, managing multi-platform social media campaigns, and building community engagement around space-tech events and club initiatives.",
        ],
        technologies: [],
      },
    ] as Experience[],
    projects: [
      {
        title: "RASA-Driven SDN Management Tool",
        description: "A conversational AI assistant for real-time monitoring, health checks, and fault detection of distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet with custom RASA actions for automated flow queries and troubleshooting.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><circle cx="12" cy="5" r="2" stroke="#4ade80" strokeWidth="2"/><circle cx="5" cy="19" r="2" stroke="#4ade80" strokeWidth="2"/><circle cx="19" cy="19" r="2" stroke="#4ade80" strokeWidth="2"/><path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
        repoUrl: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
      },
      {
        title: "Distributed Image Processing Pipeline",
        description: "Apache Kafka-based distributed image processing system with a FastAPI master node and multiple PIL worker nodes. Handles tile splitting, parallel processing, result aggregation, and final image reconstruction — with a live heartbeat monitoring dashboard.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><rect x="9" y="9" width="6" height="6" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="9" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="6" y1="12" x2="9" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="18" y1="12" x2="15" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="12" y1="18" x2="12" y2="15" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>,
        tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker", "Distributed Systems"],
        repoUrl: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
      },
      {
        title: "GitHub Repository Tracker",
        description: "Interactive dashboard for tracking GitHub repos, users, commits, and open issues in real time. Features live search, stats overview, aurora-style animated background, and quick-access tools — powered by a Node.js API and Python sync script.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="#4ade80" strokeWidth="1.2" fill="none"/></svg>,
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
        repoUrl: "https://github.com/GSuryaP/Github-Repository-Tracker",
      },
      {
        title: "Personal Finance Analytics Dashboard",
        description: "FinTech dashboard built with React and Tailwind CSS for real-time personal transaction management. Full CRUD, dynamic Recharts visualizations (line & pie charts), dark/light mode toggle, real-time search, and auto-calculated savings metrics.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><rect x="3" y="12" width="3" height="9" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="8" y="8" width="3" height="13" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="13" y="5" width="3" height="16" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="18" y="9" width="3" height="12" rx="1" stroke="#4ade80" strokeWidth="1.8"/><path d="M4.5 11L9.5 7L14.5 4L19.5 8" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1"/></svg>,
        tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
        repoUrl: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
      },
      {
        title: "AdaptiveLearn AI",
        description: "AWS-powered teacher analytics dashboard. Reads student scores from S3 CSV files via a Python Lambda function, uses Amazon Bedrock (Titan LLM) to generate actionable insights, and surfaces weak topics and struggling students through a clean HTML frontend — no server required.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#4ade80" strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 14.5h4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>,
        tags: ["AWS S3", "AWS Lambda", "Amazon Bedrock", "Python", "HTML"],
        repoUrl: "https://github.com/GSuryaP/AdaptiveLearn-AI",
      },
      {
        title: "Weather & AQI Tracker",
        description: "Tkinter desktop application that validates city names via the OpenWeatherMap API and displays comprehensive environmental data — including Air Quality Index, temperature, humidity, and wind speed — in a clean, user-friendly GUI with robust error handling.",
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><circle cx="12" cy="10" r="4" stroke="#4ade80" strokeWidth="2"/><path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/><path d="M5 19H19M7 21H17" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>,
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

  /* ── RENDER ────────────────────────────────────────────────────────────── */
  return (
    <div className="bg-[#030603] text-white min-h-screen overflow-x-hidden" style={{ cursor: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Syne:wght@400;500;600;700;800&display=swap');

        * { cursor: none !important; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #030603; }

        /* ── scrollbar ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030603; }
        ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 2px; }

        /* ── keyframes ── */
        @keyframes marquee       { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin-cw       { to{transform:rotate(360deg)} }
        @keyframes spin-ccw      { to{transform:rotate(-360deg)} }
        @keyframes scanline-move { 0%{top:-5%} 100%{top:105%} }
        @keyframes slide-left    { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slide-right   { from{opacity:0;transform:translateX(48px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes fade-up       { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes crt-flicker   { 0%,97%,100%{opacity:1} 98%{opacity:.85} 99%{opacity:1} }
        @keyframes pulse-green   { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.4)} 70%{box-shadow:0 0 0 8px rgba(74,222,128,0)} }
        @keyframes glitch-1 {
          0%,100%{clip-path:inset(0 0 100% 0);transform:translate(0)}
          10%{clip-path:inset(10% 0 60% 0);transform:translate(-3px,1px)}
          20%{clip-path:inset(40% 0 30% 0);transform:translate(2px,-1px)}
          30%{clip-path:inset(70% 0 5% 0);transform:translate(-1px,2px)}
          40%{clip-path:inset(0 0 100% 0);transform:translate(0)}
        }
        @keyframes glitch-2 {
          0%,100%{clip-path:inset(0 0 100% 0);transform:translate(0)}
          15%{clip-path:inset(20% 0 50% 0);transform:translate(3px,-2px)}
          25%{clip-path:inset(55% 0 20% 0);transform:translate(-2px,1px)}
          35%{clip-path:inset(80% 0 2% 0);transform:translate(1px,-1px)}
          45%{clip-path:inset(0 0 100% 0);transform:translate(0)}
        }

        /* ── animation classes ── */
        .anim-slide-left  { animation: slide-left  0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .anim-slide-right { animation: slide-right 0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .anim-fade-up     { animation: fade-up     0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .crt-flicker      { animation: crt-flicker 10s infinite; }
        .marquee-track    { animation: marquee 30s linear infinite; }

        /* ── glitch hover ── */
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap:hover::before,
        .glitch-wrap:hover::after {
          content: attr(data-text);
          position: absolute; left: 0; top: 0;
          width: 100%; height: 100%;
          font-family: inherit; font-size: inherit; font-weight: inherit; color: inherit;
        }
        .glitch-wrap:hover::before { color: #fbbf24; animation: glitch-1 .4s steps(1) infinite; left: 2px; }
        .glitch-wrap:hover::after  { color: #4ade80; animation: glitch-2 .4s steps(1) infinite; left: -2px; }

        /* ── moving scanline ── */
        .scanline-move {
          position: absolute; left:0; width:100%; height:80px;
          background: linear-gradient(transparent, rgba(74,222,128,.025), transparent);
          animation: scanline-move 6s linear infinite;
          pointer-events: none;
        }

        /* ── dot grid bg ── */
        .dot-grid {
          background-color: #030603;
          background-image:
            radial-gradient(rgba(74,222,128,.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── btn wipe ── */
        .btn-wipe {
          position: relative; overflow: hidden;
          transition: color .3s;
        }
        .btn-wipe span.bg-fill {
          position: absolute; inset: 0;
          background: #4ade80;
          transform: translateY(100%);
          transition: transform .35s cubic-bezier(.16,1,.3,1);
          z-index: 0;
        }
        .btn-wipe:hover span.bg-fill { transform: translateY(0); }
        .btn-wipe:hover { color: #030603 !important; }
        .btn-wipe .btn-label { position: relative; z-index: 1; }
      `}</style>

      <CursorTrail />
      <NoiseOverlay />

      {/* fixed scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[2]"
        style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.055) 2px,rgba(0,0,0,0.055) 4px)' }} />

      {/* moving scanline */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
        <div className="scanline-move" />
      </div>

      {/* ═══ NAVBAR ════════════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${headerVis ? 'bg-[#030603]/95 backdrop-blur-md border-b border-green-900/30' : ''}`}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          <a href="#home" className="flex items-center gap-2.5 group" style={{ fontFamily: "'Orbitron', monospace", fontSize: '12px', letterSpacing: '0.25em', color: '#4ade80' }}>
            <span className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: 'pulse-green 2s infinite' }} />
            GSS_SURYA.exe
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: '14px', fontWeight: 600 }}
                className={`px-4 py-2 transition-all duration-200 relative tracking-wide ${activeSection === l.id ? 'text-green-400' : 'text-gray-500 hover:text-green-300'}`}>
                {activeSection === l.id && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full" style={{ boxShadow: '0 0 6px rgba(74,222,128,1)' }} />
                )}
                {l.title}
              </a>
            ))}
          </nav>

          <button className="md:hidden border border-green-900/60 px-4 py-2 hover:bg-green-500/10 transition-colors text-green-400 text-sm font-semibold"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#030603] border-t border-green-900/30 px-6 py-4 flex flex-col gap-1">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 600 }}
                className={`py-3 border-b border-gray-900 transition-colors ${activeSection === l.id ? 'text-green-400' : 'text-gray-400 hover:text-green-300'}`}>
                {l.title}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden dot-grid crt-flicker">
          {/* side rule */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-green-500/30" />
            <span className="text-gray-700 tracking-[0.3em]"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Share Tech Mono', monospace", fontSize: '10px' }}>
              PORTFOLIO_v2.0
            </span>
            <div className="w-px h-20 bg-gradient-to-t from-transparent to-green-500/30" />
          </div>

          <div className="container mx-auto px-6 md:px-16 lg:px-24 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className="anim-slide-left">
              {/* status badge */}
              <div className="inline-flex items-center gap-2.5 border border-green-800/50 bg-green-500/5 px-4 py-2 mb-10 rounded-sm"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: 'rgba(74,222,128,0.8)', letterSpacing: '0.15em' }}>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                SYS_STATUS: AVAILABLE FOR HIRE
              </div>

              <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em' }}>
                <GlitchText className="block text-green-400 text-5xl md:text-7xl lg:text-8xl">GONELLA SIVA SAI</GlitchText>
                <GlitchText className="block text-white text-5xl md:text-7xl lg:text-8xl mt-1">SURYA PRAKASH</GlitchText>
              </h1>

              {/* tagline — larger, readable */}
              <p className="text-gray-300 text-base md:text-lg mt-7 mb-2 leading-relaxed"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 500, maxWidth: 480 }}>
                {portfolioData.tagline}
              </p>
              <div className="flex items-center gap-0 mb-10"
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '13px' }}>
                <span className="text-amber-500/60">{'>'}</span>
                <span className="ml-2 text-gray-600">PES University · Bengaluru</span>
                <span className={`ml-1 inline-block w-2 h-5 bg-green-400 ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a href={portfolioData.resumeUrl} download
                  className="btn-wipe border border-green-500/60 px-7 py-3.5 text-green-400 font-semibold text-sm"
                  style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.05em' }}>
                  <span className="bg-fill" />
                  <span className="btn-label flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
                    Download Resume
                  </span>
                </a>
                <a href="#contact"
                  className="border border-gray-700 px-7 py-3.5 text-gray-400 hover:border-green-800 hover:text-green-400 transition-all duration-300 font-semibold text-sm"
                  style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.05em' }}>
                  Get In Touch →
                </a>
              </div>

              {/* social links */}
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    href: portfolioData.socials.github, label: 'GitHub',
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                  },
                  {
                    href: portfolioData.socials.linkedin, label: 'LinkedIn',
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  },
                  {
                    href: `mailto:${portfolioData.contactEmail}`, label: 'Email',
                    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                  },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors duration-200 border border-gray-800 hover:border-green-900 px-4 py-2.5 text-sm font-semibold"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — profile */}
            <div className="flex justify-center lg:justify-end anim-slide-right">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Rotating rings */}
                <svg className="absolute inset-0 w-full h-full" style={{ animation: 'spin-cw 22s linear infinite' }} viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="155" fill="none" stroke="rgba(74,222,128,0.14)" strokeWidth="1" strokeDasharray="8 6" />
                </svg>
                <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" style={{ animation: 'spin-ccw 16s linear infinite' }} viewBox="0 0 256 256">
                  <circle cx="128" cy="128" r="124" fill="none" stroke="rgba(251,191,36,0.09)" strokeWidth="1" strokeDasharray="4 12" />
                  <circle cx="128" cy="4"   r="3" fill="rgba(251,191,36,0.6)" />
                  <circle cx="128" cy="252" r="3" fill="rgba(251,191,36,0.6)" />
                </svg>

                {/* Avatar */}
                <div className="absolute inset-10 rounded-full overflow-hidden border border-green-500/25"
                  style={{ boxShadow: '0 0 40px rgba(74,222,128,0.12), inset 0 0 40px rgba(0,0,0,0.5)' }}>
                  <img src="/imagee.jpeg" alt="Surya Prakash" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/280x280/030603/4ade80?text=GSS'; }} />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)' }} />
                </div>

                {/* corner brackets */}
                {[['top-8 left-8', 'border-t border-l'], ['top-8 right-8', 'border-t border-r'], ['bottom-8 left-8', 'border-b border-l'], ['bottom-8 right-8', 'border-b border-r']].map(([pos, b], i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5 ${b} border-green-400/40`} />
                ))}

                {/* floating tags */}
                <div className="absolute -right-5 top-1/4 bg-[#030603] border border-green-900/70 px-3 py-2 shadow-lg"
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: '#4ade80' }}>
                  CGPA: 8.61
                </div>
                <div className="absolute -left-6 bottom-1/3 bg-[#030603] border border-amber-900/50 px-3 py-2 shadow-lg"
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', color: 'rgb(251,191,36)' }}>
                  PES University
                </div>
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-green-900/20 py-2.5 bg-[#030603]/70">
            <div className="flex whitespace-nowrap marquee-track">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#1f2d1f' }}>
                  {['FULL-STACK DEVELOPER', 'AI ENTHUSIAST', 'OPEN SOURCE CONTRIBUTOR', 'CSE UNDERGRAD', 'SDN RESEARCHER', 'CLOUD EXPLORER', 'REACT DEVELOPER', 'PYTHON PROGRAMMER'].map((item, i) => (
                    <span key={i}>
                      <span className="text-green-900 mx-8">◆</span>
                      <span className="hover:text-green-500 transition-colors duration-200">{item}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ══════════════════════════════════════════════════════════ */}
        <section id="about" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <SectionHeading num="02" title="ABOUT" accent="_ME" />

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Bio */}
              <div className="lg:col-span-3">
                <div className="relative border border-gray-800/60 p-8 md:p-10">
                  {/* corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/50" />

                  <div className="mb-6 flex items-center gap-2" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', letterSpacing: '0.25em', color: '#374151' }}>
                    <span style={{ color: '#16a34a' }}>●</span> cat bio.txt
                  </div>

                  {/* Split into paragraphs for readability */}
                  {portfolioData.bio.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-300 leading-relaxed text-base mb-5 last:mb-0"
                      style={{ fontFamily: "'Syne', sans-serif", lineHeight: '1.85' }}>
                      {para}
                    </p>
                  ))}

                  {/* contact detail rows */}
                  <div className="mt-8 pt-8 border-t border-gray-900 grid sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Location', val: portfolioData.location },
                      { label: 'Email',    val: portfolioData.contactEmail },
                      { label: 'Phone',    val: portfolioData.phone },
                      { label: 'Status',   val: 'Open to Opportunities', green: true },
                    ].map(row => (
                      <div key={row.label} className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-700 tracking-widest uppercase"
                          style={{ fontFamily: "'Share Tech Mono', monospace" }}>{row.label}</span>
                        <span className={`text-sm font-semibold ${(row as any).green ? 'text-green-400' : 'text-gray-300'}`}
                          style={{ fontFamily: "'Syne', sans-serif" }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-0 border border-gray-900/60">
                <AnimCounter value="8.61" label="CGPA" />
                <AnimCounter value="6"    suffix="+" label="Projects" />
                <AnimCounter value="1"    label="Internship" />
                <AnimCounter value="2"    suffix="+" label="Club Roles" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SKILLS ══════════════════════════════════════════════════════════ */}
        <section id="skills" className="py-28 px-6 md:px-16 relative">
          <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <SectionHeading num="03" title="TECH" accent="_STACK" />
            <div className="border border-gray-800/50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {portfolioData.skills.map((skill, i) => (
                <SkillChip key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ══════════════════════════════════════════════════════ */}
        <section id="experience" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading num="04" title="EXPERIENCE" accent="_LOG" />
            <div className="relative border border-gray-800/50">
              {/* corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500/40" />
              <div className="p-4 md:p-6">
                {portfolioData.experiences.map((exp, i) => (
                  <ExpEntry key={i} exp={exp} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ════════════════════════════════════════════════════════ */}
        <section id="projects" className="py-28 px-6 md:px-16 relative">
          <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <SectionHeading num="05" title="SELECTED" accent="_WORK" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800/20">
              {portfolioData.projects.map((p, i) => (
                <ProjectCard key={i} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═════════════════════════════════════════════════════════ */}
        <section id="contact" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading num="06" title="INIT" accent="_CONTACT" />

            {/* Info grid */}
            <div className="grid md:grid-cols-2 gap-px bg-gray-800/20 mb-px">
              {[
                { label: 'Location', val: portfolioData.location },
                { label: 'Email',    val: portfolioData.contactEmail, href: `mailto:${portfolioData.contactEmail}` },
                { label: 'Phone',    val: portfolioData.phone,        href: `tel:${portfolioData.phone}` },
                { label: 'Status',   val: 'Open to Opportunities',   green: true },
              ].map((item, i) => (
                <div key={i}
                  className="group bg-[#030603] p-8 hover:bg-green-500/[0.03] transition-colors duration-300 border border-gray-900/50 hover:border-green-900/60 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-green-500/30 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <p className="mb-2.5 text-xs tracking-widest text-gray-700 uppercase"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href}
                        className="text-base text-gray-300 hover:text-green-400 transition-colors font-semibold break-all"
                        style={{ fontFamily: "'Syne', sans-serif" }}>{item.val}</a>
                    : <p className={`text-base font-semibold ${(item as any).green ? 'text-green-400' : 'text-gray-300'}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}>{item.val}</p>
                  }
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-px bg-gray-800/20">
              {[
                { href: portfolioData.socials.github,        label: 'GitHub',   sub: 'GSuryaP' },
                { href: portfolioData.socials.linkedin,      label: 'LinkedIn', sub: 'g-s-s-surya-prakash' },
                { href: `mailto:${portfolioData.contactEmail}`, label: 'Email',   sub: 'Direct Line' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="group bg-[#030603] border border-gray-900/50 hover:border-green-900/60 p-7 flex flex-col justify-between hover:bg-green-500/[0.03] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 font-black text-gray-950 group-hover:text-[#0a110a] transition-colors select-none leading-none p-3 text-6xl"
                    style={{ fontFamily: "'Orbitron', monospace" }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-xs tracking-widest text-gray-600 group-hover:text-green-600 transition-colors uppercase mb-3"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}>{s.label}</p>
                  <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-300 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}>{s.sub}</p>
                  <span className="mt-5 text-xs text-green-600/0 group-hover:text-green-400/70 transition-colors font-semibold"
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}>OPEN →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-green-900/25 px-6 md:px-16 py-8">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '12px', color: '#1a2e1a', letterSpacing: '0.25em' }}>
            © {new Date().getFullYear()} GSS_SURYA.exe
          </span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', color: '#1f3520' }}>
            Built with React · TypeScript · Tailwind CSS
          </span>
          <div className="flex items-center gap-2" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#14532d' }}>
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </footer>

      {/* back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 border border-green-900/60 bg-[#030603] px-4 py-2.5 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 group text-sm font-semibold"
        style={{ fontFamily: "'Syne', sans-serif", color: '#4ade80' }}>
        <span className="group-hover:-translate-y-0.5 inline-block transition-transform duration-200">↑ Top</span>
      </button>
    </div>
  );
}
