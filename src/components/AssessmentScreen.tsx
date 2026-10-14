import React, { useState } from 'react';
import {
  Shield,
  Link as LinkIcon,
  MessageSquare,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import {
  DEMO_PRESETS,
  validateAssessmentInput,
  analyzeInput,
  AssessmentResult,
} from '../services/assessmentService';

interface AssessmentScreenProps {
  initialPreset?: keyof typeof DEMO_PRESETS | null;
  onAssessmentComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  initialPreset,
  onAssessmentComplete,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'message' | 'url'>('message');
  const [inputText, setInputText] = useState<string>(() => {
    if (initialPreset && DEMO_PRESETS[initialPreset]) {
      return DEMO_PRESETS[initialPreset].content;
    }
    return '';
  });
  const [urlInput, setUrlInput] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');

  const handlePresetSelect = (presetKey: keyof typeof DEMO_PRESETS) => {
    const preset = DEMO_PRESETS[presetKey];
    setActiveTab('message');
    setInputText(preset.content);
    setValidationError(null);
  };

  const handleStartAnalysis = () => {
    const targetContent = activeTab === 'message' ? inputText : urlInput;
    const validation = validateAssessmentInput(targetContent, activeTab);

    if (!validation.isValid) {
      setValidationError(validation.errorMessage || 'Invalid input.');
      return;
    }

    setValidationError(null);
    setIsAnalyzing(true);

    // Heuristic multi-stage scan simulation (quick 750ms for realistic cybersecurity verification feel)
    setScanStep('Inspecting credential & OTP solicitation patterns...');
    setTimeout(() => {
      setScanStep('Checking link protocols, domain obfuscation & network markers...');
    }, 280);

    setTimeout(() => {
      setScanStep('Evaluating social engineering urgency & coercive threats...');
    }, 520);

    setTimeout(() => {
      const result = analyzeInput(targetContent, activeTab);
      setIsAnalyzing(false);
      onAssessmentComplete(result);
    }, 780);
  };

  const handleClear = () => {
    if (activeTab === 'message') {
      setInputText('');
    } else {
      setUrlInput('');
    }
    setValidationError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner / Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cyber Risk Assessment Scanner
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Analyze suspicious messages, emails, alerts, or website URLs against local heuristics.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition"
        >
          Cancel
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-[#0E172E] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Preset Selector Bar */}
        <div className="bg-[#0A1022] p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">
              Preset Demonstrations:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handlePresetSelect('ordinary')}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/60 font-medium transition"
            >
              1. Ordinary Message (Low)
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('unverifiedLink')}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-900/60 font-medium transition"
            >
              2. Unverified Link (Medium)
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('otpScam')}
              className="text-xs px-3 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:border-rose-400 hover:bg-rose-900/60 font-medium transition"
            >
              3. OTP Scam (High)
            </button>
          </div>
        </div>

        {/* Input Mode Selector Tabs */}
        <div className="flex border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('message');
              setValidationError(null);
            }}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              activeTab === 'message'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pasted Message / SMS / Email Text</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setValidationError(null);
            }}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              activeTab === 'url'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Website Address (URL)</span>
          </button>
        </div>

        {/* Input Fields */}
        {activeTab === 'message' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="message-input"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Suspicious Message or Notification Content
              </label>
              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear text</span>
                </button>
              )}
            </div>
            <textarea
              id="message-input"
              rows={6}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Paste the SMS, WhatsApp message, email body, lottery notification, or banking alert here..."
              className="w-full bg-[#080E20] border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-sans leading-relaxed transition"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Supports multilingual text, links embedded in messages, and SMS headers</span>
              <span>{inputText.length} characters</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="url-input"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Website Link to Evaluate
              </label>
              {urlInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear URL</span>
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <input
                id="url-input"
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. http://192.168.1.105/login or https://example.com"
                className="w-full bg-[#080E20] border border-slate-700 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-mono transition"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              KAVACH inspects protocols (HTTP vs HTTPS), IP addresses, and shortener patterns without actually connecting to the target server.
            </p>
          </div>
        )}

        {/* Validation Error Message */}
        {validationError && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* Privacy & Honesty Banner */}
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">Privacy Guarantee</p>
            <p className="text-slate-300 leading-relaxed">
              Submissions are analyzed solely in your local browser memory and never persisted or shared. <span className="text-cyan-300 font-medium">Please do NOT paste actual personal passwords, genuine OTPs, or bank card PINs.</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-semibold transition"
          >
            Back to Home
          </button>
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleStartAnalysis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                <span>Running Heuristic Scan...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-slate-950" />
                <span>Analyze Risk Signals</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Loading Overlay Details */}
        {isAnalyzing && (
          <div className="pt-2 border-t border-slate-800 text-center animate-pulse">
            <span className="text-xs font-mono text-cyan-400">
              {scanStep || 'Evaluating security heuristics...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
