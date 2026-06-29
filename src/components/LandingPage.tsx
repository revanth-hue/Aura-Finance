import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PieChart, 
  Smartphone, 
  Layers, 
  Star,
  DollarSign
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isDarkMode: boolean;
}

export default function LandingPage({ onGetStarted, onLogin, isDarkMode }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-500 ${
      isDarkMode ? 'bg-dark-bg text-slate-100' : 'bg-light-bg text-slate-800'
    }`}>
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [0, -90, 60, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 dark:bg-cyan-500/5 rounded-full blur-[140px]"
        />
      </div>

      {/* Landing Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0F172A]/85 border-white/5' : 'bg-white/45 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              AURA
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-indigo-500 transition-colors">Features</a>
            <a href="#preview" className="hover:text-indigo-500 transition-colors">Preview</a>
            <a href="#pricing" className="hover:text-indigo-500 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-indigo-500 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              id="landing-login-btn"
              onClick={onLogin}
              className="text-sm font-semibold hover:text-indigo-500 transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button 
              id="landing-getstarted-btn"
              onClick={onGetStarted}
              className="relative group overflow-hidden text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tag */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 flex items-center space-x-2 bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              Reimagining Wealth Intelligence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tight max-w-4xl leading-[1.1]"
          >
            Beautiful Wealth Management,{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Designed for Perfectionists.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-light"
          >
            Aura integrates multi-wallet synchronizations, smart budgets, real-time analytics, and futuristic goal trackers inside an Apple-level visual canvas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              id="hero-cta-primary"
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/45 hover:scale-[1.03] transition-all cursor-pointer"
            >
              Access Your Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-cta-secondary"
              onClick={onLogin}
              className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-200' 
                  : 'border-slate-200 bg-white/60 hover:bg-white text-slate-800 shadow-sm'
              }`}
            >
              Sign In to Existing Account
            </button>
          </motion.div>

          {/* Micro Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex items-center justify-center space-x-8 text-xs text-slate-400 dark:text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> AES-256 Encryption</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Fully Offline First</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Real-time Auditing</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Animated Dashboard Preview */}
      <section id="preview" className="relative z-10 py-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`relative rounded-[2.5rem] p-4 md:p-6 shadow-2xl border ${
            isDarkMode 
              ? 'bg-[#0F172A]/80 border-white/5 shadow-indigo-950/20 backdrop-blur-md' 
              : 'bg-white/90 border-slate-200/80 shadow-indigo-500/5'
          }`}
        >
          {/* Safari-style window controls */}
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-400 pl-4 font-mono select-none">https://aura.sterling.co/dashboard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Mock Panel */}
            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/50 border-slate-800/60' : 'bg-slate-50 border-slate-100'}`}>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">Total Assets</span>
                <span className="text-3xl font-display font-bold text-slate-950 dark:text-white">$32,150.32</span>
                <span className="text-xs text-emerald-500 font-semibold block mt-1">+14.2% This Month</span>
              </div>
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-950/50 border-slate-800/60' : 'bg-slate-50 border-slate-100'}`}>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">Active Budgets</span>
                <div className="flex justify-between items-center text-xs mt-1 mb-2 font-semibold">
                  <span>Shopping</span>
                  <span className="text-indigo-500">80% Spent</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            {/* Middle Mock Chart */}
            <div className={`md:col-span-2 p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-950/50 border-slate-800/60' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-sm font-bold">Income vs Expense Analytics</h4>
                  <span className="text-xs text-slate-400">Monthly fiscal tracking overview</span>
                </div>
                <div className="flex space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 self-center" />
                  <span className="text-[10px] text-slate-400 font-medium">Income</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-500 self-center pl-2" />
                  <span className="text-[10px] text-slate-400 font-medium">Expense</span>
                </div>
              </div>
              <div className="h-32 flex items-end justify-between px-2 pt-4">
                {[45, 60, 35, 70, 50, 85, 40, 95, 65, 80, 55, 90].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center w-full group">
                    <div className="w-4 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t" style={{ height: `${val}px` }} />
                    <div className="w-4 bg-cyan-400/50 rounded-t mt-1" style={{ height: `${val * 0.6}px` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-4">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Engineered For Superior Financial Agency
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base font-light">
            Every screen is polished to perfection, ensuring no latency, beautiful telemetry, and absolute security over personal records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: PieChart,
              color: 'from-indigo-500 to-purple-600',
              title: 'Luxury Analytics',
              description: 'Exquisite data charts displaying income distributions, category trends, growth tracks, and automated health indices.'
            },
            {
              icon: Smartphone,
              color: 'from-cyan-500 to-blue-600',
              title: 'Multi-Wallet Cards',
              description: 'Aggregate cash reserves, bank checking accounts, digital UPI, credit limits, and cold wallets in virtual luxury cards.'
            },
            {
              icon: ShieldCheck,
              color: 'from-emerald-500 to-teal-600',
              title: 'Offline Security',
              description: 'We store your transactions strictly client-side inside a secured local state cache. Your wealth remains confidential.'
            },
            {
              icon: Zap,
              color: 'from-amber-500 to-orange-600',
              title: 'Aura Streak Tracker',
              description: 'Maintains budget integrity with daily streaks, accomplishments, custom achievements, and active milestones.'
            },
            {
              icon: Layers,
              color: 'from-pink-500 to-rose-600',
              title: 'Flexible Budgets',
              description: 'Set customized budgets for specific spending sectors and trace live circular progress rings as transactions load.'
            },
            {
              icon: DollarSign,
              color: 'from-violet-500 to-indigo-700',
              title: 'Financial Health Score',
              description: 'Our proprietary algorithm analyzes debt metrics, savings rate, and goal accuracy to calculate your rating.'
            }
          ].map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-8 rounded-[2rem] border text-left transition-all relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-slate-800/20 border-white/5 hover:border-indigo-500/30 backdrop-blur-sm' 
                  : 'bg-white border-slate-200/80 hover:border-indigo-500/20 shadow-sm hover:shadow-lg hover:shadow-slate-100/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Transparent Pricing Models
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base font-light">
            Use the powerful essential engine for free forever, or upgrade to Elite for next-level visual agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Essential Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-[2rem] border text-left ${
              isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm shadow-md' : 'bg-white border-slate-200 shadow-sm shadow-slate-100'
            }`}
          >
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Free Essential</span>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-display font-extrabold">$0</span>
              <span className="text-slate-400 text-sm pl-1">/ month</span>
            </div>
            <p className="text-slate-400 text-sm mt-4">Full core dashboard tracking for individual users.</p>
            
            <hr className="my-6 border-slate-200 dark:border-slate-800" />
            
            <ul className="space-y-3.5 text-sm font-light">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Core Income & Expense Dashboard</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 5 Virtual Wallets</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard Analytics & Chart views</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Local CSV Reports Download</li>
            </ul>
            
            <button 
              id="price-btn-essential"
              onClick={onGetStarted}
              className="mt-8 w-full py-3 px-6 font-semibold rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-center"
            >
              Access Free Tier
            </button>
          </motion.div>

          {/* Elite Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2rem] border text-left relative overflow-hidden bg-slate-950 text-white border-indigo-500/40 shadow-xl shadow-indigo-500/10"
          >
            <div className="absolute top-4 right-4 bg-indigo-500 text-[10px] font-bold text-white tracking-widest px-3 py-1 rounded-full uppercase">
              Elite Tier
            </div>
            <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Aura Pro Unlimited</span>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-display font-extrabold">$12</span>
              <span className="text-indigo-300 text-sm pl-1">/ month</span>
            </div>
            <p className="text-indigo-200 text-sm mt-4">For the premium visual perfectionist seeking advanced insight.</p>
            
            <hr className="my-6 border-slate-800" />
            
            <ul className="space-y-3.5 text-sm font-light">
              <li className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Advanced Analytics Modules</li>
              <li className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Futuristic Predictive Expense AI Model</li>
              <li className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> PDF and Raw CSV Custom Report Builders</li>
              <li className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Exclusive Golden Achievement Streak Themes</li>
              <li className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Apple Wallet-level Dark Mode presets</li>
            </ul>
            
            <button 
              id="price-btn-elite"
              onClick={onGetStarted}
              className="mt-8 w-full py-3 px-6 font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg shadow-indigo-500/20 text-center"
            >
              Get Pro Access Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            Trusted By Luxury Wealth Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Jenkins',
              role: 'Fintech Product Designer',
              quote: 'The UX is absolute magic. It behaves exactly like a native Apple Wallet or Revolut app, but runs cleanly in the browser. Absolute perfection.',
              stars: 5,
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
            },
            {
              name: 'Marcus Thorne',
              role: 'Venture Capital Partner',
              quote: 'I have replaced my Excel sheets and basic trackers with Aura. The multi-wallet feature keeps cash, checking, and cold wallets structured beautifully.',
              stars: 5,
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
            },
            {
              name: 'Elena Rostova',
              role: 'Quantitative Trader',
              quote: 'Extremely clean visualization patterns. The animations are fluid, the calculations are instantaneous, and the security of having zero cloud databases is a massive relief.',
              stars: 5,
              img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-[2rem] border text-left flex flex-col justify-between ${
                isDarkMode ? 'bg-slate-800/20 border-white/5 backdrop-blur-sm' : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100'
              }`}
            >
              <div>
                <div className="flex space-x-1 text-amber-500 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm italic font-light leading-relaxed">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <span className="text-xs text-slate-400">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className={`py-12 border-t text-sm relative z-10 transition-colors duration-300 ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">A</div>
              <span className="font-display font-bold text-xl text-slate-950 dark:text-white">AURA</span>
            </div>
            <p className="text-xs font-light leading-relaxed">
              Premium client-side asset telemetry, custom budgeting, and fiscal performance visualizers in an elevated interface design.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-950 dark:text-white mb-4">System</h5>
            <ul className="space-y-2 font-light text-xs">
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">Core Engine</a></li>
              <li><a href="#preview" className="hover:text-indigo-500 transition-colors">Performance Telemetry</a></li>
              <li><a href="#pricing" className="hover:text-indigo-500 transition-colors">Elite Licensing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-950 dark:text-white mb-4">Resources</h5>
            <ul className="space-y-2 font-light text-xs">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Wealth Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Audit Integrity</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms of Consent</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-950 dark:text-white mb-4">Client Access</h5>
            <button 
              id="footer-dashboard-btn"
              onClick={onGetStarted}
              className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 rounded-xl transition-all font-semibold w-full text-center text-xs"
            >
              Launch Core Console
            </button>
            <p className="text-[10px] text-slate-400 mt-3 text-center">Version 1.0.4 • © 2026 Aura Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
