import React, { useState } from 'react';
import {
  Radio,
  FileCheck2,
  Scale,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode
} from 'lucide-react';

export const InteractiveCommandTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sos' | 'gd' | 'dncrp' | 'ai'>('sos');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [fineAmount, setFineAmount] = useState<number>(50000);
  const [selectedLegalQuestion, setSelectedLegalQuestion] = useState<string>(
    'What is the legal penalty for mobile snatching under Penal Code Section 379?'
  );

  const rewardAmount = Math.round(fineAmount * 0.25);

  const legalAnswers: Record<string, { answer: string; section: string }> = {
    'What is the legal penalty for mobile snatching under Penal Code Section 379?': {
      section: 'Penal Code 1860, Sec 379',
      answer:
        'Theft carries imprisonment of either description for a term which may extend to 3 years, or with fine, or with both. Cognizable and non-bailable.',
    },
    'Can I lodge an official General Diary (GD) online for a lost passport or NID?': {
      section: 'Police Regulations of Bengal (PRB)',
      answer:
        'Yes. Through SentinelX, citizen identity is verified via Porichoy biometric API, generating a tamper-proof cryptographic GD docket instantly recognized by immigration and banks.',
    },
    'What fine is imposed on shops selling goods above printed MRP?': {
      section: 'Consumer Rights Protection Act 2009, Sec 40',
      answer:
        'Selling above official MRP is punishable with imprisonment up to 1 year or a fine up to BDT 50,000. 25% of any realized fine is rewarded directly to the reporting citizen.',
    },
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0d1527]/95 dark:via-[#080d1a]/95 dark:to-[#04060c]/98 border border-slate-200 dark:border-[#02baff]/30 shadow-2xl shadow-[#0147bf]/20 dark:shadow-[#0147bf]/35 overflow-hidden backdrop-blur-xl relative group transition-colors duration-200 animate-glow-breathe">
      {/* Continuous Cyber Radar Scan Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#02baff] to-transparent animate-scan pointer-events-none z-20 opacity-70" />

      {/* Top Cyber Command Header */}
      <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-[#02baff]/20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] font-['Orbitron'] text-slate-800 dark:text-slate-300 font-semibold tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#0147bf] dark:text-[#02baff]" />
            SENTINEL-X LIVE TELEMETRY CONSOLE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            LIVE LINK
          </span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-4 border-b border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-slate-950/60 p-1.5 gap-1 text-[11px] font-['Orbitron'] font-medium">
        <button
          onClick={() => setActiveTab('sos')}
          className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'sos'
              ? 'bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-red-500 dark:text-red-400 animate-pulse" />
          <span className="hidden sm:inline">SOS Dispatch</span>
          <span className="sm:hidden">SOS</span>
        </button>

        <button
          onClick={() => setActiveTab('gd')}
          className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'gd'
              ? 'bg-[#0147bf]/10 dark:bg-[#0147bf]/30 text-[#0147bf] dark:text-[#02baff] border border-[#0147bf]/30 dark:border-[#02baff]/40 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-[#0147bf] dark:text-[#02baff]" />
          <span className="hidden sm:inline">GD Docket</span>
          <span className="sm:hidden">GD</span>
        </button>

        <button
          onClick={() => setActiveTab('dncrp')}
          className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'dncrp'
              ? 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="hidden sm:inline">25% Reward</span>
          <span className="sm:hidden">DNCRP</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'ai'
              ? 'bg-sky-500/15 dark:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-500/40 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span className="hidden sm:inline">SentiBot AI</span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-5 min-h-[290px] flex flex-col justify-between">
        {/* PANEL 1: SOS DISPATCH */}
        {activeTab === 'sos' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    Emergency Distress Routing Simulation
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Live GPS triangulation with designated Thana command patrol
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Target: Gulshan Division</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-red-400" /> GPS Coordinates:
                </span>
                <span className="text-slate-900 dark:text-white font-bold">23.8103° N, 90.4125° E</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Primary Assigned Unit:</span>
                <span className="text-[#0147bf] dark:text-[#02baff] font-bold">DMP Sector-11 Mobile Patrol-4</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Distress Status:</span>
                {sosTriggered ? (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40 text-[10px] font-bold animate-pulse">
                    ● DISPATCHING SI KAMRUL (ETA 4 MINS)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    READY ON STANDBY
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => setSosTriggered(!sosTriggered)}
                className={`flex-1 py-3 px-4 rounded-xl font-['Orbitron'] font-bold text-xs transition flex items-center justify-center gap-2 active:scale-95 ${
                  sosTriggered
                    ? 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                    : 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white shadow-lg shadow-red-600/30'
                }`}
              >
                <Radio className="w-4 h-4 text-white" />
                <span className="text-white">{sosTriggered ? 'RESET BEACON TEST' : 'TRIGGER DEMO DISTRESS BEACON'}</span>
              </button>
            </div>
          </div>
        )}

        {/* PANEL 2: GD DOCKET */}
        {activeTab === 'gd' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0147bf]/10 dark:bg-[#0147bf]/20 border border-[#0147bf]/30 dark:border-[#02baff]/40 text-[#0147bf] dark:text-[#02baff]">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    Tamper-Proof General Diary (GD)
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Cryptographically sealed by Central Cyber Crime Bureau
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">SX-2026-GD8849</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Complainant NID:</span>
                <span className="text-slate-900 dark:text-white font-bold">199226920150***** (Porichoy Verified)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Incident Classification:</span>
                <span className="text-[#0147bf] dark:text-[#02baff] font-bold">Theft / Electronic Snatching</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Jurisdiction Thana:</span>
                <span className="text-slate-900 dark:text-white">Banani Model Thana, DMP</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">SHA-256 Digest:</span>
                <span className="text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                  9b2d8e41a0293f0b2401f89311029c...
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-sans">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Legally admissible under Digital Evidence Act
              </span>
              <span className="font-mono text-slate-500">Instant PDF Receipt</span>
            </div>
          </div>
        )}

        {/* PANEL 3: DNCRP REWARD CALCULATOR */}
        {activeTab === 'dncrp' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 dark:border-amber-500/40 text-amber-600 dark:text-amber-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    DNCRP 25% Citizen Whistleblower Calculator
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Statutory cash reward under Consumer Rights Protection Act 2009
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 dark:text-slate-300">Administrative Penalty Imposed on Merchant:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-['Orbitron']">
                  ৳{fineAmount.toLocaleString()} BDT
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={fineAmount}
                onChange={e => setFineAmount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>৳10,000 (Minor Infraction)</span>
                <span>৳100,000</span>
                <span>৳200,000 (Major Syndicate)</span>
              </div>
            </div>

            {/* Calculated Reward Output Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-amber-800 dark:text-amber-300/80 font-mono font-medium block">
                  Citizen Legal Reward Rights (25%):
                </span>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-['Orbitron']">
                  ৳{rewardAmount.toLocaleString()}{' '}
                  <span className="text-xs font-sans text-amber-700 dark:text-amber-300">BDT</span>
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold">
                DNCRP Act Sec 76(1)
              </span>
            </div>
          </div>
        )}

        {/* PANEL 4: SENTIBOT AI LEGAL COPILOT */}
        {activeTab === 'ai' && (
          <div className="space-y-3.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30 dark:border-sky-500/40 text-sky-600 dark:text-sky-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    SentiBot AI Civic & Legal Copilot
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Trained on Bangladesh Penal Code, CrPC, and DNCRP 2009
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(legalAnswers).map(question => (
                <button
                  key={question}
                  onClick={() => setSelectedLegalQuestion(question)}
                  className={`text-left text-[11px] px-2.5 py-1.5 rounded-lg border transition ${
                    selectedLegalQuestion === question
                      ? 'bg-sky-500/15 dark:bg-sky-500/20 border-sky-400 text-sky-800 dark:text-sky-200 font-medium shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {question.length > 40 ? question.slice(0, 40) + '...' : question}
                </button>
              ))}
            </div>

            {/* AI Response Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-sans">
              <div className="flex items-center justify-between text-[11px] text-sky-700 dark:text-sky-400 font-mono font-medium">
                <span>Reference: {legalAnswers[selectedLegalQuestion]?.section}</span>
                <span className="text-slate-500 font-mono">AI Verified</span>
              </div>
              <p className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed">
                {legalAnswers[selectedLegalQuestion]?.answer}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          End-to-End Encrypted via National Digital Backbone
        </span>
        <span className="hidden sm:inline pr-14 lg:pr-18 text-slate-500">Port 5000 / TLS 1.3</span>
      </div>
    </div>
  );
};
