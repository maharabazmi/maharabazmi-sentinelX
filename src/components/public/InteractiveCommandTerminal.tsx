import React, { useState } from 'react';
import {
  Radio,
  Scale,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MapPin,
  Barcode,
  AlertTriangle,
  Wifi,
  WifiOff,
  Mic,
  ChevronRight
} from 'lucide-react';

interface BarcodeSample {
  code: string;
  label: string;
  product: string;
  brand: string;
  mrp: number;
  charged: number;
  bstiStatus: 'VERIFIED' | 'COUNTERFEIT' | 'OVERPRICED';
  licenseNo: string;
  verdict: string;
}

interface AIPromptSample {
  prompt: string;
  badge: string;
  intent: 'CRIME_REPORT' | 'CONSUMER_DISPUTE';
  category: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  extractedLocation: string;
  matchedJurisdiction: string;
  actionLabel: string;
}

export const InteractiveCommandTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sos' | 'bsti' | 'dncrp' | 'ai'>('sos');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosOfflineMode, setSosOfflineMode] = useState(false);
  const [fineAmount, setFineAmount] = useState<number>(50000);

  const barcodeSamples: BarcodeSample[] = [
    {
      code: '8901030491024',
      label: 'Infant Milk Formula (Overpriced)',
      product: 'Lactogen Infant Formula 400g',
      brand: 'Nestlé BD Authorized',
      mrp: 1850,
      charged: 2450,
      bstiStatus: 'OVERPRICED',
      licenseNo: 'BSTI-CM-44910',
      verdict: 'Genuine BSTI barcode, but merchant charged +৳600 (+32.4%) above statutory MRP. Eligible for 25% DNCRP reward claim.'
    },
    {
      code: '8941100293841',
      label: 'Soybean Oil 5L (Fake Barcode)',
      product: 'Fortified Soybean Oil 5L',
      brand: 'Unregistered Bottler',
      mrp: 818,
      charged: 920,
      bstiStatus: 'COUNTERFEIT',
      licenseNo: 'INVALID / NOT IN REGISTRY',
      verdict: 'CRITICAL ALERT: Barcode prefix does not match any active BSTI certification. Suspected adulterated syndicate batch.'
    },
    {
      code: '8941190012458',
      label: 'Pasteurized Milk 1L (Verified)',
      product: 'Aarong Dairy UHT Milk 1L',
      brand: 'BRAC Dairy & Food Project',
      mrp: 110,
      charged: 110,
      bstiStatus: 'VERIFIED',
      licenseNo: 'BSTI-BDS-1702',
      verdict: 'Authentic BSTI certified product sold at compliant statutory Maximum Retail Price (MRP).'
    }
  ];

  const [selectedBarcode, setSelectedBarcode] = useState<BarcodeSample>(barcodeSamples[0]);

  const aiPrompts: AIPromptSample[] = [
    {
      prompt: 'Someone snatched my bag and phone near fulbaria bus stand about 10 minutes ago.',
      badge: 'Fulbaria Snatching',
      intent: 'CRIME_REPORT',
      category: 'THEFT_ROBBERY',
      severity: 'HIGH',
      extractedLocation: 'Fulbaria Bus Stand (24.6333° N, 90.2667° E)',
      matchedJurisdiction: 'Fulbaria Police Station, Mymensingh',
      actionLabel: '1-Click Auto-Fill Police Crime Docket'
    },
    {
      prompt: 'A pharmacy in Uttara Sector 7 charged me 2450 taka for baby milk with printed MRP 1850.',
      badge: 'Uttara MRP Gouging',
      intent: 'CONSUMER_DISPUTE',
      category: 'OVERPRICING (+৳600 Above MRP)',
      severity: 'MEDIUM',
      extractedLocation: 'Uttara Sector 7, Dhaka',
      matchedJurisdiction: 'DNCRP Dhaka District Office (Uttara Thana)',
      actionLabel: '1-Click Auto-Fill DNCRP 25% Reward Claim'
    },
    {
      prompt: 'Amar dokane kichu lok chanda dabi korche Savar bazar area te, threat dicche.',
      badge: 'Banglish Extortion',
      intent: 'CRIME_REPORT',
      category: 'EXTORTION / THREAT',
      severity: 'CRITICAL',
      extractedLocation: 'Savar Bazar (23.8483° N, 90.2574° E)',
      matchedJurisdiction: 'Savar Model Thana, Dhaka',
      actionLabel: '1-Click Auto-Fill Police Crime Docket'
    }
  ];

  const [selectedPrompt, setSelectedPrompt] = useState<AIPromptSample>(aiPrompts[0]);

  const rewardAmount = Math.round(fineAmount * 0.25);

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
          onClick={() => setActiveTab('bsti')}
          className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'bsti'
              ? 'bg-[#0147bf]/10 dark:bg-[#0147bf]/30 text-[#0147bf] dark:text-[#02baff] border border-[#0147bf]/30 dark:border-[#02baff]/40 shadow-sm font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-white/5'
          }`}
        >
          <Barcode className="w-3.5 h-3.5 text-[#0147bf] dark:text-[#02baff]" />
          <span className="hidden sm:inline">BSTI Scanner</span>
          <span className="sm:hidden">BSTI</span>
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
          <img src="/Logo/SentiBot-01.png" alt="Sentinel Prime" className="w-4 h-4 object-contain" />
          <span className="hidden sm:inline">Sentinel Prime</span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-5 min-h-[295px] flex flex-col justify-between">
        {/* PANEL 1: SOS DISPATCH (LIVE GPS & OFFLINE STORE-AND-FORWARD) */}
        {activeTab === 'sos' && (
          <div className="space-y-3.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    SOS Radar & Store-and-Forward Outbox
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Sub-second GPS Thana routing with offline auto-sync resilience
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSosOfflineMode(!sosOfflineMode)}
                className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold flex items-center gap-1.5 transition ${
                  sosOfflineMode
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                }`}
                title="Toggle Offline Store-and-Forward Simulation"
              >
                {sosOfflineMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                <span>{sosOfflineMode ? 'OFFLINE OUTBOX' : 'ONLINE UPLINK'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-red-500 dark:text-red-400" /> GPS Telemetry:
                </span>
                <span className="text-slate-900 dark:text-white font-bold">23.7925° N, 90.4078° E (Gulshan)</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 dark:text-slate-400">Nearest Patrol Unit:</span>
                <span className="text-[#0147bf] dark:text-[#02baff] font-bold">DMP Gulshan Patrol Alpha-4</span>
              </div>

              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Uplink Status:</span>
                {sosTriggered ? (
                  sosOfflineMode ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 text-[10px] font-bold animate-pulse">
                      ⚡ QUEUED IN LOCAL OUTBOX — AUTO-BURST ON RECONNECT
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40 text-[10px] font-bold animate-pulse">
                      ● SI KAMRUL DISPATCHED (ETA 4 MINS)
                    </span>
                  )
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                    READY ON STANDBY ({sosOfflineMode ? 'OFFLINE BUFFER READY' : '650+ THANAS'})
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
                <span className="text-white">
                  {sosTriggered ? 'STAND DOWN / RESET BEACON' : 'TRIGGER DEMO DISTRESS BEACON'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* PANEL 2: BSTI BARCODE & MRP SYNDICATE SCANNER */}
        {activeTab === 'bsti' && (
          <div className="space-y-3.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0147bf]/10 dark:bg-[#0147bf]/20 border border-[#0147bf]/30 dark:border-[#02baff]/40 text-[#0147bf] dark:text-[#02baff]">
                  <Barcode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    BSTI Counterfeit & MRP Syndicate Scanner
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Instant barcode verification against National BSTI & DNCRP price registry
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Barcode Sample Selector */}
            <div className="flex flex-wrap gap-1.5">
              {barcodeSamples.map(sample => (
                <button
                  key={sample.code}
                  type="button"
                  onClick={() => setSelectedBarcode(sample)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-mono transition flex items-center gap-1.5 ${
                    selectedBarcode.code === sample.code
                      ? 'bg-[#0147bf]/15 dark:bg-[#02baff]/20 border-[#0147bf] dark:border-[#02baff] text-[#0147bf] dark:text-[#02baff] font-bold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Barcode className="w-3 h-3" />
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>

            {/* Live Scan Telemetry Result */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-900 dark:text-white font-bold font-sans">
                  {selectedBarcode.product}
                </span>
                {selectedBarcode.bstiStatus === 'VERIFIED' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ✓ BSTI & MRP COMPLIANT
                  </span>
                )}
                {selectedBarcode.bstiStatus === 'OVERPRICED' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                    ⚠ MRP SYNDICATE OVERCHARGE
                  </span>
                )}
                {selectedBarcode.bstiStatus === 'COUNTERFEIT' && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/40 text-[10px] font-bold animate-pulse">
                    ✕ FAKE BARCODE ALERT
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Barcode / License</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedBarcode.code}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Statutory MRP</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">৳{selectedBarcode.mrp} BDT</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Merchant Price</span>
                  <span className={selectedBarcode.charged > selectedBarcode.mrp ? 'text-red-600 dark:text-red-400 font-bold' : 'text-slate-800 dark:text-slate-200 font-bold'}>
                    ৳{selectedBarcode.charged} BDT
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans pt-1 border-t border-slate-200 dark:border-slate-900">
                {selectedBarcode.verdict}
              </p>
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

        {/* PANEL 4: SENTINEL PRIME AI (INTERACTIVE NLP INCIDENT-TO-THANA AUTO-FILL) */}
        {activeTab === 'ai' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/95 p-1 flex items-center justify-center shrink-0 border border-sky-500/30 dark:border-cyan-400/40 shadow-sm">
                  <img src="/Logo/SentiBot-01.png" alt="Sentinel Prime" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Orbitron']">
                    Sentinel Prime NLP & Nationwide Geocoding
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Voice/Text extraction mapped to 500+ Thanas & 64 Districts via Haversine GPS
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-mono text-[10px] font-bold flex items-center gap-1 shrink-0">
                <Mic className="w-3 h-3" /> EN / BN / Banglish
              </span>
            </div>

            {/* Interactive Incident Prompt Selector */}
            <div className="flex flex-wrap gap-1.5">
              {aiPrompts.map(item => (
                <button
                  key={item.badge}
                  type="button"
                  onClick={() => setSelectedPrompt(item)}
                  className={`text-left text-[11px] px-2.5 py-1 rounded-lg border transition ${
                    selectedPrompt.badge === item.badge
                      ? 'bg-sky-500/15 dark:bg-sky-500/20 border-sky-400 text-sky-800 dark:text-sky-200 font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {item.badge}
                </button>
              ))}
            </div>

            {/* Extracted Entity & Thana Routing Card */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-sans">
              <div className="text-[11px] italic text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                "{selectedPrompt.prompt}"
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-0.5">
                <div>
                  <span className="text-slate-500 block">Detected Classification:</span>
                  <span className="text-[#0147bf] dark:text-[#02baff] font-bold">
                    {selectedPrompt.category} ({selectedPrompt.severity})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Auto-Routed Jurisdiction:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {selectedPrompt.matchedJurisdiction}
                  </span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-mono truncate">{selectedPrompt.extractedLocation}</span>
                <span className="text-sky-700 dark:text-sky-400 font-bold flex items-center gap-0.5 shrink-0">
                  {selectedPrompt.actionLabel} <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
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
