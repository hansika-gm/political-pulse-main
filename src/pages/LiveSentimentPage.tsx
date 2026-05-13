import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Radio, Search, Loader2, Square, Wifi, WifiOff } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SentimentPieChart from '@/components/charts/SentimentPieChart';
import LiveTweetFeed from '@/components/LiveTweetFeed';
import { useLiveStream } from '@/hooks/useStreamingData';
import { api } from '@/services/api';
import { mockTweets } from '@/data/mockData';
import type { TweetData } from '@/services/api';

const keywords = ['Narendra Modi', 'BJP', 'Congress', 'Trump', 'elections', 'government'];

const LiveSentimentPage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const { liveTweets, stats, streaming, startStream, stopStream, connected } = useLiveStream();

  // Fallback demo data when backend is not available
  const [demoTweets, setDemoTweets] = useState<TweetData[]>([]);
  const [demoStats, setDemoStats] = useState({ positive: 0, negative: 0, neutral: 0, total: 0 });

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Try real backend first
      await startStream(query);
      setBackendAvailable(true);
    } catch {
      // Fallback to demo mode
      setBackendAvailable(false);
      const filtered = mockTweets
        .filter((t) => t.keyword.toLowerCase().includes(query.toLowerCase()) || t.text.toLowerCase().includes(query.toLowerCase()))
        .map((t) => ({
          ...t,
          user_name: t.user,
          clean_text: t.text,
        })) as TweetData[];
      setDemoTweets(filtered);
      setDemoStats({
        positive: filtered.filter((t) => t.sentiment === 'positive').length,
        negative: filtered.filter((t) => t.sentiment === 'negative').length,
        neutral: filtered.filter((t) => t.sentiment === 'neutral').length,
        total: filtered.length,
      });
    }
    setLoading(false);
  }, [query, startStream]);

  const handleStop = useCallback(async () => {
    try {
      await stopStream();
    } catch {
      // ignore
    }
  }, [stopStream]);

  const displayTweets = backendAvailable ? liveTweets : demoTweets;
  const displayStats = backendAvailable ? stats : demoStats;
  const hasResults = displayTweets.length > 0;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-5 h-5 text-primary animate-pulse-glow" />
            <h1 className="text-2xl font-bold">Live Sentiment Analysis</h1>
            {streaming && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                STREAMING
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Enter a political keyword to stream and analyze tweets in real-time
          </p>
          <div className="flex items-center gap-2 mb-8">
            {connected ? (
              <span className="flex items-center gap-1 text-xs text-primary font-mono"><Wifi className="w-3 h-3" /> Real-time connected</span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono"><WifiOff className="w-3 h-3" /> Demo mode (start backend for live data)</span>
            )}
          </div>

          {/* Search */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Enter keyword (e.g., Narendra Modi, elections...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-secondary border-border"
              />
              {streaming ? (
                <Button onClick={handleStop} variant="destructive" className="gap-2 shrink-0">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
              ) : (
                <Button onClick={handleSearch} disabled={loading || !query.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shrink-0">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Analyze
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1.5 text-xs font-mono bg-secondary hover:bg-secondary/80 rounded-md text-secondary-foreground transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {hasResults && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card text-center">
                  <p className="text-2xl font-black text-foreground">{displayStats.total || displayTweets.length}</p>
                  <p className="text-xs text-muted-foreground font-mono">Total Tweets</p>
                </div>
                <div className="stat-card text-center">
                  <p className="text-2xl font-black text-primary">{displayStats.positive}</p>
                  <p className="text-xs text-muted-foreground font-mono">Positive</p>
                </div>
                <div className="stat-card text-center">
                  <p className="text-2xl font-black text-destructive">{displayStats.negative}</p>
                  <p className="text-xs text-muted-foreground font-mono">Negative</p>
                </div>
                <div className="stat-card text-center">
                  <p className="text-2xl font-black text-accent">{displayStats.neutral}</p>
                  <p className="text-xs text-muted-foreground font-mono">Neutral</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Distribution</h3>
                  <SentimentPieChart positive={displayStats.positive} negative={displayStats.negative} neutral={displayStats.neutral} />
                </div>
                <div className="lg:col-span-2 glass-card rounded-xl p-6">
                  <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">
                    {streaming ? 'Live Tweet Feed' : 'Analyzed Tweets'}
                  </h3>
                  <LiveTweetFeed tweets={displayTweets} />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default LiveSentimentPage;
