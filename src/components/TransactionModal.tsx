import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Plus, Wallet, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Omit<Transaction, 'id'>) => void;
  isDarkMode: boolean;
  currency: string;
}

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  isDarkMode,
  currency
}: TransactionModalProps) {
  
  // State variables for fields
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Chase Checking');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const categoriesList = type === 'income' 
    ? ['Salary', 'Freelance', 'Investments', 'Other']
    : ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Education', 'Healthcare', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Magnitude must be a positive value.');
      return;
    }
    if (!description) {
      setError('Description is required.');
      return;
    }

    onSave({
      date,
      category,
      description,
      paymentMethod,
      amount: parseFloat(amount),
      status: 'Completed',
      type
    });

    // Reset fields
    setAmount('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Card content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] border shadow-2xl relative z-10 text-left p-6 md:p-8 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Header controls */}
            <div className="flex justify-between items-center pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Audit Logs
                </div>
                <h3 className="font-display font-extrabold text-xl">Log Wealth Transaction</h3>
              </div>
              <button
                id="transaction-modal-close-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="mt-4 p-3 text-xs font-semibold text-danger-500 bg-rose-500/10 border border-rose-500/15 rounded-xl">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-5">
              {/* Type Switcher */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase font-bold text-slate-400">Cashflow Category Type</label>
                <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setType('expense');
                      setCategory('Food');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      type === 'expense'
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <ArrowDownRight className="w-3.5 h-3.5" /> Expenditure Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setType('income');
                      setCategory('Salary');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      type === 'income'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-emerald-500'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Yield / Income
                  </button>
                </div>
              </div>

              {/* Amount field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Magnitude / Amount</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400 dark:text-slate-500">
                    {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹'}
                  </div>
                  <input
                    id="modal-amount-input"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 text-sm font-bold rounded-2xl border outline-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                    }`}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Description field */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Description / Merchant</label>
                <input
                  id="modal-desc-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-2xl border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                  }`}
                  placeholder="e.g. Blue Bottle Coffee"
                  required
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Category Sector</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Date Logged</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Source Wallet / Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`w-full px-3 py-2.5 text-xs rounded-xl border outline-none cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="Chase Checking">Chase Checking</option>
                  <option value="Amex Platinum">Amex Platinum</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Ledger Cold Wallet">Ledger Cold Wallet</option>
                  <option value="Vault Physical Cash">Vault Physical Cash</option>
                </select>
              </div>

              {/* Footnote information */}
              <div className="flex gap-2.5 p-3 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/[0.05] text-[10px] text-slate-400 font-light items-center">
                <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>This transaction is locked locally to your current browser cache session using standard client-side state models.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-3.5 text-xs font-semibold rounded-2xl border transition-colors cursor-pointer text-center ${
                    isDarkMode ? 'border-slate-800 hover:bg-slate-800/60 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  id="transaction-modal-submit-btn"
                  type="submit"
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center"
                >
                  Record Transaction
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
