import { motion } from 'framer-motion';
import { User, FileText, Trash2, Download, Mail, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const ProfilePage = () => {
  const { savedReports, saveReport, deleteReport } = useAppStore();
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');

  return (
    <DashboardLayout>
      <TopBar title="Profile & Reports" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Profile & Saved Reports</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Your analyst profile, preferences, and exported reports</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-black text-primary-foreground mb-3 glow-primary">
                  AN
                </div>
                <h3 className="text-lg font-bold">Analyst One</h3>
                <p className="text-xs font-mono text-muted-foreground">Senior Research Analyst</p>
                <div className="w-full mt-4 pt-4 border-t border-border space-y-2 text-left">
                  <p className="text-xs text-muted-foreground flex items-center gap-2"><Mail className="w-3 h-3" /> analyst@politisense.ai</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined Jan 2026</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Activity Summary</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Reports Generated', value: '47' },
                  { label: 'Tweets Analyzed', value: '24.8K' },
                  { label: 'Streams Started', value: '128' },
                  { label: 'Models Compared', value: '15' },
                ].map(s => (
                  <div key={s.label} className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-2xl font-black gradient-text">{s.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Saved Reports</h3>
            </div>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Report name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary border-border" />
              <Input placeholder="Query / keyword" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-secondary border-border" />
              <Button
                onClick={() => { if (name && query) { saveReport({ name, query }); setName(''); setQuery(''); } }}
                className="shrink-0"
              >
                Save Report
              </Button>
            </div>
            <div className="space-y-2">
              {savedReports.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{r.date} · {r.query}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded hover:bg-secondary"><Download className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button onClick={() => deleteReport(r.id)} className="p-2 rounded hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                  </div>
                </div>
              ))}
              {savedReports.length === 0 && (
                <p className="text-center text-xs text-muted-foreground font-mono py-6">No saved reports yet</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default ProfilePage;
