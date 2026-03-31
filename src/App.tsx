import React, { useState, useEffect, useRef } from 'react';
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript, SiReact,
  SiNodedotjs, SiGit, SiGithub, SiMongodb, SiHtml5, SiCss,
  SiTailwindcss, SiExpress, SiFirebase
} from "react-icons/si";

interface Skill { name: string; icon: React.ReactNode; color: string; }
interface Project {
  title: string; description: string; icon: React.ReactNode;
  tags: string[]; liveUrl?: string; repoUrl?: string;
}
interface Experience {
  title: string; company: string; period: string; type: string;
  description: string[]; technologies: string[];
}

// ── Syntax token colours (One Dark Pro) ──────────────────────────────────────
const tk = {
  keyword:  '#c678dd',
  fn:       '#61afef',
  string:   '#98c379',
  number:   '#d19a66',
  comment:  '#5c6370',
  type:     '#e5c07b',
  var:      '#e06c75',
  plain:    '#abb2bf',
  white:    '#e8eaf0',
  bracket:  '#ffd700',
};

// ── Tiny syntax token components ──────────────────────────────────────────────
const Kw  = ({c}:{c:string}) => <span style={{color:tk.keyword}}>{c}</span>;
const Fn  = ({c}:{c:string}) => <span style={{color:tk.fn}}>{c}</span>;
const Str = ({c}:{c:string}) => <span style={{color:tk.string}}>"{c}"</span>;
const Num = ({c}:{c:string}) => <span style={{color:tk.number}}>{c}</span>;
const Cmt = ({c}:{c:string}) => <span style={{color:tk.comment}}># {c}</span>;
const Ty  = ({c}:{c:string}) => <span style={{color:tk.type}}>{c}</span>;
const Vr  = ({c}:{c:string}) => <span style={{color:tk.var}}>{c}</span>;
const Pl  = ({c}:{c:string}) => <span style={{color:tk.plain}}>{c}</span>;
const Br  = ({c}:{c:string}) => <span style={{color:tk.bracket}}>{c}</span>;

// ── Auto-incrementing line counter ────────────────────────────────────────────
let _ln = 1;
const resetLn = () => { _ln = 1; };

const Line: React.FC<{children?: React.ReactNode; indent?: number; blank?: boolean}> =
  ({ children, indent = 0, blank }) => {
  const n = _ln++;
  return (
    <div className="flex group min-h-[1.65em] hover:bg-white/[0.025] transition-colors">
      <span className="select-none w-12 text-right pr-4 text-[12px] shrink-0 leading-[1.65em]" style={{color:tk.comment}}>{n}</span>
      {blank ? null : (
        <span className="text-[13px] leading-[1.65em]" style={{paddingLeft: indent * 16}}>
          {children}
        </span>
      )}
    </div>
  );
};

// ── File tab ──────────────────────────────────────────────────────────────────
const Tab: React.FC<{label:string; ext:string; active:boolean; onClick:()=>void}> =
  ({label, ext, active, onClick}) => {
  const dotColor: Record<string,string> = {
    py:'#3776AB', tsx:'#61DAFB', json:'#d19a66', md:'#7aa2f7', cpp:'#00599C', txt:tk.comment
  };
  return (
    <div onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-[12px] cursor-pointer select-none border-r border-[#252526] shrink-0 transition-colors duration-100"
      style={{
        background: active ? '#1e1e1e' : '#2d2d2d',
        color: active ? tk.white : tk.comment,
        borderTop: active ? '1px solid #007acc' : '1px solid transparent',
      }}>
      <span className="w-2 h-2 rounded-sm shrink-0" style={{background: dotColor[ext] ?? tk.comment}} />
      {label}
    </div>
  );
};

// ── Sidebar tree item ─────────────────────────────────────────────────────────
const TreeItem: React.FC<{name:string; ext?:string; indent?:number; active?:boolean; onClick:()=>void; isFolder?:boolean; open?:boolean}> =
  ({name, ext, indent=0, active, onClick, isFolder, open}) => {
  const dotColor: Record<string,string> = {
    py:'#3776AB', tsx:'#61DAFB', json:'#d19a66', md:'#7aa2f7', cpp:'#00599C', txt:tk.comment
  };
  const icons: Record<string,string> = {
    py:'🐍', tsx:'⚛', json:'{}', md:'📄', cpp:'⚙', txt:'📝'
  };
  return (
    <div onClick={onClick}
      className="flex items-center gap-1.5 py-[3px] cursor-pointer text-[12px] select-none transition-colors"
      style={{
        paddingLeft: 8 + indent * 14,
        background: active ? '#094771' : 'transparent',
        color: active ? tk.white : isFolder ? tk.type : tk.plain,
      }}
      onMouseEnter={e=>{if(!active)(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,0.04)'}}
      onMouseLeave={e=>{if(!active)(e.currentTarget as HTMLDivElement).style.background='transparent'}}>
      {isFolder
        ? <span className="text-[10px]" style={{color:tk.type}}>{open ? '▾' : '▸'}</span>
        : <span className="text-[10px]">{icons[ext??'txt']}</span>
      }
      <span>{name}</span>
      {active && !isFolder && <span className="ml-auto pr-2 text-[8px]" style={{color:'#007acc'}}>●</span>}
    </div>
  );
};

// ── Minimap ───────────────────────────────────────────────────────────────────
const Minimap: React.FC = () => (
  <div className="w-16 shrink-0 border-l overflow-hidden relative hidden xl:block" style={{background:'#1e1e1e', borderColor:'#2d2d2d'}}>
    <div className="absolute inset-0 p-1 space-y-[2px] opacity-30">
      {Array.from({length:70}).map((_,i) => (
        <div key={i} className="h-[2px] rounded-full" style={{
          background: i%9===0?tk.keyword: i%7===0?tk.fn: i%5===0?tk.string: i%3===0?tk.type: tk.comment,
          width:`${25+Math.sin(i*0.5)*22+Math.cos(i*0.9)*12}%`,
        }} />
      ))}
    </div>
    <div className="absolute inset-x-0 top-0 h-[30%] border border-white/5 bg-white/[0.04]" />
  </div>
);

// ── Status bar ────────────────────────────────────────────────────────────────
const StatusBar: React.FC<{section:string}> = ({section}) => {
  const lang: Record<string,string> = {
    home:'Python', about:'Markdown', skills:'TypeScript React', experience:'C++', projects:'JSON', contact:'Plain Text'
  };
  return (
    <div className="flex items-center justify-between px-3 py-[3px] text-[11px] shrink-0 select-none"
      style={{background:'#007acc', color:'white', fontFamily:"'Fira Code',monospace"}}>
      <div className="flex items-center gap-4">
        <span>⎇ main</span>
        <span>✓ 0 errors  ⚠ 1 warning</span>
      </div>
      <div className="flex items-center gap-4 opacity-90">
        <span>{lang[section] ?? 'Text'}</span>
        <span>UTF-8</span>
        <span>Spaces: 2</span>
        <span>Prettier</span>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '> surya@portfolio ~ v1.0.0',
    '> Type "help" for commands',
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const sections = ['home','about','skills','experience','projects','contact'];
  const fileMap: Record<string,{name:string; ext:string}> = {
    home:       {name:'about_me.py',    ext:'py'},
    about:      {name:'bio.md',         ext:'md'},
    skills:     {name:'tech_stack.tsx', ext:'tsx'},
    experience: {name:'experience.cpp', ext:'cpp'},
    projects:   {name:'projects.json',  ext:'json'},
    contact:    {name:'contact.txt',    ext:'txt'},
  };

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
      { name:"Python",     icon:<SiPython color="#3776AB" size={24}/>,     color:"#3776AB" },
      { name:"JavaScript", icon:<SiJavascript color="#F7DF1E" size={24}/>, color:"#F7DF1E" },
      { name:"React",      icon:<SiReact color="#61DAFB" size={24}/>,      color:"#61DAFB" },
      { name:"RASA",       icon:<img src="/rasa.jpg" alt="RASA" className="w-6 h-6"/>, color:"#5b21b6" },
      { name:"Node.js",    icon:<SiNodedotjs color="#339933" size={24}/>,  color:"#339933" },
      { name:"Express",    icon:<SiExpress color="#abb2bf" size={24}/>,    color:"#abb2bf" },
      { name:"MongoDB",    icon:<SiMongodb color="#47A248" size={24}/>,    color:"#47A248" },
      { name:"MySQL",      icon:<SiMysql color="#4479A1" size={24}/>,      color:"#4479A1" },
      { name:"HTML5",      icon:<SiHtml5 color="#E34F26" size={24}/>,      color:"#E34F26" },
      { name:"CSS3",       icon:<SiCss color="#1572B6" size={24}/>,        color:"#1572B6" },
      { name:"Tailwind",   icon:<SiTailwindcss color="#06B6D4" size={24}/>,color:"#06B6D4" },
      { name:"C++",        icon:<SiCplusplus color="#00599C" size={24}/>,  color:"#00599C" },
      { name:"C",          icon:<SiC color="#00599C" size={24}/>,          color:"#00599C" },
      { name:"Git",        icon:<SiGit color="#F05032" size={24}/>,        color:"#F05032" },
      { name:"GitHub",     icon:<SiGithub color="#abb2bf" size={24}/>,     color:"#abb2bf" },
      { name:"Firebase",   icon:<SiFirebase color="#FFCA28" size={24}/>,   color:"#FFCA28" },
    ] as Skill[],
    experiences: [
      {
        title:"Computer Science Engineering Student", company:"PES University",
        period:"2023 - Present", type:"Education",
        description:["Currently pursuing B.Tech in CSE at PES University, maintaining a CGPA of 8.73 through 5th semester. Honored with Prof. CNR Scholarship for 1st, 3rd, 4th semesters (top 20%). Actively participate in campus clubs."],
        technologies:["React","Node.js","Express","MongoDB","JavaScript","Git","AWS"]
      },
      {
        title:"Research Intern", company:"Center of Computer Networks and CyberSecurity (CCNCS)",
        period:"June 2025 - July 2025", type:"Summer Internship",
        description:["Developed an intelligent SDN management system integrating ONOS distributed controller cluster with Mininet and a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection via REST APIs."],
        technologies:["SDN","RASA","ONOS","Mininet","Atomix","Python"]
      },
      {
        title:"Logistics Head", company:"Equinox - The Space Club, PESU ECC",
        period:"May 2025 - Present", type:"Club domain head",
        description:["Oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and activities."],
        technologies:[]
      },
      {
        title:"SMCC Head", company:"Equinox - The Space Club, PESU ECC",
        period:"Sep 2024 - May 2025", type:"Club domain head",
        description:["Handled digital outreach by designing engaging posts, managing social media campaigns, and creating content to promote events."],
        technologies:[]
      }
    ] as Experience[],
    projects: [
      {
        title:"RASA-Driven SDN Tool",
        description:"RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><circle cx="12" cy="5" r="2" stroke="#61afef" strokeWidth="1.8"/><circle cx="5" cy="19" r="2" stroke="#61afef" strokeWidth="1.8"/><circle cx="19" cy="19" r="2" stroke="#61afef" strokeWidth="1.8"/><path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#61afef" strokeWidth="1.8" strokeLinecap="round"/></svg>,
        tags:["ONOS","Atomix","Mininet","RASA","Python","REST APIs"],
        repoUrl:"https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot",
      },
      {
        title:"Distributed Image Processing Pipeline",
        description:"Distributed image processing using Apache Kafka for async communication between FastAPI master node and multiple PIL-based worker nodes with real-time heartbeat monitoring.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><rect x="9" y="9" width="6" height="6" rx="1" stroke="#98c379" strokeWidth="1.8"/><rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#98c379" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="9" stroke="#98c379" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#98c379" strokeWidth="1.5"/><line x1="6" y1="12" x2="9" y2="12" stroke="#98c379" strokeWidth="1.5" strokeLinecap="round"/><rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#98c379" strokeWidth="1.5"/><line x1="18" y1="12" x2="15" y2="12" stroke="#98c379" strokeWidth="1.5" strokeLinecap="round"/></svg>,
        tags:["Apache Kafka","FastAPI","Python","Pillow","Docker"],
        repoUrl:"https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline",
      },
      {
        title:"GitHub Repository Tracker",
        description:"Interactive dashboard for tracking GitHub repositories, users, commits, and issues with real-time stats, live search, and Node.js API backend.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="#c678dd" strokeWidth="1.2" fill="none"/></svg>,
        tags:["HTML","CSS","JavaScript","Node.js","Python","GitHub API"],
        repoUrl:"https://github.com/GSuryaP/Github-Repository-Tracker",
      },
      {
        title:"Personal Finance Analytics Dashboard",
        description:"FinTech dashboard with React & Tailwind for real-time transaction management. Full CRUD, Recharts visualizations, dark/light mode, savings rate metrics.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><rect x="3" y="12" width="3" height="9" rx="1" stroke="#d19a66" strokeWidth="1.8"/><rect x="8" y="8" width="3" height="13" rx="1" stroke="#d19a66" strokeWidth="1.8"/><rect x="13" y="5" width="3" height="16" rx="1" stroke="#d19a66" strokeWidth="1.8"/><rect x="18" y="9" width="3" height="12" rx="1" stroke="#d19a66" strokeWidth="1.8"/></svg>,
        tags:["React","Vite","Tailwind CSS","Recharts","JavaScript"],
        repoUrl:"https://github.com/GSuryaP/Personal-Finance-Dashboard",
      },
      {
        title:"AdaptiveLearn AI",
        description:"AI-powered teacher analytics on AWS free-tier. S3 CSV ingestion via Python Lambda, Amazon Bedrock (Titan) for LLM insights, HTML frontend.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#e5c07b" strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 14.5h4" stroke="#e5c07b" strokeWidth="1.5" strokeLinecap="round"/></svg>,
        tags:["AWS S3","AWS Lambda","Amazon Bedrock","Python"],
        repoUrl:"https://github.com/GSuryaP/AdaptiveLearn-AI",
      },
      {
        title:"Weather & AQI Tracker",
        description:"Tkinter-based app using OpenWeatherMap API to display comprehensive weather and Air Quality Index data with a clean GUI and robust error handling.",
        icon:<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><circle cx="12" cy="10" r="4" stroke="#61afef" strokeWidth="2"/><path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22" stroke="#61afef" strokeWidth="2" strokeLinecap="round"/></svg>,
        tags:["Python","Tkinter","OpenWeatherMap API","JSON"],
        repoUrl:"https://github.com/GSuryaP/Weather-AQI_Tracker",
      },
    ] as Project[],
  };

  // terminal
  const handleTerminalCmd = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let r = '';
    if(c==='help') r='Commands: help | whoami | skills | contact | clear | open <section>';
    else if(c==='whoami') r=`${portfolioData.name} — CSE @ PES University`;
    else if(c==='skills') r=portfolioData.skills.map(s=>s.name).join(' · ');
    else if(c==='contact') r=`Email: ${portfolioData.contactEmail}  GitHub: GSuryaP`;
    else if(c==='clear'){setTerminalHistory([]);return;}
    else if(c.startsWith('open ')){
      const s=c.replace('open ','');
      if(sections.includes(s)){setActiveSection(s);r=`Opened ${fileMap[s].name}`;}
      else r=`Not found. Try: ${sections.join(', ')}`;
    } else r=`Command not found: "${cmd}". Type "help".`;
    setTerminalHistory(h=>[...h,`$ ${cmd}`,r]);
  };

  useEffect(()=>{
    if(terminalRef.current) terminalRef.current.scrollTop=terminalRef.current.scrollHeight;
  },[terminalHistory, terminalOpen]);

  // ── Render file content ────────────────────────────────────────────────────
  const renderContent = () => {
    resetLn();
    const f = fileMap[activeSection];

    if(activeSection === 'home') return (
      <div>
        <Line><Cmt c="about_me.py — Gonella Siva Sai Surya Prakash" /></Line>
        <Line blank/>
        <Line><Kw c="from"/><Pl c=" university "/><Kw c="import"/><Pl c=" "/><Ty c="PESUniversity"/></Line>
        <Line><Kw c="from"/><Pl c=" skills "/><Kw c="import"/><Pl c=" "/><Ty c="FullStack"/><Pl c=", "/><Ty c="AI"/><Pl c=", "/><Ty c="Cloud"/></Line>
        <Line blank/>
        <Line><Kw c="class"/><Pl c=" "/><Ty c="Developer"/><Br c="(PESUniversity):"/></Line>
        <Line indent={1}><Cmt c="Portfolio entry point — who I am" /></Line>
        <Line indent={1}><Fn c="def"/><Pl c=" "/><span style={{color:tk.fn}}>__init__</span><Br c="(self):"/></Line>

        {/* Profile card embedded as a "value" */}
        <div className="flex items-start my-1.5">
          <span className="select-none w-12 text-right pr-4 shrink-0 text-[12px] leading-[1.65em]" style={{color:tk.comment}}>{_ln++}</span>
          <span className="text-[13px] leading-[1.65em]" style={{paddingLeft:32}}>
            <Pl c="self."/><Vr c="profile_card"/><Pl c=" = "/>
          </span>
          <div className="ml-2 flex items-center gap-5 rounded border border-[#3d3d3d] bg-[#252526] px-5 py-3 my-0.5 hover:border-[#007acc] transition-colors">
            <div className="relative w-[72px] h-[72px] shrink-0">
              <div className="absolute inset-0 rounded-full" style={{background:'conic-gradient(from 0deg, #007acc, #c678dd, #98c379, #007acc)', padding:'2px'}}>
                <div className="w-full h-full rounded-full" style={{background:'#252526'}}/>
              </div>
              <img src="/profile.png" alt="Surya"
                className="absolute inset-[3px] rounded-full object-cover"
                style={{width:'calc(100% - 6px)', height:'calc(100% - 6px)'}}
                onError={e=>{(e.target as HTMLImageElement).src='https://placehold.co/72x72/252526/61afef?text=S';}}/>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#252526]"/>
            </div>
            <div>
              <div className="font-semibold text-[13px]" style={{color:tk.white}}>{portfolioData.name}</div>
              <div className="text-[11px] mt-0.5" style={{color:tk.comment}}>CSE @ PES University · Bengaluru</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-[10px]" style={{color:'#98c379'}}>Open to Opportunities</span>
              </div>
              <div className="flex gap-2 mt-2">
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer"
                  className="text-[10px] px-2 py-0.5 rounded hover:brightness-110 transition-all" style={{background:'#3d3d3d',color:tk.plain}}>GitHub</a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer"
                  className="text-[10px] px-2 py-0.5 rounded hover:brightness-110 transition-all" style={{background:'#0a66c2',color:'white'}}>LinkedIn</a>
                <a href={portfolioData.resumeUrl} download
                  className="text-[10px] px-2 py-0.5 rounded hover:brightness-110 transition-all" style={{background:'#007acc',color:'white'}}>Resume ↓</a>
              </div>
            </div>
          </div>
        </div>

        <Line indent={2}><Pl c="self."/><Vr c="name"/><Pl c="        = "/><Str c={portfolioData.name}/></Line>
        <Line indent={2}><Pl c="self."/><Vr c="role"/><Pl c="        = "/><Str c="CSE Undergrad & AI Enthusiast"/></Line>
        <Line indent={2}><Pl c="self."/><Vr c="university"/><Pl c="   = "/><Str c="PES University, Bengaluru"/></Line>
        <Line indent={2}><Pl c="self."/><Vr c="cgpa"/><Pl c="        = "/><Num c="8.73"/></Line>
        <Line indent={2}><Pl c="self."/><Vr c="email"/><Pl c="       = "/><Str c={portfolioData.contactEmail}/></Line>
        <Line indent={2}><Pl c="self."/><Vr c="location"/><Pl c="    = "/><Str c={portfolioData.location}/></Line>
        <Line blank/>
        <Line indent={2}><Pl c="self."/><Vr c="interests"/><Pl c="   = ["/></Line>
        {["Full-Stack Development","Artificial Intelligence","Cloud Computing","Open Source"].map((v,i)=>(
          <Line key={i} indent={3}><Str c={v}/><Pl c=","/></Line>
        ))}
        <Line indent={2}><Pl c="]"/></Line>
        <Line blank/>
        <Line indent={1}><Fn c="def"/><Pl c=" "/><span style={{color:tk.fn}}>get_stats</span><Br c="(self)"/><Pl c=" -> "/><Ty c="dict"/><Br c=":"/></Line>
        <Line indent={2}><Kw c="return"/><Pl c=" "/><Br c="{"/></Line>
        <Line indent={3}><Str c="cgpa"/><Pl c=": "/><Num c="8.73"/><Pl c=",  "/></Line>
        <Line indent={3}><Str c="projects"/><Pl c=": "/><Num c="6"/><Pl c=",   "/></Line>
        <Line indent={3}><Str c="internships"/><Pl c=": "/><Num c="1"/><Pl c=","/></Line>
        <Line indent={3}><Str c="scholarship"/><Pl c=": "/><Kw c="True"/></Line>
        <Line indent={2}><Br c="}"/></Line>
        <Line blank/>
        <Line><Cmt c="─── main ───────────────────────────────" /></Line>
        <Line><Pl c="me "/><Pl c="= "/><Ty c="Developer"/><Br c="()"/></Line>
        <Line><Fn c="print"/><Br c="("/><Pl c="me."/><Vr c="name"/><Pl c=', '/><Str c="is ready to build 🚀"/><Br c=")"/></Line>
        <Line blank/><Line blank/>
      </div>
    );

    if(activeSection === 'about') return (
      <div>
        <Line><span style={{color:'#7aa2f7',fontSize:17,fontWeight:'bold'}}># About Me</span></Line>
        <Line blank/>
        <Line><span style={{color:tk.plain,fontStyle:'italic'}}>{portfolioData.tagline}</span></Line>
        <Line blank/>
        <Line><span style={{color:'#7aa2f7',fontWeight:'bold'}}>## Biography</span></Line>
        <Line blank/>
        {portfolioData.bio.match(/[^.!?]+[.!?]+/g)?.map((sentence,i)=>(
          <Line key={i}><span style={{color:tk.plain}}>{sentence.trim()}</span></Line>
        ))}
        <Line blank/>
        <Line><span style={{color:'#7aa2f7',fontWeight:'bold'}}>## Quick Stats</span></Line>
        <Line blank/>
        <Line><span style={{color:tk.comment}}>| Metric       | Value         |</span></Line>
        <Line><span style={{color:tk.comment}}>|:-------------|:--------------|</span></Line>
        {[
          ['CGPA','8.73'],['Projects','6+'],['Internships','1'],['Clubs','2+'],['Scholarship','✓ Yes']
        ].map(([k,v],i)=>(
          <Line key={i}>
            <span style={{color:tk.plain}}>| </span>
            <span style={{color:'#7aa2f7'}}>{k.padEnd(12)}</span>
            <span style={{color:tk.plain}}>| </span>
            <span style={{color: k==='Scholarship'?tk.string:tk.number}}>{v.padEnd(13)}</span>
            <span style={{color:tk.plain}}>|</span>
          </Line>
        ))}
        <Line blank/>
        <Line><span style={{color:'#7aa2f7',fontWeight:'bold'}}>## Contact</span></Line>
        <Line blank/>
        <Line><span style={{color:tk.plain}}>- 🐙 </span><a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="underline" style={{color:'#61afef'}}>github.com/GSuryaP</a></Line>
        <Line><span style={{color:tk.plain}}>- 💼 </span><a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="underline" style={{color:'#61afef'}}>linkedin.com/in/g-s-s-surya-prakash</a></Line>
        <Line><span style={{color:tk.plain}}>- 📧 </span><a href={`mailto:${portfolioData.contactEmail}`} className="underline" style={{color:'#61afef'}}>{portfolioData.contactEmail}</a></Line>
        <Line blank/><Line blank/>
      </div>
    );

    if(activeSection === 'skills') return (
      <div>
        <Line><Cmt c="tech_stack.tsx — Technology overview" /></Line>
        <Line blank/>
        <Line><Kw c="import"/><Pl c=" type "/><Br c="{"/><Ty c=" Skill "/><Br c="}"/><Kw c=" from"/><Pl c=" "/><Str c="./types"/></Line>
        <Line blank/>
        <Line><Kw c="const"/><Pl c=" "/><Vr c="techStack"/><Pl c=": "/><Ty c="Skill"/><Pl c="[] = ["/></Line>
        {portfolioData.skills.map((s,i)=>(
          <Line key={i} indent={1}><Br c="{"/><Pl c=" name: "/><Str c={s.name}/><Pl c=", proficiency: "/><Num c={`${72+(i*7)%25}`}/><Pl c="%"/><Pl c=" "/><Br c="}"/><Pl c={i<portfolioData.skills.length-1?',':''}/></Line>
        ))}
        <Line><Pl c="]"/></Line>
        <Line blank/>

        {/* Visual skill grid */}
        <div className="flex my-2">
          <span className="select-none w-12 text-right pr-4 shrink-0 text-[12px] leading-[1.65em]" style={{color:tk.comment}}>{_ln++}</span>
          <div className="flex-1 my-2 mr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {portfolioData.skills.map((skill,i)=>(
                <div key={i}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded border border-[#3d3d3d] bg-[#252526] cursor-default transition-all duration-150 hover:border-[#007acc] hover:bg-[#1e3045]">
                  <div className="shrink-0">{skill.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium truncate" style={{color:tk.white}}>{skill.name}</div>
                    <div className="mt-1 h-[3px] rounded-full bg-[#3d3d3d] overflow-hidden">
                      <div className="h-full rounded-full" style={{width:`${72+(i*7)%25}%`, background:skill.color, transition:'width 0.5s ease'}}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Line><Kw c="export default"/><Pl c=" "/><Vr c="techStack"/></Line>
        <Line blank/><Line blank/>
      </div>
    );

    if(activeSection === 'experience') return (
      <div>
        <Line><Cmt c="experience.cpp — Education & Work History" /></Line>
        <Line blank/>
        <Line><span style={{color:tk.keyword}}>#include</span><span style={{color:tk.string}}> &lt;career.h&gt;</span></Line>
        <Line><span style={{color:tk.keyword}}>#include</span><span style={{color:tk.string}}> &lt;education.h&gt;</span></Line>
        <Line blank/>
        {portfolioData.experiences.map((exp,idx)=>(
          <React.Fragment key={idx}>
            <Line><Cmt c={`─── [${idx+1}/${portfolioData.experiences.length}] ${exp.type} ───`}/></Line>
            <Line><Ty c="struct"/><Pl c=" "/><Fn c={exp.title.replace(/[\s\W]+/g,'_').slice(0,25)}/><Pl c=" "/><Br c="{"/></Line>
            <Line indent={1}><Ty c="string"/><Pl c=" company  = "/><Str c={exp.company}/><Pl c=";"/></Line>
            <Line indent={1}><Ty c="string"/><Pl c=" title    = "/><Str c={exp.title}/><Pl c=";"/></Line>
            <Line indent={1}><Ty c="string"/><Pl c=" period   = "/><Str c={exp.period}/><Pl c=";"/></Line>

            {/* Visual card */}
            <div className="flex my-1.5">
              <span className="select-none w-12 text-right pr-4 shrink-0 text-[12px] leading-[1.65em]" style={{color:tk.comment}}>{_ln++}</span>
              <div className="flex-1 mx-2 border border-[#3d3d3d] bg-[#252526] rounded p-4 hover:border-[#007acc] transition-colors group mr-4">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="font-semibold text-[13px]" style={{color:tk.white}}>{exp.title}</div>
                    <div className="text-[11px] mt-0.5" style={{color:'#61afef'}}>{exp.company}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{background:'#3d3d3d',color:tk.comment}}>{exp.period}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{background:'#007acc22',color:'#61afef',border:'1px solid #007acc33'}}>{exp.type}</span>
                  </div>
                </div>
                {exp.description.map((d,j)=>(
                  <p key={j} className="text-[11px] leading-relaxed" style={{color:tk.comment}}>
                    <span style={{color:tk.string}}>// </span>{d}
                  </p>
                ))}
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-[#3d3d3d]">
                    {exp.technologies.map((t2,j)=>(
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{background:'#1e1e1e',color:tk.plain,border:'1px solid #3d3d3d'}}>{t2}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Line><Br c="};"/></Line>
            <Line blank/>
          </React.Fragment>
        ))}
        <Line blank/>
      </div>
    );

    if(activeSection === 'projects') return (
      <div>
        <Line><Cmt c="projects.json — Featured work" /></Line>
        <Line><Br c="{"/></Line>
        <Line indent={1}><Str c="author"/><Pl c=": "/><Str c="GSuryaP"/><Pl c=","/></Line>
        <Line indent={1}><Str c="count"/><Pl c=": "/><Num c={`${portfolioData.projects.length}`}/><Pl c=","/></Line>
        <Line indent={1}><Str c="projects"/><Pl c=": ["/></Line>
        {portfolioData.projects.map((proj,i)=>(
          <React.Fragment key={i}>
            <Line indent={2}><Br c="{"/></Line>
            {/* Visual card */}
            <div className="flex my-1">
              <span className="select-none w-12 text-right pr-4 shrink-0 text-[12px] leading-[1.65em]" style={{color:tk.comment}}>{_ln++}</span>
              <div className="flex-1 mx-2 mr-4 border border-[#3d3d3d] bg-[#252526] rounded hover:border-[#007acc] transition-all duration-150 group overflow-hidden">
                <div className="flex items-start gap-3 p-3">
                  <div className="shrink-0 p-2 rounded" style={{background:'#1e1e1e'}}>{proj.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-[13px] group-hover:text-[#61afef] transition-colors" style={{color:tk.white}}>{proj.title}</div>
                      <div className="flex gap-1.5 shrink-0">
                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-0.5 rounded hover:brightness-110" style={{background:'#007acc',color:'white'}}>Live</a>}
                        {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-0.5 rounded hover:brightness-110" style={{background:'#3d3d3d',color:tk.plain}}>→ Repo</a>}
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed mt-1" style={{color:tk.comment}}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.tags.map((tag,j)=>(
                        <span key={j} className="text-[10px] px-1.5 py-0.5 rounded" style={{background:'#1e1e1e',color:tk.string,border:'1px solid #3d3d3d'}}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Line indent={3}><Str c="title"/><Pl c=": "/><Str c={proj.title}/><Pl c=","/></Line>
            <Line indent={3}><Str c="repo"/><Pl c=":  "/><Str c={proj.repoUrl??''}/></Line>
            <Line indent={2}><Br c={i<portfolioData.projects.length-1?"},":'}'}/></Line>
            <Line blank/>
          </React.Fragment>
        ))}
        <Line indent={1}><Pl c="]"/></Line>
        <Line><Br c="}"/></Line>
        <Line blank/><Line blank/>
      </div>
    );

    if(activeSection === 'contact') return (
      <div>
        <Line><Cmt c="contact.txt — Let's work together!" /></Line>
        <Line blank/>
        <Line><span style={{color:tk.type,fontWeight:'bold'}}>CONTACT INFORMATION</span></Line>
        <Line><span style={{color:tk.comment}}>{'═'.repeat(55)}</span></Line>
        <Line blank/>
        <Line><Pl c="Name     :  "/><span style={{color:tk.white}}>{portfolioData.name}</span></Line>
        <Line><Pl c="Email    :  "/><a href={`mailto:${portfolioData.contactEmail}`} className="underline" style={{color:'#61afef'}}>{portfolioData.contactEmail}</a></Line>
        <Line><Pl c="Phone    :  "/><span style={{color:tk.string}}>{portfolioData.phone}</span></Line>
        <Line><Pl c="Location :  "/><span style={{color:tk.string}}>{portfolioData.location}</span></Line>
        <Line><Pl c="Status   :  "/><span style={{color:'#98c379'}}>● Open to Opportunities</span></Line>
        <Line blank/>
        <Line><span style={{color:tk.comment}}>{'─'.repeat(55)}</span></Line>
        <Line blank/>
        <Line><span style={{color:tk.type,fontWeight:'bold'}}>SOCIAL LINKS</span></Line>
        <Line blank/>
        <Line><Pl c="GitHub   :  "/><a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="underline" style={{color:'#61afef'}}>{portfolioData.socials.github}</a></Line>
        <Line><Pl c="LinkedIn :  "/><a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="underline" style={{color:'#61afef'}}>{portfolioData.socials.linkedin}</a></Line>
        <Line blank/>

        {/* Visual contact buttons */}
        <div className="flex my-2">
          <span className="select-none w-12 text-right pr-4 shrink-0 text-[12px] leading-[1.65em]" style={{color:tk.comment}}>{_ln++}</span>
          <div className="mx-2 mr-4">
            <div className="border border-[#3d3d3d] rounded bg-[#252526] p-4 max-w-sm">
              <div className="text-[11px] mb-3" style={{color:tk.comment}}><span style={{color:tk.string}}>// </span>Quick links</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {label:'GitHub',    href:portfolioData.socials.github,        bg:'#3d3d3d', color:tk.white},
                  {label:'LinkedIn',  href:portfolioData.socials.linkedin,      bg:'#0a66c2', color:'white'},
                  {label:'Email',     href:`mailto:${portfolioData.contactEmail}`, bg:'#007acc', color:'white'},
                  {label:'Resume ↓',  href:portfolioData.resumeUrl,             bg:'#2d5016', color:'#98c379'},
                ].map((l,i)=>(
                  <a key={i} href={l.href} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded text-[12px] font-medium hover:brightness-110 transition-all"
                    style={{background:l.bg, color:l.color}}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Line blank/>
        <Line><Cmt c="Don't hesitate to reach out — I'm always excited to collaborate!" /></Line>
        <Line blank/><Line blank/>
      </div>
    );

    return null;
  };

  const f = fileMap[activeSection];

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden"
      style={{background:'#1e1e1e', fontFamily:"'Fira Code','Cascadia Code','Consolas',monospace"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:8px; height:8px; }
        ::-webkit-scrollbar-track { background:#1e1e1e; }
        ::-webkit-scrollbar-thumb { background:#424242; border-radius:4px; }
        ::-webkit-scrollbar-thumb:hover { background:#555; }
        .blink::after { content:'|'; animation:blink 1s step-end infinite; color:#aeafad; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .fade-in { animation:fadeIn 0.18s ease forwards; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:none} }
        a { text-decoration-color: #007acc55; }
        a:hover { text-decoration-color: #007acc; }
      `}</style>

      {/* TITLE BAR */}
      <div className="flex items-center h-8 shrink-0 px-3 gap-3 select-none" style={{background:'#323233'}}>
        <div className="flex items-center gap-1.5">
          {[['#ff5f57','Close'],['#febc2e','Min'],['#28c840','Max']].map(([bg,title])=>(
            <div key={title} title={title} className="w-3 h-3 rounded-full cursor-pointer hover:brightness-125 transition-filter" style={{background:bg}}/>
          ))}
        </div>
        <div className="flex-1 text-center text-[12px]" style={{color:tk.comment}}>
          {f.name} — portfolio — Visual Studio Code
        </div>
        <div className="w-16"/>
      </div>

      {/* TAB BAR */}
      <div className="flex overflow-x-auto shrink-0 select-none border-b" style={{background:'#2d2d2d',borderColor:'#252526'}}>
        {sections.map(s=>(
          <Tab key={s} label={fileMap[s].name} ext={fileMap[s].ext} active={activeSection===s} onClick={()=>setActiveSection(s)}/>
        ))}
        <div className="flex-1" style={{background:'#2d2d2d'}}/>
      </div>

      {/* BREADCRUMB */}
      <div className="flex items-center px-3 py-1 text-[11px] gap-1 shrink-0 border-b select-none" style={{background:'#1e1e1e',borderColor:'#2d2d2d',color:tk.comment}}>
        <span>portfolio</span><span>›</span><span>src</span><span>›</span>
        <span style={{color:f.ext==='py'?'#3776AB':f.ext==='tsx'?'#61DAFB':f.ext==='json'?'#d19a66':f.ext==='cpp'?'#00599C':'#7aa2f7'}}>{f.name}</span>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* ACTIVITY BAR */}
        <div className="flex flex-col items-center py-2 gap-1 shrink-0 w-12 border-r select-none" style={{background:'#333333',borderColor:'#2d2d2d'}}>
          {[
            {icon:'📁', tip:'Explorer',   key:'explorer'},
            {icon:'🔍', tip:'Search',     key:'search'},
            {icon:'⎇',  tip:'Source Ctrl',key:'git'},
            {icon:'🐛', tip:'Debug',      key:'debug'},
            {icon:'⬛', tip:'Extensions', key:'ext'},
          ].map(item=>(
            <button key={item.key}
              onClick={()=>item.key==='explorer'&&setSidebarOpen(o=>!o)}
              title={item.tip}
              className="w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-[15px]"
              style={{color: item.key==='explorer'&&sidebarOpen ? tk.white : tk.comment}}>
              {item.icon}
            </button>
          ))}
          <div className="flex-1"/>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#555] mb-1">
            <img src="/profile.png" alt="me" className="w-full h-full object-cover"
              onError={e=>{(e.target as HTMLImageElement).src='https://placehold.co/32x32/333/61afef?text=S';}}/>
          </div>
        </div>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div className="w-52 shrink-0 flex flex-col border-r overflow-y-auto select-none" style={{background:'#252526',borderColor:'#2d2d2d'}}>
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] shrink-0" style={{color:tk.comment}}>Explorer</div>
            <TreeItem name="PORTFOLIO" isFolder open onClick={()=>{}}/>
            <TreeItem name="src" isFolder open indent={1} onClick={()=>{}}/>
            {sections.map(s=>(
              <TreeItem key={s} name={fileMap[s].name} ext={fileMap[s].ext} indent={2} active={activeSection===s} onClick={()=>setActiveSection(s)}/>
            ))}
            <TreeItem name="public" isFolder indent={1} onClick={()=>{}}/>
            <TreeItem name="profile.png" ext="txt" indent={2} onClick={()=>{}}/>
            <TreeItem name="resume.pdf"  ext="txt" indent={2} onClick={()=>{}}/>
            <TreeItem name="package.json" ext="json" indent={1} onClick={()=>setActiveSection('projects')}/>
            <TreeItem name="README.md"    ext="md"   indent={1} onClick={()=>setActiveSection('about')}/>

            {/* Outline */}
            <div className="mt-3 border-t" style={{borderColor:'#3d3d3d'}}>
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{color:tk.comment}}>Outline</div>
              {['Developer','__init__','get_stats','techStack','main'].map(sym=>(
                <div key={sym} className="flex items-center gap-2 px-3 py-[3px] text-[11px] cursor-pointer transition-colors"
                  style={{color:tk.plain}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background='rgba(255,255,255,0.04)'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background='transparent'}}>
                  <span style={{color:tk.keyword}}>ƒ</span>{sym}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE AREA */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto py-3" style={{background:'#1e1e1e'}} key={activeSection}>
            <div className="fade-in min-w-max pr-4">{renderContent()}</div>
          </div>
          <Minimap/>
        </div>
      </div>

      {/* PANEL */}
      <div className="shrink-0 border-t" style={{borderColor:'#2d2d2d',background:'#1e1e1e'}}>
        <div className="flex items-center select-none" style={{background:'#252526'}}>
          {['PROBLEMS','OUTPUT','TERMINAL'].map(p=>(
            <button key={p}
              onClick={()=>{
                if(p==='TERMINAL'){setTerminalOpen(o=>!o);setProblemsOpen(false);}
                else if(p==='PROBLEMS'){setProblemsOpen(o=>!o);setTerminalOpen(false);}
                else{setTerminalOpen(false);setProblemsOpen(false);}
              }}
              className="px-4 py-1.5 text-[11px] uppercase tracking-wider transition-colors border-b-2"
              style={{
                color:(p==='TERMINAL'&&terminalOpen)||(p==='PROBLEMS'&&problemsOpen)?tk.white:tk.comment,
                borderBottomColor:(p==='TERMINAL'&&terminalOpen)||(p==='PROBLEMS'&&problemsOpen)?'#007acc':'transparent',
                fontFamily:"'Fira Code',monospace"
              }}>
              {p}
              {p==='PROBLEMS'&&<span className="ml-1.5 text-[9px] px-1 rounded" style={{background:'#98c37920',color:'#98c379'}}>1</span>}
            </button>
          ))}
          <div className="flex-1"/>
          <button onClick={()=>{setTerminalOpen(false);setProblemsOpen(false);}} className="px-3 hover:text-white transition-colors" style={{color:tk.comment}}>⌄</button>
        </div>

        {terminalOpen && (
          <div className="h-36 flex flex-col" style={{background:'#0d0d0d'}}>
            <div ref={terminalRef} className="flex-1 overflow-y-auto p-2.5 text-[12px] space-y-0.5" style={{fontFamily:"'Fira Code',monospace",color:tk.plain}}>
              {terminalHistory.map((line,i)=>(
                <div key={i} style={{color:line.startsWith('$')?'#61afef':line.startsWith('>')?'#98c379':tk.plain}}>{line}</div>
              ))}
            </div>
            <div className="flex items-center px-2.5 py-1.5 border-t" style={{borderColor:'#3d3d3d'}}>
              <span className="mr-2 text-[12px]" style={{color:'#98c379'}}>surya@portfolio:~$</span>
              <input value={terminalInput} onChange={e=>setTerminalInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&terminalInput.trim()){handleTerminalCmd(terminalInput);setTerminalInput('');}}}
                className="flex-1 bg-transparent outline-none text-[12px] blink"
                style={{color:tk.white,caretColor:'#aeafad',fontFamily:"'Fira Code',monospace"}}
                autoFocus placeholder="type a command…" spellCheck={false}/>
            </div>
          </div>
        )}

        {problemsOpen && (
          <div className="h-20 p-3" style={{background:'#1e1e1e'}}>
            <div className="flex items-center gap-2 text-[12px]">
              <span style={{color:'#98c379'}}>✓</span>
              <span style={{color:tk.comment}}>No errors. Portfolio compiles successfully.</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-[12px]">
              <span style={{color:'#e5c07b'}}>⚠</span>
              <span style={{color:tk.comment,textDecorationLine:'underline',textDecorationStyle:'wavy',textDecorationColor:'#e5c07b'}}>
                1 warning — seeking internship opportunities, open to work
              </span>
            </div>
          </div>
        )}
      </div>

      {/* STATUS BAR */}
      <StatusBar section={activeSection}/>
    </div>
  );
}

export default App;
