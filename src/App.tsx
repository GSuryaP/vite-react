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
