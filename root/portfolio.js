import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// The following imports are commented out to show how these libraries would be
// imported in a proper Next.js project after being installed with npm.
// import 'tailwindcss/tailwind.css';
// import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
// import { motion, AnimatePresence, useInView } from "framer-motion";

// --- Project Data ---
const projectsData = [
    {
        title: "Can Satellite",
        desc: "Led electronics team for a student satellite, integrating sensors and power systems. Developed Zigbee communication and a real-time GUI. Ranked 10th globally in the US Cansat Competition.",
    },
    {
        title: "Unmanned Ground Vehicle",
        desc: "Developed an autonomous ground robot for crop monitoring. Integrated GIS, SPI/I2C communication, and sensors. Programmed in C, C++, Python, and used ROS2 for system integration.",
    },
    {
        title: "Smart Guidance Spectacles",
        desc: "Developed a wearable assistive device for individuals with memory loss and partial blindness. Implemented Python-based recognition, Bluetooth, and WebSocket programming.",
    },
    {
        title: "Anomaly Detection for Zero Day Exploits",
        desc: "Implemented an unsupervised deep learning pipeline using a Variational Autoencoder (VAE) to detect zero-day exploits in network data.",
    },
];

// --- Reusable Components ---

// Helper component for slide-in animation as you scroll
const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    );
};

// Theme toggle component with a slider
const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
    <div className="flex items-center space-x-2 fixed top-6 right-6 z-50">
        <SunIcon className="h-5 w-5 text-gray-500" />
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle dark and light theme"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"></div>
        </label>
        <MoonIcon className="h-5 w-5 text-gray-500" />
    </div>
);

// Navigation header
const Header = ({ isDarkMode }) => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold text-slate-800 dark:text-gray-100 tracking-wider">Shivani Bhat</a>
            <div className="hidden md:flex space-x-8 text-gray-600 dark:text-gray-300">
                <a href="#about" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">About</a>
                <a href="#experience" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Experience</a>
                <a href="#projects" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Projects</a>
                <a href="#skills" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Skills</a>
                <a href="#contact" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Contact</a>
            </div>
        </nav>
    </div>
);

// Reusable section heading
const SectionHeading = ({ children, isDarkMode }) => (
    <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-gray-100' : 'text-slate-800'}`}>
        {children}
    </h2>
);

// --- Sections of the Portfolio ---

// Hero section with dynamic blobs
const Hero = () => (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-sky-700">
        <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
                {/* Dynamic colored blobs for a modern feel */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full mix-blend-screen opacity-20 filter blur-3xl animate-blob"></div>
                <div className="absolute top-1/2 left-3/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen opacity-20 filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </div>
        <div className="text-center p-8 z-10">
            <motion.h1 
                className="text-6xl md:text-8xl font-extrabold text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Shivani Bhat
            </motion.h1>
            <motion.p 
                className="text-xl md:text-3xl text-sky-200 mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Engineering Student | Embedded Systems & FPGA Enthusiast
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <a href="#contact" className="bg-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-600 transition-all">
                    Get in Touch
                </a>
            </motion.div>
        </div>
    </section>
);

// About section with the professional summary
const About = ({ isDarkMode }) => (
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection>
                <SectionHeading isDarkMode={isDarkMode}>About Me</SectionHeading>
                <p className={`text-lg leading-relaxed text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Driven and passionate engineering student with growing expertise in embedded systems and FPGA development. Contributed to successful team projects. Eager to apply technical foundation in signal processing, IoT, and embedded programming to contribute meaningfully in an entry-level embedded systems engineering role.
                </p>
            </AnimatedSection>
        </div>
    </section>
);

// Experience section with a two-column layout
const Experience = ({ isDarkMode }) => (
    <section id="experience" className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
            <AnimatedSection>
                <SectionHeading isDarkMode={isDarkMode}>Experience</SectionHeading>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-slate-800'}`}>Research Intern</h3>
                        <p className="text-sky-600 dark:text-sky-400 font-medium mb-2">Tata Institute of Fundamental Research</p>
                        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>January 2025 - June 2025 | Mumbai, India</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>Developing a Cosmic Muon Veto Detector using AMD Spartan 7 and Intel Altera Cyclone 4 (Microblaze and NIOS processors).</li>
                            <li>Implementing real-time data acquisition and processing using C, VHDL, and Python.</li>
                            <li>Utilizing Socket Programming for inter-device communication and signal processing for noise reduction and event detection.</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 transition-all hover:scale-[1.02]">
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-slate-800'}`}>Content Intern</h3>
                        <p className="text-sky-600 dark:text-sky-400 font-medium mb-2">Smowcode</p>
                        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>July 2024 - September 2024 | Remote</p>
                        <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>Authored 40+ technical blogs on embedded systems, protocols, microelectronics, communication networks and IoT.</li>
                            <li>Achieved an average SEO score of 97.5%, significantly boosting website traffic and engagement.</li>
                            <li>Researched and simplified complex embedded systems concepts for broader audience accessibility.</li>
                        </ul>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);

// Projects section with a carousel for navigation
const Projects = ({ isDarkMode }) => {
    const [currentProject, setCurrentProject] = useState(0);

    const nextProject = () => {
        setCurrentProject((prev) => (prev + 1) % projectsData.length);
    };

    const prevProject = () => {
        setCurrentProject((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    };

    const project = projectsData[currentProject];

    return (
        <section id="projects" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 max-w-3xl">
                <AnimatedSection>
                    <SectionHeading isDarkMode={isDarkMode}>Key Projects</SectionHeading>
                    <div className="relative flex items-center justify-center">
                        <button 
                            onClick={prevProject} 
                            className="absolute left-0 z-10 p-2 bg-gray-200 dark:bg-slate-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                            aria-label="Previous project"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 w-full"
                            >
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-slate-800'}`}>{project.title}</h3>
                                <p className={`text-gray-700 dark:text-gray-300 mt-4`}>{project.desc}</p>
                            </motion.div>
                        </AnimatePresence>
                        <button 
                            onClick={nextProject} 
                            className="absolute right-0 z-10 p-2 bg-gray-200 dark:bg-slate-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                            aria-label="Next project"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};


// Skills section with categories
const Skills = ({ isDarkMode }) => (
    <section id="skills" className="py-20 md:py-32 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
            <AnimatedSection>
                <SectionHeading isDarkMode={isDarkMode}>Technical Skills</SectionHeading>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <SkillCategory isDarkMode={isDarkMode} title="Languages" skills={["C", "C++", "Python", "Micropython", "Verilog", "VHDL", "Go", "Rust", "Javascript"]} />
                    <SkillCategory isDarkMode={isDarkMode} title="Core Skills" skills={["Embedded Systems Programming", "Signal Processing", "Computer Architecture", "Networking", "Circuit Design", "Bash Shell Scripting", "RTOS", "Image Processing", "HLS Programming"]} />
                    <SkillCategory isDarkMode={isDarkMode} title="Software Tools" skills={["MATLAB", "Proteus", "Scilab", "Vivado", "Kicad", "Quartus Prime", "LTSpice"]} />
                </div>
            </AnimatedSection>
        </div>
    </section>
);

const SkillCategory = ({ title, skills, isDarkMode }) => (
    <div className={`p-6 rounded-lg shadow-md border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
        <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>{title}</h4>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span key={index} className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

// Contact section with social links
const Contact = ({ isDarkMode }) => (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection>
                <SectionHeading isDarkMode={isDarkMode}>Contact</SectionHeading>
                <div className={`text-center space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p className="text-lg">
                        I'm always open to new opportunities. Feel free to connect with me!
                    </p>
                    <div className="flex justify-center items-center space-x-6 text-2xl">
                        <a href="mailto:shivani.gbhat@gmail.com" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors" aria-label="Email me">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="https://github.com/shivanibhat24" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors" aria-label="Github profile">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/shivani-gbhat" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors" aria-label="LinkedIn profile">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                    <p className={`text-sm mt-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Made with ❤️ by Shivani Bhat
                    </p>
                </div>
            </AnimatedSection>
        </div>
    </section>
);

// Main App component
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

    useEffect(() => {
        // Check for user's system preference on mount
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
    }, []);

    // Custom CSS for animations. In a real project, this would be in a CSS file.
    return (
        <div className={`${isDarkMode ? 'dark' : ''} bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
            {/* The following links would typically not be used in a production Next.js app,
                as you would install the dependencies via npm and import them. This is
                for demonstration and single-file usability. */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/framer-motion@10.12.16/dist/framer-motion.min.js"></script>
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    scroll-behavior: smooth;
                }
                html {
                    scroll-padding-top: 5rem;
                }
                
                /* Custom blob animations for the Hero section */
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                `}
            </style>
            <Header isDarkMode={isDarkMode} />
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <main>
                <Hero />
                <About isDarkMode={isDarkMode} />
                <Experience isDarkMode={isDarkMode} />
                <Projects isDarkMode={isDarkMode} />
                <Skills isDarkMode={isDarkMode} />
                <Contact isDarkMode={isDarkMode} />
            </main>
        </div>
    );
}

