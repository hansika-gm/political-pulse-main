import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Loader2, Zap, Brain } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SentimentPieChart from '@/components/charts/SentimentPieChart';
import SentimentLineChart from '@/components/charts/SentimentLineChart';
import HashtagBarChart from '@/components/charts/HashtagBarChart';
import ConfusionMatrixChart from '@/components/charts/ConfusionMatrixChart';
import ModelComparisonChart from '@/components/charts/ModelComparisonChart';
import WordCloud from '@/components/charts/WordCloud';
import AccuracyTrendChart from '@/components/charts/AccuracyTrendChart';
import ConfidenceDistChart from '@/components/charts/ConfidenceDistChart';
import { useAnalytics } from '@/hooks/useStreamingData';
import { mockTweets, sentimentTrend, topHashtags, wordCloudData, modelMetrics } from '@/data/mockData';

const AnalyticsPage = () => {
  const { data: analytics, isLoading } = useAnalytics();
  const [modelMode, setModelMode] = useState<'realtime' | 'accurate'>('accurate');

  const stats = analytics
    ? { positive: analytics.positive, negative: analytics.negative, neutral: analytics.neutral }
    : {
        positive: mockTweets.filter((t) => t.sentiment === 'positive').length,
        negative: mockTweets.filter((t) => t.sentiment === 'negative').length,
        neutral: mockTweets.filter((t) => t.sentiment === 'neutral').length,
      };

  const trendData = analytics?.trend || sentimentTrend;
  const hashtagData = analytics?.top_hashtags || topHashtags;
  const wordData = analytics?.word_freq || wordCloudData;

  const activeModel = modelMode === 'realtime'
    ? modelMetrics.find(m => m.name === 'VADER')!
    : modelMetrics.find(m => m.name === 'BERT')!;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {analytics ? 'Live analytics from backend' : 'Showing demo data — start backend for live analytics'}
          </p>

          {/* Model Mode Toggle */}
          <div className="glass-card rounded-xl p-5 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">Inference Mode</h3>
                <p className="text-xs text-muted-foreground">
                  Active: <span className="text-foreground font-semibold">{activeModel.name}</span> — {activeModel.type} — {activeModel.speed} per tweet
                </p>
              </div>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setModelMode('realtime')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono transition-colors ${
                    modelMode === 'realtime' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" /> Real-Time (VADER)
                </button>
                <button
                  onClick={() => setModelMode('accurate')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono transition-colors ${
                    modelMode === 'accurate' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" /> High Accuracy (BERT)
                </button>
              </div>
            </div>
            {/* Active model metrics */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { label: 'Accuracy', value: activeModel.accuracy },
                { label: 'Precision', value: activeModel.precision },
                { label: 'Recall', value: activeModel.recall },
                { label: 'F1 Score', value: activeModel.f1Score },
              ].map(m => (
                <div key={m.label} className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-lg font-black gradient-text">{(m.value * 100).toFixed(1)}%</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Sentiment Distribution</h3>
                <SentimentPieChart {...stats} />
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Sentiment Trend</h3>
                <SentimentLineChart data={trendData} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Top Hashtags</h3>
                <HashtagBarChart data={hashtagData} />
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Confusion Matrix (BERT)</h3>
                <ConfusionMatrixChart />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Model Comparison</h3>
                <ModelComparisonChart />
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Political Word Cloud</h3>
                <WordCloud data={wordData} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Training Accuracy (BERT)</h3>
                <AccuracyTrendChart />
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Confidence Distribution</h3>
                <ConfidenceDistChart />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
