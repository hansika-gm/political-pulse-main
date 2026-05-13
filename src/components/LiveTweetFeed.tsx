import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Minus, Heart, Repeat2 } from 'lucide-react';
import type { TweetData } from '@/services/api';

const sentimentConfig = {
  positive: { icon: ThumbsUp, class: 'bg-primary/10 text-primary border-primary/20' },
  negative: { icon: ThumbsDown, class: 'bg-destructive/10 text-destructive border-destructive/20' },
  neutral: { icon: Minus, class: 'bg-accent/10 text-accent border-accent/20' },
};

const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
  const key = sentiment as keyof typeof sentimentConfig;
  const config = sentimentConfig[key] || sentimentConfig.neutral;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.class}`}>
      <Icon className="w-3 h-3" />
      {sentiment}
    </span>
  );
};

interface LiveTweetFeedProps {
  tweets: TweetData[];
  maxHeight?: string;
}

const LiveTweetFeed = ({ tweets, maxHeight = '500px' }: LiveTweetFeedProps) => {
  return (
    <div className="space-y-3 overflow-y-auto pr-1" style={{ maxHeight }}>
      <AnimatePresence initial={false}>
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-secondary/50 rounded-lg border border-border/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">{tweet.user_name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{tweet.handle}</span>
                </div>
                <p className="text-sm text-foreground/80 mb-2">{tweet.text}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {tweet.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat2 className="w-3 h-3" /> {tweet.retweets}
                  </span>
                  <span>Conf: {(tweet.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
              <SentimentBadge sentiment={tweet.sentiment} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {tweets.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm font-mono">
          No tweets yet. Start a stream to see live results.
        </div>
      )}
    </div>
  );
};

export default LiveTweetFeed;
