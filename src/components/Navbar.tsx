import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ChevronDown, 
  Sparkles, 
  LogOut, 
  User, 
  TrendingUp, 
  DollarSign, 
  Award,
  Globe
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface NavbarProps {
  user: UserProfile;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  onLogout: () => void;
  activeTab: string;
}

export default function Navbar({
  user,
  notifications,
  setNotifications,
  isDarkMode,
  setIsDarkMode,
  currency,
  setCurrency,
  onLogout,
  activeTab
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className={`h-20 flex items-center justify-between px-6 md:px-8 border-b relative z-30 transition-all duration-300 backdrop-blur-md ${
      isDarkMode 
        ? 'bg-[#0F172A]/40 border-slate-800/50 text-white' 
        : 'bg-white/40 border-slate-200/50 text-slate-800'
    }`}>
      {/* Search Input */}
      <div className="flex items-center space-x-3 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            id="navbar-search-input"
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 text-xs rounded-2xl border transition-all ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/30 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-0 outline-none' 
                : 'bg-slate-100/60 border-slate-200/80 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-0 outline-none shadow-inner'
            }`}
            placeholder={`Search ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}...`}
          />
        </div>
      </div>

      {/* Action Items */}
      <div className="flex items-center space-x-4">
        {/* Currency Selector */}
        <div className="relative group hidden sm:block">
          <button
            id="currency-selector-btn"
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:text-white' 
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            {currency === 'USD' ? 'USD ($)' : currency === 'EUR' ? 'EUR (€)' : currency === 'GBP' ? 'GBP (£)' : 'INR (₹)'}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <div className={`absolute right-0 mt-1.5 w-32 rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {['USD', 'EUR', 'GBP', 'INR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer ${
                  currency === curr ? 'text-indigo-500' : isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {curr === 'USD' ? 'USD ($)' : curr === 'EUR' ? 'EUR (€)' : curr === 'GBP' ? 'GBP (£)' : 'INR (₹)'}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800 text-amber-400 hover:bg-slate-900' 
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
          }`}
        >
          {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            id="notifications-popover-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center relative transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-900' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className={`absolute right-0 mt-3 w-80 md:w-96 rounded-2xl shadow-xl border overflow-hidden ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/40">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Aura Notifications
                  </span>
                  <div className="flex gap-3">
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-bold text-indigo-500 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                    <button 
                      onClick={handleClearNotifications}
                      className="text-[10px] font-bold text-danger-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-slate-400 text-xs font-light">No new alerts or logs received.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all cursor-pointer relative ${
                          !notif.read ? 'bg-indigo-500/[0.02]' : ''
                        }`}
                      >
                        {!notif.read && (
                          <span className="absolute left-2.5 top-5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        )}
                        <div className="pl-2">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className={`text-xs font-bold leading-tight ${
                              notif.read ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
                            }`}>
                              {notif.title}
                            </h4>
                            <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-400 leading-normal font-light">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            id="user-profile-menu-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 text-slate-300' 
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm'
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-semibold hidden md:inline truncate max-w-[120px]">{user.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-xl border overflow-hidden ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {/* Header Information */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left truncate">
                    <h4 className="text-xs font-bold leading-tight truncate">{user.name}</h4>
                    <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="p-3.5 space-y-2 border-b border-slate-200 dark:border-slate-800 bg-indigo-500/[0.02]">
                  <div className="flex justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                      <Award className="w-3.5 h-3.5 text-indigo-500" /> Score Rating
                    </span>
                    <span className="font-extrabold text-indigo-500">{user.financialScore} / 100</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${user.financialScore}%` }} />
                  </div>
                </div>

                {/* Menu Options */}
                <div className="p-1.5 text-xs text-left">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Action to profile editing
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                      isDarkMode ? 'hover:bg-slate-900/60 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Account Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                      isDarkMode ? 'hover:bg-slate-900/60 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    Asset Telemetry
                  </button>

                  <hr className="border-slate-200 dark:border-slate-800 my-1.5" />

                  <button
                    id="profile-logout-btn"
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-danger-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Close Safe Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
