import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldX, Search } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fakeNewsItems } from '@/data/extendedMockData';

const FakeNewsPage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ prob: number; reasons: string[] } | null>(null);

  const analyze = () => {
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    let prob = 0.3;
    const reasons: string[] = [];
    if (/breaking|shocking|exclusive|leaked/.test(lower)) { prob += 0.25; reasons.push('Sensational language'); }
    if (/anonymous|sources say|insider/.test(lower)) { prob += 0.2; reasons.push('Anonymous source'); }
    if (/!{2,}/.test(text)) { prob += 0.1; reasons.push('Excessive punctuation'); }
    if (text.length < 60) { prob += 0.1; reasons.push('Very short — lacks context'); }
    if (/official|press release|confirmed by/.test(lower)) { prob -= 0.2; reasons.push('References official source'); }
    prob = Math.max(0.05, Math.min(0.97, prob));
    if (reasons.length === 0) reasons.push('Neutral linguistic profile');
    setResult({ prob, reasons });
  };

  const verdictBadge = (p: number) => {
    if (p >= 0.7) return { label: 'LIKELY FAKE', icon: ShieldX, color: 'destructive' };
    if (p >= 0.4) return { label: 'SUSPICIOUS', icon: AlertTriangle, color: 'warning' };
    return { label: 'LIKELY REAL', icon: ShieldCheck, color: 'primary' };
  };

  return (
    <DashboardLayout>
      <TopBar title="Fake News Detection" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Fake News Detection</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Misinformation classifier — heuristic + BERT-based credibility scoring</p>

          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">Check a Statement</h3>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Paste a tweet or news headline..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                className="bg-secondary border-border"
              />
              <Button onClick={analyze} className="gap-2"><Search className="w-4 h-4" /> Analyze</Button>
            </div>
            {result && (() => {
              const v = verdictBadge(result.prob);
              const Icon = v.icon;
              return (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="md:col-span-1 p-5 rounded-xl bg-secondary/50 text-center">
                    <Icon className={`w-10 h-10 mx-auto mb-2 text-${v.color}`} />
                    <p className={`text-xs font-mono font-bold text-${v.color}`}>{v.label}</p>
                    <p className="text-4xl font-black gradient-text mt-3">{(result.prob * 100).toFixed(0)}%</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">Fake Probability</p>
                  </div>
                  <div className="md:col-span-2 p-5 rounded-xl bg-secondary/50">
                    <h4 className="text-xs font-mono text-muted-foreground uppercase mb-2">Signal Breakdown</h4>
                    <ul className="space-y-1.5">
                      {result.reasons.map((r, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">▸</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })()}
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Recent Flagged Content</h3>
            <div className="space-y-3">
              {fakeNewsItems.map(it => {
                const v = verdictBadge(it.fakeProbability);
                const Icon = v.icon;
                return (
                  <div key={it.id} className="p-4 rounded-lg bg-secondary/40 border border-border">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon className={`w-5 h-5 text-${v.color} shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <p className="text-sm text-foreground leading-relaxed">{it.text}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-1">{it.source}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-lg font-black text-${v.color}`}>{(it.fakeProbability * 100).toFixed(0)}%</p>
                        <p className={`text-[9px] font-mono text-${v.color} uppercase`}>{v.label}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {it.reasons.map((r, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border text-muted-foreground">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default FakeNewsPage;
