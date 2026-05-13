import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { trendingTopics } from '@/data/extendedMockData';

const HashtagTicker = () => {
  const items = [...trendingTopics, ...trendingTopics];
  return (
    <div className="glass-card rounded-xl overflow-hidden mb-6">
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-r border-border shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Trending</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            className="flex gap-6 py-3 whitespace-nowrap"
          >
            {items.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-foreground font-semibold">{t.topic}</span>
                <span className="text-primary">{t.change}</span>
                <span className="text-muted-foreground">· {t.volume.toLocaleString()}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HashtagTicker;
