import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Download, ThumbsUp, ThumbsDown, Minus, Loader2, Search, Filter, ArrowUpDown, FileJson, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTweets } from '@/hooks/useStreamingData';
import { mockTweets, type Tweet } from '@/data/mockData';
import type { TweetData } from '@/services/api';

const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const config: Record<string, { icon: typeof ThumbsUp; class: string }> = {
    positive: { icon: ThumbsUp, class: 'bg-primary/10 text-primary border-primary/20' },
    negative: { icon: ThumbsDown, class: 'bg-destructive/10 text-destructive border-destructive/20' },
    neutral: { icon: Minus, class: 'bg-accent/10 text-accent border-accent/20' },
  };
  const c = config[sentiment] || config.neutral;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.class}`}>
      <Icon className="w-3 h-3" />
      {sentiment}
    </span>
  );
};

const TweetsPage = () => {
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [keywordFilter, setKeywordFilter] = useState('all');
  const [minConfidence, setMinConfidence] = useState(0);
  const [sortBy, setSortBy] = useState<'date' | 'confidence' | 'likes' | 'retweets'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const { data: apiTweets, isLoading } = useTweets();

  const allTweets: TweetData[] = apiTweets && apiTweets.length > 0
    ? apiTweets
    : mockTweets.map((t) => ({ ...t, user_name: t.user, clean_text: t.text })) as TweetData[];

  const keywords = useMemo(() => {
    const kws = new Set(allTweets.map(t => t.keyword));
    return ['all', ...Array.from(kws)];
  }, [allTweets]);

  const filtered = useMemo(() => {
    let result = [...allTweets];

    if (filter !== 'all') result = result.filter(t => t.sentiment === filter);
    if (keywordFilter !== 'all') result = result.filter(t => t.keyword === keywordFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.text.toLowerCase().includes(q) || t.user_name.toLowerCase().includes(q) || t.handle.toLowerCase().includes(q));
    }
    if (minConfidence > 0) result = result.filter(t => t.confidence >= minConfidence / 100);

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortBy === 'confidence') cmp = a.confidence - b.confidence;
      else if (sortBy === 'likes') cmp = a.likes - b.likes;
      else if (sortBy === 'retweets') cmp = a.retweets - b.retweets;
      return sortOrder === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [allTweets, filter, keywordFilter, searchQuery, minConfidence, sortBy, sortOrder]);

  const exportCSV = () => {
    const headers = 'ID,User,Handle,Text,Date,Sentiment,Confidence,Keyword,Retweets,Likes\n';
    const rows = filtered
      .map((t) => `"${t.id}","${t.user_name}","${t.handle}","${t.text.replace(/"/g, '""')}","${t.date}","${t.sentiment}",${t.confidence},"${t.keyword}",${t.retweets},${t.likes}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'politisense_tweets.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'politisense_tweets.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    const pos = filtered.filter(t => t.sentiment === 'positive').length;
    const neg = filtered.filter(t => t.sentiment === 'negative').length;
    const neu = filtered.filter(t => t.sentiment === 'neutral').length;
    const avgConf = (filtered.reduce((a, t) => a + t.confidence, 0) / filtered.length * 100).toFixed(1);

    const report = `
POLITISENSE — SENTIMENT ANALYSIS REPORT
========================================
Generated: ${new Date().toLocaleString()}
Total Tweets: ${filtered.length}

SENTIMENT BREAKDOWN
  Positive: ${pos} (${(pos / filtered.length * 100).toFixed(1)}%)
  Negative: ${neg} (${(neg / filtered.length * 100).toFixed(1)}%)
  Neutral:  ${neu} (${(neu / filtered.length * 100).toFixed(1)}%)

Average Confidence: ${avgConf}%

FILTERS APPLIED
  Sentiment: ${filter}
  Keyword: ${keywordFilter}
  Min Confidence: ${minConfidence}%
  Search: ${searchQuery || 'none'}
  Sort: ${sortBy} (${sortOrder})
========================================
`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'politisense_report.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h1 className="text-2xl font-bold">Tweet Database</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {filtered.length} of {allTweets.length} tweets
                {isLoading && <Loader2 className="w-3 h-3 inline ml-2 animate-spin" />}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportCSV} variant="outline" size="sm" className="gap-1.5">
                <Download className="w-3.5 h-3.5" /> CSV
              </Button>
              <Button onClick={exportJSON} variant="outline" size="sm" className="gap-1.5">
                <FileJson className="w-3.5 h-3.5" /> JSON
              </Button>
              <Button onClick={generateReport} variant="outline" size="sm" className="gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Report
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="glass-card rounded-xl p-4 mb-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tweets, users, handles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-1.5">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Keyword</label>
                    <select
                      value={keywordFilter}
                      onChange={(e) => setKeywordFilter(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-secondary px-3 text-sm text-foreground"
                    >
                      {keywords.map(k => <option key={k} value={k}>{k === 'all' ? 'All Keywords' : k}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Min Confidence: {minConfidence}%</label>
                    <input
                      type="range" min="0" max="95" step="5"
                      value={minConfidence}
                      onChange={(e) => setMinConfidence(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block">Sort By</label>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="flex-1 h-10 rounded-md border border-input bg-secondary px-3 text-sm text-foreground"
                      >
                        <option value="date">Date</option>
                        <option value="confidence">Confidence</option>
                        <option value="likes">Likes</option>
                        <option value="retweets">Retweets</option>
                      </select>
                      <Button variant="outline" size="icon" onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}>
                        <ArrowUpDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sentiment Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['all', 'positive', 'negative', 'neutral'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-mono rounded-lg border transition-colors ${
                  filter === f
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== 'all' && (
                  <span className="ml-1.5 text-muted-foreground">
                    ({allTweets.filter((t) => t.sentiment === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">User</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Tweet</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Sentiment</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Confidence</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Keyword</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Engagement</th>
                    <th className="text-left text-xs font-mono text-muted-foreground uppercase tracking-widest px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tweet) => (
                    <tr key={tweet.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{tweet.user_name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{tweet.handle}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-foreground/80 truncate">{tweet.text}</p>
                      </td>
                      <td className="px-6 py-4">
                        <SentimentBadge sentiment={tweet.sentiment} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${tweet.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground">{(tweet.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground">{tweet.keyword}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-muted-foreground font-mono">
                          <span>♻ {tweet.retweets}</span>
                          <span className="ml-2">♥ {tweet.likes}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-muted-foreground font-mono">
                          {new Date(tweet.date).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No tweets match your filters</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TweetsPage;
