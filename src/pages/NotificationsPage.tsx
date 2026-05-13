import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';

const NotificationsPage = () => {
  const { notifications, markAllRead, clearNotifications, pushNotification } = useAppStore();

  return (
    <DashboardLayout>
      <TopBar title="Notifications" />
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Notification Center</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-6">All system alerts, model events, and sentiment spikes</p>

          <div className="flex gap-2 mb-6">
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5"><CheckCheck className="w-3.5 h-3.5" /> Mark all read</Button>
            <Button variant="outline" size="sm" onClick={clearNotifications} className="gap-1.5"><Trash2 className="w-3.5 h-3.5" /> Clear</Button>
            <Button variant="outline" size="sm" onClick={() => pushNotification({ title: 'Test alert', message: 'A new sentiment spike was simulated', type: 'info' })}>
              + Simulate
            </Button>
          </div>

          <div className="glass-card rounded-xl divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground font-mono">No notifications</div>
            ) : (
              notifications.map((n) => (
                <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold">{n.title}</p>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          n.type === 'success' ? 'bg-primary/10 text-primary' :
                          n.type === 'warning' ? 'bg-warning/10 text-warning' :
                          n.type === 'error' ? 'bg-destructive/10 text-destructive' :
                          'bg-accent/10 text-accent'
                        }`}>{n.type}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default NotificationsPage;
