import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { AssessmentResult } from '../services/assessmentService';

interface ReportScreenProps {
  result: AssessmentResult | null;
  onBackToAssessment: () => void;
  onBackToHome: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  result,
  onBackToAssessment,
  onBackToHome,
}) => {
  const [incidentPlatform, setIncidentPlatform] = useState<string>('WhatsApp / SMS');
  const [incidentDescription, setIncidentDescription] = useState<string>(
    'Received unexpected message from unknown sender claiming urgent action required. Sender requested personal authentication details and provided an unverified link.'
  );
  const [senderContact, setSenderContact] = useState<string>('+91 98765 43210 (Example)');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadDraft = () => {
    const timestamp = new Date().toISOString();
    const scoreText = result ? `${result.riskScore}/100 (${result.riskTier.toUpperCase()} RISK)` : 'N/A';
    const signalsList = result && result.signals.length > 0
      ? result.signals.map((s, i) => `   ${i + 1}. [${s.category}] ${s.title}: ${s.description}`).join('\n')
      : '   - No specific automated red flags detected in local heuristic pass.';

    const reportContent = `======================================================================
               KAVACH — YOUR DIGITAL GUARDIAN
              INCIDENT COMPLAINT DRAFT REPORT
======================================================================
NOTICE: THIS DRAFT HAS NOT BEEN SUBMITTED TO AUTHORITIES.
IT HAS BEEN ASSEMBLED LOCALLY IN YOUR BROWSER TO HELP YOU LODGE AN
OFFICIAL COMPLAINT WITH CYBER CRIME AUTHORITIES.
======================================================================

1. INCIDENT GENERAL DETAILS
----------------------------------------------------------------------
Report Draft Generated: ${new Date().toLocaleString('en-IN')}
Incident Communication Channel: ${incidentPlatform}
Sender Identifier / Phone / Handle: ${senderContact || 'Not Specified'}

2. USER DESCRIPTION OF INCIDENT
----------------------------------------------------------------------
${incidentDescription}

3. SUSPICIOUS CONTENT EVALUATED
----------------------------------------------------------------------
${result ? result.rawInput : 'No content recorded.'}

4. KAVACH HEURISTIC ASSESSMENT SUMMARY
----------------------------------------------------------------------
Heuristic Signal Score: ${scoreText}
Assessment Note: Demo analysis based on local heuristic rules.
Higher scores represent more detected social engineering triggers.

Detected Threat Signals:
${signalsList}

5. IMMEDIATE RECOMMENDATIONS GIVEN TO USER
----------------------------------------------------------------------
${result ? result.recommendations.map((r, i) => `   ${i + 1}. ${r}`).join('\n') : '   1. Do not share OTPs, passwords, or bank details.'}

======================================================================
6. OFFICIAL REPORTING INSTRUCTIONS & HELPLINES (INDIA)
======================================================================
- National Cyber Crime Reporting Portal: https://cybercrime.gov.in/
- National Cyber Crime Helpline (24x7 Toll Free): 1930
  (Dial immediately if financial fraud has occurred to freeze accounts)
- Local State Police Cyber Crime Cell: Visit your nearest police station

DISCLAIMER:
Kavach is an educational awareness tool and does not replace official
law enforcement complaint registration. You must manually copy or upload
this draft when filing at cybercrime.gov.in or presenting at the police station.
======================================================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KAVACH-Incident-Report-Draft-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToAssessment}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-2 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment</span>
        </button>

        <button
          onClick={onBackToHome}
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition"
        >
          Home
        </button>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/70 border-2 border-amber-500/50 shadow-lg text-amber-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Important Notice: This draft has NOT been submitted to authorities.</span>
        </div>
        <p className="text-xs leading-relaxed text-amber-200/90">
          KAVACH generates an offline, printable text draft for your convenience. To file a legally binding complaint, you must visit the official government portal or call the helpline directly. <strong className="text-white">Kavach does not automatically transmit your submitted content to external websites.</strong>
        </p>
      </div>

      {/* Main Report Form Card */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Cyber Crime Incident Report Draft</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Fill out the context below to generate a standardized incident report ready for official submission.
          </p>
        </div>

        {/* Incident Summary Pill Header */}
        {result && (
          <div className="bg-[#080E20] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400">Assessed Threat Level: </span>
              <span
                className={`font-bold uppercase ${
                  result.riskTier === 'high'
                    ? 'text-rose-400'
                    : result.riskTier === 'medium'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {result.riskTier} Risk ({result.riskScore}/100)
              </span>
              <div className="text-slate-400 text-[11px] mt-0.5 font-mono truncate max-w-md">
                Snippet: &ldquo;{result.rawInput.slice(0, 80)}...&rdquo;
              </div>
            </div>
            <div className="text-slate-400 text-[11px] self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              {result.signals.length} warning signals logged
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="platform-select"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Communication Channel
              </label>
              <select
                id="platform-select"
                value={incidentPlatform}
                onChange={(e) => setIncidentPlatform(e.target.value)}
                className="w-full bg-[#080E20] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="WhatsApp / SMS">WhatsApp / SMS</option>
                <option value="Email Phishing">Email Phishing</option>
                <option value="Telegram / Social Media">Telegram / Social Media</option>
                <option value="Voice Call / Vishing">Voice Call / Vishing</option>
                <option value="Fake Website / Browser">Fake Website / Browser</option>
                <option value="UPI / Payment App">UPI / Payment App</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sender-contact"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Sender Phone Number / Email / URL
              </label>
              <input
                id="sender-contact"
                type="text"
                value={senderContact}
                onChange={(e) => setSenderContact(e.target.value)}
                placeholder="e.g. +91 98765 43210 or sender@fakebank.com"
                className="w-full bg-[#080E20] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="incident-desc"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5"
            >
              Incident Narrative / How You Received It
            </label>
            <textarea
              id="incident-desc"
              rows={4}
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              placeholder="Describe the sequence of events: who contacted you, what urgency was applied, whether any financial transaction took place..."
              className="w-full bg-[#080E20] border border-slate-700 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 leading-relaxed"
            />
          </div>
        </div>

        {/* Download Draft Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Compiled locally in memory. Nothing is sent to any server.</span>
          </div>

          <button
            type="button"
            onClick={handleDownloadDraft}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Incident Report Draft (.txt)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Report draft downloaded successfully! You can attach or reference this file when reporting to Cyber Cell.
            </span>
          </div>
        )}
      </div>

      {/* Official Authorities Links & Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Official Portal Link */}
        <div className="bg-[#0E172E] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Official Reporting Portal
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-white">
              National Cyber Crime Reporting Portal
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official Government of India portal for filing cyber fraud complaints, financial crimes, and identity theft.
            </p>
          </div>
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 hover:border-cyan-500/50 transition"
          >
            <span>Proceed to cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 2: Emergency Helpline 1930 */}
        <div className="bg-[#0E172E] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Immediate Action Hotline
              </span>
              <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-white">
              Toll-Free Cyber Helpline: 1930
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If money has been debited fraudulently, dial 1930 immediately (Citizens Financial Cyber Fraud Reporting System) to prevent the money from leaving the banking system.
            </p>
          </div>
          <a
            href="tel:1930"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-500/40 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span>Call 1930 Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
