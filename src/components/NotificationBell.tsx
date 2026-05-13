import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/store/appStore';

const iconFor = (type: string) => {
  if (type === 'success') return <CheckCircle2 className="w-4 h-4 text-primary" />;
  if (type === 'warning') return <AlertTriangle className="w-4 h-4 text-warning" />;
  if (type === 'error') return <XCircle className="w-4 h-4 text-destructive" />;
  return <Info className="w-4 h-4 text-accent" />;
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, markAllRead, clearNotifications } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="absolute right-0 top-11 z-50 w-80 glass-card rounded-xl overflow-hidden"
            >
              <div className="p-3 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-bold">Notifications</h3>
                <div className="flex gap-1">
                  <button onClick={markAllRead} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" title="Mark all read">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={clearNotifications} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive" title="Clear all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-muted-foreground font-mono">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${
                        !n.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex gap-2.5">
                        <div className="mt-0.5 shrink-0">{iconFor(n.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
