import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Globe, BarChart3, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { biasMetrics } from '@/data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EthicsPage = () => {
  const regionData = {
    labels: biasMetrics.regionBias.map(r => r.region),
    datasets: [
      { label: 'Positive', data: biasMetrics.regionBias.map(r => r.positive), backgroundColor: 'hsla(160,84%,39%,0.8)', borderRadius: 4 },
      { label: 'Negative', data: biasMetrics.regionBias.map(r => r.negative), backgroundColor: 'hsla(0,72%,51%,0.8)', borderRadius: 4 },
      { label: 'Neutral', data: biasMetrics.regionBias.map(r => r.neutral), backgroundColor: 'hsla(200,80%,55%,0.8)', borderRadius: 4 },
    ],
  };

  const langAccuracy = {
    labels: biasMetrics.languageBias.map(l => l.language),
    datasets: [{
      label: 'Model Accuracy',
      data: biasMetrics.languageBias.map(l => l.accuracy * 100),
      backgroundColor: ['hsla(160,84%,39%,0.8)', 'hsla(38,92%,50%,0.8)', 'hsla(280,60%,55%,0.8)'],
      borderRadius: 6,
    }],
  };

  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: 'hsl(210,20%,70%)', font: { family: 'Inter', size: 11 } } } },
    scales: {
      x: { ticks: { color: 'hsl(215,12%,50%)', font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { color: 'hsl(215,12%,50%)' }, grid: { color: 'hsla(220,14%,18%,0.5)' } },
    },
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-5 h-5 text-warning" />
            <h1 className="text-2xl font-bold">AI Ethics & Bias Awareness</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Transparency report on model biases, data limitations, and ethical considerations
          </p>

          {/* Warning Banner */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6 mb-8 border-warning/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Political Neutrality Disclaimer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This system performs automated sentiment analysis for research and educational purposes only.
                  The AI models may exhibit biases inherent in the training data. Results should not be interpreted
                  as objective truth or used to influence political decisions. All sentiment labels are probabilistic
                  predictions, not factual assessments of political stance or quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sentiment Skew */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Positive Skew', value: biasMetrics.sentimentSkew.positive, color: 'text-primary', expected: 33.3 },
              { label: 'Negative Skew', value: biasMetrics.sentimentSkew.negative, color: 'text-destructive', expected: 33.3 },
              { label: 'Neutral Skew', value: biasMetrics.sentimentSkew.neutral, color: 'text-accent', expected: 33.3 },
            ].map((s) => (
              <div key={s.label} className="stat-card text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}%</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{s.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">Expected: {s.expected}%</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-warning/60 rounded-full" style={{ width: `${Math.abs(s.value - s.expected) / s.expected * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bias Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Regional Sentiment Bias</h3>
              </div>
              <div className="h-72">
                <Bar data={regionData} options={chartOpts} />
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Language Accuracy Gap</h3>
              </div>
              <div className="h-72">
                <Bar data={langAccuracy} options={{
                  ...chartOpts,
                  scales: {
                    ...chartOpts.scales,
                    y: { ...chartOpts.scales.y, min: 70, max: 100, ticks: { ...chartOpts.scales.y.ticks, callback: (v: any) => `${v}%` } },
                  },
                }} />
              </div>
            </div>
          </div>

          {/* Known Bias Warnings */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Known Bias & Limitations</h3>
            </div>
            <div className="space-y-3">
              {biasMetrics.modelBiasWarnings.map((warning, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">{warning}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mitigation Strategies */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Mitigation Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Multi-Model Ensemble', desc: 'Using VADER + BERT + ML models to reduce individual model bias through consensus' },
                { title: 'Multilingual Training', desc: 'BERT multilingual model trained on 104 languages for cross-lingual sentiment detection' },
                { title: 'Confidence Thresholding', desc: 'Tweets with confidence < 60% are flagged for manual review to reduce false positives' },
                { title: 'Regular Retraining', desc: 'Models are retrained monthly on new data to adapt to evolving political language' },
                { title: 'Data Augmentation', desc: 'Synthetic samples generated for underrepresented languages and sentiment classes' },
                { title: 'Human-in-the-Loop', desc: 'Expert reviewers validate a random 5% sample weekly for quality assurance' },
              ].map((s) => (
                <div key={s.title} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default EthicsPage;
