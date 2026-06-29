export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  paymentMethod: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  icon: string;
  color: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  image: string;
  category: string;
}

export interface Wallet {
  id: string;
  name: string;
  type: 'Cash' | 'Bank' | 'UPI' | 'Credit Card' | 'Crypto';
  balance: number;
  cardNumber?: string;
  gradient: string;
  accentColor: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success' | 'warning';
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  currency: string;
  language: string;
  theme: 'light' | 'dark';
  streak: number;
  savingsRate: number;
  financialScore: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface WeeklyData {
  day: string;
  amount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
