import { useState, useEffect } from 'react';
import { 
  Bot, 
  Calendar, 
  Database, 
  Briefcase, 
  Search, 
  Brain, 
  FileText, 
  Mail, 
  CheckCircle2, 
  Sliders, 
  FileCheck2, 
  TrendingUp, 
  User, 
  ChevronDown, 
  RefreshCw, 
  Power, 
  Clock, 
  ShieldAlert, 
  Play, 
  ChevronRight,
  Code,
  Layers,
  Inbox,
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SidebarTab, WorkflowStep, ActivityLog, JobRole } from '../types';

interface DashboardProps {
  userEmail: string;
  onSignOut: () => void;
}

export default function Dashboard({ userEmail, onSignOut }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Real-time Countdown Timer until the next 7:00 AM UTC/local-oriented execution
  const [countdown, setCountdown] = useState('12:45:30');

  // Simulation state engines to satisfy beginning exactly at ZERO
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState<number | null>(null);
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  
  // Interactive counts - strictly initialized at ZERO
  const [jobsFetched, setJobsFetched] = useState(0);
  const [applicationsProcessed, setApplicationsProcessed] = useState(0);
  const [averageATSScore, setAverageATSScore] = useState(0);
  const [resumesGenerated, setResumesGenerated] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);

  // Dynamic state arrays for activity logs and charts
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [scoreHistory, setScoreHistory] = useState([0, 0, 0, 0, 0, 0, 0]); // all zero by default

  // Live countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(7, 0, 0, 0);
      
      // If past 7:00 AM today, target is 7:00 AM tomorrow
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const pad = (num: number) => num.toString().padStart(2, '0');
      setCountdown(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handler to restore zero metrics
  const resetToZero = () => {
    setJobsFetched(0);
    setApplicationsProcessed(0);
    setAverageATSScore(0);
    setResumesGenerated(0);
    setEmailsSent(0);
    setActivities([]);
    setScoreHistory([0, 0, 0, 0, 0, 0, 0]);
    setSimulationActive(false);
    setSimulationProgress(null);
    setCurrentStepId(null);
  };

  // Autopilot system simulation pipeline
  const runSimulation = async () => {
    if (simulationActive) return;
    
    // Clear out of zero state selectively through stepping
    setSimulationActive(true);
    setSimulationProgress(0);
    setActivities([]);
    
    const steps = [
      {
        stepId: 1,
        message: 'Daily Trigger activated (7:00 AM schedule simulated)',
        update: () => {
          setCurrentStepId(1);
          setJobsFetched(0);
        }
      },
      {
        stepId: 2,
        message: 'Google Drive connected: Downloading base master CV profile',
        update: () => {
          setCurrentStepId(2);
        }
      },
      {
        stepId: 3,
        message: 'CV layout parsed: Extracted sections matching skill matrices',
        update: () => {
          setCurrentStepId(3);
        }
      },
      {
        stepId: 4,
        message: 'Triggered Scraper: Scanning active job listings for developer roles',
        update: () => {
          setCurrentStepId(4);
          setJobsFetched(128);
          // Insert activity log
          addLog('Fetched 128 new jobs', 'Polled from LinkedIn & Apify APIs', '07:02 AM');
        }
      },
      {
        stepId: 5,
        message: 'Gemini AI Advisor analyzing descriptions and tailoring keywords',
        update: () => {
          setCurrentStepId(5);
          setApplicationsProcessed(25);
          setAverageATSScore(87);
          setScoreHistory([50, 48, 55, 42, 45, 52, 87]); // Plot high scoring values
          addLog('Al optimization completed', 'Average ATS score boosted to 87%', '07:05 AM');
          addLog('Resume extracted successfully', 'Software_Engineer_Resume.pdf', '07:00 AM');
        }
      },
      {
        stepId: 6,
        message: 'LaTeX Engine rendering optimized document variants',
        update: () => {
          setCurrentStepId(6);
          setResumesGenerated(25);
          addLog('25 resumes generated', 'Unique match PDFs compiled', '07:10 AM');
        }
      },
      {
        stepId: 7,
        message: 'Committing transaction logs to local tracker catalog',
        update: () => {
          setCurrentStepId(7);
        }
      },
      {
        stepId: 8,
        message: 'Sending system digest summary email...',
        update: () => {
          setCurrentStepId(8);
          setEmailsSent(1);
          addLog('Email summary sent', `Dispatched digest report to ${userEmail}`, '07:12 AM');
        }
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      setSimulationProgress(Math.floor(((i + 1) / steps.length) * 100));
      steps[i].update();
      
      // Add incremental logs during key phases
      if (i > 0) {
        addLog(
          steps[i].message.split(':')[0],
          steps[i].message.split(':')[1] || 'Completed successfully',
          getMockTimestamp(i)
        );
      }
      
      await new Promise(resolve => setTimeout(resolve, 1400));
    }

    setCurrentStepId(null);
    setSimulationProgress(null);
  };

  const getMockTimestamp = (index: number) => {
    const min = index * 2;
    return `07:${min < 10 ? '0' + min : min} AM`;
  };

  const addLog = (event: string, detail: string, time: string) => {
    const newLog: ActivityLog = {
      id: Math.random().toString(),
      event,
      detail,
      status: 'Completed',
      time,
      iconBg: event.includes('optimization') ? 'bg-fuchsia-100 text-fuchsia-600' :
              event.includes('Fetched') ? 'bg-[#EFF6FF] text-[#2563EB]' :
              event.includes('resumes') ? 'bg-teal-100 text-teal-600' :
              event.includes('Email') ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
    };
    setActivities(prev => [newLog, ...prev]);
  };

  // Staggered steps configuration to render the layout from the image
  const workflowSteps: WorkflowStep[] = [
    { id: 1, name: '1. Daily Trigger', subtitle: '7:00 AM', iconName: 'clock', color: '#3B82F6', borderColor: 'border-blue-200', bgLight: 'bg-blue-50' },
    { id: 2, name: '2. Get Resume', subtitle: 'Google Drive', iconName: 'drive', color: '#10B981', borderColor: 'border-emerald-200', bgLight: 'bg-emerald-50' },
    { id: 3, name: '3. Extract Text', subtitle: 'Parse Document', iconName: 'text', color: '#F59E0B', borderColor: 'border-amber-200', bgLight: 'bg-amber-50' },
    { id: 4, name: '4. Fetch Jobs', subtitle: 'Job Search', iconName: 'search', color: '#6366F1', borderColor: 'border-indigo-200', bgLight: 'bg-indigo-50' },
    { id: 5, name: '5. AI ATS Optimizer', subtitle: 'Gemini AI', iconName: 'brain', color: '#EC4899', borderColor: 'border-pink-200', bgLight: 'bg-pink-50' },
    { id: 6, name: '6. Generate Resume', subtitle: 'PDF / LaTeX', iconName: 'file', color: '#14B8A6', borderColor: 'border-teal-200', bgLight: 'bg-teal-50' },
    { id: 7, name: '7. Store & Track', subtitle: 'Applications', iconName: 'database', color: '#2563EB', borderColor: 'border-blue-300', bgLight: 'bg-blue-100' },
    { id: 8, name: '8. Notify', subtitle: 'Email Summary', iconName: 'mail', color: '#8B5CF6', borderColor: 'border-violet-200', bgLight: 'bg-violet-50' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'workflows', label: 'Workflows', icon: Sliders },
    { id: 'resumes', label: 'Resumes', icon: FileCheck2 },
    { id: 'job_search', label: 'Job Search', icon: Search },
    { id: 'applications', label: 'Applications', icon: Inbox },
    { id: 'ats_optimizer', label: 'ATS Optimizer', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Sliders },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <div className="bg-[#F8F9FC] min-h-screen text-slate-800 font-sans flex flex-col selection:bg-indigo-500 selection:text-white" id="dashboard-wrapper">
      
      {/* 1. TOP HEADER (Replicating the look with exact titles and profile) */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-40" id="main-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/10">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              AI Resume Optimizer
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              Automated Job Application System
            </p>
          </div>
        </div>

        {/* System Active Status Pill & Simulation controller */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full" id="system-status-pill">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 tracking-wide">
              System Active
            </span>
          </div>

          {/* Interactive Simulation Panel to move metrics from 0 to display runs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={runSimulation}
              disabled={simulationActive}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                simulationActive 
                  ? 'bg-indigo-500 text-white animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-800 shadow-sm border border-slate-200/50 hover:border-slate-300'
              }`}
              title="Click to run system diagnostic simulation"
              id="simulate-run-btn"
            >
              {simulationActive ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Autopilot Active ({simulationProgress}%)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-800" />
                  <span>Simulate Run</span>
                </>
              )}
            </button>

            {/* Reset metrics link */}
            {(jobsFetched > 0 || simulationActive) && (
              <button
                onClick={resetToZero}
                className="text-xs text-slate-600 bg-transparent hover:bg-slate-200/60 p-1.5 rounded-lg transition-colors"
                title="Reset all system values back to zero"
                id="reset-simulation-btn"
              >
                <Power className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* User Profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              id="profile-dropdown-button"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-sm">
                VV
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Vishnu Vardhan</p>
                <p className="text-xs text-slate-400 font-medium">Premium User</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-sm"
                  id="profile-dropdown-menu"
                >
                  <div className="p-3.5 border-b border-slate-100 bg-slate-50">
                    <p className="font-semibold text-slate-900">Vishnu Vardhan</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{userEmail}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => alert(`Active session configured for premium key deployment: ${userEmail}`)}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium rounded-lg text-slate-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </button>
                    <button
                      onClick={onSignOut}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 font-medium rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out Workspace
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT (SIDEBAR + MAIN COMPONENT) */}
      <div className="flex-grow flex flex-col md:flex-row relative" id="body-row">
        
        {/* LEFT NAV BAR */}
        <aside className="w-full md:w-64 bg-white md:border-r border-b md:border-b-0 border-slate-200/80 p-4 md:sticky md:top-20 md:h-[calc(100vh-80px)] flex flex-col justify-between shrink-0" id="sidebar">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              // Translate ids for perfect display visual
              let label = item.label;
              if (item.id === 'job_search') label = 'Job Search';
              if (item.id === 'ats_optimizer') label = 'ATS Optimizer';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as SidebarTab)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  id={`sidebar-tab-${item.id}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Sticky system agent robot module at the bottom */}
          <div className="mt-8 bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl relative overflow-hidden" id="ai-assistant-card">
            <div className="absolute -top-10 -right-6 w-24 h-24 bg-indigo-500/5 rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Bot className="w-5 h-5 animate-pulse-soft" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-950">AI is working for you</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Autonomous Ready</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Your workflow runs daily at <strong className="text-slate-900">7:00 AM</strong>
            </p>

            <div className="mt-3 bg-white/90 border border-slate-200/60 px-3 py-2 rounded-xl flex items-center justify-between shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400 animate-spin" style={{ animationDuration: '4s' }} />
                Next run
              </span>
              <span className="text-xs font-mono font-bold text-indigo-600">
                {countdown}
              </span>
            </div>
          </div>
        </aside>

        {/* MAIN BLUEPRINTED AREA */}
        <main className="flex-grow p-6 space-y-6 overflow-x-hidden md:h-[calc(100vh-80px)] md:overflow-y-auto" id="dashboard-main-content">
          
          {/* Diagnostic Active Alert during processing */}
          <AnimatePresence>
            {simulationActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-50 border border-indigo-200 p-3 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-indigo-950">Autopilot Flow Execution Mode Active</h5>
                    <p className="text-[10px] text-indigo-600 mt-0.5">Sequential triggers are firing to populate zero states. Keep watching.</p>
                  </div>
                </div>
                <div className="w-32 bg-indigo-200/65 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full transition-all duration-200" style={{ width: `${simulationProgress}%` }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WORKFLOW OVERVIEW CANVAS */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm" id="workflow-panel">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2.5 font-display">
              Workflow Overview
            </h3>

            {/* Sequential pipeline row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-3 relative" id="workflow-steps-grid">
              {workflowSteps.map((step) => {
                const isStepActive = currentStepId === step.id;
                const isCompleted = currentStepId !== null && step.id < currentStepId;
                
                return (
                  <div key={step.id} className="relative flex flex-col items-center group text-center" id={`workflow-step-${step.id}`}>
                    
                    {/* Circle representing the node */}
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative border-2 ${
                        isStepActive 
                          ? 'border-indigo-600 scale-110 shadow-lg shadow-indigo-600/10' 
                          : isCompleted 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : `${step.borderColor} ${step.bgLight}`
                      }`}
                      style={{
                        borderColor: isStepActive ? '#6366F1' : (isCompleted ? '#10B981' : undefined),
                        backgroundColor: isStepActive ? '#EFF6FF' : undefined
                      }}
                    >
                      {/* Interactive step icon rendering */}
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white text-[10px]" />
                      ) : (
                        <span className="transition-transform duration-200 group-hover:scale-105">
                          {renderStepIcon(step.iconName, isStepActive ? '#4F46E5' : step.color)}
                        </span>
                      )}

                      {/* Small current processing ring */}
                      {isStepActive && (
                        <span className="absolute -inset-1 rounded-full border-2 border-indigo-500 animate-ping opacity-75 pointer-events-none" />
                      )}
                    </div>

                    {/* Step Title descriptors match image layout */}
                    <p className="text-[10px] font-bold text-slate-800 tracking-wide mt-3.5 leading-tight">
                      {step.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      {step.subtitle}
                    </p>

                    {/* Desktop connection lines overlay */}
                    {step.id < 8 && (
                      <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 z-10">
                        <svg className="w-full h-2" fill="none" preserveAspectRatio="none">
                          <path 
                            d="M 0 1 L 100 1" 
                            stroke={isCompleted ? '#10B981' : '#E2E8F0'} 
                            strokeWidth="1.5"
                            strokeDasharray={isStepActive ? '3, 3" animate-pulse' : undefined}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* DYNAMIC CARD STATISTICS PANEL - strictly initialized to ZERO unless simulation updates them */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5" id="stats-grid">
            
            {/* CARD 1: Jobs Fetched */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between" id="stat-card-jobs">
              <div className="space-y-1 flex-grow">
                <h4 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {jobsFetched}
                </h4>
                <p className="text-xs font-extrabold text-slate-850">Jobs Fetched</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Today</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FolderIcon className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            {/* CARD 2: Applications Processed */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between" id="stat-card-apps">
              <div className="space-y-1 flex-grow">
                <h4 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {applicationsProcessed}
                </h4>
                <p className="text-xs font-extrabold text-slate-850">Applications Processed</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Today</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            {/* CARD 3: ATS Score Improvement */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between" id="stat-card-ats">
              <div className="space-y-1 flex-grow">
                <h4 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {averageATSScore === 0 ? '0%' : `${averageATSScore}%`}
                </h4>
                <p className="text-xs font-extrabold text-slate-850">Average ATS Score Improved</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Today</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </div>

            {/* CARD 4: Resumes Generated */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between" id="stat-card-resumes">
              <div className="space-y-1 flex-grow">
                <h4 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {resumesGenerated}
                </h4>
                <p className="text-xs font-extrabold text-slate-850">Resumes Generated</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Today</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5 text-amber-500" />
              </div>
            </div>

            {/* CARD 5: Emails Sent */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between" id="stat-card-emails">
              <div className="space-y-1 flex-grow">
                <h4 className="text-3xl font-display font-black text-slate-900 tracking-tight">
                  {emailsSent}
                </h4>
                <p className="text-xs font-extrabold text-slate-850">Emails Sent</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Today</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-indigo-500" />
              </div>
            </div>

          </section>

          {/* TWO MAIN COLUMNS: RECENT ACTIVITY (LEFT) vs SCORE IMPROVEMENT CHART (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="columns-row">
            
            {/* COLUMN LEFT: Recent Activity (Cloned design layout) */}
            <section className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm" id="recent-activity-panel">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Recent Activity</h3>
                  <button 
                    onClick={() => alert('No older events. Showing latest workstation session.')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3.5" id="activities-list">
                  <AnimatePresence initial={false}>
                    {activities.length > 0 ? (
                      activities.map((act) => (
                        <motion.div
                          key={act.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3.5 p-2 hover:bg-slate-50 rounded-xl transition-all"
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg}`}>
                            {act.event.includes('Matched') || act.event.includes('Fetched') ? (
                              <Search className="w-4.5 h-4.5" />
                            ) : act.event.includes('optimization') || act.event.includes('CV') ? (
                              <Brain className="w-4.5 h-4.5" />
                            ) : act.event.includes('Generated') || act.event.includes('resume') ? (
                              <FileCheck2 className="w-4.5 h-4.5" />
                            ) : (
                              <Mail className="w-4.5 h-4.5" />
                            )}
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {act.event}
                              </p>
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100/70 px-2 py-0.5 rounded-full font-bold">
                                {act.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                              {act.detail}
                            </p>
                          </div>

                          <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap pt-1">
                            {act.time}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 space-y-3.5"
                        id="empty-activity-state"
                      >
                        <div className="w-12 h-12 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
                          <Inbox className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                          Zero values currently engaged. Click <strong className="text-indigo-600">"Simulate Run"</strong> above to dispatch and watch telemetry logs propagate.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Autopilot hint alert */}
              <div className="mt-6 p-4 bg-slate-50/80 border border-slate-200/60 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
                <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
                  System logs are cleared at midnight daily. The background automation agent is standing by.
                </p>
              </div>
            </section>

            {/* COLUMN RIGHT: ATS Score Improvement Line Chart */}
            <section className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm" id="chart-panel">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">ATS Score Improvement</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" /> Before Optimization
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> After Optimization
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <select 
                    className="text-xs border border-slate-200 rounded-lg py-1.5 pl-2.5 pr-6 bg-slate-50 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                    id="chart-days-select"
                  >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Hand-crafted gorgeous responsive SVG line chart replicating the visual */}
              <div className="h-64 relative border border-slate-100 rounded-xl bg-slate-50/40 p-4" id="score-chart-container">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="5" y1="20" x2="495" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="5" y1="60" x2="495" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="5" y1="100" x2="495" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="5" y1="140" x2="495" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="5" y1="180" x2="495" y2="180" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Horizontal Labels */}
                  <g className="text-[8px] fill-slate-400 font-semibold" transform="translate(0, 0)">
                    <text x="4" y="24">100%</text>
                    <text x="4" y="64">75%</text>
                    <text x="4" y="104">50%</text>
                    <text x="4" y="144">25%</text>
                    <text x="4" y="184">0%</text>
                  </g>

                  {/* Line Chart Curves */}
                  {/* Before Optimization curve (Pink) */}
                  <path
                    d={
                      averageATSScore === 0 
                        ? "M 40,180 L 110,180 L 180,180 L 250,180 L 320,180 L 390,180 L 460,180"
                        : "M 40,150 L 110,147 L 180,149 L 250,140 L 320,143 L 390,138 L 460,132"
                    }
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />

                  {/* After Optimization curve (Green) */}
                  <path
                    d={
                      averageATSScore === 0 
                        ? "M 40,180 L 110,180 L 180,180 L 250,180 L 320,180 L 390,180 L 460,180"
                        : "M 40,118 L 110,105 L 180,107 L 250,107 L 320,99 L 390,102 L 460,95"
                    }
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-in-out"
                  />

                  {/* Plot Dots for Before Optimization */}
                  {averageATSScore > 0 && (
                    <g>
                      <circle cx="40" cy="150" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="110" cy="147" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="180" cy="149" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="250" cy="140" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="320" cy="143" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="390" cy="138" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                      <circle cx="460" cy="132" r="3.5" className="fill-white stroke-rose-400 stroke-2" />
                    </g>
                  )}

                  {/* Plot Dots for After Optimization */}
                  {averageATSScore > 0 && (
                    <g>
                      <circle cx="40" cy="118" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="110" cy="105" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="180" cy="107" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="250" cy="107" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="320" cy="99" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="390" cy="102" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                      <circle cx="460" cy="95" r="3.5" className="fill-white stroke-emerald-500 stroke-2" />
                    </g>
                  )}
                </svg>

                {/* Vertical labels underneath representing days */}
                <div className="absolute bottom-1 left-9 right-4 flex justify-between text-[9px] text-slate-400 font-bold tracking-wide">
                  <span>May 20</span>
                  <span>May 21</span>
                  <span>May 22</span>
                  <span>May 23</span>
                  <span>May 24</span>
                  <span>May 25</span>
                  <span>May 26</span>
                </div>

                {averageATSScore === 0 && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center">
                    <ShieldAlert className="w-8 h-8 text-slate-400/80 mb-2" />
                    <p className="text-xs font-bold text-slate-900">Initial Zero-State Active</p>
                    <p className="text-[10px] text-slate-400 max-w-xs mt-0.5 font-semibold">
                      Please execute an autopilot test simulation run using the header button to render graphical trends.
                    </p>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* BOTTOM SECTION: Top Matched Job Roles */}
          <section className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm" id="job-roles-section">
            <h3 className="text-sm font-bold text-slate-900 font-display mb-4">
              Top Matched Job Roles
            </h3>

            {/* In strict response to the prompt: matching percentages should be ZERO by default */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="job-roles-grid">
              
              {/* Card 1 */}
              <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Software Engineer</h4>
                    <p className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                      {averageATSScore > 0 ? '92% Match' : '0% Match'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Database className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Backend Developer</h4>
                    <p className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                      {averageATSScore > 0 ? '89% Match' : '0% Match'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Full Stack Developer</h4>
                    <p className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                      {averageATSScore > 0 ? '88% Match' : '0% Match'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">AI/ML Engineer</h4>
                    <p className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                      {averageATSScore > 0 ? '85% Match' : '0% Match'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Card 5 */}
              <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Data Engineer</h4>
                    <p className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                      {averageATSScore > 0 ? '82% Match' : '0% Match'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>

            </div>

          </section>

        </main>
      </div>

    </div>
  );
}

// Inline pure SVG builders for standard folder icon
function FolderIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
    </svg>
  );
}

// Dynamic selector mapper for steps representation
function renderStepIcon(iconName: string, color: string) {
  switch (iconName) {
    case 'clock':
      return <Clock className="w-5 h-5" style={{ color }} />;
    case 'drive':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.43 12.98L14.57 4.5H9.43L14.3 12.98H19.43Z" fill="#00A859" />
          <path d="M14.57 20H4.3L9.15 11.53H19.43L14.57 20Z" fill="#3B82F6" />
          <path d="M9.43 4.5L4.3 12.98L9.15 21.5H14.28L9.43 4.5Z" fill="#FFC107" />
        </svg>
      );
    case 'text':
      return <FileText className="w-5 h-5" style={{ color }} />;
    case 'search':
      return <Search className="w-5 h-5" style={{ color }} />;
    case 'brain':
      return <Brain className="w-5 h-5" style={{ color }} />;
    case 'file':
      return <FileCheck2 className="w-5 h-5" style={{ color }} />;
    case 'database':
      return <Database className="w-5 h-5" style={{ color }} />;
    case 'mail':
      return <Mail className="w-5 h-5" style={{ color }} />;
    default:
      return <Sparkles className="w-5 h-5" style={{ color }} />;
  }
}
