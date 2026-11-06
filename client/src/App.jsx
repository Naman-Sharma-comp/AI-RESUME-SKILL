import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Upload, FileText, CheckCircle2, AlertTriangle, 
  ArrowRight, ShieldCheck, Zap, BarChart3, LogIn, UserPlus, LogOut 
} from 'lucide-react';

// --- 1. NAVIGATION BAR ---
function Navbar({ user, setUser }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-500 transition">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CareerPilot <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <a href="/#features" className="hover:text-white transition">Features</a>
          <Link to="/scanner" className="hover:text-white transition">ATS Scanner</Link>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">
                Hi, <strong className="text-white">{user.name}</strong>
              </span>
              <button
                onClick={() => setUser(null)}
                className="flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition"
              >
                Log in
              </Link>
              <Link
                to="/auth?mode=register"
                className="text-sm font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition"
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// --- 2. LANDING PAGE (HOME) ---
function LandingPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by Google Gemini 3.8 Flash</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Beat the ATS Filter and Land More <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Tech Interviews</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your PDF resume and paste any target job description. CareerPilot AI instantly calculates your match score, uncovers hidden skill gaps, and tells you exactly what to fix.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/scanner"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 transition"
          >
            <span>Scan Your Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/auth?mode=register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Candidates Choose CareerPilot AI</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Built with recruitment-grade evaluation logic to give you an unfair advantage in the job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Instant ATS Match Scoring</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              See your exact compatibility percentage before you hit apply, calibrated against real technical recruiter criteria.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Hard & Soft Skill Gap Detection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pinpoint the exact keywords, frameworks, and tools missing from your PDF resume that recruiters are filtering for.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Actionable Tailoring Bullets</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Receive 3 high-impact, role-specific recommendations you can copy directly into your resume experience section.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- 3. LOGIN & REGISTER PAGE ---
function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary UI state until we wire JWT backend in the next step
    setUser({ name: isLogin ? email.split('@')[0] : name, email });
    navigate('/scanner');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-slate-400">
            {isLogin
              ? 'Sign in to access your saved ATS resume scans'
              : 'Start optimizing your resume for every application'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Naman Sharma"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
          >
            {isLogin ? 'Sign up free' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 4. SCANNER WORKSPACE ---
function ScannerPage() {
  const [inputMode, setInputMode] = useState('pdf');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

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

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">ATS Resume Scanner</h1>
          <p className="text-sm text-slate-400">Upload your resume and benchmark it against your target role.</p>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Candidate Resume
              </span>
              <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('pdf')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    inputMode === 'pdf' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`px-3 py-1 rounded-md transition cursor-pointer ${
                    inputMode === 'text' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {inputMode === 'pdf' ? (
              <label className="flex flex-col items-center justify-center h-64 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-indigo-500/60 p-6 text-center cursor-pointer transition space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-indigo-400">Click to upload your resume PDF</span>
                  <p className="text-xs text-slate-500">Maximum file size 5MB</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="sr-only"
                />
                {resumeFile && (
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                    {resumeFile.name}
                  </span>
                )}
              </label>
            ) : (
              <textarea
                rows="10"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
          </div>

          {/* Job Description Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <span className="text-sm font-semibold text-white block">Target Job Description</span>
            <textarea
              rows="10"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the responsibilities and requirements from the job posting..."
              className="w-full h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-950/60 border border-red-800 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            {loading ? 'Running ATS Scan with Gemini AI...' : 'Run ATS Skill Scan'}
          </button>
        </div>
      </form>

      {/* Results Dashboard */}
      {result && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Gauge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">ATS Match Rate</span>
              <div className="text-6xl font-extrabold text-indigo-400 py-2">
                {result.matchScore}%
              </div>
              <p className="text-xs text-slate-400">
                {result.matchScore >= 75 ? 'Strong candidate match!' : 'Tailor missing keywords below to boost your score.'}
              </p>
            </div>

            {/* Matched Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Matched Skills ({result.matchedSkills?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Missing Keywords ({result.missingSkills?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Tailoring Feedback */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Recruiter Tailoring Recommendations
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {result.actionableFeedback?.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-950 border border-indigo-800 rounded-md px-2 py-0.5">
                    #{idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 5. ROOT APP WITH ROUTER ---
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          <Route path="/scanner" element={<ScannerPage />} />
        </Routes>
      </div>
    </Router>
  );
}