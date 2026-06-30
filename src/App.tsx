// import React, { useState, useEffect, useRef } from "react";
// import {
//   SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
//   SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
//   SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase,
// } from "react-icons/si";
// import { Code2, Layers, Database, Wrench } from "lucide-react";

// /* ============================================================
//    TYPES
// ============================================================ */
// interface Experience {
//   role: string; org: string; period: string; badge: string;
//   bullets: string[]; tags: string[];
// }
// interface Project {
//   title: string; desc: string; emoji: string;
//   tags: string[]; repo?: string; live?: string;
// }
// interface Skill { name: string; icon: React.ReactNode; color: string; pct: number; }
// interface SkillCategory { label: string; icon: React.ReactNode; skills: Skill[]; }

// /* ============================================================
//    DESIGN DIRECTION — "CIRCUIT CORE"
//    A CSE-native motherboard / compiler aesthetic: near-black PCB
//    background etched with faint copper-trace lines, a two-tone
//    neon signal (cyan signal / violet clock) standing in for the
//    data + power rails of a board, a glitching boot sequence in
//    the hero, and a "trace" divider that visibly routes between
//    sections like wiring on a chip. Display face is a geometric
//    grotesk (Space Grotesk) to read like silkscreen text on a
//    board; JetBrains Mono carries every literal value, exactly
//    like a datasheet or a terminal.
// ============================================================ */
// interface Theme {
//   bg: string; bgAlt: string; bgCard: string; bgPanel: string;
//   ink: string; signal: string; clock: string; signalSoft: string; clockSoft: string;
//   line: string; lineStrong: string;
//   textMuted: string; textFaint: string;
//   navBg: string;
// }

// const T: Theme = {
//   bg: "#05070a", bgAlt: "#030507", bgCard: "#0a0f16", bgPanel: "#0d131c",
//   ink: "#e8f3f5",
//   signal: "#39ffd6", clockSoft: "rgba(168,85,247,0.14)",
//   clock: "#a855f7", signalSoft: "rgba(57,255,214,0.12)",
//   line: "rgba(232,243,245,0.09)", lineStrong: "rgba(232,243,245,0.22)",
//   textMuted: "#90a4ac", textFaint: "#4d5b63",
//   navBg: "rgba(5,7,10,0.86)",
// };

// /* ============================================================
//    DATA
// ============================================================ */
// const DATA = {
//   name:     "Gonella Siva Sai\nSurya Prakash",
//   role:     "Full-Stack Developer & AI Enthusiast",
//   tagline:  "CSE Undergrad at PES University, Bengaluru · Building intelligent systems for the real world.",
//   bio:      "I'm a third-year Computer Science Engineering student at PES University with a strong grip on full-stack development, distributed systems, and AI-powered applications. My curiosity about how software works under the hood has driven me to build everything from real-time network tools to cloud-native analytics dashboards.",
//   bio2:     "I thrive in fast-paced collaborative environments — hackathons, research labs, and open-source projects. I'm actively seeking internship opportunities where I can ship meaningful products and grow alongside talented engineers.",
//   email:    "gonellasurya2005@gmail.com",
//   phone:    "+91 9880410689",
//   location: "Bengaluru, Karnataka, India",
//   github:   "https://github.com/GSuryaP",
//   linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
//   resume:   "/GonellaSuryaPrakash_Resume.pdf",

//   experiences: [
//     {
//       role: "B.Tech — Computer Science & Engineering", org: "PES University, Bengaluru",
//       period: "2023 – Present", badge: "Education",
//       bullets: [
//         "Maintaining a CGPA of 8.73 through my 5th semester, consistently in the top tier of the batch.",
//         "Awarded the Prof. CNR Scholarship for the 1st, 3rd, and 4th semesters — given to the top 20% of students.",
//         "Active member of multiple technical and cultural clubs, contributing to hackathons and collaborative engineering projects.",
//       ],
//       tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
//     },
//     {
//       role: "Research Intern", org: "Center of Computer Networks & CyberSecurity (CCNCS)",
//       period: "Jun 2025 – Jul 2025", badge: "Internship",
//       bullets: [
//         "Designed and built an intelligent SDN management system integrating the ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI.",
//         "Implemented real-time network monitoring, automated flow control, and fault detection via REST APIs with a live visualization dashboard for operator insights.",
//       ],
//       tags: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python", "REST APIs"],
//     },
//     {
//       role: "Logistics Head", org: "Equinox – The Space Club, PESU ECC",
//       period: "May 2025 – Present", badge: "Club Lead",
//       bullets: [
//         "Oversee end-to-end event planning for workshops, hackathons, and club activities — managing schedules, resources, and cross-functional teams.",
//         "Ensure smooth logistical execution for all club-wide events, coordinating with sponsors, venues, and internal teams.",
//       ],
//       tags: [],
//     },
//     {
//       role: "Social Media & Content Creator Head", org: "Equinox – The Space Club, PESU ECC",
//       period: "Sep 2024 – May 2025", badge: "Club Lead",
//       bullets: [
//         "Led digital outreach across Instagram and LinkedIn — designed visual content, managed campaigns, and grew community engagement around space-tech events.",
//       ],
//       tags: [],
//     },
//   ] as Experience[],

//   projects: [
//     {
//       title: "RASA-Driven SDN Management Tool",
//       desc: "A conversational AI system for real-time monitoring, health checks, and fault detection of distributed SDN controllers. Integrates ONOS REST APIs with RASA NLU and Mininet network simulation for automated flow queries and troubleshooting.",
//       emoji: "🕸️", tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
//       repo: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
//     },
//     {
//       title: "Distributed Image Processing Pipeline",
//       desc: "Apache Kafka-based distributed system with a FastAPI master node and multiple PIL worker nodes. Handles tile splitting, parallel processing, result aggregation, and final image reconstruction — with a live heartbeat monitoring dashboard.",
//       emoji: "🖼️", tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker"],
//       repo: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
//     },
//     {
//       title: "GitHub Repository Tracker",
//       desc: "Interactive analytics dashboard for tracking GitHub repos, commits, and issues in real time. Features live search, aurora animated background, stats overview, powered by a Node.js backend and Python sync script.",
//       emoji: "📊", tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
//       repo: "https://github.com/GSuryaP/Github-Repository-Tracker",
//     },
//     {
//       title: "Personal Finance Analytics Dashboard",
//       desc: "FinTech React dashboard for real-time personal transaction management. Full CRUD operations, dynamic Recharts visualizations (line & pie), dark/light mode, real-time search, and auto-calculated savings rate metrics.",
//       emoji: "💰", tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
//       repo: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
//     },
//     {
//       title: "AdaptiveLearn AI",
//       desc: "AWS-powered teacher analytics dashboard. Ingests student CSVs from S3 via Python Lambda, uses Amazon Bedrock (Titan LLM) to generate insights, and surfaces weak topics and struggling students through a clean HTML frontend — zero server cost.",
//       emoji: "🧠", tags: ["AWS S3", "Lambda", "Amazon Bedrock", "Python", "HTML"],
//       repo: "https://github.com/GSuryaP/AdaptiveLearn-AI",
//     },
//     {
//       title: "Weather & AQI Tracker",
//       desc: "Tkinter desktop app that validates city names via OpenWeatherMap API and displays comprehensive environmental data — temperature, humidity, wind speed, and Air Quality Index — in a clean GUI with robust error handling.",
//       emoji: "🌤️", tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON"],
//       repo: "https://github.com/GSuryaP/Weather-AQI_Tracker",
//     },
//   ] as Project[],
// };

// /* ============================================================
//    SKILLS — organized into datasheet-style categories
// ============================================================ */
// const SKILL_CATEGORIES: SkillCategory[] = [
//   {
//     label: "Languages",
//     icon: <Code2 size={20} />,
//     skills: [
//       { name: "Python",     icon: <SiPython />,     color: "#3776AB", pct: 90 },
//       { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", pct: 85 },
//       { name: "C++",        icon: <SiCplusplus />,  color: "#5b9bd5", pct: 77 },
//       { name: "C",          icon: <SiC />,           color: "#6699cc", pct: 74 },
//     ],
//   },
//   {
//     label: "Frameworks & Frontend",
//     icon: <Layers size={20} />,
//     skills: [
//       { name: "React",      icon: <SiReact />,       color: "#61DAFB", pct: 82 },
//       { name: "HTML5",      icon: <SiHtml5 />,       color: "#E34F26", pct: 92 },
//       { name: "CSS3",       icon: <SiCss />,         color: "#1572B6", pct: 88 },
//       { name: "Tailwind",   icon: <SiTailwindcss />, color: "#06B6D4", pct: 86 },
//     ],
//   },
//   {
//     label: "Backend & Databases",
//     icon: <Database size={20} />,
//     skills: [
//       { name: "Node.js",    icon: <SiNodedotjs />, color: "#339933", pct: 80 },
//       { name: "Express",    icon: <SiExpress />,   color: "#9aa7b5", pct: 78 },
//       { name: "MongoDB",    icon: <SiMongodb />,   color: "#47A248", pct: 75 },
//       { name: "MySQL",      icon: <SiMysql />,     color: "#4479A1", pct: 73 },
//       { name: "Firebase",   icon: <SiFirebase />,  color: "#FFCA28", pct: 70 },
//     ],
//   },
//   {
//     label: "Tools & Version Control",
//     icon: <Wrench size={20} />,
//     skills: [
//       { name: "Git",        icon: <SiGit />,    color: "#F05032", pct: 84 },
//       { name: "GitHub",     icon: <SiGithub />, color: "#9aa7b5", pct: 83 },
//     ],
//   },
// ];

// /* ============================================================
//    HOOKS
// ============================================================ */
// function useReveal(threshold = 0.12) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = ref.current; if (!el) return;
//     const io = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) { setVisible(true); io.disconnect(); }
//     }, { threshold });
//     io.observe(el);
//     return () => io.disconnect();
//   }, [threshold]);
//   return { ref, visible };
// }

// /* ============================================================
//    REVEAL WRAPPER
// ============================================================ */
// const Reveal: React.FC<{
//   children: React.ReactNode; delay?: number;
//   dir?: "up" | "left" | "right"; className?: string; style?: React.CSSProperties;
// }> = ({ children, delay = 0, dir = "up", className, style }) => {
//   const { ref, visible } = useReveal();
//   const from = dir === "left" ? "translateX(-24px)" : dir === "right" ? "translateX(24px)" : "translateY(18px)";
//   return (
//     <div ref={ref} className={className} style={{
//       opacity: visible ? 1 : 0,
//       transform: visible ? "none" : from,
//       transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}s, transform .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
//       ...style,
//     }}>{children}</div>
//   );
// };

// /* ============================================================
//    CIRCUIT TRACE DIVIDER — signature element.
//    A literal animated wire that "routes" a signal pulse between
//    sections, like trace + via on a PCB.
// ============================================================ */
// const TraceDivider: React.FC<{ flip?: boolean }> = ({ flip }) => (
//   <div style={{ position: "relative", height: 46, overflow: "hidden", zIndex: 2 }}>
//     <svg viewBox="0 0 1200 46" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: flip ? "block" : "block", transform: flip ? "scaleX(-1)" : "none" }}>
//       <path d="M0,23 L420,23 L460,3 L740,3 L780,23 L1200,23" fill="none" stroke={T.line} strokeWidth="1.5" />
//       <circle cx="460" cy="3" r="3" fill={T.bg} stroke={T.lineStrong} strokeWidth="1" />
//       <circle cx="780" cy="23" r="3" fill={T.bg} stroke={T.lineStrong} strokeWidth="1" />
//       <circle r="4" fill={T.signal} style={{ filter: `drop-shadow(0 0 6px ${T.signal})` }}>
//         <animateMotion dur="3.2s" repeatCount="indefinite"
//           path="M0,23 L420,23 L460,3 L740,3 L780,23 L1200,23" />
//       </circle>
//     </svg>
//   </div>
// );

// /* ============================================================
//    FIELD — labeled datasheet value
// ============================================================ */
// const Field: React.FC<{ label: string; children: React.ReactNode; accent?: boolean }> = ({ label, children, accent }) => (
//   <div>
//     <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.textFaint, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
//     <div style={{ fontSize: 13, fontWeight: 600, color: accent ? T.signal : T.ink, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>
//   </div>
// );

// /* ============================================================
//    ANIMATED COUNTER
// ============================================================ */
// const Counter: React.FC<{ to: string; suffix?: string; label: string }> = ({ to, suffix = "", label }) => {
//   const [val, setVal] = useState("0");
//   const { ref, visible } = useReveal();
//   useEffect(() => {
//     if (!visible) return;
//     const end = parseFloat(to); const dur = 1300;
//     const run = (ts: number, t0: number) => {
//       const p = Math.min((ts - t0) / dur, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       setVal(to.includes(".") ? (end * e).toFixed(2) : String(Math.floor(end * e)));
//       if (p < 1) requestAnimationFrame(t => run(t, t0));
//     };
//     requestAnimationFrame(t => run(t, t));
//   }, [visible, to]);
//   return (
//     <div ref={ref} style={{ textAlign: "center", padding: "26px 14px", background: T.bgCard, border: `1px solid ${T.line}`, position: "relative" }}>
//       <div style={{ fontSize: "clamp(26px,3.6vw,38px)", fontWeight: 700, lineHeight: 1, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif", color: T.ink }}>
//         {val}<span style={{ fontSize: "0.6em", color: T.signal }}>{suffix}</span>
//       </div>
//       <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
//     </div>
//   );
// };

// /* ============================================================
//    SKILL ROW
// ============================================================ */
// const SkillCard: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
//   const { ref, visible } = useReveal();
//   const [hov, setHov] = useState(false);
//   return (
//     <div
//       ref={ref}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)",
//         transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s, border-color .2s, background .2s, box-shadow .2s`,
//         background: hov ? T.signalSoft : T.bgCard,
//         border: `1px solid ${hov ? T.signal : T.line}`,
//         boxShadow: hov ? `0 0 18px -4px ${T.signal}66` : "none",
//         padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8,
//       }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div style={{ fontSize: 18, color: skill.color, flexShrink: 0 }}>{skill.icon}</div>
//         <span style={{ fontSize: 12, fontWeight: 600, color: T.ink, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.02em" }}>{skill.name}</span>
//         <span />
//       </div>
//     </div>
//   );
// };

// /* ============================================================
//    SKILL CATEGORY PANEL — datasheet card, like the reference grid
// ============================================================ */
// const SkillCategoryPanel: React.FC<{ cat: SkillCategory; index: number }> = ({ cat, index }) => (
//   <Reveal delay={index * 0.08} style={{ height: "100%" }}>
//     <div style={{ height: "100%", border: `1px solid ${T.line}`, background: T.bgPanel, display: "flex", flexDirection: "column" }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
//         <div style={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: T.signal, background: T.signalSoft, border: `1px solid ${T.signal}44` }}>
//           {cat.icon}
//         </div>
//         <div>
//           <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{cat.label}</div>
//           <div style={{ fontSize: 9.5, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.1em" }}>
//             {String(cat.skills.length).padStart(2, "0")} MODULE{cat.skills.length !== 1 ? "S" : ""}
//           </div>
//         </div>
//       </div>
//       <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
//         {cat.skills.map((s, i) => <SkillCard key={s.name} skill={s} delay={i * 0.04} />)}
//       </div>
//     </div>
//   </Reveal>
// );

// /* ============================================================
//    EXPERIENCE CARD
// ============================================================ */
// const ExpCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
//   const [open, setOpen] = useState(index === 0);
//   return (
//     <Reveal delay={index * 0.08}>
//       <div style={{ border: `1px solid ${T.line}`, background: T.bgCard }}>
//         <button
//           onClick={() => setOpen(o => !o)}
//           style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "20px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
//           <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
//             <div style={{ minWidth: 0 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 5 }}>
//                 <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{exp.role}</span>
//                 <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", background: T.signalSoft, color: T.signal, border: `1px solid ${T.signal}55`, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>{exp.badge}</span>
//               </div>
//               <div style={{ fontSize: 13, fontWeight: 600, color: T.textMuted, marginBottom: 2 }}>{exp.org}</div>
//               <div style={{ fontSize: 11, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{exp.period}</div>
//             </div>
//           </div>
//           <div style={{ fontSize: 18, color: T.textFaint, flexShrink: 0, transition: "transform .25s", transform: open ? "rotate(45deg)" : "none", fontFamily: "monospace" }}>+</div>
//         </button>
//         {open && (
//           <div style={{ padding: "0 22px 22px", borderTop: `1px solid ${T.line}` }}>
//             <div style={{ paddingTop: 16 }}>
//               {exp.bullets.map((b, i) => (
//                 <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
//                   <span style={{ color: T.signal, flexShrink: 0, fontFamily: "monospace", fontSize: 13, marginTop: 2 }}>{">"}</span>
//                   <p style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.75 }}>{b}</p>
//                 </div>
//               ))}
//               {exp.tags.length > 0 && (
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.line}` }}>
//                   {exp.tags.map(t => (
//                     <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{t}</span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </Reveal>
//   );
// };

// /* ============================================================
//    PROJECT CARD
// ============================================================ */
// const ProjCard: React.FC<{ proj: Project; index: number }> = ({ proj, index }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <Reveal delay={index * 0.06} style={{ height: "100%" }}>
//       <div
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         style={{
//           height: "100%", display: "flex", flexDirection: "column",
//           border: `1px solid ${hov ? T.signal : T.line}`,
//           background: T.bgCard, transition: "border-color .2s, transform .2s, box-shadow .2s",
//           transform: hov ? "translateY(-3px)" : "none",
//           boxShadow: hov ? `0 14px 30px -12px ${T.signal}44` : "none",
//         }}>
//         <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${T.line}`, background: T.bgAlt }}>
//           <span style={{ fontSize: 10, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.06em" }}>
//             PID. {String(index + 1).padStart(2, "0")}
//           </span>
//           {proj.repo && (
//             <a href={proj.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
//               style={{ marginLeft: "auto", color: hov ? T.signal : T.textFaint, display: "flex", alignItems: "center", transition: "color .2s" }}>
//               <SiGithub size={13} />
//             </a>
//           )}
//         </div>
//         <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
//             <span style={{ fontSize: 20 }}>{proj.emoji}</span>
//             <h3 style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.3 }}>{proj.title}</h3>
//           </div>
//           <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.75, flex: 1, marginBottom: 16 }}>{proj.desc}</p>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//             {proj.tags.map(t => (
//               <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{t}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Reveal>
//   );
// };

// /* ============================================================
//    SECTION TITLE
// ============================================================ */
// const STitle: React.FC<{ tag: string; title: string; sub?: string }> = ({ tag, title, sub }) => (
//   <Reveal style={{ marginBottom: 48 }}>
//     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
//       <span style={{ fontSize: 10.5, fontWeight: 700, color: T.signal, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>{tag}</span>
//       <div style={{ flex: 1, height: 1, background: T.line }} />
//     </div>
//     <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>{title}</h2>
//     {sub && <p style={{ fontSize: 13.5, color: T.textMuted, marginTop: 12, maxWidth: 520, lineHeight: 1.75 }}>{sub}</p>}
//   </Reveal>
// );

// /* ============================================================
//    NAV LINK
// ============================================================ */
// const NavLink: React.FC<{ href: string; label: string; active: boolean }> = ({ href, label, active }) => (
//   <a href={href} style={{
//     fontSize: 11, fontWeight: 600, padding: "6px 13px",
//     color: active ? T.signal : T.textMuted,
//     borderBottom: active ? `2px solid ${T.signal}` : "2px solid transparent",
//     letterSpacing: "0.08em", textTransform: "uppercase",
//     fontFamily: "'JetBrains Mono',monospace", textDecoration: "none",
//     transition: "color .2s, border-color .2s",
//   }}>{label}</a>
// );

// /* ============================================================
//    CONTACT ROW
// ============================================================ */
// const ContactRow: React.FC<{ icon: string; label: string; val: string; href?: string; isAccent?: boolean }> = ({ icon, label, val, href, isAccent }) => {
//   const hasLink = !!href;
//   const Tag = (hasLink ? "a" : "div") as "a" | "div";
//   const linkProps = hasLink ? {
//     href,
//     target: href!.startsWith("mailto") || href!.startsWith("tel") ? undefined : "_blank",
//     rel: "noreferrer",
//   } : {};
//   return (
//     <Tag {...linkProps} style={{
//       display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
//       border: `1px solid ${T.line}`, background: T.bgCard,
//       textDecoration: "none",
//     }}>
//       <div style={{ width: 34, height: 34, flexShrink: 0, background: T.signalSoft, border: `1px solid ${T.signal}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: T.signal }}>{icon}</div>
//       <div>
//         <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
//         <div style={{ fontSize: 12.5, fontWeight: 600, color: isAccent ? T.signal : T.ink }}>{val}</div>
//       </div>
//     </Tag>
//   );
// };

// /* ============================================================
//    SOCIAL BUTTON
// ============================================================ */
// const SocialBtn: React.FC<{ label: string; href: string; icon: React.ReactNode; download?: boolean }> = ({ label, href, icon, download }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <a
//       href={href}
//       target={href.startsWith("mailto") ? undefined : "_blank"}
//       rel="noreferrer"
//       download={download || undefined}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//         padding: "11px", fontWeight: 700, fontSize: 11,
//         border: `1px solid ${hov ? T.signal : T.line}`, background: T.bgCard, color: hov ? T.signal : T.ink,
//         fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em",
//         textTransform: "uppercase", textDecoration: "none", transition: "border-color .2s, color .2s",
//       }}>
//       {icon} {label}
//     </a>
//   );
// };

// /* ============================================================
//    HERO CTA BUTTON
// ============================================================ */
// const HeroBtn: React.FC<{ href: string; primary?: boolean; children: React.ReactNode }> = ({ href, primary, children }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
//       display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
//       textDecoration: "none",
//       ...(primary
//         ? { background: T.signal, color: "#031210", boxShadow: hov ? `0 0 26px ${T.signal}88` : `0 0 0px ${T.signal}00` }
//         : { border: `1px solid ${hov ? T.clock : T.lineStrong}`, background: "transparent", color: hov ? T.clock : T.ink }),
//       fontWeight: 700, fontSize: 11.5, letterSpacing: "0.08em",
//       fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase",
//       transition: "box-shadow .25s, border-color .25s, color .25s",
//     }}>{children}</a>
//   );
// };

// /* ============================================================
//    WHATSAPP BUTTON
// ============================================================ */
// const WABtn: React.FC = () => (
//   <a
//     href="https://wa.me/919880410689?text=Hi%20Surya!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect."
//     target="_blank" rel="noopener noreferrer"
//     style={{
//       display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//       background: `linear-gradient(90deg,${T.signal},${T.clock})`, color: "#03050a", fontWeight: 700, fontSize: 12,
//       padding: "13px 20px", letterSpacing: "0.08em", textTransform: "uppercase",
//       textDecoration: "none", fontFamily: "'JetBrains Mono',monospace",
//     }}>
//     Message on WhatsApp ↗
//   </a>
// );

// /* ============================================================
//    GITHUB PROJECTS LINK
// ============================================================ */
// const GithubLink: React.FC = () => (
//   <a href={DATA.github} target="_blank" rel="noreferrer" style={{
//     display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px",
//     border: `1px solid ${T.line}`, background: T.bgCard, color: T.textMuted,
//     fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace",
//     letterSpacing: "0.06em", textDecoration: "none",
//   }}>
//     <SiGithub size={13} /> github.com/GSuryaP ↗
//   </a>
// );

// /* ============================================================
//    BACK TO TOP
// ============================================================ */
// const BackToTop: React.FC<{ show: boolean }> = ({ show }) => (
//   <button
//     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//     style={{
//       position: "fixed", bottom: 28, right: 28, zIndex: 50,
//       width: 40, height: 40, background: T.bgPanel,
//       color: T.signal, border: `1px solid ${T.lineStrong}`, fontSize: 15,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none",
//       transform: show ? "translateY(0)" : "translateY(10px)",
//       boxShadow: show ? `0 6px 22px ${T.signal}33` : "none",
//       transition: "opacity .3s, transform .3s, box-shadow .3s",
//       cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
//     }}>↑</button>
// );

// /* ============================================================
//    NAV ITEMS
// ============================================================ */
// const NAV_ITEMS = ["Home","About","Skills","Experience","Projects","Contact"];

// /* ============================================================
//    APP
// ============================================================ */
// export default function App() {
//   const [active, setActive]       = useState("Home");
//   const [scrolled, setScrolled]   = useState(false);
//   const [mobileOpen, setMobile]   = useState(false);
//   const [showBtt, setShowBtt]     = useState(false);
//   const [typedText, setTypedText] = useState("");
//   const [bootDone, setBootDone]   = useState(false);

//   useEffect(() => {
//     const full = `> whoami --role` ;
//     let i = 0;
//     const iv = setInterval(() => {
//       if (i <= full.length) { setTypedText(full.slice(0, i)); i++; }
//       else { clearInterval(iv); setBootDone(true); }
//     }, 38);
//     return () => clearInterval(iv);
//   }, []);

//   useEffect(() => {
//     const s = document.createElement("style");
//     s.id = "portfolio-base";
//     s.textContent = `
//       @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
//       *{box-sizing:border-box;margin:0;padding:0}
//       html{scroll-behavior:smooth}
//       body{font-family:'Inter',sans-serif;overflow-x:hidden;background:${T.bg};color:${T.ink}}
//       a{text-decoration:none;color:inherit}
//       a,button{cursor:pointer}
//       ::-webkit-scrollbar{width:4px}
//       ::-webkit-scrollbar-track{background:${T.bg}}
//       ::-webkit-scrollbar-thumb{background:${T.signal}}
//       @keyframes slide-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
//       @keyframes slide-right{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:none}}
//       @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
//       @keyframes pulse-glow{0%,100%{opacity:.55}50%{opacity:1}}
//       @keyframes drift{0%{background-position:0 0,0 0}100%{background-position:600px 0,0 600px}}
//       @keyframes glitch{
//         0%,100%{ clip-path: inset(0 0 0 0); transform:translate(0,0); }
//         20%{ clip-path: inset(20% 0 40% 0); transform:translate(-1px,1px); }
//         40%{ clip-path: inset(60% 0 5% 0); transform:translate(1px,-1px); }
//         60%{ clip-path: inset(10% 0 70% 0); transform:translate(-1px,0); }
//         80%{ clip-path: inset(40% 0 20% 0); transform:translate(1px,1px); }
//       }
//       @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}.hero-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}}
//     `;
//     const old = document.getElementById("portfolio-base");
//     if (old) document.head.removeChild(old);
//     document.head.appendChild(s);
//     const onScroll = () => {
//       setScrolled(window.scrollY > 40);
//       setShowBtt(window.scrollY > 500);
//       for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
//         const el = document.getElementById(NAV_ITEMS[i].toLowerCase());
//         if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV_ITEMS[i]); break; }
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const C: React.CSSProperties = { maxWidth: 1140, margin: "0 auto", padding: "0 24px" };
//   const SP: React.CSSProperties = { position: "relative", zIndex: 2, padding: "96px 0" };

//   return (
//     <div style={{ background: T.bg, color: T.ink, minHeight: "100vh" }}>

//       {/* PCB trace backdrop — faint copper grid + drifting diagonal traces */}
//       <div style={{
//         position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
//         backgroundImage: `
//           linear-gradient(${T.line} 1px,transparent 1px),
//           linear-gradient(90deg,${T.line} 1px,transparent 1px)`,
//         backgroundSize: "56px 56px",
//       }} />
//       <div style={{
//         position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5,
//         backgroundImage: `
//           radial-gradient(circle at 14% 18%, ${T.signalSoft} 0%, transparent 32%),
//           radial-gradient(circle at 86% 78%, ${T.clockSoft} 0%, transparent 32%)`,
//         animation: "pulse-glow 7s ease-in-out infinite",
//       }} />

//       {/* ── NAV ── */}
//       <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "10px 0" : "16px 0", transition: "all .3s", background: scrolled ? T.navBg : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${T.line}` : "1px solid transparent" }}>
//         <div style={{ ...C, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <a href="#home" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em", color: T.ink, display: "flex", alignItems: "center", gap: 6 }}>
//             <span style={{ color: T.signal }}>&lt;</span>GSS<span style={{ color: T.clock }}>/</span>dev<span style={{ color: T.signal }}>&gt;</span>
//           </a>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
//               {NAV_ITEMS.map(n => <NavLink key={n} href={`#${n.toLowerCase()}`} label={n} active={active === n} />)}
//             </div>
//             <button className="nav-ham" onClick={() => setMobile(o => !o)}
//               style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: `1px solid ${T.line}`, padding: "7px 9px" }}>
//               {[0,1,2].map(i => <span key={i} style={{ width: 18, height: 1, background: T.ink, display: "block" }} />)}
//             </button>
//           </div>
//         </div>
//         {mobileOpen && (
//           <div style={{ background: T.navBg, backdropFilter: "blur(14px)", borderTop: `1px solid ${T.line}`, padding: "10px 16px" }}>
//             {NAV_ITEMS.map(n => (
//               <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMobile(false)}
//                 style={{ display: "block", padding: "12px 14px", fontSize: 12, fontWeight: 600, color: active === n ? T.signal : T.textMuted, borderBottom: `1px solid ${T.line}`, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em" }}>
//                 {n}
//               </a>
//             ))}
//           </div>
//         )}
//       </nav>

//       {/* ── HERO ── */}
//       <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 70px", position: "relative", zIndex: 2 }}>
//         <div style={{ ...C, position: "relative", zIndex: 1 }}>
//           <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
//             <div>
//               <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.05s" }}>
//                 <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.signal}55`, background: T.signalSoft, padding: "5px 14px", marginBottom: 22, fontFamily: "'JetBrains Mono',monospace" }}>
//                   <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.signal, animation: "pulse-glow 1.4s ease-in-out infinite" }} />
//                   <span style={{ fontSize: 10, fontWeight: 700, color: T.signal, letterSpacing: "0.16em", textTransform: "uppercase" }}>Status: Available for Hire</span>
//                 </div>
//               </div>
//               <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.12s", position: "relative" }}>
//                 <h1 style={{ fontSize: "clamp(34px,5.2vw,62px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.01em", marginBottom: 18, fontFamily: "'Space Grotesk',sans-serif", position: "relative" }}>
//                   {DATA.name.split("\n")[0]}<br />
//                   <span style={{ color: T.signal, position: "relative", display: "inline-block" }}>
//                     {DATA.name.split("\n")[1]}
//                     <span aria-hidden style={{ position: "absolute", inset: 0, color: T.clock, mixBlendMode: "screen", animation: "glitch 4.5s steps(2,end) infinite" }}>{DATA.name.split("\n")[1]}</span>
//                   </span>
//                 </h1>
//               </div>
//               <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.2s" }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: T.signal, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
//                   {typedText}<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
//                 </div>
//                 <div style={{ fontSize: 14, fontWeight: 600, color: T.textMuted, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace", opacity: bootDone ? 1 : 0, transition: "opacity .4s" }}>
//                   {DATA.role}
//                 </div>
//                 <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.75, maxWidth: 480, marginBottom: 30 }}>{DATA.tagline}</p>
//               </div>
//               <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.28s", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
//                 <HeroBtn href="#contact" primary>Get in touch</HeroBtn>
//                 <HeroBtn href="#projects">View projects</HeroBtn>
//               </div>
//               <div style={{ animation: "slide-up .55s ease forwards", opacity: 0, animationDelay: "0.36s", display: "grid", gridTemplateColumns: "repeat(4,auto)", gap: 32, paddingTop: 22, borderTop: `1px solid ${T.line}`, flexWrap: "wrap" }}>
//                 {[["8.73","CGPA"],["6+","PROJECTS"],["1","INTERNSHIP"],["2+","CLUB ROLES"]].map(([v,l]) => (
//                   <div key={l}>
//                     <div style={{ fontSize: 24, fontWeight: 700, color: T.ink, fontFamily: "'Space Grotesk',sans-serif" }}>{v}</div>
//                     <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>{l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Signature element: datasheet title-block card — image shown in full, never cropped */}
//             <div style={{ animation: "slide-right .6s .15s ease forwards", opacity: 0, width: 300 }}>
//               <div style={{ border: `1px solid ${T.lineStrong}`, background: T.bgPanel, boxShadow: `0 10px 40px rgba(0,0,0,0.55), 0 0 0 1px ${T.signal}11` }}>
//                 <div style={{ borderBottom: `1px solid ${T.line}`, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bgAlt }}>
//                   <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>PROFILE / SPEC</span>
//                   <span style={{ fontSize: 9.5, fontWeight: 700, color: T.signal, fontFamily: "'JetBrains Mono',monospace" }}>REV. 2026</span>
//                 </div>
//                 <div style={{ aspectRatio: "4/3", background: T.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//                   <img src="/profile.png" alt="Surya Prakash" style={{ width: "100%", height: "100%", objectFit: "contain" }}
//                     onError={e => { const t = e.target as HTMLImageElement; t.style.display = "none"; (t.nextSibling as HTMLElement).style.display = "flex"; }} />
//                   <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
//                     <span style={{ fontSize: 56, fontWeight: 700, color: T.signal, fontFamily: "'Space Grotesk',sans-serif" }}>S</span>
//                   </div>
//                 </div>
//                 <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//                   <Field label="Role">Full-Stack Dev</Field>
//                   <Field label="Focus" accent>AI / Systems</Field>
//                   <Field label="Base">Bengaluru, IN</Field>
//                   <Field label="Status" accent>Open</Field>
//                 </div>
//                 <div style={{ borderTop: `1px solid ${T.line}`, padding: "10px 16px", display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   {["Python","React","Node.js"].map(t => (
//                     <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: T.bgAlt, border: `1px solid ${T.line}`, color: T.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <TraceDivider />

//       {/* ── ABOUT ── */}
//       <section id="about" style={{ ...SP, background: T.bgAlt }}>
//         <div style={C}>
//           <STitle tag="01 — Profile" title="About Me" />
//           <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
//             <Reveal dir="left">
//               <div style={{ padding: 30, border: `1px solid ${T.line}`, background: T.bgCard }}>
//                 <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.85, marginBottom: 16 }}>{DATA.bio}</p>
//                 <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.85 }}>{DATA.bio2}</p>
//                 <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.line}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
//                   <Field label="Location">{DATA.location}</Field>
//                   <Field label="University">PES University</Field>
//                   <Field label="Email">{DATA.email}</Field>
//                   <Field label="Phone">{DATA.phone}</Field>
//                 </div>
//               </div>
//             </Reveal>
//             <Reveal dir="right">
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.line }}>
//                 <Counter to="8.73" label="CGPA" />
//                 <Counter to="6" suffix="+" label="Projects" />
//                 <Counter to="1" label="Internship" />
//                 <Counter to="2" suffix="+" label="Club Roles" />
//               </div>
//               <div style={{ marginTop: 18, padding: "20px 24px", border: `1px solid ${T.line}`, background: T.bgCard }}>
//                 <div style={{ fontSize: 10, color: T.textFaint, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" }}>Timeline</div>
//                 {[
//                   { year: "2023", label: "Joined PES University" },
//                   { year: "2024", label: "SMCC Head — Equinox Club" },
//                   { year: "2025", label: "Research Intern at CCNCS" },
//                   { year: "Now",  label: "Logistics Head · Building" },
//                 ].map((item, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
//                     <span style={{ fontSize: 10, color: item.year === "Now" ? T.signal : T.textFaint, flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", width: 32 }}>{item.year}</span>
//                     <span style={{ fontSize: 12.5, color: T.ink }}>{item.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       <TraceDivider flip />

//       {/* ── SKILLS ── */}
//       <section id="skills" style={{ ...SP }}>
//         <div style={C}>
//           <STitle tag="02 — Stack" title="Tech Stack" sub="Languages, frameworks, and tools I use to ship end-to-end — organized by board module." />
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
//             {SKILL_CATEGORIES.map((cat, i) => <SkillCategoryPanel key={cat.label} cat={cat} index={i} />)}
//           </div>
//         </div>
//       </section>

//       <TraceDivider />

//       {/* ── EXPERIENCE ── */}
//       <section id="experience" style={{ ...SP, background: T.bgAlt }}>
//         <div style={{ ...C, maxWidth: 840 }}>
//           <STitle tag="03 — Record" title="Experience & Education" />
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {DATA.experiences.map((exp, i) => <ExpCard key={i} exp={exp} index={i} />)}
//           </div>
//         </div>
//       </section>

//       <TraceDivider flip />

//       {/* ── PROJECTS ── */}
//       <section id="projects" style={{ ...SP }}>
//         <div style={C}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 44 }}>
//             <Reveal>
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
//                   <span style={{ fontSize: 10.5, fontWeight: 700, color: T.signal, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>04 — Build Log</span>
//                   <div style={{ flex: 1, height: 1, background: T.line }} />
//                 </div>
//                 <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>Featured Projects</h2>
//               </div>
//             </Reveal>
//             <Reveal delay={0.1}><GithubLink /></Reveal>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
//             {DATA.projects.map((p, i) => <ProjCard key={i} proj={p} index={i} />)}
//           </div>
//         </div>
//       </section>

//       <TraceDivider />

//       {/* ── CONTACT ── */}
//       <section id="contact" style={{ ...SP, paddingBottom: 130, background: T.bgAlt }}>
//         <div style={{ ...C, maxWidth: 940 }}>
//           <STitle tag="05 — Contact" title="Get In Touch" sub="Open to internships, research collabs, and freelance. DM anytime." />
//           <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
//             <div>
//               <Reveal>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
//                   <ContactRow icon="✉" label="Email"    val={DATA.email}    href={`mailto:${DATA.email}`} />
//                   <ContactRow icon="☎" label="Phone"    val={DATA.phone}    href={`tel:${DATA.phone}`}    />
//                   <ContactRow icon="◎" label="Location" val={DATA.location}                               />
//                   <ContactRow icon="●" label="Status"   val="Open to Opportunities" isAccent             />
//                 </div>
//               </Reveal>
//               <Reveal delay={0.15}>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//                   <SocialBtn label="GitHub"   href={DATA.github}            icon={<SiGithub size={13} />} />
//                   <SocialBtn label="LinkedIn" href={DATA.linkedin}          icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>} />
//                   <SocialBtn label="Email"    href={`mailto:${DATA.email}`}  icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} />
//                   <SocialBtn label="Resume"   href={DATA.resume}             icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>} download />
//                 </div>
//               </Reveal>
//             </div>
//             <Reveal delay={0.2}>
//               <div style={{ border: `1px solid ${T.lineStrong}` }}>
//                 <div style={{ padding: "10px 16px", background: T.bgAlt, borderBottom: `1px solid ${T.line}` }}>
//                   <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>AVAILABILITY / SPEC</span>
//                 </div>
//                 <div style={{ padding: 28, background: T.bgPanel }}>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
//                     <Field label="Hiring" accent>Yes</Field>
//                     <Field label="Response time">&lt; 24 hours</Field>
//                   </div>
//                   <Field label="Modes">Internship · Collab · Freelance · OSS</Field>
//                   <p style={{ fontSize: 12.5, color: T.textMuted, lineHeight: 1.8, margin: "16px 0 24px" }}>
//                     Open to internships, research collaborations, freelance projects, and open-source work. Let's build something impactful together.
//                   </p>
//                   <WABtn />
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: "24px 0", position: "relative", zIndex: 2 }}>
//         <div style={{ ...C, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//           <p style={{ fontSize: 11, color: T.textFaint }}>© {new Date().getFullYear()} <span style={{ color: T.textMuted }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.</p>
//           <p style={{ fontSize: 11, color: T.textFaint, fontFamily: "'JetBrains Mono',monospace" }}>React · TypeScript · CSS-in-JS</p>
//         </div>
//       </footer>

//       <BackToTop show={showBtt} />
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript, SiReact,
  SiNodedotjs, SiGit, SiGithub, SiMongodb, SiHtml5, SiCss,
  SiTailwindcss, SiExpress, SiFirebase,
} from "react-icons/si";

// ─────────────────────────────────────────────────────────────────────────────
// COLOR THEMES
// Edit these freely — change hex values to restyle the whole site.
// Each theme has: accent (primary), accent2 (secondary), accentText (on accent bg)
// ─────────────────────────────────────────────────────────────────────────────
const COLOR_THEMES = [
  {
    id: "violet-amber",
    label: "Violet × Amber",       // ← CURRENT DEFAULT
    preview: ["#7c3aed", "#f59e0b", "#06b6d4"],
    accent:       "#7c3aed",        // primary glow & buttons
    accentLight:  "#a78bfa",        // lighter tint for text/borders
    accentGlow:   "rgba(124,58,237,0.18)",
    accentBtn:    "linear-gradient(135deg,#7c3aed,#6d28d9)",
    accent2:      "#f59e0b",        // secondary dots / highlights
    accent2Light: "#fcd34d",
    accent3:      "#06b6d4",        // tertiary
    star:         "167,139,250",    // RGB for starfield
  },
  {
    id: "cyan-rose",
    label: "Cyan × Rose",
    preview: ["#0891b2", "#f43f5e", "#a3e635"],
    accent:       "#0891b2",
    accentLight:  "#67e8f9",
    accentGlow:   "rgba(8,145,178,0.18)",
    accentBtn:    "linear-gradient(135deg,#0891b2,#0e7490)",
    accent2:      "#f43f5e",
    accent2Light: "#fda4af",
    accent3:      "#a3e635",
    star:         "103,232,249",
  },
  {
    id: "emerald-violet",
    label: "Emerald × Violet",
    preview: ["#059669", "#8b5cf6", "#f59e0b"],
    accent:       "#059669",
    accentLight:  "#6ee7b7",
    accentGlow:   "rgba(5,150,105,0.18)",
    accentBtn:    "linear-gradient(135deg,#059669,#047857)",
    accent2:      "#8b5cf6",
    accent2Light: "#c4b5fd",
    accent3:      "#f59e0b",
    star:         "110,231,183",
  },
  {
    id: "rose-gold",
    label: "Rose × Gold",
    preview: ["#e11d48", "#d97706", "#818cf8"],
    accent:       "#e11d48",
    accentLight:  "#fb7185",
    accentGlow:   "rgba(225,29,72,0.18)",
    accentBtn:    "linear-gradient(135deg,#e11d48,#be123c)",
    accent2:      "#d97706",
    accent2Light: "#fbbf24",
    accent3:      "#818cf8",
    star:         "251,113,133",
  },
  {
    id: "indigo-cyan",
    label: "Indigo × Cyan",
    preview: ["#4f46e5", "#06b6d4", "#f59e0b"],
    accent:       "#4f46e5",
    accentLight:  "#818cf8",
    accentGlow:   "rgba(79,70,229,0.18)",
    accentBtn:    "linear-gradient(135deg,#4f46e5,#4338ca)",
    accent2:      "#06b6d4",
    accent2Light: "#67e8f9",
    accent3:      "#f59e0b",
    star:         "129,140,248",
  },
  {
    id: "slate-orange",
    label: "Slate × Orange",
    preview: ["#64748b", "#f97316", "#a78bfa"],
    accent:       "#64748b",
    accentLight:  "#94a3b8",
    accentGlow:   "rgba(100,116,139,0.18)",
    accentBtn:    "linear-gradient(135deg,#64748b,#475569)",
    accent2:      "#f97316",
    accent2Light: "#fdba74",
    accent3:      "#a78bfa",
    star:         "148,163,184",
  },
];

type Theme = (typeof COLOR_THEMES)[0];

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "Python",     icon: <SiPython />,     color: "#3776AB", pct: 90 },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", pct: 85 },
  { name: "React",      icon: <SiReact />,      color: "#61DAFB", pct: 82 },
  { name: "Node.js",    icon: <SiNodedotjs />,  color: "#339933", pct: 80 },
  { name: "Express",    icon: <SiExpress />,    color: "#aaa",    pct: 78 },
  { name: "MongoDB",    icon: <SiMongodb />,    color: "#47A248", pct: 75 },
  { name: "MySQL",      icon: <SiMysql />,      color: "#4479A1", pct: 73 },
  { name: "HTML5",      icon: <SiHtml5 />,      color: "#E34F26", pct: 92 },
  { name: "CSS3",       icon: <SiCss />,       color: "#1572B6", pct: 88 },
  { name: "Tailwind",   icon: <SiTailwindcss />,color: "#06B6D4", pct: 85 },
  { name: "C++",        icon: <SiCplusplus />,  color: "#00599C", pct: 77 },
  { name: "C",          icon: <SiC />,          color: "#00599C", pct: 75 },
  { name: "Git",        icon: <SiGit />,        color: "#F05032", pct: 83 },
  { name: "GitHub",     icon: <SiGithub />,     color: "#ccc",    pct: 83 },
  { name: "Firebase",   icon: <SiFirebase />,   color: "#FFCA28", pct: 70 },
];

const EXPERIENCES = [
  {
    badge: "Education",
    title: "Computer Science Engineering Student",
    company: "PES University",
    period: "2023 – Present",
    desc: "Pursuing B.Tech in CSE with a CGPA of 8.73 through 5th semester. Awarded the Prof. CNR Scholarship for three semesters (top 20%). Active member of multiple campus clubs and technical communities.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"],
  },
  {
    badge: "Summer Internship",
    title: "Research Intern",
    company: "Center of Computer Networks & CyberSecurity (CCNCS)",
    period: "June 2025 – July 2025",
    desc: "Developed an intelligent SDN management system integrating ONOS distributed controller with Mininet and a RASA-powered conversational AI — enabling real-time monitoring, automated flow control, and failure detection via REST APIs.",
    tags: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"],
  },
  {
    badge: "Club Domain Head",
    title: "Logistics Head",
    company: "Equinox – The Space Club, PESU ECC",
    period: "May 2025 – Present",
    desc: "Oversee event planning and coordination for workshops, hackathons, and club activities — managing schedules, resources, and cross-functional teams for smooth execution.",
    tags: [],
  },
  {
    badge: "Club Domain Head",
    title: "Social Media & Content Creator Head",
    company: "Equinox – The Space Club, PESU ECC",
    period: "Sep 2024 – May 2025",
    desc: "Drove digital outreach by designing posts, managing multi-platform social campaigns, and producing content to build community engagement around space-tech events.",
    tags: [],
  },
];

const PROJECTS = [
  {
    emoji: "🕸️",
    title: "RASA-Driven SDN Tool",
    desc: "RASA-powered conversational assistant for real-time monitoring, health checks, and fault detection of distributed SDN controllers via ONOS REST APIs and Mininet simulations.",
    tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
    repo: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
  },
  {
    emoji: "🖼️",
    title: "Distributed Image Processing Pipeline",
    desc: "Apache Kafka-based async image pipeline with FastAPI master node and PIL workers — splits, distributes, processes, and reconstructs tiles with live heartbeat monitoring.",
    tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker"],
    repo: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
  },
  {
    emoji: "📊",
    title: "GitHub Repository Tracker",
    desc: "Interactive dashboard tracking repos, users, commits, and issues in real time. Features live search, stats overview, aurora background, powered by Node.js + GitHub API.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"],
    repo: "https://github.com/GSuryaP/Github-Repository-Tracker",
  },
  {
    emoji: "💰",
    title: "Personal Finance Analytics Dashboard",
    desc: "FinTech React dashboard with full CRUD, Recharts line & pie visualizations, dark/light mode toggle, real-time search, and auto-calculated savings rate metrics.",
    tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript"],
    repo: "https://github.com/GSuryaP/Personal-Finance-Dashboard",
  },
  {
    emoji: "🧠",
    title: "AdaptiveLearn AI",
    desc: "AWS-powered teacher analytics reading student CSVs from S3 via Python Lambda, using Amazon Bedrock (Titan) to surface weak topics and struggling students via a plain HTML frontend.",
    tags: ["AWS S3", "Lambda", "Amazon Bedrock", "Python", "HTML"],
    repo: "https://github.com/GSuryaP/AdaptiveLearn-AI",
  },
  {
    emoji: "🌤️",
    title: "Weather & AQI Tracker",
    desc: "Tkinter desktop app verifying city names via OpenWeatherMap API — displays real-time weather and Air Quality Index with a clean GUI and robust error handling.",
    tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON"],
    repo: "https://github.com/GSuryaP/Weather-AQI_Tracker",
  },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/GSuryaP",                       icon: <SiGithub size={16} /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/g-s-s-surya-prakash/",     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Email",    href: "mailto:gonellasurya2005@gmail.com",                 icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { label: "Resume",   href: "/GonellaSuryaPrakash_Resume.pdf", download: true,   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg> },
];

// ─────────────────────────────────────────────────────────────────────────────
// STARFIELD
// ─────────────────────────────────────────────────────────────────────────────
const StarField: React.FC<{ starRgb: string }> = ({ starRgb }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    type Star = { x: number; y: number; r: number; a: number; va: number; vx: number; vy: number };
    let stars: Star[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.floor((canvas.width * canvas.height) / 7000) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.5 + 0.1,
        va: (Math.random() - 0.5) * 0.003,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.07,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.a += s.va;
        if (s.a < 0.05 || s.a > 0.75) s.va *= -1;
        if (s.x < 0) s.x = canvas.width;  if (s.x > canvas.width)  s.x = 0;
        if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb},${s.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [starRgb]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────────────────
const Cursor: React.FC<{ color: string }> = ({ color }) => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      if (dotRef.current)  { dotRef.current.style.left  = mx + "px"; dotRef.current.style.top  = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const base: React.CSSProperties = { position: "fixed", top: 0, left: 0, borderRadius: "50%", pointerEvents: "none", transform: "translate(-50%,-50%)", zIndex: 9999 };
  return (
    <>
      <div ref={dotRef}  style={{ ...base, width: 8,  height: 8,  background: color, boxShadow: `0 0 10px ${color}` }} />
      <div ref={ringRef} style={{ ...base, width: 34, height: 34, border: `1.5px solid ${color}50`, zIndex: 9998 }} />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────────────
// SMALL REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }> =
  ({ children, delay = 0, style, className }) => {
    const { ref, visible } = useReveal();
    return (
      <div ref={ref} className={className} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}>{children}</div>
    );
  };

const SectionLabel: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontFamily: "JetBrains Mono,monospace", fontSize: 11, fontWeight: 500, color, letterSpacing: "0.15em", textTransform: "uppercase" }}>
    <div style={{ width: 24, height: 1, background: color }} />
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// THEME PICKER PANEL
// ─────────────────────────────────────────────────────────────────────────────
const ThemePicker: React.FC<{ current: Theme; onChange: (t: Theme) => void }> = ({ current, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 28, left: 28, zIndex: 200 }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Switch color theme"
        style={{
          width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
          background: current.accent, boxShadow: `0 4px 20px ${current.accentGlow}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, transition: "transform .2s",
          color: "#fff",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        🎨
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: "absolute", bottom: 54, left: 0,
          background: "rgba(10,10,20,0.97)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16,
          padding: "16px 14px", width: 220,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}>
          <div style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", color: "#64748b", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14, paddingLeft: 4 }}>
            Color Themes
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {COLOR_THEMES.map(t => (
              <button key={t.id} onClick={() => { onChange(t); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: current.id === t.id ? "rgba(255,255,255,0.08)" : "transparent",
                  outline: current.id === t.id ? `1px solid ${t.accent}` : "1px solid transparent",
                  transition: "all .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = current.id === t.id ? "rgba(255,255,255,0.08)" : "transparent")}
              >
                {/* Color swatches */}
                <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                  {t.preview.map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: current.id === t.id ? "#e2e8f0" : "#94a3b8", fontWeight: 500, textAlign: "left" }}>
                  {t.label}
                </span>
                {current.id === t.id && (
                  <span style={{ marginLeft: "auto", fontSize: 10, color: t.accentLight }}>✓</span>
                )}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#475569", fontFamily: "JetBrains Mono,monospace", lineHeight: 1.5 }}>
            Edit COLOR_THEMES[0] in App.tsx<br/>to hardcode your choice.
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ORBITAL AVATAR
// ─────────────────────────────────────────────────────────────────────────────
const OrbitalAvatar: React.FC<{ theme: Theme }> = ({ theme }) => {
  const size = 300;
  const badges = [
    { text: "Python",  dot: "#3776AB", style: { top: 16, right: -10 } },
    { text: "React",   dot: "#61DAFB", style: { bottom: 40, left: -20 } },
    { text: "Node.js", dot: "#339933", style: { bottom: 10, right: -5 } },
  ];
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Orbiting rings */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute",
          inset: -40 - i * 30,
          borderRadius: "50%",
          border: `1px solid ${i === 0 ? theme.accent + "30" : i === 1 ? theme.accent2 + "18" : theme.accent3 + "12"}`,
          animation: `spin-${i % 2 === 0 ? "cw" : "ccw"} ${20 + i * 9}s linear infinite`,
        }}>
          {/* Dot on each ring */}
          <div style={{
            position: "absolute",
            width: 8 - i, height: 8 - i,
            borderRadius: "50%",
            background: i === 0 ? theme.accentLight : i === 1 ? theme.accent2Light : theme.accent3,
            boxShadow: `0 0 12px ${i === 0 ? theme.accentLight : i === 1 ? theme.accent2Light : theme.accent3}`,
            top: "50%", left: "50%",
            marginTop: -(4 - i * 0.5),
            marginLeft: -(4 - i * 0.5),
          }} />
        </div>
      ))}

      {/* Avatar */}
      <div style={{
        width: 190, height: 190, borderRadius: "50%", overflow: "hidden",
        border: `2px solid ${theme.accent}60`,
        boxShadow: `0 0 0 8px ${theme.accentGlow}, 0 0 60px ${theme.accent}30`,
        position: "relative", zIndex: 5,
        background: `linear-gradient(135deg, #0f0f1a, ${theme.accent}40)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src="/profile.png"
          alt="Surya Prakash"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>
          S
        </div>
      </div>

      {/* Floating skill badges */}
      {badges.map((b, i) => (
        <div key={i} style={{
          position: "absolute", zIndex: 10,
          background: "rgba(10,10,20,0.92)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
          padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "#e2e8f0",
          display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          animation: `badge-float ${3.5 + i * 0.6}s ease-in-out infinite`,
          animationDelay: `${-i * 1.2}s`,
          ...b.style,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.dot }} />
          {b.text}
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPED WORD
// ─────────────────────────────────────────────────────────────────────────────
const TypedWord: React.FC<{ words: string[]; color: string }> = ({ words, color }) => {
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(words[0].length);

  useEffect(() => {
    const delay = deleting ? 50 : ci === words[wi].length ? 2000 : 90;
    const id = setTimeout(() => {
      if (!deleting) {
        if (ci < words[wi].length) { setCi(c => c + 1); setText(words[wi].slice(0, ci + 1)); }
        else setDeleting(true);
      } else {
        if (ci > 0) { setCi(c => c - 1); setText(words[wi].slice(0, ci - 1)); }
        else { setDeleting(false); setWi(w => (w + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(id);
  }, [ci, deleting, wi, words]);

  return <span style={{ color, fontWeight: 600 }}>{text}<span style={{ opacity: Math.sin(Date.now() / 500) > 0 ? 1 : 0 }}>|</span></span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ num: string; label: string; theme: Theme }> = ({ num, label, theme }) => (
  <div style={{
    padding: "24px 20px", borderRadius: 16,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s", cursor: "default",
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${theme.accent}40`; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
  >
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 0% 0%, ${theme.accentGlow} 0%, transparent 60%)`, pointerEvents: "none" }} />
    <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", lineHeight: 1 }}>{num}</div>
    <div style={{ fontSize: 10, color: "#64748b", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>{label}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL PILL
// ─────────────────────────────────────────────────────────────────────────────
const SkillPill: React.FC<{ skill: typeof SKILLS[0]; theme: Theme; delay: number }> = ({ skill, theme, delay }) => {
  const { ref, visible } = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        padding: "18px 10px",
        borderRadius: 12,
        background: hov ? `${theme.accent}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? theme.accent + "40" : "rgba(255,255,255,0.07)"}`,
        cursor: "default",
        transitionProperty: "opacity, transform, border-color, background",
        transitionDuration: `0.6s, 0.6s, 0.2s, 0.2s`,
      }}>
      <div style={{ fontSize: 26, color: skill.color, filter: hov ? `drop-shadow(0 0 8px ${skill.color})` : "none", transition: "filter .2s" }}>
        {skill.icon}
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, color: hov ? "#e2e8f0" : "#64748b", letterSpacing: "0.04em", transition: "color .2s", textAlign: "center" }}>
        {skill.name}
      </div>
      <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentLight})`,
          width: visible ? `${skill.pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(.16,1,.3,1) ${delay + 0.2}s`,
        }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE CARD
// ─────────────────────────────────────────────────────────────────────────────
const ExpCard: React.FC<{ exp: typeof EXPERIENCES[0]; theme: Theme; delay: number; isLast: boolean }> = ({ exp, theme, delay, isLast }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start" }}>
      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 4 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: theme.accent, boxShadow: `0 0 16px ${theme.accent}`, flexShrink: 0 }} />
        {!isLast && <div style={{ flex: 1, width: 1, background: "rgba(255,255,255,0.07)", minHeight: 40 }} />}
      </div>
      {/* Body */}
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          padding: 28, borderRadius: 16, marginBottom: 16,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hov ? theme.accent + "40" : "rgba(255,255,255,0.07)"}`,
          borderLeft: `3px solid ${hov ? theme.accent : "transparent"}`,
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: "all .25s cubic-bezier(.16,1,.3,1)",
          position: "relative", overflow: "hidden",
        }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 0% 50%, ${theme.accentGlow} 0%, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity .3s", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", fontFamily: "JetBrains Mono,monospace", fontSize: 10, fontWeight: 500, color: theme.accentLight, background: `${theme.accent}18`, border: `1px solid ${theme.accent}30`, borderRadius: 6, padding: "2px 8px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            {exp.badge}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 3, letterSpacing: "-0.3px" }}>{exp.title}</div>
          <div style={{ fontSize: 13, color: theme.accentLight, fontWeight: 500, marginBottom: 3 }}>{exp.company}</div>
          <div style={{ fontSize: 11, color: "#475569", fontFamily: "JetBrains Mono,monospace", marginBottom: 12 }}>{exp.period}</div>
          <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75 }}>{exp.desc}</div>
          {exp.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
              {exp.tags.map(t => (
                <span key={t} style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", fontWeight: 500, color: "#94a3b8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "2px 8px" }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
const ProjCard: React.FC<{ proj: typeof PROJECTS[0]; theme: Theme; delay: number }> = ({ proj, theme, delay }) => {
  const [hov, setHov] = useState(false);
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  return (
    <Reveal delay={delay} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setMx(((e.clientX - r.left) / r.width) * 100);
          setMy(((e.clientY - r.top)  / r.height) * 100);
        }}
        style={{
          borderRadius: 20, background: "rgba(255,255,255,0.03)", border: `1px solid ${hov ? theme.accent + "45" : "rgba(255,255,255,0.07)"}`,
          overflow: "hidden", flex: 1, display: "flex", flexDirection: "column",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.4)` : "none",
          transition: "all .3s cubic-bezier(.16,1,.3,1)", cursor: "default", position: "relative",
        }}>
        {/* Magnetic glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${mx}% ${my}%, ${theme.accentGlow} 0%, transparent 55%)`, opacity: hov ? 1 : 0, transition: "opacity .3s", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ padding: "24px 24px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, position: "relative", zIndex: 1 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: `${theme.accent}18`, border: `1px solid ${theme.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
            {proj.emoji}
          </div>
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noreferrer"
              style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 14, transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget).style.background = `${theme.accent}25`; (e.currentTarget).style.borderColor = `${theme.accent}50`; (e.currentTarget).style.color = theme.accentLight; }}
              onMouseLeave={e => { (e.currentTarget).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget).style.color = "#94a3b8"; }}>
              <SiGithub size={13} />
            </a>
          )}
        </div>

        <div style={{ padding: "16px 24px 24px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: hov ? theme.accentLight : "#e2e8f0", marginBottom: 8, letterSpacing: "-0.2px", transition: "color .2s" }}>{proj.title}</div>
          <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, flex: 1, marginBottom: 18 }}>{proj.desc}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {proj.tags.map(t => (
              <span key={t} style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", fontWeight: 500, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: hov ? theme.accentLight : "#64748b", transition: "color .2s" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

const Nav: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(NAV_LINKS[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg: React.CSSProperties = scrolled
    ? { background: "rgba(5,5,10,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }
    : { background: "transparent" };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "12px 0" : "20px 0", transition: "all .4s", ...navBg }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", background: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent2Light})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            GSS.dev
          </div>
          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 8, transition: "all .2s", color: active === l ? "#e2e8f0" : "#64748b", background: active === l ? "rgba(255,255,255,0.07)" : "transparent", textDecoration: "none" }}
                onMouseEnter={e => { if (active !== l) { (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; } }}
                onMouseLeave={e => { if (active !== l) { (e.currentTarget as HTMLAnchorElement).style.color = "#64748b"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}>
                {l}
              </a>
            ))}
          </div>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }} className="nav-ham">
            {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#94a3b8", borderRadius: 2 }} />)}
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 68, left: 16, right: 16, zIndex: 99, background: "rgba(10,10,20,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 12 }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "#94a3b8", textDecoration: "none" }}>
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<Theme>(COLOR_THEMES[0]);
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBtt(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global styles injected once
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'Syne',sans-serif;background:#050508;color:#e2e8f0;overflow-x:hidden;cursor:none}
      a{text-decoration:none;color:inherit}
      ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#050508}::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:99px}
      @keyframes spin-cw{to{transform:rotate(360deg)}}
      @keyframes spin-ccw{to{transform:rotate(-360deg)}}
      @keyframes badge-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      @keyframes glow-drift{0%,100%{transform:translate(0,0)}33%{transform:translate(40px,-30px)}66%{transform:translate(-20px,40px)}}
      @keyframes gradient-pan{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
      body::before{content:'';position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px 200px}
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const c = theme; // shorthand

  // ── section helpers ────────────────────────────────────────────────────────
  const sectionPad: React.CSSProperties = { position: "relative", zIndex: 2, padding: "120px 0" };
  const container: React.CSSProperties = { maxWidth: 1140, margin: "0 auto", padding: "0 24px" };

  return (
    <>
      <StarField starRgb={c.star} />
      <Cursor color={c.accentLight} />
      <Nav theme={c} />
      <ThemePicker current={c} onChange={setTheme} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="home" style={{ ...sectionPad, minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 0 80px" }}>
        {/* Ambient blobs */}
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${c.accentGlow} 0%, transparent 65%)`, top: -200, left: -200, animation: "glow-drift 12s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${c.accent2}10 0%, transparent 65%)`, bottom: -100, right: 0, animation: "glow-drift 16s ease-in-out infinite reverse", pointerEvents: "none" }} />

        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 80 }} className="hero-grid">
            <div>
              {/* Badge */}
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${c.accent}18`, border: `1px solid ${c.accent}40`, color: c.accentLight, fontFamily: "JetBrains Mono,monospace", fontSize: 11, fontWeight: 500, padding: "6px 14px", borderRadius: 99, marginBottom: 28, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "pulse-dot 2s ease-in-out infinite", display: "inline-block" }} />
                  Open to Opportunities
                </div>
              </Reveal>

              {/* Name */}
              <Reveal delay={0.1}>
                <h1 style={{ fontSize: "clamp(36px,6vw,70px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
                  <span style={{ background: `linear-gradient(135deg, #fff 0%, ${c.accentLight} 50%, ${c.accent2Light} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% 200%", animation: "gradient-pan 6s ease infinite" }}>
                    Gonella Siva Sai<br />Surya Prakash
                  </span>
                </h1>
              </Reveal>

              {/* Tagline with typed word */}
              <Reveal delay={0.2}>
                <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
                  CSE undergrad at PES University — building{" "}
                  <TypedWord
                    words={["full-stack systems", "distributed pipelines", "conversational AI", "intelligent web apps"]}
                    color={c.accentLight}
                  />
                  {" "}for the future.
                </p>
              </Reveal>

              {/* CTA buttons */}
              <Reveal delay={0.3}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
                  <a href="/GonellaSuryaPrakash_Resume.pdf" download
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.accentBtn, color: "white", fontSize: 14, fontWeight: 600, padding: "13px 26px", borderRadius: 10, boxShadow: `0 8px 30px ${c.accentGlow}`, cursor: "pointer", border: "none", transition: "transform .2s, box-shadow .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 14px 40px ${c.accent}60`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 30px ${c.accentGlow}`; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 004.56 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
                    Download Resume
                  </a>
                  <a href="#projects"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#e2e8f0", fontSize: 14, fontWeight: 500, padding: "13px 26px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all .2s" }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = c.accentLight; a.style.background = `${c.accent}12`; a.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.12)"; a.style.background = "rgba(255,255,255,0.04)"; a.style.transform = "translateY(0)"; }}>
                    View Projects
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </a>
                </div>
              </Reveal>

              {/* Stats row */}
              <Reveal delay={0.4}>
                <div style={{ display: "flex", gap: 36, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {[["8.73","CGPA"],["6+","Projects"],["1","Internship"],["2+","Club Roles"]].map(([n,l]) => (
                    <div key={l}>
                      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-1px", color: "#e2e8f0" }}>{n}</div>
                      <div style={{ fontSize: 10, color: "#475569", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Orbital avatar */}
            <Reveal delay={0.2}>
              <OrbitalAvatar theme={c} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" style={sectionPad}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            {/* Left */}
            <div>
              <Reveal><SectionLabel color={c.accentLight}>Who I Am</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16 }}>
                  Passionate Builder,<br />Curious Mind
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, marginBottom: 16 }}>
                  I'm a <strong style={{ color: "#e2e8f0" }}>3rd-year Computer Science Engineering student</strong> at PES University, Bengaluru — with a strong grip on full-stack development, distributed systems, and AI-powered applications.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, marginBottom: 32 }}>
                  My journey began with curiosity about how applications work behind the scenes, and grew into a passion for <strong style={{ color: "#e2e8f0" }}>distributed computing, conversational AI, and intelligent web apps</strong>. I love shipping things that matter.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "📍", label: "Location",  value: "Bengaluru, Karnataka, India" },
                    { icon: "🎓", label: "Degree",    value: "B.Tech CSE — PES University" },
                    { icon: "📧", label: "Email",     value: "gonellasurya2005@gmail.com" },
                    { icon: "📱", label: "Phone",     value: "+91 9880410689" },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", fontSize: 13 }}>
                      <span style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }}>{row.icon}</span>
                      <span style={{ color: "#64748b", flex: 1 }}>{row.label}</span>
                      <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["8.73","Current CGPA"],["6+","Projects Built"],["3×","Scholarships"],["2+","Club Roles"]].map(([n,l], i) => (
                <Reveal key={l} delay={0.1 + i * 0.1}>
                  <StatCard num={n} label={l} theme={c} />
                </Reveal>
              ))}
              {/* Timeline card */}
              <Reveal delay={0.5} style={{ gridColumn: "1 / -1" }}>
                <div style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: 10, fontFamily: "JetBrains Mono,monospace", color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Timeline</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { year: "2023", label: "Joined PES University" },
                      { year: "2024", label: "SMCC Head — Equinox Club" },
                      { year: "2025", label: "Research Intern at CCNCS" },
                      { year: "Now",  label: "Logistics Head & Building 🚀" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: c.accentLight, width: 28, flexShrink: 0, fontWeight: 600 }}>{item.year}</span>
                        <div style={{ width: 40 + i * 14, height: 1, background: `linear-gradient(90deg, ${c.accent}, ${c.accentLight})`, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#64748b" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ ...sectionPad, background: "#0a0a12" }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <Reveal><SectionLabel color={c.accentLight}>Tech Arsenal</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                  Technologies<br />I Work With
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 14, color: "#64748b", maxWidth: 280, textAlign: "right", lineHeight: 1.7 }}>
                A curated stack of languages, frameworks, and tools I use to build things end-to-end.
              </p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
            {SKILLS.map((skill, i) => (
              <SkillPill key={skill.name} skill={skill} theme={c} delay={i * 0.04} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <section id="experience" style={sectionPad}>
        <div style={container}>
          <Reveal><SectionLabel color={c.accentLight}>Background</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 56 }}>
              Education &amp;<br />Experience
            </h2>
          </Reveal>
          <div>
            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={i} exp={exp} theme={c} delay={i * 0.1} isLast={i === EXPERIENCES.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section id="projects" style={{ ...sectionPad, background: "#0a0a12" }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <Reveal><SectionLabel color={c.accentLight}>Work</SectionLabel></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px" }}>Featured Projects</h2></Reveal>
            </div>
            <Reveal delay={0.2}>
              <a href="https://github.com/GSuryaP" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#e2e8f0", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = c.accentLight; a.style.background = `${c.accent}12`; }}
                onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "rgba(255,255,255,0.12)"; a.style.background = "rgba(255,255,255,0.04)"; }}>
                All on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M17 7H7M17 7v10"/></svg>
              </a>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
            {PROJECTS.map((proj, i) => (
              <ProjCard key={i} proj={proj} theme={c} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" style={{ ...sectionPad, paddingBottom: 160 }}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            {/* Left */}
            <div>
              <Reveal><SectionLabel color={c.accentLight}>Let's Talk</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>Get In Touch</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 36 }}>
                  I'm actively looking for internship and collaborative opportunities. Whether you have a project in mind or just want to connect — my inbox is always open.
                </p>
              </Reveal>

              {/* Contact rows */}
              <Reveal delay={0.3}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {[
                    { icon: "✉️", label: "Email",    value: "gonellasurya2005@gmail.com", href: "mailto:gonellasurya2005@gmail.com" },
                    { icon: "📞", label: "Phone",    value: "+91 9880410689",              href: "tel:+919880410689" },
                    { icon: "📍", label: "Location", value: "Bengaluru, Karnataka, India", href: undefined },
                  ].map(row => (
                    <a key={row.label} href={row.href ?? "#"} target={row.href?.startsWith("http") ? "_blank" : undefined}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transition: "all .2s", cursor: row.href ? "pointer" : "default" }}
                      onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; if(row.href){a.style.borderColor=`${c.accent}50`;a.style.background=`${c.accent}08`;a.style.transform="translateX(4px)";} }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor="rgba(255,255,255,0.07)";a.style.background="rgba(255,255,255,0.03)";a.style.transform="translateX(0)"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.accent}15`, border: `1px solid ${c.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        {row.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#475569", fontFamily: "JetBrains Mono,monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{row.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0", marginTop: 1 }}>{row.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* ── ALL 4 SOCIAL BUTTONS — ALL PRIMARY/PURPLE ───────────── */}
              <Reveal delay={0.4}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {SOCIALS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                      rel="noreferrer"
                      {...(s as any).download ? { download: true } : {}}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "13px 16px", borderRadius: 12,
                        /* ── All 4 are the same primary gradient ── */
                        background: c.accentBtn,
                        color: "white",
                        fontSize: 13, fontWeight: 600,
                        border: "none", cursor: "pointer",
                        boxShadow: `0 4px 20px ${c.accentGlow}`,
                        transition: "transform .2s, box-shadow .2s, filter .2s",
                      }}
                      onMouseEnter={e => {
                        const a = e.currentTarget as HTMLAnchorElement;
                        a.style.transform = "translateY(-3px)";
                        a.style.boxShadow = `0 10px 32px ${c.accent}70`;
                        a.style.filter = "brightness(1.1)";
                      }}
                      onMouseLeave={e => {
                        const a = e.currentTarget as HTMLAnchorElement;
                        a.style.transform = "translateY(0)";
                        a.style.boxShadow = `0 4px 20px ${c.accentGlow}`;
                        a.style.filter = "brightness(1)";
                      }}
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* CTA Card */}
            <Reveal delay={0.3}>
              <div style={{
                padding: 40, borderRadius: 20, textAlign: "center",
                background: `linear-gradient(135deg, ${c.accent}12 0%, ${c.accent}06 50%, ${c.accent2}06 100%)`,
                border: `1px solid ${c.accent}30`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${c.accentLight}, transparent)` }} />
                <div style={{ fontSize: 52, marginBottom: 20 }}>🚀</div>
                <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
                  Ready to build<br />
                  <span style={{ background: `linear-gradient(135deg, ${c.accentLight}, ${c.accent2Light})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    something great?
                  </span>
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, marginBottom: 28 }}>
                  I'm open to internships, research collaborations, freelance work, and open-source contributions. Let's create something impactful together.
                </p>
                <a href="mailto:gonellasurya2005@gmail.com"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: c.accentBtn, color: "white", fontSize: 14, fontWeight: 600, padding: "14px 24px", borderRadius: 10, boxShadow: `0 8px 30px ${c.accentGlow}`, cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = `0 14px 40px ${c.accent}60`; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(0)"; a.style.boxShadow = `0 8px 30px ${c.accentGlow}`; }}>
                  Start a Conversation ↗
                </a>
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 12, color: "#475569", fontFamily: "JetBrains Mono,monospace" }}>Available · Usually replies within 24h</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.06)", background: "#050508", padding: "28px 0" }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#334155", fontFamily: "JetBrains Mono,monospace" }}>
            © 2025 <span style={{ color: c.accentLight }}>Gonella Siva Sai Surya Prakash</span>. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#334155", fontFamily: "JetBrains Mono,monospace" }}>
            Built with <span style={{ color: c.accentLight }}>♥</span> — React · TypeScript · CSS-in-JS
          </p>
        </div>
      </footer>

      {/* ── BACK TO TOP ───────────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 50,
          width: 44, height: 44, borderRadius: "50%",
          background: c.accent, color: "white", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", border: "none",
          opacity: showBtt ? 1 : 0, pointerEvents: showBtt ? "all" : "none",
          transform: showBtt ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .3s, transform .3s",
          boxShadow: `0 4px 20px ${c.accentGlow}`,
        }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = showBtt ? "translateY(0)" : "translateY(10px)"}
      >
        ↑
      </button>

      {/* Responsive styles */}
      <style>{`
        @media(max-width:900px){
          .hero-grid{ grid-template-columns: 1fr !important; }
        }
        @media(max-width:768px){
          #about .about-grid, #contact .contact-grid{
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
