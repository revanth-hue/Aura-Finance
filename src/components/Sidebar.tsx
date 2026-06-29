import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  TrendingUp, 
  Target, 
  Wallet, 
  TrendingDown, 
  FileSpreadsheet, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  streakCount: number;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  isDarkMode,
  streakCount
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', name: 'Transactions', icon: ArrowLeftRight },
    { id: 'budgets', name: 'Budgets', icon: PieChart },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'wallet', name: 'Wallets', icon: Wallet },
    { id: 'investments', name: 'Investments', icon: TrendingDown },
    { id: 'reports', name: 'Reports', icon: FileSpreadsheet },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 88 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#0F172A]/80 border-slate-800/50 backdrop-blur-md' 
          : 'bg-white/90 border-slate-200/50 backdrop-blur-md'
      }`}
    >
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-6 justify-between border-b border-slate-200/60 dark:border-slate-800/50">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-lg text-slate-800 dark:text-white tracking-tight"
            >
              Aura Finance
            </motion.span>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button
          id="sidebar-toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
            isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu Options */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              id={`sidebar-link-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full relative group flex items-center rounded-2xl py-3 transition-all cursor-pointer ${
                isSidebarOpen ? 'px-4' : 'justify-center px-2'
              } ${
                isActive 
                  ? isDarkMode
                    ? 'bg-white/5 text-indigo-400 border border-white/10 font-bold shadow-md'
                    : 'bg-slate-100 text-indigo-600 border border-slate-200/60 font-bold shadow-sm'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 border border-transparent'
              }`}
            >
              {/* Highlight bar for non-collapsed active */}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                isActive 
                  ? isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500'
              }`} />

              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm pl-3.5 tracking-tight truncate font-medium"
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip for collapsed sidebar */}
              {!isSidebarOpen && (
                <div className="absolute left-20 bg-slate-950 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-lg">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Upgrade Callout & Footer Streak Section */}
      {isSidebarOpen && (
        <div className="px-4 mb-2">
          <div className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl border border-indigo-500/20 text-left">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">PRO ACCESS</p>
            <p className="text-xs text-slate-400 dark:text-slate-300 mb-3 leading-normal">Unlock advanced AI fiscal metrics & auditing insights.</p>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-extrabold tracking-wider uppercase transition-colors cursor-pointer">
              UPGRADE PLATFORM
            </button>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/50">
        <div className={`p-3 rounded-2xl flex items-center justify-center gap-2 ${
          isDarkMode ? 'bg-slate-900/40 border border-white/5' : 'bg-slate-50 border border-slate-200/50'
        }`}>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          {isSidebarOpen ? (
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Streak Count</p>
              <p className="text-xs font-extrabold">{streakCount} Days Active</p>
            </div>
          ) : (
            <span className="text-xs font-extrabold text-amber-500">{streakCount}</span>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
