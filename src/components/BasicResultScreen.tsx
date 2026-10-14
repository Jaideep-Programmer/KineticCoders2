import React from 'react';
import {
  FileText,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Info,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { AssessmentResult } from '../services/assessmentService';
import { ScoreRing } from './ScoreRing';
import { RiskBadge } from './RiskBadge';

interface BasicResultScreenProps {
  result: AssessmentResult;
  onDetailedAnalysis: () => void;
  onReport: () => void;
  onCheckAnother: () => void;
}

export const BasicResultScreen: React.FC<BasicResultScreenProps> = ({
  result,
  onDetailedAnalysis,
  onReport,
  onCheckAnother,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner Notice: Mandatory Disclosure */}
      <div className="mb-6 p-3 rounded-xl bg-[#0F172A] border border-cyan-500/30 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-cyan-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-semibold">
            Demo analysis — local rules, not AI or a verified threat scan
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>{result.timestamp}</span>
        </div>
      </div>

      {/* Primary Card */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Header Section with Score Gauge and Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800">
          {/* Circular Score Gauge */}
          <div className="shrink-0">
            <ScoreRing score={result.riskScore} tier={result.riskTier} size="lg" showLabel={false} />
          </div>

          {/* Core Findings & Tier Badge */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <RiskBadge tier={result.riskTier} size="lg" />
              <span className="text-xs text-slate-400 font-mono">
                {result.inputType === 'url' ? 'Link Evaluation' : 'Text Evaluation'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {result.riskTier === 'high' && 'Critical Threat Indicators Detected'}
              {result.riskTier === 'medium' && 'Suspicious Social Engineering Signals Found'}
              {result.riskTier === 'low' && 'Minimal Automated Red Flags Detected'}
            </h2>

            {/* Concise Explanation */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {result.explanation}
            </p>

            {/* Clarification on Scoring Meaning */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Higher scores mean <strong className="text-slate-200">more warning signals</strong>, not a probability of fraud.
              </span>
            </div>
          </div>
        </div>

        {/* Input Summary Snippet */}
        <div className="bg-[#080E20] border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Evaluated Content Preview
          </span>
          <p className="text-xs text-slate-300 font-mono truncate max-w-full">
            &ldquo;{result.rawInput}&rdquo;
          </p>
        </div>

        {/* Safety Truth Reminder */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Important Cybersecurity Principle:</strong> A low score, valid HTTPS lock, or professionally formatted website does <em>never</em> automatically prove an interaction is authentic. Always double-check unsolicited requests directly with service providers.
          </p>
        </div>

        {/* Action Buttons: Detailed Analysis, Report, Check Another */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCheckAnother}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800 text-sm font-semibold transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Check Another</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onReport}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/40 text-sm font-bold transition shadow-sm"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Report to Cyber Cell</span>
            </button>

            <button
              type="button"
              onClick={onDetailedAnalysis}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] transition"
            >
              <span>Detailed Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
