/**
 * KAVACH - Cybersecurity Risk Assessment Engine
 * Deterministic local heuristic analysis for educational and awareness purposes.
 * Note: Local heuristic rules only, not an AI model or live threat scanner.
 */

export type RiskTier = 'low' | 'medium' | 'high';

export interface WarningSignal {
  id: string;
  title: string;
  category: 'Credentials & Privacy' | 'Urgency & Intimidation' | 'Financial & Rewards' | 'Link & Network' | 'Impersonation';
  severity: 'high' | 'medium' | 'low';
  description: string;
  matchedSnippet?: string;
}

export interface AssessmentResult {
  rawInput: string;
  inputType: 'url' | 'message';
  riskScore: number; // 0 to 100
  riskTier: RiskTier;
  explanation: string;
  signals: WarningSignal[];
  recommendations: string[];
  timestamp: string;
}

// Demo preset samples guaranteed to demonstrate all three risk tiers predictably
export const DEMO_PRESETS = {
  ordinary: {
    label: 'Ordinary Message',
    tier: 'low' as RiskTier,
    type: 'message' as const,
    content: 'Hey Priya, the project review meeting is rescheduled to 4 PM today in room 302. Please bring your updated slide deck and laptop.',
  },
  unverifiedLink: {
    label: 'Unverified Link',
    tier: 'medium' as RiskTier,
    type: 'message' as const,
    content: 'Delivery Notice: Your parcel #IN8892 could not be delivered due to an incomplete street address. Please verify your address at http://192.168.1.105/package-tracking or bit.ly/deliv-re-check within 24 hours to avoid return to sender.',
  },
  otpScam: {
    label: 'OTP Scam',
    tier: 'high' as RiskTier,
    type: 'message' as const,
    content: 'URGENT: Your SBI Bank savings account #XXXX9012 has been SUSPENDED due to pending KYC verification! Immediately verify your details and enter your OTP, ATM PIN, and NetBanking password at http://sbi-kyc-verify-portal.in/login within 2 hours to avoid permanent deactivation and legal penalties!',
  },
};

/**
 * Deterministic rule-based assessment
 */
export function analyzeInput(input: string, forcedType?: 'url' | 'message'): AssessmentResult {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  const detectedSignals: WarningSignal[] = [];

  // Determine input type
  const isUrl = forcedType === 'url' || (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(trimmed) && !trimmed.includes(' '));
  const inputType: 'url' | 'message' = isUrl ? 'url' : 'message';

  let rawScore = 5; // Baseline minimal uncertainty score

  // 1. RULE: Sensitive Credential Requests (OTP, PIN, Password, CVV)
  const credentialRegex = /\b(otp|one[\s-]?time[\s-]?password|atm\s*pin|security\s*pin|cvv|cvv2|netbanking\s*password|login\s*password|card\s*number|mpin)\b/i;
  if (credentialRegex.test(trimmed)) {
    const match = trimmed.match(credentialRegex);
    detectedSignals.push({
      id: 'sig-credentials',
      title: 'Direct Request for Sensitive Credentials',
      category: 'Credentials & Privacy',
      severity: 'high',
      description: 'Legitimate banks, government portals, and service providers never ask you to share your OTP, PIN, password, or CVV over messages or unverified links.',
      matchedSnippet: match ? match[0] : 'OTP / PIN / Password keywords',
    });
    rawScore += 38;
  }

  // 2. RULE: Extreme Urgency & Account Suspension Intimidation
  const urgencyRegex = /\b(urgent|immediately|within\s*\d+\s*(hours?|minutes?|hrs|mins)|suspended|blocked|deactivated|terminated|legal\s*action|police|arrest|court\s*notice|act\s*now|last\s*chance|permanent\s*lock)\b/i;
  if (urgencyRegex.test(trimmed)) {
    const match = trimmed.match(urgencyRegex);
    detectedSignals.push({
      id: 'sig-urgency',
      title: 'Artificial Urgency or Coercive Threat',
      category: 'Urgency & Intimidation',
      severity: 'high',
      description: 'Attackers create panic and tight deadlines (e.g., "account suspended within 2 hours") to pressure victims into making impulsive security decisions without verifying.',
      matchedSnippet: match ? match[0] : 'Urgency indicator',
    });
    rawScore += 26;
  }

  // 3. RULE: Insecure HTTP Protocol
  const hasHttp = /\bhttp:\/\//i.test(trimmed);
  if (hasHttp) {
    detectedSignals.push({
      id: 'sig-insecure-http',
      title: 'Insecure Plaintext Link (HTTP)',
      category: 'Link & Network',
      severity: 'medium',
      description: 'The link uses unencrypted HTTP instead of secure HTTPS. Modern legitimate banking, commerce, and login portals require HTTPS encryption.',
      matchedSnippet: 'http://',
    });
    rawScore += 18;
  }

  // 4. RULE: Raw IP Address Hostname in URL
  const ipRegex = /\b(?:http[s]?:\/\/)?(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?\b/i;
  if (ipRegex.test(trimmed)) {
    const match = trimmed.match(ipRegex);
    detectedSignals.push({
      id: 'sig-raw-ip',
      title: 'Raw IP Address Hostname',
      category: 'Link & Network',
      severity: 'high',
      description: 'The address points to a raw numeric IP address rather than a registered domain name. This is a common tactic to evade domain reputation filters.',
      matchedSnippet: match ? match[0] : 'Numeric IP address',
    });
    rawScore += 25;
  }

  // 5. RULE: URL Shortener / Link Obfuscation
  const shortenerRegex = /\b(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|ow\.ly|buff\.ly|rb\.gy|shorturl\.at)\b/i;
  if (shortenerRegex.test(trimmed)) {
    const match = trimmed.match(shortenerRegex);
    detectedSignals.push({
      id: 'sig-shortener',
      title: 'Obfuscated Shortened Link',
      category: 'Link & Network',
      severity: 'medium',
      description: 'Link shorteners hide the real destination address, making it impossible to see where the link redirects before clicking.',
      matchedSnippet: match ? match[0] : 'Shortener service',
    });
    rawScore += 18;
  }

  // 6. RULE: Financial Prizes, Lotteries, or Free Rewards
  const prizeRegex = /\b(won|winner|lottery|jackpot|crore|lakh|free\s*cash|cashback|reward\s*points|gift\s*card|claim\s*prize|congratulations\s*you)\b/i;
  if (prizeRegex.test(trimmed)) {
    const match = trimmed.match(prizeRegex);
    detectedSignals.push({
      id: 'sig-prize',
      title: 'Unexpected Reward / Lottery Claim',
      category: 'Financial & Rewards',
      severity: 'high',
      description: 'Promises of unsolicited lottery wins, unexpected cash rewards, or luxury prizes are typical lures for advance-fee scams.',
      matchedSnippet: match ? match[0] : 'Reward claim indicator',
    });
    rawScore += 24;
  }

  // 7. RULE: Brand Impersonation & Fake Portals
  const impersonationRegex = /\b(sbi|hdfc|icici|axis|punjab\s*national|paytm|phonepe|gpay|income\s*tax|electricity\s*bill|aadhaar|pan\s*card|kyc)\b/i;
  const isDemoScamDomain = /\b(kyc-verify|portal|update-portal|login-secure|support-desk|refund-center)\b/i;
  if (impersonationRegex.test(trimmed) && (isDemoScamDomain.test(trimmed) || urgencyRegex.test(trimmed) || hasHttp)) {
    const match = trimmed.match(impersonationRegex);
    detectedSignals.push({
      id: 'sig-impersonation',
      title: 'High-Profile Brand / Authority Impersonation',
      category: 'Impersonation',
      severity: 'medium',
      description: 'The text references established institutions (banks, utility providers, or tax portals) paired with unverified or alarming action prompts.',
      matchedSnippet: match ? match[0].toUpperCase() : 'Institution name',
    });
    rawScore += 15;
  }

  // 8. RULE: Payment / Money Transfer Prompts
  const paymentRegex = /\b(transfer\s*funds|scan\s*qr|enter\s*upi|pay\s*now|wire\s*transfer|processing\s*fee|refundable\s*deposit)\b/i;
  if (paymentRegex.test(trimmed)) {
    const match = trimmed.match(paymentRegex);
    detectedSignals.push({
      id: 'sig-payment',
      title: 'Prompt for Instant Money Transfer',
      category: 'Financial & Rewards',
      severity: 'medium',
      description: 'Direct instructions to make instant payments or scan a QR code to receive money (a common UPI reverse scam tactic).',
      matchedSnippet: match ? match[0] : 'Payment trigger',
    });
    rawScore += 18;
  }

  // Clamp risk score to 0 - 100
  let finalScore = Math.min(100, Math.max(0, rawScore));

  // Determine Tier
  let riskTier: RiskTier = 'low';
  if (finalScore >= 60) {
    riskTier = 'high';
  } else if (finalScore >= 30) {
    riskTier = 'medium';
  } else {
    riskTier = 'low';
  }

  // Generate concise explanation and practical recommendations
  let explanation = '';
  const recommendations: string[] = [];

  if (riskTier === 'high') {
    explanation = `High risk detected (${detectedSignals.length} critical warning signals). The submission exhibits severe social engineering indicators such as ${detectedSignals.map((s) => s.title.toLowerCase()).slice(0, 2).join(' and ')}. Exercise extreme caution and do not interact.`;
    recommendations.push('Do NOT click any links, enter any credentials, or reply to this communication.');
    recommendations.push('Never disclose your OTP, PIN, password, or bank card details to anyone under any circumstance.');
    recommendations.push('Contact the institution directly using official numbers printed on your physical card or official website.');
    recommendations.push('Preserve screenshots and phone numbers to compile a formal report for the Cyber Crime portal.');
  } else if (riskTier === 'medium') {
    explanation = `Moderate risk detected (${detectedSignals.length} warning signals found). The submission contains cautionary elements such as ${detectedSignals.map((s) => s.title.toLowerCase()).slice(0, 2).join(' or ')}. Verify the sender through official secondary channels before proceeding.`;
    recommendations.push('Verify the sender identity independently through official customer support channels.');
    recommendations.push('Do not use links provided in the message; manually navigate to the known official website.');
    recommendations.push('Inspect full URLs carefully for spelling variations (typosquatting) or unexpected domain extensions.');
    recommendations.push('If unsure, consult a trusted colleague, tech lead, or family member before sharing any information.');
  } else {
    explanation = 'Low risk detected. No obvious social engineering heuristics, credential solicitations, or coercive urgency flags were identified in this message.';
    recommendations.push('Always practice basic cyber hygiene: ensure links begin with valid HTTPS and match legitimate domains.');
    recommendations.push('Remember that cybercriminals constantly adapt; absence of automated red flags does not guarantee total safety.');
    recommendations.push('If unexpected financial requests arise later in this conversation, pause and re-verify.');
  }

  return {
    rawInput: trimmed,
    inputType,
    riskScore: finalScore,
    riskTier,
    explanation,
    signals: detectedSignals,
    recommendations,
    timestamp: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };
}

/**
 * Validates user input before analysis
 */
export function validateAssessmentInput(
  input: string,
  mode: 'message' | 'url'
): { isValid: boolean; errorMessage?: string } {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: mode === 'url' ? 'Please enter a website URL to evaluate.' : 'Please enter or paste the message, email, or SMS text to evaluate.',
    };
  }

  if (mode === 'url') {
    // Check for valid URL format (accept http, https, or domain format)
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/i;
    const ipPattern = /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/\S*)?$/i;

    if (!urlPattern.test(trimmed) && !ipPattern.test(trimmed)) {
      return {
        isValid: false,
        errorMessage: 'Invalid URL format. Please provide a valid address (e.g., https://example.com or http://192.168.1.1).',
      };
    }
  }

  return { isValid: true };
}
