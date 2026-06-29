import { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coins, 
  Award,
  Clock,
  Sparkles,
  Plus
} from 'lucide-react';

interface InvestmentsViewProps {
  currency: string;
  isDarkMode: boolean;
}

export default function InvestmentsView({ currency, isDarkMode }: InvestmentsViewProps) {
  const [activeAssetTab, setActiveAssetTab] = useState<'stocks' | 'crypto'>('stocks');

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Mock index data for area chart
  const portfolioHistory = [
    { day: 'Mon', value: 18200 },
    { day: 'Tue', value: 18500 },
    { day: 'Wed', value: 18100 },
    { day: 'Thu', value: 19200 },
    { day: 'Fri', value: 19500 },
    { day: 'Sat', value: 19400 },
    { day: 'Sun', value: 20250 },
  ].map(d => ({ day: d.day, Value: d.value * (currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5) }));

  const stocksList = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 189.30, change: 1.45, changePct: 0.77, holdings: 15, value: 2839.50 },
    { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 924.50, change: 24.10, changePct: 2.68, holdings: 8, value: 7396.00 },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 177.20, change: -4.20, changePct: -2.31, holdings: 10, value: 1772.00 },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: 421.90, change: 3.50, changePct: 0.84, holdings: 6, value: 2531.40 },
  ];

  const cryptoList = [
    { ticker: 'BTC', name: 'Bitcoin', price: 64250.00, change: 1250.00, changePct: 1.98, holdings: 0.08, value: 5140.00 },
    { ticker: 'ETH', name: 'Ethereum', price: 3450.00, change: -42.00, changePct: -1.20, holdings: 1.5, value: 5175.00 },
    { ticker: 'SOL', name: 'Solana', price: 145.20, change: 8.40, changePct: 6.14, holdings: 12, value: 1742.40 },
  ];

  const activeList = activeAssetTab === 'stocks' ? stocksList : cryptoList;
  const portfolioSum = activeList.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Investment Portfolio Telemetry
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Real-time visual monitoring of stock allocations, indices, and cryptographic holding balances.
          </p>
        </div>

        {/* Assets tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveAssetTab('stocks')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeAssetTab === 'stocks' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-indigo-500'
            }`}
          >
            Stocks & ETFs
          </button>
          <button
            onClick={() => setActiveAssetTab('crypto')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeAssetTab === 'crypto' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-indigo-500'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            Cryptocurrencies
          </button>
        </div>
      </div>

      {/* Main split dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Chart card - 2/3 */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Portfolio Valuation</span>
                <div className="text-3xl font-display font-extrabold tracking-tight mt-1">{formatCurrency(portfolioSum)}</div>
                <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5 mt-1">
                  <ArrowUpRight className="w-4 h-4" /> +4.2% This Week
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Clock className="w-4 h-4" /> Live indexes
              </div>
            </div>

            {/* Custom Area Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="Value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorInvestments)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Holdings grid list */}
          <div className={`p-6 rounded-[2rem] border ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
          }`}>
            <h3 className="text-sm font-extrabold mb-4">Secured Holdings ledger</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-150 dark:border-slate-800 pb-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="pb-3">Asset</th>
                    <th className="pb-3 text-right">Market Price</th>
                    <th className="pb-3 text-right">Price Action</th>
                    <th className="pb-3 text-right">Share Holdings</th>
                    <th className="pb-3 text-right">Total Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850/50">
                  {activeList.map((item) => {
                    const isUp = item.change >= 0;
                    return (
                      <tr key={item.ticker} className="hover:bg-slate-500/[0.01] transition-all">
                        <td className="py-4">
                          <div className="font-extrabold text-slate-900 dark:text-white">{item.ticker}</div>
                          <div className="text-[10px] text-slate-400 font-light mt-0.5">{item.name}</div>
                        </td>
                        <td className="py-4 text-right font-semibold">{formatCurrency(item.price)}</td>
                        <td className={`py-4 text-right font-bold ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                          <div className="flex items-center justify-end gap-1">
                            {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {isUp ? '+' : ''}{item.changePct}%
                          </div>
                        </td>
                        <td className="py-4 text-right font-mono font-semibold text-slate-400">{item.holdings}</td>
                        <td className="py-4 text-right font-extrabold text-slate-900 dark:text-white">{formatCurrency(item.value)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Portfolio summary card - 1/3 */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-[2rem] border flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200/85 shadow-sm shadow-slate-100'
          }`}>
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-extrabold">Asset Allocation</h3>
                <span className="text-[9px] uppercase font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Fully Balanced
                </span>
              </div>

              <div className="space-y-4 text-left">
                {activeList.map((item) => {
                  const percent = Math.round((item.value / portfolioSum) * 100);
                  return (
                    <div key={item.ticker} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{item.name} ({item.ticker})</span>
                        <span className="text-indigo-500">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-150 dark:border-slate-800/60 flex flex-col gap-2.5">
              <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-xl shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" /> Load Capital Holdings
              </button>
              <button className="w-full py-3 border text-xs font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-slate-500/[0.03] transition-colors cursor-pointer">
                Rebalance Portfolio
              </button>
            </div>
          </div>

          {/* Quick Info Accolade */}
          <div className={`p-5 rounded-2xl border flex gap-3 text-left ${
            isDarkMode ? 'bg-slate-900/40 border-indigo-500/15' : 'bg-indigo-50/20 border-indigo-500/10 shadow-sm'
          }`}>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Aura Index Advisory</h4>
              <p className="text-[10px] text-slate-400 leading-normal font-light mt-1">
                Allocating surplus cashflows into solid index tokens like S&P500 yields ~10.4% historically, safely outrunning liquid fiat depreciation curves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
