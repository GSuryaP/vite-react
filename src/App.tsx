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

import React, { useState, useEffect, useRef } from 'react';
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase
} from "react-icons/si";

interface Skill { name: string; icon: React.ReactNode; }
interface Project { title: string; description: string; icon: React.ReactNode; tags: string[]; liveUrl?: string; repoUrl?: string; }
interface Experience { title: string; company: string; period: string; type: string; description: string[]; technologies: string[]; }

// ── Cursor Trail ──
const CursorTrail: React.FC = () => {
  const [trails, setTrails] = useState<{x:number;y:number;id:number}[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const id = counter.current++;
      setTrails(t => [...t.slice(-18), {x: e.clientX, y: e.clientY, id}]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((t, i) => (
        <div key={t.id} className="absolute w-2 h-2 rounded-full"
          style={{
            left: t.x - 4, top: t.y - 4,
            background: `rgba(74,222,128,${(i/trails.length)*0.5})`,
            transform: `scale(${i/trails.length})`,
            boxShadow: `0 0 6px rgba(74,222,128,${(i/trails.length)*0.4})`
          }} />
      ))}
    </div>
  );
};

// ── Glitch Text ──
const GlitchText: React.FC<{children: string; className?: string}> = ({children, className=''}) => (
  <span className={`glitch-wrap ${className}`} data-text={children}>
    <span className="glitch-text">{children}</span>
  </span>
);

// ── Noise Overlay ──
const NoiseOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
    style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundRepeat:'repeat',backgroundSize:'128px'}} />
);

// ── Scanlines ──
const Scanlines: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[2]"
    style={{background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)'}} />
);

// ── Counter animation ──
const AnimCounter: React.FC<{value: string; label: string}> = ({value, label}) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const end = parseFloat(value);
        const dur = 1200;
        const step = (ts: number, startTs: number) => {
          const prog = Math.min((ts - startTs) / dur, 1);
          const cur = end * prog;
          setDisplay(value.includes('.') ? cur.toFixed(2) : Math.floor(cur).toString());
          if (prog < 1) requestAnimationFrame(ts2 => step(ts2, startTs));
        };
        requestAnimationFrame(ts => step(ts, ts));
        obs.disconnect();
      }
    }, {threshold: 0.5});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="group relative p-6 border border-green-500/20 hover:border-green-400/60 transition-all duration-500 cursor-default overflow-hidden">
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-500" />
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-400/80" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-400/80" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-400/80" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-400/80" />
      <div className="text-4xl font-black text-green-400 leading-none group-hover:text-amber-400 transition-colors duration-300" style={{fontFamily:"'Orbitron',monospace"}}>
        {display}<span className="text-green-600 text-2xl">{value.endsWith('+') ? '+' : ''}</span>
      </div>
      <div className="text-xs tracking-[0.2em] text-gray-500 uppercase mt-2 group-hover:text-gray-300 transition-colors" style={{fontFamily:"'Share Tech Mono',monospace"}}>{label}</div>
    </div>
  );
};

// ── Skill Chip ──
const SkillChip: React.FC<Skill & {index: number}> = ({icon, name, index}) => (
  <div className="group relative flex items-center gap-3 px-4 py-3 border border-gray-800 hover:border-green-500/60 transition-all duration-300 cursor-default overflow-hidden"
    style={{animationDelay:`${index*40}ms`}}>
    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-green-500/10 to-transparent" />
    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all duration-300">
      {icon}
    </div>
    <span className="text-xs font-mono tracking-widest text-gray-500 group-hover:text-green-300 transition-colors duration-300 uppercase relative z-10" style={{fontFamily:"'Share Tech Mono',monospace"}}>{name}</span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:shadow-[0_0_6px_rgba(74,222,128,1)]" />
  </div>
);

// ── Project Card ──
const ProjectCard: React.FC<{project: Project; index: number}> = ({project, index}) => (
  <div className="project-card group relative border border-gray-800/80 hover:border-green-500/40 transition-all duration-500 overflow-hidden bg-[#030603]">
    <div className="absolute top-4 right-5 text-6xl font-black text-gray-900 group-hover:text-gray-800 transition-colors select-none leading-none" style={{fontFamily:"'Orbitron',monospace"}}>
      {String(index+1).padStart(2,'0')}
    </div>
    <div className="h-0.5 bg-gradient-to-r from-green-500 via-amber-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
    <div className="relative h-36 flex items-center justify-center overflow-hidden bg-[#050a05]"
      style={{backgroundImage:'radial-gradient(rgba(74,222,128,0.04) 1px, transparent 1px)', backgroundSize:'20px 20px'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(74,222,128,0.6)]">
        {project.icon}
      </div>
    </div>
    <div className="p-6 pt-4">
      <h3 className="text-base font-bold text-white group-hover:text-green-300 transition-colors duration-300 tracking-wide mb-3 leading-snug" style={{fontFamily:"'Share Tech Mono',monospace"}}>{project.title}</h3>
      <p className="text-gray-600 text-xs leading-relaxed mb-4 group-hover:text-gray-400 transition-colors duration-300">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-[10px] text-amber-500/70 bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 tracking-wider" style={{fontFamily:"'Share Tech Mono',monospace"}}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-2.5 bg-green-500/10 border border-green-500/40 text-green-400 hover:bg-green-500/20 hover:text-green-300 transition-all duration-200 tracking-widest uppercase" style={{fontFamily:"'Share Tech Mono',monospace"}}>
            ▶ Live
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-2.5 bg-transparent border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 tracking-widest uppercase" style={{fontFamily:"'Share Tech Mono',monospace"}}>
            {'</>'} Repo
          </a>
        )}
      </div>
    </div>
  </div>
);

// ── Experience Entry ──
const ExpEntry: React.FC<{exp: Experience; index: number}> = ({exp, index}) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className={`border-b border-gray-900 transition-all duration-500 ${open ? 'border-green-500/20' : ''}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-2 group text-left hover:bg-green-500/3 transition-colors duration-200">
        <div className="flex items-center gap-5">
          <span className="text-xs text-gray-700 group-hover:text-green-600 transition-colors w-6" style={{fontFamily:"'Share Tech Mono',monospace"}}>{String(index+1).padStart(2,'0')}</span>
          <div>
            <p className="text-sm font-bold text-white group-hover:text-green-300 transition-colors tracking-wide" style={{fontFamily:"'Share Tech Mono',monospace"}}>{exp.title}</p>
            <p className="text-xs text-gray-600 mt-0.5 group-hover:text-amber-500/70 transition-colors">{exp.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-gray-700 tracking-wider" style={{fontFamily:"'Share Tech Mono',monospace"}}>{exp.period}</span>
          <span className="text-[10px] border border-amber-500/30 text-amber-500/60 px-2 py-0.5 tracking-widest hidden md:block" style={{fontFamily:"'Share Tech Mono',monospace"}}>{exp.type.toUpperCase()}</span>
          <span className={`text-green-500 transition-transform duration-300 text-lg ${open ? 'rotate-45' : ''}`} style={{fontFamily:"'Share Tech Mono',monospace"}}>+</span>
        </div>
      </button>
      {open && (
        <div className="px-2 pb-6 pl-12 border-l-2 border-green-500/20 ml-2 mb-2">
          {exp.description.map((d, i) => (
            <p key={i} className="text-gray-500 text-xs leading-relaxed mb-3 hover:text-gray-300 transition-colors">{d}</p>
          ))}
          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {exp.technologies.map((t, i) => (
                <span key={i} className="text-[10px] text-green-600/70 border border-green-900/60 px-2 py-0.5 tracking-wider" style={{fontFamily:"'Share Tech Mono',monospace"}}>{t}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderVis(window.scrollY > 60);
      const sections = ['home','about','skills','experience','projects','contact'];
      const mid = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
      { name: "Python", icon: <SiPython color="#3776AB" size={28} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={28} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={28} /> },
      { name: "RASA", icon: <img src="/rasa.jpg" alt="RASA" className="w-7 h-7" /> },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={28} /> },
      { name: "Express", icon: <SiExpress color="#ffffff" size={28} /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={28} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={28} /> },
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={28} /> },
      { name: "CSS3", icon: <SiCss color="#1572B6" size={28} /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" size={28} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={28} /> },
      { name: "C", icon: <SiC color="#00599C" size={28} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={28} /> },
      { name: "GitHub", icon: <SiGithub color="#ffffff" size={28} /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={28} /> },
    ],
    experiences: [
      { title: "Computer Science Engineering Student", company: "PES University", period: "2023 - Present", type: "Education", description: ["I am currently pursuing a B.Tech in Computer Science and Engineering at PES University, maintaining a CGPA of 8.73 through my 5th semester. I have been honored with the Prof. CNR Scholarship for the 1st, 3rd, 4th semesters, awarded to the top 20%. Other than academics, I actively participate in campus life as a member of multiple clubs."], technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"] },
      { title: "Research Intern", company: "Center of Computer Networks and CyberSecurity (CCNCS)", period: "June 2025 - July 2025", type: "Summer Internship", description: ["As a Research Intern at CCNCS, I developed an intelligent SDN management system by integrating the ONOS distributed controller cluster using Mininet with a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection through REST APIs and a visualization dashboard."], technologies: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"] },
      { title: "Logistics Head", company: "Equinox - The Space Club, PESU ECC", period: "May 2025 - Present", type: "Club domain head", description: ["As the Logistics Head of Equinox – The Space Club, I oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and other activities with efficient logistical support and timely operations."], technologies: [] },
      { title: "SMCC Head", company: "Equinox - The Space Club, PESU ECC", period: "Sep 2024 - May 2025", type: "Club domain head", description: ["As the Social Media and Content Creator for Equinox – The Space Club, I handled digital outreach by designing engaging posts, managing social media campaigns, and creating content to promote events."], technologies: [] },
    ] as Experience[],
    projects: [
      { title: "RASA-Driven SDN Tool", description: "Built a RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet with custom RASA actions for automated flow queries and troubleshooting.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><circle cx="12" cy="5" r="2" stroke="#4ade80" strokeWidth="2"/><circle cx="5" cy="19" r="2" stroke="#4ade80" strokeWidth="2"/><circle cx="19" cy="19" r="2" stroke="#4ade80" strokeWidth="2"/><path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"], repoUrl: "https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot" },
      { title: "Distributed Image Processing Pipeline", description: "A distributed image processing system using Apache Kafka for async communication between a FastAPI master node and multiple PIL-based worker nodes. The master splits images into tiles, publishes them to Kafka, workers process and return results, and the master reconstructs the final image with a real-time heartbeat monitoring dashboard.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><rect x="9" y="9" width="6" height="6" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="9" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="6" y1="12" x2="9" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="18" y1="12" x2="15" y2="12" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/><rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#4ade80" strokeWidth="1.5"/><line x1="12" y1="18" x2="12" y2="15" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags: ["Apache Kafka", "FastAPI", "Python", "Pillow", "Docker", "Distributed Systems"], repoUrl: "https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline" },
      { title: "GitHub Repository Tracker", description: "A modern interactive dashboard for tracking GitHub repositories, users, commits, and open issues. Features real-time stats overview, live search, aurora-style animated background, and quick-access tools — powered by a Node.js API and a Python GitHub sync script.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="#4ade80" strokeWidth="1.2" fill="none"/></svg>, tags: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "GitHub API"], repoUrl: "https://github.com/GSuryaP/Github-Repository-Tracker" },
      { title: "Personal Finance Analytics Dashboard", description: "A FinTech analytics dashboard built with React and Tailwind CSS for managing personal transactions in real time. Supports full CRUD operations, dynamic Recharts visualizations, dark/light mode toggle, real-time search, and auto-recalculated metrics.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><rect x="3" y="12" width="3" height="9" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="8" y="8" width="3" height="13" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="13" y="5" width="3" height="16" rx="1" stroke="#4ade80" strokeWidth="1.8"/><rect x="18" y="9" width="3" height="12" rx="1" stroke="#4ade80" strokeWidth="1.8"/><path d="M4.5 11L9.5 7L14.5 4L19.5 8" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1"/></svg>, tags: ["React", "Vite", "Tailwind CSS", "Recharts", "JavaScript", "CRUD"], repoUrl: "https://github.com/GSuryaP/Personal-Finance-Dashboard" },
      { title: "AdaptiveLearn AI", description: "An AI-powered teacher analytics dashboard built on AWS free-tier services. Reads student scores from S3 CSV files via a Python Lambda function, uses Amazon Bedrock (Titan) for LLM-driven insights, and surfaces weak topics through a clean HTML frontend.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#4ade80" strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 14.5h4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags: ["AWS S3", "AWS Lambda", "Amazon Bedrock", "Python", "HTML", "CSV"], repoUrl: "https://github.com/GSuryaP/AdaptiveLearn-AI" },
      { title: "Weather & AQI Tracker", description: "Built a Tkinter-based application that verifies city names using OpenWeatherMap API and displays comprehensive environmental data including Air Quality Index and detailed weather information with user-friendly interface.", icon: <svg viewBox="0 0 24 24" fill="none" className="w-14 h-14"><circle cx="12" cy="10" r="4" stroke="#4ade80" strokeWidth="2"/><path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/><path d="M5 19H19M7 21H17" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>, tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON", "GUI"], repoUrl: "https://github.com/GSuryaP/Weather-AQI_Tracker" },
    ] as Project[],
  };

  const navLinks = [
    { id: 'home', title: 'HOME' }, { id: 'about', title: 'ABOUT' },
    { id: 'skills', title: 'SKILLS' }, { id: 'experience', title: 'XP' },
    { id: 'projects', title: 'WORK' }, { id: 'contact', title: 'CONTACT' },
  ];

  return (
    <div className="bg-[#030603] text-white min-h-screen overflow-x-hidden" style={{cursor:'none'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Syne:wght@400;700;800&display=swap');
        * { cursor: none !important; }
        body { background: #030603; }

        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
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
        @keyframes scanline-move { 0%{top:-5%} 100%{top:105%} }
        @keyframes spin-cw { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-ccw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes slide-in-left { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slide-in-right { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes crt-flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.7} 94%{opacity:1} 96%{opacity:0.85} 97%{opacity:1} }
        @keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 70%{box-shadow:0 0 0 10px rgba(74,222,128,0)} }

        .marquee-track { animation: marquee 28s linear infinite; }
        .animate-slide-left { animation: slide-in-left 0.7s ease-out forwards; }
        .animate-slide-right { animation: slide-in-right 0.7s ease-out forwards; }
        .crt-flicker { animation: crt-flicker 8s infinite; }

        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap:hover::before,
        .glitch-wrap:hover::after {
          content: attr(data-text);
          position: absolute; left: 0; top: 0;
          width: 100%; height: 100%;
          font-family: inherit; font-size: inherit; font-weight: inherit; color: inherit;
        }
        .glitch-wrap:hover::before { color: #fbbf24; animation: glitch-1 0.4s steps(1) infinite; left: 2px; }
        .glitch-wrap:hover::after  { color: #4ade80; animation: glitch-2 0.4s steps(1) infinite; left: -2px; }

        .moving-scanline {
          position: absolute; left: 0; width: 100%; height: 60px;
          background: linear-gradient(transparent, rgba(74,222,128,0.03), transparent);
          animation: scanline-move 5s linear infinite;
          pointer-events: none;
        }
        .hex-grid {
          background-color: #030603;
          background-image: linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .project-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(74,222,128,0.08); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030603; }
        ::-webkit-scrollbar-thumb { background: #4ade80; }
      `}</style>

      <CursorTrail />
      <NoiseOverlay />
      <Scanlines />

      {/* Moving scanline */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
        <div className="moving-scanline" />
      </div>

      {/* ═══ NAVBAR ═══ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerVis ? 'bg-[#030603]/95 backdrop-blur-sm border-b border-green-900/40' : ''}`}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          <a href="#home" className="flex items-center gap-2 group" style={{fontFamily:"'Orbitron',monospace",fontSize:'11px',letterSpacing:'0.3em',color:'#4ade80'}}>
            <span className="w-2 h-2 bg-green-400 rounded-full" style={{animation:'pulse-green 2s infinite'}} />
            GSS_SURYA.exe
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`}
                style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'0.2em'}}
                className={`px-4 py-2 transition-all duration-200 relative ${activeSection === l.id ? 'text-green-400' : 'text-gray-600 hover:text-green-300'}`}>
                {activeSection === l.id && <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,1)]" />}
                {l.title}
              </a>
            ))}
          </nav>
          <button className="md:hidden border border-green-800 px-3 py-1.5 hover:bg-green-500/10 transition-colors"
            style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:'#4ade80'}}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#030603] border-t border-green-900/40 px-6 py-4 flex flex-col gap-1">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
                style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'0.2em'}}
                className={`py-3 border-b border-gray-900 transition-colors ${activeSection === l.id ? 'text-green-400' : 'text-gray-500 hover:text-green-300'}`}>
                {l.title}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden hex-grid crt-flicker">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-green-500/40" />
            <span className="text-gray-700 tracking-[0.3em]" style={{writingMode:'vertical-rl',transform:'rotate(180deg)',fontFamily:"'Share Tech Mono',monospace",fontSize:'10px'}}>PORTFOLIO_v2.0</span>
            <div className="w-px h-24 bg-gradient-to-t from-transparent to-green-500/40" />
          </div>

          <div className="container mx-auto px-6 md:px-16 lg:px-24 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 border border-green-900/50 px-3 py-1.5 mb-8 tracking-widest"
                style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',color:'rgba(74,222,128,0.7)'}}>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                SYS_STATUS: AVAILABLE_FOR_HIRE
              </div>

              <h1 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,lineHeight:0.9,letterSpacing:'-0.02em'}}>
                <GlitchText className="block text-green-400 text-5xl md:text-7xl">SURYA</GlitchText>
                <GlitchText className="block text-white text-5xl md:text-7xl mt-1">PRAKASH</GlitchText>
              </h1>

              <div className="text-gray-600 text-sm mt-6 mb-8 flex items-center gap-0" style={{fontFamily:"'Share Tech Mono',monospace"}}>
                <span className="text-amber-500/70">{'>'}</span>
                <span className="ml-2">{portfolioData.tagline}</span>
                <span className={`ml-1 inline-block w-2 h-4 bg-green-400 ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={portfolioData.resumeUrl} download
                  className="group relative overflow-hidden border border-green-500/50 px-6 py-3.5 text-green-400 hover:text-black transition-colors duration-300"
                  style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'0.2em'}}>
                  <span className="relative z-10">DOWNLOAD_CV.PDF</span>
                  <div className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                  <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'0.2em'}}>DOWNLOAD_CV.PDF</span>
                </a>
                <a href="#contact" className="border border-gray-800 px-6 py-3.5 text-gray-500 hover:border-green-800 hover:text-green-600 transition-all duration-300"
                  style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'11px',letterSpacing:'0.2em'}}>
                  INIT_CONTACT →
                </a>
              </div>

              <div className="flex gap-4 mt-8">
                {[
                  {href:portfolioData.socials.github,label:'GH',icon:<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>},
                  {href:portfolioData.socials.linkedin,label:'LI',icon:<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                  {href:`mailto:${portfolioData.contactEmail}`,label:'ML',icon:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>},
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-400 transition-colors duration-200 border border-gray-900 hover:border-green-900 px-3 py-2"
                    style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.3em'}}>
                    {s.icon}<span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: profile */}
            <div className="flex justify-center lg:justify-end animate-slide-right">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <svg className="absolute inset-0 w-full h-full" style={{animation:'spin-cw 20s linear infinite'}} viewBox="0 0 320 320">
                  <circle cx="160" cy="160" r="155" fill="none" stroke="rgba(74,222,128,0.15)" strokeWidth="1" strokeDasharray="8 6" />
                </svg>
                <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" style={{animation:'spin-ccw 15s linear infinite'}} viewBox="0 0 256 256">
                  <circle cx="128" cy="128" r="124" fill="none" stroke="rgba(251,191,36,0.1)" strokeWidth="1" strokeDasharray="4 12" />
                  <circle cx="128" cy="4" r="3" fill="rgba(251,191,36,0.6)" />
                  <circle cx="128" cy="252" r="3" fill="rgba(251,191,36,0.6)" />
                </svg>
                <div className="absolute inset-10 rounded-full overflow-hidden border border-green-500/30"
                  style={{boxShadow:'0 0 40px rgba(74,222,128,0.15), inset 0 0 40px rgba(0,0,0,0.5)'}}>
                  <img src="/profile.png" alt="Surya Prakash" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).onerror=null; (e.target as HTMLImageElement).src='https://placehold.co/280x280/030603/4ade80?text=GSS'; }} />
                  <div className="absolute inset-0 pointer-events-none" style={{background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)'}} />
                </div>
                {[['top-8 left-8','border-t border-l'],['top-8 right-8','border-t border-r'],['bottom-8 left-8','border-b border-l'],['bottom-8 right-8','border-b border-r']].map(([pos,border],i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5 ${border} border-green-400/50`} />
                ))}
                <div className="absolute -right-4 top-1/4 bg-[#030603] border border-green-900/60 px-3 py-1.5 shadow-lg"
                  style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#4ade80'}}>CGPA: 8.73</div>
                <div className="absolute -left-4 bottom-1/3 bg-[#030603] border border-amber-900/60 px-3 py-1.5 shadow-lg"
                  style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'rgb(245,158,11)'}}>PES University</div>
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-green-900/30 py-2 bg-[#030603]/80">
            <div className="flex whitespace-nowrap marquee-track">
              {[...Array(2)].map((_,ri) => (
                <span key={ri} style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.3em',color:'#1f2d1f'}}>
                  {['FULL_STACK_DEV','AI_ENTHUSIAST','OPEN_SOURCE_CONTRIBUTOR','CSE_UNDERGRAD','SDN_RESEARCHER','CLOUD_EXPLORER','REACT_DEVELOPER','PYTHON_PROGRAMMER'].map((item,i) => (
                    <span key={i}><span className="text-green-900 mx-6">◆</span><span className="hover:text-green-400 transition-colors duration-200">{item}</span></span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-4 mb-16">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.4em',color:'#16a34a'}}>02</span>
              <div className="h-px w-16 bg-green-900/50" />
              <h2 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,letterSpacing:'0.1em'}} className="text-2xl md:text-4xl text-white">
                ABOUT<span className="text-green-400">_ME</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3">
                <div className="relative border border-gray-900 p-8 md:p-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/60" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/60" />
                  <div className="mb-6 flex items-center gap-2" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.3em',color:'#374151'}}>
                    <span style={{color:'#16a34a'}}>●</span> cat bio.txt
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm" style={{fontFamily:"'Syne',sans-serif"}}>
                    {portfolioData.bio}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 gap-0">
                <AnimCounter value="8.73" label="CGPA" />
                <AnimCounter value="6" label="PROJECTS+" />
                <AnimCounter value="1" label="INTERNSHIPS" />
                <AnimCounter value="2" label="CLUBS+" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="skills" className="py-28 px-6 md:px-16 relative">
          <div className="absolute inset-0 hex-grid opacity-60 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <div className="flex items-center gap-4 mb-16">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.4em',color:'#16a34a'}}>03</span>
              <div className="h-px w-16 bg-green-900/50" />
              <h2 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,letterSpacing:'0.1em'}} className="text-2xl md:text-4xl text-white">
                TECH<span className="text-green-400">_STACK</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 border border-gray-900">
              {portfolioData.skills.map((skill,i) => (
                <div key={skill.name} className="border border-gray-900/80">
                  <SkillChip {...skill} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-16">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.4em',color:'#16a34a'}}>04</span>
              <div className="h-px w-16 bg-green-900/50" />
              <h2 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,letterSpacing:'0.1em'}} className="text-2xl md:text-4xl text-white">
                EXPERIENCE<span className="text-green-400">_LOG</span>
              </h2>
            </div>
            <div className="border border-gray-900/80 relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500/40" />
              <div className="p-4 md:p-6">
                {portfolioData.experiences.map((exp,i) => <ExpEntry key={i} exp={exp} index={i} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="projects" className="py-28 px-6 md:px-16 relative">
          <div className="absolute inset-0 hex-grid opacity-40 pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative">
            <div className="flex items-center gap-4 mb-16">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.4em',color:'#16a34a'}}>05</span>
              <div className="h-px w-16 bg-green-900/50" />
              <h2 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,letterSpacing:'0.1em'}} className="text-2xl md:text-4xl text-white">
                SELECTED<span className="text-green-400">_WORK</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-900/40">
              {portfolioData.projects.map((p,i) => (
                <div key={i} className="bg-[#030603]">
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-16">
              <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',letterSpacing:'0.4em',color:'#16a34a'}}>06</span>
              <div className="h-px w-16 bg-green-900/50" />
              <h2 style={{fontFamily:"'Orbitron',monospace",fontWeight:900,letterSpacing:'0.1em'}} className="text-2xl md:text-4xl text-white">
                INIT<span className="text-green-400">_CONTACT</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-gray-900/40 mb-px">
              {[
                {label:'LOCATION', val:portfolioData.location},
                {label:'EMAIL', val:portfolioData.contactEmail, href:`mailto:${portfolioData.contactEmail}`},
                {label:'PHONE', val:portfolioData.phone, href:`tel:${portfolioData.phone}`},
                {label:'STATUS', val:'OPEN_TO_OPPORTUNITIES', green:true},
              ].map((item,i) => (
                <div key={i} className="group bg-[#030603] p-8 hover:bg-green-500/3 transition-colors duration-300 border border-gray-900/50 hover:border-green-900/60 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-green-500/30 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <p className="mb-3 tracking-[0.3em]" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#374151'}}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-sm text-gray-400 hover:text-green-400 transition-colors break-all" style={{fontFamily:"'Syne',sans-serif"}}>{item.val}</a>
                    : <p className={`text-sm ${(item as any).green ? 'text-green-400' : 'text-gray-400'}`} style={{fontFamily:"'Syne',sans-serif"}}>{item.val}</p>
                  }
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-px bg-gray-900/40">
              {[
                {href:portfolioData.socials.github, label:'GITHUB', sub:'GSuryaP'},
                {href:portfolioData.socials.linkedin, label:'LINKEDIN', sub:'g-s-s-surya-prakash'},
                {href:`mailto:${portfolioData.contactEmail}`, label:'EMAIL', sub:'Direct Line'},
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="group bg-[#030603] border border-gray-900/50 hover:border-green-900/60 p-6 flex flex-col justify-between hover:bg-green-500/3 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 font-black text-gray-950 group-hover:text-gray-900 transition-colors select-none leading-none p-2 text-5xl" style={{fontFamily:"'Orbitron',monospace"}}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  <p className="tracking-[0.3em] group-hover:text-green-600 transition-colors" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#374151'}}>{s.label}</p>
                  <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors mt-2" style={{fontFamily:"'Syne',sans-serif"}}>{s.sub}</p>
                  <span className="mt-4 tracking-widest text-green-600/0 group-hover:text-green-400/60 transition-colors" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px'}}>OPEN →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-green-900/30 px-6 md:px-16 py-8">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <span style={{fontFamily:"'Orbitron',monospace",fontSize:'11px',color:'#1a2e1a',letterSpacing:'0.3em'}}>
            © {new Date().getFullYear()} GSS_SURYA.exe
          </span>
          <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#1a2e1a',letterSpacing:'0.2em'}}>
            BUILT_WITH // REACT · TYPESCRIPT · TAILWIND
          </span>
          <div className="flex items-center gap-2" style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#14532d'}}>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            ALL_SYSTEMS_OPERATIONAL
          </div>
        </div>
      </footer>

      <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
        className="fixed bottom-8 right-8 z-40 border border-green-900/60 bg-[#030603] px-3 py-2 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 group"
        style={{fontFamily:"'Share Tech Mono',monospace",fontSize:'10px',color:'#4ade80',letterSpacing:'0.3em'}}>
        <span className="group-hover:-translate-y-0.5 inline-block transition-transform duration-200">↑ TOP</span>
      </button>
    </div>
  );
}

export default App;
