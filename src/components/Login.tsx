import { useState, FormEvent } from 'react';
import { Mail, Lock, Sparkles, CheckCircle, ArrowRight, Bot, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('vishnuvardhanrao1919@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate professional high-speed synchronization
    setLoadingPhase('Establishing secure session...');
    
    setTimeout(() => {
      setLoadingPhase('Verifying credentials on Cloud Server...');
      setTimeout(() => {
        setLoadingPhase('Initializing zero-state workspaces...');
        setTimeout(() => {
          onLoginSuccess(email);
        }, 800);
      }, 700);
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail('vishnuvardhanrao1919@gmail.com');
    setPassword('password123');
  };

  return (
    <div id="login-container" className="min-h-screen relative flex items-center justify-center bg-slate-900 overflow-hidden px-4 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Animated Vector Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-indigo-900/20 blur-[120px] animate-pulse-soft" />
        <div className="absolute -bottom-[45%] -left-[20%] w-[70%] h-[70%] rounded-full bg-violet-950/30 blur-[130px] animate-pulse-soft" style={{ animationDelay: '3s' }} />
        {/* Fine background grid */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #0f172a 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
      </div>

      <div className="w-full max-w-5xl z-10 grid md:grid-cols-12 bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden self-center">
        {/* Left column - Artistic System Promotion Info */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-950 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-800/60 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Bot className="w-40 h-40" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 px-3.5 py-1.5 rounded-full text-xs text-indigo-300 font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
              SYSTEM RELEASE v2.4.0
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-display font-bold tracking-tight text-white leading-tight">
                AI Resume Optimizer
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Automated Job Application System
              </p>
            </div>
          </div>

          {/* Core App stats bullets - styled in high density */}
          <div className="my-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Daily Autopilot Runs</p>
                <p className="text-xs text-slate-400 mt-0.5">Scrapes, updates, and optimizes matching roles at 7:00 AM every morning.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">ATS score Match verification</p>
                <p className="text-xs text-slate-400 mt-0.5">Validates generated LaTeX and PDF structures against strict ATS crawlers.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Dynamic Document Generators</p>
                <p className="text-xs text-slate-400 mt-0.5">Creates tailored, resume variants tailored specifically for target roles.</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-900 pt-4">
            Authorized session portal. Secure workspace proxy active.
          </div>
        </div>

        {/* Right column - Clean Authentication Form */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitting ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Welcome back portal
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Connect securely to access your zero-initialized dashboard workspace.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-400 font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5Packed">
                    <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase mb-1 block">
                      Registered Email Link
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/80 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/20Outline outline-none transition-all duration-200"
                        id="email-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                        Identity Password
                      </label>
                      <button 
                        type="button" 
                        onClick={handleQuickDemoFill}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline focus:outline-none"
                      >
                        Reset/Autofill Default
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/80 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/20Outline outline-none transition-all duration-200"
                        id="password-input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-slate-800"
                        id="remember-me-checkbox"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                        Remember this workstation session
                      </span>
                    </label>
                    <span className="text-xs text-indigo-400 font-medium hover:underline cursor-pointer">
                      Forgot Account?
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/10 border border-indigo-400/20 flex items-center justify-center gap-2 mt-6 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-200"
                    id="submit-login-button"
                  >
                    <span>Authorize & Decrypt Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-900"></div>
                  <span className="flex-shrink mx-4 text-slate-600 text-xs tracking-widest uppercase">
                    Security Credentials
                  </span>
                  <div className="flex-grow border-t border-slate-900"></div>
                </div>

                <div className="p-3 bg-indigo-950/20 border border-indigo-800/20 rounded-xl flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <p className="text-xs text-slate-400">
                    Auto-configured for <strong className="text-slate-200 font-medium">{email}</strong>. Press the main button to log in directly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-900/40 border-t-indigo-500 animate-spin" />
                  <Bot className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">System Access Authorization</h3>
                  <div className="h-5 flex items-center justify-center">
                    <p className="text-sm font-mono text-indigo-400 font-medium">
                      {loadingPhase}
                    </p>
                  </div>
                </div>

                <div className="w-64 bg-slate-900 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300" 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
