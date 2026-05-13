import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, Wifi, WifiOff, Cpu, Database, Clock, Zap, HardDrive, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStreamStatus } from '@/hooks/useStreamingData';
import { systemMetrics } from '@/data/mockData';

const PulsingDot = ({ active }: { active: boolean }) => (
  <span className={`inline-block w-2.5 h-2.5 rounded-full ${active ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
);

const SystemPage = () => {
  const { data: status } = useStreamStatus();
  const backendUp = !!status;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const metrics = backendUp ? systemMetrics : { ...systemMetrics, tweetsPerSecond: 0, activeConnections: 0, queueSize: 0 };

  const formatUptime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">System Status</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Infrastructure health, API status, and deployment architecture
          </p>

          {/* Connection Status Banner */}
          <div className={`glass-card rounded-xl p-6 mb-8 ${backendUp ? 'border-primary/30' : 'border-destructive/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {backendUp ? <Wifi className="w-6 h-6 text-primary" /> : <WifiOff className="w-6 h-6 text-destructive" />}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {backendUp ? 'Backend Connected' : 'Backend Offline — Demo Mode'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {backendUp ? 'All services operational' : 'Using simulated data. Start Flask backend for live data.'}
                  </p>
                </div>
              </div>
              <PulsingDot active={backendUp} />
            </div>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Tweets/sec', value: metrics.tweetsPerSecond.toFixed(1), icon: Zap, color: 'text-primary' },
              { label: 'API Latency', value: `${metrics.apiLatency}ms`, icon: Activity, color: 'text-accent' },
              { label: 'VADER Speed', value: `${metrics.vaderResponseTime}ms`, icon: Clock, color: 'text-primary' },
              { label: 'BERT Speed', value: `${metrics.bertResponseTime}ms`, icon: Cpu, color: 'text-warning' },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card text-center">
                <m.icon className={`w-5 h-5 ${m.color} mx-auto mb-2`} />
                <p className="text-2xl font-black text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Service Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Service Health</h3>
              <div className="space-y-3">
                {[
                  { name: 'Flask API Server', status: backendUp, port: '5000' },
                  { name: 'Socket.IO (WebSocket)', status: backendUp, port: '5000/ws' },
                  { name: 'SQLite Database', status: true, port: 'local' },
                  { name: 'Twitter/X Stream', status: backendUp && !!status?.streaming, port: 'API v2' },
                  { name: 'VADER Analyzer', status: true, port: 'in-process' },
                  { name: 'BERT Model', status: true, port: 'in-process' },
                ].map((svc) => (
                  <div key={svc.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <PulsingDot active={svc.status} />
                      <span className="text-sm text-foreground">{svc.name}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{svc.port}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Environment</h3>
              <div className="space-y-3">
                {[
                  { key: 'Frontend', value: 'React 18 + Vite 5 + TypeScript' },
                  { key: 'Backend', value: 'Python 3.11 + Flask + Socket.IO' },
                  { key: 'ML Models', value: 'VADER, LR, NB, SVM, BERT' },
                  { key: 'Database', value: `SQLite — ${metrics.dbSize}` },
                  { key: 'Uptime', value: `${metrics.uptime}%` },
                  { key: 'Session', value: formatUptime(elapsed) },
                ].map((env) => (
                  <div key={env.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <span className="text-sm text-muted-foreground">{env.key}</span>
                    <span className="text-sm font-mono text-foreground">{env.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">Deployment Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Data Layer */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-accent" />
                  <h4 className="text-xs font-mono text-accent uppercase tracking-widest">Data Layer</h4>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Twitter/X API v2 (Filtered Stream)</p>
                  <p>• SQLite persistent storage</p>
                  <p>• NLP preprocessing pipeline</p>
                  <p>• VADER + BERT inference</p>
                </div>
              </div>
              {/* API Layer */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-mono text-primary uppercase tracking-widest">API Layer</h4>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Flask REST API (port 5000)</p>
                  <p>• Socket.IO real-time events</p>
                  <p>• /api/tweets, /api/analytics</p>
                  <p>• /api/predict, /api/status</p>
                </div>
              </div>
              {/* Presentation Layer */}
              <div className="rounded-xl border border-warning/20 bg-warning/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-warning" />
                  <h4 className="text-xs font-mono text-warning uppercase tracking-widest">Frontend</h4>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• React + TypeScript + Vite</p>
                  <p>• Tailwind CSS + Chart.js</p>
                  <p>• PWA with offline support</p>
                  <p>• Socket.IO client</p>
                </div>
              </div>
            </div>
            {/* Flow arrows */}
            <div className="flex items-center justify-center gap-4 mt-6 text-xs font-mono text-muted-foreground">
              <span className="px-3 py-1.5 rounded bg-accent/10 text-accent">Twitter API</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded bg-primary/10 text-primary">Flask + AI</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded bg-warning/10 text-warning">React Dashboard</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SystemPage;
