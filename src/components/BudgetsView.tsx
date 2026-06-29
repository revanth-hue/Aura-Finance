import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Utensils, 
  Plane, 
  ShoppingBag, 
  FileText, 
  Film, 
  GraduationCap, 
  HeartPulse, 
  TrendingUp, 
  Plus, 
  AlertTriangle 
} from 'lucide-react';
import { Budget } from '../types';

interface BudgetsViewProps {
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  currency: string;
  isDarkMode: boolean;
}

export default function BudgetsView({ budgets, setBudgets, currency, isDarkMode }: BudgetsViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempLimit, setTempLimit] = useState<number>(0);

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return Utensils;
      case 'Plane': return Plane;
      case 'ShoppingBag': return ShoppingBag;
      case 'FileText': return FileText;
      case 'Film': return Film;
      case 'GraduationCap': return GraduationCap;
      case 'HeartPulse': return HeartPulse;
      default: return Utensils;
    }
  };

  const handleEditLimit = (id: string, currentLimit: number) => {
    setEditingId(id);
    setTempLimit(currentLimit);
  };

  const handleSaveLimit = (id: string) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, limit: tempLimit } : b));
    setEditingId(null);
  };

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
          Sector Spending Budgets
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          Monitor interactive category-allocated progress rings to prevent expense overruns.
        </p>
      </div>

      {/* Grid of Budgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((b) => {
          const IconComponent = getIcon(b.icon);
          const percent = Math.min(Math.round((b.spent / b.limit) * 100), 100);
          const isOverBudget = b.spent > b.limit;
          const remaining = Math.max(b.limit - b.spent, 0);

          // SVG Circular parameters
          const radius = 32;
          const stroke = 5;
          const normalizedRadius = radius - stroke * 2;
          const circumference = normalizedRadius * 2 * Math.PI;
          const strokeDashoffset = circumference - (percent / 100) * circumference;

          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-[2rem] border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                isOverBudget 
                  ? 'border-red-500/30 shadow-lg shadow-red-500/[0.02]' 
                  : isDarkMode 
                    ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' 
                    : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
              }`}
            >
              {/* Overbudget Badge alert */}
              {isOverBudget && (
                <div className="absolute top-3 right-3 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Over Budget Limit
                </div>
              )}

              {/* Card top */}
              <div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-indigo-500/10 to-indigo-500/20 border border-indigo-500/15" style={{ color: b.color }}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{b.category}</h3>
                    <span className="text-xs text-slate-400 font-light block">Sustenance budget sector</span>
                  </div>
                </div>

                {/* Ring & Data split */}
                <div className="flex justify-between items-center mt-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Spent total</span>
                    <div className="text-xl font-display font-bold">{formatCurrency(b.spent)}</div>
                    
                    {/* Inline edit */}
                    {editingId === b.id ? (
                      <div className="flex gap-1.5 items-center pt-2">
                        <input
                          type="number"
                          value={tempLimit}
                          onChange={(e) => setTempLimit(Number(e.target.value))}
                          className={`w-20 px-2 py-1 text-xs rounded-md border ${
                            isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        />
                        <button
                          onClick={() => handleSaveLimit(b.id)}
                          className="px-2 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditLimit(b.id, b.limit)}
                        className="text-[10px] font-bold text-indigo-500 hover:underline pt-2"
                      >
                        Adjust Cap Limit
                      </button>
                    )}
                  </div>

                  {/* Circular progress ring */}
                  <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                      {/* Gray track ring */}
                      <circle
                        className="text-slate-200 dark:text-slate-800"
                        strokeWidth={stroke}
                        stroke="currentColor"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      {/* Active colored ring */}
                      <circle
                        style={{ strokeDashoffset, stroke: b.color }}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold">
                      {percent}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Card bottom details */}
              <div className="mt-4 flex justify-between text-xs font-light">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Limit threshold</span>
                  <span className="font-semibold">{formatCurrency(b.limit)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Remaining cap</span>
                  <span className={`font-extrabold ${remaining === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {formatCurrency(remaining)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
