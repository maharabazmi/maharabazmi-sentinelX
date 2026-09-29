import React, { useState, useEffect } from 'react';
import {
  Flame,
  AlertTriangle,
  CloudRain,
  ShieldAlert,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Radio
} from 'lucide-react';
import { EmergencyAlert, EmergencyType, AlertSeverity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  alerts: EmergencyAlert[];
}

export const EmergencyAlertBanner: React.FC<Props> = ({ alerts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [timeLefts, setTimeLefts] = useState<Record<string, string>>({});

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id) && a.isActive);

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimes: Record<string, string> = {};
      alerts.forEach(alert => {
        const diff = new Date(alert.expirationTime).getTime() - Date.now();
        if (diff <= 0) {
          newTimes[alert.id] = 'Expired';
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);
          newTimes[alert.id] = `${hours}h ${mins}m remaining`;
        }
      });
      setTimeLefts(newTimes);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // 1-minute resolution to avoid constant re-renders
    return () => clearInterval(interval);
  }, [alerts]);

  if (visibleAlerts.length === 0) return null;

  // Determine highest severity
  const hasCritical = visibleAlerts.some(a => a.severity === AlertSeverity.CRITICAL);
  const hasHigh = visibleAlerts.some(a => a.severity === AlertSeverity.HIGH);

  const getAlertIcon = (type: EmergencyType) => {
    switch (type) {
      case EmergencyType.MAJOR_FIRE:
        return <Flame className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-700'}`} />;
      case EmergencyType.WEATHER_HAZARD:
        return <CloudRain className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />;
      case EmergencyType.ATTACK:
      case EmergencyType.CIVIL_UNREST:
        return <ShieldAlert className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-700'}`} />;
      default:
        return <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />;
    }
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return (
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${isDark ? 'bg-red-600/30 text-red-300 border-red-500/40' : 'bg-red-100 text-red-800 border-red-300'}`}>
            CRITICAL EMERGENCY
          </span>
        );
      case AlertSeverity.HIGH:
        return (
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${isDark ? 'bg-amber-600/30 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-900 border-amber-300'}`}>
            HIGH PRIORITY
          </span>
        );
      default:
        return (
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'}`}>
            PUBLIC ADVISORY
          </span>
        );
    }
  };

  return (
    <aside
      aria-label="Active emergency public safety broadcast"
      className={`w-full border-b backdrop-blur-md transition-all z-30 ${
        hasCritical
          ? isDark
            ? 'bg-gradient-to-r from-red-950/80 via-slate-900/90 to-red-950/80 border-red-500/30 shadow-lg'
            : 'bg-gradient-to-r from-red-100 via-white to-red-100 border-red-300 shadow-md'
          : hasHigh
            ? isDark
              ? 'bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-amber-950/60 border-amber-500/30'
              : 'bg-gradient-to-r from-amber-100 via-white to-amber-100 border-amber-300 shadow-md'
            : isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-slate-100 border-slate-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  hasCritical ? (isDark ? 'bg-red-400' : 'bg-red-600') : (isDark ? 'bg-amber-400' : 'bg-amber-600')
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  hasCritical ? (isDark ? 'bg-red-500' : 'bg-red-700') : (isDark ? 'bg-amber-500' : 'bg-amber-700')
                }`}
              />
            </span>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-display font-bold text-xs tracking-wide flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Radio className={`w-3.5 h-3.5 ${hasCritical ? (isDark ? 'text-red-400' : 'text-red-700') : (isDark ? 'text-amber-400' : 'text-amber-700')}`} />
                POLICE PUBLIC SAFETY BROADCAST
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium border ${
                  hasCritical
                    ? isDark ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-red-100 text-red-800 border-red-300'
                    : isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {visibleAlerts.length} Active {visibleAlerts.length === 1 ? 'Notice' : 'Notices'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg border transition ${isDark ? 'text-slate-300 hover:text-white bg-slate-900 border-slate-700 hover:border-slate-600' : 'text-slate-800 hover:text-slate-950 bg-white border-slate-300 hover:border-slate-400 shadow-sm'}`}
              title="Toggle Alert Details"
            >
              <span className="text-[11px] font-medium">{isExpanded ? 'Collapse' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className={`mt-2 space-y-2 pt-2 border-t ${isDark ? 'border-slate-800/80' : 'border-red-200'}`}>
            {visibleAlerts.map(alert => (
              <div
                key={alert.id}
                className={`rounded-xl p-3 border flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-sm ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-100' : 'bg-white border-slate-300 text-slate-900 shadow-md'}`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {getAlertIcon(alert.emergencyType)}
                    <h4 className={`font-semibold text-xs sm:text-sm font-display tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-950'}`}>
                      {alert.title}
                    </h4>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className={`text-xs leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {alert.message}
                  </p>
                  <div className={`flex flex-wrap items-center gap-3 text-[11px] pt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span className={`flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <MapPin className={`w-3 h-3 ${isDark ? 'text-red-400' : 'text-red-700'}`} />
                      Zone: <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{alert.affectedArea}</strong>
                    </span>
                    <span className={`flex items-center gap-1 font-mono ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                      <Clock className="w-3 h-3" />
                      {timeLefts[alert.id] || 'Active'}
                    </span>
                    <span className={isDark ? 'text-slate-500' : 'text-slate-600'}>
                      Issued: {alert.issuedByStation}
                    </span>
                  </div>
                </div>

                <div className="flex items-center self-end md:self-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setDismissedAlerts(prev => [...prev, alert.id])}
                    className={`p-1 rounded-lg transition ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'}`}
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
