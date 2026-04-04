import React, { useState, useEffect, useRef } from "react";
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase,
} from "react-icons/si";

/* ============================================================
   TYPES
============================================================ */
interface Experience {
  role: string; org: string; period: string; badge: string;
  bullets: string[]; tags: string[];
}
interface Project {
  title: string; desc: string; emoji: string;
  tags: string[]; repo?: string; live?: string;
}
interface Skill { name: string; icon: React.ReactNode; color: string; pct: number; }

type ThemeKey = "green" | "orange" | "blue" | "light";

/* ============================================================
   THEMES
============================================================ */
interface Theme {
  bg: string; bgAlt: string; bgCard: string;
  accent: string; accentDim: string;
  cyan: string; cyanDim: string;
  text: string; textMuted: string; textDim: string;
  border: string; borderHov: string;
  navBg: string; footerBg: string;
  matrixOpacity: number;
  gridOpacity: number;
  textOnAccent: string;
  isLight: boolean;
}

const THEMES: Record<ThemeKey, Theme> = {
  green: {
    bg: "#050a0e", bgAlt: "#070d12", bgCard: "rgba(0,255,136,0.03)",
    accent: "#00ff88", accentDim: "#00cc6a",
    cyan: "#00e5ff", cyanDim: "#00b8cc",
    text: "#c8ffd4", textMuted: "#4a7c59", textDim: "#2a4a35",
    border: "rgba(0,255,136,0.12)", borderHov: "rgba(0,255,136,0.35)",
    navBg: "rgba(5,10,14,0.95)", footerBg: "#050a0e",
    matrixOpacity: 0.07, gridOpacity: 0.035,
    textOnAccent: "#050a0e", isLight: false,
  },
  orange: {
    bg: "#0c0800", bgAlt: "#100d00", bgCard: "rgba(255,160,0,0.03)",
    accent: "#ff9f00", accentDim: "#cc7e00",
    cyan: "#ffcc44", cyanDim: "#e6b030",
    text: "#ffe8c0", textMuted: "#7a5a1a", textDim: "#3a2a08",
    border: "rgba(255,160,0,0.14)", borderHov: "rgba(255,160,0,0.38)",
    navBg: "rgba(12,8,0,0.95)", footerBg: "#0c0800",
    matrixOpacity: 0.06, gridOpacity: 0.03,
    textOnAccent: "#0c0800", isLight: false,
  },
  blue: {
    bg: "#00050f", bgAlt: "#020810", bgCard: "rgba(0,160,255,0.03)",
    accent: "#00aaff", accentDim: "#0088cc",
    cyan: "#44ddff", cyanDim: "#22bbdd",
    text: "#c0e0ff", textMuted: "#2a5a7a", textDim: "#0a2a3a",
    border: "rgba(0,160,255,0.14)", borderHov: "rgba(0,160,255,0.38)",
    navBg: "rgba(0,5,15,0.95)", footerBg: "#00050f",
    matrixOpacity: 0.06, gridOpacity: 0.03,
    textOnAccent: "#00050f", isLight: false,
  },
  light: {
    bg: "#f4f7f4", bgAlt: "#edf2ed", bgCard: "rgba(0,140,80,0.04)",
    accent: "#008c50", accentDim: "#006a3c",
    cyan: "#006fa8", cyanDim: "#005580",
    text: "#1a2e1f", textMuted: "#557a62", textDim: "#b0cbb8",
    border: "rgba(0,140,80,0.15)", borderHov: "rgba(0,140,80,0.4)",
    navBg: "rgba(244,247,244,0.95)", footerBg: "#edf2ed",
    matrixOpacity: 0.03, gridOpacity: 0.04,
    textOnAccent: "#ffffff", isLight: true,
  },
};

const THEME_LABELS: Record<ThemeKey, { label: string; dot: string }> = {
  green:  { label: "Green",  dot: "#00ff88" },
  orange: { label: "Orange", dot: "#ff9f00" },
  blue:   { label: "Blue",   dot: "#00aaff" },
  light:  { label: "Light",  dot: "#008c50" },
};

/* ============================================================
   PORTFOLIO DATA
============================================================ */
const DATA = {
  name:      "Gonella Siva Sai\nSurya Prakash",
  shortName: "Surya Prakash",
  role:      "Full-Stack Developer & AI Enthusiast",
  tagline:   "CSE Undergrad at PES University, Bengaluru · Building intelligent systems for the real world.",
  bio:       "I'm a third-year Computer Science Engineering student at PES University with a strong grip on full-stack development, distributed systems, and AI-powered applications. My curiosity about how software works under the hood has driven me to build everything from real-time network tools to cloud-native analytics dashboards.",
  bio2:      "I thrive in fast-paced collaborative environments — hackathons, research labs, and open-source projects. I'm actively seeking internship opportunities where I can ship meaningful products and grow alongside talented engineers.",
  cgpa:      "8.73",
  email:     "gonellasurya2005@gmail.com",
  phone:     "+91 9880410689",
  location:  "Bengaluru, Karnataka, India",
  github:    "https://github.com/GSuryaP",
  linkedin:  "https://linkedin.com/in/g-s-s-surya-prakash/",
  resume:    "/GonellaSuryaPrakash_Resume.pdf",

  skills: [
    { name: "Python",     icon: <SiPython />,      color: "#3776AB", pct: 90 },
    { name: "JavaScript", icon: <SiJavascript />,  color: "#F7DF1E", pct: 85 },
    { name: "React",      icon: <SiReact />,       color: "#61DAFB", pct: 82 },
    { name: "Node.js",    icon: <SiNodedotjs />,   color: "#339933", pct: 80 },
    { name: "Express",    icon: <SiExpress />,     color: "#888888", pct: 78 },
    { name: "MongoDB",    icon: <SiMongodb />,     color: "#47A248", pct: 75 },
    { name: "MySQL",      icon: <SiMysql />,       color: "#4479A1", pct: 73 },
    { name: "HTML5",      icon: <SiHtml5 />,       color: "#E34F26", pct: 92 },
    { name: "CSS3",       icon: <SiCss />,         color: "#1572B6", pct: 88 },
    { name: "Tailwind",   icon: <SiTailwindcss />, color: "#06B6D4", pct: 86 },
    { name: "C++",        icon: <SiCplusplus />,   color: "#00599C", pct: 77 },
    { name: "C",          icon: <SiC />,           color: "#6699cc", pct: 74 },
    { name: "Git",        icon: <SiGit />,         color: "#F05032", pct: 84 },
    { name: "GitHub",     icon: <SiGithub />,      color: "#888888", pct: 83 },
    { name: "Firebase",   icon: <SiFirebase />,    color: "#FFCA28", pct: 70 },
  ] as Skill[],

  experiences: [
    {
      role:   "B.Tech — Computer Science & Engineering",
      org:    "PES University, Bengaluru",
      period: "2023 – Present",
      badge:  "Education",
      bullets: [
        "Maintaining a CGPA of 8.73 through my 5th semester, consistently in the top tier of the batch.",
        "Awarded the Prof. CNR Scholarship for the 1st, 3rd, and 4th semesters — given to the top 20% of students.",
        "Active member of multiple technical and cultural clubs, contributing to hackathons and collaborative engineering projects.",
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
    },
    {
      role:   "Research Intern",
      org:    "Center of Computer Networks & CyberSecurity (CCNCS)",
      period: "Jun 2025 – Jul 2025",
      badge:  "Internship",
      bullets: [
        "Designed and built an intelligent SDN management system integrating the ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI.",
        "Implemented real-time network monitoring, automated flow control, and fault detection via REST APIs with a live visualization dashboard for operator insights.",
      ],
      tags: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python", "REST APIs"],
    },
    {
      role:   "Logistics Head",
      org:    "Equinox – The Space Club, PESU ECC",
      period: "May 2025 – Present",
      badge:  "Club Lead",
      bullets: [
        "Oversee end-to-end event planning for workshops, hackathons, and club activities — managing schedules, resources, and cross-functional teams.",
        "Ensure smooth logistical execution for all club-wide events, coordinating with sponsors, venues, and internal teams.",
      ],
      tags: [],
    },
    {
      role:   "Social Media & Content Creator Head",
      org:    "Equinox – The Space Club, PESU ECC",
      period: "Sep 2024 – May 2025",
      badge:  "Club Lead",
      bullets: [
        "Led digital outreach across Instagram and LinkedIn — designed visual content, managed campaigns, and grew community engagement around space-tech events.",
      ],
      tags: [],
    },
  ] as Experience[],

  projects: [
    {
      title: "RASA-Driven SDN Management Tool",
      desc:  "A conversational AI system for real-time monitoring, health checks, and fault detection of distributed SDN controllers. Integrates ONOS REST APIs with RASA NLU and Mininet network simulation for automated flow queries and troubleshooting.",
      emoji: "🕸️",
      tags:  ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
      repo:  "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
    },
    {
      title: "Distributed Image Processing Pipeline",
      desc:  "Apache Kafka-based distributed system with a FastAPI master node and multiple PIL worker nodes. Handles tile splitting, parallel processing, result aggregation, and final image reconstruction — with a live heartbeat monitoring dashboard.",
      emoji: "🖼️",
      tags:  ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker"],
      repo:  "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
    },
    {
      title: "GitHub Repository Tracker",
      desc:  "Interactive analytics dashboard for tracking GitHub repos, commits, and issues in real time. Features live search, aurora animated background, stats overview, powered by a Node.js backend and Python sync script.",
      emoji: "📊",
      tags:  ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
      repo:  "https://github.com/GSuryaP/Github-Repository-Tracker",
    },
    {
      title: "Personal Finance Analytics Dashboard",
      desc:  "FinTech React dashboard for real-time personal transaction management. Full CRUD operations, dynamic Recharts visualizations (line & pie), dark/light mode, real-time search, and auto-calculated savings rate metrics.",
      emoji: "💰",
      tags:  ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
      repo:  "https://github.com/GSuryaP/Personal-Finance-Dashboard",
    },
    {
      title: "AdaptiveLearn AI",
      desc:  "AWS-powered teacher analytics dashboard. Ingests student CSVs from S3 via Python Lambda, uses Amazon Bedrock (Titan LLM) to generate insights, and surfaces weak topics and struggling students through a clean HTML frontend — zero server cost.",
      emoji: "🧠",
      tags:  ["AWS S3", "Lambda", "Amazon Bedrock", "Python", "HTML"],
      repo:  "https://github.com/GSuryaP/AdaptiveLearn-AI",
    },
    {
      title: "Weather & AQI Tracker",
      desc:  "Tkinter desktop app that validates city names via OpenWeatherMap API and displays comprehensive environmental data — temperature, humidity, wind speed, and Air Quality Index — in a clean GUI with robust error handling.",
      emoji: "🌤️",
      tags:  ["Python", "Tkinter", "OpenWeatherMap API", "JSON"],
      repo:  "https://github.com/GSuryaP/Weather-AQI_Tracker",
    },
  ] as Project[],
};

/* ============================================================
   REVEAL HOOK
============================================================ */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ============================================================
   REVEAL WRAPPER
============================================================ */
const Reveal: React.FC<{
  children: React.ReactNode; delay?: number;
  dir?: "up" | "left" | "right"; className?: string; style?: React.CSSProperties;
}> = ({ children, delay = 0, dir = "up", className, style }) => {
  const { ref, visible } = useReveal();
  const from = dir === "left" ? "translateX(-32px)" : dir === "right" ? "translateX(32px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : from,
      transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}s, transform .65s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

/* ============================================================
   MATRIX RAIN CANVAS
============================================================ */
const MatrixRain: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / 20);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコ∑∫∂∇λπ≠≤≥∈∉∀∃";
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "13px 'Courier New', monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const a = Math.random() > 0.95 ? 1 : 0.15;
        ctx.fillStyle = a === 1 ? color : color + "26";
        ctx.fillText(ch, i * 20, y * 20);
        if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [color]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none", zIndex: 0 }} />;
};

/* ============================================================
   ANIMATED COUNTER
============================================================ */
const Counter: React.FC<{ to: string; suffix?: string; label: string; T: Theme }> = ({ to, suffix = "", label, T }) => {
  const [val, setVal] = useState("0");
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    const end = parseFloat(to); const dur = 1600;
    const run = (ts: number, t0: number) => {
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to.includes(".") ? (end * e).toFixed(2) : String(Math.floor(end * e)));
      if (p < 1) requestAnimationFrame(t => run(t, t0));
    };
    requestAnimationFrame(t => run(t, t));
  }, [visible, to]);
  return (
    <div ref={ref} style={{
      textAlign: "center", padding: "28px 16px",
      background: T.bgCard, border: `1px solid ${T.border}`, transition: "border-color .3s",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = T.borderHov}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = T.border}>
      <div style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, lineHeight: 1, marginBottom: 6,
        fontFamily: "'Share Tech Mono', 'Courier New', monospace", color: T.accent,
        textShadow: `0 0 20px ${T.accent}80` }}>
        {val}<span style={{ fontSize: "0.65em", color: T.cyan }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em",
        color: T.textMuted, fontFamily: "'Share Tech Mono', monospace" }}>{label}</div>
    </div>
  );
};

/* ============================================================
   SKILL CARD
============================================================ */
const SkillCard: React.FC<{ skill: Skill; delay: number; T: Theme }> = ({ skill, delay, T }) => {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
        transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s, border-color .2s, background .2s`,
        background: hov ? `${T.accent}0d` : T.bgCard,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: 6, padding: "12px 14px 10px", cursor: "default",
        display: "flex", flexDirection: "column", gap: 8,
        boxShadow: hov ? `0 0 20px ${T.accent}14` : "none",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 20, color: skill.color, flexShrink: 0,
          filter: hov ? `drop-shadow(0 0 6px ${skill.color})` : "none", transition: "filter .2s" }}>
          {skill.icon}
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: hov ? T.accent : T.textMuted,
          fontFamily: "'Share Tech Mono', monospace", transition: "color .2s", letterSpacing: "0.05em" }}>
          {skill.name}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: T.cyan, fontFamily: "monospace" }}>{skill.pct}%</span>
      </div>
      <div style={{ height: 2, background: `${T.accent}14`, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${T.accent}, ${T.cyan})`,
          width: visible ? `${skill.pct}%` : "0%",
          transition: `width 1.1s cubic-bezier(.16,1,.3,1) ${delay + 0.15}s`,
          boxShadow: hov ? `0 0 8px ${T.accent}99` : "none",
        }} />
      </div>
    </div>
  );
};

/* ============================================================
   EXPERIENCE CARD
============================================================ */
const ExpCard: React.FC<{ exp: Experience; index: number; T: Theme }> = ({ exp, index, T }) => {
  const [open, setOpen] = useState(index === 0);
  const getBadgeColors = (badge: string): [string, string] => {
    if (badge === "Education")  return [T.cyan, `${T.cyan}1a`];
    if (badge === "Internship") return [T.accent, `${T.accent}1a`];
    return ["#a78bfa", "rgba(167,139,250,0.1)"];
  };
  const [bc, bgc] = getBadgeColors(exp.badge);
  return (
    <Reveal delay={index * 0.1}>
      <div style={{
        border: `1px solid ${open ? T.borderHov : T.border}`, borderRadius: 8,
        background: T.bgCard, overflow: "hidden",
        transition: "border-color .3s, box-shadow .3s",
        boxShadow: open ? `0 0 30px ${T.accent}0f` : "none",
        fontFamily: "'Share Tech Mono', monospace",
      }}>
        {open && <div style={{ height: 1, background: `linear-gradient(90deg, ${T.accent}, ${T.cyan}, transparent)` }} />}
        <button onClick={() => setOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            gap: 16, padding: "20px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%",
                background: open ? T.accent : T.textDim,
                boxShadow: open ? `0 0 12px ${T.accent}` : "none",
                border: `1px solid ${open ? T.accent : T.textMuted}`,
                transition: "all .3s" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: open ? T.accent : T.textMuted,
                  fontFamily: "'Share Tech Mono', monospace", transition: "color .2s" }}>{exp.role}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 3,
                  background: bgc, color: bc, border: `1px solid ${bc}40`,
                  letterSpacing: "0.15em", textTransform: "uppercase" }}>{exp.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.cyan, marginBottom: 2 }}>{exp.org}</div>
              <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: "0.05em" }}>
                <span style={{ color: T.accent, marginRight: 4 }}>$</span>{exp.period}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 16, color: open ? T.accent : T.textMuted, flexShrink: 0, paddingTop: 2,
            transition: "all .3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", fontFamily: "monospace" }}>+</div>
        </button>
        {open && (
          <div style={{ padding: "0 22px 22px 48px", borderTop: `1px solid ${T.accent}14` }}>
            <div style={{ paddingTop: 16 }}>
              {exp.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: T.accent, flexShrink: 0, fontFamily: "monospace", fontSize: 12, marginTop: 2 }}>›</span>
                  <p style={{ fontSize: 13, color: T.text, lineHeight: 1.8, fontFamily: "'Share Tech Mono', monospace" }}>{b}</p>
                </div>
              ))}
              {exp.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.accent}0f` }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3,
                      background: `${T.cyan}0f`, border: `1px solid ${T.cyan}33`,
                      color: T.cyan, fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.05em" }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};

/* ============================================================
   PROJECT CARD
============================================================ */
const ProjCard: React.FC<{ proj: Project; index: number; T: Theme }> = ({ proj, index, T }) => {
  const [hov, setHov] = useState(false);
  const [mx, setMx] = useState(50); const [my, setMy] = useState(50);
  return (
    <Reveal delay={index * 0.07} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setMx(((e.clientX - r.left) / r.width) * 100);
          setMy(((e.clientY - r.top) / r.height) * 100);
        }}
        style={{
          height: "100%", display: "flex", flexDirection: "column",
          borderRadius: 8, border: `1px solid ${hov ? T.borderHov : T.border}`,
          background: T.bgCard, overflow: "hidden", cursor: "default",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${T.accent}26, 0 0 40px ${T.accent}0a` : "none",
          transition: "all .3s cubic-bezier(.16,1,.3,1)", position: "relative",
          fontFamily: "'Share Tech Mono', monospace",
        }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${mx}% ${my}%, ${T.accent}0f 0%, transparent 55%)`,
          opacity: hov ? 1 : 0, transition: "opacity .3s" }} />
        <div style={{ height: 1, background: `linear-gradient(90deg, ${T.accent}, ${T.cyan}, transparent)`,
          transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
          transition: "transform .45s cubic-bezier(.16,1,.3,1)" }} />
        <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6,
          borderBottom: `1px solid ${T.accent}0f`, background: `${T.accent}05` }}>
          {["#ff5f57","#ffbd2e","#28ca41"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
          ))}
          <span style={{ marginLeft: 8, fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>
            ~/projects/{proj.title.toLowerCase().replace(/\s+/g, "-")}
          </span>
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ marginLeft: "auto", color: T.textMuted, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}>
              <SiGithub size={13} />
            </a>
          )}
        </div>
        <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{proj.emoji}</span>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: hov ? T.accent : T.text,
              fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.3, transition: "color .2s" }}>
              {proj.title}
            </h3>
          </div>
          <p style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.8, flex: 1, marginBottom: 16 }}>
            <span style={{ color: T.cyan }}># </span>{proj.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {proj.tags.map(t => (
              <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3,
                background: `${T.cyan}0d`, border: `1px solid ${T.cyan}${hov ? "40" : "1a"}`,
                color: hov ? T.cyan : T.textMuted, transition: "all .2s",
                fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.04em" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ============================================================
   SECTION TITLE
============================================================ */
const STitle: React.FC<{ tag: string; title: string; sub?: string; T: Theme }> = ({ tag, title, sub, T }) => (
  <Reveal style={{ marginBottom: 52 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: "0.25em",
        textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace" }}>
        <span style={{ color: T.accent }}>$ </span>{tag}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
    </div>
    <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: T.accent, lineHeight: 1.1,
      letterSpacing: "-0.02em", fontFamily: "'Share Tech Mono', monospace",
      textShadow: `0 0 40px ${T.accent}33` }}>
      {title}
    </h2>
    {sub && (
      <p style={{ fontSize: 13, color: T.textMuted, marginTop: 12, maxWidth: 500, lineHeight: 1.8,
        fontFamily: "'Share Tech Mono', monospace" }}>{sub}</p>
    )}
  </Reveal>
);

/* ============================================================
   THEME SWITCHER
============================================================ */
const ThemeSwitcher: React.FC<{ current: ThemeKey; onSwitch: (k: ThemeKey) => void; T: Theme }> = ({ current, onSwitch, T }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Switch theme"
        style={{
          display: "flex", alignItems: "center", gap: 7, padding: "6px 12px",
          borderRadius: 4, background: T.bgCard, border: `1px solid ${T.border}`,
          cursor: "pointer", fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.1em",
          transition: "all .2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = T.borderHov)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: THEME_LABELS[current].dot,
          boxShadow: `0 0 6px ${THEME_LABELS[current].dot}` }} />
        {THEME_LABELS[current].label}
        <span style={{ fontSize: 9, opacity: 0.6, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", display: "inline-block" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 200,
          background: T.isLight ? T.bgAlt : "#0a0f0c",
          border: `1px solid ${T.borderHov}`, borderRadius: 6,
          overflow: "hidden", minWidth: 130,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
        }}>
          {(Object.keys(THEMES) as ThemeKey[]).map(k => (
            <button key={k} onClick={() => { onSwitch(k); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 14px", background: current === k ? `${THEME_LABELS[k].dot}1a` : "transparent",
                border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11, fontWeight: 700, color: current === k ? THEME_LABELS[k].dot : T.textMuted,
                letterSpacing: "0.1em", textAlign: "left", transition: "background .15s, color .15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${THEME_LABELS[k].dot}1a`; (e.currentTarget as HTMLButtonElement).style.color = THEME_LABELS[k].dot; }}
              onMouseLeave={e => { if (current !== k) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = T.textMuted; } }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: THEME_LABELS[k].dot,
                boxShadow: current === k ? `0 0 6px ${THEME_LABELS[k].dot}` : "none" }} />
              {THEME_LABELS[k].label}
              {current === k && <span style={{ marginLeft: "auto", fontSize: 9, color: THEME_LABELS[k].dot }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   NAV
============================================================ */
const NAV = ["Home","About","Skills","Experience","Projects","Contact"];

/* ============================================================
   MAIN APP
============================================================ */
export default function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("green");
  const T = THEMES[themeKey];

  const [active, setActive]       = useState("Home");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [showBtt, setShowBtt]     = useState(false);
  const [cursorX, setCursorX]     = useState(0);
  const [cursorY, setCursorY]     = useState(0);
  const [ringX, setRingX]         = useState(0);
  const [ringY, setRingY]         = useState(0);
  const [cursorBig, setCursorBig] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = DATA.role;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTypedText(fullText.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const s = document.createElement("style");
    s.id = "portfolio-global-style";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;cursor:none!important}
      html{scroll-behavior:smooth; zoom:1.1;}
      body{font-family:'Share Tech Mono','Courier New',monospace;overflow-x:hidden;}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-thumb{border-radius:99px}
      a{text-decoration:none;color:inherit}
      @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes spin-slow{to{transform:rotate(360deg)}}
      @keyframes spin-rev{to{transform:rotate(-360deg)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes glitch{0%,100%{transform:none;opacity:1}7%{transform:skew(-0.5deg,-0.9deg);opacity:.75}10%{transform:none;opacity:1}27%{transform:none;opacity:1}30%{transform:skew(.8deg,.1deg);opacity:.75}35%{transform:none;opacity:1}55%{transform:none;opacity:1}58%{transform:skew(-1deg,0.2deg);opacity:.75}60%{transform:none;opacity:1}90%{transform:none;opacity:1}92%{transform:skew(.5deg,-0.1deg);opacity:.75}95%{transform:none;opacity:1}}
      @keyframes pulse-ring{0%{transform:scale(.9);opacity:.9}100%{transform:scale(2);opacity:0}}
      @keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
      @keyframes slide-right{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}.hero-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}}
    `;
    const existing = document.getElementById("portfolio-global-style");
    if (existing) document.head.removeChild(existing);
    document.head.appendChild(s);

    const onMove = (e: MouseEvent) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    document.addEventListener("mousemove", onMove);
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBtt(window.scrollY > 500);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => { document.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Scrollbar color update
  useEffect(() => {
    let styleEl = document.getElementById("scrollbar-theme") as HTMLStyleElement | null;
    if (!styleEl) { styleEl = document.createElement("style"); styleEl.id = "scrollbar-theme"; document.head.appendChild(styleEl); }
    styleEl.textContent = `::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.accent}}body{background:${T.bg};color:${T.text}}`;
  }, [T]);

  useEffect(() => {
    let rx2 = ringX, ry2 = ringY, raf2: number;
    const lerp2 = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      rx2 = lerp2(rx2, cursorX, 0.12); ry2 = lerp2(ry2, cursorY, 0.12);
      setRingX(rx2); setRingY(ry2); raf2 = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf2);
  }, [cursorX, cursorY]);

  const container: React.CSSProperties = { maxWidth: 1160, margin: "0 auto", padding: "0 24px" };
  const sp: React.CSSProperties = { position: "relative", zIndex: 2, padding: "100px 0" };
  const hoverProps = { onMouseEnter: () => setCursorBig(true), onMouseLeave: () => setCursorBig(false) };

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", transition: "background .4s, color .4s" }}>
      {/* ── CURSOR ── */}
      <div style={{ position: "fixed", zIndex: 99999, pointerEvents: "none",
        left: cursorX, top: cursorY, transform: "translate(-50%,-50%)" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent,
          boxShadow: `0 0 10px ${T.accent}, 0 0 20px ${T.accent}66` }} />
      </div>
      <div style={{ position: "fixed", zIndex: 99998, pointerEvents: "none",
        left: ringX, top: ringY, transform: "translate(-50%,-50%)",
        width: cursorBig ? 48 : 32, height: cursorBig ? 48 : 32,
        border: `1px solid ${T.accent}80`,
        borderRadius: cursorBig ? "50%" : "2px",
        transition: "width .3s, height .3s, border-radius .3s, border-color .4s",
        boxShadow: `0 0 8px ${T.accent}33` }} />

      {/* ── CIRCUIT GRID BG ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: T.gridOpacity,
        backgroundImage: `
          linear-gradient(${T.accent} 1px, transparent 1px),
          linear-gradient(90deg, ${T.accent} 1px, transparent 1px),
          linear-gradient(${T.accent}4d 1px, transparent 1px),
          linear-gradient(90deg, ${T.accent}4d 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
        transition: "opacity .4s" }} />

      {/* ── CRT SCANLINE ── */}
      {!T.isLight && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)" }} />
      )}

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "10px 0" : "18px 0", transition: "all .4s",
        background: scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 16,
            letterSpacing: "0.1em", color: T.accent, textShadow: `0 0 20px ${T.accent}80`,
            animation: "glitch 8s ease-in-out infinite" }}>
            GSS.dev<span style={{ color: T.cyan }}>_</span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV.map(n => (
                <a key={n} href={`#${n.toLowerCase()}`} {...hoverProps}
                  style={{ fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 4,
                    color: active === n ? T.accent : T.textMuted,
                    background: active === n ? `${T.accent}14` : "transparent",
                    border: active === n ? `1px solid ${T.accent}33` : "1px solid transparent",
                    transition: "all .2s", letterSpacing: "0.1em", textTransform: "uppercase",
                    fontFamily: "'Share Tech Mono', monospace" }}>
                  {n}
                </a>
              ))}
            </div>
            <ThemeSwitcher current={themeKey} onSwitch={setThemeKey} T={T} />
            <button className="nav-ham" onClick={() => setMobile(o => !o)} {...hoverProps}
              style={{ display: "none", flexDirection: "column", gap: 4, background: "none",
                border: `1px solid ${T.border}`, borderRadius: 4, padding: "7px 9px" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 18, height: 1, background: T.accent, display: "block" }} />)}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: T.navBg, backdropFilter: "blur(20px)",
            borderTop: `1px solid ${T.border}`, padding: "10px 16px" }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobile(false)}
                style={{ display: "block", padding: "12px 14px", fontSize: 12, fontWeight: 600,
                  color: active === n ? T.accent : T.textMuted,
                  borderBottom: `1px solid ${T.accent}0d`,
                  fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.1em" }}>
                <span style={{ color: T.cyan }}>› </span>{n}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ================================================================
          HERO
      ================================================================ */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 0 80px", position: "relative", overflow: "hidden", zIndex: 2 }}>
        <MatrixRain color={T.accent} opacity={T.matrixOpacity} />

        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.accent}0f 0%, transparent 65%)`,
          top: -100, right: -50, pointerEvents: "none",
          animation: "float-y 14s ease-in-out infinite" }} />

        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 72, alignItems: "center" }}>
            <div>
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.05s" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${T.accent}0f`, border: `1px solid ${T.accent}40`,
                  borderRadius: 4, padding: "5px 14px", marginBottom: 24,
                  fontFamily: "'Share Tech Mono', monospace" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent,
                    boxShadow: `0 0 8px ${T.accent}`, animation: "pulse-ring 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.accent, letterSpacing: "0.2em",
                    textTransform: "uppercase" }}>// Available for Hire</span>
                </div>
              </div>

              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.12s" }}>
                <h1 style={{ fontSize: "clamp(34px,5.5vw,68px)", fontWeight: 900, lineHeight: 1.0,
                  letterSpacing: "-0.02em", marginBottom: 16,
                  fontFamily: "'Orbitron', monospace", animation: "glitch 10s ease-in-out infinite" }}>
                  <span style={{ color: T.text }}>{DATA.name.split("\n")[0]}</span>
                  <br />
                  <span style={{ color: T.accent, textShadow: `0 0 30px ${T.accent}66` }}>
                    {DATA.name.split("\n")[1]}
                  </span>
                </h1>
              </div>

              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.2s" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.cyan, marginBottom: 6,
                  fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.05em" }}>
                  <span style={{ color: T.accent }}>$ </span>{typedText}
                  <span style={{ animation: "blink 1s step-end infinite", color: T.accent }}>█</span>
                </div>
                <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.8, maxWidth: 500, marginBottom: 32,
                  fontFamily: "'Share Tech Mono', monospace" }}>
                  <span style={{ color: T.accent }}># </span>{DATA.tagline}
                </p>
              </div>

              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.28s",
                display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                <a href="#contact" {...hoverProps}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px",
                    borderRadius: 4, background: T.accent, color: T.textOnAccent,
                    fontWeight: 700, fontSize: 12, letterSpacing: "0.1em",
                    fontFamily: "'Share Tech Mono', monospace", textTransform: "uppercase",
                    boxShadow: `0 0 20px ${T.accent}4d`, transition: "all .2s" }}
                  onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.boxShadow = `0 0 40px ${T.accent}99`; a.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.boxShadow = `0 0 20px ${T.accent}4d`; a.style.transform = ""; }}>
                  &gt;_ Connect
                </a>
                <a href="#projects" {...hoverProps}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px",
                    borderRadius: 4, border: `1px solid ${T.border}`, background: "transparent",
                    color: T.accent, fontWeight: 600, fontSize: 12, letterSpacing: "0.1em",
                    fontFamily: "'Share Tech Mono', monospace", textTransform: "uppercase",
                    transition: "all .2s" }}
                  onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = T.borderHov; a.style.background = `${T.accent}0d`; a.style.boxShadow = `0 0 20px ${T.accent}14`; }}
                  onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = T.border; a.style.background = "transparent"; a.style.boxShadow = "none"; }}>
                  ls ./projects
                </a>
              </div>

              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.36s",
                display: "flex", gap: 36, paddingTop: 24, borderTop: `1px solid ${T.border}`, flexWrap: "wrap" }}>
                {[["8.73","CGPA"],["6+","PROJECTS"],["1","INTERNSHIP"],["2+","CLUB ROLES"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-1px", color: T.accent,
                      fontFamily: "'Orbitron', monospace", textShadow: `0 0 20px ${T.accent}4d` }}>{v}</div>
                    <div style={{ fontSize: 9, color: T.textMuted, letterSpacing: "0.18em",
                      textTransform: "uppercase", marginTop: 3, fontFamily: "monospace" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: terminal avatar */}
            <div style={{ animation: "slide-right .7s .15s ease forwards", opacity: 0 }}>
              <div style={{ position: "relative", width: 280, height: 280, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                {[0, 1].map(i => (
                  <div key={i} style={{
                    position: "absolute", inset: -(36 + i * 30), borderRadius: "50%",
                    border: `1px solid ${i === 0 ? T.accent : T.cyan}${i === 0 ? "26" : "1a"}`,
                    animation: `${i % 2 === 0 ? "spin-slow" : "spin-rev"} ${22 + i * 10}s linear infinite`,
                  }}>
                    <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%",
                      background: i === 0 ? T.accent : T.cyan,
                      boxShadow: `0 0 10px ${i === 0 ? T.accent : T.cyan}`,
                      top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }} />
                  </div>
                ))}
                <div style={{ width: 210, height: 210, borderRadius: 8, overflow: "hidden",
                  border: `1px solid ${T.borderHov}`,
                  boxShadow: `0 0 0 1px ${T.accent}0f, 0 0 60px ${T.accent}1f`,
                  position: "relative", zIndex: 5, background: T.bgAlt }}>
                  <div style={{ height: 22, background: `${T.accent}14`, display: "flex",
                    alignItems: "center", padding: "0 10px", gap: 5,
                    borderBottom: `1px solid ${T.border}` }}>
                    {["#ff5f57","#ffbd2e","#28ca41"].map((c, i) => (
                      <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
                    ))}
                    <span style={{ marginLeft: 6, fontSize: 9, color: T.textMuted, fontFamily: "monospace" }}>surya@portfolio:~</span>
                  </div>
                  <div style={{ height: "calc(100% - 22px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/profile.png" alt="Surya Prakash"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { const t = e.target as HTMLImageElement; t.style.display = "none"; (t.nextSibling as HTMLElement).style.display = "flex"; }} />
                    <div style={{ display: "none", width: "100%", height: "100%",
                      alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
                      <div style={{ fontSize: 52, fontWeight: 900, color: T.accent, fontFamily: "'Orbitron', monospace",
                        textShadow: `0 0 30px ${T.accent}80` }}>S</div>
                      <div style={{ fontSize: 10, color: T.textMuted, fontFamily: "monospace" }}>user@localhost</div>
                    </div>
                  </div>
                </div>
                {[
                  { text: "Python 3.x", dot: "#3776AB", style: { top: 8, right: -20 } },
                  { text: "React 18",   dot: "#61DAFB", style: { bottom: 28, left: -24 } },
                  { text: "Node.js",    dot: "#339933", style: { bottom: 8, right: -8 } },
                ].map((b, i) => (
                  <div key={i} style={{
                    position: "absolute", zIndex: 10, ...b.style,
                    background: T.bgAlt, backdropFilter: "blur(12px)",
                    border: `1px solid ${T.border}`, borderRadius: 4,
                    padding: "4px 10px", fontSize: 10, fontWeight: 700, color: T.text,
                    display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                    animation: `float-y ${3.5 + i * 0.7}s ease-in-out infinite`,
                    animationDelay: `${-i * 1.1}s`,
                    boxShadow: `0 0 20px rgba(0,0,0,0.5), 0 0 10px ${T.accent}0d`,
                    fontFamily: "'Share Tech Mono', monospace",
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: b.dot, boxShadow: `0 0 6px ${b.dot}` }} />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ticker */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, overflow: "hidden",
          borderTop: `1px solid ${T.border}`, padding: "8px 0",
          background: T.isLight ? "rgba(237,242,237,0.85)" : "rgba(5,10,14,0.8)",
          backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 28s linear infinite" }}>
            {[...Array(2)].map((_, ri) => (
              <span key={ri} style={{ fontSize: 10, letterSpacing: "0.3em", color: T.textDim,
                fontFamily: "'Share Tech Mono', monospace" }}>
                {["FULL-STACK DEV","AI ENTHUSIAST","OPEN-SOURCE","CSE UNDERGRAD","SDN RESEARCHER","CLOUD EXPLORER","REACT DEV","PYTHON DEV"].map((item, i) => (
                  <span key={i}>
                    <span style={{ color: T.accent, margin: "0 20px", opacity: 0.4 }}>▶</span>
                    <span>{item}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ABOUT
      ================================================================ */}
      <section id="about" style={{ ...sp, background: T.bgAlt }}>
        <div style={container}>
          <STitle tag="cat about.md" title="About Me" T={T} />
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <Reveal dir="left">
              <div style={{ padding: 32, borderRadius: 8, border: `1px solid ${T.border}`,
                background: T.bgCard, position: "relative", overflow: "hidden",
                fontFamily: "'Share Tech Mono', monospace" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, ${T.accent}, ${T.cyan}, transparent)` }} />
                <div style={{ marginBottom: 14 }}>
                  <span style={{ color: T.accent }}>$ </span>
                  <span style={{ color: T.cyan }}>cat bio.txt</span>
                </div>
                <p style={{ fontSize: 13, color: T.text, lineHeight: 1.9, marginBottom: 16 }}>{DATA.bio}</p>
                <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.9 }}>{DATA.bio2}</p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.accent}0f`,
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: "📍", label: "location", val: DATA.location },
                    { icon: "🎓", label: "university", val: "PES University" },
                    { icon: "✉️", label: "email", val: DATA.email },
                    { icon: "📱", label: "phone", val: DATA.phone },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
                      <div>
                        <div style={{ fontSize: 9, color: T.cyan, letterSpacing: "0.15em",
                          textTransform: "uppercase", marginBottom: 2 }}>{r.label}:</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{r.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal dir="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, borderRadius: 8, overflow: "hidden" }}>
                <Counter to="8.73" label="CGPA" T={T} />
                <Counter to="6" suffix="+" label="Projects" T={T} />
                <Counter to="1" label="Internship" T={T} />
                <Counter to="2" suffix="+" label="Club Roles" T={T} />
              </div>
              <div style={{ marginTop: 20, padding: "22px 24px", borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.bgCard,
                fontFamily: "'Share Tech Mono', monospace" }}>
                <div style={{ fontSize: 10, color: T.cyan, letterSpacing: "0.15em",
                  textTransform: "uppercase", marginBottom: 16 }}>
                  <span style={{ color: T.accent }}>$ </span>git log --oneline
                </div>
                {[
                  { hash: "a3f9b2c", year: "2023", label: "Joined PES University" },
                  { hash: "7d1e4a8", year: "2024", label: "SMCC Head — Equinox Club" },
                  { hash: "c2b8f3d", year: "2025", label: "Research Intern at CCNCS" },
                  { hash: "HEAD",    year: "Now",  label: "Logistics Head · Building" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 9, color: item.hash === "HEAD" ? T.accent : T.cyan,
                      flexShrink: 0, fontFamily: "monospace" }}>{item.hash}</span>
                    <span style={{ fontSize: 10, color: T.textMuted, flexShrink: 0 }}>{item.year}</span>
                    <span style={{ fontSize: 11, color: T.text }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SKILLS
      ================================================================ */}
      <section id="skills" style={{ ...sp }}>
        <div style={container}>
          <STitle tag="ls --skills" title="Tech Stack"
            sub="// Languages, frameworks, and tools I use to ship end-to-end." T={T} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
            {DATA.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} delay={i * 0.04} T={T} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          EXPERIENCE
      ================================================================ */}
      <section id="experience" style={{ ...sp, background: T.bgAlt }}>
        <div style={{ ...container, maxWidth: 860 }}>
          <STitle tag="cat resume.json" title="Experience & Education" T={T} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DATA.experiences.map((exp, i) => <ExpCard key={i} exp={exp} index={i} T={T} />)}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROJECTS
      ================================================================ */}
      <section id="projects" style={{ ...sp }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <Reveal>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: "0.25em",
                    textTransform: "uppercase", fontFamily: "'Share Tech Mono', monospace" }}>
                    <span style={{ color: T.accent }}>$ </span>ls ./projects
                  </span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
                </div>
                <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, color: T.accent,
                  letterSpacing: "-0.02em", fontFamily: "'Orbitron', monospace",
                  textShadow: `0 0 30px ${T.accent}33` }}>Featured Projects</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a href={DATA.github} target="_blank" rel="noreferrer" {...hoverProps}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px",
                  borderRadius: 4, border: `1px solid ${T.border}`, background: T.bgCard,
                  color: T.textMuted, fontSize: 11, fontWeight: 600, transition: "all .2s",
                  fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.08em" }}
                onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = T.borderHov; a.style.color = T.accent; a.style.boxShadow = `0 0 16px ${T.accent}14`; }}
                onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = T.border; a.style.color = T.textMuted; a.style.boxShadow = "none"; }}>
                <SiGithub size={13} /> github.com/GSuryaP ↗
              </a>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {DATA.projects.map((p, i) => <ProjCard key={i} proj={p} index={i} T={T} />)}
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTACT
      ================================================================ */}
      <section id="contact" style={{ ...sp, paddingBottom: 140, background: T.bgAlt }}>
        <div style={{ ...container, maxWidth: 960 }}>
          <STitle tag="ssh contact" title="Get In Touch"
            sub="// Open to internships, research colabs, and freelance. DM anytime." T={T} />
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44 }}>
            <div>
              <Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[
                    { icon: "✉️", label: "email",    val: DATA.email,    href: `mailto:${DATA.email}` },
                    { icon: "📞", label: "phone",    val: DATA.phone,    href: `tel:${DATA.phone}` },
                    { icon: "📍", label: "location", val: DATA.location, href: undefined },
                    { icon: "💼", label: "status",   val: "Open to Opportunities", accent: true },
                  ].map(row => (
                    <a key={row.label} href={row.href ?? "#"} target={row.href?.startsWith("http") ? "_blank" : undefined}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                        borderRadius: 6, border: `1px solid ${T.border}`,
                        background: T.bgCard, transition: "all .2s",
                        cursor: row.href ? "pointer" : "default", textDecoration: "none",
                        fontFamily: "'Share Tech Mono', monospace" }}
                      onMouseEnter={e => { if (row.href) { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = T.borderHov; a.style.background = `${T.accent}0a`; a.style.transform = "translateX(4px)"; a.style.boxShadow = `0 0 20px ${T.accent}0f`; } }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = T.border; a.style.background = T.bgCard; a.style.transform = ""; a.style.boxShadow = "none"; }}>
                      <div style={{ width: 38, height: 38, borderRadius: 6, flexShrink: 0,
                        background: `${T.accent}0f`, border: `1px solid ${T.accent}26`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        {row.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: T.cyan, letterSpacing: "0.15em",
                          textTransform: "uppercase", marginBottom: 1 }}>{row.label}:</div>
                        <div style={{ fontSize: 12, fontWeight: 600,
                          color: (row as any).accent ? T.accent : T.text }}>{row.val}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "GitHub",   href: DATA.github,           icon: <SiGithub size={13} /> },
                    { label: "LinkedIn", href: DATA.linkedin,          icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { label: "Email",    href: `mailto:${DATA.email}`, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
                    { label: "Resume",   href: DATA.resume,            icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>, download: true },
                  ].map(s => (
                    <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer" {...((s as any).download ? { download: true } : {})} {...hoverProps}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                        padding: "11px", borderRadius: 5, fontWeight: 700, fontSize: 11,
                        border: `1px solid ${T.border}`, background: T.bgCard,
                        color: T.accent, fontFamily: "'Share Tech Mono', monospace",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        transition: "all .2s", cursor: "pointer" }}
                      onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = T.borderHov; a.style.background = `${T.accent}0f`; a.style.boxShadow = `0 0 16px ${T.accent}1a`; a.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = T.border; a.style.background = T.bgCard; a.style.boxShadow = "none"; a.style.transform = ""; }}>
                      {s.icon} {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div style={{ padding: 0, borderRadius: 8, overflow: "hidden",
                border: `1px solid ${T.borderHov}`,
                boxShadow: `0 0 60px ${T.accent}0f`, fontFamily: "'Share Tech Mono', monospace" }}>
                <div style={{ height: 32, background: `${T.accent}0d`, display: "flex",
                  alignItems: "center", padding: "0 14px", gap: 6,
                  borderBottom: `1px solid ${T.border}` }}>
                  {["#ff5f57","#ffbd2e","#28ca41"].map((c, i) => (
                    <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.8 }} />
                  ))}
                  <span style={{ marginLeft: 8, fontSize: 10, color: T.textMuted }}>
                    surya@portfolio: ~/contact
                  </span>
                </div>
                <div style={{ padding: 28, background: T.bgCard }}>
                  <div style={{ marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: T.accent }}>$ </span>
                    <span style={{ color: T.cyan }}>echo $AVAILABILITY</span>
                  </div>
                  <div style={{ fontSize: 11, color: T.text, marginBottom: 20, paddingLeft: 14 }}>
                    OPEN_TO_HIRE=true<br/>
                    RESPONSE_TIME="&lt;24h"<br/>
                    MODES=["intern","collab","freelance","oss"]
                  </div>
                  <div style={{ marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: T.accent }}>$ </span>
                    <span style={{ color: T.cyan }}>cat mission.txt</span>
                  </div>
                  <p style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.8, marginBottom: 24, paddingLeft: 14 }}>
                    Open to internships, research collaborations, freelance projects, and open-source work. Let's create something impactful together.
                  </p>
                  <a href="https://wa.me/919880410689?text=Hi%20Surya!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect."
                    target="_blank" rel="noopener noreferrer" {...hoverProps}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: T.accent, color: T.textOnAccent, fontWeight: 700, fontSize: 12,
                      padding: "12px 20px", borderRadius: 4, letterSpacing: "0.1em", textTransform: "uppercase",
                      boxShadow: `0 0 20px ${T.accent}4d`, transition: "all .2s", cursor: "pointer" }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = `0 0 40px ${T.accent}80`; }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = `0 0 20px ${T.accent}4d`; }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.textOnAccent === "#050a0e" ? "#22c55e" : "#fff",
                      boxShadow: "0 0 8px #22c55e", display: "inline-block",
                      animation: "pulse-ring 2s ease-in-out infinite" }} />
                    &gt;_ WhatsApp Chat ↗
                  </a>
                  <div style={{ marginTop: 16, fontSize: 10, color: T.textMuted, textAlign: "center" }}>
                    <span style={{ color: T.accent }}>$ </span>status: online &amp; available
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer style={{ borderTop: `1px solid ${T.border}`, background: T.footerBg, padding: "24px 0",
        position: "relative", zIndex: 2, fontFamily: "'Share Tech Mono', monospace", transition: "background .4s" }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: T.textMuted }}>
            <span style={{ color: T.accent }}>// </span>
            © {new Date().getFullYear()} <span style={{ color: T.cyan }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: T.textMuted }}>
            <span style={{ color: T.accent }}>built with </span>React · TypeScript · CSS-in-JS
          </p>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} {...hoverProps}
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 50, width: 42, height: 42,
          borderRadius: 4, background: T.bgAlt, color: T.accent,
          border: `1px solid ${T.borderHov}`, fontSize: 16, display: "flex",
          alignItems: "center", justifyContent: "center",
          opacity: showBtt ? 1 : 0, pointerEvents: showBtt ? "all" : "none",
          transform: showBtt ? "translateY(0)" : "translateY(12px)",
          transition: "opacity .3s, transform .3s, border-color .4s, color .4s",
          boxShadow: `0 0 20px ${T.accent}33`,
          fontFamily: "'Share Tech Mono', monospace" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${T.accent}1a`; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${T.accent}4d`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = T.bgAlt; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${T.accent}33`; }}>
        ↑
      </button>
    </div>
  );
}
