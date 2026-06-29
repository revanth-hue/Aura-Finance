import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  Zap, 
  Award, 
  Plus, 
  ArrowRight,
  FileText,
  Calendar as CalendarIcon,
  Sparkles,
  DollarSign,
  Heart,
  TrendingDown
} from 'lucide-react';
import { Transaction, Budget, Goal, Wallet as WalletType, UserProfile, Achievement } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  wallets: WalletType[];
  achievements: Achievement[];
  onOpenAddTransaction: () => void;
  onNavigateToTab: (tab: string) => void;
  currency: string;
  isDarkMode: boolean;
}

export default function DashboardView({
  user,
  transactions,
  budgets,
  goals,
  wallets,
  achievements,
  onOpenAddTransaction,
  onNavigateToTab,
  currency,
  isDarkMode
}: DashboardViewProps) {
  
  // Format Currency depending on symbol
  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentSavings = totalIncome - totalExpense;
  const netWorth = wallets.reduce((sum, w) => sum + w.balance, 0);

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  // Achievements Unlocked count
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Upcoming Bills Mock Data
  const upcomingBills = [
    { name: 'AWS Cloud Services', amount: 48.90, dueDate: 'Tomorrow', icon: 'server' },
    { name: 'Spotify Premium Family', amount: 16.99, dueDate: 'In 3 days', icon: 'music' },
    { name: 'Adobe Suite Licensing', amount: 54.99, dueDate: 'July 5, 2026', icon: 'pen-tool' },
    { name: 'Gold Gym Elite Membership', amount: 85.00, dueDate: 'July 8, 2026', icon: 'dumbbell' },
  ];

  // Calendar Logs (Last 7 days mockup of state checking)
  const last7Days = [
    { day: 'Mon', date: '23', status: 'perfect' },
    { day: 'Tue', date: '24', status: 'perfect' },
    { day: 'Wed', date: '25', status: 'good' },
    { day: 'Thu', date: '26', status: 'perfect' },
    { day: 'Fri', date: '27', status: 'off' },
    { day: 'Sat', date: '28', status: 'perfect' },
    { day: 'Sun', date: '29', status: 'perfect' },
  ];

  // Financial Tips Custom Rotator
  const tips = [
    { title: 'Golden 50/30/20 Alignment', desc: 'Secure 50% for needs, 30% for desires, and 20% directly into liquid cold vaults.' },
    { title: 'Prune Silent Subscriptions', desc: 'Unmonitored cloud servers or duplicate media suites bleed substantial cash monthly.' },
    { title: 'HYSA Reserves Safeguards', desc: 'Ensure 3 to 6 months of basic sustenance expenses reside inside a High Yield Checking Vault.' }
  ];

  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Asset Overview console
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Tracking wealth across <span className="font-semibold text-indigo-500">{wallets.length} active wallets</span> with client-side auditing keys.
          </p>
        </div>

        {/* Floating Quick Action */}
        <button
          id="dashboard-quick-add-btn"
          onClick={onOpenAddTransaction}
          className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/20 hover:scale-[1.03] hover:shadow-indigo-500/35 active:scale-95 transition-all cursor-pointer text-xs"
        >
          <Plus className="w-4 h-4" />
          Log Transaction
        </button>
      </div>

      {/* Overview Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[
          {
            title: 'Current Net Worth',
            value: netWorth,
            trend: '+12.4% vs last week',
            trendUp: true,
            icon: Wallet,
            color: 'from-blue-500/10 to-indigo-500/10 text-indigo-500 border-indigo-500/20',
            bg: 'bg-indigo-500'
          },
          {
            title: 'Monthly Total Income',
            value: totalIncome,
            trend: '+8.2% vs last month',
            trendUp: true,
            icon: ArrowUpRight,
            color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/15',
            bg: 'bg-emerald-500'
          },
          {
            title: 'Monthly Expenditures',
            value: totalExpense,
            trend: '-4.1% reduction streak',
            trendUp: false,
            icon: ArrowDownRight,
            color: 'from-rose-500/10 to-pink-500/10 text-rose-500 border-rose-500/15',
            bg: 'bg-rose-500'
          },
          {
            title: 'Net Cumulative Savings',
            value: currentSavings,
            trend: '34.5% Savings Rate',
            trendUp: true,
            icon: TrendingUp,
            color: 'from-cyan-500/10 to-blue-500/10 text-cyan-500 border-cyan-500/15',
            bg: 'bg-cyan-500'
          },
        ].map((card, idx) => {
          const isHighlighted = idx === 0; // Highlight the Net Worth card
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-6 rounded-[2rem] flex flex-col justify-between relative overflow-hidden ${
                isHighlighted
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white border border-indigo-500/30 shadow-xl shadow-indigo-600/25'
                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border border-indigo-400/30 shadow-xl shadow-indigo-500/25'
                  : isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/5 backdrop-blur-sm shadow-md' 
                    : 'bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200/50 shadow-sm shadow-slate-100'
              }`}
            >
              {isHighlighted && (
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              )}
              
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase font-extrabold tracking-wider ${
                    isHighlighted ? 'text-indigo-100/80' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {card.title}
                  </span>
                  <div className="text-2xl md:text-2xl font-display font-extrabold tracking-tight">
                    {formatCurrency(card.value)}
                  </div>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isHighlighted 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : `bg-gradient-to-br ${card.color}`
                }`}>
                  <card.icon className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className={`mt-4 pt-4 flex items-center justify-between text-[11px] z-10 border-t ${
                isHighlighted 
                  ? 'border-white/10' 
                  : 'border-slate-100 dark:border-slate-800/60'
              }`}>
                <span className={`font-semibold ${
                  isHighlighted 
                    ? 'text-indigo-100' 
                    : card.trendUp ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {card.trend}
                </span>
                <span className={isHighlighted ? 'text-indigo-200/70' : 'text-slate-400 dark:text-slate-500'}>
                  Audited logs
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Content split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: 2/3 wide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity Timeline & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements & Streaks Widget */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-extrabold flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> Milestone Achievements
                  </h3>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                    {unlockedCount}/{achievements.length} Unlocked
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light mb-4">
                  Maintaining smart budget thresholds triggers rare gamified milestone accolades.
                </p>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-500/[0.03] border border-slate-500/[0.05]">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        ach.unlocked 
                          ? 'bg-amber-500/10 text-amber-500' 
                          : 'bg-slate-800 text-slate-600'
                      }`}>
                        {ach.icon === 'Zap' ? <Zap className="w-4.5 h-4.5 fill-current" /> : <TrendingUp className="w-4.5 h-4.5" />}
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold">{ach.title}</h4>
                        <p className="text-[10px] text-slate-400 font-light truncate max-w-[170px]">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => onNavigateToTab('settings')}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-[11px] font-bold text-slate-400 dark:hover:text-white hover:bg-slate-500/[0.05] transition-all"
              >
                Inspect All Badges
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Financial Health Meter & Tips */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-extrabold flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" /> Fiscal Vitality Meter
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Aura Excellent
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="space-y-1 text-left">
                    <div className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                      {user.financialScore} <span className="text-xs font-light text-slate-400">/ 100</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-light">Calculated via debt leverage, savings velocity, and goal thresholds.</p>
                  </div>
                  {/* Health Meter Ring */}
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-slate-800"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-500"
                        strokeDasharray={`${user.financialScore}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold">
                      {user.financialScore}%
                    </div>
                  </div>
                </div>

                {/* Financial tip rotating widget */}
                <div className="pt-4 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-500">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Aura Tip: {tips[currentTipIdx].title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light mt-1.5 leading-relaxed">
                    {tips[currentTipIdx].desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentTipIdx((currentTipIdx + 1) % tips.length)}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-[11px] font-bold text-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all cursor-pointer"
              >
                Cycle Financial Strategies
              </button>
            </div>
          </div>

          {/* Recent Audits Table */}
          <div className={`p-6 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-sm font-extrabold">Recent Cashflow Records</h3>
                <p className="text-[10px] text-slate-400 font-light">Audited local cache system updates</p>
              </div>
              <button
                id="view-all-transactions-link"
                onClick={() => onNavigateToTab('transactions')}
                className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Inspect Ledger Ledger
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 pb-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="pb-3">Cashflow Details</th>
                    <th className="pb-3 text-center">Category</th>
                    <th className="pb-3 text-center">Payment System</th>
                    <th className="pb-3 text-right">Magnitude</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-500/[0.01] transition-all">
                      <td className="py-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[160px] md:max-w-xs">{tx.description}</div>
                        <div className="text-[10px] text-slate-400 font-medium font-mono">{tx.date}</div>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.category === 'Salary' || tx.category === 'Freelance'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-indigo-500/10 text-indigo-500'
                        }`}>
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3 text-center text-slate-400 font-medium">{tx.paymentMethod}</td>
                      <td className={`py-3 text-right font-extrabold ${
                        tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: 1/3 wide */}
        <div className="space-y-6">
          {/* Calendar Logger & Performance streak */}
          <div className={`p-6 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-indigo-500" /> Smart Ledger Calendar
              </h3>
              <span className="text-[10px] font-bold text-slate-400">June 2026</span>
            </div>
            
            <p className="text-xs text-slate-400 font-light mb-4 text-left">
              Streak active at <span className="font-semibold text-amber-500">{user.streak} days</span>. Budget discipline state is recorded daily.
            </p>

            <div className="grid grid-cols-7 gap-2 text-center">
              {last7Days.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.day}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold mt-1 border ${
                    item.status === 'perfect'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                      : item.status === 'good'
                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
                  }`}>
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming invoices / Bills list */}
          <div className={`p-6 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            <h3 className="text-sm font-extrabold mb-4 text-left flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> Upcoming Invoices
            </h3>
            
            <div className="space-y-4">
              {upcomingBills.map((bill, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-left">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">{bill.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium block">{bill.dueDate}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">{formatCurrency(bill.amount)}</div>
                    <button className="text-[10px] font-bold text-indigo-500 hover:underline cursor-pointer">Quick pay</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset target Goals progress */}
          <div className={`p-6 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold">Active Asset Milestones</h3>
              <button 
                onClick={() => onNavigateToTab('goals')}
                className="text-xs font-semibold text-indigo-500 hover:underline cursor-pointer"
              >
                Inspect
              </button>
            </div>

            <div className="space-y-4">
              {goals.slice(0, 2).map((goal) => {
                const pct = Math.round((goal.current / goal.target) * 100);
                return (
                  <div key={goal.id} className="space-y-1.5 text-left">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="truncate max-w-[130px]">{goal.title}</span>
                      <span className="text-indigo-500 font-extrabold">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{formatCurrency(goal.current)} loaded</span>
                      <span>Target: {formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
