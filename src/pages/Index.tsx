import { motion } from 'framer-motion';
import { Brain, Radio, BarChart3, Zap, Shield, Database, ArrowRight, Smartphone, Wifi, ShieldAlert, Server, GitBranch } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import HashtagTicker from '@/components/HashtagTicker';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { modelMetrics } from '@/data/mockData';

const features = [
  { icon: Radio, title: 'Real-Time Streaming', desc: 'Live tweet streaming via Twitter/X Filtered Stream API with Socket.IO' },
  { icon: Brain, title: 'Multi-Model AI', desc: 'VADER, Logistic Regression, Naive Bayes, SVM, and BERT — compare and toggle' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: '10+ chart types: confusion matrix, accuracy trends, confidence distributions, word clouds' },
  { icon: Shield, title: 'NLP Pipeline', desc: 'URL removal, stemming, tokenization, stopword filtering, TF-IDF vectorization' },
  { icon: ShieldAlert, title: 'Ethics & Bias', desc: 'Transparency reports on model bias, language accuracy gaps, and mitigation strategies' },
  { icon: Database, title: 'Dataset Insights', desc: '24K+ labeled tweets with language distribution, collection timeline, and keyword analysis' },
  { icon: Wifi, title: 'Socket.IO Real-Time', desc: 'WebSocket-powered live dashboard with instant tweet and sentiment updates' },
  { icon: Smartphone, title: 'PWA + Offline', desc: 'Installable on mobile/desktop with offline caching and auto-updates' },
  { icon: Server, title: 'System Monitor', desc: 'Backend health, API latency, model speed metrics, and architecture overview' },
];

const Index = () => {
  return (
    <DashboardLayout>
      <TopBar title="Home" />
      <HashtagTicker />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            Master-Level AI Project • 5 Models • PWA
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            <span className="gradient-text">Political Sentiment</span>
            <br />
            Analysis Engine
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Production-grade real-time political sentiment analysis using VADER + ML + BERT deep learning.
            Stream live tweets, detect trends, analyze bias, and visualize insights — all as an installable PWA.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/live">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2">
                <Radio className="w-4 h-4" />
                Start Live Stream
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" className="gap-2">
                View Analytics
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/ethics">
              <Button variant="outline" className="gap-2">
                <ShieldAlert className="w-4 h-4" />
                Ethics Report
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">System Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="stat-card"
              >
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">Model Performance (5 Models)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {modelMetrics.map((m) => (
              <div key={m.name} className="stat-card text-center">
                <p className="text-2xl font-black gradient-text">{(m.accuracy * 100).toFixed(1)}%</p>
                <p className="text-xs text-foreground mt-1 font-semibold">{m.name}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">F1: {(m.f1Score * 100).toFixed(1)}% • {m.speed}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-mono rounded bg-secondary text-muted-foreground">{m.type}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 glass-card rounded-xl p-6">
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Python 3.11', 'Flask', 'Socket.IO', 'VADER', 'BERT (Multilingual)', 'PyTorch', 'scikit-learn', 'TF-IDF', 'Tweepy', 'React 18', 'TypeScript', 'TailwindCSS', 'Chart.js', 'Framer Motion', 'React Query', 'PWA', 'SQLite', 'Vite'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-secondary rounded-md text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dataset" className="stat-card group cursor-pointer">
            <Database className="w-5 h-5 text-accent mb-2" />
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Dataset Insights</h3>
            <p className="text-xs text-muted-foreground">24K+ tweets, 4 languages</p>
          </Link>
          <Link to="/ethics" className="stat-card group cursor-pointer">
            <ShieldAlert className="w-5 h-5 text-warning mb-2" />
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Ethics & Bias</h3>
            <p className="text-xs text-muted-foreground">Transparency & mitigation</p>
          </Link>
          <Link to="/system" className="stat-card group cursor-pointer">
            <Server className="w-5 h-5 text-primary mb-2" />
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">System Status</h3>
            <p className="text-xs text-muted-foreground">Health & architecture</p>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
