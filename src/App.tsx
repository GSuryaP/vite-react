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

// --- Blueprint Grid Background ---
const BlueprintGrid: React.FC = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.06 }}>
    <defs>
      <pattern id="smallGrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#7BA7D4" strokeWidth="0.4"/>
      </pattern>
      <pattern id="largeGrid" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="url(#smallGrid)"/>
        <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#7BA7D4" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#largeGrid)"/>
  </svg>
);

// --- Floating Particles (binary bits) ---
const FloatingBits: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: Math.random() > 0.5 ? '1' : '0',
      speed: 0.12 + Math.random() * 0.18,
      opacity: 0.04 + Math.random() * 0.10,
      size: 9 + Math.random() * 7,
      drift: (Math.random() - 0.5) * 0.18,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(180, 160, 100, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        if (p.x < -20 || p.x > canvas.width + 20) { p.x = Math.random() * canvas.width; }
        if (Math.random() < 0.004) p.char = Math.random() > 0.5 ? '1' : '0';
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- Typing Effect Hook ---
const useTypingEffect = (texts: string[], speed = 80, pause = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) { setDisplayText(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }
        else { setTimeout(() => setIsDeleting(true), pause); }
      } else {
        if (charIndex > 0) { setDisplayText(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }
        else { setIsDeleting(false); setTextIndex(i => (i + 1) % texts.length); }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);
  return displayText;
};

// --- Animated Counter ---
const AnimCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [displayed, setDisplayed] = useState('—');
  useEffect(() => {
    let frame = 0;
    const total = 18;
    const interval = setInterval(() => {
      frame++;
      const rand = Math.floor(Math.random() * 99).toString();
      setDisplayed(frame < total ? rand : value);
      if (frame >= total) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <div className="group relative p-5 text-center transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(15, 25, 50, 0.7)', border: '1px solid rgba(120,150,210,0.15)', backdropFilter: 'blur(6px)' }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,100,0.5), transparent)' }} />
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', color: '#E8C97A', letterSpacing: '-0.02em', lineHeight: 1 }}>{displayed}</div>
      <div className="mt-1.5 text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(160,180,220,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
    </div>
  );
};

// --- Section Title ---
const SectionTitle: React.FC<{ children: React.ReactNode; num?: string; sub?: string }> = ({ children, num, sub }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-3">
      {num && <span className="text-[10px] font-mono" style={{ color: 'rgba(180,160,100,0.4)' }}>§{num}</span>}
      <div className="w-8 h-px" style={{ background: 'rgba(180,160,100,0.4)' }} />
      {sub && <span className="text-[10px] uppercase tracking-[0.35em] font-mono" style={{ color: 'rgba(160,180,220,0.4)' }}>{sub}</span>}
    </div>
    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: '1.05', letterSpacing: '-0.02em', color: '#EDF0F8', fontWeight: 700 }}>
      {children}
    </h2>
    <div className="mt-5 flex items-center gap-4">
      <div className="h-px w-16" style={{ background: 'rgba(180,160,100,0.5)' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#E8C97A', opacity: 0.6 }} />
      <div className="h-px flex-1 max-w-48" style={{ background: 'rgba(180,160,100,0.15)' }} />
    </div>
  </div>
);

// --- Code Block / Terminal Window ---
const CodeBlock: React.FC<{ title?: string; lang?: string; children: React.ReactNode; className?: string }> = ({ title = 'shell', lang = 'bash', children, className = '' }) => (
  <div className={`overflow-hidden ${className}`} style={{ background: 'rgba(8, 14, 30, 0.85)', border: '1px solid rgba(120,150,210,0.18)', backdropFilter: 'blur(10px)', borderRadius: '2px' }}>
    <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(15,25,50,0.8)', borderBottom: '1px solid rgba(120,150,210,0.12)' }}>
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(240,100,90,0.5)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(240,180,60,0.5)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(80,200,120,0.5)' }} />
        </div>
        <span className="text-[10px] font-mono ml-1" style={{ color: 'rgba(160,180,220,0.4)' }}>{title}</span>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5" style={{ color: 'rgba(180,160,100,0.5)', background: 'rgba(180,160,100,0.08)', border: '1px solid rgba(180,160,100,0.1)' }}>{lang}</span>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// --- Skill Card ---
const SkillIcon: React.FC<Skill> = ({ icon, name }) => (
  <div className="group relative flex flex-col items-center gap-3 p-4 transition-all duration-250 hover:-translate-y-1"
    style={{ background: 'rgba(10,18,40,0.6)', border: '1px solid rgba(120,150,210,0.1)', backdropFilter: 'blur(4px)' }}>
    <div className="absolute inset-x-0 top-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,100,0.6), transparent)' }} />
    <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-250">
      {icon}
    </div>
    <span className="text-[9px] font-mono uppercase tracking-widest group-hover:text-yellow-200 transition-colors" style={{ color: 'rgba(160,180,220,0.4)' }}>{name}</span>
  </div>
);

// --- Project Card ---
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <div className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2"
    style={{ background: 'rgba(10,18,40,0.7)', border: '1px solid rgba(120,150,210,0.12)', backdropFilter: 'blur(8px)', animationDelay: `${index * 80}ms` }}>
    {/* Top accent */}
    <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,100,0.7), transparent)' }} />
    {/* Corner number */}
    <div className="absolute top-3 right-4 font-mono text-[9px]" style={{ color: 'rgba(180,160,100,0.2)', fontVariantNumeric: 'tabular-nums' }}>
      {String(index + 1).padStart(2, '0')}
    </div>
    {/* Icon area */}
    <div className="relative flex items-center justify-center h-28 overflow-hidden" style={{ background: 'rgba(8,14,30,0.8)' }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(120,150,210,0.15) 0%, transparent 70%)' }} />
      {/* Dot matrix pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`dots-${index}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#7BA7D4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${index})`}/>
      </svg>
      <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 opacity-70 group-hover:opacity-100" style={{ filter: 'drop-shadow(0 0 12px rgba(180,160,100,0.3))' }}>
        {project.icon}
      </div>
    </div>
    <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(120,150,210,0.3), rgba(180,160,100,0.3), transparent)' }} />
    <div className="p-5 flex flex-col flex-1">
      <h3 className="mb-2 font-semibold group-hover:text-yellow-100 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#C8D8F0', letterSpacing: '-0.01em' }}>{project.title}</h3>
      <p className="text-[11px] leading-relaxed flex-1 font-mono mb-4" style={{ color: 'rgba(160,180,220,0.45)' }}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-[9px] font-mono px-2 py-0.5 uppercase tracking-wide" style={{ color: 'rgba(180,160,100,0.6)', background: 'rgba(180,160,100,0.06)', border: '1px solid rgba(180,160,100,0.15)' }}>{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-[10px] font-mono uppercase tracking-widest px-3 py-2 transition-all duration-150"
            style={{ background: 'rgba(180,160,100,0.12)', border: '1px solid rgba(180,160,100,0.3)', color: '#E8C97A' }}>
            ↗ view live
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-[10px] font-mono uppercase tracking-widest px-3 py-2 transition-all duration-150"
            style={{ border: '1px solid rgba(120,150,210,0.2)', color: 'rgba(160,180,220,0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(120,150,210,0.5)'; (e.currentTarget as HTMLElement).style.color = '#A0B8E0'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(120,150,210,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,180,220,0.5)'; }}>
            ⌥ source
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- Experience Card ---
const ExperienceCard: React.FC<{ experience: Experience; index: number; total: number }> = ({ experience, index, total }) => (
  <div className="relative flex gap-6 group">
    {/* Timeline */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative w-4 h-4 flex-shrink-0 mt-6">
        <div className="absolute inset-0 rounded-full transition-all duration-300" style={{ background: 'rgba(180,160,100,0.15)', border: '2px solid rgba(180,160,100,0.4)' }} />
        <div className="absolute inset-1 rounded-full group-hover:scale-125 transition-transform duration-300" style={{ background: '#E8C97A' }} />
      </div>
      {index < total - 1 && (
        <div className="flex-1 w-px mt-1" style={{ background: 'linear-gradient(to bottom, rgba(120,150,210,0.3), transparent)', minHeight: '40px' }} />
      )}
    </div>
    <div className="flex-1 mb-8 overflow-hidden transition-all duration-300"
      style={{ background: 'rgba(10,18,40,0.65)', border: '1px solid rgba(120,150,210,0.1)', backdropFilter: 'blur(8px)' }}>
      <div className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom, #E8C97A, rgba(180,160,100,0.05))' }} />
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold mb-1 group-hover:text-yellow-100 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', color: '#C8D8F0' }}>{experience.title}</h3>
            <p className="font-mono text-sm" style={{ color: 'rgba(180,160,100,0.7)' }}>↳ {experience.company}</p>
          </div>
          <div className="flex flex-col lg:items-end gap-2">
            <span className="font-mono text-xs px-3 py-1" style={{ color: 'rgba(160,180,220,0.45)', background: 'rgba(15,25,50,0.7)', border: '1px solid rgba(120,150,210,0.12)' }}>{experience.period}</span>
            <span className="font-mono text-[9px] px-3 py-1 uppercase tracking-widest" style={{ background: 'rgba(180,160,100,0.1)', color: 'rgba(180,160,100,0.7)', border: '1px solid rgba(180,160,100,0.2)' }}>{experience.type}</span>
          </div>
        </div>
        <ul className="mb-5 space-y-2">
          {experience.description.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: 'rgba(180,160,100,0.5)' }} />
              <span className="text-[11px] font-mono leading-relaxed" style={{ color: 'rgba(160,180,220,0.5)' }}>{point}</span>
            </li>
          ))}
        </ul>
        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, i) => (
              <span key={i} className="text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider" style={{ background: 'rgba(120,150,210,0.08)', color: 'rgba(160,180,220,0.4)', border: '1px solid rgba(120,150,210,0.12)' }}>{tech}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// --- Contact Card ---
const ContactCard: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="group flex items-center gap-4 p-4 transition-all duration-200"
    style={{ background: 'rgba(10,18,40,0.6)', border: '1px solid rgba(120,150,210,0.1)', backdropFilter: 'blur(4px)' }}>
    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-yellow-50/5"
      style={{ background: 'rgba(15,25,50,0.6)', border: '1px solid rgba(180,160,100,0.15)' }}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="font-mono text-[8px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(160,180,220,0.3)' }}>{label}</p>
      <div className="font-mono text-xs truncate group-hover:text-yellow-100 transition-colors" style={{ color: 'rgba(180,200,240,0.65)' }}>{value}</div>
    </div>
  </div>
);

// --- Main App ---
function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  const typingTexts = [
    'Full Stack Developer',
    'AI Enthusiast',
    'CSE Undergrad @ PES',
    'Open Source Contributor',
    'SDN Researcher',
    'Problem Solver',
  ];
  const typedText = useTypingEffect(typingTexts, 70, 1800);

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
      { name: "Python", icon: <SiPython color="#3776AB" size={36} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={36} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={36} /> },
      {
        name: "RASA",
        icon: (
          <img src="/rasa.jpg" alt="RASA" className="w-9 h-9" />
        ),
      },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={36} /> },
      { name: "Express", icon: <SiExpress color="#C8D8F0" size={36} /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={36} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={36} /> },
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={36} /> },
      { name: "CSS3", icon: <SiCss color="#1572B6" size={36} /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" size={36} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={36} /> },
      { name: "C", icon: <SiC color="#00599C" size={36} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={36} /> },
      { name: "GitHub", icon: <SiGithub color="#C8D8F0" size={36} /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={36} /> },
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
        description: "Built a RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet with custom RASA actions for automated flow queries and troubleshooting.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <circle cx="12" cy="5" r="2" stroke="#E8C97A" strokeWidth="1.8" />
            <circle cx="5" cy="19" r="2" stroke="#E8C97A" strokeWidth="1.8" />
            <circle cx="19" cy="19" r="2" stroke="#E8C97A" strokeWidth="1.8" />
            <path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#E8C97A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
        repoUrl: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
      },
      {
        title: "Distributed Image Processing Pipeline",
        description: "A distributed image processing system using Apache Kafka for async communication between a FastAPI master node and multiple PIL-based worker nodes. The master splits images into tiles, publishes them to Kafka, workers process and return results, and the master reconstructs the final image — with a real-time heartbeat monitoring dashboard.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <rect x="9" y="9" width="6" height="6" rx="1" stroke="#E8C97A" strokeWidth="1.8" />
            <rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#E8C97A" strokeWidth="1.5" />
            <line x1="12" y1="6" x2="12" y2="9" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#E8C97A" strokeWidth="1.5" />
            <line x1="6" y1="12" x2="9" y2="12" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#E8C97A" strokeWidth="1.5" />
            <line x1="18" y1="12" x2="15" y2="12" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#E8C97A" strokeWidth="1.5" />
            <line x1="12" y1="18" x2="12" y2="15" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker", "Distributed Systems"],
        repoUrl: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
      },
      {
        title: "GitHub Repository Tracker",
        description: "A modern interactive dashboard for tracking GitHub repositories, users, commits, and open issues. Features a real-time stats overview, live search, aurora-style animated background with floating orbs, and quick-access tools — all powered by a Node.js API and a Python GitHub sync script.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="#E8C97A" strokeWidth="1.2" fill="none" />
            <path d="M8 17v-4M12 17v-6M16 17v-4" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
        repoUrl: "https://github.com/GSuryaP/Github-Repository-Tracker",
      },
      {
        title: "Personal Finance Analytics Dashboard",
        description: "A FinTech analytics dashboard built with React and Tailwind CSS for managing personal transactions in real time. Supports full CRUD operations, dynamic Recharts visualizations, dark/light mode toggle, real-time search, and auto-recalculated metrics for income, expenses, net balance, and savings rate.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <rect x="3" y="12" width="3" height="9" rx="1" stroke="#E8C97A" strokeWidth="1.8" />
            <rect x="8" y="8" width="3" height="13" rx="1" stroke="#E8C97A" strokeWidth="1.8" />
            <rect x="13" y="5" width="3" height="16" rx="1" stroke="#E8C97A" strokeWidth="1.8" />
            <rect x="18" y="9" width="3" height="12" rx="1" stroke="#E8C97A" strokeWidth="1.8" />
            <path d="M4.5 11L9.5 7L14.5 4L19.5 8" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1" />
          </svg>
        ),
        tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript", "CRUD"],
        repoUrl: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
      },
      {
        title: "AdaptiveLearn AI",
        description: "An AI-powered teacher analytics dashboard built on AWS free-tier services. Reads student scores and progress from S3 CSV files via a Python Lambda function, uses Amazon Bedrock (Titan) for LLM-driven insights, and surfaces weak topics and struggling students through a clean HTML frontend.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#E8C97A" strokeWidth="1.5" fill="none" />
            <path d="M9 12h6M9 14.5h4" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        tags: ["AWS S3", "AWS Lambda", "Amazon Bedrock", "Python", "HTML", "CSV"],
        repoUrl: "https://github.com/GSuryaP/AdaptiveLearn-AI",
      },
      {
        title: "Weather & AQI Tracker",
        description: "Built a Tkinter-based application that verifies city names using OpenWeatherMap API and displays comprehensive environmental data including Air Quality Index (AQI) and detailed weather information with user-friendly interface and error handling.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <circle cx="12" cy="10" r="4" stroke="#E8C97A" strokeWidth="2" />
            <path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#E8C97A" strokeWidth="2" strokeLinecap="round" />
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
    <div style={{ background: '#060D1F', color: '#EDF0F8', fontFamily: "'JetBrains Mono', monospace", minHeight: '100vh', cursor: 'default' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

        :root {
          --gold: #E8C97A;
          --gold-dim: rgba(232,201,122,0.6);
          --blue: #7BA7D4;
          --blue-dim: rgba(123,167,212,0.4);
          --bg: #060D1F;
          --bg2: #0A1228;
          --text: #EDF0F8;
          --text-muted: rgba(160,180,220,0.5);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { cursor: default; background: var(--bg); }
        a, button { cursor: pointer; }
        ::selection { background: rgba(232,201,122,0.2); color: #E8C97A; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060D1F; }
        ::-webkit-scrollbar-thumb { background: rgba(123,167,212,0.25); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(180,160,100,0.4); }

        .nav-link-active { color: #E8C97A !important; }
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: #E8C97A;
        }

        /* Marquee */
        .marquee-track { animation: marquee 28s linear infinite; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Fade up */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .anim-delay-1 { animation-delay: 0.08s; opacity: 0; }
        .anim-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .anim-delay-3 { animation-delay: 0.35s; opacity: 0; }
        .anim-delay-4 { animation-delay: 0.5s; opacity: 0; }
        .anim-delay-5 { animation-delay: 0.65s; opacity: 0; }

        /* Blinking cursor */
        .blink-cursor::after {
          content: '|';
          animation: blink 1s step-end infinite;
          color: #E8C97A;
          margin-left: 1px;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Profile ring spin */
        @keyframes ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .profile-ring { animation: ring-spin 8s linear infinite; }

        /* Watermark */
        .section-watermark {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(5rem, 14vw, 12rem);
          font-weight: 700;
          line-height: 1;
          color: rgba(123,167,212,0.025);
          position: absolute;
          right: -1rem;
          top: 0;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
          font-style: italic;
        }

        /* Gold text */
        .text-gold { color: #E8C97A; }

        /* Hover card lift */
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(10,18,40,0.7);
        }

        /* Dot grid pattern background for hero */
        .dot-bg {
          background-image: radial-gradient(rgba(123,167,212,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Animated status dot */
        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(120,200,120,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(120,200,120,0); }
        }
        .status-dot { animation: status-pulse 2s ease-in-out infinite; }

        /* Skill card hover line */
        .skill-card { transition: transform 0.2s ease; }
        .skill-card:hover { transform: translateY(-3px); }

        /* Thin divider */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,167,212,0.2), transparent);
        }

        /* Tag pill */
        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: 0;
        }

        /* Italic serif accent */
        .serif-italic {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
        }

        /* Footer gradient line */
        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,160,100,0.3), rgba(120,150,210,0.3), transparent);
        }

        /* Section accent dot */
        .accent-dot {
          width: 5px;
          height: 5px;
          background: #E8C97A;
          border-radius: 50%;
          display: inline-block;
        }

        /* Progress bar animation */
        @keyframes grow-width {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        .progress-bar { animation: grow-width 1.2s cubic-bezier(0.4,0,0.2,1) forwards; animation-delay: 0.5s; width: 0%; }
      `}</style>

      {/* Backgrounds */}
      <BlueprintGrid />
      <FloatingBits />

      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(123,167,212,0.055) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle, rgba(180,140,60,0.04) 0%, transparent 65%)' }} />
      </div>

      {/* ====== NAVBAR ====== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400`}
        style={{ background: scrolled ? 'rgba(6,13,31,0.94)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(123,167,212,0.1)' : '1px solid transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(232,201,122,0.5)' }}>{'<'}</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#EDF0F8', letterSpacing: '-0.01em' }}>GSS</span>
            <span style={{ color: '#E8C97A', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem' }}>.</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'rgba(160,180,220,0.55)', letterSpacing: '0.05em' }}>dev</span>
            <span className="text-[10px] font-mono" style={{ color: 'rgba(232,201,122,0.5)' }}>{'/>'}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`}
                className={`relative text-[10px] font-mono uppercase tracking-widest px-3 py-2 transition-colors duration-200 hover:text-yellow-200 ${activeSection === link.id ? 'nav-link-active' : ''}`}
                style={{ color: activeSection === link.id ? '#E8C97A' : 'rgba(160,180,220,0.4)' }}>
                {link.title}
              </a>
            ))}
          </nav>

          {/* Status */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full status-dot" style={{ background: '#6DBE8A' }} />
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(160,180,220,0.4)' }}>available</span>
          </div>

          <button className="md:hidden font-mono text-[10px] px-3 py-1.5 transition-colors" style={{ border: '1px solid rgba(180,160,100,0.25)', color: '#E8C97A' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div style={{ background: 'rgba(6,13,31,0.98)', borderTop: '1px solid rgba(123,167,212,0.08)' }}>
            <nav className="flex flex-col py-4">
              {navLinks.map(link => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-6 font-mono text-[10px] uppercase tracking-widest transition-colors border-b"
                  style={{ borderColor: 'rgba(123,167,212,0.06)', color: activeSection === link.id ? '#E8C97A' : 'rgba(160,180,220,0.4)' }}>
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* ====== HOME ====== */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 relative overflow-hidden dot-bg">
          {/* Large background serif watermark */}
          <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none pr-8">
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(6rem, 20vw, 18rem)', color: 'rgba(123,167,212,0.025)', lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>CSE</span>
          </div>

          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left */}
              <div className="lg:col-span-3">
                {/* Badge */}
                <div className="anim-fade-up anim-delay-1 inline-flex items-center gap-3 mb-8 px-4 py-2"
                  style={{ background: 'rgba(10,18,40,0.7)', border: '1px solid rgba(180,160,100,0.2)', backdropFilter: 'blur(8px)' }}>
                  <div className="w-1.5 h-1.5 rounded-full status-dot" style={{ background: '#6DBE8A' }} />
                  <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: 'rgba(180,160,100,0.65)' }}>
                    Open to Opportunities — B.Tech CSE
                  </span>
                </div>

                {/* Shell prompt */}
                <div className="anim-fade-up anim-delay-2 mb-2">
                  <span className="font-mono text-xs" style={{ color: 'rgba(123,167,212,0.4)' }}>
                    <span style={{ color: 'rgba(180,160,100,0.55)' }}>student@pesu</span>
                    <span style={{ color: 'rgba(123,167,212,0.35)' }}>:~$</span>
                    {' '}whoami
                  </span>
                </div>

                {/* Name */}
                <div className="anim-fade-up anim-delay-3 mb-5">
                  <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: '1.0', letterSpacing: '-0.02em', color: '#EDF0F8', fontWeight: 700 }}>
                    {portfolioData.name.split(' ').map((word, i) => (
                      <span key={i}>
                        {word}
                        {i === 0 ? <span style={{ color: '#E8C97A' }}>_</span> : ''}
                        {i < portfolioData.name.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </h1>
                </div>

                {/* Typing role */}
                <div className="anim-fade-up anim-delay-3 mb-8 flex items-center gap-3">
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(123,167,212,0.4)' }}>→</span>
                  <span className="font-mono text-sm blink-cursor" style={{ color: 'rgba(180,160,100,0.8)' }}>{typedText}</span>
                </div>

                {/* Code block bio */}
                <div className="anim-fade-up anim-delay-4 mb-10">
                  <CodeBlock title="profile.sh" lang="bash">
                    <div className="space-y-2 font-mono text-[11px]">
                      <p><span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> <span style={{ color: 'rgba(123,167,212,0.6)' }}>cat /etc/tagline</span></p>
                      <p className="pl-4" style={{ color: 'rgba(160,180,220,0.55)' }}>{portfolioData.tagline}</p>
                      <p className="pt-1"><span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> <span style={{ color: 'rgba(123,167,212,0.6)' }}>echo $LOCATION</span></p>
                      <p className="pl-4" style={{ color: 'rgba(160,180,220,0.55)' }}>{portfolioData.location}</p>
                    </div>
                  </CodeBlock>
                </div>

                {/* CTAs */}
                <div className="anim-fade-up anim-delay-5 flex flex-wrap gap-3 mb-8">
                  <a href={portfolioData.resumeUrl} download
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-6 py-3 transition-all duration-200"
                    style={{ background: 'rgba(232,201,122,0.12)', border: '1px solid rgba(232,201,122,0.35)', color: '#E8C97A' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,201,122,0.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,201,122,0.12)'; }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Résumé
                  </a>
                  <a href="#contact"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-6 py-3 transition-all duration-200"
                    style={{ border: '1px solid rgba(123,167,212,0.2)', color: 'rgba(160,180,220,0.55)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,167,212,0.5)'; (e.currentTarget as HTMLElement).style.color = '#A0B8E0'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,167,212,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,180,220,0.55)'; }}>
                    Get in Touch →
                  </a>
                </div>

                {/* Socials */}
                <div className="anim-fade-up anim-delay-5 flex gap-2">
                  {[
                    { href: portfolioData.socials.linkedin, label: 'LinkedIn', path: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" /> },
                    { href: portfolioData.socials.github, label: 'GitHub', path: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor" /> },
                    { href: `mailto:${portfolioData.contactEmail}`, label: 'Email', path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                      style={{ border: '1px solid rgba(123,167,212,0.15)', color: 'rgba(160,180,220,0.4)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,201,122,0.4)'; (e.currentTarget as HTMLElement).style.color = '#E8C97A'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,201,122,0.05)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,167,212,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,180,220,0.4)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={i < 2 ? 'currentColor' : 'none'} stroke={i === 2 ? 'currentColor' : 'none'}>
                        {s.path}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-2 flex flex-col items-center gap-7">
                {/* Profile image */}
                <div className="relative">
                  <div className="absolute -inset-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(180,160,100,0.07) 0%, transparent 70%)' }} />
                  {/* Spinning ring */}
                  <div className="relative w-44 h-44">
                    <svg className="profile-ring absolute inset-0 w-full h-full" viewBox="0 0 180 180" style={{ opacity: 0.5 }}>
                      <circle cx="90" cy="90" r="86" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 4"/>
                      <defs>
                        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E8C97A" stopOpacity="0.8"/>
                          <stop offset="50%" stopColor="#7BA7D4" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#E8C97A" stopOpacity="0.8"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-3 rounded-full overflow-hidden" style={{ border: '1px solid rgba(123,167,212,0.2)' }}>
                      <img
                        src="/profile.png"
                        alt="G S S Surya Prakash"
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/176x176/060D1F/E8C97A?text=GSS'; }}
                      />
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-2 right-2 w-3 h-3" style={{ borderTop: '1px solid rgba(232,201,122,0.5)', borderRight: '1px solid rgba(232,201,122,0.5)' }} />
                    <div className="absolute bottom-2 left-2 w-3 h-3" style={{ borderBottom: '1px solid rgba(232,201,122,0.5)', borderLeft: '1px solid rgba(232,201,122,0.5)' }} />
                  </div>
                </div>

                {/* Stats */}
                <div className="w-full grid grid-cols-2 gap-1">
                  {[
                    { label: 'CGPA', value: '8.73' },
                    { label: 'Projects', value: '6+' },
                    { label: 'Internships', value: '1' },
                    { label: 'Clubs', value: '2+' },
                  ].map((stat, i) => (
                    <AnimCounter key={i} value={stat.value} label={stat.label} />
                  ))}
                </div>

                {/* Skill level bars */}
                <div className="w-full p-5" style={{ background: 'rgba(8,14,30,0.75)', border: '1px solid rgba(120,150,210,0.12)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(160,180,220,0.4)' }}>skill_proficiency</span>
                    <span className="font-mono text-[9px]" style={{ color: '#E8C97A', opacity: 0.7 }}>v3.0</span>
                  </div>
                  {[
                    { name: 'Full Stack', pct: 88 },
                    { name: 'AI / ML', pct: 72 },
                    { name: 'DevOps', pct: 60 },
                    { name: 'Networking', pct: 65 },
                  ].map((bar, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-mono text-[9px]" style={{ color: 'rgba(160,180,220,0.45)' }}>{bar.name}</span>
                        <span className="font-mono text-[9px]" style={{ color: 'rgba(180,160,100,0.6)' }}>{bar.pct}%</span>
                      </div>
                      <div className="h-1 rounded-none" style={{ background: 'rgba(120,150,210,0.1)' }}>
                        <div className="h-full progress-bar" style={{ '--target-width': `${bar.pct}%`, background: `linear-gradient(90deg, rgba(180,160,100,0.7), rgba(232,201,122,0.9))` } as React.CSSProperties} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom marquee */}
          <div className="absolute bottom-0 left-0 right-0 py-2.5 overflow-hidden" style={{ borderTop: '1px solid rgba(123,167,212,0.07)', background: 'rgba(4,8,20,0.85)' }}>
            <div className="flex whitespace-nowrap">
              <div className="marquee-track flex gap-8 font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(123,167,212,0.18)' }}>
                {Array(10).fill(['FULL_STACK_DEV', '·', 'AI_ENTHUSIAST', '·', 'CSE_UNDERGRAD', '·', 'OPEN_TO_WORK', '·', 'PES_UNIVERSITY', '·', 'BENGALURU', '·']).flat().map((item, i) => (
                  <span key={i} style={item === '·' ? { color: 'rgba(180,160,100,0.18)' } : {}}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== ABOUT ====== */}
        <section id="about" className="py-28 px-6 relative">
          <div className="section-watermark">About</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="02" sub="background">About Me</SectionTitle>
            <div className="grid lg:grid-cols-5 gap-0" style={{ border: '1px solid rgba(120,150,210,0.1)' }}>
              {/* Left metadata panel */}
              <div className="lg:col-span-2 p-8 flex flex-col gap-6" style={{ background: 'rgba(8,14,30,0.7)', borderRight: '1px solid rgba(120,150,210,0.1)' }}>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest mb-4" style={{ color: 'rgba(180,160,100,0.4)' }}>// profile.json</div>
                  <div className="font-mono text-[11px] space-y-1.5" style={{ color: 'rgba(160,180,220,0.5)' }}>
                    <p style={{ color: 'rgba(123,167,212,0.3)' }}>{'{'}</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"name":</span> <span style={{ color: 'rgba(232,201,122,0.7)' }}>"Surya Prakash"</span>,</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"role":</span> <span style={{ color: 'rgba(232,201,122,0.7)' }}>"CSE Student"</span>,</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"uni":</span> <span style={{ color: 'rgba(232,201,122,0.7)' }}>"PES University"</span>,</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"cgpa":</span> <span style={{ color: '#E8C97A' }}>8.73</span>,</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"year":</span> <span style={{ color: '#E8C97A' }}>3</span>,</p>
                    <p className="pl-4"><span style={{ color: 'rgba(123,167,212,0.4)' }}>"open_to_work":</span> <span style={{ color: '#6DBE8A' }}>true</span></p>
                    <p style={{ color: 'rgba(123,167,212,0.3)' }}>{'}'}</p>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'rgba(15,25,50,0.5)', border: '1px solid rgba(180,160,100,0.12)' }}>
                  <div className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: 'rgba(180,160,100,0.4)' }}>// achievements</div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#E8C97A', fontSize: '0.75rem' }}>★</span>
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(160,180,220,0.5)' }}>Prof. CNR Scholarship — Top 20% (Sem 1, 3, 4)</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="divider mb-4" />
                  <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(123,167,212,0.2)' }}>BLR · KA · IN · UTC+5:30</div>
                </div>
              </div>
              {/* Right bio */}
              <div className="lg:col-span-3 p-8" style={{ background: 'rgba(6,13,31,0.5)' }}>
                <div className="mb-5 font-mono text-[9px]" style={{ color: 'rgba(160,180,220,0.35)' }}>
                  <span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> cat bio.txt
                </div>
                <p className="font-mono text-[11px] leading-loose mb-8" style={{ color: 'rgba(160,180,220,0.5)' }}>{portfolioData.bio}</p>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { label: 'CGPA', value: '8.73', note: '0x0889' },
                    { label: 'Projects', value: '6+', note: '0x0006' },
                    { label: 'Clubs', value: '2+', note: '0x0002' },
                  ].map((s, i) => (
                    <div key={i} className="p-4 text-center" style={{ background: 'rgba(10,18,40,0.6)', border: '1px solid rgba(120,150,210,0.1)' }}>
                      <div className="font-mono text-[8px] mb-1" style={{ color: 'rgba(123,167,212,0.2)' }}>{s.note}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: '#E8C97A', lineHeight: 1, fontWeight: 700 }}>{s.value}</div>
                      <div className="font-mono text-[8px] uppercase tracking-[0.2em] mt-1" style={{ color: 'rgba(160,180,220,0.3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SKILLS ====== */}
        <section id="skills" className="py-28 px-6 relative">
          <div className="section-watermark">Stack</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="03" sub="technologies">My Tech Stack</SectionTitle>
            <div className="mb-5 font-mono text-[10px]" style={{ color: 'rgba(123,167,212,0.3)' }}>
              <span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> ls /usr/local/skills/
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-px" style={{ background: 'rgba(120,150,210,0.06)' }}>
              {portfolioData.skills.map(skill => (
                <div key={skill.name} style={{ background: '#060D1F' }}>
                  <SkillIcon {...skill} />
                </div>
              ))}
            </div>
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                { cat: 'Frontend', techs: 'React · HTML5 · CSS3 · Tailwind · JavaScript' },
                { cat: 'Backend', techs: 'Node.js · Express · Python · FastAPI · RASA' },
                { cat: 'Databases & Tools', techs: 'MongoDB · MySQL · Firebase · Git · Docker' },
              ].map((row, i) => (
                <div key={i} className="p-4" style={{ background: 'rgba(10,18,40,0.55)', border: '1px solid rgba(120,150,210,0.1)' }}>
                  <div className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: '#E8C97A', opacity: 0.7 }}>// {row.cat}</div>
                  <div className="font-mono text-[10px]" style={{ color: 'rgba(160,180,220,0.45)' }}>{row.techs}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== EXPERIENCE ====== */}
        <section id="experience" className="py-28 px-6 relative">
          <div className="section-watermark">Journey</div>
          <div className="container mx-auto max-w-4xl">
            <SectionTitle num="04" sub="timeline">Education & Experience</SectionTitle>
            <div className="mb-6 font-mono text-[10px]" style={{ color: 'rgba(123,167,212,0.3)' }}>
              <span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> git log --oneline --graph career.json
            </div>
            <div className="relative">
              {portfolioData.experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} index={index} total={portfolioData.experiences.length} />
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECTS ====== */}
        <section id="projects" className="py-28 px-6 relative">
          <div className="section-watermark">Work</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="05" sub="portfolio">Featured Projects</SectionTitle>
            <div className="flex items-center gap-4 mb-8 -mt-8">
              <span className="font-mono text-[9px]" style={{ color: 'rgba(123,167,212,0.3)' }}>
                <span style={{ color: 'rgba(180,160,100,0.45)' }}>$</span> find ./projects -type d | wc -l → {portfolioData.projects.length} found
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(120,150,210,0.08)' }} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(120,150,210,0.07)' }}>
              {portfolioData.projects.map((project, index) => (
                <div key={index} style={{ background: '#060D1F' }}>
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CONTACT ====== */}
        <section id="contact" className="py-28 px-6 relative">
          <div className="section-watermark">Hello</div>
          <div className="container mx-auto max-w-3xl">
            <SectionTitle num="06" sub="reach out">Connect With Me</SectionTitle>
            <CodeBlock title="contact.sh" lang="bash" className="mb-0">
              <div className="space-y-1 font-mono text-[11px] mb-7" style={{ color: 'rgba(160,180,220,0.45)' }}>
                <p><span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> ping {portfolioData.contactEmail}</p>
                <p><span style={{ color: 'rgba(123,167,212,0.35)' }}>→</span> PING successful — host is alive</p>
                <p><span style={{ color: 'rgba(180,160,100,0.5)' }}>$</span> cat contact.json <span className="blink-cursor" /></p>
              </div>
              <div className="grid sm:grid-cols-2 gap-px mb-7" style={{ background: 'rgba(120,150,210,0.06)' }}>
                {[
                  { icon: <svg className="w-4 h-4" style={{ color: '#E8C97A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: 'Location', value: portfolioData.location },
                  { icon: <svg className="w-4 h-4" style={{ color: '#E8C97A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: 'Email', value: <a href={`mailto:${portfolioData.contactEmail}`} style={{ color: 'rgba(180,200,240,0.65)' }} className="hover:text-yellow-200 transition-colors">{portfolioData.contactEmail}</a> },
                  { icon: <svg className="w-4 h-4" style={{ color: '#E8C97A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: 'Phone', value: portfolioData.phone },
                  { icon: <svg className="w-4 h-4" style={{ color: '#6DBE8A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Status', value: <span style={{ color: '#6DBE8A', fontWeight: 600 }}>● Open to Opportunities</span> },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#060D1F' }}>
                    <ContactCard {...item} />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: portfolioData.socials.github, label: 'github' },
                  { href: portfolioData.socials.linkedin, label: 'linkedin' },
                  { href: `mailto:${portfolioData.contactEmail}`, label: 'email' },
                  { href: `tel:${portfolioData.phone}`, label: 'phone' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-150"
                    style={{ border: '1px solid rgba(120,150,210,0.15)', color: 'rgba(160,180,220,0.45)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,201,122,0.35)'; (e.currentTarget as HTMLElement).style.color = '#E8C97A'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,201,122,0.04)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(120,150,210,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,180,220,0.45)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    ↗ {s.label}
                  </a>
                ))}
              </div>
            </CodeBlock>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10" style={{ background: 'rgba(4,8,20,0.95)', borderTop: '1px solid rgba(120,150,210,0.08)' }}>
        <div className="footer-line" />
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl">
          <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(160,180,220,0.2)' }}>
            <span style={{ color: 'rgba(232,201,122,0.35)' }}>{portfolioData.name}</span> © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full status-dot" style={{ background: '#6DBE8A' }} />
            <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(160,180,220,0.2)' }}>
              Built with React · TypeScript · Tailwind
            </p>
          </div>
          <p className="font-mono text-[9px]" style={{ color: 'rgba(120,150,210,0.15)' }}>
            uptime: 100% // no 404s
          </p>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-9 h-9 flex items-center justify-center font-mono text-xs transition-all duration-150 z-40"
        style={{ border: '1px solid rgba(120,150,210,0.2)', color: 'rgba(160,180,220,0.5)', background: 'rgba(8,14,30,0.85)', backdropFilter: 'blur(8px)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,201,122,0.4)'; (e.currentTarget as HTMLElement).style.color = '#E8C97A'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(120,150,210,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(160,180,220,0.5)'; }}>
        ↑
      </button>
    </div>
  );
}

export default App;
