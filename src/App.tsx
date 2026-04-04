import React, { useState, useEffect, useRef, useCallback } from "react";
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

/* ============================================================
   PORTFOLIO DATA  ← edit this block to update content
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
    { name: "Express",    icon: <SiExpress />,     color: "#cccccc", pct: 78 },
    { name: "MongoDB",    icon: <SiMongodb />,     color: "#47A248", pct: 75 },
    { name: "MySQL",      icon: <SiMysql />,       color: "#4479A1", pct: 73 },
    { name: "HTML5",      icon: <SiHtml5 />,       color: "#E34F26", pct: 92 },
    { name: "CSS3",       icon: <SiCss />,        color: "#1572B6", pct: 88 },
    { name: "Tailwind",   icon: <SiTailwindcss />, color: "#06B6D4", pct: 86 },
    { name: "C++",        icon: <SiCplusplus />,   color: "#00599C", pct: 77 },
    { name: "C",          icon: <SiC />,           color: "#6699cc", pct: 74 },
    { name: "Git",        icon: <SiGit />,         color: "#F05032", pct: 84 },
    { name: "GitHub",     icon: <SiGithub />,      color: "#cccccc", pct: 83 },
    { name: "Firebase",   icon: <SiFirebase />,    color: "#FFCA28", pct: 70 },
    { name: "RASA",
      icon: <img src="/rasa.jpg" alt="RASA" style={{ width: 24, height: 24, objectFit: "cover" }} />,
      color: "#7c3aed", pct: 76 },
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
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, dir = "up", className, style }) => {
  const { ref, visible } = useReveal();
  const from =
    dir === "left"  ? "translateX(-32px)" :
    dir === "right" ? "translateX(32px)"  : "translateY(24px)";
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
   ANIMATED COUNTER
============================================================ */
const Counter: React.FC<{ to: string; suffix?: string; label: string }> = ({ to, suffix = "", label }) => {
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
    <div ref={ref} className="text-center p-8 relative group"
      style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.12)", transition: "border-color .3s" }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.4)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.12)"}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="text-5xl font-black leading-none mb-2" style={{ fontFamily: "'Exo 2', sans-serif", color: "#f97316" }}>
        {val}<span className="text-3xl" style={{ color: "#fb923c" }}>{suffix}</span>
      </div>
      <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#64748b", letterSpacing: "0.18em" }}>{label}</div>
    </div>
  );
};

/* ============================================================
   SKILL CARD
============================================================ */
const SkillCard: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s, border-color .2s, background .2s`,
        background: hov ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10, padding: "14px 14px 12px", cursor: "default",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 22, color: skill.color, flexShrink: 0,
          filter: hov ? `drop-shadow(0 0 7px ${skill.color})` : "none", transition: "filter .2s" }}>
          {skill.icon}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: hov ? "#f1f5f9" : "#94a3b8",
          fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "color .2s" }}>
          {skill.name}
        </span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, #f97316, #fb923c)`,
          width: visible ? `${skill.pct}%` : "0%",
          transition: `width 1.1s cubic-bezier(.16,1,.3,1) ${delay + 0.15}s`,
          boxShadow: hov ? "0 0 8px rgba(249,115,22,0.6)" : "none",
        }} />
      </div>
    </div>
  );
};

/* ============================================================
   EXPERIENCE CARD
============================================================ */
const ExpCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const [open, setOpen] = useState(index === 0);
  const BADGE_COLORS: Record<string, string> = {
    Education: "#3b82f6", Internship: "#f97316", "Club Lead": "#8b5cf6",
  };
  const bc = BADGE_COLORS[exp.badge] ?? "#f97316";
  return (
    <Reveal delay={index * 0.1}>
      <div style={{
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14,
        background: "rgba(255,255,255,0.02)", overflow: "hidden",
        transition: "border-color .3s",
        ...(open ? { borderColor: "rgba(249,115,22,0.25)" } : {}),
      }}>
        {/* header */}
        <button onClick={() => setOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between",
            gap: 16, padding: "22px 24px", background: "none", border: "none", cursor: "pointer",
            textAlign: "left", transition: "background .2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.04)"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "none"}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
            {/* orange dot + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: open ? "#f97316" : "#334155",
                boxShadow: open ? "0 0 14px rgba(249,115,22,0.6)" : "none", transition: "all .3s" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: open ? "#f1f5f9" : "#94a3b8",
                  fontFamily: "'Exo 2', sans-serif", transition: "color .2s" }}>{exp.role}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                  background: `${bc}18`, color: bc, border: `1px solid ${bc}35`,
                  letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>{exp.badge}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", marginBottom: 2,
                fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{exp.org}</div>
              <div style={{ fontSize: 12, color: "#475569", fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "0.04em" }}>{exp.period}</div>
            </div>
          </div>
          <div style={{ fontSize: 20, color: open ? "#f97316" : "#475569", flexShrink: 0, paddingTop: 2,
            transition: "all .3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</div>
        </button>

        {/* body */}
        {open && (
          <div style={{ padding: "0 24px 24px 52px", borderTop: "1px solid rgba(249,115,22,0.12)" }}>
            <div style={{ paddingTop: 18 }}>
              {exp.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316",
                    flexShrink: 0, marginTop: 9 }} />
                  <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.82,
                    fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{b}</p>
                </div>
              ))}
              {exp.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16, paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 5,
                      background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)",
                      color: "#fb923c", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t}</span>
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
const ProjCard: React.FC<{ proj: Project; index: number }> = ({ proj, index }) => {
  const [hov, setHov] = useState(false);
  const [mx, setMx] = useState(50); const [my, setMy] = useState(50);
  return (
    <Reveal delay={index * 0.07} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setMx(((e.clientX - r.left) / r.width) * 100);
          setMy(((e.clientY - r.top) / r.height) * 100);
        }}
        style={{
          height: "100%", display: "flex", flexDirection: "column",
          borderRadius: 16, border: `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.07)"}`,
          background: "rgba(255,255,255,0.02)", overflow: "hidden", cursor: "default",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.15)" : "none",
          transition: "all .3s cubic-bezier(.16,1,.3,1)", position: "relative",
        }}>
        {/* magnetic glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${mx}% ${my}%, rgba(249,115,22,0.09) 0%, transparent 55%)`,
          opacity: hov ? 1 : 0, transition: "opacity .3s" }} />

        {/* top orange bar on hover */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #f97316, #fb923c, transparent)",
          transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
          transition: "transform .45s cubic-bezier(.16,1,.3,1)" }} />

        {/* icon area */}
        <div style={{ padding: "28px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 26, flexShrink: 0,
            background: hov ? "rgba(249,115,22,0.15)" : "rgba(249,115,22,0.07)",
            border: `1px solid ${hov ? "rgba(249,115,22,0.4)" : "rgba(249,115,22,0.15)"}`,
            transition: "all .2s" }}>
            {proj.emoji}
          </div>
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center",
                justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "#64748b", transition: "all .2s",
                textDecoration: "none", cursor: "pointer" }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "rgba(249,115,22,0.15)"; a.style.borderColor = "rgba(249,115,22,0.4)"; a.style.color = "#f97316"; }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "rgba(255,255,255,0.04)"; a.style.borderColor = "rgba(255,255,255,0.1)"; a.style.color = "#64748b"; }}>
              <SiGithub size={14} />
            </a>
          )}
        </div>

        {/* body */}
        <div style={{ padding: "16px 24px 26px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: hov ? "#f1f5f9" : "#e2e8f0",
            fontFamily: "'Exo 2', sans-serif", marginBottom: 10, lineHeight: 1.3,
            transition: "color .2s" }}>
            {proj.title}
          </h3>
          <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.78, flex: 1, marginBottom: 18,
            fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {proj.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {proj.tags.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 5,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: hov ? "#fb923c" : "#64748b", transition: "color .2s",
                fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t}</span>
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
const STitle: React.FC<{ tag: string; title: string; sub?: string }> = ({ tag, title, sub }) => (
  <Reveal style={{ marginBottom: 56 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 28, height: 1, background: "#f97316" }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em",
        textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tag}</span>
    </div>
    <h2 style={{ fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.1,
      letterSpacing: "-0.02em", fontFamily: "'Exo 2', sans-serif" }}>
      {title}
    </h2>
    {sub && (
      <p style={{ fontSize: 15, color: "#64748b", marginTop: 14, maxWidth: 500, lineHeight: 1.7,
        fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sub}</p>
    )}
  </Reveal>
);

/* ============================================================
   NAV
============================================================ */
const NAV = ["Home","About","Skills","Experience","Projects","Contact"];

/* ============================================================
   MAIN APP
============================================================ */
export default function App() {
  const [active, setActive]       = useState("Home");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [showBtt, setShowBtt]     = useState(false);
  const [cursorX, setCursorX]     = useState(0);
  const [cursorY, setCursorY]     = useState(0);
  const [ringX, setRingX]         = useState(0);
  const [ringY, setRingY]         = useState(0);
  const [cursorBig, setCursorBig] = useState(false);

  useEffect(() => {
    /* ── inject fonts + global styles ── */
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;cursor:none!important}
      html{scroll-behavior:smooth}
      body{background:#080c14;font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;color:#e2e8f0}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:#080c14}
      ::-webkit-scrollbar-thumb{background:#f97316;border-radius:99px}
      a{text-decoration:none;color:inherit}
      @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes spin-slow{to{transform:rotate(360deg)}}
      @keyframes spin-rev{to{transform:rotate(-360deg)}}
      @keyframes pulse-ring{0%{transform:scale(.9);opacity:.9}100%{transform:scale(2);opacity:0}}
      @keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
      @keyframes slide-right{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
      @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}.hero-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(s);

    /* ── cursor ── */
    let rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { setCursorX(e.clientX); setCursorY(e.clientY); };
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tickCursor = () => {
      rx = lerp(rx, cursorX, 0.13); ry = lerp(ry, cursorY, 0.13);
      setRingX(rx); setRingY(ry);
      raf = requestAnimationFrame(tickCursor);
    };
    document.addEventListener("mousemove", onMove);
    tickCursor();

    /* ── scroll ── */
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBtt(window.scrollY > 500);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      document.head.removeChild(s);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // re-lerp cursor ring
  useEffect(() => {
    let rx2 = ringX, ry2 = ringY, raf2: number;
    const lerp2 = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      rx2 = lerp2(rx2, cursorX, 0.13);
      ry2 = lerp2(ry2, cursorY, 0.13);
      setRingX(rx2); setRingY(ry2);
      raf2 = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf2);
  }, [cursorX, cursorY]);

  const container: React.CSSProperties = { maxWidth: 1160, margin: "0 auto", padding: "0 24px" };
  const sp: React.CSSProperties = { position: "relative", zIndex: 2, padding: "112px 0" };

  /* ── build hover-detect for cursor ── */
  const hoverProps = {
    onMouseEnter: () => setCursorBig(true),
    onMouseLeave: () => setCursorBig(false),
  };

  return (
    <>
      {/* ── CURSOR ── */}
      <div style={{ position: "fixed", zIndex: 99999, pointerEvents: "none",
        left: cursorX, top: cursorY, transform: "translate(-50%,-50%)",
        width: 8, height: 8, borderRadius: "50%", background: "#f97316",
        boxShadow: "0 0 12px rgba(249,115,22,0.9)" }} />
      <div style={{ position: "fixed", zIndex: 99998, pointerEvents: "none",
        left: ringX, top: ringY, transform: "translate(-50%,-50%)",
        width: cursorBig ? 52 : 36, height: cursorBig ? 52 : 36,
        borderRadius: "50%", border: "1.5px solid rgba(249,115,22,0.55)",
        transition: "width .3s, height .3s" }} />

      {/* ── GRAIN ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px" }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0", transition: "all .4s",
        background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 18,
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #f97316, #fb923c, #f59e0b)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "gradient-shift 4s ease infinite" }}>
            GSS.dev
          </a>

          {/* desktop */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} {...hoverProps}
                style={{ fontSize: 14, fontWeight: 600, padding: "7px 16px", borderRadius: 8,
                  color: active === n ? "#f97316" : "#64748b",
                  background: active === n ? "rgba(249,115,22,0.08)" : "transparent",
                  transition: "all .2s", letterSpacing: "0.01em" }}
                onMouseEnter={e => { if (active !== n) { (e.target as HTMLAnchorElement).style.color = "#e2e8f0"; (e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; } }}
                onMouseLeave={e => { if (active !== n) { (e.target as HTMLAnchorElement).style.color = "#64748b"; (e.target as HTMLAnchorElement).style.background = "transparent"; } }}>
                {n}
              </a>
            ))}
          </div>

          {/* hamburger */}
          <button className="nav-ham" onClick={() => setMobile(o => !o)} {...hoverProps}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none",
              border: "1px solid rgba(249,115,22,0.3)", borderRadius: 8, padding: "8px 10px" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 20, height: 2, background: "#f97316", borderRadius: 2, display: "block" }} />)}
          </button>
        </div>

        {/* mobile menu */}
        {mobileOpen && (
          <div style={{ background: "rgba(8,12,20,0.98)", backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}>
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobile(false)}
                style={{ display: "block", padding: "13px 16px", fontSize: 15, fontWeight: 600,
                  color: active === n ? "#f97316" : "#64748b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {n}
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

        {/* background mesh blobs */}
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%)",
          top: -200, right: -100, pointerEvents: "none",
          animation: "float-y 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
          bottom: -100, left: -100, pointerEvents: "none",
          animation: "float-y 16s ease-in-out infinite reverse" }} />

        {/* subtle grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px" }} />

        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center" }}>

            {/* ── LEFT ── */}
            <div>
              {/* badge */}
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.05s" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: 99, padding: "6px 16px", marginBottom: 28 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                    boxShadow: "0 0 8px #22c55e", animation: "pulse-ring 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fb923c", letterSpacing: "0.14em",
                    textTransform: "uppercase" }}>Open to Opportunities</span>
                </div>
              </div>

              {/* name */}
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.12s" }}>
                <h1 style={{ fontSize: "clamp(38px,6.5vw,76px)", fontWeight: 900, lineHeight: 1.0,
                  letterSpacing: "-0.03em", marginBottom: 18, fontFamily: "'Exo 2', sans-serif" }}>
                  <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {DATA.name.split("\n")[0]}
                  </span>
                  <br />
                  <span style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #f59e0b 100%)",
                    backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    animation: "gradient-shift 4s ease infinite" }}>
                    {DATA.name.split("\n")[1]}
                  </span>
                </h1>
              </div>

              {/* role + tagline */}
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.2s" }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8", marginBottom: 8 }}>
                  {DATA.role}
                </div>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>
                  {DATA.tagline}
                </p>
              </div>

              {/* CTA */}
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.28s",
                display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <a href={DATA.resume} download {...hoverProps}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px",
                    borderRadius: 10, background: "linear-gradient(135deg, #f97316, #ea580c)",
                    color: "white", fontWeight: 700, fontSize: 14, letterSpacing: "0.01em",
                    boxShadow: "0 8px 32px rgba(249,115,22,0.35)", transition: "all .2s" }}
                  onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
                  onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "0 8px 32px rgba(249,115,22,0.35)"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
                  Download Resume
                </a>
                <a href="#projects" {...hoverProps}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px",
                    borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontWeight: 600, fontSize: 14,
                    transition: "all .2s" }}
                  onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = "rgba(249,115,22,0.5)"; a.style.background = "rgba(249,115,22,0.08)"; a.style.color = "#f97316"; }}
                  onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.12)"; a.style.background = "rgba(255,255,255,0.04)"; a.style.color = "#e2e8f0"; }}>
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>

              {/* stats */}
              <div style={{ animation: "slide-up .6s ease forwards", opacity: 0, animationDelay: "0.36s",
                display: "flex", gap: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
                {[["8.73","CGPA"],["6+","Projects"],["1","Internship"],["2+","Club Roles"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px", color: "#f1f5f9",
                      fontFamily: "'Exo 2', sans-serif" }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em",
                      textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: avatar ── */}
            <div style={{ animation: "slide-right .7s .15s ease forwards", opacity: 0 }}>
              <div style={{ position: "relative", width: 310, height: 310, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                {/* rings */}
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    position: "absolute",
                    inset: -(38 + i * 28), borderRadius: "50%",
                    border: `1px solid rgba(249,115,22,${0.18 - i * 0.05})`,
                    animation: `${i % 2 === 0 ? "spin-slow" : "spin-rev"} ${20 + i * 9}s linear infinite`,
                  }}>
                    {/* dot on ring */}
                    <div style={{ position: "absolute", width: 8 - i, height: 8 - i, borderRadius: "50%",
                      background: i === 0 ? "#f97316" : i === 1 ? "#f59e0b" : "#fb923c",
                      boxShadow: `0 0 12px ${i === 0 ? "#f97316" : i === 1 ? "#f59e0b" : "#fb923c"}`,
                      top: "50%", left: "50%", marginTop: -(4 - i * 0.5), marginLeft: -(4 - i * 0.5) }} />
                  </div>
                ))}

                {/* avatar */}
                <div style={{ width: 190, height: 190, borderRadius: "50%", overflow: "hidden",
                  border: "2px solid rgba(249,115,22,0.45)",
                  boxShadow: "0 0 0 8px rgba(249,115,22,0.07), 0 0 60px rgba(249,115,22,0.2)",
                  position: "relative", zIndex: 5,
                  background: "linear-gradient(135deg, #0f131e, rgba(249,115,22,0.3))",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src="/profile.png" alt="Surya Prakash"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { const t = e.target as HTMLImageElement; t.style.display = "none"; (t.nextSibling as HTMLElement).style.display = "flex"; }} />
                  <div style={{ display: "none", width: "100%", height: "100%",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 56, fontWeight: 900, color: "rgba(249,115,22,0.6)",
                    fontFamily: "'Exo 2', sans-serif" }}>S</div>
                </div>

                {/* floating chips */}
                {[
                  { text: "Python",    dot: "#3776AB", style: { top: 10,   right: -14 } },
                  { text: "React",     dot: "#61DAFB", style: { bottom: 32, left: -20 } },
                  { text: "Node.js",   dot: "#339933", style: { bottom: 10, right: -4  } },
                ].map((b, i) => (
                  <div key={i} style={{
                    position: "absolute", zIndex: 10, ...b.style,
                    background: "rgba(8,12,20,0.9)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
                    padding: "5px 10px", fontSize: 11, fontWeight: 700, color: "#e2e8f0",
                    display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                    animation: `float-y ${3.5 + i * 0.7}s ease-in-out infinite`,
                    animationDelay: `${-i * 1.1}s`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.dot }} />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ticker */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, overflow: "hidden",
          borderTop: "1px solid rgba(249,115,22,0.1)", padding: "10px 0",
          background: "rgba(8,12,20,0.7)", backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 28s linear infinite" }}>
            {[...Array(2)].map((_, ri) => (
              <span key={ri} style={{ fontSize: 11, letterSpacing: "0.25em", color: "#1e293b" }}>
                {["FULL-STACK DEVELOPER","AI ENTHUSIAST","OPEN-SOURCE CONTRIBUTOR","CSE UNDERGRAD","SDN RESEARCHER","CLOUD EXPLORER","REACT DEVELOPER","PYTHON PROGRAMMER"].map((item, i) => (
                  <span key={i}>
                    <span style={{ color: "rgba(249,115,22,0.3)", margin: "0 24px" }}>◆</span>
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
      <section id="about" style={{ ...sp, background: "#0a0e18" }}>
        <div style={container}>
          <STitle tag="Who I Am" title="About Me" />
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            {/* bio */}
            <Reveal dir="left">
              <div style={{ padding: 36, borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)", position: "relative", overflow: "hidden" }}>
                {/* top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, #f97316, #f59e0b, transparent)" }} />
                <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.85, marginBottom: 18,
                  fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{DATA.bio}</p>
                <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.85,
                  fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{DATA.bio2}</p>

                {/* detail rows */}
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: "📍", label: "Location", val: DATA.location },
                    { icon: "🎓", label: "University", val: "PES University" },
                    { icon: "📧", label: "Email", val: DATA.email },
                    { icon: "📱", label: "Phone", val: DATA.phone },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.12em",
                          textTransform: "uppercase", marginBottom: 2 }}>{r.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0",
                          fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* stats + timeline */}
            <Reveal dir="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden" }}>
                <Counter to="8.73" label="CGPA" />
                <Counter to="6" suffix="+" label="Projects" />
                <Counter to="1" label="Internship" />
                <Counter to="2" suffix="+" label="Club Roles" />
              </div>

              {/* timeline */}
              <div style={{ marginTop: 24, padding: "24px 28px", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "0.18em",
                  textTransform: "uppercase", marginBottom: 18 }}>Timeline</div>
                {[
                  { year: "2023", label: "Joined PES University" },
                  { year: "2024", label: "SMCC Head — Equinox Club" },
                  { year: "2025", label: "Research Intern at CCNCS" },
                  { year: "Now",  label: "Logistics Head · Building 🚀" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#f97316", width: 30, flexShrink: 0,
                      fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.year}</span>
                    <div style={{ height: 1, width: 28 + i * 10, background: "linear-gradient(90deg, #f97316, #fb923c)",
                      flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#64748b",
                      fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</span>
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
          <STitle tag="Tech Arsenal" title="Skills & Technologies"
            sub="A curated stack of languages, frameworks, and tools I use to build end-to-end." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {DATA.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} delay={i * 0.04} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          EXPERIENCE
      ================================================================ */}
      <section id="experience" style={{ ...sp, background: "#0a0e18" }}>
        <div style={{ ...container, maxWidth: 860 }}>
          <STitle tag="Background" title="Experience & Education" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {DATA.experiences.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROJECTS
      ================================================================ */}
      <section id="projects" style={{ ...sp }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            flexWrap: "wrap", gap: 16, marginBottom: 56 }}>
            <Reveal>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 1, background: "#f97316" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#f97316", letterSpacing: "0.2em",
                    textTransform: "uppercase" }}>Work</span>
                </div>
                <h2 style={{ fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 800, color: "#f1f5f9",
                  letterSpacing: "-0.02em", fontFamily: "'Exo 2', sans-serif" }}>Featured Projects</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a href={DATA.github} target="_blank" rel="noreferrer" {...hoverProps}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
                  borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                  color: "#94a3b8", fontSize: 13, fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = "rgba(249,115,22,0.4)"; a.style.color = "#f97316"; }}
                onMouseLeave={e => { const a = e.target as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.1)"; a.style.color = "#94a3b8"; }}>
                All on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>
              </a>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 18 }}>
            {DATA.projects.map((p, i) => <ProjCard key={i} proj={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTACT
      ================================================================ */}
      <section id="contact" style={{ ...sp, paddingBottom: 160, background: "#0a0e18" }}>
        <div style={{ ...container, maxWidth: 960 }}>
          <STitle tag="Let's Talk" title="Get In Touch"
            sub="I'm actively looking for internship and collaborative opportunities. My inbox is always open." />

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            {/* left: info */}
            <div>
              {/* contact rows */}
              <Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {[
                    { icon: "✉️", label: "Email",    val: DATA.email,    href: `mailto:${DATA.email}` },
                    { icon: "📞", label: "Phone",    val: DATA.phone,    href: `tel:${DATA.phone}` },
                    { icon: "📍", label: "Location", val: DATA.location, href: undefined },
                    { icon: "💼", label: "Status",   val: "Open to Opportunities", accent: true },
                  ].map(row => (
                    <a key={row.label} href={row.href ?? "#"} target={row.href?.startsWith("http") ? "_blank" : undefined}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                        borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.02)", transition: "all .2s",
                        cursor: row.href ? "pointer" : "default", textDecoration: "none" }}
                      onMouseEnter={e => { if (row.href) { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(249,115,22,0.4)"; a.style.background = "rgba(249,115,22,0.06)"; a.style.transform = "translateX(4px)"; } }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.07)"; a.style.background = "rgba(255,255,255,0.02)"; a.style.transform = ""; }}>
                      <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                        background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {row.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.12em",
                          textTransform: "uppercase", marginBottom: 2 }}>{row.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600,
                          color: (row as any).accent ? "#f97316" : "#e2e8f0" }}>{row.val}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* social buttons — all orange */}
              <Reveal delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "GitHub",   href: DATA.github,           icon: <SiGithub size={15} /> },
                    { label: "LinkedIn", href: DATA.linkedin,          icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { label: "Email",    href: `mailto:${DATA.email}`, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
                    { label: "Resume",   href: DATA.resume,            icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>, download: true },
                  ].map(s => (
                    <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer" {...((s as any).download ? { download: true } : {})} {...hoverProps}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "13px", borderRadius: 11, fontWeight: 700, fontSize: 13,
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        color: "white", border: "none",
                        boxShadow: "0 4px 18px rgba(249,115,22,0.3)",
                        transition: "transform .2s, box-shadow .2s, filter .2s", cursor: "pointer" }}
                      onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-3px)"; a.style.boxShadow = "0 10px 30px rgba(249,115,22,0.5)"; a.style.filter = "brightness(1.1)"; }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "0 4px 18px rgba(249,115,22,0.3)"; a.style.filter = ""; }}>
                      {s.icon} {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* right: CTA card */}
            <Reveal delay={0.2}>
              <div style={{ padding: 40, borderRadius: 20, textAlign: "center",
                background: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(234,88,12,0.05) 50%, rgba(245,158,11,0.05) 100%)",
                border: "1px solid rgba(249,115,22,0.25)", position: "relative", overflow: "hidden" }}>
                {/* top shimmer */}
                <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1,
                  background: "linear-gradient(90deg, transparent, #f97316, transparent)" }} />
                {/* bg glow */}
                <div style={{ position: "absolute", inset: 0,
                  background: "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%)",
                  pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 52, marginBottom: 20 }}>🚀</div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 12,
                    fontFamily: "'Exo 2', sans-serif" }}>
                    Ready to build<br />
                    <span style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      something great?
                    </span>
                  </h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, marginBottom: 28 }}>
                    Open to internships, research collaborations, freelance projects, and open-source work. Let's create something impactful together.
                  </p>
                  <a href={`mailto:${DATA.email}`} {...hoverProps}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white",
                      fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 11,
                      boxShadow: "0 8px 28px rgba(249,115,22,0.35)", transition: "all .2s", cursor: "pointer" }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "0 8px 28px rgba(249,115,22,0.35)"; }}>
                    Start a Conversation ↗
                  </a>
                  <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e", display: "inline-block",
                      animation: "pulse-ring 2s ease-in-out infinite" }} />
                    {/* <span style={{ fontSize: 12, color: "#475569" }}>Available · Replies within 24h</span> */}
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
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#080c14", padding: "28px 0", position: "relative", zIndex: 2 }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#334155" }}>
            © {new Date().getFullYear()} <span style={{ color: "#f97316" }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "#334155" }}>
            Built with <span style={{ color: "#f97316" }}>♥</span> — React · TypeScript · CSS-in-JS
          </p>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} {...hoverProps}
        style={{ position: "fixed", bottom: 30, right: 30, zIndex: 50, width: 46, height: 46,
          borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ea580c)",
          color: "white", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          border: "none", cursor: "pointer",
          opacity: showBtt ? 1 : 0, pointerEvents: showBtt ? "all" : "none",
          transform: showBtt ? "translateY(0)" : "translateY(12px)",
          transition: "opacity .3s, transform .3s",
          boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = showBtt ? "translateY(0)" : "translateY(12px)"}>
        ↑
      </button>
    </>
  );
}
