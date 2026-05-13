import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Radio, BarChart3, MessageSquare, Brain, Github, Menu, X, Wifi, WifiOff, Database, ShieldAlert, Server, GraduationCap, TrendingUp, Map, ShieldCheck, User, Bell, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreamStatus } from '@/hooks/useStreamingData';

const navItems = [
  { to: '/', icon: Home, label: 'Home', group: 'Overview' },
  { to: '/live', icon: Radio, label: 'Live Stream', group: 'Overview' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', group: 'Overview' },
  { to: '/tweets', icon: MessageSquare, label: 'Tweets', group: 'Overview' },
  { to: '/dataset', icon: Database, label: 'Dataset', group: 'AI' },
  { to: '/training', icon: GraduationCap, label: 'Training', group: 'AI' },
  { to: '/forecast', icon: TrendingUp, label: 'Forecast', group: 'AI' },
  { to: '/geo', icon: Map, label: 'Geo Heatmap', group: 'AI' },
  { to: '/fake-news', icon: ShieldCheck, label: 'Fake News', group: 'AI' },
  { to: '/ethics', icon: ShieldAlert, label: 'Ethics & Bias', group: 'System' },
  { to: '/system', icon: Server, label: 'System', group: 'System' },
  { to: '/notifications', icon: Bell, label: 'Notifications', group: 'Account' },
  { to: '/profile', icon: User, label: 'Profile', group: 'Account' },
  { to: '/assistant', icon: Bot, label: 'AI Assistant', group: 'Account' },
];

const Sidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: status } = useStreamStatus();
  const backendUp = !!status;

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">PolitiSense</h1>
            <p className="text-xs text-muted-foreground font-mono">v3.0 • AI Engine</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          {backendUp ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-mono">Backend Connected</span>
              {status?.streaming && (
                <span className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-primary font-mono">LIVE</span>
                </span>
              )}
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">Demo Mode</span>
            </>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {['Overview', 'AI', 'System', 'Account'].map((group) => (
          <div key={group} className="mb-3">
            <p className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">{group}</p>
            {navItems.filter(n => n.group === group).map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink key={item.to} to={item.to} className="block" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </motion.div>
            </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground font-mono">v3.0.0 • Master Level</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-foreground"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/50 backdrop-blur-xl hidden lg:flex flex-col">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card flex flex-col lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
