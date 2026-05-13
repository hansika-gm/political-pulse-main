import { Sun, Moon, Radio, Pause } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import NotificationBell from './NotificationBell';

const TopBar = ({ title }: { title?: string }) => {
  const { mode, setMode, theme, toggleTheme } = useAppStore();
  return (
    <div className="flex items-center justify-between mb-6 lg:mb-8">
      <div className="lg:hidden w-10" />
      <div className="flex-1">
        {title && <h2 className="hidden lg:block text-xs font-mono text-muted-foreground uppercase tracking-widest">{title}</h2>}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-border overflow-hidden text-[10px] font-mono">
          <button
            onClick={() => setMode('LIVE')}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
              mode === 'LIVE' ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'
            }`}
          >
            <Radio className="w-3 h-3" /> LIVE
          </button>
          <button
            onClick={() => setMode('DEMO')}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
              mode === 'DEMO' ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'
            }`}
          >
            <Pause className="w-3 h-3" /> DEMO
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <NotificationBell />
      </div>
    </div>
  );
};

export default TopBar;
