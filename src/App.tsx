import React, { useState, useEffect } from 'react';
import {
  SiPython,
  SiMysql,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiExpress,
  SiFirebase
} from "react-icons/si";

// --- Type Definitions ---
interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
}

// --- Helper Components ---
const SkillIcon: React.FC<Skill> = ({ icon, name }) => (
  <div className="group flex flex-col items-center gap-3 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300 hover:scale-105 hover:bg-gray-700/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20">
    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">{name}</span>
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-500/50">
    <div className="relative overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
        onError={(e) => { 
          (e.target as HTMLImageElement).onerror = null; 
          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1f2937/64748b?text=Project+Image'; 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs font-semibold bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">{tag}</span>
        ))}
      </div>
      <div className="flex justify-between gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
             className="flex-1 text-center bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" 
             className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
            Source Code
          </a>
        )}
      </div>
    </div>
  </div>
);

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/50">
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{experience.title}</h3>
        <p className="text-cyan-400 font-semibold text-lg">{experience.company}</p>
      </div>
      <div className="text-left lg:text-right">
        <p className="text-gray-300 font-medium mb-2">{experience.period}</p>
        <span className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
          {experience.type}
        </span>
      </div>
    </div>
    
    <ul className="text-gray-300 mb-6 space-y-3">
      {experience.description.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-cyan-400 mr-3 mt-1 font-bold">▸</span>
          <span className="text-sm leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
    
    <div className="flex flex-wrap gap-2">
      {experience.technologies.map((tech, index) => (
        <span key={index} className="text-xs bg-gray-700/80 text-gray-300 px-3 py-1 rounded-full border border-gray-600/50">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

// --- Main App Component ---
function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Portfolio Data ---
  const portfolioData = {
    name: "Gonella Siva Sai Surya Prakash",
    tagline: "A CSE Undergrad & AI Enthusiast | Exploring the Future of Technology",
    bio: "I am a passionate Computer Science Engineering student at PES University, Bengaluru, with a strong foundation in full-stack development and emerging technologies. Currently in my third year, I've developed expertise in modern web technologies, machine learning, and cloud computing through both academic projects and self-directed learning. My journey in tech began with curiosity about how applications work behind the scenes, which led me to explore everything from responsive front-end interfaces to robust backend architectures. I thrive in collaborative environments and have experience working in agile teams during hackathons and group projects. I'm particularly interested in the intersection of AI and web development, and I'm actively contributing to open-source projects while seeking internship opportunities where I can apply my skills to solve real-world problems and continue growing as a developer.",
    contactEmail: "gonellasurya2005@gmail.com",
    phone: "+91 9880410689",
    location: "Bengaluru, Karnataka, India",
    resumeUrl: "/GonellaSurya_Resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
      github: "https://github.com/GSuryaP",
      twitter: "https://twitter.com/yourusername",
    },

    skills: [
      { name: "Python", icon: <SiPython color="#3776AB" size={48} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={48} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={48} /> },
      {
        name: "RASA",
        icon: (
          <img
            src="/rasa.jpg" // Replace with your actual file name in public folder
            alt="RASA"
            className="w-12 h-12" // adjust size as needed
          />
        ),
      },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={48} /> },
      { name: "Express", icon: <SiExpress color="#000000" size={48} /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" size={48} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={48} /> },
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={48} /> },
      { name: "CSS3", icon: <SiCss3 color="#1572B6" size={48} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={48} /> },
      { name: "C", icon: <SiC color="#00599C" size={48} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={48} /> },
      { name: "GitHub", icon: <SiGithub color="#181717" size={48} /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" size={48} /> },
    ],

    experiences: [
      {
        title: "Computer Science Engineering Student",
        company: "PES University",
        period: "2023 - Present",
        type: "Education",
        description: [
          "I am currently pursuing a B.Tech in Computer Science and Engineering at PES University, maintaining a CGPA of 8.73 through my 5th semester. I have been honored with the Prof. CNR Scholarship for the 1st, 3rd, 4th semesters, awarded to the top 20%. Other than academics, I actively participate in campus life as a member of multiple clubs.",
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git", "AWS"]
      },
      {
        title: "Research Intern",
        company: "Center of Computer Networks and CyberSecurity (CCNCS)",
        period: "June 2025 - July 2025",
        type: "Summer Internship",
        description: [
          "As a Research Intern at CCNCS, I developed an intelligent SDN management system by integrating the ONOS distributed controller cluster using Mininet with a RASA-powered conversational AI, enabling real-time network monitoring, automated flow control, and failure detection through REST APIs and a visualization dashboard."
        ],
        technologies: ["SDN", "RASA", "ONOS", "Mininet", "Atomix", "Python"]
      },
      {
        title: "Logistics Head",
        company: "Equinox - The Space Club, PESU ECC",
        period: "May 2025 - Present",
        type: "Club domain head",
        description: [
          "As the Logistics Head of Equinox – The Space Club, I oversee event planning and coordination, managing resources, schedules, and teams to ensure smooth execution of workshops, hackathons, and other activities with efficient logistical support and timely operations."
        ],
        technologies: ["Python", "JavaScript", "React", "Git", "GitHub Actions", "Docker"]
      }
    ] as Experience[],

    projects: [
      {
        title: "RASA-Driven SDN Tool",
        description: "Built a RASA-powered conversational assistant enabling real-time monitoring, health checks, and fault detection for distributed SDN controllers via ONOS REST APIs. Simulated SDN networks using Mininet with custom RASA actions for automated flow queries and troubleshooting.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        tags: ["ONOS", "Atomix", "Mininet", "RASA", "Python", "REST APIs"],
        repoUrl: "https://portfolio-suryagonella.vercel.app/#experience",
      },
      {
        title: "SpaceNet - Network Speed Dashboard",
        description: "Built a space-themed interactive dashboard to monitor real-time latency, bandwidth, and packet loss using TCP/UDP socket simulation. Features multi-threaded architecture with MongoDB storage, Matplotlib visualization, and responsive Tkinter UI with congestion alerts.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        tags: ["Python", "Tkinter", "Sockets", "MongoDB", "Matplotlib", "Threading"],
        repoUrl: "https://github.com/GSuryaP/SpaceNet-Network-Speed-Dashboard",
      },
      {
        title: "Personal ChatRoom",
        description: "Developed a GUI-based UDP chat application with real-time messaging capabilities, featuring customizable network settings and cross-platform compatibility. Implemented multi-threaded architecture with dark/light theme switching and responsive UI design.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <path d="M21 15A2 2 0 0 1 19 17H7L4 20V6A2 2 0 0 1 6 4H19A2 2 0 0 1 21 6V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 8L15 10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        tags: ["Python", "Tkinter", "UDP Sockets", "Threading", "GUI"],
        repoUrl: "https://github.com/GSuryaP/Personal_ChatRoom_socket-programming",
      },
      {
        title: "Weather & AQI Tracker",
        description: "Built a Tkinter-based application that verifies city names using OpenWeatherMap API and displays comprehensive environmental data including Air Quality Index (AQI) and detailed weather information with user-friendly interface and error handling.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <path d="M18 10H22L20 7L18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 14H22L20 17L18 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17H3S1 17 1 15S3 13 3 13H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21V16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        tags: ["Python", "Tkinter", "OpenWeatherMap API", "JSON", "GUI"],
        repoUrl: "https://github.com/GSuryaP/Weather-AQI_Tracker",
      },
      {
        title: "Personal Social Calendar",
        description: "Developed a Social Calendar application using Tkinter for an intuitive GUI interface. Implemented MySQL database integration to efficiently manage birthday records, events, and personal scheduling with full CRUD operations and data persistence.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14H10V16H8V14Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
        tags: ["Python", "Tkinter", "MySQL", "Database", "GUI", "CRUD"],
        repoUrl: "https://github.com/GSuryaP/Personal_Calendar",
      },
    ] as Project[],
  };

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans leading-relaxed min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header & Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {portfolioData.name}
          </a>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
               <a key={link.id} href={`#${link.id}`} 
                  className={`text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group ${
                    activeSection === link.id ? 'text-cyan-400' : ''
                  }`}>
                 {link.title}
                 <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${
                   activeSection === link.id ? 'w-full' : ''
                 }`}></span>
               </a>
            ))}
          </nav>
          <button 
            className="md:hidden z-50 p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50">
            <nav className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)} 
                   className={`text-lg font-medium transition-colors duration-300 ${
                     activeSection === link.id ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                   }`}>
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 pt-20 relative">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <div className="mb-8 relative">
            <img 
              className="w-48 h-48 rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-500/20 transition-transform duration-300 hover:scale-105 object-cover" 
              src="/profile.png" 
              alt="G S S Surya Prakash - Profile Picture" 
              onError={(e) => { 
                (e.target as HTMLImageElement).onerror = null; 
                (e.target as HTMLImageElement).src = 'https://placehold.co/192x192/1f2937/64748b?text=Surya'; 
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse" title="Available for opportunities"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{portfolioData.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">{portfolioData.tagline}</p>
          
          <div className="flex gap-6 mb-10">
            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" 
               className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" 
               className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href={`mailto:${portfolioData.contactEmail}`} 
               className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          
          <a href={portfolioData.resumeUrl} download 
             className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105">
            Download Resume
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-xl">
              <p className="text-gray-300 text-lg leading-relaxed text-center">{portfolioData.bio}</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">My Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {portfolioData.skills.map(skill => <SkillIcon key={skill.name} {...skill} />)}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Education & Experience</h2>
          <div className="max-w-5xl mx-auto space-y-8">
            {portfolioData.experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Connect At</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-10">Details</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {/* Location */}
                  <div className="flex items-center gap-4 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-300">{portfolioData.location}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-300">{portfolioData.contactEmail}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Phone</p>
                      <p className="text-gray-300">{portfolioData.phone}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-4 p-6 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Status</p>
                      <p className="text-green-400 font-medium">Open to Opportunities</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" 
                     className="w-14 h-14 bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-gray-600/30 transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="w-14 h-14 bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-gray-600/30 transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={`mailto:${portfolioData.contactEmail}`} 
                     className="w-14 h-14 bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-gray-600/30 transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a href={`tel:${portfolioData.phone}`} 
                     className="w-14 h-14 bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-gray-600/30 transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-gray-400 text-lg">
            &copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export default App;
