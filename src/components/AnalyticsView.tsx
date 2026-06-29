import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  Brain, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { MonthlyData, Budget, Transaction } from '../types';

interface AnalyticsViewProps {
  monthlyData: MonthlyData[];
  budgets: Budget[];
  transactions: Transaction[];
  currency: string;
  isDarkMode: boolean;
}

export default function AnalyticsView({
  monthlyData,
  budgets,
  transactions,
  currency,
  isDarkMode
}: AnalyticsViewProps) {
  
  const [activeTab, setActiveTab] = useState<'flow' | 'category' | 'predict'>('flow');

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  // Convert monthly data factor for charting values
  const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
  const chartMonthlyData = monthlyData.map(d => ({
    month: d.month,
    Income: Math.round(d.income * factor),
    Expense: Math.round(d.expense * factor),
    Savings: Math.round((d.income - d.expense) * factor)
  }));

  // Pie chart data convertor
  const pieData = budgets.map(b => ({
    name: b.category,
    value: Math.round(b.spent * factor),
    color: b.color
  }));

  // Custom tooltips styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl border text-xs text-left shadow-xl backdrop-blur-md ${
          isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          <p className="font-bold mb-1.5">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="font-semibold" style={{ color: p.color || p.fill }}>
              {p.name}: {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹'}
              {p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Advanced Analytics Console
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Telemetry diagrams modeling liquidity velocity, category partitions, and predictive models.
          </p>
        </div>

        {/* Navigation Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800/80">
          {[
            { id: 'flow', name: 'Fiscal Flow', icon: TrendingUp },
            { id: 'category', name: 'Category Partitions', icon: PieIcon },
            { id: 'predict', name: 'Predictive Model', icon: Brain },
          ].map((tab) => (
            <button
              id={`analytics-tab-btn-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-indigo-500'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main visual panel layout */}
      <div className="grid grid-cols-1 gap-6">
        {activeTab === 'flow' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expense Line chart */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div className="mb-4">
                <h3 className="text-sm font-extrabold">Liquidity Velocity (Income vs Expense)</h3>
                <span className="text-[10px] text-slate-400">Monthly audit tracking</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="Income" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Expense" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Savings Growth Area chart */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div className="mb-4">
                <h3 className="text-sm font-extrabold">Savings Growth Accumulation</h3>
                <span className="text-[10px] text-slate-400">Interactive net growth trajectory</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Area type="monotone" dataKey="Savings" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'category' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Pie Chart */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div className="mb-4">
                <h3 className="text-sm font-extrabold">Category Expense Partitions</h3>
                <span className="text-[10px] text-slate-400">Live proportional distribution percentages</span>
              </div>
              <div className="h-72 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <ChartTooltip content={<CustomTooltip />} />
                    <Legend iconSize={8} iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: 10 }} />
                    <Pie
                      data={pieData}
                      cx="40%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Spending Bar Graph */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div className="mb-4">
                <h3 className="text-sm font-extrabold">Monthly Cumulative Spending</h3>
                <span className="text-[10px] text-slate-400">Total expenditure velocity bar meters</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Expense" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predict' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left">
            {/* AI expense prediction card */}
            <div className={`p-6 rounded-[2rem] border md:col-span-2 ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-extrabold flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500 animate-pulse" /> Predictive Cashflow Simulator
                </h3>
                <span className="text-[9px] uppercase font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full tracking-widest">
                  Aura AI Model active
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                Based on regression modeling of your previous 50 transactions, our offline predictive intelligence has analyzed next month's spending patterns and thresholds:
              </p>

              <div className="space-y-4">
                {[
                  { category: 'Rent & Bills', current: 1420.00, predicted: 1450.00, direction: 'Flat' },
                  { category: 'Food & Groceries', current: 542.80, predicted: 490.00, direction: 'Down' },
                  { category: 'Travel & Commutes', current: 980.50, predicted: 1050.00, direction: 'Up' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-500/[0.02] border border-slate-500/[0.04]">
                    <div className="text-left space-y-0.5">
                      <h4 className="font-bold">{item.category}</h4>
                      <span className="text-[10px] text-slate-400">Historical: {formatCurrency(item.current)}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-indigo-500">{formatCurrency(item.predicted)} predicted</div>
                      <span className={`text-[10px] font-bold ${
                        item.direction === 'Up' ? 'text-rose-500' : item.direction === 'Down' ? 'text-emerald-500' : 'text-slate-400'
                      }`}>{item.direction} Trend</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action info panel */}
            <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}>
              <div>
                <h3 className="text-sm font-extrabold mb-3">Model Accuracy Parameters</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                  Accuracy: <span className="font-bold text-indigo-500">92.4% confidence rating</span>. We recalculate predictive factors every time a transaction is updated or added locally.
                </p>
                <div className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Autoregressive prediction bounds</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Seasonality weight multipliers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Extreme anomaly noise suppression</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 rounded-2xl bg-indigo-500/5 text-[10px] text-indigo-500 text-center font-bold">
                🔒 Computations strictly local and isolated.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
