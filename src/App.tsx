import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import TransactionsView from './components/TransactionsView';
import BudgetsView from './components/BudgetsView';
import AnalyticsView from './components/AnalyticsView';
import GoalsView from './components/GoalsView';
import WalletView from './components/WalletView';
import InvestmentsView from './components/InvestmentsView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import TransactionModal from './components/TransactionModal';

import { 
  initialUserProfile, 
  mockTransactions, 
  mockBudgets, 
  mockGoals, 
  mockWallets, 
  mockNotifications, 
  mockAchievements,
  mockMonthlyData
} from './data/mockData';
import { Transaction, Budget, Goal, Wallet, NotificationItem, UserProfile, Achievement } from './types';

export default function App() {
  // Screens: 'landing' | 'login' | 'register' | 'app'
  const [screen, setScreen] = useState<'landing' | 'login' | 'register' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // States
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [wallets, setWallets] = useState<Wallet[]>(mockWallets);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);

  // Sync Dark Mode state to root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Log out
  const handleLogout = () => {
    setScreen('landing');
    setActiveTab('dashboard');
  };

  // Handle Login success
  const handleLoginSuccess = (email: string) => {
    setUser(prev => ({ ...prev, email }));
    setScreen('app');
  };

  // Handle Register success
  const handleRegisterSuccess = (email: string, name: string) => {
    setUser(prev => ({ ...prev, email, name, streak: 1 }));
    setScreen('app');
  };

  // Save new transaction logged from modal
  const handleSaveTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const freshTx: Transaction = {
      ...newTx,
      id: `t_custom_${Date.now()}`
    };

    // Prepend transaction
    setTransactions(prev => [freshTx, ...prev]);

    // Update active budgets spent metrics if matching category
    setBudgets(prev => prev.map(b => {
      if (b.category.toLowerCase() === newTx.category.toLowerCase() && newTx.type === 'expense') {
        return { ...b, spent: parseFloat((b.spent + newTx.amount).toFixed(2)) };
      }
      return b;
    }));

    // Update wallets balance depending on type/paymentMethod matches
    setWallets(prev => prev.map(w => {
      // Basic match
      const nameMatch = newTx.paymentMethod.toLowerCase().includes(w.name.split(' ')[0].toLowerCase()) ||
                        (w.type === 'Credit Card' && newTx.paymentMethod.toLowerCase().includes('amex')) ||
                        (w.type === 'UPI' && newTx.paymentMethod.toLowerCase().includes('apple')) ||
                        (w.type === 'Crypto' && newTx.paymentMethod.toLowerCase().includes('ledger')) ||
                        (w.type === 'Cash' && newTx.paymentMethod.toLowerCase().includes('cash'));
      
      if (nameMatch) {
        if (newTx.type === 'income') {
          return { ...w, balance: parseFloat((w.balance + newTx.amount).toFixed(2)) };
        } else {
          return { ...w, balance: parseFloat((w.balance - newTx.amount).toFixed(2)) };
        }
      }
      return w;
    }));

    // Trigger Notification of transaction logged
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    const factor = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : 83.5;
    const formattedAmount = `${symbol}${(newTx.amount * factor).toFixed(2)}`;

    const newNotif: NotificationItem = {
      id: `n_custom_${Date.now()}`,
      title: `${newTx.type === 'income' ? 'Income' : 'Expense'} Logged`,
      message: `Successfully recorded ${newTx.type === 'income' ? 'credit' : 'debit'} of ${formattedAmount} at "${newTx.description}".`,
      time: 'Just now',
      read: false,
      type: newTx.type === 'income' ? 'success' : 'info'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleDeleteAccount = () => {
    setScreen('landing');
    // Reset mock datasets to default
    setTransactions(mockTransactions);
    setBudgets(mockBudgets);
    setGoals(mockGoals);
    setWallets(mockWallets);
    setNotifications(mockNotifications);
    setAchievements(mockAchievements);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      isDarkMode ? 'bg-dark-bg text-slate-100' : 'bg-light-bg text-slate-800'
    }`}>
      {/* Screens Controller */}
      {screen === 'landing' && (
        <LandingPage 
          onGetStarted={() => setScreen('register')}
          onLogin={() => setScreen('login')}
          isDarkMode={isDarkMode}
        />
      )}

      {screen === 'login' && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onGoToRegister={() => setScreen('register')}
          onGoBack={() => setScreen('landing')}
          isDarkMode={isDarkMode}
        />
      )}

      {screen === 'register' && (
        <RegisterPage 
          onRegisterSuccess={handleRegisterSuccess}
          onGoToLogin={() => setScreen('login')}
          onGoBack={() => setScreen('landing')}
          isDarkMode={isDarkMode}
        />
      )}

      {screen === 'app' && (
        <div className="flex">
          {/* Animated Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              // scroll to top of viewport
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isDarkMode={isDarkMode}
            streakCount={user.streak}
          />

          {/* Main Content Area */}
          <div 
            className="flex-1 min-h-screen flex flex-col transition-all duration-300"
            style={{ marginLeft: isSidebarOpen ? '260px' : '88px' }}
          >
            {/* Top Navbar */}
            <Navbar 
              user={user}
              notifications={notifications}
              setNotifications={setNotifications}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              currency={currency}
              setCurrency={setCurrency}
              onLogout={handleLogout}
              activeTab={activeTab}
            />

            {/* View Render Router */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-20">
              {activeTab === 'dashboard' && (
                <DashboardView 
                  user={user}
                  transactions={transactions}
                  budgets={budgets}
                  goals={goals}
                  wallets={wallets}
                  achievements={achievements}
                  onOpenAddTransaction={() => setIsTransactionModalOpen(true)}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'transactions' && (
                <TransactionsView 
                  transactions={transactions}
                  setTransactions={setTransactions}
                  onOpenAddTransaction={() => setIsTransactionModalOpen(true)}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'budgets' && (
                <BudgetsView 
                  budgets={budgets}
                  setBudgets={setBudgets}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView 
                  monthlyData={mockMonthlyData}
                  budgets={budgets}
                  transactions={transactions}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'goals' && (
                <GoalsView 
                  goals={goals}
                  setGoals={setGoals}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'wallet' && (
                <WalletView 
                  wallets={wallets}
                  setWallets={setWallets}
                  transactions={transactions}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'investments' && (
                <InvestmentsView 
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsView 
                  transactions={transactions}
                  monthlyData={mockMonthlyData}
                  budgets={budgets}
                  currency={currency}
                  isDarkMode={isDarkMode}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsView 
                  user={user}
                  setUser={setUser}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  currency={currency}
                  setCurrency={setCurrency}
                  onDeleteAccount={handleDeleteAccount}
                />
              )}
            </main>
          </div>

          {/* Add Transaction Overlay Modal */}
          <TransactionModal 
            isOpen={isTransactionModalOpen}
            onClose={() => setIsTransactionModalOpen(false)}
            onSave={handleSaveTransaction}
            isDarkMode={isDarkMode}
            currency={currency}
          />
        </div>
      )}
    </div>
  );
}
