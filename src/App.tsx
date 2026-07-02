import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Code2, Layers, Database, Wrench, Radar, Compass, Radio, Sparkles,
  Satellite, Github, Linkedin, Mail, Download, MapPin, Phone,
  ArrowUp, MessageCircle, ExternalLink,
} from "lucide-react";

/* ============================================================
   TOKENS — near-black navy ground, one electric-blue accent
   family (a deep signal blue paired with a lighter cyan-blue
   for glow/gradient), nothing else competing for attention.
============================================================ */
const T = {
  bg: "#03050c",
  bgAlt: "#070a16",
  bgCard: "#0a0f1f",
  bgPanel: "#0d1326",
  ink: "#eef1fb",
  accent: "#3d6dff",
  accent2: "#5ee1ff",
  accentSoft: "rgba(61,109,255,0.12)",
  line: "rgba(238,241,251,0.08)",
  lineStrong: "rgba(238,241,251,0.18)",
  textMuted: "#8b93b5",
  textFaint: "#454d70",
  navBg: "rgba(3,5,12,0.82)",
};

const FONT_DISPLAY = "'Sora',sans-serif";
const FONT_BODY = "'Manrope',sans-serif";
const FONT_MONO = "'JetBrains Mono',monospace";

/* ============================================================
   DATA
============================================================ */
const DATA = {
  first: "Gonella Siva Sai",
  last: "Surya Prakash",
  role: "Software Developer & AI Enthusiast",
  tagline: "CSE Undergrad at PES University, Bengaluru — building intelligent systems for the real world.",
  bio: "I'm a third-year Computer Science Engineering student at PES University with a strong grip on full-stack development, distributed systems, and AI-powered applications. My curiosity about how software works under the hood has driven me to build everything from real-time network tools to cloud-native analytics dashboards.",
  bio2: "I thrive in fast-paced collaborative environments — hackathons, research labs, and open-source projects. I'm actively seeking internship opportunities where I can ship meaningful products and grow alongside talented engineers.",
  email: "gonellasurya2005@gmail.com",
  phone: "+91 9880410689",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/GSuryaP",
  linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
  resume: "/GonellaSuryaPrakash_Resume.pdf",

  experiences: [
    {
      role: "B.Tech — Computer Science & Engineering", org: "PES University, Bengaluru",
      period: "2023 – Present", badge: "Education", status: "In Progress",
      bullets: [
        "Maintaining a CGPA of 8.73 through my 5th semester, consistently in the top tier of the batch.",
        "Awarded the Prof. CNR Scholarship for the 1st, 3rd, and 4th semesters — given to the top 20% of students.",
        "Active member of multiple technical and cultural clubs, contributing to hackathons and collaborative engineering projects.",
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
    },
    {
      role: "Research Intern", org: "Center of Computer Networks & CyberSecurity (CCNCS)",
      period: "Jun 2025 – Jul 2025", badge: "Internship", status: "Completed",
      bullets: [
        "Designed and built an intelligent SDN management system integrating the ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI.",
        "Implemented real-time network monitoring, automated flow control, and fault detection via REST APIs with a live visualization dashboard for operator insights.",
      ],
      tags: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python", "REST APIs"],
    },
    {
      role: "Logistics Head", org: "Equinox – The Space Club, PESU ECC",
      period: "May 2025 – Present", badge: "Club Lead", status: "Active",
      bullets: [
        "Oversee end-to-end event planning for workshops, hackathons, and club activities — managing schedules, resources, and cross-functional teams.",
        "Ensure smooth logistical execution for all club-wide events, coordinating with sponsors, venues, and internal teams.",
      ],
      tags: [],
    },
    {
      role: "Social Media & Content Creator Head", org: "Equinox – The Space Club, PESU ECC",
      period: "Sep 2024 – May 2025", badge: "Club Lead", status: "Completed",
      bullets: [
        "Led digital outreach across Instagram and LinkedIn — designed visual content, managed campaigns, and grew community engagement around space-tech events.",
      ],
      tags: [],
    },
  ],

  projects: [
    {
      title: "RASA-Driven SDN Management Tool",
      desc: "A conversational AI system for real-time monitoring, health checks, and fault detection of distributed SDN controllers. Integrates ONOS REST APIs with RASA NLU and Mininet network simulation for automated flow queries and troubleshooting.",
      icon: <Radar size={18} />, tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
      repo: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot", status: "Deployed",
    },
    {
      title: "Distributed Image Processing Pipeline",
      desc: "Apache Kafka-based distributed system with a FastAPI master node and multiple PIL worker nodes. Handles tile splitting, parallel processing, result aggregation, and final image reconstruction — with a live heartbeat monitoring dashboard.",
      icon: <Layers size={18} />, tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker"],
      repo: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline", status: "Deployed",
    },
    {
      title: "GitHub Repository Tracker",
      desc: "Interactive analytics dashboard for tracking GitHub repos, commits, and issues in real time. Features live search, an animated overview, and stats, powered by a Node.js backend and Python sync script.",
      icon: <Compass size={18} />, tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
      repo: "https://github.com/GSuryaP/Github-Repository-Tracker", status: "Deployed",
    },
    {
      title: "Personal Finance Analytics Dashboard",
      desc: "FinTech React dashboard for real-time personal transaction management. Full CRUD operations, dynamic Recharts visualizations (line & pie), dark/light mode, real-time search, and auto-calculated savings rate metrics.",
      icon: <Radio size={18} />, tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
      repo: "https://github.com/GSuryaP/Personal-Finance-Dashboard", status: "Deployed",
    },
    {
      title: "AdaptiveLearn AI",
      desc: "AWS-powered teacher analytics dashboard. Ingests student CSVs from S3 via Python Lambda, uses Amazon Bedrock (Titan LLM) to generate insights, and surfaces weak topics and struggling students through a clean HTML frontend — zero server cost.",
      icon: <Sparkles size={18} />, tags: ["AWS S3", "Lambda", "Amazon Bedrock", "Python", "HTML"],
      repo: "https://github.com/GSuryaP/AdaptiveLearn-AI", status: "Deployed",
    },
    {
      title: "Weather & AQI Tracker",
      desc: "Tkinter desktop app that validates city names via OpenWeatherMap API and displays comprehensive environmental data — temperature, humidity, wind speed, and Air Quality Index — in a clean GUI with robust error handling.",
      icon: <Satellite size={18} />, tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON"],
      repo: "https://github.com/GSuryaP/Weather-AQI_Tracker", status: "Deployed",
    },
  ],
};

/* Skills — plain names only, no proficiency percentages */
const SKILL_CATEGORIES = [
  {
    label: "Languages", icon: <Code2 size={18} />, sub: "Core instruction sets",
    skills: ["Python", "JavaScript", "C++", "C"],
  },
  {
    label: "Frontend", icon: <Layers size={18} />, sub: "Interface layer",
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    label: "Backend & Data", icon: <Database size={18} />, sub: "Server & storage",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "Firebase"],
  },
  {
    label: "Tooling", icon: <Wrench size={18} />, sub: "Ground support",
    skills: ["Git", "GitHub"],
  },
];

const NAV_ITEMS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

/* ============================================================
   REVEAL — simple fade + slide-up on scroll into view.
============================================================ */
function useReveal(threshold = 0.16) {
  const ref = useRef(null);
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

const Reveal = ({ children, delay = 0, className, style }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ============================================================
   TELEMETRY COUNTER
============================================================ */
const Counter = ({ to, suffix = "", label }) => {
  const [val, setVal] = useState("0");
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    const end = parseFloat(to);
    const dur = 1200;
    const run = (ts, t0) => {
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to.includes(".") ? (end * e).toFixed(2) : String(Math.floor(end * e)));
      if (p < 1) requestAnimationFrame((t) => run(t, t0));
    };
    requestAnimationFrame((t) => run(t, t));
  }, [visible, to]);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "26px 14px", background: T.bgCard, border: `1px solid ${T.line}` }}>
      <div style={{ fontSize: "clamp(26px,3.6vw,38px)", fontWeight: 700, lineHeight: 1, marginBottom: 8, fontFamily: FONT_DISPLAY, color: T.ink }}>
        {val}<span style={{ fontSize: "0.6em", color: T.accent2 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: T.textFaint, fontFamily: FONT_MONO }}>{label}</div>
    </div>
  );
};

/* ============================================================
   SKILL CHIP — plain name badge, no bar, no percentage.
============================================================ */
const SkillChip = ({ name, delay }) => {
  const { ref, visible } = useReveal();
  return (
    <span
      ref={ref}
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "8px 14px",
        fontSize: 12.5, fontWeight: 600, color: T.ink,
        fontFamily: FONT_BODY,
        border: `1px solid ${T.line}`, background: T.bgAlt,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(10px)",
        transition: `opacity .4s ease ${delay}s, transform .4s ease ${delay}s`,
      }}
    >
      {name}
    </span>
  );
};

const SkillPanel = ({ cat, index }) => (
  <Reveal delay={index * 0.08} style={{ height: "100%" }}>
    <div style={{ height: "100%", border: `1px solid ${T.line}`, background: T.bgPanel, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
        <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent2, background: T.accentSoft, border: `1px solid ${T.accent}44` }}>{cat.icon}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: FONT_DISPLAY }}>{cat.label}</div>
          <div style={{ fontSize: 9.5, color: T.textFaint, fontFamily: FONT_MONO, letterSpacing: "0.08em" }}>{cat.sub}</div>
        </div>
      </div>
      <div style={{ padding: 18, display: "flex", flexWrap: "wrap", gap: 8, flex: 1, alignContent: "flex-start" }}>
        {cat.skills.map((s, i) => <SkillChip key={s} name={s} delay={i * 0.04} />)}
      </div>
    </div>
  </Reveal>
);

/* ============================================================
   LOG CARD — experience / education entry
============================================================ */
const LogCard = ({ exp, index, isLast }) => {
  const [open, setOpen] = useState(index === 0);
  const statusColor = exp.status === "Active" || exp.status === "In Progress" ? T.accent2 : T.accent;
  return (
    <Reveal delay={index * 0.06}>
      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor, boxShadow: `0 0 10px ${statusColor}aa`, flexShrink: 0 }} />
          {!isLast && <span style={{ width: 1, flex: 1, background: T.lineStrong, marginTop: 6 }} />}
        </div>
        <div style={{ flex: 1, border: `1px solid ${T.line}`, background: T.bgCard, marginBottom: 18 }}>
          <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: FONT_DISPLAY }}>{exp.role}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", background: T.accentSoft, color: T.accent2, border: `1px solid ${T.accent}55`, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: FONT_MONO }}>{exp.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 2, fontFamily: FONT_BODY }}>{exp.org}</div>
              <div style={{ fontSize: 11, color: T.textFaint, fontFamily: FONT_MONO, letterSpacing: "0.03em" }}>{exp.period} · <span style={{ color: statusColor }}>{exp.status}</span></div>
            </div>
            <div style={{ fontSize: 18, color: T.textFaint, flexShrink: 0, transition: "transform .3s", transform: open ? "rotate(45deg)" : "none", fontFamily: "monospace" }}>+</div>
          </button>
          {open && (
            <div style={{ padding: "0 22px 22px", borderTop: `1px solid ${T.line}` }}>
              <div style={{ paddingTop: 16 }}>
                {exp.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: T.accent2, flexShrink: 0, fontFamily: "monospace", fontSize: 13, marginTop: 2 }}>›</span>
                    <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.75, fontFamily: FONT_BODY }}>{b}</p>
                  </div>
                ))}
                {exp.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.line}` }}>
                    {exp.tags.map((t) => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: FONT_MONO, letterSpacing: "0.03em" }}>{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

/* ============================================================
   PROJECT CARD
============================================================ */
const ProjectCard = ({ proj, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={index * 0.06} style={{ height: "100%" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
        height: "100%", display: "flex", flexDirection: "column",
        border: `1px solid ${hov ? T.accent : T.line}`, background: T.bgCard,
        transition: "border-color .2s, transform .2s, box-shadow .2s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 16px 32px -16px ${T.accent}55` : "none",
      }}>
        <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
          <span style={{ color: T.accent2, display: "flex" }}>{proj.icon}</span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: T.accent2, fontFamily: FONT_MONO, letterSpacing: "0.1em", textTransform: "uppercase" }}>{proj.status}</span>
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ marginLeft: "auto", color: hov ? T.accent2 : T.textFaint, display: "flex", alignItems: "center", transition: "color .2s" }}>
              <Github size={14} />
            </a>
          )}
        </div>
        <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: FONT_DISPLAY, lineHeight: 1.3, marginBottom: 10 }}>{proj.title}</h3>
          <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.75, flex: 1, marginBottom: 16, fontFamily: FONT_BODY }}>{proj.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {proj.tags.map((t) => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: FONT_MONO, letterSpacing: "0.03em" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ============================================================
   MISC UI
============================================================ */
const STitle = ({ eyebrow, title, sub, style }) => (
  <Reveal style={{ marginBottom: 48, ...style }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: T.accent2, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: FONT_MONO }}>{eyebrow}</span>
      <div style={{ flex: 1, height: 1, background: T.line }} />
    </div>
    <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: FONT_DISPLAY }}>{title}</h2>
    {sub && <p style={{ fontSize: 13.5, color: T.textMuted, marginTop: 12, maxWidth: 540, lineHeight: 1.75, fontFamily: FONT_BODY }}>{sub}</p>}
  </Reveal>
);

const NavLink = ({ href, label, active }) => (
  <a href={href} style={{
    fontSize: 11, fontWeight: 600, padding: "6px 13px",
    color: active ? T.accent2 : T.textMuted,
    borderBottom: active ? `2px solid ${T.accent2}` : "2px solid transparent",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: FONT_MONO, textDecoration: "none",
    transition: "color .2s, border-color .2s",
  }}>{label}</a>
);

const ContactRow = ({ icon, label, val, href, isAccent }) => {
  const hasLink = !!href;
  const Tag = hasLink ? "a" : "div";
  const linkProps = hasLink ? { href, target: href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank", rel: "noreferrer" } : {};
  return (
    <Tag {...linkProps} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: `1px solid ${T.line}`, background: T.bgCard, textDecoration: "none" }}>
      <div style={{ width: 34, height: 34, flexShrink: 0, background: T.accentSoft, border: `1px solid ${T.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent2 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontFamily: FONT_MONO }}>{label}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: isAccent ? T.accent2 : T.ink, fontFamily: FONT_BODY }}>{val}</div>
      </div>
    </Tag>
  );
};

const SocialBtn = ({ label, href, icon, download }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" download={download || undefined}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
        padding: "11px", fontWeight: 700, fontSize: 11,
        border: `1px solid ${hov ? T.accent : T.line}`, background: T.bgCard, color: hov ? T.accent2 : T.ink,
        fontFamily: FONT_MONO, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
        transition: "border-color .2s, color .2s",
      }}>{icon} {label}</a>
  );
};

const HeroBtn = ({ href, primary, children }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", textDecoration: "none",
      ...(primary
        ? { background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`, color: "#03050c", boxShadow: hov ? `0 0 30px ${T.accent}77` : "0 0 0px transparent" }
        : { border: `1px solid ${hov ? T.accent2 : T.lineStrong}`, background: "transparent", color: hov ? T.accent2 : T.ink }),
      fontWeight: 700, fontSize: 11.5, letterSpacing: "0.08em", fontFamily: FONT_MONO, textTransform: "uppercase",
      transition: "box-shadow .2s, border-color .2s, color .2s",
    }}>{children}</a>
  );
};

const WABtn = () => (
  <a href="https://wa.me/919880410689?text=Hi%20Surya!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect." target="_blank" rel="noopener noreferrer"
    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: `linear-gradient(90deg,${T.accent},${T.accent2})`, color: "#03050c", fontWeight: 700, fontSize: 12, padding: "13px 20px", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", fontFamily: FONT_MONO }}>
    <MessageCircle size={14} /> Message on WhatsApp
  </a>
);

const MailBtn = () => (
  <a href={`mailto:${DATA.email}?subject=Let's Connect&body=Hi Surya,%0D%0A%0D%0AI came across your portfolio and would love to connect.`}
    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", color: T.ink, fontWeight: 700, fontSize: 12, padding: "13px 20px", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", fontFamily: FONT_MONO, border: `1px solid ${T.lineStrong}` }}>
    <Mail size={14} /> Send a Mail
  </a>
);

const GithubLink = () => (
  <a href={DATA.github} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", border: `1px solid ${T.line}`, background: T.bgCard, color: T.textMuted, fontSize: 11, fontWeight: 600, fontFamily: FONT_MONO, letterSpacing: "0.06em", textDecoration: "none" }}>
    <Github size={14} /> github.com/GSuryaP <ExternalLink size={11} />
  </a>
);

const BackToTop = ({ show }) => (
  <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
    position: "fixed", bottom: 28, right: 28, zIndex: 50, width: 40, height: 40, background: T.bgPanel,
    color: T.accent2, border: `1px solid ${T.lineStrong}`, display: "flex", alignItems: "center", justifyContent: "center",
    opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
    transform: show ? "translateY(0)" : "translateY(10px)",
    boxShadow: show ? `0 6px 22px ${T.accent}44` : "none",
    transition: "opacity .3s, transform .3s, box-shadow .3s", cursor: "pointer",
  }}><ArrowUp size={16} /></button>
);

/* ============================================================
   APP
============================================================ */
export default function App() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobile] = useState(false);
  const [showBtt, setShowBtt] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const s = document.createElement("style");
    s.id = "portfolio-base";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'Manrope',sans-serif;overflow-x:hidden;background:${T.bg};color:${T.ink}}
      a{text-decoration:none;color:inherit}
      a,button{cursor:pointer}
      ::-webkit-scrollbar{width:4px}
      ::-webkit-scrollbar-track{background:${T.bg}}
      ::-webkit-scrollbar-thumb{background:${T.accent}}
      @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
      @keyframes pulse-glow{0%,100%{opacity:.5}50%{opacity:1}}
      @keyframes drift{0%{transform:translate(0,0)}50%{transform:translate(-30px,22px)}100%{transform:translate(0,0)}}
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}.hero-grid{grid-template-columns:1fr!important}.hero-grid > div:last-child{order:-1;justify-content:center;display:flex}.about-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}}
    `;
    const old = document.getElementById("portfolio-base");
    if (old) document.head.removeChild(old);
    document.head.appendChild(s);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBtt(window.scrollY > 500);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV_ITEMS[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const C = { maxWidth: 1140, margin: "0 auto", padding: "0 24px" };
  const SP = { position: "relative", zIndex: 2, padding: "96px 0" };

  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: "100vh", position: "relative" }}>

      {/* faint drifting glow, dark-blue on black — no other decoration */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: `
          radial-gradient(circle at 14% 12%, ${T.accentSoft} 0%, transparent 32%),
          radial-gradient(circle at 86% 82%, rgba(94,225,255,0.08) 0%, transparent 32%)`,
        animation: "drift 18s ease-in-out infinite",
      }} />

      {/* scroll progress */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 3, zIndex: 90, background: T.line }}>
        <div style={{ width: "100%", height: `${progress * 100}%`, background: `linear-gradient(180deg, ${T.accent}, ${T.accent2})`, boxShadow: `0 0 12px ${T.accent2}88`, transition: "height .1s linear" }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "10px 0" : "16px 0", transition: "all .3s", background: scrolled ? T.navBg : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${T.line}` : "1px solid transparent" }}>
        <div style={{ ...C, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em", color: T.ink }}>
            GSS<span style={{ color: T.accent2 }}>.</span>dev
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_ITEMS.map((n) => <NavLink key={n} href={`#${n.toLowerCase()}`} label={n} active={active === n} />)}
            </div>
            <button className="nav-ham" onClick={() => setMobile((o) => !o)} style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: `1px solid ${T.line}`, padding: "7px 9px" }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 18, height: 1, background: T.ink, display: "block" }} />)}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div style={{ background: T.navBg, backdropFilter: "blur(14px)", borderTop: `1px solid ${T.line}`, padding: "10px 16px" }}>
            {NAV_ITEMS.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobile(false)} style={{ display: "block", padding: "12px 14px", fontSize: 12, fontWeight: 600, color: active === n ? T.accent2 : T.textMuted, borderBottom: `1px solid ${T.line}`, fontFamily: FONT_MONO, letterSpacing: "0.08em" }}>{n}</a>
            ))}
          </div>
        )}
      </nav>

      <div>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 70px", position: "relative", zIndex: 2 }}>
          <div style={{ ...C, position: "relative", zIndex: 1 }}>
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
              <div>
                <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.05s" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.accent}55`, background: T.accentSoft, padding: "5px 14px", marginBottom: 22, fontFamily: FONT_MONO }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent2, animation: "pulse-glow 1.4s ease-in-out infinite" }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.accent2, letterSpacing: "0.16em", textTransform: "uppercase" }}>Status: Available for Hire</span>
                  </div>
                </div>
                <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.12s" }}>
                  <h1 style={{ fontSize: "clamp(34px,5.2vw,60px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: 18, fontFamily: FONT_DISPLAY }}>
                    {DATA.first}<br />
                    <span style={{ background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{DATA.last}</span>
                  </h1>
                </div>
                <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.19s" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.textMuted, marginBottom: 8, fontFamily: FONT_MONO }}>{DATA.role}</div>
                  <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.8, maxWidth: 480, marginBottom: 30, fontFamily: FONT_BODY }}>{DATA.tagline}</p>
                </div>
                <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.26s", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                  <HeroBtn href="#contact" primary>Get in touch</HeroBtn>
                  <HeroBtn href="#projects">View projects</HeroBtn>
                </div>
                <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.33s", display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 32, paddingTop: 22, borderTop: `1px solid ${T.line}`, flexWrap: "wrap" }}>
                  {[["8.73", "CGPA"], ["6+", "PROJECTS"], ["1", "INTERNSHIP"], ["2+", "CLUB ROLES"]].map(([v, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: T.ink, fontFamily: FONT_DISPLAY }}>{v}</div>
                      <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3, fontFamily: FONT_MONO }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ animation: "fade-up .5s ease forwards", opacity: 0, animationDelay: "0.15s", display: "flex", justifyContent: "center" }}>
                <Portrait />
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ ...SP, background: T.bgAlt }}>
          <div style={C}>
            <STitle eyebrow="Profile" title="About Me" />
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
              <Reveal>
                <div style={{ padding: 30, border: `1px solid ${T.line}`, background: T.bgCard }}>
                  <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.9, marginBottom: 16, fontFamily: FONT_BODY }}>{DATA.bio}</p>
                  <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.9, fontFamily: FONT_BODY }}>{DATA.bio2}</p>
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.line}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    {[["Location", DATA.location], ["University", "PES University"], ["Email", DATA.email], ["Phone", DATA.phone]].map(([l, v]) => (
                      <div key={l}>
                        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: FONT_MONO }}>{l}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: FONT_MONO }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
                  <Counter to="8.73" label="CGPA" />
                  <Counter to="6" suffix="+" label="Projects" />
                  <Counter to="1" label="Internship" />
                  <Counter to="2" suffix="+" label="Club Roles" />
                </div>
                <div style={{ marginTop: 18, padding: "20px 24px", border: `1px solid ${T.line}`, background: T.bgCard }}>
                  <div style={{ fontSize: 10, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16, fontFamily: FONT_MONO }}>Timeline</div>
                  {[
                    { year: "2023", label: "Joined PES University" },
                    { year: "2024", label: "SMCC Head — Equinox Club" },
                    { year: "2025", label: "Research Intern at CCNCS" },
                    { year: "Now", label: "Logistics Head · Building" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 10, color: item.year === "Now" ? T.accent2 : T.textFaint, flexShrink: 0, fontFamily: FONT_MONO, width: 32 }}>{item.year}</span>
                      <span style={{ fontSize: 12.5, color: T.ink, fontFamily: FONT_BODY }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ ...SP }}>
          <div style={C}>
            <STitle eyebrow="Systems" title="Tech Stack" sub="Languages, frameworks, and tools I use to ship end-to-end." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
              {SKILL_CATEGORIES.map((cat, i) => <SkillPanel key={cat.label} cat={cat} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" style={{ ...SP, background: T.bgAlt }}>
          <div style={{ ...C, maxWidth: 840 }}>
            <STitle eyebrow="Track Record" title="Experience & Education" />
            <div>
              {DATA.experiences.map((exp, i) => <LogCard key={i} exp={exp} index={i} isLast={i === DATA.experiences.length - 1} />)}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ ...SP }}>
          <div style={C}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 44 }}>
              <STitle eyebrow="Selected Work" title="Featured Projects" style={{ marginBottom: 0 }} />
              <Reveal delay={0.1}><GithubLink /></Reveal>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
              {DATA.projects.map((p, i) => <ProjectCard key={i} proj={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ ...SP, paddingBottom: 130, background: T.bgAlt }}>
          <div style={{ ...C, maxWidth: 940 }}>
            <STitle eyebrow="Reach Out" title="Get In Touch" sub="Open to internships, research collabs, and freelance. DM anytime." />
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <Reveal>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                    <ContactRow icon={<Mail size={15} />} label="Email" val={DATA.email} href={`mailto:${DATA.email}`} />
                    <ContactRow icon={<Phone size={15} />} label="Phone" val={DATA.phone} href={`tel:${DATA.phone}`} />
                    <ContactRow icon={<MapPin size={15} />} label="Location" val={DATA.location} />
                    <ContactRow icon={<Radio size={15} />} label="Status" val="Open to Opportunities" isAccent />
                  </div>
                </Reveal>
                <Reveal delay={0.12}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <SocialBtn label="GitHub" href={DATA.github} icon={<Github size={13} />} />
                    <SocialBtn label="LinkedIn" href={DATA.linkedin} icon={<Linkedin size={13} />} />
                    <SocialBtn label="Email" href={`mailto:${DATA.email}`} icon={<Mail size={13} />} />
                    <SocialBtn label="Resume" href={DATA.resume} icon={<Download size={13} />} download />
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.08}>
                <div style={{ border: `1px solid ${T.lineStrong}` }}>
                  <div style={{ padding: "10px 16px", background: T.bgAlt, borderBottom: `1px solid ${T.line}` }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", color: T.textFaint, fontFamily: FONT_MONO }}>AVAILABILITY</span>
                  </div>
                  <div style={{ padding: 28, background: T.bgPanel }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
                      <div>
                        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: FONT_MONO }}>Hiring</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.accent2, fontFamily: FONT_MONO }}>Yes</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: FONT_MONO }}>Response time</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: FONT_MONO }}>&lt; 24 hours</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: FONT_MONO }}>Modes</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, fontFamily: FONT_MONO, marginBottom: 16 }}>Internship · Collab · Freelance · OSS</div>
                    <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.8, margin: "0 0 24px", fontFamily: FONT_BODY }}>
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
            <p style={{ fontSize: 11, color: T.textFaint, fontFamily: FONT_BODY }}>© {new Date().getFullYear()} <span style={{ color: T.textMuted }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.</p>
            <p style={{ fontSize: 11, color: T.textFaint, fontFamily: FONT_MONO }}>React · Sora · JetBrains Mono</p>
          </div>
        </footer>
      </div>

      <BackToTop show={showBtt} />
    </div>
  );
}

/* ============================================================
   PORTRAIT — just a shadow. No ring, no badge, no caption.
============================================================ */
const Portrait = () => (
  <div
    style={{
      width: 280, height: 280, borderRadius: 28, overflow: "hidden", flexShrink: 0,
      boxShadow: `0 46px 90px -24px ${T.accent}77, 0 14px 40px -10px rgba(0,0,0,.6)`,
      background: T.bgAlt,
    }}
  >
    <img
      src="/profile.png"
      alt="Surya Prakash"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      onError={(e) => { const t = e.target; t.style.display = "none"; t.nextSibling.style.display = "flex"; }}
    />
    <div style={{
      display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center",
      fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 76, color: T.accent2, background: T.bgAlt,
    }}>S</div>
  </div>
);
