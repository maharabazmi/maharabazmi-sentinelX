import React, { useState } from 'react';
import {
  Shield,
  Lock,
  PhoneCall,
  UserCheck,
  AlertTriangle,
  FileText,
  Building,
  CheckCircle2,
  ArrowRight,
  EyeOff,
  Radio,
  Flame,
  Scale,
  Sparkles,
  Server,
  Gavel,
  Barcode,
  Activity,
  Zap,
  Layers,
  Cpu,
  ShieldCheck,
  MapPin,
  Fingerprint,
  TrendingUp,
  FileCheck2,
  PhoneForwarded,
  ExternalLink
} from 'lucide-react';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import { CyberCanvasBackground } from './CyberCanvasBackground';
import { InteractiveCommandTerminal } from './InteractiveCommandTerminal';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onNavigateToDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenRegister,
  onNavigateToDashboard,
}) => {
  const { user, logout } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-screen text-slate-900 dark:text-slate-100 selection:bg-[#02baff] selection:text-slate-950 font-sans overflow-x-hidden bg-slate-50 dark:bg-[#05070e] transition-colors duration-250">
      {/* 1. CONTINUOUS INTERACTIVE CANVAS BACKGROUND */}
      <CyberCanvasBackground />

      {/* Cyber Grid Layer */}
      <div className="fixed inset-0 cyber-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Ambient Radial Glowing Orbs */}
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#0147bf]/15 dark:from-[#0147bf]/25 via-[#02baff]/8 dark:via-[#02baff]/12 to-transparent blur-[120px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-emerald-500/8 dark:from-emerald-500/10 via-[#0147bf]/8 dark:via-[#0147bf]/10 to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* 2. TOP LIVE DEFENSE TELEMETRY TICKER */}
      <div className="relative z-10 border-b border-slate-200 dark:border-[#02baff]/20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md overflow-hidden py-1.5 transition-colors duration-250">
        <div className="animate-marquee whitespace-nowrap text-[11px] font-mono flex items-center gap-8 text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <strong className="text-slate-900 dark:text-white">SENTINEL-X NATIONAL DEFENSE:</strong> OPERATIONAL
          </span>
          <span className="text-[#0147bf] dark:text-[#02baff]">
            • <strong>CRYPTOGRAPHIC PROTOCOL:</strong> 256-BIT SHA-2 NID BIOMETRIC SIGNED
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            • <strong>JURISDICTION:</strong> 64 DISTRICTS • 650+ POLICE STATIONS SYNCHRONIZED
          </span>
          <span className="text-amber-600 dark:text-amber-400">
            • <strong>DNCRP CONSUMER PROTECTION:</strong> 25% STATUTORY WHISTLEBLOWER REWARD ACTIVE
          </span>
          <span className="text-red-600 dark:text-red-400">
            • <strong>EMERGENCY SOS BEACON:</strong> TRIPLE-NINE (999) HIGH-PRIORITY CHANNEL
          </span>
          <span className="text-[#0147bf] dark:text-[#02baff]">
            • <strong>BSTI DIRECTORY:</strong> 100K+ VERIFIED COMMODITY BARCODES
          </span>
          {/* Duplicate loop */}
          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <strong className="text-slate-900 dark:text-white">SENTINEL-X NATIONAL DEFENSE:</strong> OPERATIONAL
          </span>
          <span className="text-[#0147bf] dark:text-[#02baff]">
            • <strong>CRYPTOGRAPHIC PROTOCOL:</strong> 256-BIT SHA-2 NID BIOMETRIC SIGNED
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            • <strong>JURISDICTION:</strong> 64 DISTRICTS • 650+ POLICE STATIONS SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* 3. HERO COMMAND SECTION */}
      <section className="relative z-10 pt-10 pb-16 sm:pb-24 border-b border-slate-200 dark:border-[#02baff]/15 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Mission, Vision, Calls to Action */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge with Continuous Ping & Shimmer */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-[#0147bf]/30 dark:border-[#02baff]/40 shadow-md text-xs text-[#0147bf] dark:text-[#02baff] font-['Orbitron'] font-semibold tracking-wider relative overflow-hidden">
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#02baff]/15 to-transparent animate-cyber-shimmer pointer-events-none" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="relative z-10">BANGLADESH NATIONAL CIVIC DEFENSE CONSOLE</span>
              </div>

              {/* Main Headline with Continuous Gradient Flow */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white font-['Orbitron'] leading-[1.08]">
                INTELLIGENT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0147bf] dark:from-[#02baff] via-cyan-500 dark:via-cyan-200 to-[#02baff] dark:to-[#0147bf] animate-gradient-flow drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(2,186,255,0.4)]">
                  PUBLIC DEFENSE
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                Next-generation civil safety and consumer rights enforcement. Real-time emergency distress routing, verified crime investigations, and DNCRP merchant dispute resolution.
              </p>

              {/* Action Buttons */}
              {user ? (
                <div className="space-y-4 pt-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-[#02baff]/30 text-xs text-slate-700 dark:text-slate-300 font-mono shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      Active Session: <strong className="text-slate-950 dark:text-white">{user.fullName}</strong> ({user.role})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={onNavigateToDashboard}
                      className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0147bf] via-[#02baff] to-[#0147bf] hover:shadow-[0_0_30px_rgba(2,186,255,0.7)] text-white font-['Orbitron'] font-bold text-xs tracking-wider transition-all duration-300 shadow-xl shadow-[#0147bf]/40 flex items-center justify-center gap-2.5 group active:scale-95 sx-solid-btn"
                    >
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#02baff]/50 to-transparent animate-cyber-shimmer pointer-events-none" />
                      <UserCheck className="w-4 h-4 text-white" />
                      <span className="text-white">
                        LAUNCH {user.role === UserRole.CITIZEN ? 'CITIZEN DASHBOARD' : `${user.role} CONSOLE`}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
                    </button>

                    <button
                      onClick={logout}
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-500/30 text-xs font-semibold transition shadow-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  {/* Primary NID Registration Button with Continuous Cyan Shimmer */}
                  <button
                    onClick={onOpenRegister}
                    className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0147bf] via-[#02baff] to-[#0147bf] hover:shadow-[0_0_35px_rgba(2,186,255,0.75)] text-white font-['Orbitron'] font-bold text-xs tracking-wider transition-all duration-300 shadow-xl shadow-[#0147bf]/40 flex items-center justify-center gap-2.5 group active:scale-95 sx-solid-btn"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#02baff]/60 to-transparent animate-cyber-shimmer pointer-events-none" />
                    <UserCheck className="w-4 h-4 text-white" />
                    <span className="text-white">VERIFY NID & ENTER</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>

                  {/* Secondary Official Sign In Button */}
                  <button
                    onClick={onOpenLogin}
                    className="relative w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800/90 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-[#02baff]/40 hover:border-[#0147bf] dark:hover:border-[#02baff] hover:shadow-lg hover:shadow-[#0147bf]/20 dark:hover:shadow-[#02baff]/25 font-['Orbitron'] font-semibold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-sm shadow-[#0147bf]/10"
                  >
                    <Lock className="w-4 h-4 text-[#0147bf] dark:text-[#02baff]" />
                    <span>OFFICIAL SIGN IN</span>
                  </button>
                </div>
              )}

              {/* High-Tech Telemetry Stats Grid - Statically Aligned */}
              <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg mx-auto lg:mx-0">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-[#02baff]/25 backdrop-blur-md text-left shadow-sm shadow-[#0147bf]/10 dark:shadow-[#02baff]/10 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    <Activity className="w-3 h-3 text-[#0147bf] dark:text-[#02baff] animate-pulse" />
                    <span>Dispatch</span>
                  </div>
                  <div className="text-xl font-black text-slate-950 dark:text-white font-['Orbitron']">&lt; 1.2s</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Ultra-fast Route</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-[#02baff]/25 backdrop-blur-md text-left shadow-sm shadow-[#0147bf]/10 dark:shadow-[#02baff]/10 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                    <span>NID Match</span>
                  </div>
                  <div className="text-xl font-black text-[#0147bf] dark:text-[#02baff] font-['Orbitron']">100%</div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Porichoy API</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-[#02baff]/25 backdrop-blur-md text-left shadow-sm shadow-[#0147bf]/10 dark:shadow-[#02baff]/10 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    <Scale className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
                    <span>Bounty</span>
                  </div>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-['Orbitron']">25%</div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">DNCRP Act '09</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Command Terminal */}
            <div className="lg:col-span-6 relative">
              <InteractiveCommandTerminal />

              {/* Compact Floating / Hovering SentinelX Logo inside #ADD8E6 Light Blue Box */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-3 lg:-bottom-6 lg:-right-4 z-30 pointer-events-auto select-none">
                <div className="relative group cursor-pointer animate-float">
                  {/* Soft Light-Blue Ambient Glow behind the box */}
                  <div className="absolute -inset-1.5 bg-[#ADD8E6]/50 dark:bg-[#ADD8E6]/40 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Rounded Box with exact #ADD8E6 Light Blue Background */}
                  <div 
                    style={{ backgroundColor: '#ADD8E6' }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl border-2 border-[#87ceeb] dark:border-[#98d5ea] shadow-lg shadow-[#ADD8E6]/40 dark:shadow-[0_0_20px_rgba(173,216,230,0.5)] flex items-center justify-center p-2 sm:p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#0147bf]"
                  >
                    {/* Clean SentinelX Shield Logo Mark */}
                    <img
                      src="/Sentinalx_Only Logo Mark-01.svg"
                      alt="SentinelX Logo"
                      className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 object-contain drop-shadow-[0_2px_6px_rgba(1,71,191,0.35)] transition-transform duration-300 relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR PILLARS OF PUBLIC DEFENSE ARCHITECTURE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0147bf]/10 dark:bg-[#0147bf]/20 border border-[#0147bf]/30 dark:border-[#02baff]/30 text-xs font-['Orbitron'] font-bold text-[#0147bf] dark:text-[#02baff] tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5 animate-spin-slow text-[#0147bf] dark:text-[#02baff]" />
            <span>NATIONWIDE COMMAND CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white font-['Orbitron'] tracking-tight">
            CIVIC DEFENSE ARCHITECTURE
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Engineered to empower citizens with rapid emergency response, tamper-proof reporting, and direct financial whistleblower rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: SOS Distress Beacon with Continuous Sonar */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`p-7 rounded-3xl bg-white dark:bg-slate-900/60 border transition-all duration-300 space-y-4 shadow-lg shadow-red-500/10 dark:shadow-red-500/15 relative overflow-hidden group hover:-translate-y-1 ${
              hoveredCard === 1
                ? 'border-red-500 shadow-xl shadow-red-500/30'
                : 'border-slate-200 dark:border-red-500/25'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="relative w-13 h-13 rounded-2xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-red-500/30 animate-sonar pointer-events-none" />
                <Radio className="w-6 h-6 stroke-[2] animate-pulse relative z-10" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-[10px] font-mono font-bold animate-pulse-slow">
                24/7 ACTIVE
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-['Orbitron'] group-hover:text-red-500 dark:group-hover:text-red-400 transition">
              Emergency SOS Beacon
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Instantaneous panic distress broadcasting with offline fallback outbox, GPS geolocation lock, and immediate Thana police unit dispatch.
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sub-Second Radar Dispatch</span>
            </div>
          </div>

          {/* Card 2: Cryptographic Crime & GD Filing with Continuous Sonar */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`p-7 rounded-3xl bg-white dark:bg-slate-900/60 border transition-all duration-300 space-y-4 shadow-lg shadow-[#0147bf]/10 dark:shadow-[#02baff]/15 relative overflow-hidden group hover:-translate-y-1 ${
              hoveredCard === 2
                ? 'border-[#0147bf] dark:border-[#02baff] shadow-xl shadow-[#02baff]/35'
                : 'border-slate-200 dark:border-[#02baff]/25'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="relative w-13 h-13 rounded-2xl bg-[#0147bf]/10 dark:bg-[#0147bf]/20 border border-[#0147bf]/30 dark:border-[#02baff]/30 flex items-center justify-center text-[#0147bf] dark:text-[#02baff] group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-[#02baff]/25 animate-sonar pointer-events-none" />
                <FileCheck2 className="w-6 h-6 stroke-[2] relative z-10" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0147bf]/10 dark:bg-[#02baff]/10 border border-[#0147bf]/30 dark:border-[#02baff]/30 text-[#0147bf] dark:text-[#02baff] text-[10px] font-mono font-bold">
                NID VERIFIED
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-['Orbitron'] group-hover:text-[#0147bf] dark:group-hover:text-[#02baff] transition">
              Official Crime & GD Filing
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Lodge theft, harassment, or cyber incidents with Porichoy biometric verification. Generates legally sealed GD dockets with SHA-256 integrity.
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-[#0147bf] dark:text-[#02baff] flex items-center gap-1.5 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tamper-Proof Audit Trail</span>
            </div>
          </div>

          {/* Card 3: DNCRP 25% Consumer Rights Bounty with Continuous Sonar */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`p-7 rounded-3xl bg-white dark:bg-slate-900/60 border transition-all duration-300 space-y-4 shadow-lg shadow-amber-500/10 dark:shadow-amber-500/15 relative overflow-hidden group hover:-translate-y-1 ${
              hoveredCard === 3
                ? 'border-amber-500 shadow-xl shadow-amber-500/30'
                : 'border-slate-200 dark:border-amber-500/25'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="relative w-13 h-13 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-amber-500/25 animate-sonar pointer-events-none" />
                <Scale className="w-6 h-6 stroke-[2] relative z-10" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold">
                25% CASH REWARD
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-['Orbitron'] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
              DNCRP Consumer Rights
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Report price gouging, syndicates, and hoarding to the DNCRP Directorate with statutory right to 25% of all recovered mobile court fines.
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>DNCRP Act 2009 Integration</span>
            </div>
          </div>

          {/* Card 4: BSTI Barcode & Anti-Counterfeit with Continuous Sonar */}
          <div
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`p-7 rounded-3xl bg-white dark:bg-slate-900/60 border transition-all duration-300 space-y-4 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/15 relative overflow-hidden group hover:-translate-y-1 ${
              hoveredCard === 4
                ? 'border-emerald-500 shadow-xl shadow-emerald-500/30'
                : 'border-slate-200 dark:border-emerald-500/25'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="relative w-13 h-13 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/25 animate-sonar pointer-events-none" />
                <Barcode className="w-6 h-6 stroke-[2] relative z-10" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                BSTI CERTIFIED
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-950 dark:text-white font-['Orbitron'] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
              Barcode Verification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Scan or enter EAN-13 barcodes to verify genuine BSTI certification, official maximum retail prices (MRP), and avoid counterfeit commodities.
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live Anti-Counterfeit Registry</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NATIONWIDE COMMAND & EMERGENCY HOTLINES MATRIX */}
      <section className="py-20 border-t border-slate-200 dark:border-[#02baff]/15 bg-slate-100/70 dark:bg-gradient-to-b dark:from-[#060a14]/90 dark:via-[#05070e] dark:to-[#04060c] relative z-10 transition-colors duration-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0147bf]/10 dark:bg-[#0147bf]/20 border border-[#0147bf]/30 dark:border-[#02baff]/30 text-xs font-['Orbitron'] font-bold text-[#0147bf] dark:text-[#02baff] tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>NATIONWIDE EMERGENCY CHANNELS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white font-['Orbitron'] tracking-tight">
                COMMAND & REDRESS MATRIX
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono max-w-md">
              Toll-free government emergency lines and automated Thana dispatch synchronized across all 64 districts.
            </p>
          </div>

          {/* Grid 1: Emergency Speed-Dial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 999 */}
            <a
              href="tel:999"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-red-500/30 hover:border-red-500 shadow-md shadow-red-500/10 hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 block group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl font-black text-red-500 dark:text-red-400 font-['Orbitron'] group-hover:scale-105 transition-transform">
                  999
                </span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
              </div>
              <h5 className="text-sm font-bold text-slate-950 dark:text-white font-['Orbitron']">National Emergency</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Police, Fire & Ambulance</p>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-red-600 dark:text-red-400 font-semibold flex items-center justify-between font-mono">
                <span>Speed Dial Active</span>
                <PhoneForwarded className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 16121 */}
            <a
              href="tel:16121"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-amber-500/30 hover:border-amber-500 shadow-md shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 block group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-['Orbitron'] group-hover:scale-105 transition-transform">
                  16121
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <h5 className="text-sm font-bold text-slate-950 dark:text-white font-['Orbitron']">Consumer Protection</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">DNCRP Grievance Cell</p>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center justify-between font-mono">
                <span>25% Reward Line</span>
                <PhoneForwarded className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 109 */}
            <a
              href="tel:109"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-[#02baff]/30 hover:border-[#0147bf] dark:hover:border-[#02baff] shadow-md shadow-[#0147bf]/10 dark:shadow-[#02baff]/10 hover:shadow-xl hover:shadow-[#02baff]/30 transition-all duration-300 block group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl font-black text-[#0147bf] dark:text-[#02baff] font-['Orbitron'] group-hover:scale-105 transition-transform">
                  109
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0147bf] dark:bg-[#02baff]" />
              </div>
              <h5 className="text-sm font-bold text-slate-950 dark:text-white font-['Orbitron']">Women & Child Helpline</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">24/7 Crisis Support</p>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-[#0147bf] dark:text-[#02baff] font-semibold flex items-center justify-between font-mono">
                <span>Confidential Line</span>
                <PhoneForwarded className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 333 */}
            <a
              href="tel:333"
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-[#0147bf]/40 hover:border-sky-500 shadow-md shadow-sky-500/10 hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 block group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl sm:text-4xl font-black text-sky-600 dark:text-sky-400 font-['Orbitron'] group-hover:scale-105 transition-transform">
                  333
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-500" />
              </div>
              <h5 className="text-sm font-bold text-slate-950 dark:text-white font-['Orbitron']">Citizen Information</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Government Services</p>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-sky-700 dark:text-sky-400 font-semibold flex items-center justify-between font-mono">
                <span>National Portal</span>
                <PhoneForwarded className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* Grid 2: Synchronized National Coverage Telemetry */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 space-y-1 text-center shadow-md shadow-[#0147bf]/5 dark:shadow-[#02baff]/10">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-['Orbitron'] block">64</span>
              <h4 className="text-xs font-bold text-[#0147bf] dark:text-[#02baff] font-['Orbitron']">Districts Covered</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">100% Nationwide Reach</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 space-y-1 text-center shadow-md shadow-[#0147bf]/5 dark:shadow-[#02baff]/10">
              <span className="text-2xl sm:text-3xl font-black text-[#0147bf] dark:text-[#02baff] font-['Orbitron'] block">650+</span>
              <h4 className="text-xs font-bold text-slate-950 dark:text-white font-['Orbitron']">Thana Police Stations</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Real-time Officer Desks</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 space-y-1 text-center shadow-md shadow-amber-500/5 dark:shadow-amber-500/10">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-['Orbitron'] block">25%</span>
              <h4 className="text-xs font-bold text-slate-950 dark:text-white font-['Orbitron']">Citizen Cash Reward</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">DNCRP Whistleblower Rights</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 space-y-1 text-center shadow-md shadow-emerald-500/5 dark:shadow-emerald-500/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-['Orbitron'] block">24/7</span>
              <h4 className="text-xs font-bold text-slate-950 dark:text-white font-['Orbitron']">National Command</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Automated Patrol Routing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
