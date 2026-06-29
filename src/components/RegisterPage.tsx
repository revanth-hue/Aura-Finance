import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, User, ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: (email: string, name: string) => void;
  onGoToLogin: () => void;
  onGoBack: () => void;
  isDarkMode: boolean;
}

export default function RegisterPage({ onRegisterSuccess, onGoToLogin, onGoBack, isDarkMode }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength states
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('Empty');
  const [strengthColor, setStrengthColor] = useState('bg-slate-300 dark:bg-slate-700');

  useEffect(() => {
    if (!password) {
      setStrengthScore(0);
      setStrengthLabel('Empty');
      setStrengthColor('bg-slate-300 dark:bg-slate-700');
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setStrengthScore(score);

    switch (score) {
      case 1:
        setStrengthLabel('Weak');
        setStrengthColor('bg-danger-500');
        break;
      case 2:
        setStrengthLabel('Moderate');
        setStrengthColor('bg-warning-500');
        break;
      case 3:
        setStrengthLabel('Strong');
        setStrengthColor('bg-indigo-500');
        break;
      case 4:
        setStrengthLabel('Excellent');
        setStrengthColor('bg-success-500');
        break;
      default:
        setStrengthLabel('Fragile');
        setStrengthColor('bg-rose-500');
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill out all required details.');
      return;
    }
    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    setError('');
    onRegisterSuccess(email, name);
  };

  return (
    <div className={`min-h-screen font-sans flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-dark-bg text-slate-100' : 'bg-light-bg text-slate-800'
    }`}>
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -50, 50, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-cyan-500/15 dark:bg-cyan-500/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="absolute top-6 left-6 z-10">
        <button 
          id="register-back-btn"
          onClick={onGoBack} 
          className="flex items-center gap-2 text-sm font-medium hover:text-indigo-500 transition-colors cursor-pointer"
        >
          ← Back to Product Home
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        <div className={`p-8 md:p-10 rounded-[2.5rem] border shadow-2xl backdrop-blur-2xl ${
          isDarkMode 
            ? 'bg-[#0F172A]/80 border-slate-800/80 shadow-slate-950/40' 
            : 'bg-white/80 border-slate-200 shadow-indigo-500/5'
        }`}>
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display font-extrabold text-3xl tracking-tight text-slate-900 dark:text-white">
              Access Aura Elite
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1.5 font-light">
              Create your client credentials in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-semibold text-danger-500 bg-red-500/10 border border-red-500/20 rounded-xl">
                {error}
              </div>
            )}

            {/* Name Field with Floating Feel */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Legal Identity / Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input 
                  id="register-name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 text-sm rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-slate-800 focus:border-indigo-500 text-white outline-none' 
                      : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800 outline-none'
                  }`}
                  placeholder="e.g. Alexander Sterling"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Secure Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input 
                  id="register-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 text-sm rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-slate-800 focus:border-indigo-500 text-white outline-none' 
                      : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800 outline-none'
                  }`}
                  placeholder="alexander@sterling.co"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Formulate Secure Token
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input 
                  id="register-password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 text-sm rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-slate-800 focus:border-indigo-500 text-white outline-none' 
                      : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800 outline-none'
                  }`}
                  placeholder="Create 8+ char secure code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Token Strength:</span>
                  <span className="font-semibold text-slate-300" style={{ color: strengthScore === 1 ? '#EF4444' : strengthScore === 2 ? '#F59E0B' : strengthScore === 3 ? '#6366F1' : '#22C55E' }}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full flex-1 transition-all duration-300 ${
                        i < strengthScore ? strengthColor : 'bg-slate-200 dark:bg-slate-800'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                  Recommendation: Include uppercase, lowercase, numerical values, and non-alphanumeric punctuation.
                </p>
              </div>
            )}

            {/* T&C Option */}
            <div className="flex items-center space-x-2.5 pt-1.5">
              <input 
                id="register-terms"
                type="checkbox" 
                defaultChecked={true}
                className="w-4.5 h-4.5 rounded-lg border-slate-300 dark:border-slate-800 text-indigo-500 focus:ring-indigo-500"
                required
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium select-none">
                I authorize client-side data persistence storage.
              </span>
            </div>

            {/* Submit Button */}
            <button
              id="register-submit-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer mt-3"
            >
              Construct Vault Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-light">
            Already possess client keys?{' '}
            <button 
              id="register-goto-login-btn"
              onClick={onGoToLogin} 
              className="text-indigo-500 font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
