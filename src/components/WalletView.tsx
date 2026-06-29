import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Landmark, Coins, Key, Wallet, Plus, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Wallet as WalletType, Transaction } from '../types';

interface WalletViewProps {
  wallets: WalletType[];
  setWallets: React.Dispatch<React.SetStateAction<WalletType[]>>;
  transactions: Transaction[];
  currency: string;
  isDarkMode: boolean;
}

export default function WalletView({
  wallets,
  setWallets,
  transactions,
  currency,
  isDarkMode
}: WalletViewProps) {
  
  const [selectedWalletId, setSelectedWalletId] = useState<string>(wallets[0]?.id || '');
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletType, setNewWalletType] = useState<'Bank' | 'Credit Card' | 'UPI' | 'Crypto' | 'Cash'>('Bank');
  const [newWalletBalance, setNewWalletBalance] = useState<number>(1000);
  const [showAddForm, setShowAddForm] = useState(false);

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const selectedWallet = wallets.find(w => w.id === selectedWalletId);

  // Filter transactions related to this wallet name
  const walletTransactions = transactions.filter(t => 
    t.paymentMethod.toLowerCase().includes(selectedWallet?.name.split(' ')[0].toLowerCase() || '') ||
    (selectedWallet?.type === 'Credit Card' && t.paymentMethod.toLowerCase().includes('amex')) ||
    (selectedWallet?.type === 'UPI' && t.paymentMethod.toLowerCase().includes('apple')) ||
    (selectedWallet?.type === 'Crypto' && t.paymentMethod.toLowerCase().includes('ledger')) ||
    (selectedWallet?.type === 'Cash' && t.paymentMethod.toLowerCase().includes('cash'))
  ).slice(0, 6);

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'Bank': return Landmark;
      case 'Credit Card': return CreditCard;
      case 'Crypto': return Coins;
      case 'UPI': return Key;
      default: return Wallet;
    }
  };

  const handleCreateWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWalletName) return;

    // Generate random gradient pair
    const gradients = [
      'from-emerald-500 to-teal-700',
      'from-blue-600 to-indigo-800',
      'from-purple-600 to-fuchsia-800',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-700'
    ];
    const randGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newWallet: WalletType = {
      id: `w_custom_${Date.now()}`,
      name: newWalletName,
      type: newWalletType,
      balance: newWalletBalance,
      cardNumber: newWalletType === 'Credit Card' || newWalletType === 'Bank' ? `•••• ${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      gradient: randGradient,
      accentColor: '#6366F1'
    };

    setWallets(prev => [...prev, newWallet]);
    setSelectedWalletId(newWallet.id);
    setNewWalletName('');
    setNewWalletBalance(1000);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 md:space-y-8 text-left">
      {/* Header and Quick Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Virtual Credit & Asset Wallets
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Browse high-fidelity visual cards for checking accounts, digital UPIs, and secure cash reserves.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'Close panel' : 'Link New Wallet'}
        </button>
      </div>

      {/* Add Wallet Form Drawer */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-[2rem] border text-left max-w-xl ${
            isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
          }`}
        >
          <h3 className="text-sm font-extrabold mb-4 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-indigo-500" /> Link New Asset Account
          </h3>
          <form onSubmit={handleCreateWallet} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Card Name / Title</label>
              <input
                type="text"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                placeholder="e.g. Robinhood Crypto Vault"
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Account Type</label>
              <select
                value={newWalletType}
                onChange={(e) => setNewWalletType(e.target.value as any)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="Bank">Checking/Savings Bank</option>
                <option value="Credit Card">Credit Limit Card</option>
                <option value="UPI">UPI Digital Wallet</option>
                <option value="Crypto">Crypto Cold Wallet</option>
                <option value="Cash">Physical Cash Reserves</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-400">Starting Balance Magnitude</label>
              <input
                type="number"
                value={newWalletBalance}
                onChange={(e) => setNewWalletBalance(Number(e.target.value))}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
                required
              />
            </div>

            <div className="sm:col-span-2 pt-2 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Construct Wallet Card
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Visual cards stacks */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">Available Card Assets</span>
          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
            {wallets.map((w) => {
              const WalletIcon = getWalletIcon(w.type);
              const isActive = w.id === selectedWalletId;

              return (
                <motion.div
                  key={w.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedWalletId(w.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between relative overflow-hidden ${
                    isActive
                      ? 'border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/[0.03]'
                      : isDarkMode 
                        ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr ${w.gradient} text-white shadow-sm`}>
                      <WalletIcon className="w-4.5 h-4.5" />
                    </div>
                    <div className="truncate text-left">
                      <h4 className="text-xs font-bold truncate max-w-[170px]">{w.name}</h4>
                      <span className="text-[10px] text-slate-400 font-light block">{w.type} • {w.cardNumber || 'Virtual Node'}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold">{formatCurrency(w.balance)}</div>
                    <span className="text-[9px] text-slate-400">Ledger cache balance</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active luxury card detail mockups */}
        {selectedWallet && (
          <div className="lg:col-span-7 space-y-6">
            {/* Visual credit card asset */}
            <motion.div
              layoutId="activeWalletCard"
              className={`p-7 rounded-3xl text-white bg-gradient-to-tr ${selectedWallet.gradient} relative overflow-hidden shadow-xl aspect-[1.58/1] flex flex-col justify-between max-w-md mx-auto`}
            >
              {/* Glass chip shimmer */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-white/60 block">Asset Portfolio Card</span>
                  <h3 className="font-display font-extrabold text-xl leading-tight mt-1">{selectedWallet.name}</h3>
                </div>
                {/* Chip icon */}
                <div className="w-10 h-7 rounded bg-amber-400/40 backdrop-blur-sm border border-amber-400/20 shadow-inner" />
              </div>

              {/* Card middle (balance) */}
              <div className="text-left">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block">Available Balance</span>
                <div className="text-3xl md:text-4xl font-display font-extrabold tracking-tight mt-0.5">
                  {formatCurrency(selectedWallet.balance)}
                </div>
              </div>

              {/* Card bottom */}
              <div className="flex justify-between items-end text-xs font-light">
                <div className="text-left">
                  <span className="text-[8px] text-white/40 uppercase block">Account linkage node</span>
                  <span className="font-mono tracking-wider font-semibold">{selectedWallet.cardNumber || 'UPI LINKED TOKEN'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-white/40 uppercase block">Secured client keys</span>
                  <span className="font-semibold uppercase text-[10px]">Aura Core v1.0</span>
                </div>
              </div>
            </motion.div>

            {/* Wallet transactions history list */}
            <div className={`p-6 rounded-[2rem] border ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Card Cashflow telemetry ({walletTransactions.length})
                </h4>
                <span className="text-[10px] text-slate-400 font-medium">Auto-aggregated lists</span>
              </div>

              {walletTransactions.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center font-light">No direct records linked to this wallet card yet.</p>
              ) : (
                <div className="space-y-3">
                  {walletTransactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center text-xs p-2.5 rounded-xl hover:bg-slate-500/[0.02] transition-colors">
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[180px]">{tx.description}</div>
                        <span className="text-[10px] text-slate-400 font-mono block">{tx.date}</span>
                      </div>
                      <div className={`font-extrabold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
