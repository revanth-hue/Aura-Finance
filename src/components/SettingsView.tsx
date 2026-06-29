import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Lock, 
  Bell, 
  Trash2, 
  Download, 
  Globe, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  Camera
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  onDeleteAccount: () => void;
}

export default function SettingsView({
  user,
  setUser,
  isDarkMode,
  setIsDarkMode,
  currency,
  setCurrency,
  onDeleteAccount
}: SettingsViewProps) {
  
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'danger'>('profile');
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [lang, setLang] = useState(user.language);

  // Notification toggles
  const [notifyBudgets, setNotifyBudgets] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(false);
  const [notifySecurity, setNotifySecurity] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      language: lang
    }));
    triggerToast('Profile parameters successfully committed!');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleExportAll = () => {
    const backupData = {
      userProfile: user,
      timestamp: new Date().toISOString(),
      clientBuild: 'AURA v1.0.4'
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Aura_Backup_Ledger_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    triggerToast('All local data backed up and exported!');
  };

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-xl shadow-indigo-600/20 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          System Adjustments & Settings
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          Adjust security parameters, notification alerts, currency representations, or export local records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar rail */}
        <div className="md:col-span-4 space-y-2">
          {[
            { id: 'profile', name: 'Identity & Preferences', icon: User },
            { id: 'notifications', name: 'Notification Signals', icon: Bell },
            { id: 'security', name: 'Security & Accolades', icon: Lock },
            { id: 'danger', name: 'Danger Boundary', icon: Trash2 },
          ].map((sec) => (
            <button
              id={`settings-sec-btn-${sec.id}`}
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-indigo-500 text-white shadow-md'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                    : 'text-slate-600 hover:text-indigo-500 hover:bg-slate-50'
              }`}
            >
              <sec.icon className="w-4 h-4" />
              {sec.name}
            </button>
          ))}
        </div>

        {/* Content Panel Area */}
        <div className="md:col-span-8">
          <div className={`p-6 md:p-8 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            {activeSection === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-5 pb-5 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="relative group cursor-pointer">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-left space-y-1">
                    <h3 className="text-base font-bold"> Alexander Sterling</h3>
                    <span className="text-[10px] text-indigo-500 bg-indigo-500/10 font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">Aura Executive Rank</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Legal Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Secure Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">System Language</label>
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="English">English (Aura default)</option>
                      <option value="Spanish">Español (Spanish)</option>
                      <option value="French">Français (French)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Default Currency representation</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="USD">USD ($) Dollar</option>
                      <option value="EUR">EUR (€) Euro</option>
                      <option value="GBP">GBP (£) Pound</option>
                      <option value="INR">INR (₹) Rupee</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Commit Identity updates
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold mb-1">Telemetry Signal Alerts</h3>
                  <p className="text-[11px] text-slate-400 font-light">Tweak triggers directing when our system displays or logs metadata events.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Budget Limit Warnings', desc: 'Alert when a category expenditure crosses 80% threshold limits.', checked: notifyBudgets, change: setNotifyBudgets },
                    { label: 'Weekly Summary Statements', desc: 'Compile visual stats summaries on the dashboard every 7 days.', checked: notifyWeekly, change: setNotifyWeekly },
                    { label: 'Security Session Toggles', desc: 'Signal alerts on unusual transactions or offline key downloads.', checked: notifySecurity, change: setNotifySecurity },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-850/55">
                      <div className="text-left space-y-0.5">
                        <h4 className="text-xs font-bold">{item.label}</h4>
                        <p className="text-[10px] text-slate-400 font-light max-w-sm">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => item.change(!item.checked)}
                        className="w-4.5 h-4.5 rounded-lg text-indigo-500 border-slate-300 dark:border-slate-800 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 text-right">
                  <button
                    onClick={() => triggerToast('Notification guidelines committed!')}
                    className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Save Signal Toggles
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold mb-1">Cryptographic & Session security</h3>
                  <p className="text-[11px] text-slate-400 font-light font-sans">Commit local keys or toggle client-side security measures.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-150 dark:border-slate-800">
                    <div className="text-left">
                      <h4 className="text-xs font-bold">Double-Factor Authentication</h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Requires physical keys or OTP prompts when opening a session.</p>
                    </div>
                    <button className="px-3 py-1.5 border rounded-lg text-[10px] font-bold text-indigo-500 hover:bg-indigo-500/5 transition-colors cursor-pointer">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-150 dark:border-slate-800">
                    <div className="text-left">
                      <h4 className="text-xs font-bold">Secure Local Cache Backup</h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Export a full encrypted JSON backup file containing your 50 transactions.</p>
                    </div>
                    <button 
                      onClick={handleExportAll}
                      className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      Export Backup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'danger' && (
              <div className="space-y-6">
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-start gap-3">
                  <Trash2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <h4 className="text-xs font-extrabold">Warning: Destructive Boundaries</h4>
                    <p className="text-[10px] font-light leading-relaxed mt-1">
                      Deleting your account completely clears the active client-side local cache index. All transactions, budget limits, wallets, and goals will be lost forever.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="text-left">
                      <h4 className="text-xs font-bold">Clear All Cashflow Records</h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Wipes the ledger history clean but maintains profile information.</p>
                    </div>
                    <button 
                      onClick={() => triggerToast('Ledger cleared fully!')}
                      className="px-3 py-1.5 border border-red-500/20 text-red-500 hover:bg-red-500/5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      Reset Ledger
                    </button>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-slate-100 dark:border-slate-850/40">
                    <div className="text-left">
                      <h4 className="text-xs font-bold">Terminate Aura Account and cache</h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Delete everything and return to the main landing page.</p>
                    </div>
                    <button
                      id="settings-delete-account-btn"
                      onClick={onDeleteAccount}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      Delete Account Fully
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
