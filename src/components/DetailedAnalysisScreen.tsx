import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  Info,
  Clock,
  Sparkles,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { AssessmentResult, WarningSignal } from '../services/assessmentService';
import { ScoreRing } from './ScoreRing';
import { RiskBadge } from './RiskBadge';

interface DetailedAnalysisScreenProps {
  result: AssessmentResult;
  onBackToBasic: () => void;
  onReport: () => void;
  onCheckAnother: () => void;
}

export const DetailedAnalysisScreen: React.FC<DetailedAnalysisScreenProps> = ({
  result,
  onBackToBasic,
  onReport,
  onCheckAnother,
}) => {
  const [hasMarkedReviewed, setHasMarkedReviewed] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToBasic}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-2 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Basic Results</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Demo analysis — local rules, not AI or a verified threat scan</span>
        </div>
      </div>

      {/* Main Score & Multi-Part Gauge Hero Card */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Larger Score Ring */}
          <div className="shrink-0">
            <ScoreRing score={result.riskScore} tier={result.riskTier} size="xl" showLabel={true} />
          </div>

          {/* Deep Breakdown & Explanation */}
          <div className="space-y-4 flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <RiskBadge tier={result.riskTier} size="md" />
              <span className="text-xs text-slate-400">Deterministic Heuristic Assessment</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Detailed Cybersecurity Threat Signal Breakdown
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {result.explanation}
            </p>

            <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <p>
                <strong>Evaluation Metric:</strong> A higher score reflects a higher count and severity of detected deceptive signals (e.g., OTP requests, artificial urgency, HTTP links), not an absolute mathematical probability of fraud.
              </p>
            </div>
          </div>
        </div>

        {/* Three-Part Low / Medium / High Risk Level Indicator Bar */}
        <div className="space-y-2 pt-6 border-t border-slate-800">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300 uppercase tracking-wider">
              Signal Spectrum Level
            </span>
            <span className="text-slate-400">
              Current Tier:{' '}
              <strong className="text-white uppercase">{result.riskTier} ({result.riskScore}/100)</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Low Segment */}
            <div
              className={`p-3 rounded-xl border text-center transition ${
                result.riskTier === 'low'
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950 ring-2 ring-emerald-500/50'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-xs font-bold uppercase">Low (0–29)</div>
              <div className="text-[11px] mt-0.5">Minimal heuristic triggers</div>
            </div>

            {/* Medium Segment */}
            <div
              className={`p-3 rounded-xl border text-center transition ${
                result.riskTier === 'medium'
                  ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-md shadow-amber-950 ring-2 ring-amber-500/50'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-xs font-bold uppercase">Medium (30–59)</div>
              <div className="text-[11px] mt-0.5">Cautious / Suspicious flags</div>
            </div>

            {/* High Segment */}
            <div
              className={`p-3 rounded-xl border text-center transition ${
                result.riskTier === 'high'
                  ? 'bg-rose-950/80 border-rose-400 text-rose-300 shadow-md shadow-rose-950 ring-2 ring-rose-500/50'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-xs font-bold uppercase">High (60–100)</div>
              <div className="text-[11px] mt-0.5">Critical scam indicators</div>
            </div>
          </div>
        </div>

        {/* Low Results Special Feature: Mark as Reviewed */}
        {result.riskTier === 'low' && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  User Acknowledgement Option
                </span>
                {hasMarkedReviewed && (
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-500 text-slate-950 font-bold rounded">
                    Acknowledged by User
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You can mark this item as reviewed for your records. <strong className="text-emerald-300">Important Note:</strong> This is a personal user acknowledgement, not a safety certification.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                hasMarkedReviewed
                  ? 'bg-emerald-800 text-white cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md hover:scale-[1.02]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{hasMarkedReviewed ? 'Reviewed & Acknowledged' : 'Mark as Reviewed'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Review Confirmation Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0E172E] border border-cyan-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Confirm User Acknowledgement
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              By marking this item as reviewed, you acknowledge that you have personally inspected this content.
            </p>
            <div className="p-3 bg-amber-950/60 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              <strong>Mandatory Honesty Notice:</strong> This action is an individual user record acknowledgement. It is <strong>NOT</strong> an official safety guarantee or threat-free certification. Cyber threats can evolve dynamically.
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setHasMarkedReviewed(true);
                  setShowReviewModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                I Understand & Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section: Detected Warning Signals */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>Detected Warning Signals ({result.signals.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Transparent explanation of specific rules triggered by the submitted content:
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            Rules engine v1.0
          </span>
        </div>

        {result.signals.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#080E20] border border-emerald-500/20 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Suspicious Signals Found</h4>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Our automated heuristics found no sensitive credential queries, artificial urgency deadlines, raw IP hostnames, or lottery scam phrases in this text.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {result.signals.map((sig, idx) => (
              <div
                key={sig.id}
                className="bg-[#080E20] border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-2 transition"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{sig.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {sig.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        sig.severity === 'high'
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {sig.severity} impact
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{sig.description}</p>

                {sig.matchedSnippet && (
                  <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-[11px] font-medium text-slate-400">Matched trigger:</span>
                    <code className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700 text-xs font-mono">
                      {sig.matchedSnippet}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section: Practical "What to Do Next" Recommendations */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-cyan-400" />
            <span>What to Do Next — Practical Action Checklist</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immediate protective recommendations tailored to the assessment findings:
          </p>
        </div>

        <div className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#080E20] border border-slate-800/80"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToBasic}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-800/40 text-sm font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Basic View</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onCheckAnother}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-800/40 text-sm font-semibold transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Check Another</span>
          </button>

          <button
            type="button"
            onClick={onReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-900/40 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Prepare Cyber Cell Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
