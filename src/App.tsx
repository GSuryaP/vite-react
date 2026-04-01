import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase
} from "react-icons/si";

/* ─── TYPES ─── */
interface Skill { name: string; icon: React.ReactNode; level: number; }
interface Project {
  title: string; description: string; icon: React.ReactNode;
  tags: string[]; liveUrl?: string; repoUrl?: string; year: string; category: string;
}
interface Experience {
  title: string; company: string; period: string;
  type: string; description: string[]; technologies: string[];
}

/* ─── MAGNETIC CURSOR ─── */
const MagneticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (dotRef.current) { dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`; }
      if (ringRef.current) { ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`; }
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    const expand = () => { if (ringRef.current) { ringRef.current.style.width = '50px'; ringRef.current.style.height = '50px'; ringRef.current.style.opacity = '0.5'; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; ringRef.current.style.opacity = '0.35'; } };
    document.querySelectorAll('a,button,[data-magnetic]').forEach(el => { el.addEventListener('mouseenter', expand); el.addEventListener('mouseleave', shrink); });

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 8, height: 8, borderRadius: '50%', background: '#1a3a2a', pointerEvents: 'none', zIndex: 9999, transition: 'background 0.2s' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #1a3a2a', pointerEvents: 'none', zIndex: 9998, opacity: 0.35, transition: 'width 0.3s, height 0.3s, opacity 0.3s' }} />
    </>
  );
};

/* ─── NOISE TEXTURE OVERLAY ─── */
const NoiseOverlay: React.FC = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    opacity: 0.35,
  }} />
);

/* ─── SCROLL PROGRESS BAR ─── */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 100, background: 'rgba(26,58,42,0.08)' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #1a3a2a, #c9a96e)', transition: 'width 0.1s' }} />
    </div>
  );
};

/* ─── ANIMATED COUNTER ─── */
const Counter: React.FC<{ end: string; label: string; prefix?: string }> = ({ end, label, prefix = '' }) => {
  const [val, setVal] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const num = parseFloat(end.replace(/[^0-9.]/g, ''));
    const suffix = end.replace(/[0-9.]/g, '');
    let start = 0;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const duration = 1400;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = eased * num;
        setVal(Number.isInteger(num) ? Math.round(current).toString() + suffix : current.toFixed(2) + suffix);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, color: '#1a3a2a', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {prefix}{val}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a7a65', marginTop: '0.4rem' }}>{label}</div>
    </div>
  );
};

/* ─── REVEAL ON SCROLL ─── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }> = ({ children, delay = 0, className = '', style = {} }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
};

/* ─── TYPING EFFECT ─── */
const useTyping = (texts: string[], speed = 80, pause = 2200) => {
  const [txt, setTxt] = useState('');
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    const t = setTimeout(() => {
      if (!del) {
        if (ci < cur.length) { setTxt(cur.slice(0, ci + 1)); setCi(c => c + 1); }
        else setTimeout(() => setDel(true), pause);
      } else {
        if (ci > 0) { setTxt(cur.slice(0, ci - 1)); setCi(c => c - 1); }
        else { setDel(false); setTi(i => (i + 1) % texts.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, ti, texts, speed, pause]);
  return txt;
};

/* ─── PARALLAX SECTION WRAPPER ─── */
const Parallax: React.FC<{ children: React.ReactNode; speed?: number; className?: string }> = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return <div ref={ref} className={className}>{children}</div>;
};

/* ─── MARQUEE ─── */
const Marquee: React.FC<{ items: string[]; speed?: number; reverse?: boolean }> = ({ items, speed = 30, reverse = false }) => {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-block', animation: `marquee${reverse ? 'Rev' : ''} ${speed}s linear infinite` }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-block', padding: '0 2.5rem', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontStyle: i % 2 === 0 ? 'italic' : 'normal', fontWeight: 300, color: '#5a4a38', letterSpacing: '0.05em' }}>
            {item} <span style={{ color: '#c9a96e', fontStyle: 'normal' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── PROJECT CARD ─── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={index * 80}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? '#fff' : 'rgba(255,252,245,0.7)',
          border: '1px solid rgba(26,58,42,0.1)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: hov ? '0 20px 60px rgba(26,58,42,0.12), 0 2px 8px rgba(26,58,42,0.06)' : '0 2px 12px rgba(26,58,42,0.04)',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          cursor: 'default',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
        {/* Top colored strip */}
        <div style={{ height: '3px', background: index % 3 === 0 ? 'linear-gradient(90deg,#1a3a2a,#2d6a4f)' : index % 3 === 1 ? 'linear-gradient(90deg,#c9a96e,#e8c88a)' : 'linear-gradient(90deg,#8a3a2a,#c05a3a)', transition: 'opacity 0.3s', opacity: hov ? 1 : 0.5 }} />
        {/* Icon + year row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.5rem 1.5rem 0' }}>
          <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,58,42,0.06)', borderRadius: '4px', transition: 'all 0.3s', transform: hov ? 'scale(1.05)' : 'scale(1)' }}>
            {project.icon}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8a7a65' }}>{project.category}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: '#c9a96e', fontStyle: 'italic' }}>{project.year}</div>
          </div>
        </div>
        <div style={{ padding: '1rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 600, color: '#1a2416', letterSpacing: '-0.01em', marginBottom: '0.5rem', lineHeight: 1.2 }}>{project.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#6a5d4e', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 10px', background: 'rgba(26,58,42,0.07)', color: '#1a3a2a', border: '1px solid rgba(26,58,42,0.1)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0.6rem', background: '#1a3a2a', color: '#f5f0e8', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d6a4f'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a3a2a'}>
                View Live
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0.6rem', border: '1px solid rgba(26,58,42,0.25)', color: '#1a3a2a', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a3a2a'; (e.currentTarget as HTMLElement).style.color = '#f5f0e8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1a3a2a'; }}>
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ─── EXPERIENCE ITEM ─── */
const ExperienceItem: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal delay={index * 100}>
      <div style={{ borderBottom: '1px solid rgba(26,58,42,0.12)', overflow: 'hidden' }}>
        <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(0.75rem,1.5vw,0.9rem)', fontStyle: 'italic', color: '#c9a96e', flexShrink: 0, minWidth: '5rem' }}>{exp.period}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem,2.5vw,1.35rem)', fontWeight: 600, color: '#1a2416', lineHeight: 1.2 }}>{exp.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#8a7a65', marginTop: '0.2rem' }}>{exp.company}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '3px 10px', background: open ? '#1a3a2a' : 'rgba(26,58,42,0.07)', color: open ? '#f5f0e8' : '#1a3a2a', transition: 'all 0.3s' }}>{exp.type}</span>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: '#1a3a2a', fontSize: '1.2rem', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</div>
          </div>
        </button>
        <div style={{ height: open ? 'auto' : 0, overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)', opacity: open ? 1 : 0, paddingBottom: open ? '1.5rem' : 0 }}>
          <div style={{ paddingLeft: 'clamp(0px,6vw,7.5rem)', paddingRight: '2.5rem' }}>
            {exp.description.map((pt, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#6a5d4e', lineHeight: 1.7, marginBottom: '0.5rem' }}>{pt}</p>
            ))}
            {exp.technologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                {exp.technologies.map((tech, i) => (
                  <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 10px', background: 'rgba(201,169,110,0.12)', color: '#8a6a30', border: '1px solid rgba(201,169,110,0.3)' }}>{tech}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ─── SKILL BAR ─── */
const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(26,58,42,0.07)', opacity: animated ? 1 : 0, transform: animated ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 50}ms` }}>
      <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{skill.icon}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#3a2e24', minWidth: '80px', letterSpacing: '0.03em' }}>{skill.name}</div>
      <div style={{ flex: 1, height: '2px', background: 'rgba(26,58,42,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: animated ? `${skill.level}%` : '0%', background: 'linear-gradient(90deg,#1a3a2a,#c9a96e)', transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${index * 60 + 200}ms`, borderRadius: '1px' }} />
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontStyle: 'italic', color: '#c9a96e', minWidth: '2.5rem', textAlign: 'right' }}>{skill.level}%</div>
    </div>
  );
};

/* ─── MAIN APP ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const typingTexts = ['Full Stack Developer', 'AI Enthusiast', 'SDN Researcher', 'Open Source Contributor', 'Problem Solver'];
  const typedText = useTyping(typingTexts, 75, 2000);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const sp = window.scrollY + window.innerHeight * 0.4;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && sp >= el.offsetTop && sp < el.offsetTop + el.offsetHeight) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── DATA ── */
  const name = "Gonella Siva Sai Surya Prakash";
  const tagline = "CSE Undergrad · AI Enthusiast · Bengaluru, India";
  const bio = "I am a passionate Computer Science Engineering student at PES University, Bengaluru, with a strong foundation in full-stack development and emerging technologies. Currently in my third year, I've developed expertise in modern web technologies, machine learning, and cloud computing through both academic projects and self-directed learning. My journey in tech began with curiosity about how applications work behind the scenes, which led me to explore everything from responsive front-end interfaces to robust backend architectures. I thrive in collaborative environments and have experience working in agile teams during hackathons and group projects. I'm particularly interested in the intersection of AI and web development, and I'm actively contributing to open-source projects while seeking internship opportunities where I can apply my skills to solve real-world problems and continue growing as a developer.";
  const contactEmail = "gonellasurya2005@gmail.com";
  const phone = "+91 9880410689";
  const location = "Bengaluru, Karnataka, India";
  const resumeUrl = "/GonellaSuryaPrakash_Resume.pdf";
  const socials = { linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/", github: "https://github.com/GSuryaP" };

  const skills: Skill[] = [
    { name: "Python", icon: <SiPython color="#3776AB" size={22} />, level: 88 },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={22} />, level: 85 },
    { name: "React", icon: <SiReact color="#61DAFB" size={22} />, level: 82 },
    { name: "Node.js", icon: <SiNodedotjs color="#339933" size={22} />, level: 80 },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" size={22} />, level: 75 },
    { name: "MySQL", icon: <SiMysql color="#4479A1" size={22} />, level: 72 },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={22} />, level: 78 },
    { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" size={22} />, level: 84 },
    { name: "Git", icon: <SiGit color="#F05032" size={22} />, level: 80 },
    { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={22} />, level: 70 },
  ];

  const otherSkills = [
    { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={20} /> },
    { name: "CSS3", icon: <SiCss color="#1572B6" size={20} /> },
    { name: "Express", icon: <SiExpress color="#3a2e24" size={20} /> },
    { name: "GitHub", icon: <SiGithub color="#3a2e24" size={20} /> },
    { name: "C", icon: <SiC color="#00599C" size={20} /> },
    { name: "RASA", icon: <img src="/rasa.jpg" alt="RASA" style={{ width: 20, height: 20, objectFit: 'cover' }} /> },
  ];

  const experiences: Experience[] = [
    { title: "Computer Science Engineering Student", company: "PES University, Bengaluru", period: "2023 — Present", type: "Education", description: ["Pursuing B.Tech in Computer Science and Engineering, maintaining a CGPA of 8.73 through my 5th semester. Honored with the Prof. CNR Scholarship for Semesters 1, 3, and 4 — awarded to the top 20% of the class. Actively participating in campus life as a member of multiple clubs."], technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"] },
    { title: "Research Intern", company: "Center of Computer Networks and CyberSecurity (CCNCS)", period: "June – July 2025", type: "Internship", description: ["Developed an intelligent SDN management system by integrating the ONOS distributed controller cluster using Mininet with a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection through REST APIs and a visualization dashboard."], technologies: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"] },
    { title: "Logistics Head", company: "Equinox — The Space Club, PESU ECC", period: "May 2025 — Present", type: "Leadership", description: ["Oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and other club activities with efficient logistical support and timely operations."], technologies: [] },
    { title: "SMCC Head", company: "Equinox — The Space Club, PESU ECC", period: "Sep 2024 – May 2025", type: "Leadership", description: ["Managed digital outreach by designing engaging social media posts, running campaigns, and creating content to promote club events and increase engagement across platforms."], technologies: [] },
  ];

  const projects: Project[] = [
    { title: "RASA-Driven SDN Tool", description: "A conversational AI assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated full SDN networks using Mininet.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><circle cx="12" cy="5" r="2" stroke="#1a3a2a" strokeWidth="1.8"/><circle cx="5" cy="19" r="2" stroke="#1a3a2a" strokeWidth="1.8"/><circle cx="19" cy="19" r="2" stroke="#1a3a2a" strokeWidth="1.8"/><path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, tags: ["RASA", "ONOS", "Mininet", "Python", "REST APIs"], repoUrl: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot", year: "2025", category: "Research" },
    { title: "Distributed Image Pipeline", description: "Distributed image processing using Apache Kafka for async communication between FastAPI master node and PIL-based workers, with real-time heartbeat monitoring dashboard.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><rect x="9" y="9" width="6" height="6" rx="1" stroke="#1a3a2a" strokeWidth="1.8"/><rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#c9a96e" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="9" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#c9a96e" strokeWidth="1.5"/><line x1="6" y1="12" x2="9" y2="12" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/><rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#c9a96e" strokeWidth="1.5"/><line x1="18" y1="12" x2="15" y2="12" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags: ["Kafka", "FastAPI", "Python", "Docker"], repoUrl: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline", year: "2025", category: "Systems" },
    { title: "GitHub Repo Tracker", description: "Interactive dashboard for tracking repositories, commits, and open issues in real time. Features live search, stats overview, and an aurora-style animated background powered by a Node.js API.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482v-1.703c-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" stroke="#1a3a2a" strokeWidth="1.2" fill="none"/></svg>, tags: ["Node.js", "JavaScript", "GitHub API"], repoUrl: "https://github.com/GSuryaP/Github-Repository-Tracker", year: "2024", category: "Web" },
    { title: "Finance Analytics Dashboard", description: "A FinTech analytics dashboard for managing personal transactions with CRUD operations, dynamic Recharts visualizations, dark/light mode, and auto-recalculated financial metrics.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><rect x="3" y="12" width="3" height="9" rx="1" stroke="#c9a96e" strokeWidth="1.8"/><rect x="8" y="8" width="3" height="13" rx="1" stroke="#c9a96e" strokeWidth="1.8"/><rect x="13" y="5" width="3" height="16" rx="1" stroke="#1a3a2a" strokeWidth="1.8"/><rect x="18" y="9" width="3" height="12" rx="1" stroke="#1a3a2a" strokeWidth="1.8"/></svg>, tags: ["React", "Vite", "Tailwind", "Recharts"], repoUrl: "https://github.com/GSuryaP/Personal-Finance-Dashboard", year: "2024", category: "Web" },
    { title: "AdaptiveLearn AI", description: "AI-powered teacher analytics on AWS free-tier. Reads student CSV data via Lambda, uses Amazon Bedrock Titan for LLM-driven insights on struggling students and weak topics.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#1a3a2a" strokeWidth="1.5"/><path d="M9 12h6M9 14.5h4" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags: ["AWS Lambda", "S3", "Bedrock", "Python"], repoUrl: "https://github.com/GSuryaP/AdaptiveLearn-AI", year: "2024", category: "AI/ML" },
    { title: "Weather & AQI Tracker", description: "A Tkinter-based desktop application displaying comprehensive environmental data including Air Quality Index and detailed weather via OpenWeatherMap API with smart city validation.", icon: <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}><circle cx="12" cy="10" r="4" stroke="#1a3a2a" strokeWidth="2"/><path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round"/></svg>, tags: ["Python", "Tkinter", "OpenWeatherMap", "GUI"], repoUrl: "https://github.com/GSuryaP/Weather-AQI_Tracker", year: "2024", category: "Desktop" },
  ];

  const navLinks = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' }, { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }, { id: 'contact', label: 'Contact' },
  ];

  const marqueeItems = ['Full Stack Development', 'AI & Machine Learning', 'SDN Research', 'Cloud Computing', 'Open Source', 'PES University', 'CSE 2027'];

  return (
    <div style={{ background: '#faf7f2', color: '#1a2416', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', cursor: 'none', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { cursor: none; }
        a { cursor: none; }
        button { cursor: none; }
        ::selection { background: rgba(201,169,110,0.25); color: #1a2416; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #faf7f2; }
        ::-webkit-scrollbar-thumb { background: rgba(26,58,42,0.25); }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes marqueeRev { from { transform: translateX(-25%); } to { transform: translateX(0); } }

        @keyframes heroFadeIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .hero-line-1 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-line-2 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-line-3 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.6s both; }
        .hero-line-4 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.8s both; }
        .hero-line-5 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 1.0s both; }
        .hero-line-6 { animation: heroFadeIn 1s cubic-bezier(0.22,1,0.36,1) 1.2s both; }

        @keyframes lineExpand { from { width:0; } to { width: 100%; } }
        .hero-divider { animation: lineExpand 1.5s cubic-bezier(0.22,1,0.36,1) 0.5s both; }

        @keyframes subtlePulse { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.02); } }
        .pulse-bg { animation: subtlePulse 6s ease-in-out infinite; }

        @keyframes rotateSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .rotate-slow { animation: rotateSlow 20s linear infinite; }

        @keyframes floatUp { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        .float { animation: floatUp 5s ease-in-out infinite; }

        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .shimmer-text {
          background: linear-gradient(90deg, #1a3a2a 0%, #c9a96e 40%, #1a3a2a 60%, #c9a96e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .nav-link { position:relative; overflow:hidden; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:#1a3a2a; transition:width 0.3s cubic-bezier(0.22,1,0.36,1); }
        .nav-link:hover::after, .nav-link.active::after { width:100%; }
        .nav-link.active { color: #1a3a2a !important; }

        .card-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:1.5px; background:rgba(26,58,42,0.08); }
        .card-cell { background:#faf7f2; }

        @media (max-width:768px) {
          .card-grid { grid-template-columns:1fr; }
          .hero-name { font-size:clamp(2.8rem,12vw,5rem) !important; }
        }

        /* Large editorial background numbers */
        .editorial-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(8rem, 20vw, 18rem);
          font-weight: 300;
          color: rgba(26,58,42,0.04);
          line-height: 1;
          position: absolute;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
        }
      `}</style>

      <MagneticCursor />
      <NoiseOverlay />
      <ScrollProgress />

      {/* ── NAVBAR ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,58,42,0.08)' : '1px solid transparent',
        transition: 'all 0.4s',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem', height: scrolled ? '60px' : '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'height 0.4s' }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: '#1a2416', letterSpacing: '-0.02em', lineHeight: 1 }}>GSS</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: '#c9a96e', letterSpacing: '0.02em' }}>·dev</span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`} className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: activeSection === link.id ? '#1a2416' : '#8a7a65', textDecoration: 'none', transition: 'color 0.3s', padding: '0.2rem 0' }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href={resumeUrl} download style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#faf7f2', background: '#1a3a2a', padding: '0.55rem 1.4rem', textDecoration: 'none', transition: 'background 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d6a4f'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a3a2a'}>
              Résumé
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: '#faf7f2' }}>
          {/* Large decorative background circle */}
          <div className="pulse-bg" style={{ position: 'absolute', right: '-15vw', top: '50%', transform: 'translateY(-50%)', width: 'clamp(400px,60vw,900px)', height: 'clamp(400px,60vw,900px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, rgba(26,58,42,0.04) 50%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Rotating dashed circle */}
          <div className="rotate-slow" style={{ position: 'absolute', right: 'clamp(-100px,-5vw,0px)', top: '50%', transform: 'translateY(-50%) rotate(0deg)', width: 'clamp(350px,45vw,700px)', height: 'clamp(350px,45vw,700px)', borderRadius: '50%', border: '1px dashed rgba(26,58,42,0.1)', pointerEvents: 'none' }} />

          {/* Thin accent lines */}
          <div style={{ position: 'absolute', left: 0, top: '50%', width: '3px', height: '40vh', background: 'linear-gradient(to bottom, transparent, #1a3a2a, transparent)', transform: 'translateY(-50%)' }} />

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(6rem,10vw,8rem) 2.5rem 4rem', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 4rem', alignItems: 'center' }}>
              {/* Vertical label */}
              <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>Portfolio 2025</span>
                <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(26,58,42,0.25))' }} />
              </div>

              <div>
                {/* Eyebrow */}
                <div className="hero-line-1" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '24px', height: '1px', background: '#c9a96e' }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontStyle: 'italic', color: '#c9a96e', letterSpacing: '0.08em' }}>Computer Science Engineering</span>
                </div>

                {/* Name */}
                <h1 className="hero-line-2 hero-name" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.2rem,8vw,7rem)', fontWeight: 600, lineHeight: 0.92, letterSpacing: '-0.03em', color: '#1a2416', marginBottom: '1.2rem' }}>
                  Gonella<br />
                  <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Surya</span>{' '}
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    Prakash
                    <svg style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '8px', overflow: 'visible' }} viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d="M0 6 Q25 2 50 5 Q75 8 100 4" stroke="#c9a96e" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                </h1>

                {/* Divider */}
                <div className="hero-divider" style={{ height: '1px', background: 'rgba(26,58,42,0.15)', marginBottom: '1.5rem', maxWidth: '600px' }} />

                {/* Typing role */}
                <div className="hero-line-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#8a7a65' }}>Currently:</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', color: '#1a3a2a', fontWeight: 500 }}>{typedText}<span style={{ animation: 'heroFadeIn 0.8s step-end infinite', display: 'inline-block', width: '2px', height: '1.2em', background: '#c9a96e', verticalAlign: 'middle', marginLeft: '2px' }} /></span>
                </div>

                {/* Tagline */}
                <p className="hero-line-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(0.85rem,1.5vw,1rem)', color: '#6a5d4e', lineHeight: 1.7, maxWidth: '520px', marginBottom: '2.5rem' }}>
                  {tagline} — Passionate about building the intersection of AI and modern web, one commit at a time.
                </p>

                {/* CTAs */}
                <div className="hero-line-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                  <a href="#projects" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '0.9rem 2.4rem', background: '#1a3a2a', color: '#f5f0e8', textDecoration: 'none', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2d6a4f'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1a3a2a'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}>
                    View Projects <span>→</span>
                  </a>
                  <a href={resumeUrl} download style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '0.9rem 2.4rem', border: '1px solid rgba(26,58,42,0.3)', color: '#1a3a2a', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a3a2a'; (e.currentTarget as HTMLElement).style.color = '#f5f0e8'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1a3a2a'; }}>
                    Download Résumé
                  </a>
                </div>

                {/* Socials */}
                <div className="hero-line-6" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  {[
                    { href: socials.github, label: 'GitHub', path: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor" />, fill: true },
                    { href: socials.linkedin, label: 'LinkedIn', path: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />, fill: true },
                    { href: `mailto:${contactEmail}`, label: 'Email', path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, fill: false },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#8a7a65', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a3a2a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8a7a65'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={s.fill ? 'currentColor' : 'none'} stroke={!s.fill ? 'currentColor' : 'none'}>{s.path}</svg>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile image — floating, right side */}
          <div className="float" style={{ position: 'absolute', right: 'clamp(-80px,2vw,80px)', top: '50%', transform: 'translateY(-50%)', width: 'clamp(200px,25vw,360px)', aspectRatio: '1', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '85%', height: '85%' }}>
              {/* Decorative frame */}
              <div style={{ position: 'absolute', inset: '-16px', border: '1px solid rgba(201,169,110,0.35)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', inset: '-8px', border: '1px solid rgba(26,58,42,0.1)', borderRadius: '50%' }} />
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#e8e4dc' }}>
                <img src="/profile.png" alt="Surya Prakash" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/360x360/e8e4dc/1a3a2a?text=GSS&font=playfair-display'; }} />
              </div>
              {/* Gold badge */}
              <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: '#1a3a2a', color: '#c9a96e', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 600, lineHeight: 1 }}>8.73</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.48rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>CGPA</span>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', animation: 'floatUp 2s ease-in-out infinite' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a7a65' }}>Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24"><rect x="5" y="1" width="6" height="14" rx="3" fill="none" stroke="#8a7a65" strokeWidth="1.2"/><circle cx="8" cy="5" r="1.5" fill="#c9a96e"><animate attributeName="cy" values="5;11;5" dur="1.8s" repeatCount="indefinite"/></circle></svg>
          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ background: '#1a3a2a', padding: '1rem 0', overflow: 'hidden', borderTop: '1px solid rgba(201,169,110,0.2)', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
          <Marquee items={marqueeItems} speed={25} />
        </div>

        {/* ══════════════════════════════
            ABOUT
        ══════════════════════════════ */}
        <section id="about" style={{ padding: 'clamp(5rem,10vw,9rem) 2.5rem', position: 'relative', overflow: 'hidden', background: '#faf7f2' }}>
          <span className="editorial-num" style={{ right: '-2rem', top: '-2rem' }}>02</span>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>About Me</span>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a2416', marginBottom: '2rem' }}>
                  Building the<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>future of tech,</span><br />one line at a time.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#6a5d4e', lineHeight: 1.85, marginBottom: '2rem' }}>{bio}</p>
              </Reveal>
              <Reveal delay={300}>
                <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(26,58,42,0.04)', borderLeft: '2px solid #c9a96e', marginBottom: '2rem' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a7a65', marginBottom: '0.4rem' }}>Achievement</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#1a2416' }}>Prof. CNR Scholarship — Top 20% of class (Semesters 1, 3 & 4)</p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[{ href: socials.github, label: '↗ GitHub' }, { href: socials.linkedin, label: '↗ LinkedIn' }, { href: `mailto:${contactEmail}`, label: '↗ Email' }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '0.55rem 1.2rem', border: '1px solid rgba(26,58,42,0.2)', color: '#1a3a2a', textDecoration: 'none', transition: 'all 0.3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a3a2a'; (e.currentTarget as HTMLElement).style.color = '#f5f0e8'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1a3a2a'; }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Stats + details */}
            <div>
              {/* Stats grid */}
              <Reveal delay={150}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(26,58,42,0.1)', marginBottom: '3rem' }}>
                  {[
                    { end: '8.73', label: 'CGPA' },
                    { end: '6+', label: 'Projects Built' },
                    { end: '1', label: 'Research Internship' },
                    { end: '3rd', label: 'Year at PESU' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: '#faf7f2', padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Counter end={s.end} label={s.label} />
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(26,58,42,0.08)' }}>
                {[
                  { label: 'University', value: 'PES University, Bengaluru' },
                  { label: 'Degree', value: 'B.Tech Computer Science Engineering' },
                  { label: 'Location', value: 'Bengaluru, Karnataka, India' },
                  { label: 'Email', value: contactEmail },
                  { label: 'Phone', value: phone },
                  { label: 'Status', value: '● Open to Opportunities', accent: true },
                ].map((item, i) => (
                  <Reveal key={i} delay={200 + i * 50}>
                    <div style={{ background: '#faf7f2', padding: '0.9rem 1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8a7a65', minWidth: '80px', flexShrink: 0 }}>{item.label}</span>
                      <span style={{ fontFamily: item.accent ? "'DM Sans', sans-serif" : "'Cormorant Garamond', serif", fontSize: item.accent ? '0.82rem' : '0.95rem', color: item.accent ? '#2d6a4f' : '#3a2e24', fontWeight: item.accent ? 500 : 400 }}>{item.value}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE 2 (reverse) ── */}
        <div style={{ background: 'rgba(26,58,42,0.04)', padding: '0.875rem 0', overflow: 'hidden', borderTop: '1px solid rgba(26,58,42,0.07)' }}>
          <Marquee items={['Python', 'React', 'Node.js', 'MongoDB', 'SDN', 'RASA', 'FastAPI', 'AWS', 'Kafka', 'Docker', 'Git', 'TypeScript']} speed={20} reverse />
        </div>

        {/* ══════════════════════════════
            SKILLS
        ══════════════════════════════ */}
        <section id="skills" style={{ padding: 'clamp(5rem,10vw,9rem) 2.5rem', position: 'relative', overflow: 'hidden', background: '#f5f0e8' }}>
          <span className="editorial-num" style={{ left: '-1rem', top: '-2rem' }}>03</span>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
              {/* Left label */}
              <div style={{ position: 'sticky', top: '6rem' }}>
                <Reveal>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>Skills</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a2416', marginBottom: '1.5rem' }}>
                    Technical<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>Proficiency</span>
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#6a5d4e', lineHeight: 1.7, marginBottom: '2rem' }}>
                    A curated set of technologies I work with daily, built through academic projects, research, and self-directed exploration.
                  </p>

                  {/* Other skills pills */}
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a7a65', marginBottom: '0.75rem' }}>Also proficient in</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {otherSkills.map((s, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', padding: '0.35rem 0.75rem', background: 'rgba(26,58,42,0.07)', color: '#3a2e24', border: '1px solid rgba(26,58,42,0.1)', letterSpacing: '0.05em' }}>
                          {s.icon} {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right: skill bars */}
              <div>
                {skills.map((skill, i) => <SkillBar key={i} skill={skill} index={i} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            EXPERIENCE
        ══════════════════════════════ */}
        <section id="experience" style={{ padding: 'clamp(5rem,10vw,9rem) 2.5rem', position: 'relative', overflow: 'hidden', background: '#faf7f2' }}>
          <span className="editorial-num" style={{ right: '-1rem', top: '-2rem' }}>04</span>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>Journey</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a2416', marginBottom: '3.5rem' }}>
                Education &amp;<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>Experience</span>
              </h2>
            </Reveal>
            {/* Accordion */}
            <div style={{ borderTop: '1px solid rgba(26,58,42,0.12)' }}>
              {experiences.map((exp, i) => <ExperienceItem key={i} exp={exp} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── FULL BLEED BANNER ── */}
        <div style={{ background: '#1a3a2a', padding: 'clamp(3rem,6vw,5rem) 2.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.08))', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(201,169,110,0.6)', marginBottom: '0.75rem' }}>Available for</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, fontStyle: 'italic', color: '#f5f0e8', letterSpacing: '-0.02em' }}>Internships &amp; Full-Time Roles</h3>
            </div>
            <a href={`mailto:${contactEmail}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '1rem 2.5rem', background: '#c9a96e', color: '#1a2416', textDecoration: 'none', fontWeight: 500, transition: 'all 0.3s', flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e8c88a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#c9a96e'}>
              Let's Collaborate →
            </a>
          </div>
        </div>

        {/* ══════════════════════════════
            PROJECTS
        ══════════════════════════════ */}
        <section id="projects" style={{ padding: 'clamp(5rem,10vw,9rem) 2.5rem', position: 'relative', overflow: 'hidden', background: '#faf7f2' }}>
          <span className="editorial-num" style={{ left: '-1rem', top: '-2rem' }}>05</span>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>Selected Work</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a2416' }}>
                    Featured<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>Projects</span>
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(26,58,42,0.12)', lineHeight: 1 }}>{projects.length}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8a7a65' }}>Total Projects</div>
                </div>
              </div>
            </Reveal>
            <div className="card-grid" style={{ background: 'rgba(26,58,42,0.08)' }}>
              {projects.map((p, i) => (
                <div key={i} className="card-cell"><ProjectCard project={p} index={i} /></div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CONTACT
        ══════════════════════════════ */}
        <section id="contact" style={{ padding: 'clamp(5rem,10vw,9rem) 2.5rem', background: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
          <span className="editorial-num" style={{ right: '-1rem', top: '-2rem' }}>06</span>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <Reveal>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#8a7a65' }}>Get In Touch</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a2416', marginBottom: '1.5rem' }}>
                  Let's build<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>something great</span><br />together.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#6a5d4e', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                  I'm actively looking for internship and full-time opportunities in software engineering, AI/ML, and full-stack development. If you have a role or project you'd like to discuss, feel free to reach out.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <a href={`mailto:${contactEmail}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontStyle: 'italic', color: '#1a3a2a', textDecoration: 'none', borderBottom: '1px solid rgba(26,58,42,0.2)', paddingBottom: '0.25rem', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c9a96e'; (e.currentTarget as HTMLElement).style.borderBottomColor = '#c9a96e'; (e.currentTarget as HTMLElement).style.transform = 'translateX(8px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#1a3a2a'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(26,58,42,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}>
                  {contactEmail} →
                </a>
              </Reveal>
            </div>

            {/* Right — contact details */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(26,58,42,0.1)' }}>
                {[
                  { icon: '📍', label: 'Location', value: location },
                  { icon: '✉️', label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
                  { icon: '📞', label: 'Phone', value: phone, href: `tel:${phone}` },
                  { icon: '💼', label: 'LinkedIn', value: 'g-s-s-surya-prakash', href: socials.linkedin },
                  { icon: '⌨️', label: 'GitHub', value: 'GSuryaP', href: socials.github },
                  { icon: '📄', label: 'Résumé', value: 'Download PDF', href: resumeUrl },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div style={{ background: '#f5f0e8', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f5f0e8'}>
                      <span style={{ fontSize: '1rem', width: '1.5rem', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#8a7a65', marginBottom: '0.15rem' }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#1a3a2a', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a96e'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#1a3a2a'}>
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#3a2e24' }}>{item.value}</span>
                        )}
                      </div>
                      {item.href && <span style={{ color: '#c9a96e', fontSize: '0.9rem' }}>↗</span>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1a3a2a', padding: '3rem 2.5rem', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: '#f5f0e8', marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
              GSS<span style={{ color: '#c9a96e', fontStyle: 'italic' }}>·dev</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(245,240,232,0.35)' }}>
              {name} © {new Date().getFullYear()}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(245,240,232,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c9a96e'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.35)'}>
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(201,169,110,0.4)' }}>
            Built with React + TypeScript
          </div>
        </div>
      </footer>

      {/* Scroll-to-top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '44px', height: '44px', background: '#1a3a2a', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', zIndex: 40 }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2d6a4f'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1a3a2a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
        ↑
      </button>
    </div>
  );
}
