import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onGoToRegister: () => void;
  onGoBack: () => void;
  isDarkMode: boolean;
}

export default function LoginPage({ onLoginSuccess, onGoToRegister, onGoBack, isDarkMode }: LoginPageProps) {
  const [email, setEmail] = useState('alexander@sterling.co');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide correct credentials.');
      return;
    }
    setError('');
    onLoginSuccess(email);
  };

  return (
    <div className={`min-h-screen font-sans flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-dark-bg text-slate-100' : 'bg-light-bg text-slate-800'
    }`}>
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -60, 60, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-cyan-500/15 dark:bg-cyan-500/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="absolute top-6 left-6 z-10">
        <button 
          id="login-back-btn"
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
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display font-extrabold text-3xl tracking-tight text-slate-900 dark:text-white">
              Welcome to Aura
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1.5 font-light">
              Wealth Intelligence Suite for Professionals
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-xs font-semibold text-danger-500 bg-red-500/10 border border-red-500/20 rounded-xl">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input 
                  id="login-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl border transition-all duration-300 ${
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
              <div className="flex justify-between">
                <label className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                  Security Token
                </label>
                <a href="#" className="text-xs font-semibold text-indigo-500 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input 
                  id="login-password"
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-12 py-3.5 text-sm rounded-2xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-slate-800 focus:border-indigo-500 text-white outline-none' 
                      : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800 outline-none'
                  }`}
                  placeholder="Enter secure token"
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

            {/* Remember Me */}
            <div className="flex items-center space-x-2.5 pt-1">
              <input 
                id="login-remember-me"
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4.5 h-4.5 rounded-lg border-slate-300 dark:border-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium select-none">
                Remember authentication on this client
              </span>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer mt-2"
            >
              Sign In Securely
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7 text-center">
            <hr className="border-slate-200 dark:border-slate-800" />
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs font-semibold uppercase text-slate-400 tracking-widest transition-colors ${
              isDarkMode ? 'bg-[#0F172A]' : 'bg-white'
            }`}>
              Or Connect Via
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              id="login-google-btn"
              onClick={() => onLoginSuccess('alexander@sterling.co')}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-xs font-semibold transition-all ${
                isDarkMode 
                  ? 'border-slate-800 hover:bg-slate-850 bg-slate-950/20 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-50 bg-white text-slate-700'
              }`}
            >
              <Chrome className="w-4 h-4 text-rose-500" />
              Google
            </button>
            <button
              id="login-github-btn"
              onClick={() => onLoginSuccess('alexander@sterling.co')}
              className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-xs font-semibold transition-all ${
                isDarkMode 
                  ? 'border-slate-800 hover:bg-slate-850 bg-slate-950/20 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-50 bg-white text-slate-700'
              }`}
            >
              <Github className="w-4 h-4 text-slate-500 dark:text-white" />
              GitHub
            </button>
          </div>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8 font-light">
            New to the wealth console?{' '}
            <button 
              id="login-goto-register-btn"
              onClick={onGoToRegister} 
              className="text-indigo-500 font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
