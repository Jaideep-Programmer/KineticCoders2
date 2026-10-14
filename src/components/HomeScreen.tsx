import React from 'react';
import {
  ShieldCheck,
  Search,
  FileText,
  AlertTriangle,
  ArrowRight,
  Lock,
  ChevronRight,
  ExternalLink,
  Shield,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { DEMO_PRESETS, RiskTier } from '../services/assessmentService';

interface HomeScreenProps {
  onStartAssessment: (presetKey?: keyof typeof DEMO_PRESETS) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartAssessment }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>College Hackathon Showcase • Local Heuristic Cyber Shield</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Pause. Check.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Stay protected.
          </span>
        </h1>

        {/* Subtitle / Short Description */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          KAVACH evaluates suspicious SMS alerts, unverified links, lottery claims, and urgent banking messages against known social engineering patterns.
        </p>

        {/* Large Central "+ Enter Here" Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onStartAssessment()}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
            aria-label="Enter Here to start cybersecurity assessment"
          >
            <span className="text-2xl leading-none font-bold text-slate-900 group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            <span>Enter Here</span>
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Demo Analysis Transparency Notice */}
        <p className="mt-4 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Demo analysis — local rules, not AI or a verified threat scan. Your text never leaves your browser.</span>
        </p>
      </section>

      {/* Preset Testing Shortcuts for Hackathon Reviewers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101A36] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Instant Test Scenarios
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Click any calibrated example to test the 3 distinct risk levels immediately:
              </p>
            </div>
            <span className="text-xs text-cyan-300/80 bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 font-medium self-start md:self-auto">
              Deterministic rule demonstration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Low Risk Preset */}
            <div
              onClick={() => onStartAssessment('ordinary')}
              className="group cursor-pointer bg-[#0A1022] hover:bg-[#131F3F] border border-emerald-500/30 rounded-xl p-5 transition-all hover:scale-[1.01] hover:border-emerald-400 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    Low Risk (0–29)
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                  Ordinary Message
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  &ldquo;{DEMO_PRESETS.ordinary.content}&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-medium">
                <span>Run Low Check</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Medium Risk Preset */}
            <div
              onClick={() => onStartAssessment('unverifiedLink')}
              className="group cursor-pointer bg-[#0A1022] hover:bg-[#131F3F] border border-amber-500/30 rounded-xl p-5 transition-all hover:scale-[1.01] hover:border-amber-400 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
                    Medium Risk (30–59)
                  </span>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                  Unverified Link
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  &ldquo;{DEMO_PRESETS.unverifiedLink.content}&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>Run Medium Check</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* High Risk Preset */}
            <div
              onClick={() => onStartAssessment('otpScam')}
              className="group cursor-pointer bg-[#0A1022] hover:bg-[#131F3F] border border-rose-500/30 rounded-xl p-5 transition-all hover:scale-[1.01] hover:border-rose-400 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-500/30">
                    High Risk (60–100)
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                  OTP & Banking Scam
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  &ldquo;{DEMO_PRESETS.otpScam.content}&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-rose-400 font-medium">
                <span>Run High Check</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How KAVACH Protects Your Digital Life
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Combining heuristic pattern detection with transparent cybersecurity guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0E172E] border border-slate-800 rounded-2xl p-6 shadow-md hover:border-cyan-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Social Engineering Check</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scans for predatory patterns such as artificial deadlines, OTP/PIN extortion, fake lottery jackpots, and coercive account suspension threats.
            </p>
          </div>

          <div className="bg-[#0E172E] border border-slate-800 rounded-2xl p-6 shadow-md hover:border-cyan-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Transparent Risk Ring</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculates a clear 0–100 signal score across Low, Medium, and High bands. Explains what triggered every point so you understand the risk.
            </p>
          </div>

          <div className="bg-[#0E172E] border border-slate-800 rounded-2xl p-6 shadow-md hover:border-cyan-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Cyber Cell Draft Report</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prepares a structured incident report draft formatted for easy filing with National Cyber Crime portal or your local police cyber cell.
            </p>
          </div>
        </div>
      </section>

      {/* Cyber Crime Helpline Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950/80 via-[#0D1C3D] to-indigo-950/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
              <span>National Cyber Crime Helpline (India)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Faced financial cyber fraud? Dial 1930 immediately
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Quick reporting within the golden hour enables law enforcement to liaise with banks and freeze transferred amounts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-900/40 transition"
            >
              Call 1930 Toll-Free
            </a>
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <span>Visit cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
