import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { RiskTier } from '../services/assessmentService';

interface RiskBadgeProps {
  tier: RiskTier;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ tier, size = 'md' }) => {
  const configs = {
    low: {
      label: 'Low Risk (0–29)',
      subtext: 'Minimal signals detected',
      icon: ShieldCheck,
      classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    medium: {
      label: 'Medium Risk (30–59)',
      subtext: 'Suspicious elements found',
      icon: AlertTriangle,
      classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-400',
    },
    high: {
      label: 'High Risk (60–100)',
      subtext: 'Critical threat indicators',
      icon: ShieldAlert,
      classes: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-400',
    },
  }[tier];

  const Icon = configs.icon;
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border font-semibold ${configs.classes} ${sizeClasses}`}
    >
      <span className={`w-2 h-2 rounded-full animate-pulse ${configs.dot}`} />
      <Icon className="w-4 h-4 shrink-0" />
      <span>{configs.label}</span>
    </div>
  );
};
