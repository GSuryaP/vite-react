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
} from "react-icons/si";

// --- Type Definitions for TypeScript ---

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
  type: string; // Full-time, Internship, Part-time, etc.
  description: string[];
  technologies: string[];
}

// --- Helper Components ---

// SkillIcon Component with typed props
const SkillIcon: React.FC<Skill> = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg transition-transform hover:scale-105 hover:bg-gray-700">
    <div className="w-12 h-12 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-300">{name}</span>
  </div>
);

// ProjectCard Component with typed props
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-cyan-500/30">
    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a202c/718096?text=Project+Image'; }} />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
      <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs font-semibold bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Live Demo</a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-medium">Source Code</a>
        )}
      </div>
    </div>
  </div>
);

// ExperienceCard Component
const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-cyan-500/20">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
        <p className="text-cyan-400 font-semibold">{experience.company}</p>
      </div>
      <div className="text-right mt-2 md:mt-0">
        <p className="text-gray-300 font-medium">{experience.period}</p>
        <span className="inline-block bg-cyan-900/50 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium mt-1">
          {experience.type}
        </span>
      </div>
    </div>
    
    <ul className="text-gray-400 mb-4 space-y-2">
      {experience.description.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-cyan-400 mr-2 mt-1">•</span>
          <span className="text-sm">{point}</span>
        </li>
      ))}
    </ul>
    
    <div className="flex flex-wrap gap-2">
      {experience.technologies.map((tech, index) => (
        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
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

  // --- EDITABLE CONTENT ---
  // Update these values with your personal information.

  const portfolioData = {
    name: "G S S Surya Prakash",
    tagline: "Full-Stack Developer & AI Enthusiast | Building Scalable Solutions for Tomorrow's Challenges",
    bio: "I am a passionate Computer Science Engineering student at PES University, Bengaluru, with a strong foundation in full-stack development and emerging technologies. Currently in my third year, I've developed expertise in modern web technologies, machine learning, and cloud computing through both academic projects and self-directed learning. My journey in tech began with curiosity about how applications work behind the scenes, which led me to explore everything from responsive front-end interfaces to robust backend architectures. I thrive in collaborative environments and have experience working in agile teams during hackathons and group projects. I'm particularly interested in the intersection of AI and web development, and I'm actively contributing to open-source projects while seeking internship opportunities where I can apply my skills to solve real-world problems and continue growing as a developer.",
    contactEmail: "gonellasurya2005@gmail.com",
    phone: "+91 9741909565",
    location: "Bengaluru, Karnataka, India",
    resumeUrl: "/GonellaSurya_Resume.pdf",
    socials: {
      linkedin: "https://linkedin.com/in/g-s-s-surya-prakash/",
      github: "https://github.com/GSuryaP",
      twitter: "https://twitter.com/yourusername",
    },

    skills: [
      { name: "Python", icon: <SiPython color="#3776AB" size={40} /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" size={40} /> },
      { name: "C", icon: <SiC color="#00599C" size={40} /> },
      { name: "C++", icon: <SiCplusplus color="#00599C" size={40} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={40} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={40} /> },
      { name: "Node.js", icon: <SiNodedotjs color="#339933" size={40} /> },
      { name: "Git", icon: <SiGit color="#F05032" size={40} /> },
      { name: "GitHub", icon: <SiGithub color="#181717" size={40} /> }
    ],

    experiences: [
      {
        title: "Full-Stack Development Intern",
        company: "Tech Innovations Ltd",
        period: "Jun 2024 - Aug 2024",
        type: "Internship",
        description: [
          "Developed and maintained web applications using React.js and Node.js, serving 1000+ daily active users",
          "Collaborated with senior developers to implement new features and optimize existing codebase",
          "Built responsive UI components and integrated REST APIs for seamless data flow",
          "Participated in code reviews and followed agile development methodologies"
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Git"]
      },
      {
        title: "Frontend Developer",
        company: "StartupXYZ",
        period: "Jan 2024 - May 2024",
        type: "Part-time",
        description: [
          "Created responsive web interfaces for mobile and desktop platforms using React and Tailwind CSS",
          "Improved website performance by 40% through code optimization and lazy loading implementation",
          "Worked closely with UI/UX designers to translate mockups into pixel-perfect web applications",
          "Implemented user authentication and authorization features"
        ],
        technologies: ["React", "Tailwind CSS", "JavaScript", "Firebase", "Figma"]
      },
      {
        title: "Open Source Contributor",
        company: "Various Projects",
        period: "Sep 2023 - Present",
        type: "Volunteer",
        description: [
          "Contributing to multiple open-source projects on GitHub with focus on web development and Python libraries",
          "Fixed bugs and implemented new features across different repositories",
          "Collaborated with maintainers and other contributors through issue discussions and pull requests",
          "Gained experience in collaborative development and version control best practices"
        ],
        technologies: ["Python", "JavaScript", "React", "Git", "GitHub Actions"]
      }
    ] as Experience[],

    projects: [
      {
        title: "E-Commerce Platform",
        description: "A fully functional e-commerce website built with the MERN stack, featuring product listings, a shopping cart, user authentication, and a payment gateway.",
        image: "https://placehold.co/600x400/1a202c/718096?text=E-Commerce+Platform",
        tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
      {
        title: "Real-Time Chat App",
        description: "A web-based chat application using WebSockets for instant messaging, allowing users to join rooms and communicate in real-time.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Chat+Application",
        tags: ["React", "Socket.IO", "Node.js", "Tailwind CSS"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
      {
        title: "Personal Blog",
        description: "A dynamic blog platform created with a headless CMS (Contentful) and a static site generator (Next.js) for optimal performance and SEO.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Blog+Platform",
        tags: ["Next.js", "React", "Contentful", "GraphQL"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
      {
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets using D3.js, allowing users to filter and explore data through charts and graphs.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Data+Dashboard",
        tags: ["React", "D3.js", "JavaScript", "CSS"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
    ] as Project[],
  };

  // --- JSX Structure ---

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <div className="bg-gray-900 text-white font-sans leading-relaxed">
      {/* Header & Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-cyan-400">
            {portfolioData.name}
          </a>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
               <a key={link.id} href={`#${link.id}`} className={`text-gray-300 hover:text-cyan-400 transition-colors ${activeSection === link.id ? 'text-cyan-400' : ''}`}>
                 {link.title}
               </a>
            ))}
          </nav>
          <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-gray-900">
                <nav className="flex flex-col items-center space-y-4 py-4">
                 {navLinks.map((link) => (
                    <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg text-gray-300 hover:text-cyan-400 transition-colors ${activeSection === link.id ? 'text-cyan-400' : ''}`}>
                      {link.title}
                    </a>
                 ))}
                </nav>
            </div>
        )}
      </header>

      <main className="container mx-auto px-6 pt-24">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
            <img 
                className="w-40 h-40 rounded-full mb-6 border-4 border-cyan-400 shadow-lg" 
                src="https://placehold.co/160x160/1a202c/cyan?text=You" 
                alt="Profile Picture" 
            />
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
                Hi, I'm <span className="text-cyan-400">{portfolioData.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">{portfolioData.tagline}</p>
            <div className="flex gap-4 mb-8">
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href={portfolioData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
            </div>
            <a href={portfolioData.resumeUrl} download className="bg-cyan-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                Download Resume
            </a>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-center text-gray-300 text-lg">
            <p>{portfolioData.bio}</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">My Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {portfolioData.skills.map(skill => <SkillIcon key={skill.name} {...skill} />)}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {portfolioData.experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Contact Section - New Design */}
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-pink-400 to-blue-600 bg-clip-text text-transparent mb-16">
              Let's Connect
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-300">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>
        
                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Phone</p>
                      <p className="text-gray-300">+91 9741909565</p>
                    </div>
                  </div>
        
                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-300">delishariyona@gmail.com</p>
                    </div>
                  </div>
        
                  {/* Status */}
                  <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-10 5L2 7"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">Status</p>
                      <p className="text-green-400">Open to Opportunities</p>
                    </div>
                  </div>
                </div>
        
                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-8">
                  <a href="https://github.com/GSuryaP" target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center hover:bg-bule-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/g-s-s-surya-prakash/" target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="mailto:gonellasurya2005@gmail.com" 
                     className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                  <a href="tel:+919741909565" 
                     className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-800">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.
        </p>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .absolute.w-1.h-1 {
          animation: twinkle 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
