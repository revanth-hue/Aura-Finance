import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronUp, 
  ChevronDown, 
  SlidersHorizontal, 
  Trash2, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  onOpenAddTransaction: () => void;
  currency: string;
  isDarkMode: boolean;
}

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export default function TransactionsView({
  transactions,
  setTransactions,
  onOpenAddTransaction,
  currency,
  isDarkMode
}: TransactionsViewProps) {
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | 'income' | 'expense'>('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Formatting currency depending on symbol
  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Get unique categories for dropdown filter
  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  // Sorting and Filtering logic
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesType = selectedType === 'All' || t.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Financial Cash Ledger
          </h1>
          <p className="text-xs text-slate-400 font-light mt-1">
            Browse, search, and audit your <span className="font-semibold text-indigo-500">{transactions.length} record nodes</span>.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            id="transactions-open-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              showFilters 
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500' 
                : isDarkMode 
                  ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:text-white' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <button
            id="transactions-open-modal-btn"
            onClick={onOpenAddTransaction}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>
      </div>

      {/* Interactive Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden border rounded-2xl ${
              isDarkMode ? 'bg-slate-900/20 border-slate-800' : 'bg-slate-50 border-slate-200/60'
            }`}
          >
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Flow Pattern</label>
                <div className="flex bg-slate-200 dark:bg-slate-950/60 rounded-xl p-1 gap-1">
                  {(['All', 'income', 'expense'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setCurrentPage(1);
                      }}
                      className={`flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        selectedType === type
                          ? 'bg-indigo-500 text-white'
                          : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {type === 'All' ? 'All' : type === 'income' ? 'Income' : 'Expense'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Category Sector</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">State / Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Reset Action */}
              <div className="flex items-end">
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2.5 text-xs font-semibold rounded-xl text-slate-400 dark:hover:text-white bg-slate-500/[0.03] border border-slate-500/[0.08] hover:bg-slate-500/[0.08] transition-colors cursor-pointer"
                >
                  Clear Active Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Table Card */}
      <div className={`border rounded-[2rem] overflow-hidden ${
        isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
      }`}>
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-150 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-500/[0.01]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              id="transactions-search-description"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search description or systems..."
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border outline-none transition-all ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 focus:border-indigo-500 text-slate-100' 
                  : 'bg-white border-slate-200 focus:border-indigo-500 text-slate-800'
              }`}
            />
          </div>

          <span className="text-xs text-slate-400">
            Displaying <span className="font-semibold text-indigo-500">{filteredTransactions.length}</span> of {transactions.length} records
          </span>
        </div>

        {/* Empty State check */}
        {currentItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">No Records Found</h3>
            <p className="text-xs text-slate-400 font-light mt-1 max-w-sm leading-relaxed">
              We couldn't locate any cache records matching these exact searching parameters. Prune filters and search indices.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-150 dark:border-slate-800/60 pb-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-4 cursor-pointer select-none group" onClick={() => handleSort('date')}>
                    <div className="flex items-center gap-1.5">
                      Date {sortField === 'date' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                    </div>
                  </th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center">Category</th>
                  <th className="p-4 text-center">Payment Method</th>
                  <th className="p-4 cursor-pointer select-none" onClick={() => handleSort('amount')}>
                    <div className="flex items-center justify-end gap-1.5">
                      Magnitude {sortField === 'amount' && (sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                    </div>
                  </th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850/50">
                {currentItems.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-500/[0.01] transition-all">
                    {/* Date */}
                    <td className="p-4 font-mono font-medium text-slate-400">{tx.date}</td>
                    
                    {/* Description */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100 max-w-[200px] truncate">{tx.description}</div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.category === 'Salary' || tx.category === 'Freelance'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-indigo-500/10 text-indigo-500'
                      }`}>
                        {tx.category}
                      </span>
                    </td>

                    {/* Payment System */}
                    <td className="p-4 text-center text-slate-400 font-semibold">{tx.paymentMethod}</td>

                    {/* Amount */}
                    <td className={`p-4 text-right font-extrabold ${
                      tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {tx.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-extrabold border ${
                        tx.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/15'
                          : tx.status === 'Pending'
                            ? 'bg-warning-500/10 text-warning-500 border-warning-500/15'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/15'
                      }`}>
                        {tx.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            // Quick toggle transaction flow
                            const updated = transactions.map(t => 
                              t.id === tx.id 
                                ? { ...t, type: t.type === 'income' ? 'expense' as const : 'income' as const } 
                                : t
                            );
                            setTransactions(updated);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500'
                          }`}
                          title="Toggle Flow Type"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`transactions-delete-${tx.id}`}
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 rounded-lg border border-red-500/10 hover:border-red-500/30 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Prune Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer / Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-150 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-500/[0.01]">
            <span className="text-xs text-slate-400">
              Page <span className="font-semibold text-indigo-500">{currentPage}</span> of {totalPages}
            </span>

            <div className="flex gap-1.5">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {/* Simple page node lists */}
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => paginate(idx + 1)}
                  className={`w-9 h-9 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-indigo-500 text-white border-transparent shadow-md'
                      : isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                  currentPage === totalPages
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-transparent'
                    : isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
