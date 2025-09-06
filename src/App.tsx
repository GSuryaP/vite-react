import React, { useState, useEffect } from 'react';

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
    skills: [ 
      { name: 'JavaScript', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F7DF1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"></path><path d="M8 10h2a2 2 0 0 1 2 2v4H8v-6Z"></path><path d="M14 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5Z"></path></svg>' }, 
      { name: 'React', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>' }, 
      { name: 'TypeScript', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3178C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"></path><path d="M12 12H8v-2a2 2 0 0 1 2-2h4v6a2 2 0 0 0 2 2h2"></path><path d="M8 18h4a2 2 0 0 0 2-2v-2"></path></svg>'}, 
      { name: 'Node.js', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#339933" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><rect x="9" y="3" width="6" height="18" rx="2"></rect><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg>' }, 
      { name: 'Python', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3776AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 11a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"></path><path d="M14.5 11h-7"></path><path d="M14.5 3.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"></path><path d="M14.5 3.5h-7"></path><path d="M14.5 18.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"></path><path d="M14.5 18.5h-7"></path><path d="M22 11h-2.5"></path><path d="M2 11h2.5"></path></svg>' }, 
      { name: 'Git & GitHub', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F05032" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"></path><path d="M8 12h8"></path><path d="M12 16V8"></path></svg>' }, 
      { name: 'MySQL', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4479A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"></ellipse><path d="M4 6v6c0 2 3.6 3 8 3s8-1 8-3V6"></path><path d="M4 12v6c0 2 3.6 3 8 3s8-1 8-3v-6"></path></svg>' },
    ] as Skill[],
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
