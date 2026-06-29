import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Calendar, Plus, PlusCircle, CheckCircle, Flame } from 'lucide-react';
import { Goal } from '../types';

interface GoalsViewProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  currency: string;
  isDarkMode: boolean;
}

export default function GoalsView({ goals, setGoals, currency, isDarkMode }: GoalsViewProps) {
  const [fundingGoalId, setFundingGoalId] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState<number>(100);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState<number>(1000);
  const [newGoalDeadline, setNewGoalDeadline] = useState('2026-12-31');
  const [newGoalCategory, setNewGoalCategory] = useState('Savings');
  const [showAddForm, setShowAddForm] = useState(false);

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleFundGoal = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, current: Math.min(g.current + fundAmount, g.target) };
      }
      return g;
    }));
    setFundingGoalId(null);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle || !newGoalTarget) return;

    const newGoal: Goal = {
      id: `g_custom_${Date.now()}`,
      title: newGoalTitle,
      target: newGoalTarget,
      current: 0,
      deadline: newGoalDeadline,
      category: newGoalCategory,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=300'
    };

    setGoals(prev => [...prev, newGoal]);
    setNewGoalTitle('');
    setNewGoalTarget(1000);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Wealth & Savings Milestones
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Fulfill long-term aspirational targets by allocating funds directly to micro-vaults.
          </p>
        </div>

        <button
          id="goals-toggle-form-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Close panel' : 'Formulate New Goal'}
        </button>
      </div>

      {/* Goal creation Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-3xl border text-left max-w-2xl ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <h3 className="text-sm font-extrabold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" /> Formulate New Savings Goal
          </h3>
          <form onSubmit={handleCreateGoal} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Goal Target Title</label>
              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g. Rolex Submariner Date"
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Target Value magnitude</label>
              <input
                type="number"
                value={newGoalTarget}
                onChange={(e) => setNewGoalTarget(Number(e.target.value))}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Deadline Target Date</label>
              <input
                type="date"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Category Tag</label>
              <select
                value={newGoalCategory}
                onChange={(e) => setNewGoalCategory(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="Savings">Savings</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Travel">Travel</option>
                <option value="Automotive">Automotive</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-2 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Build Savings Goal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const pct = Math.min(Math.round((g.current / g.target) * 100), 100);
          const isFulfilled = g.current >= g.target;

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-[2rem] border overflow-hidden flex flex-col justify-between relative group ${
                isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
              }`}
            >
              {/* Cover photo */}
              <div className="h-40 relative overflow-hidden">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {g.category}
                </div>

                {isFulfilled && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" />
                    Target Achieved
                  </div>
                )}

                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-white font-bold text-lg md:text-xl truncate leading-tight">
                    {g.title}
                  </h3>
                  <span className="text-[10px] text-slate-300 font-medium font-mono flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5" /> Target date: {g.deadline}
                  </span>
                </div>
              </div>

              {/* Data metrics */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Progress values */}
                  <div className="flex justify-between items-baseline">
                    <div className="space-y-0.5 text-left">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Allocated Vault Capital</span>
                      <span className="text-2xl font-display font-extrabold text-indigo-500">{formatCurrency(g.current)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Milestone</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{formatCurrency(g.target)}</span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Percent completion</span>
                      <span>{pct}% Completed</span>
                    </div>
                  </div>
                </div>

                {/* Increment load capital interactive drawer */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-4">
                  {fundingGoalId === g.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex-1">
                        {[50, 100, 500, 1000].map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setFundAmount(amt)}
                            className={`flex-1 text-center py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              fundAmount === amt
                                ? 'bg-indigo-500 text-white'
                                : 'text-slate-400 hover:text-indigo-500'
                            }`}
                          >
                            +{amt}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleFundGoal(g.id)}
                        className="px-4 py-2 bg-indigo-500 text-white text-[10px] font-extrabold rounded-xl shrink-0 cursor-pointer"
                      >
                        Deposit
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {isFulfilled ? 'Completed Milestone!' : 'Ready for direct capital allocation?'}
                      </span>
                      {!isFulfilled && (
                        <button
                          id={`fund-goal-trigger-${g.id}`}
                          onClick={() => {
                            setFundingGoalId(g.id);
                            setFundAmount(100);
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-extrabold text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Inject Capital
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
