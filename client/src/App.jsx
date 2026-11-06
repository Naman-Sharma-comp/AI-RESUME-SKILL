import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles, Upload, FileText, CheckCircle2, AlertTriangle,
  ArrowRight, ShieldCheck, Zap, BarChart3, LogIn, UserPlus,
  LogOut, Sun, Moon, Menu, X, ChevronDown, HelpCircle,
  Layers, Cpu, Award, Copy, Check, Wand2
} from 'lucide-react';

// --- 1. ENHANCED RESPONSIVE NAVBAR WITH THEME TOGGLE ---
function Navbar({ user, setUser, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:bg-indigo-500 transition-all duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            CareerPilot <span className="text-indigo-600 dark:text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            Home
          </Link>
          <a
            href="/#how-it-works"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#features"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            Features
          </a>
          <a
            href="/#faq"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            FAQ
          </a>
          <Link
            to="/scanner"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
              isActive('/scanner')
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <span>ATS Scanner</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Live
            </span>
          </Link>
        </div>

        {/* Right Actions: Theme Switcher + Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {user.name}
              </span>
              <button
                type="button"
                onClick={() => setUser(null)}
                className="flex items-center space-x-1 text-xs font-medium px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 transition"
              >
                Log in
              </Link>
              <Link
                to="/auth?mode=register"
                className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Home
          </Link>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            How It Works
          </a>
          <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Features
          </a>
          <Link to="/scanner" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            ATS Resume Scanner
          </Link>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/auth?mode=login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              Log in
            </Link>
            <Link
              to="/auth?mode=register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl text-sm font-semibold bg-indigo-600 text-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// --- 2. RICH LANDING PAGE WITH ANIMATIONS, STEPS & FAQ ---
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
    <div className="space-y-28 pb-24 animate-fade-in">
      
      {/* Hero Section with Ambient Glow */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-136 h-72 bg-indigo-500/15 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/70 text-indigo-600 dark:text-indigo-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Multimodal PDF Resume Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Turn Resume Rejections Into{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400">
            Engineering Interviews
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          75% of resumes are filtered out by automated ATS software before a human recruiter ever reads them. Upload your PDF resume, uncover missing keywords, and tailor your application in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/scanner"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Scan Your Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-slate-700 transition-all duration-200"
          >
            See How It Works
          </a>
        </div>

        {/* Metrics Bar */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">99.2%</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Native PDF Parsing Accuracy</div>
          </div>
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">&lt; 3.5 Sec</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Real-Time AI Evaluation Speed</div>
          </div>
          <div className="bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4">
            <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">3x Higher</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Recruiter Callback Conversion</div>
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
              desc: 'Paste the job description you want to apply for. Gemini AI compares every skill requirement line-by-line.'
            },
            {
              step: '03',
              icon: Award,
              title: 'Fix Gaps & Apply with Confidence',
              desc: 'Review your ATS score, missing skill badges, and 3 actionable bullet-point upgrades tailored to the role.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="relative group bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 space-y-4 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/20 transition-colors">
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
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weighted ATS Match Gauge</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Evaluates both core technical competencies and soft leadership skills rather than relying on naive word counting.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Model Fault Tolerance</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered with automatic fallback routing across Gemini Flash models so your scan completes even during peak traffic.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Copy-Ready Resume Feedback</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Get specific, one-sentence tailoring suggestions you can copy with a single click and add straight to your resume.
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
              className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
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
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180 text-indigo-500' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
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
function AuthPage({ setUser }) {
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
    navigate('/scanner');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
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
                placeholder="Naman Sharma"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-600/20"
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

// --- 4. SCANNER WORKSPACE WITH ANIMATED SVG SCORE RING & SAMPLE LOADER ---
function ScannerPage() {
  const [inputMode, setInputMode] = useState('pdf');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const loadSampleData = () => {
    setInputMode('text');
    setResumeText(
      'Full-Stack Developer experienced in React, JavaScript, Node.js, Express, Tailwind CSS, SQL, and Git. Built responsive web applications and REST APIs.'
    );
    setJobDescription(
      'Seeking a Full-Stack Software Engineer skilled in React, TypeScript, Node.js, PostgreSQL, Docker, AWS, and CI/CD pipelines to build scalable cloud web applications.'
    );
    setError(null);
  };

  const copyTip = (tip, idx) => {
    navigator.clipboard.writeText(tip);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (inputMode === 'text' && !resumeText.trim()) return setError('Please paste your resume text.');
    if (inputMode === 'pdf' && !resumeFile) return setError('Please upload a PDF resume.');
    if (!jobDescription.trim()) return setError('Please enter a target job description.');

    setLoading(true);
    setError(null);
    setResult(null);

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
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // SVG Ring calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result
    ? circumference - (result.matchScore / 100) * circumference
    : circumference;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">ATS Resume Scanner</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload your PDF resume or test immediately with our sample tech profile.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSampleData}
          className="self-start sm:self-auto inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Fill Sample Tech Data</span>
        </button>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Candidate Resume
              </span>
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

            {inputMode === 'pdf' ? (
              <label className="flex flex-col items-center justify-center h-64 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 p-6 text-center cursor-pointer transition space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Click to select a PDF resume
                  </span>
                  <p className="text-xs text-slate-500">PDF up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files[0])}
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
                rows="10"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-64 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>

          {/* Job Description Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Target Job Description
            </span>
            <textarea
              rows="10"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job requirements and responsibilities..."
              className="w-full h-64 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 cursor-pointer"
          >
            {loading ? 'Analyzing with Gemini AI...' : 'Run ATS Skill Scan'}
          </button>
        </div>
      </form>

      {/* Results Dashboard */}
      {result && (
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Animated Circular Progress Gauge */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ATS Compatibility Score
              </span>
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
                    className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-3xl font-extrabold text-slate-900 dark:text-white">
                  {result.matchScore}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {result.matchScore >= 75
                  ? 'Strong match! Ready for application.'
                  : 'Add the missing keywords below to boost your ranking.'}
              </p>
            </div>

            {/* Matched Skills */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Matched Skills ({result.matchedSkills?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Missing Keywords ({result.missingSkills?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Tailoring Feedback with Copy Button */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Recruiter Tailoring Recommendations
            </h3>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              {result.actionableFeedback?.map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-md px-2 py-0.5 shrink-0">
                      #{idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyTip(tip, idx)}
                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
                    title="Copy suggestion"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
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

// --- 6. ROOT APPLICATION WITH THEME PERSISTENCE ---
export default function App() {
  const [user, setUser] = useState(null);
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

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar user={user} setUser={setUser} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
            <Route path="/scanner" element={<ScannerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}