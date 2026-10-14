/**
 * Reusable animated Circular Score Ring for KAVACH Risk Indicator
 */

import React from 'react';
import { RiskTier } from '../services/assessmentService';

interface ScoreRingProps {
  score: number;
  tier: RiskTier;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  tier,
  size = 'md',
  showLabel = true,
}) => {
  // Dimension configurations
  const dimensions = {
    sm: { diameter: 100, strokeWidth: 8, fontSize: 'text-2xl', subSize: 'text-xs' },
    md: { diameter: 140, strokeWidth: 10, fontSize: 'text-4xl', subSize: 'text-sm' },
    lg: { diameter: 180, strokeWidth: 12, fontSize: 'text-5xl', subSize: 'text-sm' },
    xl: { diameter: 220, strokeWidth: 14, fontSize: 'text-6xl', subSize: 'text-base' },
  }[size];

  const radius = (dimensions.diameter - dimensions.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // Tier color setup
  const tierConfig = {
    low: {
      strokeColor: '#10B981', // Emerald green
      glowColor: 'rgba(16, 185, 129, 0.25)',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
      label: 'LOW RISK',
    },
    medium: {
      strokeColor: '#F59E0B', // Amber
      glowColor: 'rgba(245, 158, 11, 0.25)',
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
      label: 'MEDIUM RISK',
    },
    high: {
      strokeColor: '#EF4444', // Red
      glowColor: 'rgba(239, 68, 68, 0.3)',
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
      label: 'HIGH RISK',
    },
  }[tier];

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-700"
        style={{
          width: dimensions.diameter,
          height: dimensions.diameter,
          boxShadow: `0 0 35px ${tierConfig.glowColor}`,
        }}
      >
        <svg
          width={dimensions.diameter}
          height={dimensions.diameter}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          {/* Background Track */}
          <circle
            cx={dimensions.diameter / 2}
            cy={dimensions.diameter / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={dimensions.strokeWidth}
          />
          {/* Foreground Animated Progress Ring */}
          <circle
            cx={dimensions.diameter / 2}
            cy={dimensions.diameter / 2}
            r={radius}
            fill="transparent"
            stroke={tierConfig.strokeColor}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className={`font-mono font-bold tracking-tight ${dimensions.fontSize} ${tierConfig.textColor}`}>
              {clampedScore}
            </span>
            <span className="text-slate-400 text-xs font-semibold ml-0.5">/100</span>
          </div>
          <span className={`text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5`}>
            Risk Score
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 text-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${tierConfig.badgeBg}`}
          >
            {tierConfig.label}
          </span>
        </div>
      )}
    </div>
  );
};
