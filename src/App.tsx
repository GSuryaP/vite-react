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
} from "react-icons/si";

// --- Type Definitions for TypeScript ---

interface Skill {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

// --- Helper Components ---

// SkillIcon Component with typed props
const SkillIcon: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg transition-transform hover:scale-105 hover:bg-gray-700">
    <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: icon }} />
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


// --- Main App Component ---

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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
    resumeUrl: "/GonellaSurya_Resume.pdf", // Place your resume in the `public` folder
    socials: {
      linkedin: "https://linkedin.com/in/https:/g-s-s-surya-prakash/",
      github: "https://github.com/GSuryaP",
    },

  const skills: Skill[] = [
    { name: "Python", icon: <SiPython color="#3776AB" size={40} /> },
    { name: "MySQL", icon: <SiMysql color="#4479A1" size={40} /> },
    { name: "C", icon: <SiC color="#00599C" size={40} /> },
    { name: "C++", icon: <SiCplusplus color="#00599C" size={40} /> },
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={40} /> },
    { name: "React", icon: <SiReact color="#61DAFB" size={40} /> },
    { name: "Node.js", icon: <SiNodedotjs color="#339933" size={40} /> },
    { name: "Git", icon: <SiGit color="#F05032" size={40} /> },
    { name: "GitHub", icon: <SiGithub color="#181717" size={40} /> },
  ];


    // skills: [ 
    //   { name: 'Python', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#3776AB"><title>Python</title><path d="M12 .3c-1.1 0-2 .9-2 2v2h4V2.3c0-1.1-.9-2-2-2zm6.3 2.7c-.8 0-1.3.5-1.3 1.3 0 .7.5 1.2 1.3 1.2.8 0 1.4-.5 1.4-1.2 0-.8-.6-1.3-1.4-1.3zM12 6c-3.3 0-6 2.7-6 6v1H3v4c0 1.1.9 2 2 2h2v-3c0-2.2 1.8-4 4-4h6V6h-5zM9 20v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2H9z"/></svg>' },
    //   { name: 'MySQL', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#4479A1"><title>MySQL</title><path d="M12 0C5.37 0 0 2.69 0 6v12c0 3.31 5.37 6 12 6s12-2.69 12-6V6c0-3.31-5.37-6-12-6z"/></svg>' },
    //   { name: 'C', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#00599C"><title>C</title><path d="M12 0L1.605 6v12L12 24l10.395-6V6zM12 21.5l-8.82-5.088V7.588L12 2.5l8.82 5.088v8.824z"/></svg>' },
    //   { name: 'C++', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#00599C"><title>C++</title><path d="M12 0L1.605 6v12L12 24l10.395-6V6z"/><text x="6.5" y="16" font-size="7" fill="white">C++</text></svg>' },
    //   { name: 'JavaScript', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#F7DF1E"><title>JavaScript</title><path d="M0 0h24v24H0z"/><path d="M19.7 17.9c-.3-.6-.6-1.2-1.4-1.6-.7-.5-1.8-.7-3.3-.7h-1.3v2.7h1c.8 0 1.3.1 1.7.4.4.3.5.8.5 1.5 0 .7-.2 1.2-.6 1.5s-.9.5-1.6.5c-.7 0-1.3-.1-1.8-.4s-.8-.6-1-1.2l-2.5 1.5c.4.9 1.1 1.6 2 2.1s2.1.8 3.4.8c1.5 0 2.7-.4 3.7-1.1.9-.7 1.4-1.8 1.4-3.3-.1-1.1-.2-1.9-.8-2.7z"/></svg>' },
    //   { name: 'React', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#61DAFB"><title>React</title><path d="M14.23 12c0-1.12-.91-2.03-2.03-2.03S10.17 10.88 10.17 12s.91 2.03 2.03 2.03S14.23 13.12 14.23 12z"/><path d="M12 2.5c-1.52 0-3.03.27-4.47.8C5.7 3.83 4.27 4.74 3.3 5.9c-.96 1.15-1.6 2.57-1.87 4.07-.27 1.49-.27 3.05 0 4.54.27 1.5.91 2.92 1.87 4.07.96 1.15 2.39 2.07 4.23 2.6 1.44.53 2.95.8 4.47.8s3.03-.27 4.47-.8c1.84-.53 3.27-1.45 4.23-2.6.96-1.15 1.6-2.57 1.87-4.07.27-1.49.27-3.05 0-4.54-.27-1.5-.91-2.92-1.87-4.07-.96-1.15-2.39-2.07-4.23-2.6C15.03 2.77 13.52 2.5 12 2.5z"/></svg>' },
    //   { name: 'Node.js', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#339933"><title>Node.js</title><path d="M12 .3L1.605 6v12L12 23.7 22.395 18V6zM12 21.5l-8.82-5.088V7.588L12 2.5l8.82 5.088v8.824z"/></svg>' },
    //   { name: 'Git & GitHub', icon: '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" width="24" height="24" fill="#F05032"><title>GitHub</title><path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.81 1.29 3.5.99.11-.78.42-1.29.77-1.59-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.37 1.24-3.2-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.83 1.24 1.9 1.24 3.2 0 4.59-2.8 5.59-5.48 5.88.43.37.82 1.1.82 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.58A12 12 0 0 0 12 .3z"/></svg>' },
    // ] as Skill[],

 // Casting to Skill array
    projects: [
      {
        title: "E-Commerce Platform",
        description: "A fully functional e-commerce website built with the MERN stack, featuring product listings, a shopping cart, user authentication, and a payment gateway.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Project+1",
        tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
      {
        title: "Real-Time Chat App",
        description: "A web-based chat application using WebSockets for instant messaging, allowing users to join rooms and communicate in real-time.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Project+2",
        tags: ["React", "Socket.IO", "Node.js", "Tailwind CSS"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
      {
        title: "Personal Blog",
        description: "A dynamic blog platform created with a headless CMS (Contentful) and a static site generator (Next.js) for optimal performance and SEO.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Project+3",
        tags: ["Next.js", "React", "Contentful", "GraphQL"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
       {
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets using D3.js, allowing users to filter and explore data through charts and graphs.",
        image: "https://placehold.co/600x400/1a202c/718096?text=Project+4",
        tags: ["React", "D3.js", "JavaScript", "CSS"],
        liveUrl: "https://your-live-demo-link.com",
        repoUrl: "https://github.com/your-username/your-repo",
      },
    ] as Project[], // Casting to Project array
  };

  // --- JSX Structure ---

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
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
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href={portfolioData.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
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

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 text-center">
            <h2 className="text-4xl font-bold text-center mb-8">Get In Touch</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a href={`mailto:${portfolioData.contactEmail}`} className="inline-block bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-colors text-lg">
                Say Hello
            </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-800">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
