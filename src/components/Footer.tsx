import React from 'react';
import { Shield, Mail, Phone, ExternalLink, AlertCircle, Lock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#070D1E] border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1: About KAVACH */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-white font-bold tracking-wide">KAVACH — Your Digital Guardian</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An educational cybersecurity risk assessment initiative developed for college hackathons. Provides transparent heuristic analysis of suspicious communications, phishing indicators, and deceptive links.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-cyan-300">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cybersecurity Awareness MVP Showcase</span>
            </div>
          </div>

          {/* Col 2: Cyber Cell Helpline & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Emergency Cyber Crime Cell
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  National Helpline:{' '}
                  <a href="tel:1930" className="text-white font-bold hover:underline">
                    1930 (Toll Free, 24x7)
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Cyber Cell Email:{' '}
                  <span className="text-slate-300 font-mono">cybercell-support@gov-demo.in</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Official Portal:{' '}
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    cybercrime.gov.in
                  </a>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              *If you have suffered immediate financial loss, dial 1930 immediately to freeze fraudulent transactions.
            </p>
          </div>

          {/* Col 3: Privacy & Security Pledge */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Privacy & Truth-in-Analysis
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submissions remain in local browser memory and are evaluated using deterministic local heuristic rules. No data is stored, tracked, or sent to external AI servers.
            </p>
            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-[11px] text-amber-300/90 flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Safety Disclaimer: A low risk score does not guarantee absolute safety. Never enter credentials or OTPs on unverified portals.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} KAVACH — Your Digital Guardian. Built for College Hackathon Presentation.</p>
          <p className="text-slate-400">
            Demo analysis — local rules, not AI or a verified threat scan.
          </p>
        </div>
      </div>
    </footer>
  );
};
