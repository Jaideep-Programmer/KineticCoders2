import React from 'react';
import { Shield, PhoneCall, ExternalLink, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'assess' | 'report') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-[#0B132B]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Shield Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl p-1 transition"
          aria-label="Kavach Home"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition">
            <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
              <ShieldAlert className="w-2.5 h-2.5 text-[#0B132B]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-white">
                KAVACH
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-cyan-200/70 font-medium tracking-wide">
              Your Digital Guardian
            </p>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              currentView === 'home'
                ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('assess')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              currentView === 'assess' || currentView === 'basic_result' || currentView === 'detailed_result'
                ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Risk Scanner
          </button>

          {/* National Cyber Helpline Button */}
          <a
            href="tel:1930"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 border border-rose-500/40 text-xs font-bold transition shadow-sm"
            title="National Cyber Crime Reporting Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span>Cyber Helpline: 1930</span>
          </a>

          {/* Official Cybercrime Portal External Link */}
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 transition px-2 py-1"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
};
