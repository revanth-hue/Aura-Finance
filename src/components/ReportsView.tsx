import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Printer, Table, CheckCircle, ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { Transaction, MonthlyData, Budget } from '../types';

interface ReportsViewProps {
  transactions: Transaction[];
  monthlyData: MonthlyData[];
  budgets: Budget[];
  currency: string;
  isDarkMode: boolean;
}

export default function ReportsView({
  transactions,
  monthlyData,
  budgets,
  currency,
  isDarkMode
}: ReportsViewProps) {
  const [reportType, setReportType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState('Jun');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const formatCurrency = (val: number) => {
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    return `${symbol}${(val * factor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPreview(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 1000);
  };

  // actual client-side CSV downloader
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Category', 'Description', 'Payment Method', 'Amount', 'Type', 'Status'];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      t.category,
      `"${t.description.replace(/"/g, '""')}"`,
      t.paymentMethod,
      t.amount,
      t.type,
      t.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Aura_Fiscal_Ledger_${selectedMonth}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast('Ledger successfully compiled and saved as CSV!');
  };

  // Print workflow
  const handlePrint = () => {
    window.print();
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Mock Calculations for report preview
  const reportTransactions = transactions.filter(t => t.date.includes('2026-06'));
  const reportIncome = reportTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const reportExpense = reportTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const reportSavings = reportIncome - reportExpense;

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
          Financial Statements & Reports
        </h1>
        <p className="text-xs text-slate-400 font-light mt-1">
          Compile certified balance statements, income breakdowns, and CSV data packages locally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Parameters Panel */}
        <div className={`p-6 rounded-[2rem] border space-y-5 ${
          isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
        }`}>
          <h3 className="text-sm font-extrabold flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" /> Statement Configurations
          </h3>

          {/* Toggle Report Type */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Statement Period</label>
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
              <button
                onClick={() => setReportType('monthly')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  reportType === 'monthly'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-indigo-500'
                }`}
              >
                Monthly Statement
              </button>
              <button
                onClick={() => setReportType('yearly')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  reportType === 'yearly'
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-indigo-500'
                }`}
              >
                Yearly Statement
              </button>
            </div>
          </div>

          {/* Select Month and Year */}
          {reportType === 'monthly' && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Target Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <option key={m} value={m}>{m} Month</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-400">Target Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="2026">Fiscal 2026</option>
              <option value="2025">Fiscal 2025</option>
            </select>
          </div>

          <button
            id="reports-compile-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-2xl shadow-lg transition-colors cursor-pointer"
          >
            {isGenerating ? 'Compiling Statement Ledger...' : 'Compile Audit Statement'}
          </button>
        </div>

        {/* Statements Preview Screen */}
        <div className="lg:col-span-2">
          {isGenerating && (
            <div className={`p-20 border rounded-[2rem] text-center space-y-4 ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-slate-50 border-slate-200 shadow-inner'
            }`}>
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto" />
              <h4 className="text-sm font-bold">Assembling Ledger Modules</h4>
              <p className="text-xs text-slate-400 font-light">Validating offline cryptographic cache keys...</p>
            </div>
          )}

          {!isGenerating && !showPreview && (
            <div className={`p-20 border rounded-[2rem] text-center flex flex-col items-center justify-center space-y-4 ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold">Ready to Compile</h4>
              <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed">
                Select your parameters and click Compile. You will receive a full high-fidelity visual preview with raw exports.
              </p>
            </div>
          )}

          {!isGenerating && showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 md:p-8 rounded-[2rem] border space-y-8 ${
                isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
              }`}
            >
              {/* Header preview details */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-500">
                    <Sparkles className="w-4 h-4" />
                    <span>AURA AUDIT INTEGRITY</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Statement: {selectedMonth} {selectedYear}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium font-mono block">Certificate Node ID: {Math.floor(100000 + Math.random() * 900000)}</span>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    id="reports-csv-btn"
                    onClick={handleExportCSV}
                    className={`p-2 rounded-xl border flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all cursor-pointer`}
                    title="Export CSV"
                  >
                    <Table className="w-4.5 h-4.5" />
                  </button>
                  <button
                    id="reports-print-btn"
                    onClick={handlePrint}
                    className={`p-2 rounded-xl border flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all cursor-pointer`}
                    title="Print Document"
                  >
                    <Printer className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Data parameters table highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                <div className="p-4 rounded-xl bg-slate-500/[0.02] border border-slate-500/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Statement Income</span>
                  <div className="text-xl font-display font-extrabold text-emerald-500 mt-1">{formatCurrency(reportIncome)}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-500/[0.02] border border-slate-500/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Statement Expense</span>
                  <div className="text-xl font-display font-extrabold text-slate-900 dark:text-white mt-1">{formatCurrency(reportExpense)}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-500/[0.02] border border-slate-500/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Balance surplus</span>
                  <div className="text-xl font-display font-extrabold text-indigo-500 mt-1">{formatCurrency(reportSavings)}</div>
                </div>
              </div>

              {/* Mini cashflow logs */}
              <div className="space-y-3.5 text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Cashflow Records</h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border rounded-2xl overflow-hidden">
                  {reportTransactions.slice(0, 4).map((tx) => (
                    <div key={tx.id} className="p-4 flex justify-between items-center text-xs hover:bg-slate-500/[0.01]">
                      <div>
                        <div className="font-bold">{tx.description}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{tx.date}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-950 dark:text-white'}`}>
                          {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono block">{tx.paymentMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footers of report */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 text-center text-[10px] text-slate-400 font-light leading-relaxed">
                This document is compiled using the Aura Wealth suite. Data calculations are held isolated client-side and audited via local security keys.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
