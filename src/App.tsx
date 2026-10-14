/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { BasicResultScreen } from './components/BasicResultScreen';
import { DetailedAnalysisScreen } from './components/DetailedAnalysisScreen';
import { ReportScreen } from './components/ReportScreen';
import { AssessmentResult, DEMO_PRESETS } from './services/assessmentService';

type ViewMode = 'home' | 'assess' | 'basic_result' | 'detailed_result' | 'report';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof DEMO_PRESETS | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Handlers
  const handleStartAssessment = (presetKey?: keyof typeof DEMO_PRESETS) => {
    if (presetKey) {
      setSelectedPreset(presetKey);
    } else {
      setSelectedPreset(null);
    }
    setCurrentView('assess');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentView('basic_result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetailedAnalysis = () => {
    setCurrentView('detailed_result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBasic = () => {
    setCurrentView('basic_result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReport = () => {
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckAnother = () => {
    setSelectedPreset(null);
    setCurrentView('assess');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070D1E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'home') handleBackToHome();
          if (view === 'assess') handleStartAssessment();
          if (view === 'report') handleReport();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeScreen onStartAssessment={handleStartAssessment} />
        )}

        {currentView === 'assess' && (
          <AssessmentScreen
            initialPreset={selectedPreset}
            onAssessmentComplete={handleAssessmentComplete}
            onCancel={handleBackToHome}
          />
        )}

        {currentView === 'basic_result' && assessmentResult && (
          <BasicResultScreen
            result={assessmentResult}
            onDetailedAnalysis={handleDetailedAnalysis}
            onReport={handleReport}
            onCheckAnother={handleCheckAnother}
          />
        )}

        {currentView === 'detailed_result' && assessmentResult && (
          <DetailedAnalysisScreen
            result={assessmentResult}
            onBackToBasic={handleBackToBasic}
            onReport={handleReport}
            onCheckAnother={handleCheckAnother}
          />
        )}

        {currentView === 'report' && (
          <ReportScreen
            result={assessmentResult}
            onBackToAssessment={() => {
              if (assessmentResult) {
                setCurrentView('basic_result');
              } else {
                setCurrentView('assess');
              }
            }}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>

      {/* Footer with Helpline, Cyber Cell Placeholders & Transparency Notes */}
      <Footer />
    </div>
  );
}
