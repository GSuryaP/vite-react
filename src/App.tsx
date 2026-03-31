import React, { useState, useEffect, useRef } from 'react';
import {
  SiPython, SiMysql, SiC, SiCplusplus, SiJavascript,
  SiReact, SiNodedotjs, SiGit, SiGithub, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiExpress, SiFirebase
} from "react-icons/si";

interface Skill { name: string; icon: React.ReactNode; }
interface Project {
  title: string; description: string; icon: React.ReactNode;
  tags: string[]; liveUrl?: string; repoUrl?: string;
}
interface Experience {
  title: string; company: string; period: string;
  type: string; description: string[]; technologies: string[];
}

/* ── OSCILLOSCOPE WAVE ── */
const OscilloscopeWave: React.FC<{ color?: string; height?: number; speed?: number; amplitude?: number }> = ({
  color = '#7C3AED', height = 60, speed = 0.025, amplitude = 18
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let t = 0, animId: number;
    const draw = () => {
      canvas.width = canvas.offsetWidth; canvas.height = height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(124,58,237,0.07)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += 15) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
      [{ a:0.07,w:14 },{ a:0.16,w:7 },{ a:0.6,w:2 },{ a:1,w:1.2 }].forEach(layer => {
        ctx.beginPath(); ctx.strokeStyle = `rgba(${r},${g},${b},${layer.a})`; ctx.lineWidth = layer.w;
        ctx.shadowColor = color; ctx.shadowBlur = layer.w > 4 ? 8 : 0;
        for (let x = 0; x <= canvas.width; x++) {
          const y = height/2 + Math.sin((x/canvas.width)*Math.PI*8+t)*amplitude*0.6 + Math.sin((x/canvas.width)*Math.PI*3+t*0.7)*amplitude*0.4;
          x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke(); ctx.shadowBlur = 0;
      });
      t += speed; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color, height, speed, amplitude]);
  return <canvas ref={canvasRef} style={{ width:'100%', height:`${height}px`, display:'block' }} />;
};

/* ── PARTICLE FIELD ── */
const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({length:55}, () => ({
      x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      r: Math.random()*1.4+0.4,
      isV: Math.random()>0.5,
    }));
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.isV ? 'rgba(124,58,237,0.3)' : 'rgba(0,212,255,0.3)';
        ctx.fill();
      });
      pts.forEach((a,i) => pts.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x,a.y-b.y);
        if(d<110) { ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(124,58,237,${0.055*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/* ── PCB BACKGROUND ── */
const PCBBackground: React.FC = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{opacity:0.032}} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="pcb" width="200" height="200" patternUnits="userSpaceOnUse">
        <path d="M10 100 H80 V40 H140 V100 H190" fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
        <path d="M0 150 H60 V180 H120 V150 H200" fill="none" stroke="#00D4FF" strokeWidth="1"/>
        <path d="M100 0 V60 H160 V120 H100 V200" fill="none" stroke="#7C3AED" strokeWidth="0.8"/>
        <circle cx="80" cy="100" r="4" fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
        <circle cx="140" cy="40" r="3" fill="#7C3AED" opacity="0.6"/>
        <circle cx="60" cy="150" r="3" fill="#00D4FF" opacity="0.6"/>
        <circle cx="160" cy="120" r="4" fill="none" stroke="#00D4FF" strokeWidth="1"/>
        <rect x="85" y="28" width="12" height="6" rx="1" fill="none" stroke="#7C3AED" strokeWidth="0.8"/>
        <rect x="148" y="108" width="6" height="12" rx="1" fill="none" stroke="#00D4FF" strokeWidth="0.8"/>
        <rect x="38" y="160" width="10" height="5" rx="1" fill="none" stroke="#FF9500" strokeWidth="0.8"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pcb)"/>
  </svg>
);

/* ── TYPING EFFECT ── */
const useTypingEffect = (texts: string[], speed=75, pause=2000) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) { setDisplayText(current.slice(0,charIndex+1)); setCharIndex(c=>c+1); }
        else { setTimeout(()=>setIsDeleting(true), pause); }
      } else {
        if (charIndex > 0) { setDisplayText(current.slice(0,charIndex-1)); setCharIndex(c=>c-1); }
        else { setIsDeleting(false); setTextIndex(i=>(i+1)%texts.length); }
      }
    }, isDeleting ? speed/2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);
  return displayText;
};

/* ── BOOT SEQUENCE ── */
const BootSequence: React.FC = () => {
  const lines = [
    { text: 'BIOS v2.7.1 — PES University PESU-ECC', color:'#7C3AED', delay:0 },
    { text: 'Initializing CPU cores... [4/4 online]', color:'rgba(180,180,210,0.55)', delay:110 },
    { text: 'Loading kernel modules: react.ko, typescript.ko', color:'rgba(180,180,210,0.55)', delay:230 },
    { text: 'Mounting /dev/portfolio → filesystem OK', color:'#00D4FF', delay:360 },
    { text: 'Starting services: web-server, ai-engine, sdn-stack', color:'rgba(180,180,210,0.55)', delay:490 },
    { text: '[ OK ] Portfolio online — CGPA: 8.73 / 10.0', color:'#22c55e', delay:630 },
  ];
  const [visible, setVisible] = useState<number[]>([]);
  useEffect(() => {
    lines.forEach((_,i) => setTimeout(()=>setVisible(v=>[...v,i]), 200+_.delay));
  }, []);
  return (
    <div className="font-mono text-[10px] space-y-1 p-4" style={{ background:'rgba(0,0,0,0.55)', border:'1px solid rgba(124,58,237,0.2)' }}>
      {lines.map((line,i) => (
        <div key={i} className="flex items-center gap-2 transition-all duration-300"
          style={{ opacity:visible.includes(i)?1:0, transform:visible.includes(i)?'translateX(0)':'translateX(-8px)', color:line.color }}>
          <span style={{color:'rgba(124,58,237,0.45)'}}>{'>'}</span> {line.text}
        </div>
      ))}
    </div>
  );
};

/* ── HEX DUMP STAT ── */
const HexDumpStat: React.FC<{value:string; label:string; address:string}> = ({value,label,address}) => {
  const [disp, setDisp] = useState('??');
  useEffect(() => {
    let f=0; const iv=setInterval(()=>{ f++; setDisp(f<16?Math.floor(Math.random()*99).toString().padStart(2,'0'):value); if(f>=16)clearInterval(iv); },60);
    return ()=>clearInterval(iv);
  }, [value]);
  return (
    <div className="group relative overflow-hidden p-4 transition-all duration-250 hover:-translate-y-1"
      style={{ background:'linear-gradient(135deg,rgba(14,14,18,0.9),rgba(20,10,40,0.9))', border:'1px solid rgba(124,58,237,0.18)', backdropFilter:'blur(8px)' }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background:'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(0,212,255,0.04))' }} />
      <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background:'linear-gradient(90deg,transparent,#7C3AED,transparent)' }} />
      <div className="font-mono text-[8px] mb-1" style={{color:'rgba(0,212,255,0.4)'}}>/{address}</div>
      <div className="font-mono font-bold relative z-10" style={{fontSize:'1.85rem',lineHeight:1,color:'#7C3AED',textShadow:'0 0 20px rgba(124,58,237,0.45)'}}>{disp}</div>
      <div className="font-mono text-[9px] mt-1 uppercase tracking-widest relative z-10" style={{color:'rgba(180,180,200,0.38)'}}>{label}</div>
    </div>
  );
};

/* ── SECTION TITLE ── */
const SectionTitle: React.FC<{children:React.ReactNode; num:string; sub?:string; waveColor?:string}> = ({children,num,sub,waveColor='#7C3AED'}) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[9px] px-2 py-0.5" style={{color:'rgba(0,212,255,0.7)',background:'rgba(0,212,255,0.07)',border:'1px solid rgba(0,212,255,0.18)'}}>REG[{num}]</span>
      {sub && <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{color:'rgba(124,58,237,0.45)'}}>{sub}</span>}
    </div>
    <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(2.5rem,6vw,5rem)',lineHeight:'0.95',letterSpacing:'-0.03em',color:'#F0F0F8',fontWeight:800}}>
      {children}
    </h2>
    <div className="mt-4 overflow-hidden" style={{height:'44px'}}>
      <OscilloscopeWave color={waveColor} height={44} amplitude={13} speed={0.028} />
    </div>
  </div>
);

/* ── IDE WINDOW ── */
const IDEWindow: React.FC<{title?:string; lang?:string; lineStart?:number; children:React.ReactNode; className?:string}> = ({title='main.ts',lang='typescript',lineStart=1,children,className=''}) => (
  <div className={`overflow-hidden ${className}`} style={{background:'#0D0D14',border:'1px solid rgba(124,58,237,0.2)'}}>
    <div className="flex items-center justify-between px-3 py-2" style={{background:'rgba(124,58,237,0.055)',borderBottom:'1px solid rgba(124,58,237,0.12)'}}>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{background:'#EF4444',opacity:0.65}} />
          <div className="w-2.5 h-2.5 rounded-full" style={{background:'#F59E0B',opacity:0.65}} />
          <div className="w-2.5 h-2.5 rounded-full" style={{background:'#10B981',opacity:0.65}} />
        </div>
        <span className="text-[10px] font-mono" style={{color:'rgba(180,180,220,0.38)'}}>{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[8px] font-mono px-1.5 py-0.5" style={{color:'#7C3AED',background:'rgba(124,58,237,0.1)',border:'1px solid rgba(124,58,237,0.2)'}}>{lang}</span>
        <span className="text-[8px] font-mono" style={{color:'rgba(0,212,255,0.3)'}}>UTF-8 LF</span>
      </div>
    </div>
    <div className="flex">
      <div className="flex flex-col py-4 px-3 select-none" style={{background:'rgba(124,58,237,0.03)',borderRight:'1px solid rgba(124,58,237,0.07)',minWidth:'2.5rem'}}>
        {React.Children.map(children, (_,i) => (
          <div key={i} className="text-[10px] leading-6 text-right" style={{color:'rgba(124,58,237,0.22)',fontFamily:"'IBM Plex Mono',monospace"}}>{lineStart+i}</div>
        ))}
      </div>
      <div className="py-4 px-4 flex-1 overflow-x-auto">
        {React.Children.map(children, (child,i) => (
          <div key={i} className="text-[10px] leading-6" style={{fontFamily:"'IBM Plex Mono',monospace"}}>{child}</div>
        ))}
      </div>
    </div>
  </div>
);

/* ── SKILL CHIP ── */
const SkillChip: React.FC<Skill> = ({icon,name}) => (
  <div className="group relative flex flex-col items-center gap-2.5 p-4 transition-all duration-200 hover:-translate-y-1.5 cursor-default overflow-hidden"
    style={{background:'linear-gradient(135deg,rgba(14,14,18,0.95),rgba(18,10,32,0.95))',border:'1px solid rgba(124,58,237,0.13)'}}>
    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 -ml-0.5">
      {[0,1,2].map(i=><div key={i} className="w-1 h-0.5" style={{background:'rgba(0,212,255,0.18)'}}/>)}
    </div>
    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 mr-[-2px]">
      {[0,1,2].map(i=><div key={i} className="w-1 h-0.5" style={{background:'rgba(0,212,255,0.18)'}}/>)}
    </div>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style={{background:'radial-gradient(circle at center,rgba(124,58,237,0.1) 0%,transparent 70%)'}} />
    <div className="absolute inset-x-0 top-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      style={{background:'linear-gradient(90deg,transparent,#7C3AED,transparent)'}} />
    <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">{icon}</div>
    <span className="text-[8px] font-mono uppercase tracking-widest group-hover:text-violet-300 transition-colors relative z-10"
      style={{color:'rgba(180,180,210,0.38)'}}>{name}</span>
  </div>
);

/* ── PROJECT CARD (3D tilt + holographic) ── */
const ProjectCard: React.FC<{project:Project; index:number}> = ({project,index}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({x:0,y:0});
  const [hov, setHov] = useState(false);
  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect(); if(!r) return;
    setTilt({ x:(e.clientY-r.top)/r.height-0.5, y:-((e.clientX-r.left)/r.width-0.5) });
  };
  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      className="relative flex flex-col overflow-hidden"
      style={{
        background:'linear-gradient(135deg,#0E0E12,#12091E)',
        border:`1px solid ${hov?'rgba(124,58,237,0.38)':'rgba(124,58,237,0.13)'}`,
        transform:`perspective(800px) rotateX(${tilt.x*8}deg) rotateY(${tilt.y*8}deg)`,
        transition: hov?'transform 0.1s,border-color 0.2s':'transform 0.4s,border-color 0.2s',
        boxShadow: hov?'0 20px 60px rgba(124,58,237,0.18),inset 0 0 40px rgba(124,58,237,0.025)':'none',
      }}>
      {hov && <div className="absolute inset-0 pointer-events-none z-10" style={{background:'linear-gradient(135deg,rgba(124,58,237,0.035),rgba(0,212,255,0.025),rgba(255,149,0,0.02))'}} />}
      <div className="absolute top-3 right-3 font-mono text-[9px] z-10" style={{color:'rgba(0,212,255,0.3)'}}>0x{String(index).padStart(2,'0')}</div>
      <div className="relative h-28 flex items-center justify-center overflow-hidden" style={{background:'rgba(124,58,237,0.04)'}}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id={`hex-${index}`} x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
            <polygon points="15,1 28,8 28,22 15,29 2,22 2,8" fill="none" stroke="#7C3AED" strokeWidth="0.6"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill={`url(#hex-${index})`}/>
        </svg>
        <div className="relative z-10 transition-transform duration-300"
          style={{transform:hov?'scale(1.12) translateY(-2px)':'scale(1)', filter:hov?'drop-shadow(0 0 16px rgba(124,58,237,0.7))':'drop-shadow(0 0 5px rgba(124,58,237,0.2))'}}>
          {project.icon}
        </div>
      </div>
      <div className="h-px" style={{background:`linear-gradient(90deg,transparent,${hov?'#7C3AED':'rgba(124,58,237,0.28)'},transparent)`}} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#22c55e',boxShadow:'0 0 6px rgba(34,197,94,0.8)'}} />
          <span className="font-mono text-[8px] uppercase tracking-widest" style={{color:'rgba(34,197,94,0.45)'}}>process: running</span>
        </div>
        <h3 className="font-bold mb-2 transition-colors" style={{fontFamily:"'Syne',sans-serif",fontSize:'1rem',letterSpacing:'-0.01em',color:hov?'#C4B5FD':'#E8E8F0'}}>{project.title}</h3>
        <p className="text-[11px] leading-relaxed flex-1 mb-4 font-mono" style={{color:'rgba(160,160,190,0.48)'}}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag,i)=>(
            <span key={i} className="text-[8px] font-mono px-2 py-0.5 uppercase tracking-wide"
              style={{color:'rgba(124,58,237,0.65)',background:'rgba(124,58,237,0.07)',border:'1px solid rgba(124,58,237,0.16)'}}>{tag}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center text-[9px] font-mono uppercase tracking-widest px-3 py-2 transition-all"
              style={{background:'rgba(124,58,237,0.14)',border:'1px solid rgba(124,58,237,0.33)',color:'#A78BFA'}}>./exec</a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center text-[9px] font-mono uppercase tracking-widest px-3 py-2 transition-all"
              style={{border:'1px solid rgba(0,212,255,0.18)',color:'rgba(0,212,255,0.45)'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,212,255,0.5)';(e.currentTarget as HTMLElement).style.color='#00D4FF';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,212,255,0.18)';(e.currentTarget as HTMLElement).style.color='rgba(0,212,255,0.45)';}}>
              git clone
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── EXPERIENCE CARD ── */
const ExperienceCard: React.FC<{experience:Experience; index:number; total:number}> = ({experience,index,total}) => (
  <div className="relative flex gap-5 group">
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative w-5 h-5 mt-6 flex-shrink-0">
        <div className="absolute inset-0 rotate-45 transition-all duration-300 group-hover:rotate-90" style={{background:'rgba(124,58,237,0.12)',border:'1.5px solid rgba(124,58,237,0.45)'}} />
        <div className="absolute inset-1.5" style={{background:'#7C3AED'}} />
      </div>
      {index < total-1 && <div className="flex-1 w-px mt-1" style={{background:'linear-gradient(to bottom,rgba(124,58,237,0.35),rgba(124,58,237,0.04))',minHeight:'40px'}} />}
    </div>
    <div className="flex-1 mb-8 overflow-hidden transition-all duration-300"
      style={{background:'linear-gradient(135deg,rgba(14,14,18,0.9),rgba(12,8,22,0.9))',border:'1px solid rgba(124,58,237,0.1)',backdropFilter:'blur(8px)'}}>
      <div className="h-px opacity-55 group-hover:opacity-100 transition-opacity" style={{background:'linear-gradient(90deg,#7C3AED,rgba(0,212,255,0.5),transparent)'}} />
      <div className="px-5 pt-3.5 pb-0 flex items-center gap-3">
        <span className="font-mono text-[8px] px-2 py-0.5" style={{color:'rgba(0,212,255,0.55)',background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.1)'}}>REG</span>
        <span className="font-mono text-[8px]" style={{color:'rgba(124,58,237,0.35)'}}>0x{String(index).padStart(4,'0')}</span>
      </div>
      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold mb-1 group-hover:text-violet-300 transition-colors" style={{fontFamily:"'Syne',sans-serif",fontSize:'1.05rem',letterSpacing:'-0.01em',color:'#E8E8F0'}}>{experience.title}</h3>
            <p className="font-mono text-sm" style={{color:'rgba(0,212,255,0.55)'}}>→ {experience.company}</p>
          </div>
          <div className="flex flex-col lg:items-end gap-1.5">
            <span className="font-mono text-[10px] px-3 py-1" style={{color:'rgba(180,180,210,0.4)',background:'rgba(124,58,237,0.04)',border:'1px solid rgba(124,58,237,0.1)'}}>{experience.period}</span>
            <span className="font-mono text-[8px] px-3 py-1 uppercase tracking-widest" style={{color:'#FF9500',background:'rgba(255,149,0,0.07)',border:'1px solid rgba(255,149,0,0.2)'}}>{experience.type}</span>
          </div>
        </div>
        <ul className="mb-4 space-y-2">
          {experience.description.map((pt,i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 font-mono text-[9px]" style={{color:'rgba(124,58,237,0.55)'}}>▸</span>
              <span className="text-[11px] leading-relaxed font-mono" style={{color:'rgba(160,160,190,0.48)'}}>{pt}</span>
            </li>
          ))}
        </ul>
        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech,i) => (
              <span key={i} className="font-mono text-[8px] px-2 py-0.5 uppercase tracking-wider"
                style={{color:'rgba(0,212,255,0.38)',background:'rgba(0,212,255,0.04)',border:'1px solid rgba(0,212,255,0.1)'}}>{tech}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* ── CONTACT CARD ── */
const ContactCard: React.FC<{icon:React.ReactNode; label:string; value:React.ReactNode}> = ({icon,label,value}) => (
  <div className="group flex items-center gap-4 p-4 transition-all duration-200"
    style={{background:'rgba(14,14,18,0.8)',border:'1px solid rgba(124,58,237,0.1)',backdropFilter:'blur(4px)'}}
    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.32)'}
    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.1)'}>
    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{background:'rgba(124,58,237,0.07)',border:'1px solid rgba(124,58,237,0.18)'}}>{icon}</div>
    <div className="min-w-0">
      <p className="font-mono text-[8px] uppercase tracking-[0.3em] mb-1" style={{color:'rgba(0,212,255,0.3)'}}>{label}</p>
      <div className="font-mono text-xs truncate group-hover:text-violet-300 transition-colors" style={{color:'rgba(200,200,220,0.6)'}}>{value}</div>
    </div>
  </div>
);

/* ── MAIN APP ── */
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typingTexts = ['Full Stack Developer','AI Enthusiast','CSE Undergrad @ PES','Open Source Contributor','SDN Researcher','Problem Solver'];
  const typedText = useTypingEffect(typingTexts, 70, 1800);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['home','about','skills','experience','projects','contact'];
      const sp = window.scrollY + window.innerHeight/2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && sp >= el.offsetTop && sp < el.offsetTop+el.offsetHeight) { setActiveSection(id); break; }
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
    socials: { linkedin:"https://linkedin.com/in/g-s-s-surya-prakash/", github:"https://github.com/GSuryaP", twitter:"https://twitter.com/yourusername" },
    skills: [
      { name:"Python", icon:<SiPython color="#3776AB" size={34}/> },
      { name:"JavaScript", icon:<SiJavascript color="#F7DF1E" size={34}/> },
      { name:"React", icon:<SiReact color="#61DAFB" size={34}/> },
      { name:"RASA", icon:<img src="/rasa.jpg" alt="RASA" className="w-9 h-9"/> },
      { name:"Node.js", icon:<SiNodedotjs color="#339933" size={34}/> },
      { name:"Express", icon:<SiExpress color="#E8E8F0" size={34}/> },
      { name:"MongoDB", icon:<SiMongodb color="#47A248" size={34}/> },
      { name:"MySQL", icon:<SiMysql color="#4479A1" size={34}/> },
      { name:"HTML5", icon:<SiHtml5 color="#E34F26" size={34}/> },
      { name:"CSS3", icon:<SiCss color="#1572B6" size={34}/> },
      { name:"Tailwind", icon:<SiTailwindcss color="#06B6D4" size={34}/> },
      { name:"C++", icon:<SiCplusplus color="#00599C" size={34}/> },
      { name:"C", icon:<SiC color="#00599C" size={34}/> },
      { name:"Git", icon:<SiGit color="#F05032" size={34}/> },
      { name:"GitHub", icon:<SiGithub color="#E8E8F0" size={34}/> },
      { name:"Firebase", icon:<SiFirebase color="#FFCA28" size={34}/> },
    ] as Skill[],
    experiences: [
      { title:"Computer Science Engineering Student", company:"PES University", period:"2023 - Present", type:"Education", description:["Pursuing B.Tech in Computer Science and Engineering at PES University, maintaining a CGPA of 8.73 through my 5th semester. Honored with the Prof. CNR Scholarship for the 1st, 3rd, 4th semesters, awarded to the top 20%. Actively participating in campus life as a member of multiple clubs."], technologies:["React","Node.js","Express","MongoDB","JavaScript","Git","AWS"] },
      { title:"Research Intern", company:"Center of Computer Networks and CyberSecurity (CCNCS)", period:"June 2025 - July 2025", type:"Summer Internship", description:["Developed an intelligent SDN management system by integrating the ONOS distributed controller cluster using Mininet with a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection through REST APIs and a visualization dashboard."], technologies:["SDN","RASA","ONOS","Mininet","Atomix","Python"] },
      { title:"Logistics Head", company:"Equinox - The Space Club, PESU ECC", period:"May 2025 - Present", type:"Club domain head", description:["Oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and other activities."], technologies:[] },
      { title:"SMCC Head", company:"Equinox - The Space Club, PESU ECC", period:"Sep 2024 - May 2025", type:"Club domain head", description:["Handled digital outreach by designing engaging posts, managing social media campaigns, and creating content to promote events."], technologies:[] },
    ] as Experience[],
    projects: [
      { title:"RASA-Driven SDN Tool", description:"RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><circle cx="12" cy="5" r="2" stroke="#7C3AED" strokeWidth="1.8"/><circle cx="5" cy="19" r="2" stroke="#7C3AED" strokeWidth="1.8"/><circle cx="19" cy="19" r="2" stroke="#7C3AED" strokeWidth="1.8"/><path d="M12 7V12M12 12L6 17M12 12L18 17" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, tags:["ONOS","Atomix","Mininet","RASA","Python","REST APIs"], repoUrl:"https://github.com/GSuryaP/Distributed-SDN-RASA-Chatbot" },
      { title:"Distributed Image Processing", description:"Distributed image processing system using Apache Kafka for async communication between FastAPI master node and multiple PIL-based worker nodes with real-time heartbeat monitoring.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><rect x="9" y="9" width="6" height="6" rx="1" stroke="#7C3AED" strokeWidth="1.8"/><rect x="9.5" y="2" width="5" height="4" rx="1" stroke="#00D4FF" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="9" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="9.5" width="4" height="4" rx="1" stroke="#00D4FF" strokeWidth="1.5"/><line x1="6" y1="12" x2="9" y2="12" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/><rect x="18" y="9.5" width="4" height="4" rx="1" stroke="#00D4FF" strokeWidth="1.5"/><line x1="18" y1="12" x2="15" y2="12" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/><rect x="9.5" y="18" width="5" height="4" rx="1" stroke="#00D4FF" strokeWidth="1.5"/><line x1="12" y1="18" x2="12" y2="15" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags:["Apache Kafka","FastAPI","Python","Pillow","Docker","Distributed Systems"], repoUrl:"https://github.com/GSuryaP/Distributed-Image-Processing-Pipeline" },
      { title:"GitHub Repository Tracker", description:"Interactive dashboard for tracking GitHub repositories, users, commits, and open issues. Real-time stats, live search, aurora-style animated background powered by Node.js API.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" stroke="#7C3AED" strokeWidth="1.2" fill="none"/><path d="M8 17v-4M12 17v-6M16 17v-4" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags:["HTML","CSS","JavaScript","Node.js","Python","GitHub API"], repoUrl:"https://github.com/GSuryaP/Github-Repository-Tracker" },
      { title:"Finance Analytics Dashboard", description:"FinTech analytics dashboard with React and Tailwind CSS for managing personal transactions in real time. CRUD operations, Recharts visualizations, dark/light mode, and auto-recalculated metrics.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><rect x="3" y="12" width="3" height="9" rx="1" stroke="#FF9500" strokeWidth="1.8"/><rect x="8" y="8" width="3" height="13" rx="1" stroke="#FF9500" strokeWidth="1.8"/><rect x="13" y="5" width="3" height="16" rx="1" stroke="#FF9500" strokeWidth="1.8"/><rect x="18" y="9" width="3" height="12" rx="1" stroke="#FF9500" strokeWidth="1.8"/><path d="M4.5 11L9.5 7L14.5 4L19.5 8" stroke="#FFC156" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1"/></svg>, tags:["React","Vite","Tailwind CSS","Recharts","JavaScript","CRUD"], repoUrl:"https://github.com/GSuryaP/Personal-Finance-Dashboard" },
      { title:"AdaptiveLearn AI", description:"AI-powered teacher analytics dashboard on AWS free-tier. Reads scores from S3 CSV via Python Lambda, Amazon Bedrock (Titan) for LLM-driven insights on weak topics and struggling students.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><path d="M12 3C9.5 3 7.5 4.8 7.5 7c0 .6.1 1.1.4 1.6C6.3 9.1 5 10.5 5 12.2c0 1.1.5 2.1 1.3 2.8C6.1 15.3 6 15.6 6 16c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3 0-.4-.1-.7-.3-1 .8-.7 1.3-1.7 1.3-2.8 0-1.7-1.3-3.1-2.9-3.6.3-.5.4-1 .4-1.6C16.5 4.8 14.5 3 12 3z" stroke="#00D4FF" strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 14.5h4" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/></svg>, tags:["AWS S3","AWS Lambda","Amazon Bedrock","Python","HTML","CSV"], repoUrl:"https://github.com/GSuryaP/AdaptiveLearn-AI" },
      { title:"Weather & AQI Tracker", description:"Tkinter application verifying city names via OpenWeatherMap API, displaying environmental data including AQI and detailed weather information with a user-friendly interface.", icon:<svg viewBox="0 0 24 24" fill="none" className="w-12 h-12"><circle cx="12" cy="10" r="4" stroke="#00D4FF" strokeWidth="2"/><path d="M12 2V4M12 16V18M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 10H4M20 10H22M4.93 15.07L6.34 13.66M17.66 6.34L19.07 4.93" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/></svg>, tags:["Python","Tkinter","OpenWeatherMap API","JSON","GUI"], repoUrl:"https://github.com/GSuryaP/Weather-AQI_Tracker" },
    ] as Project[],
  };

  const navLinks = [
    {id:'home',title:'Home'},{id:'about',title:'About'},{id:'skills',title:'Skills'},
    {id:'experience',title:'Experience'},{id:'projects',title:'Projects'},{id:'contact',title:'Contact'},
  ];

  return (
    <div style={{background:'#0A0A10',color:'#E8E8F0',fontFamily:"'IBM Plex Mono',monospace",minHeight:'100vh',cursor:'default'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{cursor:default;background:#0A0A10;}
        a,button{cursor:pointer;}
        ::selection{background:rgba(124,58,237,0.28);color:#C4B5FD;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#0A0A10;}
        ::-webkit-scrollbar-thumb{background:rgba(124,58,237,0.38);}
        .nav-active{color:#A78BFA!important;}
        .nav-active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:#7C3AED;box-shadow:0 0 6px rgba(124,58,237,0.8);}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee{animation:marquee 28s linear infinite;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards;}
        .d1{animation-delay:.05s;opacity:0;}.d2{animation-delay:.18s;opacity:0;}.d3{animation-delay:.32s;opacity:0;}
        .d4{animation-delay:.48s;opacity:0;}.d5{animation-delay:.62s;opacity:0;}
        .blink{display:inline-block;width:8px;height:14px;background:#7C3AED;animation:cur 1s step-end infinite;vertical-align:middle;margin-left:2px;}
        @keyframes cur{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .spin-slow{animation:spin-slow 10s linear infinite;}
        @keyframes ping-v{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2.2);opacity:0}}
        .ping-v{animation:ping-v 1.8s ease-out infinite;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .float{animation:float 4s ease-in-out infinite;}
        .watermark{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(6rem,15vw,13rem);line-height:1;color:rgba(124,58,237,0.028);position:absolute;right:-1rem;top:0;pointer-events:none;user-select:none;letter-spacing:-0.05em;}
        @keyframes growW{from{width:0}to{width:var(--w)}}
        .pbar{animation:growW 1s cubic-bezier(.4,0,.2,1) forwards;animation-delay:.4s;width:0;}
        .hex-overlay{background-image:url("data:image/svg+xml,%3Csvg width='56' height='64' viewBox='0 0 56 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 16V48L28 64L0 48V16Z' fill='none' stroke='rgba(124%2C58%2C237%2C0.035)' stroke-width='1'/%3E%3C/svg%3E");background-size:56px 64px;}
        @keyframes scan{0%{top:-40%}100%{top:100%}}
        .scan::before{content:'';position:absolute;left:0;right:0;height:40%;background:linear-gradient(transparent,rgba(124,58,237,0.012),transparent);animation:scan 6s linear infinite;pointer-events:none;}
        .skill-grid{gap:1px;background:rgba(124,58,237,0.06);}
        .skill-cell{background:#0A0A10;}
      `}</style>

      <PCBBackground />
      <ParticleField />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{position:'absolute',top:'-20%',left:'30%',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(124,58,237,0.065) 0%,transparent 65%)',filter:'blur(40px)'}} />
        <div style={{position:'absolute',bottom:'10%',right:'-10%',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(0,212,255,0.045) 0%,transparent 65%)',filter:'blur(30px)'}} />
        <div style={{position:'absolute',top:'50%',left:'-5%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(255,149,0,0.028) 0%,transparent 65%)',filter:'blur(30px)'}} />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{background:scrolled?'rgba(10,10,16,0.95)':'transparent',borderBottom:scrolled?'1px solid rgba(124,58,237,0.1)':'none',backdropFilter:scrolled?'blur(16px)':'none'}}>
        <div className="h-px" style={{background:'linear-gradient(90deg,transparent,#7C3AED,#00D4FF,transparent)'}} />
        <div className="container mx-auto px-6 py-3.5 flex justify-between items-center max-w-7xl">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center" style={{background:'rgba(124,58,237,0.14)',border:'1px solid rgba(124,58,237,0.38)'}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'0.6rem',color:'#A78BFA'}}>GSS</span>
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:'0.95rem',color:'#E8E8F0',letterSpacing:'-0.02em'}}>Portfolio</span>
            <span className="font-mono text-[10px]" style={{color:'rgba(0,212,255,0.38)' }}>.exe</span>
          </a>
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link=>(
              <a key={link.id} href={`#${link.id}`}
                className={`relative text-[10px] font-mono uppercase tracking-widest px-3 py-2 transition-colors hover:text-violet-300 ${activeSection===link.id?'nav-active':''}`}
                style={{color:activeSection===link.id?'#A78BFA':'rgba(160,160,200,0.38)'}}>
                {link.title}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-2 h-2">
              <div className="ping-v w-2 h-2 rounded-full absolute" style={{background:'rgba(34,197,94,0.38)'}} />
              <div className="w-2 h-2 rounded-full" style={{background:'#22c55e'}} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{color:'rgba(34,197,94,0.48)'}}>sys.online</span>
          </div>
          <button className="md:hidden font-mono text-[10px] px-3 py-1.5"
            style={{border:'1px solid rgba(124,58,237,0.28)',color:'#A78BFA'}}
            onClick={()=>setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen?'[x]':'[≡]'}
          </button>
        </div>
        {isMenuOpen && (
          <div style={{background:'rgba(10,10,16,0.98)',borderTop:'1px solid rgba(124,58,237,0.07)'}}>
            {navLinks.map(link=>(
              <a key={link.id} href={`#${link.id}`} onClick={()=>setIsMenuOpen(false)}
                className="block py-3 px-6 font-mono text-[10px] uppercase tracking-widest border-b transition-colors"
                style={{borderColor:'rgba(124,58,237,0.06)',color:activeSection===link.id?'#A78BFA':'rgba(160,160,200,0.38)'}}>
                {'>'} {link.title}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* ── HOME ── */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 relative overflow-hidden hex-overlay scan">
          <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none pr-4">
            <span className="watermark" style={{fontSize:'clamp(8rem,22vw,20rem)',color:'rgba(124,58,237,0.022)'}}>01</span>
          </div>
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* LEFT */}
              <div className="lg:col-span-3">
                <div className="fade-up d1 inline-flex items-center gap-3 mb-7 px-4 py-2"
                  style={{background:'rgba(14,14,20,0.85)',border:'1px solid rgba(124,58,237,0.22)',backdropFilter:'blur(8px)'}}>
                  <span className="font-mono text-[8px] px-2 py-0.5" style={{color:'rgba(0,212,255,0.65)',background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.13)'}}>PID:4096</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{color:'rgba(124,58,237,0.6)'}}>BOOT_SEQUENCE: COMPLETE — SEEKING OPPORTUNITIES</span>
                </div>
                <div className="fade-up d2 mb-2">
                  <span className="font-mono text-xs" style={{color:'rgba(124,58,237,0.38)'}}>
                    <span style={{color:'rgba(0,212,255,0.48)'}}>root@pesu-ecc</span>
                    <span style={{color:'rgba(124,58,237,0.38)'}}>:~#</span>{' '}id
                  </span>
                </div>
                <div className="fade-up d3 mb-5">
                  <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(2rem,6.5vw,5.5rem)',lineHeight:'0.92',letterSpacing:'-0.03em',color:'#F0F0F8',fontWeight:800}}>
                    <span style={{display:'block'}}>Gonella</span>
                    <span style={{display:'block',color:'#A78BFA',textShadow:'0 0 30px rgba(124,58,237,0.4)'}}>Surya</span>
                    <span style={{display:'block'}}>Prakash</span>
                  </h1>
                </div>
                <div className="fade-up d3 mb-8 flex items-center gap-2">
                  <span className="font-mono text-xs" style={{color:'rgba(0,212,255,0.38)'}}>{'>'}</span>
                  <span className="font-mono text-sm" style={{color:'rgba(0,212,255,0.75)'}}>{typedText}</span>
                  <span className="blink" />
                </div>
                <div className="fade-up d4 mb-9"><BootSequence /></div>
                <div className="fade-up d5 flex flex-wrap gap-3 mb-7">
                  <a href={portfolioData.resumeUrl} download className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-6 py-3 transition-all"
                    style={{background:'rgba(124,58,237,0.16)',border:'1px solid rgba(124,58,237,0.42)',color:'#A78BFA'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.26)';(e.currentTarget as HTMLElement).style.boxShadow='0 0 20px rgba(124,58,237,0.2)';}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.16)';(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    wget résumé.pdf
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-6 py-3 transition-all"
                    style={{border:'1px solid rgba(0,212,255,0.18)',color:'rgba(0,212,255,0.5)'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,212,255,0.48)';(e.currentTarget as HTMLElement).style.color='#00D4FF';}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,212,255,0.18)';(e.currentTarget as HTMLElement).style.color='rgba(0,212,255,0.5)';}}>
                    ssh contact ↗
                  </a>
                </div>
                <div className="fade-up d5 flex gap-2">
                  {[
                    {href:portfolioData.socials.linkedin,fill:true,path:<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>},
                    {href:portfolioData.socials.github,fill:true,path:<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="currentColor"/>},
                    {href:`mailto:${portfolioData.contactEmail}`,fill:false,path:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>},
                  ].map((s,i)=>(
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center transition-all"
                      style={{border:'1px solid rgba(124,58,237,0.18)',color:'rgba(160,140,220,0.42)'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.48)';(e.currentTarget as HTMLElement).style.color='#A78BFA';(e.currentTarget as HTMLElement).style.boxShadow='0 0 12px rgba(124,58,237,0.18)';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.18)';(e.currentTarget as HTMLElement).style.color='rgba(160,140,220,0.42)';(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={s.fill?'currentColor':'none'} stroke={!s.fill?'currentColor':'none'}>{s.path}</svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-2 flex flex-col items-center gap-6">
                <div className="float relative">
                  <div className="absolute -inset-10 pointer-events-none" style={{background:'radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)'}} />
                  <div className="relative w-44 h-44">
                    <svg className="spin-slow absolute inset-0 w-full h-full" viewBox="0 0 180 180" style={{opacity:0.38}}>
                      <polygon points="90,4 174,49 174,139 90,184 6,139 6,49" fill="none" stroke="url(#hexGrad)" strokeWidth="1.5" strokeDasharray="10 5"/>
                      <defs>
                        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7C3AED"/><stop offset="50%" stopColor="#00D4FF"/><stop offset="100%" stopColor="#FF9500"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 180 180" style={{opacity:0.22}}>
                      <polygon points="90,12 166,55 166,133 90,176 14,133 14,55" fill="none" stroke="#7C3AED" strokeWidth="0.8"/>
                    </svg>
                    <div className="absolute inset-5 overflow-hidden" style={{clipPath:'polygon(50% 0%,95% 25%,95% 75%,50% 100%,5% 75%,5% 25%)',border:'1px solid rgba(124,58,237,0.28)'}}>
                      <img src="/profile.png" alt="G S S Surya Prakash" className="w-full h-full object-cover"
                        onError={e=>{(e.target as HTMLImageElement).src='https://placehold.co/154x154/0A0A10/7C3AED?text=GSS';}}/>
                    </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-1">
                  {[{label:'CGPA',value:'8.73',address:'0xFF00'},{label:'Projects',value:'6+',address:'0xFF04'},{label:'Internships',value:'1',address:'0xFF08'},{label:'Clubs',value:'2+',address:'0xFF0C'}].map((s,i)=><HexDumpStat key={i} {...s}/>)}
                </div>
                <div className="w-full p-4" style={{background:'rgba(14,14,20,0.78)',border:'1px solid rgba(124,58,237,0.14)'}}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[8px] uppercase tracking-widest" style={{color:'rgba(0,212,255,0.38)'}}>PERF_MONITOR</span>
                    <span className="font-mono text-[8px]" style={{color:'rgba(124,58,237,0.45)'}}>4 cores active</span>
                  </div>
                  {[{name:'Full Stack',pct:88,color:'#7C3AED'},{name:'AI / ML',pct:72,color:'#00D4FF'},{name:'DevOps',pct:60,color:'#FF9500'},{name:'Networking',pct:65,color:'#A78BFA'}].map((bar,i)=>(
                    <div key={i} className="mb-2.5">
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px]" style={{color:'rgba(160,160,200,0.42)'}}>{bar.name}</span>
                        <span className="font-mono text-[9px]" style={{color:bar.color,opacity:0.75}}>{bar.pct}%</span>
                      </div>
                      <div className="h-1.5" style={{background:'rgba(124,58,237,0.07)'}}>
                        <div className="h-full pbar" style={{'--w':`${bar.pct}%`,background:`linear-gradient(90deg,${bar.color}88,${bar.color})`,boxShadow:`0 0 6px ${bar.color}55`} as React.CSSProperties}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0" style={{borderTop:'1px solid rgba(124,58,237,0.07)',background:'rgba(8,8,14,0.9)'}}>
            <OscilloscopeWave color="#7C3AED" height={36} amplitude={10} speed={0.02}/>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-28 px-6 relative">
          <div className="watermark">02</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="0x02" sub="./about_me" waveColor="#00D4FF">About Me</SectionTitle>
            <div className="grid lg:grid-cols-5 gap-0" style={{border:'1px solid rgba(124,58,237,0.13)'}}>
              <div className="lg:col-span-2 p-7 flex flex-col gap-5" style={{background:'rgba(12,10,20,0.78)',borderRight:'1px solid rgba(124,58,237,0.1)'}}>
                <IDEWindow title="profile.json" lang="json">
                  <div style={{color:'rgba(124,58,237,0.38)'}}>{'{'}  </div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"name"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#A78BFA'}}>"Surya Prakash"</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"uni"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#A78BFA'}}>"PES University"</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"cgpa"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#FF9500'}}>8.73</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"year"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#FF9500'}}>3</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"scholarship"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#A78BFA'}}>"Prof. CNR"</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
                  <div className="pl-4"><span style={{color:'rgba(0,212,255,0.5)'}}>"open_to_work"</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#22c55e'}}>true</span></div>
                  <div style={{color:'rgba(124,58,237,0.38)'}}>{'}'}</div>
                </IDEWindow>
                <div className="grid grid-cols-3 gap-1">
                  {[{l:'CGPA',v:'8.73'},{l:'Projects',v:'6+'},{l:'Clubs',v:'2+'}].map((s,i)=>(
                    <div key={i} className="p-3 text-center" style={{background:'rgba(14,14,20,0.78)',border:'1px solid rgba(124,58,237,0.1)'}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:'1.5rem',color:'#7C3AED',textShadow:'0 0 12px rgba(124,58,237,0.4)',lineHeight:1}}>{s.v}</div>
                      <div className="font-mono text-[8px] uppercase tracking-widest mt-1" style={{color:'rgba(160,160,200,0.28)'}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 p-7" style={{background:'rgba(10,10,16,0.48)'}}>
                <div className="mb-4 font-mono text-[9px]" style={{color:'rgba(124,58,237,0.38)'}}>
                  <span style={{color:'rgba(0,212,255,0.48)'}}>$</span> cat bio.md | less
                </div>
                <p className="font-mono text-[11px] leading-loose mb-7" style={{color:'rgba(160,160,200,0.48)'}}>{portfolioData.bio}</p>
                <div className="p-4" style={{background:'rgba(124,58,237,0.035)',border:'1px solid rgba(124,58,237,0.1)',borderLeft:'2px solid #7C3AED'}}>
                  <div className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{color:'rgba(0,212,255,0.48)'}}>// achievement unlocked</div>
                  <div className="flex items-center gap-2">
                    <span style={{color:'#FF9500',fontSize:'0.9rem'}}>★</span>
                    <span className="font-mono text-[10px]" style={{color:'rgba(200,200,220,0.52)'}}>Prof. CNR Scholarship — Top 20% (Sem 1, 3, 4)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-28 px-6 relative">
          <div className="watermark">03</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="0x03" sub="ldd /usr/lib" waveColor="#FF9500">Tech Stack</SectionTitle>
            <div className="mb-5 font-mono text-[9px]" style={{color:'rgba(124,58,237,0.38)'}}>
              <span style={{color:'rgba(0,212,255,0.48)'}}>$</span> lspci | grep -i "skill controller" | sort
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 skill-grid">
              {portfolioData.skills.map(skill=>(
                <div key={skill.name} className="skill-cell"><SkillChip {...skill}/></div>
              ))}
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                {cat:'Frontend',techs:'React · HTML5 · CSS3 · Tailwind · JavaScript',color:'#7C3AED'},
                {cat:'Backend',techs:'Node.js · Express · Python · FastAPI · RASA',color:'#00D4FF'},
                {cat:'Databases & Tools',techs:'MongoDB · MySQL · Firebase · Git · Docker',color:'#FF9500'},
              ].map((row,i)=>(
                <div key={i} className="p-4" style={{background:'rgba(14,14,20,0.68)',border:`1px solid ${row.color}18`,borderLeft:`2px solid ${row.color}`}}>
                  <div className="font-mono text-[8px] uppercase tracking-widest mb-2" style={{color:row.color,opacity:0.65}}>// {row.cat}</div>
                  <div className="font-mono text-[10px]" style={{color:'rgba(160,160,200,0.42)'}}>{row.techs}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-28 px-6 relative">
          <div className="watermark">04</div>
          <div className="container mx-auto max-w-4xl">
            <SectionTitle num="0x04" sub="git log --graph" waveColor="#A78BFA">Education & Experience</SectionTitle>
            <div className="mb-6 font-mono text-[9px]" style={{color:'rgba(124,58,237,0.38)'}}>
              <span style={{color:'rgba(0,212,255,0.48)'}}>$</span> git log --oneline --graph --all
            </div>
            {portfolioData.experiences.map((exp,i)=>(
              <ExperienceCard key={i} experience={exp} index={i} total={portfolioData.experiences.length}/>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-28 px-6 relative">
          <div className="watermark">05</div>
          <div className="container mx-auto max-w-6xl">
            <SectionTitle num="0x05" sub="ls -la ./projects" waveColor="#00D4FF">Featured Projects</SectionTitle>
            <div className="flex items-center gap-4 mb-8 -mt-8">
              <span className="font-mono text-[9px]" style={{color:'rgba(124,58,237,0.32)'}}>
                <span style={{color:'rgba(0,212,255,0.42)'}}>$</span> find . -maxdepth 1 -type d | wc -l → {portfolioData.projects.length} repos
              </span>
              <div className="flex-1 h-px" style={{background:'rgba(124,58,237,0.07)'}}/>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{background:'rgba(124,58,237,0.065)'}}>
              {portfolioData.projects.map((p,i)=>(
                <div key={i} style={{background:'#0A0A10'}}><ProjectCard project={p} index={i}/></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-28 px-6 relative">
          <div className="watermark">06</div>
          <div className="container mx-auto max-w-3xl">
            <SectionTitle num="0x06" sub="ssh connect" waveColor="#FF9500">Connect With Me</SectionTitle>
            <IDEWindow title="contact.ts" lang="typescript" lineStart={1} className="mb-0">
              <div style={{color:'rgba(0,212,255,0.42)'}}>{'// Establishing connection...'}</div>
              <div>&nbsp;</div>
              <div><span style={{color:'#7C3AED',opacity:0.65}}>const</span> <span style={{color:'#00D4FF',opacity:0.65}}>contact</span> <span style={{color:'rgba(200,200,220,0.35)'}}>= {'{'}</span></div>
              <div className="pl-4"><span style={{color:'rgba(0,212,255,0.48)'}}>email</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#A78BFA',opacity:0.65}}>"{portfolioData.contactEmail}"</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
              <div className="pl-4"><span style={{color:'rgba(0,212,255,0.48)'}}>status</span><span style={{color:'rgba(160,160,200,0.28)'}}>:</span> <span style={{color:'#22c55e',opacity:0.75}}>"open_to_work"</span><span style={{color:'rgba(160,160,200,0.28)'}}>,</span></div>
              <div><span style={{color:'rgba(200,200,220,0.35)'}}>{'}'};</span></div>
              <div>&nbsp;</div>
              <div className="grid sm:grid-cols-2 gap-px my-6" style={{background:'rgba(124,58,237,0.055)'}}>
                {[
                  {icon:<svg className="w-4 h-4" style={{color:'#7C3AED'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, label:'Location', value:portfolioData.location},
                  {icon:<svg className="w-4 h-4" style={{color:'#7C3AED'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>, label:'Email', value:<a href={`mailto:${portfolioData.contactEmail}`} style={{color:'rgba(0,212,255,0.55)'}} className="hover:text-violet-300 transition-colors">{portfolioData.contactEmail}</a>},
                  {icon:<svg className="w-4 h-4" style={{color:'#7C3AED'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>, label:'Phone', value:portfolioData.phone},
                  {icon:<svg className="w-4 h-4" style={{color:'#22c55e'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, label:'Status', value:<span style={{color:'#22c55e'}}>● Open to Opportunities</span>},
                ].map((item,i)=>(
                  <div key={i} style={{background:'#0A0A10'}}><ContactCard {...item}/></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[{href:portfolioData.socials.github,label:'github'},{href:portfolioData.socials.linkedin,label:'linkedin'},{href:`mailto:${portfolioData.contactEmail}`,label:'email'},{href:`tel:${portfolioData.phone}`,label:'phone'}].map((s,i)=>(
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-all"
                    style={{border:'1px solid rgba(124,58,237,0.16)',color:'rgba(124,58,237,0.42)'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.48)';(e.currentTarget as HTMLElement).style.color='#A78BFA';(e.currentTarget as HTMLElement).style.boxShadow='0 0 12px rgba(124,58,237,0.1)';}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.16)';(e.currentTarget as HTMLElement).style.color='rgba(124,58,237,0.42)';(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                    {'>'} ./{s.label}
                  </a>
                ))}
              </div>
            </IDEWindow>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10" style={{background:'rgba(8,8,14,0.97)',borderTop:'1px solid rgba(124,58,237,0.1)'}}>
        <div className="h-px" style={{background:'linear-gradient(90deg,transparent,#7C3AED,#00D4FF,#FF9500,transparent)'}} />
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl">
          <p className="font-mono text-[9px] uppercase tracking-widest" style={{color:'rgba(124,58,237,0.22)'}}>
            <span style={{color:'rgba(124,58,237,0.42)'}}>{portfolioData.name}</span> © {new Date().getFullYear()}
          </p>
          <div className="flex-1 max-w-xs"><OscilloscopeWave color="#7C3AED" height={22} amplitude={5} speed={0.015}/></div>
          <p className="font-mono text-[9px]" style={{color:'rgba(0,212,255,0.15)'}}>exit(0) // React + TSX</p>
        </div>
      </footer>

      <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
        className="fixed bottom-8 right-8 w-9 h-9 flex items-center justify-center font-mono text-xs transition-all z-40"
        style={{border:'1px solid rgba(124,58,237,0.22)',color:'rgba(124,58,237,0.48)',background:'rgba(10,10,16,0.9)',backdropFilter:'blur(8px)'}}
        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.55)';(e.currentTarget as HTMLElement).style.color='#A78BFA';(e.currentTarget as HTMLElement).style.boxShadow='0 0 16px rgba(124,58,237,0.22)';}}
        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.22)';(e.currentTarget as HTMLElement).style.color='rgba(124,58,237,0.48)';(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
        ↑
      </button>
    </div>
  );
}

export default App;
