import { Transaction, Budget, Goal, Wallet, NotificationItem, UserProfile, MonthlyData, Achievement } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alexander Sterling',
  email: 'alexander@sterling.co',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  currency: 'USD',
  language: 'English',
  theme: 'dark',
  streak: 18,
  savingsRate: 34.5,
  financialScore: 84,
};

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jul', income: 8200, expense: 5100, savings: 3100 },
  { month: 'Aug', income: 8500, expense: 5300, savings: 3200 },
  { month: 'Sep', income: 8900, expense: 5800, savings: 3100 },
  { month: 'Oct', income: 9100, expense: 6100, savings: 3000 },
  { month: 'Nov', income: 9500, expense: 5400, savings: 4100 },
  { month: 'Dec', income: 11000, expense: 7800, savings: 3200 },
  { month: 'Jan', income: 9200, expense: 5050, savings: 4150 },
  { month: 'Feb', income: 9400, expense: 5200, savings: 4200 },
  { month: 'Mar', income: 9800, expense: 4900, savings: 4900 },
  { month: 'Apr', income: 10200, expense: 5300, savings: 4900 },
  { month: 'May', income: 10500, expense: 5500, savings: 5000 },
  { month: 'Jun', income: 11200, expense: 5800, savings: 5400 },
];

export const mockBudgets: Budget[] = [
  { id: 'b1', category: 'Food', limit: 800, spent: 542.8, icon: 'Utensils', color: '#4F46E5' },
  { id: 'b2', category: 'Travel', limit: 1200, spent: 980.5, icon: 'Plane', color: '#06B6D4' },
  { id: 'b3', category: 'Shopping', limit: 600, spent: 480.2, icon: 'ShoppingBag', color: '#EC4899' },
  { id: 'b4', category: 'Bills', limit: 1500, spent: 1420.0, icon: 'FileText', color: '#F59E0B' },
  { id: 'b5', category: 'Entertainment', limit: 500, spent: 220.4, icon: 'Film', color: '#10B981' },
  { id: 'b6', category: 'Education', limit: 400, spent: 150.0, icon: 'GraduationCap', color: '#8B5CF6' },
  { id: 'b7', category: 'Healthcare', limit: 300, spent: 85.0, icon: 'HeartPulse', color: '#EF4444' },
];

export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Apple MacBook Pro M4 Max',
    target: 4500,
    current: 3150,
    deadline: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300',
    category: 'Gadgets',
  },
  {
    id: 'g2',
    title: 'Amalfi Coast Vacation',
    target: 8000,
    current: 5400,
    deadline: '2026-08-10',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=300',
    category: 'Travel',
  },
  {
    id: 'g3',
    title: '6-Month Emergency Fund',
    target: 25000,
    current: 20000,
    deadline: '2026-12-31',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=300',
    category: 'Savings',
  },
  {
    id: 'g4',
    title: 'Tesla Model Y Downpayment',
    target: 15000,
    current: 6750,
    deadline: '2027-03-01',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=300',
    category: 'Automotive',
  },
];

export const mockWallets: Wallet[] = [
  { id: 'w1', name: 'Chase Sapphire Checking', type: 'Bank', balance: 14520.45, cardNumber: '•••• 4251', gradient: 'from-blue-600 to-indigo-800', accentColor: '#3B82F6' },
  { id: 'w2', name: 'Amex Platinum Premium', type: 'Credit Card', balance: -2450.80, cardNumber: '•••• 1007', gradient: 'from-zinc-700 to-zinc-950', accentColor: '#1E293B' },
  { id: 'w3', name: 'Apple Pay UPI Linked', type: 'UPI', balance: 1850.00, gradient: 'from-emerald-500 to-teal-700', accentColor: '#10B981' },
  { id: 'w4', name: 'Ledger Cold Wallet', type: 'Crypto', balance: 8420.30, gradient: 'from-purple-600 to-fuchsia-800', accentColor: '#A855F7' },
  { id: 'w5', name: 'Vault Physical Cash', type: 'Cash', balance: 450.00, gradient: 'from-amber-500 to-orange-600', accentColor: '#F59E0B' },
];

export const mockNotifications: NotificationItem[] = [
  { id: 'n1', title: 'Salary Credited', message: 'Your monthly salary of $7,500.00 was successfully deposited to Chase Checking.', time: '2 hours ago', read: false, type: 'success' },
  { id: 'n2', title: 'Budget Limit Alert', message: 'You have spent 81% of your "Travel" budget for this month.', time: '5 hours ago', read: false, type: 'warning' },
  { id: 'n3', title: 'Goal Milestone Achieved', message: 'Congratulations! You reached 70% of your MacBook Pro goal.', time: '1 day ago', read: true, type: 'success' },
  { id: 'n4', title: 'Recurring Bill Tomorrow', message: 'AWS Cloud Hosting subscription of $49.00 will be auto-debited tomorrow.', time: '2 days ago', read: true, type: 'info' },
  { id: 'n5', title: 'Unusual Expense Detected', message: 'An expense of $480.00 at "Nordstrom" is higher than your category average.', time: '3 days ago', read: true, type: 'alert' },
];

export const mockAchievements: Achievement[] = [
  { id: 'a1', title: 'Golden Streak', description: 'Maintain a budget logging streak of 15 days.', icon: 'Zap', unlocked: true, unlockedAt: '2026-06-25' },
  { id: 'a2', title: 'Super Saver', description: 'Achieve a monthly savings rate of over 30%.', icon: 'TrendingUp', unlocked: true, unlockedAt: '2026-06-28' },
  { id: 'a3', title: 'Debt Destroyer', description: 'Pay off a credit card balance fully.', icon: 'CheckCircle', unlocked: true, unlockedAt: '2026-06-10' },
  { id: 'a4', title: 'Crypto Pioneer', description: 'Link a crypto wallet and record a profit.', icon: 'Coins', unlocked: false },
  { id: 'a5', title: 'Architect of Wealth', description: 'Reach a net worth milestone of $25,000.', icon: 'Award', unlocked: true, unlockedAt: '2026-05-01' },
  { id: 'a6', title: 'Fortress of Solitude', description: 'Complete your Emergency Fund goal fully.', icon: 'ShieldAlert', unlocked: false },
];

export const mockFinancialTips = [
  { id: 1, title: 'The 50/30/20 Rule', text: 'Allocate 50% of income to needs, 30% to wants, and save or invest the remaining 20%. Following this systematically breeds sustainable wealth.' },
  { id: 2, title: 'Beat Inflation via S&P 500', text: 'Keeping large sums in liquid cash drains value over time. Directing consistent capital to low-cost index funds yields ~10% average annual returns.' },
  { id: 3, title: 'Audit Your Subscriptions', text: 'Unused software or streaming trials cost hundreds of dollars annually. Review active card tokens and prune services you haven’t accessed in 30 days.' },
  { id: 4, title: 'Emergency Reserves are Non-Negotiable', text: 'Ensure you have 3 to 6 months of living costs stacked safely in a High Yield Savings Account (HYSA) before chasing speculative investments.' },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2026-06-29', category: 'Food', description: 'Whole Foods Grocery', paymentMethod: 'Chase Checking', amount: 145.20, status: 'Completed', type: 'expense' },
  { id: 't2', date: '2026-06-28', category: 'Bills', description: 'AWS Cloud Services', paymentMethod: 'Amex Platinum', amount: 48.90, status: 'Completed', type: 'expense' },
  { id: 't3', date: '2026-06-28', category: 'Salary', description: 'Stripe Co. Monthly Payout', paymentMethod: 'Chase Checking', amount: 7500.00, status: 'Completed', type: 'income' },
  { id: 't4', date: '2026-06-27', category: 'Shopping', description: 'Apple Store - Magic Mouse', paymentMethod: 'Amex Platinum', amount: 99.00, status: 'Completed', type: 'expense' },
  { id: 't5', date: '2026-06-27', category: 'Travel', description: 'Uber Premier Ride', paymentMethod: 'Apple Pay', amount: 42.50, status: 'Completed', type: 'expense' },
  { id: 't6', date: '2026-06-26', category: 'Entertainment', description: 'Netflix Premium Monthly', paymentMethod: 'Amex Platinum', amount: 22.99, status: 'Completed', type: 'expense' },
  { id: 't7', date: '2026-06-25', category: 'Food', description: 'Blue Bottle Coffee', paymentMethod: 'Apple Pay', amount: 12.80, status: 'Completed', type: 'expense' },
  { id: 't8', date: '2026-06-25', category: 'Healthcare', description: 'CVS Pharmacy Prescription', paymentMethod: 'Amex Platinum', amount: 45.00, status: 'Completed', type: 'expense' },
  { id: 't9', date: '2026-06-24', category: 'Investments', description: 'Coinbase ETH Buy', paymentMethod: 'Ledger Cold Wallet', amount: 500.00, status: 'Completed', type: 'expense' },
  { id: 't10', date: '2026-06-24', category: 'Bills', description: 'Gold Gym Membership', paymentMethod: 'Chase Checking', amount: 85.00, status: 'Completed', type: 'expense' },
  { id: 't11', date: '2026-06-23', category: 'Food', description: 'Sushi Jin Dinner', paymentMethod: 'Chase Checking', amount: 120.40, status: 'Completed', type: 'expense' },
  { id: 't12', date: '2026-06-22', category: 'Education', description: 'Udemy - Advanced AI System Design', paymentMethod: 'Apple Pay', amount: 19.99, status: 'Completed', type: 'expense' },
  { id: 't13', date: '2026-06-22', category: 'Travel', description: 'Shell Petrol Pump', paymentMethod: 'Apple Pay', amount: 55.00, status: 'Completed', type: 'expense' },
  { id: 't14', date: '2026-06-21', category: 'Investments', description: 'Vanguard ETF Dividend Payout', paymentMethod: 'Chase Checking', amount: 320.00, status: 'Completed', type: 'income' },
  { id: 't15', date: '2026-06-20', category: 'Shopping', description: 'Zara Summer Collection Blazer', paymentMethod: 'Amex Platinum', amount: 189.50, status: 'Completed', type: 'expense' },
  { id: 't16', date: '2026-06-19', category: 'Entertainment', description: 'Epic Games Store - Cyberpunk DLC', paymentMethod: 'Amex Platinum', amount: 29.99, status: 'Completed', type: 'expense' },
  { id: 't17', date: '2026-06-19', category: 'Food', description: 'Erewhon Tonic & Salad', paymentMethod: 'Apple Pay', amount: 42.00, status: 'Completed', type: 'expense' },
  { id: 't18', date: '2026-06-18', category: 'Travel', description: 'Delta Air Lines JFK-SFO', paymentMethod: 'Amex Platinum', amount: 450.00, status: 'Completed', type: 'expense' },
  { id: 't19', date: '2026-06-17', category: 'Bills', description: 'Starlink Satellite Internet', paymentMethod: 'Chase Checking', amount: 120.00, status: 'Completed', type: 'expense' },
  { id: 't20', date: '2026-06-16', category: 'Food', description: 'Sweetgreen Salad Lunch', paymentMethod: 'Apple Pay', amount: 18.50, status: 'Completed', type: 'expense' },
  { id: 't21', date: '2026-06-15', category: 'Freelance', description: 'Consulting Contract Milestones - Apex Ltd', paymentMethod: 'Chase Checking', amount: 2800.00, status: 'Completed', type: 'income' },
  { id: 't22', date: '2026-06-14', category: 'Bills', description: 'State Farm Auto Insurance Premium', paymentMethod: 'Chase Checking', amount: 180.00, status: 'Completed', type: 'expense' },
  { id: 't23', date: '2026-06-13', category: 'Shopping', description: 'Amazon - Ergonomic Office Chair', paymentMethod: 'Amex Platinum', amount: 245.00, status: 'Completed', type: 'expense' },
  { id: 't24', date: '2026-06-12', category: 'Travel', description: 'Lime Scooter Commute', paymentMethod: 'Apple Pay', amount: 8.40, status: 'Completed', type: 'expense' },
  { id: 't25', date: '2026-06-12', category: 'Healthcare', description: 'Dental Cleaning Copay', paymentMethod: 'Amex Platinum', amount: 40.00, status: 'Completed', type: 'expense' },
  { id: 't26', date: '2026-06-11', category: 'Food', description: 'Le Bernardin Culinary Experience', paymentMethod: 'Chase Checking', amount: 350.00, status: 'Completed', type: 'expense' },
  { id: 't27', date: '2026-06-10', category: 'Education', description: 'Harvard Business Review Annual Subscription', paymentMethod: 'Amex Platinum', amount: 129.99, status: 'Completed', type: 'expense' },
  { id: 't28', date: '2026-06-10', category: 'Bills', description: 'T-Mobile Infinite Wireless', paymentMethod: 'Chase Checking', amount: 90.00, status: 'Completed', type: 'expense' },
  { id: 't29', date: '2026-06-09', category: 'Salary', description: 'Bonus Performance Award', paymentMethod: 'Chase Checking', amount: 1200.00, status: 'Completed', type: 'income' },
  { id: 't30', date: '2026-06-08', category: 'Entertainment', description: 'Spotify Premium Family Plan', paymentMethod: 'Apple Pay', amount: 16.99, status: 'Completed', type: 'expense' },
  { id: 't31', date: '2026-06-07', category: 'Food', description: 'Blue Bottle Coffee Roast', paymentMethod: 'Apple Pay', amount: 14.50, status: 'Completed', type: 'expense' },
  { id: 't32', date: '2026-06-06', category: 'Shopping', description: 'Nordstrom Designer Blazer Match', paymentMethod: 'Amex Platinum', amount: 480.00, status: 'Completed', type: 'expense' },
  { id: 't33', date: '2026-06-05', category: 'Travel', description: 'Chevron Station Refill', paymentMethod: 'Apple Pay', amount: 62.10, status: 'Completed', type: 'expense' },
  { id: 't34', date: '2026-06-05', category: 'Freelance', description: 'UI Design Advisory Payout', paymentMethod: 'Apple Pay', amount: 1500.00, status: 'Completed', type: 'income' },
  { id: 't35', date: '2026-06-04', category: 'Food', description: 'Trader Joe\'s Grocery Haul', paymentMethod: 'Chase Checking', amount: 110.20, status: 'Completed', type: 'expense' },
  { id: 't36', date: '2026-06-03', category: 'Investments', description: 'Coinbase Solana Buy', paymentMethod: 'Ledger Cold Wallet', amount: 200.00, status: 'Completed', type: 'expense' },
  { id: 't37', date: '2026-06-02', category: 'Bills', description: 'Adobe Creative Cloud', paymentMethod: 'Amex Platinum', amount: 54.99, status: 'Completed', type: 'expense' },
  { id: 't38', date: '2026-06-01', category: 'Food', description: 'Tartine Bakery Sourdough & Pastry', paymentMethod: 'Apple Pay', amount: 24.50, status: 'Completed', type: 'expense' },
  { id: 't39', date: '2026-05-30', category: 'Travel', description: 'W Hotel Seattle Stay', paymentMethod: 'Amex Platinum', amount: 380.00, status: 'Completed', type: 'expense' },
  { id: 't40', date: '2026-05-29', category: 'Entertainment', description: 'IMAX Theater - Movie Tickets', paymentMethod: 'Apple Pay', amount: 35.00, status: 'Completed', type: 'expense' },
  { id: 't41', date: '2026-05-28', category: 'Salary', description: 'Stripe Co. Monthly Payout', paymentMethod: 'Chase Checking', amount: 7500.00, status: 'Completed', type: 'income' },
  { id: 't42', date: '2026-05-27', category: 'Bills', description: 'PG&E Electrical Grid Utility', paymentMethod: 'Chase Checking', amount: 135.00, status: 'Completed', type: 'expense' },
  { id: 't43', date: '2026-05-26', category: 'Food', description: 'Eataly NYC Grocery Purchases', paymentMethod: 'Apple Pay', amount: 92.40, status: 'Completed', type: 'expense' },
  { id: 't44', date: '2026-05-25', category: 'Shopping', description: 'Nike Lab - Air Max Sneakers', paymentMethod: 'Amex Platinum', amount: 160.00, status: 'Completed', type: 'expense' },
  { id: 't45', date: '2026-05-24', category: 'Investments', description: 'Vanguard Index Fund Buy VOO', paymentMethod: 'Chase Checking', amount: 1000.00, status: 'Completed', type: 'expense' },
  { id: 't46', date: '2026-05-23', category: 'Freelance', description: 'Web System Consulting - Zenith Inc', paymentMethod: 'Chase Checking', amount: 3200.00, status: 'Completed', type: 'income' },
  { id: 't47', date: '2026-05-22', category: 'Travel', description: 'Avis Premium Car Rental', paymentMethod: 'Amex Platinum', amount: 145.00, status: 'Completed', type: 'expense' },
  { id: 't48', date: '2026-05-21', category: 'Healthcare', description: 'Optician Eye Exam & Frames', paymentMethod: 'Amex Platinum', amount: 280.00, status: 'Completed', type: 'expense' },
  { id: 't49', date: '2026-05-20', category: 'Food', description: 'Blue Bottle Coffee', paymentMethod: 'Apple Pay', amount: 13.20, status: 'Completed', type: 'expense' },
  { id: 't50', date: '2026-05-18', category: 'Shopping', description: 'Bose QuietComfort Headphones Ultra', paymentMethod: 'Amex Platinum', amount: 379.00, status: 'Completed', type: 'expense' },
];
