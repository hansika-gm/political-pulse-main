import { motion } from 'framer-motion';
import { Activity, Cpu, GraduationCap, Layers, Pause, Play } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { liveTrainingLoss, trainingRuns } from '@/data/extendedMockData';

const TrainingPage = () => {
  const [running, setRunning] = useState(true);
  return (
    <DashboardLayout>
      <TopBar title="Training Monitor" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Training Monitor</h1>
            {running && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> RUNNING
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-8">Real-time training metrics — loss, accuracy and convergence</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Run', value: 'run-22', icon: Activity },
              { label: 'Current Epoch', value: '7 / 10', icon: Layers },
              { label: 'GPU Util', value: '87%', icon: Cpu },
              { label: 'ETA', value: '12m 04s', icon: GraduationCap },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <s.icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-xl font-black gradient-text">{s.value}</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Live Training Loss</h3>
                <button onClick={() => setRunning(!running)} className="px-3 py-1.5 rounded text-xs font-mono bg-secondary hover:bg-secondary/80 flex items-center gap-1.5">
                  {running ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Resume</>}
                </button>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={liveTrainingLoss}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.15)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Live Accuracy</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={liveTrainingLoss}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0.5, 1]} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Recent Training Runs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] font-mono text-muted-foreground uppercase border-b border-border">
                    <th className="py-2">Run ID</th><th>Model</th><th>Epoch</th><th>Loss</th><th>Accuracy</th><th>Duration</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingRuns.map(r => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-2.5 font-mono text-xs">{r.id}</td>
                      <td className="text-xs">{r.model}</td>
                      <td className="text-xs">{r.epoch}</td>
                      <td className="text-xs font-mono">{r.loss}</td>
                      <td className="text-xs font-mono text-primary">{(r.accuracy * 100).toFixed(1)}%</td>
                      <td className="text-xs">{r.duration}</td>
                      <td><span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default TrainingPage;
