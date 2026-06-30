import React, { useState, useEffect, useRef } from "react";
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase,
} from "react-icons/si";
import { Code2, Layers, Database, Wrench } from "lucide-react";

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
interface SkillCategory { label: string; icon: React.ReactNode; skills: Skill[]; }

/* ============================================================
   DESIGN DIRECTION — "CIRCUIT CORE"
   A CSE-native motherboard / compiler aesthetic: near-black PCB
   background etched with faint copper-trace lines, a two-tone
   neon signal (cyan signal / violet clock) standing in for the
   data + power rails of a board, a glitching boot sequence in
   the hero, and a "trace" divider that visibly routes between
   sections like wiring on a chip. Display face is a geometric
   grotesk (Space Grotesk) to read like silkscreen text on a
   board; JetBrains Mono carries every literal value, exactly
   like a datasheet or a terminal.
============================================================ */
interface Theme {
  bg: string; bgAlt: string; bgCard: string; bgPanel: string;
  ink: string; signal: string; clock: string; signalSoft: string; clockSoft: string;
  line: string; lineStrong: string;
  textMuted: string; textFaint: string;
  navBg: string;
}

const T: Theme = {
  bg: "#05070a", bgAlt: "#030507", bgCard: "#0a0f16", bgPanel: "#0d131c",
  ink: "#e8f3f5",
  signal: "#39ffd6", clockSoft: "rgba(168,85,247,0.14)",
  clock: "#a855f7", signalSoft: "rgba(57,255,214,0.12)",
  line: "rgba(232,243,245,0.09)", lineStrong: "rgba(232,243,245,0.22)",
  textMuted: "#90a4ac", textFaint: "#4d5b63",
  navBg: "rgba(5,7,10,0.86)",
};

/* ============================================================
   DATA
============================================================ */
const DATA = {
  name:     "Gonella Siva Sai\nSurya Prakash",
  role:     "Full-Stack Developer & AI Enthusiast",
  tagline:  "CSE Undergrad at PES University, Bengaluru · Building intelligent systems for the real world.",
  bio:      "I'm a third-year Computer Science Engineering student at PES University with a strong grip on full-stack development, distributed systems, and AI-powered applications. My curiosity about how software works under the hood has driven me to build everything from real-time network tools to cloud-native analytics dashboards.",
  bio2:     "I thrive in fast-paced collaborative environments — hackathons, research labs, and open-source projects. I'm actively seeking internship opportunities where I can ship meaningful products and grow alongside talented engineers.",
  email:    "gonellasurya2005@gmail.com",
  phone:    "+91 9880410689",
  location: "Bengaluru, Karnataka, India",
  github:   "https://github.com/GSuryaP",
  linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
  resume:   "/GonellaSuryaPrakash_Resume.pdf",

  experiences: [
    {
      role: "B.Tech — Computer Science & Engineering", org: "PES University, Bengaluru",
      period: "2023 – Present", badge: "Education",
      bullets: [
        "Maintaining a CGPA of 8.73 through my 5th semester, consistently in the top tier of the batch.",
        "Awarded the Prof. CNR Scholarship for the 1st, 3rd, and 4th semesters — given to the top 20% of students.",
        "Active member of multiple technical and cultural clubs, contributing to hackathons and collaborative engineering projects.",
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
    },
    {
      role: "Research Intern", org: "Center of Computer Networks & CyberSecurity (CCNCS)",
      period: "Jun 2025 – Jul 2025", badge: "Internship",
      bullets: [
        "Designed and built an intelligent SDN management system integrating the ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI.",
        "Implemented real-time network monitoring, automated flow control, and fault detection via REST APIs with a live visualization dashboard for operator insights.",
      ],
      tags: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python", "REST APIs"],
    },
    {
      role: "Logistics Head", org: "Equinox – The Space Club, PESU ECC",
      period: "May 2025 – Present", badge: "Club Lead",
      bullets: [
        "Oversee end-to-end event planning for workshops, hackathons, and club activities — managing schedules, resources, and cross-functional teams.",
        "Ensure smooth logistical execution for all club-wide events, coordinating with sponsors, venues, and internal teams.",
      ],
      tags: [],
    },
    {
      role: "Social Media & Content Creator Head", org: "Equinox – The Space Club, PESU ECC",
      period: "Sep 2024 – May 2025", badge: "Club Lead",
      bullets: [
        "Led digital outreach across Instagram and LinkedIn — designed visual content, managed campaigns, and grew community engagement around space-tech events.",
      ],
      tags: [],
    },
  ] as Experience[],

  projects: [
    {
      title: "RASA-Driven SDN Management Tool",
      desc: "A conversational AI system for real-time monitoring, health checks, and fault detection of distributed SDN controllers. Integrates ONOS REST APIs with RASA NLU and Mininet network simulation for automated flow queries and troubleshooting.",
      emoji: "🕸️", tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
      repo: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
    },
    {
      title: "Distributed Image Processing Pipeline",
      desc: "Apache Kafka-based distributed system with a FastAPI master node and multiple PIL worker nodes. Handles tile splitting, parallel processing, result aggregation, and final image reconstruction — with a live heartbeat monitoring dashboard.",
      emoji: "🖼️", tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker"],
      repo: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
    },
    {
      title: "GitHub Repository Tracker",
      desc: "Interactive analytics dashboard for tracking GitHub repos, commits, and issues in real time. Features live search, aurora animated background, stats overview, powered by a Node.js backend and Python sync script.",
      emoji: "📊", tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
      repo: "https://github.com/GSuryaP/Github-Repository-Tracker",
    },
    {
      title: "Personal Finance Analytics Dashboard",
      desc: "FinTech React dashboard for real-time personal transaction management. Full CRUD operations, dynamic Recharts visualizations (line & pie), dark/light mode, real-time search, and auto-calculated savings rate metrics.",
      emoji: "💰", tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
      repo: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
    },
    {
      title: "AdaptiveLearn AI",
      desc: "AWS-powered teacher analytics dashboard. Ingests student CSVs from S3 via Python Lambda, uses Amazon Bedrock (Titan LLM) to generate insights, and surfaces weak topics and struggling students through a clean HTML frontend — zero server cost.",
      emoji: "🧠", tags: ["AWS S3", "Lambda", "Amazon Bedrock", "Python", "HTML"],
      repo: "https://github.com/GSuryaP/AdaptiveLearn-AI",
    },
    {
      title: "Weather & AQI Tracker",
      desc: "Tkinter desktop app that validates city names via OpenWeatherMap API and displays comprehensive environmental data — temperature, humidity, wind speed, and Air Quality Index — in a clean GUI with robust error handling.",
      emoji: "🌤️", tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON"],
      repo: "https://github.com/GSuryaP/Weather-AQI_Tracker",
    },
  ] as Project[],
};

/* ============================================================
   SKILLS — organized into datasheet-style categories
============================================================ */
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    icon: <Code2 size={20} />,
    skills: [
      { name: "Python",     icon: <SiPython />,     color: "#3776AB", pct: 90 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", pct: 85 },
      { name: "C++",        icon: <SiCplusplus />,  color: "#5b9bd5", pct: 77 },
      { name: "C",          icon: <SiC />,           color: "#6699cc", pct: 74 },
    ],
  },
  {
    label: "Frameworks & Frontend",
    icon: <Layers size={20} />,
    skills: [
      { name: "React",      icon: <SiReact />,       color: "#61DAFB", pct: 82 },
      { name: "HTML5",      icon: <SiHtml5 />,       color: "#E34F26", pct: 92 },
      { name: "CSS3",       icon: <SiCss />,         color: "#1572B6", pct: 88 },
      { name: "Tailwind",   icon: <SiTailwindcss />, color: "#06B6D4", pct: 86 },
    ],
  },
  {
    label: "Backend & Databases",
    icon: <Database size={20} />,
    skills: [
      { name: "Node.js",    icon: <SiNodedotjs />, color: "#339933", pct: 80 },
      { name: "Express",    icon: <SiExpress />,   color: "#9aa7b5", pct: 78 },
      { name: "MongoDB",    icon: <SiMongodb />,   color: "#47A248", pct: 75 },
      { name: "MySQL",      icon: <SiMysql />,     color: "#4479A1", pct: 73 },
      { name: "Firebase",   icon: <SiFirebase />,  color: "#FFCA28", pct: 70 },
    ],
  },
  {
    label: "Tools & Version Control",
    icon: <Wrench size={20} />,
    skills: [
      { name: "Git",        icon: <SiGit />,    color: "#F05032", pct: 84 },
      { name: "GitHub",     icon: <SiGithub />, color: "#9aa7b5", pct: 83 },
    ],
  },
];

/* ============================================================
   HOOKS
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
  const from = dir === "left" ? "translateX(-24px)" : dir === "right" ? "translateX(24px)" : "translateY(18px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : from,
      transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}s, transform .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

/* ============================================================
   CIRCUIT TRACE DIVIDER — signature element.
   A literal animated wire that "routes" a signal pulse between
   sections, like trace + via on a PCB.
============================================================ */
const TraceDivider: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <div style={{ position: "relative", height: 46, overflow: "hidden", zIndex: 2 }}>
    <svg viewBox="0 0 1200 46" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: flip ? "block" : "block", transform: flip ? "scaleX(-1)" : "none" }}>
      <path d="M0,23 L420,23 L460,3 L740,3 L780,23 L1200,23" fill="none" stroke={T.line} strokeWidth="1.5" />
      <circle cx="460" cy="3" r="3" fill={T.bg} stroke={T.lineStrong} strokeWidth="1" />
      <circle cx="780" cy="23" r="3" fill={T.bg} stroke={T.lineStrong} strokeWidth="1" />
      <circle r="4" fill={T.signal} style={{ filter: `drop-shadow(0 0 6px ${T.signal})` }}>
        <animateMotion dur="3.2s" repeatCount="indefinite"
          path="M0,23 L420,23 L460,3 L740,3 L780,23 L1200,23" />
      </circle>
    </svg>
  </div>
);

/* ============================================================
   FIELD — labeled datasheet value
============================================================ */
const Field: React.FC<{ label: string; children: React.ReactNode; accent?: boolean }> = ({ label, children, accent }) => (
  <div>
    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: accent ? T.signal : T.ink, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>
  </div>
);

/* ============================================================
   ANIMATED COUNTER
============================================================ */
const Counter: React.FC<{ to: string; suffix?: string; label: string }> = ({ to, suffix = "", label }) => {
  const [val, setVal] = useState("0");
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    const end = parseFloat(to); const dur = 1300;
    const run = (ts: number, t0: number) => {
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to.includes(".") ? (end * e).toFixed(2) : String(Math.floor(end * e)));
      if (p < 1) requestAnimationFrame(t => run(t, t0));
    };
    requestAnimationFrame(t => run(t, t));
  }, [visible, to]);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "26px 14px", background: T.bgCard, border: `1px solid ${T.line}`, position: "relative" }}>
      <div style={{ fontSize: "clamp(26px,3.6vw,38px)", fontWeight: 700, lineHeight: 1, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif", color: T.ink }}>
        {val}<span style={{ fontSize: "0.6em", color: T.signal }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
    </div>
  );
};

/* ============================================================
   SKILL ROW
============================================================ */
const SkillCard: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)",
        transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s, border-color .2s, background .2s, box-shadow .2s`,
        background: hov ? T.signalSoft : T.bgCard,
        border: `1px solid ${hov ? T.signal : T.line}`,
        boxShadow: hov ? `0 0 18px -4px ${T.signal}66` : "none",
        padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8,
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 18, color: skill.color, flexShrink: 0 }}>{skill.icon}</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.02em" }}>{skill.name}</span>
        <span />
      </div>
    </div>
  );
};

/* ============================================================
   SKILL CATEGORY PANEL — datasheet card, like the reference grid
============================================================ */
const SkillCategoryPanel: React.FC<{ cat: SkillCategory; index: number }> = ({ cat, index }) => (
  <Reveal delay={index * 0.08} style={{ height: "100%" }}>
    <div style={{ height: "100%", border: `1px solid ${T.line}`, background: T.bgPanel, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
        <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: T.signal, background: T.signalSoft, border: `1px solid ${T.signal}44` }}>
          {cat.icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{cat.label}</div>
          <div style={{ fontSize: 9.5, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.1em" }}>
            {String(cat.skills.length).padStart(2, "0")} MODULE{cat.skills.length !== 1 ? "S" : ""}
          </div>
        </div>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {cat.skills.map((s, i) => <SkillCard key={s.name} skill={s} delay={i * 0.04} />)}
      </div>
    </div>
  </Reveal>
);

/* ============================================================
   EXPERIENCE CARD
============================================================ */
const ExpCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <Reveal delay={index * 0.08}>
      <div style={{ border: `1px solid ${T.line}`, background: T.bgCard }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "20px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{exp.role}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", background: T.signalSoft, color: T.signal, border: `1px solid ${T.signal}55`, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>{exp.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 2 }}>{exp.org}</div>
              <div style={{ fontSize: 11, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{exp.period}</div>
            </div>
          </div>
          <div style={{ fontSize: 18, color: T.textFaint, flexShrink: 0, transition: "transform .25s", transform: open ? "rotate(45deg)" : "none", fontFamily: "monospace" }}>+</div>
        </button>
        {open && (
          <div style={{ padding: "0 22px 22px", borderTop: `1px solid ${T.line}` }}>
            <div style={{ paddingTop: 16 }}>
              {exp.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: T.signal, flexShrink: 0, fontFamily: "monospace", fontSize: 13, marginTop: 2 }}>{">"}</span>
                  <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.75 }}>{b}</p>
                </div>
              ))}
              {exp.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.line}` }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{t}</span>
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
  return (
    <Reveal delay={index * 0.06} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: "100%", display: "flex", flexDirection: "column",
          border: `1px solid ${hov ? T.signal : T.line}`,
          background: T.bgCard, transition: "border-color .2s, transform .2s, box-shadow .2s",
          transform: hov ? "translateY(-3px)" : "none",
          boxShadow: hov ? `0 14px 30px -12px ${T.signal}44` : "none",
        }}>
        <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
          <span style={{ fontSize: 10, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.06em" }}>
            PID. {String(index + 1).padStart(2, "0")}
          </span>
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
              style={{ marginLeft: "auto", color: hov ? T.signal : T.textFaint, display: "flex", alignItems: "center", transition: "color .2s" }}>
              <SiGithub size={13} />
            </a>
          )}
        </div>
        <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>{proj.emoji}</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.3 }}>{proj.title}</h3>
          </div>
          <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.75, flex: 1, marginBottom: 16 }}>{proj.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {proj.tags.map(t => (
              <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{t}</span>
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
  <Reveal style={{ marginBottom: 48 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.signal, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>{tag}</span>
      <div style={{ flex: 1, height: 1, background: T.line }} />
    </div>
    <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>{title}</h2>
    {sub && <p style={{ fontSize: 13.5, color: T.textMuted, marginTop: 12, maxWidth: 520, lineHeight: 1.75 }}>{sub}</p>}
  </Reveal>
);

/* ============================================================
   NAV LINK
============================================================ */
const NavLink: React.FC<{ href: string; label: string; active: boolean }> = ({ href, label, active }) => (
  <a href={href} style={{
    fontSize: 11, fontWeight: 600, padding: "6px 13px",
    color: active ? T.signal : T.textMuted,
    borderBottom: active ? `2px solid ${T.signal}` : "2px solid transparent",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "'JetBrains Mono',monospace", textDecoration: "none",
    transition: "color .2s, border-color .2s",
  }}>{label}</a>
);

/* ============================================================
   CONTACT ROW
============================================================ */
const ContactRow: React.FC<{ icon: string; label: string; val: string; href?: string; isAccent?: boolean }> = ({ icon, label, val, href, isAccent }) => {
  const hasLink = !!href;
  const Tag = (hasLink ? "a" : "div") as "a" | "div";
  const linkProps = hasLink ? {
    href,
    target: href!.startsWith("mailto") || href!.startsWith("tel") ? undefined : "_blank",
    rel: "noreferrer",
  } : {};
  return (
    <Tag {...linkProps} style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
      border: `1px solid ${T.line}`, background: T.bgCard,
      textDecoration: "none",
    }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, background: T.signalSoft, border: `1px solid ${T.signal}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: T.signal }}>{icon}</div>
      <div>
        <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: isAccent ? T.signal : T.ink }}>{val}</div>
      </div>
    </Tag>
  );
};

/* ============================================================
   SOCIAL BUTTON
============================================================ */
const SocialBtn: React.FC<{ label: string; href: string; icon: React.ReactNode; download?: boolean }> = ({ label, href, icon, download }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      download={download || undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
        padding: "11px", fontWeight: 700, fontSize: 11,
        border: `1px solid ${hov ? T.signal : T.line}`, background: T.bgCard, color: hov ? T.signal : T.ink,
        fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em",
        textTransform: "uppercase", textDecoration: "none", transition: "border-color .2s, color .2s",
      }}>
      {icon} {label}
    </a>
  );
};

/* ============================================================
   HERO CTA BUTTON
============================================================ */
const HeroBtn: React.FC<{ href: string; primary?: boolean; children: React.ReactNode }> = ({ href, primary, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
      textDecoration: "none",
      ...(primary
        ? { background: T.signal, color: "#031210", boxShadow: hov ? `0 0 26px ${T.signal}88` : `0 0 0px ${T.signal}00` }
        : { border: `1px solid ${hov ? T.clock : T.lineStrong}`, background: "transparent", color: hov ? T.clock : T.ink }),
      fontWeight: 700, fontSize: 11.5, letterSpacing: "0.08em",
      fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase",
      transition: "box-shadow .25s, border-color .25s, color .25s",
    }}>{children}</a>
  );
};

/* ============================================================
   WHATSAPP BUTTON
============================================================ */
const WABtn: React.FC = () => (
  <a
    href="https://wa.me/919880410689?text=Hi%20Surya!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect."
    target="_blank" rel="noopener noreferrer"
    style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: `linear-gradient(90deg,${T.signal},${T.clock})`, color: "#03050a", fontWeight: 700, fontSize: 12,
      padding: "13px 20px", letterSpacing: "0.08em", textTransform: "uppercase",
      textDecoration: "none", fontFamily: "'JetBrains Mono',monospace",
    }}>
    Message on WhatsApp ↗
  </a>
);

/* ============================================================
   SEND MAIL BUTTON
============================================================ */
const MailBtn: React.FC = () => (
  <a
    href={`mailto:${DATA.email}?subject=Let's Connect&body=Hi Surya,%0D%0A%0D%0AI came across your portfolio and would love to connect.`}
    style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: "transparent", color: T.ink, fontWeight: 700, fontSize: 12,
      padding: "13px 20px", letterSpacing: "0.08em", textTransform: "uppercase",
      textDecoration: "none", fontFamily: "'JetBrains Mono',monospace",
      border: `1px solid ${T.lineStrong}`,
    }}>
    Send a Mail ↗
  </a>
);

/* ============================================================
   GITHUB PROJECTS LINK
============================================================ */
const GithubLink: React.FC = () => (
  <a href={DATA.github} target="_blank" rel="noreferrer" style={{
    display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px",
    border: `1px solid ${T.line}`, background: T.bgCard, color: T.textMuted,
    fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
    letterSpacing: "0.06em", textDecoration: "none",
  }}>
    <SiGithub size={13} /> github.com/GSuryaP ↗
  </a>
);

/* ============================================================
   BACK TO TOP
============================================================ */
const BackToTop: React.FC<{ show: boolean }> = ({ show }) => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 50,
      width: 40, height: 40, background: T.bgPanel,
      color: T.signal, border: `1px solid ${T.lineStrong}`, fontSize: 15,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
      transform: show ? "translateY(0)" : "translateY(10px)",
      boxShadow: show ? `0 6px 22px ${T.signal}33` : "none",
      transition: "opacity .3s, transform .3s, box-shadow .3s",
      cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
    }}>↑</button>
);

/* ============================================================
   NAV ITEMS
============================================================ */
const NAV_ITEMS = ["Home","About","Skills","Experience","Projects","Contact"];

/* ============================================================
   APP
============================================================ */
export default function App() {
  const [active, setActive]       = useState("Home");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [showBtt, setShowBtt]     = useState(false);
  const [typedText, setTypedText] = useState("");
  const [bootDone, setBootDone]   = useState(false);

  useEffect(() => {
    const full = `> whoami --role` ;
    let i = 0;
    const iv = setInterval(() => {
      if (i <= full.length) { setTypedText(full.slice(0, i)); i++; }
      else { clearInterval(iv); setBootDone(true); }
    }, 38);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const s = document.createElement("style");
    s.id = "portfolio-base";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'Inter',sans-serif;overflow-x:hidden;background:${T.bg};color:${T.ink}}
      a{text-decoration:none;color:inherit}
      a,button{cursor:pointer}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-track{background:${T.bg}}
      ::-webkit-scrollbar-thumb{background:${T.signal}}
      @keyframes slide-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
      @keyframes slide-right{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:none}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes pulse-glow{0%,100%{opacity:.55}50%{opacity:1}}
      @keyframes drift{0%{background-position:0 0,0 0}100%{background-position:600px 0,0 600px}}
      @keyframes glitch{
        0%,100%{ clip-path: inset(0 0 0 0); transform:translate(0,0); }
        20%{ clip-path: inset(20% 0 40% 0); transform:translate(-1px,1px); }
        40%{ clip-path: inset(60% 0 5% 0); transform:translate(1px,-1px); }
        60%{ clip-path: inset(10% 0 70% 0); transform:translate(-1px,0); }
        80%{ clip-path: inset(40% 0 20% 0); transform:translate(1px,1px); }
      }
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}.hero-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}}
    `;
    const old = document.getElementById("portfolio-base");
    if (old) document.head.removeChild(old);
    document.head.appendChild(s);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBtt(window.scrollY > 500);
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV_ITEMS[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C: React.CSSProperties = { maxWidth: 1140, margin: "0 auto", padding: "0 24px" };
  const SP: React.CSSProperties = { position: "relative", zIndex: 2, padding: "96px 0" };

  return (
    /* zoom controls the overall page font/element size — change 1.15 to taste
       e.g. 1.1 for a subtle bump, 1.25 for noticeably larger */
    <div style={{ background: T.bg, color: T.ink, minHeight: "100vh", zoom: 1.25 }}>

      {/* PCB trace backdrop — faint copper grid + drifting diagonal traces */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: `
          linear-gradient(${T.line} 1px,transparent 1px),
          linear-gradient(90deg,${T.line} 1px,transparent 1px)`,
        backgroundSize: "56px 56px",
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: `
          radial-gradient(circle at 14% 18%, ${T.signalSoft} 0%, transparent 32%),
          radial-gradient(circle at 86% 78%, ${T.clockSoft} 0%, transparent 32%)`,
        animation: "pulse-glow 7s ease-in-out infinite",
      }} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "10px 0" : "16px 0", transition: "all .3s", background: scrolled ? T.navBg : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${T.line}` : "1px solid transparent" }}>
        <div style={{ ...C, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em", color: T.ink, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: T.signal }}>&lt;</span>GSS<span style={{ color: T.clock }}>/</span>dev<span style={{ color: T.signal }}>&gt;</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_ITEMS.map(n => <NavLink key={n} href={`#${n.toLowerCase()}`} label={n} active={active === n} />)}
            </div>
            <button className="nav-ham" onClick={() => setMobile(o => !o)}
              style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: `1px solid ${T.line}`, padding: "7px 9px" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 18, height: 1, background: T.ink, display: "block" }} />)}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div style={{ background: T.navBg, backdropFilter: "blur(14px)", borderTop: `1px solid ${T.line}`, padding: "10px 16px" }}>
            {NAV_ITEMS.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobile(false)}
                style={{ display: "block", padding: "12px 14px", fontSize: 12, fontWeight: 600, color: active === n ? T.signal : T.textMuted, borderBottom: `1px solid ${T.line}`, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em" }}>
                {n}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 70px", position: "relative", zIndex: 2 }}>
        <div style={{ ...C, position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.05s" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.signal}55`, background: T.signalSoft, padding: "5px 14px", marginBottom: 22, fontFamily: "'JetBrains Mono',monospace" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.signal, animation: "pulse-glow 1.4s ease-in-out infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.signal, letterSpacing: "0.16em", textTransform: "uppercase" }}>Status: Available for Hire</span>
                </div>
              </div>
              <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.12s", position: "relative" }}>
                <h1 style={{ fontSize: "clamp(34px,5.2vw,62px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.01em", marginBottom: 18, fontFamily: "'Space Grotesk',sans-serif", position: "relative" }}>
                  {DATA.name.split("\n")[0]}<br />
                  <span style={{ color: T.signal, position: "relative", display: "inline-block" }}>
                    {DATA.name.split("\n")[1]}
                    <span aria-hidden style={{ position: "absolute", inset: 0, color: T.clock, mixBlendMode: "screen", animation: "glitch 4.5s steps(2,end) infinite" }}>{DATA.name.split("\n")[1]}</span>
                  </span>
                </h1>
              </div>
              <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.2s" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.signal, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                  {typedText}<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.textMuted, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace", opacity: bootDone ? 1 : 0, transition: "opacity .4s" }}>
                  {DATA.role}
                </div>
                <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.75, maxWidth: 480, marginBottom: 30 }}>{DATA.tagline}</p>
              </div>
              <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.28s", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                <HeroBtn href="#contact" primary>Get in touch</HeroBtn>
                <HeroBtn href="#projects">View projects</HeroBtn>
              </div>
              <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.36s", display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 32, paddingTop: 22, borderTop: `1px solid ${T.line}`, flexWrap: "wrap" }}>
                {[["8.73","CGPA"],["6+","PROJECTS"],["1","INTERNSHIP"],["2+","CLUB ROLES"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{v}</div>
                    <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature element: datasheet title-block card — image shown in full, never cropped */}
            <div style={{ animation: "slide-right .6s .15s ease forwards", opacity: 0, width: 300 }}>
              <div style={{ border: `1px solid ${T.lineStrong}`, background: T.bgPanel, boxShadow: `0 10px 40px rgba(0,0,0,0.55), 0 0 0 1px ${T.signal}11` }}>
                <div style={{ borderBottom: `1px solid ${T.line}`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bgAlt }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>PROFILE / SPEC</span>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: T.signal, fontFamily: "'JetBrains Mono',monospace" }}>REV. 2026</span>
                </div>
                <div style={{ aspectRatio: "4/3", background: T.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src="/profile.png" alt="Surya Prakash" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={e => { const t = e.target as HTMLImageElement; t.style.display = "none"; (t.nextSibling as HTMLElement).style.display = "flex"; }} />
                  <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 56, fontWeight: 700, color: T.signal, fontFamily: "'Space Grotesk',sans-serif" }}>S</span>
                  </div>
                </div>
                <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Role">Full-Stack Dev</Field>
                  <Field label="Focus" accent>AI / Systems</Field>
                  <Field label="Base">Bengaluru, IN</Field>
                  <Field label="Status" accent>Open</Field>
                </div>
                <div style={{ borderTop: `1px solid ${T.line}`, padding: "10px 16px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Python","React","Node.js"].map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* ── ABOUT ── */}
      <section id="about" style={{ ...SP, background: T.bgAlt }}>
        <div style={C}>
          <STitle tag="01 — Profile" title="About Me" />
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
            <Reveal dir="left">
              <div style={{ padding: 30, border: `1px solid ${T.line}`, background: T.bgCard }}>
                <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.85, marginBottom: 16 }}>{DATA.bio}</p>
                <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.85 }}>{DATA.bio2}</p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.line}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <Field label="Location">{DATA.location}</Field>
                  <Field label="University">PES University</Field>
                  <Field label="Email">{DATA.email}</Field>
                  <Field label="Phone">{DATA.phone}</Field>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
                <Counter to="8.73" label="CGPA" />
                <Counter to="6" suffix="+" label="Projects" />
                <Counter to="1" label="Internship" />
                <Counter to="2" suffix="+" label="Club Roles" />
              </div>
              <div style={{ marginTop: 18, padding: "20px 24px", border: `1px solid ${T.line}`, background: T.bgCard }}>
                <div style={{ fontSize: 10, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" }}>Timeline</div>
                {[
                  { year: "2023", label: "Joined PES University" },
                  { year: "2024", label: "SMCC Head — Equinox Club" },
                  { year: "2025", label: "Research Intern at CCNCS" },
                  { year: "Now",  label: "Logistics Head · Building" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 10, color: item.year === "Now" ? T.signal : T.textFaint, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", width: 32 }}>{item.year}</span>
                    <span style={{ fontSize: 12.5, color: T.ink }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <TraceDivider flip />

      {/* ── SKILLS ── */}
      <section id="skills" style={{ ...SP }}>
        <div style={C}>
          <STitle tag="02 — Stack" title="Tech Stack" sub="Languages, frameworks, and tools I use to ship end-to-end — organized by board module." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {SKILL_CATEGORIES.map((cat, i) => <SkillCategoryPanel key={cat.label} cat={cat} index={i} />)}
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ ...SP, background: T.bgAlt }}>
        <div style={{ ...C, maxWidth: 840 }}>
          <STitle tag="03 — Record" title="Experience & Education" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DATA.experiences.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}
          </div>
        </div>
      </section>

      <TraceDivider flip />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ ...SP }}>
        <div style={C}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 44 }}>
            <Reveal>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: T.signal, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>04 — Build Log</span>
                  <div style={{ flex: 1, height: 1, background: T.line }} />
                </div>
                <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>Featured Projects</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}><GithubLink /></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
            {DATA.projects.map((p, i) => <ProjCard key={i} proj={p} index={i} />)}
          </div>
        </div>
      </section>

      <TraceDivider />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...SP, paddingBottom: 130, background: T.bgAlt }}>
        <div style={{ ...C, maxWidth: 940 }}>
          <STitle tag="05 — Contact" title="Get In Touch" sub="Open to internships, research collabs, and freelance. DM anytime." />
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div>
              <Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                  <ContactRow icon="✉" label="Email"    val={DATA.email}    href={`mailto:${DATA.email}`} />
                  <ContactRow icon="☎" label="Phone"    val={DATA.phone}    href={`tel:${DATA.phone}`}    />
                  <ContactRow icon="◎" label="Location" val={DATA.location}                               />
                  <ContactRow icon="●" label="Status"   val="Open to Opportunities" isAccent             />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <SocialBtn label="GitHub"   href={DATA.github}            icon={<SiGithub size={13} />} />
                  <SocialBtn label="LinkedIn" href={DATA.linkedin}          icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>} />
                  <SocialBtn label="Email"    href={`mailto:${DATA.email}`}  icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} />
                  <SocialBtn label="Resume"   href={DATA.resume}             icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>} download />
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div style={{ border: `1px solid ${T.lineStrong}` }}>
                <div style={{ padding: "10px 16px", background: T.bgAlt, borderBottom: `1px solid ${T.line}` }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>AVAILABILITY / SPEC</span>
                </div>
                <div style={{ padding: 28, background: T.bgPanel }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
                    <Field label="Hiring" accent>Yes</Field>
                    <Field label="Response time">&lt; 24 hours</Field>
                  </div>
                  <Field label="Modes">Internship · Collab · Freelance · OSS</Field>
                  <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.8, margin: "16px 0 24px" }}>
                    Open to internships, research collaborations, freelance projects, and open-source work. Let's build something impactful together.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <WABtn />
                    <MailBtn />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: "24px 0", position: "relative", zIndex: 2 }}>
        <div style={{ ...C, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: T.textFaint }}>© {new Date().getFullYear()} <span style={{ color: T.textMuted }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.</p>
          <p style={{ fontSize: 11, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>React · TypeScript · CSS-in-JS</p>
        </div>
      </footer>

      <BackToTop show={showBtt} />
    </div>
  );
}
