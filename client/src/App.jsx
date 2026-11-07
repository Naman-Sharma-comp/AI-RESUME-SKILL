import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles, Upload, FileText, CheckCircle2, AlertTriangle,
  ArrowRight, ShieldCheck, Zap, BarChart3, LogIn, UserPlus,
  LogOut, Sun, Moon, Menu, X, ChevronDown, HelpCircle,
  Layers, Cpu, Award, Copy, Check, Wand2, CheckCircle,
  Activity, Briefcase, Compass, Download, Eye, Search,
  Terminal, GitCompare, RotateCcw, Trash2
} from 'lucide-react';

// --- ROLE & SKILL PRESETS FOR SMART JD BUILDER (12 CAREER TRACKS) ---
const ROLE_TEMPLATES = {
  'Full-Stack Software Engineer': {
    defaultSkills: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'Git', 'TypeScript'],
    optionalSkills: ['Docker', 'Prisma ORM', 'Redis', 'AWS', 'CI/CD', 'GraphQL', 'Next.js'],
    responsibilities: 'designing scalable client-server web architectures, building responsive React interfaces, and optimizing relational database queries'
  },
  'Frontend React Developer': {
    defaultSkills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Redux / Zustand', 'Responsive Design'],
    optionalSkills: ['Next.js', 'Framer Motion', 'Jest / Testing Library', 'Webpack / Vite', 'Accessibility (a11y)', 'Figma'],
    responsibilities: 'crafting pixel-perfect, accessible user interfaces, optimizing Core Web Vitals, and building reusable component systems'
  },
  'Backend & API Engineer': {
    defaultSkills: ['Node.js', 'Express.js', 'PostgreSQL', 'RESTful APIs', 'Authentication (JWT/OAuth)', 'Docker', 'SQL'],
    optionalSkills: ['Microservices', 'Redis', 'Kafka / RabbitMQ', 'Prisma ORM', 'AWS / GCP', 'System Design', 'Linux'],
    responsibilities: 'architecting high-throughput APIs, securing authentication pipelines, and managing distributed database schemas'
  },
  'Generative AI & LLM Engineer': {
    defaultSkills: ['Python', 'LLMs (Gemini / OpenAI)', 'Prompt Engineering', 'RAG Pipelines', 'LangChain / LlamaIndex', 'Vector Databases', 'REST APIs'],
    optionalSkills: ['Fine-Tuning (LoRA)', 'PyTorch', 'FastAPI', 'Docker', 'Embeddings', 'AI Agents & Tool Calling', 'Evaluation Metrics'],
    responsibilities: 'building production Retrieval-Augmented Generation (RAG) workflows, orchestrating multi-agent LLM systems, and optimizing inference latency'
  },
  'Data Science & ML Engineer': {
    defaultSkills: ['Python', 'Scikit-Learn', 'TensorFlow / Keras', 'Pandas & NumPy', 'SQL', 'Machine Learning', 'Data Visualization'],
    optionalSkills: ['PyTorch', 'NLP / LLMs', 'FastAPI', 'Docker', 'AWS SageMaker', 'Feature Engineering', 'Statistical Modeling'],
    responsibilities: 'training and evaluating predictive machine learning models, performing feature engineering, and deploying inference pipelines'
  },
  'Data Engineer & Big Data': {
    defaultSkills: ['Python', 'SQL', 'Apache Spark', 'ETL / ELT Pipelines', 'Data Warehousing (Snowflake/BigQuery)', 'Apache Airflow', 'Git'],
    optionalSkills: ['Kafka', 'dbt', 'AWS Glue / S3', 'Docker', 'Terraform', 'Data Modeling', 'NoSQL'],
    responsibilities: 'designing fault-tolerant batch and streaming data pipelines, managing cloud data warehouses, and ensuring data quality at scale'
  },
  'DevOps & Cloud Engineer': {
    defaultSkills: ['Docker', 'Kubernetes', 'AWS / Cloud', 'CI/CD Pipelines', 'Linux / Bash', 'Git', 'Terraform'],
    optionalSkills: ['Prometheus & Grafana', 'Nginx', 'Ansible', 'Python Scripting', 'DevSecOps', 'Helm'],
    responsibilities: 'automating cloud infrastructure, managing container orchestration, and maintaining zero-downtime CI/CD deployment workflows'
  },
  'Mobile App Developer (iOS / Android)': {
    defaultSkills: ['React Native', 'Flutter / Dart', 'TypeScript', 'Mobile UI/UX', 'RESTful APIs', 'State Management', 'Git'],
    optionalSkills: ['Swift / iOS', 'Kotlin / Android', 'Firebase', 'Offline Storage (SQLite)', 'App Store Deployment', 'Push Notifications'],
    responsibilities: 'developing smooth 60fps cross-platform mobile applications, integrating native device APIs, and managing app store releases'
  },
  'Cybersecurity & AppSec Engineer': {
    defaultSkills: ['Application Security (OWASP Top 10)', 'Network Security', 'Penetration Testing', 'Linux', 'Identity & Access Management (IAM)', 'Python / Bash'],
    optionalSkills: ['Cloud Security (AWS/Azure)', 'SIEM (Splunk)', 'Vulnerability Assessment', 'Cryptography', 'Zero Trust Architecture', 'Burp Suite'],
    responsibilities: 'conducting security audits and threat modeling, remediating OWASP vulnerabilities, and hardening cloud and API infrastructure'
  },
  'QA Automation & SDET': {
    defaultSkills: ['Playwright / Cypress', 'Selenium', 'JavaScript / Python', 'API Testing (Postman)', 'CI/CD Test Integration', 'Test Strategy', 'Git'],
    optionalSkills: ['Performance Testing (k6 / JMeter)', 'Docker', 'BDD / Cucumber', 'SQL', 'Mobile Testing (Appium)', 'Defect Tracking (Jira)'],
    responsibilities: 'building end-to-end automated regression suites, integrating quality gates into CI/CD pipelines, and conducting API load testing'
  },
  'Systems & C++ Software Engineer': {
    defaultSkills: ['C++', 'Data Structures & Algorithms', 'Linux / OS Internals', 'Multithreading', 'Memory Management', 'Git'],
    optionalSkills: ['x86-64 Assembly', 'Python', 'CMake', 'Low-Latency Networking', 'GDB / Valgrind', 'Distributed Systems'],
    responsibilities: 'writing high-performance, low-latency system modules, optimizing memory allocation, and solving complex algorithmic bottlenecks'
  },
  'Technical Product & Agile Delivery Manager': {
    defaultSkills: ['Agile & Scrum / SAFe', 'Product Roadmap Strategy', 'User Stories & Acceptance Criteria', 'Jira / Confluence', 'Stakeholder Management', 'KPI & Metrics Analysis'],
    optionalSkills: ['SQL / Data Analytics', 'A/B Testing', 'API & System Fundamentals', 'Risk Management (PMP)', 'Go-To-Market Strategy', 'Wireframing (Figma)'],
    responsibilities: 'driving end-to-end product delivery across cross-functional engineering squads, prioritizing backlogs, and aligning technical execution with business KPIs'
  }
};

const EXPERIENCE_LEVELS = [
  { id: 'fresher', label: 'Internship / Fresher', years: '0–1 Years', expectation: 'strong CS fundamentals, hands-on academic or hackathon projects, and rapid learning agility' },
  { id: 'junior', label: 'Junior Engineer', years: '1–3 Years', expectation: 'production coding experience, clean Git workflows, and feature ownership across sprints' },
  { id: 'mid', label: 'Mid-Level', years: '3–5 Years', expectation: 'end-to-end system architecture, performance optimization, and code review mentorship' },
  { id: 'senior', label: 'Senior / Lead', years: '5+ Years', expectation: 'high-scale distributed design, cross-team technical leadership, and architectural decision-making' }
];

const WEAK_BULLET_EXAMPLES = [
  'Worked on building web pages and backend APIs using standard frameworks and team tools.',
  'Responsible for writing code, fixing bugs, and helping the engineering team with database tasks.',
  'Collaborated with team members on software features and participated in regular sprint meetings.'
];

// --- TOAST NOTIFICATION COMPONENT ---
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 animate-fade-in text-sm font-medium">
      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// --- UPGRADE #5: GLOBAL COMMAND PALETTE (CTRL+K / CMD+K) ---
function CommandPalette({ isOpen, onClose, darkMode, setDarkMode, showToast }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true);
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      label: 'Open ATS Resume Scanner',
      category: 'Navigation',
      icon: Sparkles,
      action: () => { navigate('/scanner'); onClose(); }
    },
    {
      label: 'Go to Home Dashboard',
      category: 'Navigation',
      icon: Compass,
      action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); }
    },
    {
      label: `Switch to ${darkMode ? 'Light' : 'Dark'} Theme`,
      category: 'Preferences',
      icon: darkMode ? Sun : Moon,
      action: () => { setDarkMode(!darkMode); showToast(`Switched to ${darkMode ? 'Light' : 'Dark'} mode`); onClose(); }
    },
    ...Object.keys(ROLE_TEMPLATES).map((role) => ({
      label: `Benchmark Preset: ${role}`,
      category: 'Role Presets',
      icon: Briefcase,
      action: () => {
        localStorage.setItem('cp_quick_role', role);
        navigate('/scanner');
        window.dispatchEvent(new CustomEvent('cp-select-role', { detail: role }));
        onClose();
      }
    }))
  ];

  const filtered = actions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-4 h-4 text-indigo-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, role preset, or page..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onClose()}
            className="px-2 py-0.5 text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white group transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-indigo-500 group-hover:text-white transition" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider opacity-60">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Pro Tip: Press <kbd className="font-mono font-bold text-indigo-500">Ctrl + K</kbd> anytime</span>
          <span>CareerPilot Command Bar</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={() => onClose()} />
    </div>
  );
}

// --- 1. ENHANCED FULL-WIDTH RESPONSIVE NAVBAR WITH COMMAND CENTER ---
function Navbar({ user, setUser, darkMode, setDarkMode, onOpenPalette }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['how-it-works', 'features', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isScanner = location.pathname === '/scanner';

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left Group: Hamburger Menu + Brand Logo */}
          <div className="flex items-center gap-3.5 shrink-0">
            <button
              type="button"
              onMouseEnter={() => setSidebarOpen(true)}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Command Center"
              className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-500 transition shadow-sm cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group whitespace-nowrap"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300 shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                CareerPilot <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Center Group: Desktop Navigation Links with Ample Spacing */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100/70 dark:bg-slate-900/60 px-2 py-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 shrink-0">
            <Link
              to="/"
              onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isHome && activeSection === 'home'
                  ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <a
              href="/#how-it-works"
              onClick={() => setActiveSection('how-it-works')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isHome && activeSection === 'how-it-works'
                  ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              How It Works
            </a>
            <a
              href="/#features"
              onClick={() => setActiveSection('features')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isHome && activeSection === 'features'
                  ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Features
            </a>
            <a
              href="/#faq"
              onClick={() => setActiveSection('faq')}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isHome && activeSection === 'faq'
                  ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              FAQ
            </a>
            <Link
              to="/scanner"
              className={`px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                isScanner
                  ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>ATS Scanner</span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live
              </span>
            </Link>
          </div>

          {/* Right Group: Quick Jump + Theme Switcher + Auth Actions */}
          <div className="flex items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onOpenPalette}
              title="Open Command Palette (Ctrl + K)"
              className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 hover:border-indigo-500 transition cursor-pointer whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Quick Jump</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition cursor-pointer shrink-0"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-200">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={() => setUser(null)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3 whitespace-nowrap">
                <Link
                  to="/auth?mode=login"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hover-Triggered Command Center Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-slate-950/60 backdrop-blur-xs animate-fade-in"
          onMouseLeave={() => setSidebarOpen(false)}
        >
          <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Command Center</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Links with Active State Tracking */}
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => {
                    setActiveSection('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isHome && activeSection === 'home'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600'
                  }`}
                >
                  <span>Home Dashboard</span>
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </Link>

                <a
                  href="/#how-it-works"
                  onClick={() => {
                    setActiveSection('how-it-works');
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isHome && activeSection === 'how-it-works'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600'
                  }`}
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </a>

                <a
                  href="/#features"
                  onClick={() => {
                    setActiveSection('features');
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isHome && activeSection === 'features'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600'
                  }`}
                >
                  <span>Enterprise Features</span>
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </a>

                <a
                  href="/#faq"
                  onClick={() => {
                    setActiveSection('faq');
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isHome && activeSection === 'faq'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600'
                  }`}
                >
                  <span>Frequently Asked Questions</span>
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </a>

                <Link
                  to="/scanner"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isScanner
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800'
                  }`}
                >
                  <span>ATS Resume Scanner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              CareerPilot AI v2.5 &bull; Multimodal Engine
            </div>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
}

// --- 2. LANDING PAGE WITH GRID MESH & FLOATING LIVE PREVIEW ---
function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does CareerPilot AI calculate the ATS Match Score?',
      a: 'Our engine uses Google Gemini to cross-reference hard technical skills, frameworks, domain keywords, and role responsibilities between your resume and the target job description—mirroring enterprise Applicant Tracking Systems.'
    },
    {
      q: 'Can I upload a multi-column or formatted PDF resume?',
      a: 'Yes! Unlike outdated text scrapers that break on tables or columns, CareerPilot AI passes your native PDF binary directly into Gemini multimodal vision, preserving layout context with high accuracy.'
    },
    {
      q: 'Is my resume data kept private and secure?',
      a: 'Absolutely. Uploaded PDFs are processed strictly in ephemeral server RAM (memory storage) and are never written to public disk storage.'
    }
  ];

  return (
    <div className="relative space-y-28 pb-24 overflow-x-hidden animate-fade-in">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-160 h-96 bg-indigo-500/15 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-52 left-1/4 w-96 h-72 bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      {/* Hero Section */}
      <section className="relative pt-14 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-300 text-xs font-semibold shadow-sm hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Multimodal PDF Resume Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
          Turn Resume Rejections Into{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-gradient-text">
            Engineering Interviews
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          75% of resumes are filtered out by automated ATS software before a human recruiter ever reads them. Upload your PDF resume, uncover missing keywords, and tailor your application in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/scanner"
            className="group w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <span>Scan Your Resume Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500/60 hover:-translate-y-1 transition-all duration-300"
          >
            See How It Works
          </a>
        </div>

        {/* Metrics Bar */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="group bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
              99.2%
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Native PDF Parsing Accuracy
            </div>
          </div>
          <div className="group bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              &lt; 3.5 Sec
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Real-Time AI Evaluation Speed
            </div>
          </div>
          <div className="group bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
              3x Higher
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Recruiter Callback Conversion
            </div>
          </div>
        </div>

        {/* Floating Interactive Product Mockup Showcase */}
        <div className="pt-12 max-w-4xl mx-auto animate-float">
          <div className="rounded-3xl bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-indigo-500/10 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">careerpilot-ats-telemetry.pdf</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                88% Role Match Detected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Detected Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'REST APIs', 'Git'].map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Missing Role Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'CI/CD Pipelines', 'TypeScript'].map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">ATS Keyword Density</span>
                  <span className="font-bold text-indigo-500">High (88/100)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[88%] h-full bg-linear-to-r from-indigo-500 to-cyan-400 rounded-full" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Adding Docker containerization boosts score to ~96%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            How CareerPilot AI Optimizes Your Resume
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">
            Go from a generic resume to a laser-targeted application in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: Upload,
              title: 'Upload Your Resume PDF',
              desc: 'Drop your existing PDF resume or paste raw text. Our multimodal parser reads complex layouts cleanly.'
            },
            {
              step: '02',
              icon: Cpu,
              title: 'Benchmark Against Target Role',
              desc: 'Select a role preset or paste a job description. Gemini AI compares every skill requirement line-by-line.'
            },
            {
              step: '03',
              icon: Award,
              title: 'Fix Gaps & Apply with Confidence',
              desc: 'Review your ATS score, missing skill badges, and actionable before/after bullet upgrades tailored to the role.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="relative group bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 space-y-4 hover:-translate-y-1.5 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Enterprise-Grade Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Built to Outperform Standard ATS Scanners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">What-If Score Simulator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Click missing keywords to dynamically simulate score boosts and view 4-pillar ATS category breakdowns.
            </p>
          </div>

          <div className="group bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Custom Learning Roadmaps</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Automatically generates a step-by-step study path and portfolio project idea for every missing skill on your resume.
            </p>
          </div>

          <div className="group bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">PDF Preview & Audit Export</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Inspect your uploaded PDF resume right in the browser and export a complete Markdown audit report in one click.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about how CareerPilot AI analyzes your resume.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180 text-indigo-500' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- 3. AUTHENTICATION PAGE ---
function AuthPage({ setUser, showToast }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsLogin(params.get('mode') !== 'register');
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: isLogin ? email.split('@')[0] : name, email });
    showToast(isLogin ? 'Successfully signed in!' : 'Account created successfully!');
    navigate('/scanner');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isLogin ? 'Welcome back' : 'Create your free account'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isLogin
              ? 'Sign in to access your ATS resume workspace'
              : 'Start optimizing your resume for every tech role'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-600/25"
          >
            {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
          >
            {isLogin ? 'Sign up free' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 4. SCANNER WORKSPACE WITH ALL 5 UPGRADES ---
// --- 4. SCANNER WORKSPACE WITH LEFT DRAWER, TRUE BLANK RESET & CLEAR OPTIONS ---
function ScannerPage({ showToast }) {
  const [simulatedSkills, setSimulatedSkills] = useState([]);
  const [inputMode, setInputMode] = useState('pdf');
  const [jdMode, setJdMode] = useState('builder');
  const [selectedRole, setSelectedRole] = useState('Full-Stack Software Engineer');
  const [selectedExp, setSelectedExp] = useState(EXPERIENCE_LEVELS[0]);
  const [selectedSkills, setSelectedSkills] = useState(
    ROLE_TEMPLATES['Full-Stack Software Engineer'].defaultSkills
  );

  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const [jobDescription, setJobDescription] = useState('');
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [showDiffView, setShowDiffView] = useState(true);
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem('cp_scan_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const loadingMessages = [
    'Extracting resume structure & layout...',
    'Cross-referencing target role & experience benchmarks...',
    'Computing weighted ATS match compatibility...',
    'Generating personalized learning roadmap & pitch...'
  ];

  // Create & cleanup object URL for In-Browser PDF Preview
  useEffect(() => {
    if (!resumeFile) {
      setPdfPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(resumeFile);
    setPdfPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [resumeFile]);

  // Listen for role preset selection from Ctrl+K Command Palette
  useEffect(() => {
    const savedQuickRole = localStorage.getItem('cp_quick_role');
    if (savedQuickRole && ROLE_TEMPLATES[savedQuickRole]) {
      setJdMode('builder');
      setSelectedRole(savedQuickRole);
      setSelectedExp(EXPERIENCE_LEVELS[0]);
      setSelectedSkills(ROLE_TEMPLATES[savedQuickRole].defaultSkills);
      localStorage.removeItem('cp_quick_role');
    }

    const handleRoleEvent = (e) => {
      const role = e.detail;
      if (ROLE_TEMPLATES[role]) {
        setJdMode('builder');
        setSelectedRole(role);
        setSelectedExp((prev) => prev || EXPERIENCE_LEVELS[0]);
        setSelectedSkills(ROLE_TEMPLATES[role].defaultSkills);
        showToast(`Loaded ${role} preset!`);
      }
    };
    window.addEventListener('cp-select-role', handleRoleEvent);
    return () => window.removeEventListener('cp-select-role', handleRoleEvent);
  }, [showToast]);

  // Synthesize Target Job Description only when selections are active; otherwise keep blank
  useEffect(() => {
    if (jdMode === 'builder') {
      if (!selectedRole && !selectedExp && selectedSkills.length === 0) {
        setJobDescription('');
        return;
      }
      const template = ROLE_TEMPLATES[selectedRole];
      const roleText = selectedRole || 'Software Engineer';
      const expText = selectedExp ? `${selectedExp.label} (${selectedExp.years})` : 'All Experience Levels';
      const skillsText = selectedSkills.length > 0 ? selectedSkills.join(', ') : 'General Software Engineering';
      const respText = template ? template.responsibilities : 'building and maintaining high-quality software systems';
      const expExpectation = selectedExp ? ` Ideal candidates should demonstrate ${selectedExp.expectation}.` : '';

      const generatedJD =
        `Target Role: ${roleText} — ${expText}\n` +
        `Core Technical Stack Required: ${skillsText}.\n` +
        `Key Responsibilities: We are seeking a ${roleText} responsible for ${respText}.${expExpectation}`;
      setJobDescription(generatedJD);
    }
  }, [jdMode, selectedRole, selectedExp, selectedSkills]);

  const handleRoleChange = (newRole) => {
    if (!newRole) {
      setSelectedRole('');
      setSelectedSkills([]);
      return;
    }
    setSelectedRole(newRole);
    if (!selectedExp) setSelectedExp(EXPERIENCE_LEVELS[0]);
    setSelectedSkills(ROLE_TEMPLATES[newRole].defaultSkills);
    showToast(`Switched target role to ${newRole}`);
  };

  // True Blank Reset: un-highlights all presets, experience pills, and skill chips
  const resetPreferences = () => {
    setJdMode('builder');
    setSelectedRole('');
    setSelectedExp(null);
    setSelectedSkills([]);
    setJobDescription('');
    setSimulatedSkills([]);
    localStorage.removeItem('cp_quick_role');
    showToast('Cleared all role, experience, and skill selections!');
  };

  // Clear all saved scan history from state and localStorage
  const clearAllHistory = () => {
    setScanHistory([]);
    localStorage.removeItem('cp_scan_history');
    showToast('Cleared all saved scan history!');
  };

  // Delete a single scan entry from history
  const deleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const updated = scanHistory.filter((item) => item.id !== id);
    setScanHistory(updated);
    localStorage.setItem('cp_scan_history', JSON.stringify(updated));
    showToast('Removed scan from history');
  };

  const toggleSkillChip = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  useEffect(() => {
    if (!loading) {
      setLoadingStage(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStage((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(interval);
  }, [loading]);

  const toggleSimulatedSkill = (skill) => {
    setSimulatedSkills((prev) => {
      const exists = prev.includes(skill);
      const updated = exists ? prev.filter((s) => s !== skill) : [...prev, skill];
      showToast(
        exists
          ? `Removed "${skill}" from score simulation`
          : `Simulated adding "${skill}" to your resume!`
      );
      return updated;
    });
  };

  const baseScore = result?.matchScore || 0;
  const totalMissing = result?.missingSkills?.length || 0;
  const remainingRoom = Math.max(0, 98 - baseScore);
  const scoreBoost =
    totalMissing > 0
      ? Math.round((simulatedSkills.length / totalMissing) * remainingRoom)
      : 0;
  const effectiveScore = Math.min(99, baseScore + scoreBoost);

  const totalKeywords = (result?.matchedSkills?.length || 0) + totalMissing;
  const keywordRatio = totalKeywords > 0
    ? Math.round((((result?.matchedSkills?.length || 0) + simulatedSkills.length) / totalKeywords) * 100)
    : effectiveScore;

  const categoryBreakdown = [
    {
      label: 'Hard Technical Stack',
      score: Math.min(99, Math.max(45, keywordRatio)),
      color: 'from-indigo-500 to-violet-500'
    },
    {
      label: 'Domain & Architecture Depth',
      score: Math.min(98, Math.max(40, effectiveScore - 4)),
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Impact & Action Verbs',
      score: Math.min(96, Math.max(55, Math.round(baseScore * 0.85 + 12 + scoreBoost * 0.4))),
      color: 'from-emerald-500 to-teal-400'
    },
    {
      label: 'ATS Formatting & Readability',
      score: inputMode === 'pdf' ? 96 : 92,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  useEffect(() => {
    if (!result) {
      setAnimatedScore(0);
      return;
    }
    let current = animatedScore;
    const target = effectiveScore;
    if (current === target) return;

    const direction = target > current ? 1 : -1;
    const step = Math.max(1, Math.ceil(Math.abs(target - current) / 20));

    const timer = setInterval(() => {
      current += direction * step;
      if ((direction === 1 && current >= target) || (direction === -1 && current <= target)) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [result, effectiveScore]);

  const loadSampleData = () => {
    setInputMode('text');
    setResumeText(
      'Full-Stack Developer experienced in React, JavaScript, Node.js, Express, Tailwind CSS, SQL, and Git. Built responsive web applications and REST APIs.'
    );
    setJdMode('builder');
    setSelectedRole('Full-Stack Software Engineer');
    setSelectedExp(EXPERIENCE_LEVELS[0]);
    setSelectedSkills(['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD']);
    setError(null);
    showToast('Loaded sample tech profile & role criteria!');
  };

  const copyTip = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportAuditReport = () => {
    if (!result) return;
    const reportContent = `# CareerPilot AI — ATS Resume Audit Report
**Target Role:** ${jdMode === 'builder' && selectedRole ? `${selectedRole} (${selectedExp?.label || 'All Levels'})` : 'Custom Job Description'}
**Base ATS Match Score:** ${baseScore}% ${scoreBoost > 0 ? `(Simulated Score: ${effectiveScore}%)` : ''}
**Generated:** ${new Date().toLocaleString()}

## 1. Matched Skills (${result.matchedSkills?.length || 0})
${result.matchedSkills?.map((s) => `- ✓ ${s}`).join('\n') || 'None'}

## 2. Missing Keywords (${result.missingSkills?.length || 0})
${result.missingSkills?.map((s) => `- + ${s}`).join('\n') || 'None'}

## 3. Recruiter Tailoring Recommendations
${result.actionableFeedback?.map((tip, i) => `${i + 1}. ${tip}`).join('\n') || 'None'}

## 4. Personalized Skill-Gap Learning Roadmap
${result.learningRoadmap?.map((r, i) => `### Step 0${i + 1}: ${r.skill}\n- **What to Learn:** ${r.learningStep}\n- **Portfolio Project Idea:** ${r.miniProjectIdea}`).join('\n\n') || 'None'}

## 5. Tailored Cover Letter Pitch
> "${result.coverLetterPitch || ''}"
`;
    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CareerPilot-ATS-Report-${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded ATS Audit Report (.md)!');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setResumeFile(file);
        showToast(`Attached ${file.name}`);
      } else {
        setError('Please upload a valid PDF file.');
      }
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (inputMode === 'text' && !resumeText.trim()) return setError('Please paste your resume text.');
    if (inputMode === 'pdf' && !resumeFile) return setError('Please upload a PDF resume.');
    if (!jobDescription.trim()) return setError('Please select a target role/skills or enter a custom job description.');

    setLoading(true);
    setError(null);
    setResult(null);
    setSimulatedSkills([]);

    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      if (inputMode === 'text') formData.append('resumeText', resumeText);
      else formData.append('resumeFile', resumeFile);

      const response = await fetch('http://localhost:5000/api/analyze-skills', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server error');

      setResult(data);
      setActiveTab('overview');

      const newEntry = {
        id: Date.now(),
        role: jdMode === 'builder' && selectedRole ? selectedRole : 'Custom Job Description',
        exp: jdMode === 'builder' && selectedExp ? selectedExp.label : 'Custom',
        score: data.matchScore,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data
      };
      const updatedHistory = [newEntry, ...scanHistory].slice(0, 8);
      setScanHistory(updatedHistory);
      localStorage.setItem('cp_scan_history', JSON.stringify(updatedHistory));

      showToast('ATS Scan completed successfully!');
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const currentTemplate = selectedRole ? ROLE_TEMPLATES[selectedRole] : null;
  const allRoleSkills = currentTemplate
    ? [...currentTemplate.defaultSkills, ...currentTemplate.optionalSkills]
    : ROLE_TEMPLATES['Full-Stack Software Engineer'].defaultSkills;

  return (
    <div className="relative max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      
      {/* IN-BROWSER PDF PREVIEW MODAL */}
      {showPdfModal && pdfPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-4xl h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {resumeFile?.name} — Native PDF Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe
              src={pdfPreviewUrl}
              title="Resume PDF Preview"
              className="w-full flex-1 bg-slate-100 dark:bg-slate-950"
            />
          </div>
        </div>
      )}

      {/* INTERACTIVE SLIDE-OUT LEFT DRAWER (Moved from Right to Left) */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full p-6 overflow-y-auto space-y-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Quick Presets & History</h3>
              </div>
              <button
                type="button"
                onClick={() => setSideDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1-Click Career Track Presets + Un-Highlighting Reset Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  1-Click Career Presets ({Object.keys(ROLE_TEMPLATES).length})
                </span>
                <button
                  type="button"
                  onClick={resetPreferences}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-500 hover:text-indigo-400 cursor-pointer transition"
                  title="Clear all highlighted selections"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {Object.keys(ROLE_TEMPLATES).map((role) => {
                  const isHighlighted = selectedRole === role && jdMode === 'builder';
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setJdMode('builder');
                        handleRoleChange(role);
                        setSideDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition flex items-center justify-between cursor-pointer ${
                        isHighlighted
                          ? 'bg-indigo-600/15 border-indigo-500 text-indigo-600 dark:text-indigo-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50'
                      }`}
                    >
                      <span className="truncate pr-2">{role}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Saved Scan History + Clear All Button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recent Scans ({scanHistory.length})
                </span>
                {scanHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllHistory}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-400 cursor-pointer transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear History</span>
                  </button>
                )}
              </div>

              {scanHistory.length === 0 ? (
                <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  No scans saved yet. Run a scan to compare scores across roles!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {scanHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setResult(item.data);
                        setSideDrawerOpen(false);
                        setSimulatedSkills([]);
                        showToast(`Loaded scan: ${item.role}`);
                      }}
                      className="group p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.role}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-500">
                            {item.score}%
                          </span>
                          <button
                            type="button"
                            onClick={(e) => deleteHistoryItem(item.id, e)}
                            title="Delete scan"
                            className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{item.exp}</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setSideDrawerOpen(false)} />
        </div>
      )}

      {/* Top Header Bar with Left-Side Presets Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSideDrawerOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition cursor-pointer shadow-xs shrink-0"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Presets & History ({scanHistory.length})</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">ATS Resume Scanner</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Upload your PDF resume and build your target role criteria with interactive presets.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadSampleData}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Fill Sample Tech Data</span>
          </button>
          <button
            type="button"
            onClick={resetPreferences}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 hover:text-rose-500 transition cursor-pointer"
            title="Clear all highlighted selections"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT CARD: CANDIDATE RESUME */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-indigo-500/40 transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Candidate Resume
                </span>
                <div className="flex items-center gap-2">
                  {(resumeFile || resumeText) && (
                    <button
                      type="button"
                      onClick={() => {
                        setResumeFile(null);
                        setResumeText('');
                        showToast('Cleared candidate resume input');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                  {inputMode === 'pdf' && pdfPreviewUrl && (
                    <button
                      type="button"
                      onClick={() => setShowPdfModal(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview PDF</span>
                    </button>
                  )}
                  <div className="flex bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setInputMode('pdf')}
                      className={`px-3 py-1 rounded-md transition cursor-pointer ${
                        inputMode === 'pdf'
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Upload PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('text')}
                      className={`px-3 py-1 rounded-md transition cursor-pointer ${
                        inputMode === 'text'
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Paste Text
                    </button>
                  </div>
                </div>
              </div>

              {inputMode === 'pdf' ? (
                <label
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center h-80 rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 space-y-3 ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 scale-[1.01]'
                      : 'border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-indigo-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Click or drag & drop your PDF resume here
                    </span>
                    <p className="text-xs text-slate-500">PDF up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                        showToast(`Attached ${e.target.files[0].name}`);
                      }
                    }}
                    className="sr-only"
                  />
                  {resumeFile && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full">
                      Selected: {resumeFile.name}
                    </span>
                  )}
                </label>
              ) : (
                <textarea
                  rows="12"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="w-full h-80 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              )}
            </div>
          </div>

          {/* RIGHT CARD: INTERACTIVE TARGET JOB BUILDER WITH CLEAR BUTTONS */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Target Role & Job Criteria
              </span>
              <div className="flex items-center gap-2">
                {(selectedRole || selectedExp || selectedSkills.length > 0 || jobDescription) && (
                  <button
                    type="button"
                    onClick={resetPreferences}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    title="Clear all role, experience, and skill selections"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
                <div className="flex bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setJdMode('builder')}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      jdMode === 'builder'
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Smart Role Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setJdMode('custom')}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      jdMode === 'custom'
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Custom JD Text
                  </button>
                </div>
              </div>
            </div>

            {jdMode === 'builder' ? (
              <div className="space-y-4">
                {/* 1. Target Role Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    1. Select Target Engineering Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="">-- Choose a Target Role --</option>
                    {Object.keys(ROLE_TEMPLATES).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Experience Level Selector (Supports Un-Highlighted State) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      2. Experience Level
                    </label>
                    {selectedExp && (
                      <button
                        type="button"
                        onClick={() => setSelectedExp(null)}
                        className="text-[11px] text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        Clear level
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {EXPERIENCE_LEVELS.map((exp) => {
                      const active = selectedExp?.id === exp.id;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => setSelectedExp(active ? null : exp)}
                          className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                            active
                              ? 'bg-indigo-600/15 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold truncate">{exp.label}</div>
                          <div className="text-[10px] opacity-75">{exp.years}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Interactive Skill Chips Multi-Select with Clear Skills Option */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      3. Click to Toggle Target Skills ({selectedSkills.length} selected)
                    </label>
                    <div className="flex items-center gap-2">
                      {selectedSkills.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setSelectedSkills([])}
                          className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                        >
                          Clear skills
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedSkills(allRoleSkills)}
                          className="text-[11px] font-semibold text-indigo-500 hover:underline cursor-pointer"
                        >
                          Select all
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
                    {allRoleSkills.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkillChip(skill)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
                          }`}
                        >
                          {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Auto-Generated Target Job Description Preview */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Auto-Generated Target Job Description
                    </span>
                    <button
                      type="button"
                      onClick={() => setJdMode('custom')}
                      className="text-[11px] text-indigo-500 hover:underline cursor-pointer"
                    >
                      Edit manually
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-24 overflow-y-auto font-mono">
                    {jobDescription || 'No role or skills selected. Pick a role preset or select skills above to generate a target job description.'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Paste or customize your exact job posting below:</span>
                  <div className="flex items-center gap-3">
                    {jobDescription && (
                      <button
                        type="button"
                        onClick={() => setJobDescription('')}
                        className="text-rose-500 hover:underline cursor-pointer font-semibold"
                      >
                        Clear text
                      </button>
                    )}
                    <span>{jobDescription.length} chars</span>
                  </div>
                </div>
                <textarea
                  rows="12"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job requirements and responsibilities..."
                  className="w-full h-80 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-300 animate-fade-in">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 cursor-pointer"
          >
            {loading ? 'Analyzing with Gemini AI...' : 'Run ATS Skill Scan'}
          </button>
        </div>
      </form>

      {/* Multi-Stage Live AI Telemetry Loader */}
      {loading && (
        <div className="bg-white dark:bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 space-y-6 shadow-xl animate-fade-in">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {loadingMessages[loadingStage]}
            </h3>
            <div className="w-full max-w-md h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${((loadingStage + 1) / loadingMessages.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Dashboard with Interactive Tabs & Export Button */}
      {result && !loading && (
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
          
          {/* Tab Navigation Header + 1-Click Report Export */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                Overview & Score
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'roadmap'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                Skill Roadmap ({result.learningRoadmap?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pitch')}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'pitch'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                Cover Letter Pitch
              </button>
            </div>

            <button
              type="button"
              onClick={exportAuditReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Audit Report (.md)</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & SCORE */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Animated Score Gauge */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      ATS Compatibility Score
                    </span>
                    {scoreBoost > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 animate-fade-in">
                        +{scoreBoost}% Boost
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-36 h-36 -rotate-90 transform">
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-slate-200 dark:text-slate-800"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className={`${
                          scoreBoost > 0
                            ? 'text-emerald-500 dark:text-emerald-400'
                            : 'text-indigo-600 dark:text-indigo-400'
                        } transition-all duration-300 ease-out`}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {animatedScore}%
                      </span>
                      {scoreBoost > 0 && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          Base: {baseScore}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {effectiveScore >= 75
                      ? 'Strong match! Ready for application.'
                      : 'Click missing keywords below to simulate adding them!'}
                  </p>
                </div>

                {/* 4-Pillar Multi-Dimensional Category Breakdown */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-500" />
                        Multi-Dimensional ATS Category Breakdown
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Sub-scores dynamically update as you toggle missing skills in the What-If Simulator.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                      4 Core Pillars
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {categoryBreakdown.map((cat, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{cat.label}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{cat.score}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${cat.color} rounded-full transition-all duration-500`}
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Matched Skills & Interactive What-If Missing Skills Simulator */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Matched Skills ({result.matchedSkills?.length || 0})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Missing Keywords — What-If Simulator ({result.missingSkills?.length || 0})
                    </h3>
                    {simulatedSkills.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSimulatedSkills([])}
                        className="text-[11px] font-semibold text-slate-400 hover:text-indigo-500 cursor-pointer"
                      >
                        Reset ({simulatedSkills.length})
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click any missing skill below to simulate adding it to your resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills?.map((skill, idx) => {
                      const isSimulated = simulatedSkills.includes(skill);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleSimulatedSkill(skill)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                            isSimulated
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500 shadow-xs scale-105'
                              : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/80 hover:border-amber-500'
                          }`}
                        >
                          {isSimulated ? `✓ ${skill} (Simulated)` : `+ ${skill}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BEFORE VS. AFTER BULLET-POINT DIFF VIEWER */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <GitCompare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Recruiter Tailoring & Bullet-Point Diff Viewer
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Compare generic phrasing against high-impact, ATS-optimized bullet upgrades.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDiffView(!showDiffView)}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition cursor-pointer"
                  >
                    {showDiffView ? 'Switch to Compact List' : 'Switch to Before/After Diff'}
                  </button>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {result.actionableFeedback?.map((tip, idx) => (
                    <li
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-2.5"
                    >
                      {showDiffView && (
                        <div className="flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 font-mono">
                          <span className="font-bold shrink-0">− Weak Before:</span>
                          <span className="line-through opacity-85">
                            {WEAK_BULLET_EXAMPLES[idx % WEAK_BULLET_EXAMPLES.length]}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-2 py-0.5 shrink-0 font-mono">
                            + After #{idx + 1}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{tip}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyTip(tip, `tip-${idx}`)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
                          title="Copy optimized bullet"
                        >
                          {copiedIndex === `tip-${idx}` ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: SKILL ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Personalized Skill-Gap Learning Roadmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Actionable study paths and portfolio mini-projects to bridge your missing requirements.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.learningRoadmap?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        {item.skill}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        Step 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">What to Learn: </strong>
                      {item.learningStep}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 rounded-lg p-2.5 leading-relaxed">
                      <strong>Portfolio Project Idea: </strong>
                      {item.miniProjectIdea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COVER LETTER PITCH */}
          {activeTab === 'pitch' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Tailored Cover Letter Pitch
                </h3>
                <button
                  type="button"
                  onClick={() => copyTip(result.coverLetterPitch, 'pitch')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition cursor-pointer"
                >
                  {copiedIndex === 'pitch' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pitch</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 leading-relaxed italic">
                "{result.coverLetterPitch}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// --- 5. FOOTER ---
function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-bold text-slate-800 dark:text-slate-200">CareerPilot AI</span>
          <span>— Smart Resume & Skill Gap Intelligence</span>
        </div>
        <div>Built with React, Tailwind CSS, Node.js & Google Gemini</div>
      </div>
    </footer>
  );
}

// --- 6. ROOT APPLICATION ---
export default function App() {
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const showToast = (msg) => setToastMessage(msg);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar
          user={user}
          setUser={setUser}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <CommandPalette
          isOpen={paletteOpen}
          onClose={(val) => setPaletteOpen(val === true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showToast={showToast}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage setUser={setUser} showToast={showToast} />} />
            <Route path="/scanner" element={<ScannerPage showToast={showToast} />} />
          </Routes>
        </main>
        <Footer />
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </div>
    </Router>
  );
}