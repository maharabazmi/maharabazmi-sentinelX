import React, { useState, useEffect } from 'react';
import { X, Lock, AlertCircle, RefreshCw, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToAdminClearance?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSwitchToAdminClearance
}) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIdentifier('');
      setPassword('');
      setShowPassword(false);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please provide your NID, Email, or Badge ID, and Password.');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await login(identifier, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dialog Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0147bf]/20 border border-[#02baff]/30 flex items-center justify-center p-2 shadow-sm flex-shrink-0">
            <img src="/Sentinalx_Only Logo Mark-01.svg" alt="SentinelX" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-['Orbitron'] font-bold text-[#02baff] uppercase tracking-widest block">
              NATIONAL GATEWAY
            </span>
            <h3 className="text-xl font-bold text-white font-['Orbitron']">Sign In to SentinelX</h3>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex flex-col gap-2 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <span className="leading-relaxed">{error}</span>
            </div>
            {onSwitchToAdminClearance && error.toLowerCase().includes('admin') && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToAdminClearance();
                }}
                className="mt-1 self-start px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition shadow-md shadow-purple-600/30"
              >
                Switch to Admin Clearance Console →
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              National ID (NID) / Official Email / Badge ID
            </label>
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              className="sx-input font-mono"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold">
                Secret Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="sx-input pr-10 font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(value => !value)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0147bf] to-[#02baff] hover:from-[#013ab0] hover:to-[#00a8e8] text-white font-bold tracking-wide transition shadow-lg shadow-[#0147bf]/30 active:scale-95 disabled:opacity-50 font-['Orbitron'] text-xs flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Validating Cryptographic Token...</span>
              </>
            ) : (
              <span>SIGN IN TO CONSOLE</span>
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-slate-400">
            Don't have a verified account?{' '}
            <button
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="text-[#02baff] font-semibold hover:underline font-mono"
            >
              Verify NID & Register
            </button>
          </p>
        </div>

        {/* Quick Demo Pre-fill for Evaluation */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Quick-Fill Demo Credentials:</span>
            {onSwitchToAdminClearance && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToAdminClearance();
                }}
                className="text-purple-400 hover:text-purple-300 font-semibold hover:underline"
              >
                HQ Admin Clearance →
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => {
                setIdentifier('citizen.tanvir@example.com');
                setPassword('demo1234');
                setError(null);
              }}
              className="py-2 px-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400 transition text-center truncate font-semibold"
              title="Tanvir Hossain (citizen.tanvir@example.com)"
            >
              Citizen (Tanvir)
            </button>
            <button
              type="button"
              onClick={() => {
                setIdentifier('police.kamrul@dmp.gov.bd');
                setPassword('demo1234');
                setError(null);
              }}
              className="py-2 px-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300 hover:bg-blue-900/50 hover:border-blue-400 transition text-center truncate font-semibold"
              title="Inspector Kamrul Islam (police.kamrul@dmp.gov.bd)"
            >
              Police OC (Gulshan)
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password OTP Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={() => {
          setShowForgotPassword(false);
          setError(null);
        }}
      />
    </div>
  );
};
