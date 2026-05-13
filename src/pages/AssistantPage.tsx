import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User as UserIcon, Sparkles } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { Input } from '@/components/ui/input';

interface Msg { id: string; role: 'user' | 'bot'; text: string; }

const seed: Msg[] = [
  { id: '1', role: 'bot', text: "Hi! I'm PolitiBot — your AI political analyst. Ask me about sentiment trends, model performance, election forecasts, or any keyword analysis." },
];

const replies = (q: string): string => {
  const l = q.toLowerCase();
  if (l.includes('modi') || l.includes('bjp')) return "Latest analysis on Modi/BJP: 58% positive, 22% negative sentiment across 4,200 tweets in the last 24h. Top hashtags: #DigitalIndia, #Budget2026. Geographic strength concentrated in Gujarat, UP and Maharashtra.";
  if (l.includes('accuracy') || l.includes('model')) return "Our 5-model ensemble: BERT leads at 92.1% accuracy, followed by SVM (86.3%), LogReg (84.7%), Naive Bayes (81.2%), VADER (78.2%). For real-time use we route via VADER (<1ms) and verify high-impact tweets with BERT (~120ms).";
  if (l.includes('fake') || l.includes('misinformation')) return "Fake news detector flags content using sensational language scoring, source verification, and BERT-based credibility. Last 24h: 47 likely-fake, 12 suspicious, 891 verified-real items processed.";
  if (l.includes('forecast') || l.includes('predict')) return "The 7-day forecast (LSTM + ARIMA hybrid) projects positive sentiment to rise +4.2% next week, with widening uncertainty bands around Day 5 due to upcoming budget announcement.";
  if (l.includes('trend') || l.includes('hashtag')) return "Top trending right now: #Budget2026 (+340%), #FarmersProtest (+180%), #ElectionResults (+95%). Combined volume crossed 47K mentions in the last hour.";
  if (l.includes('bias') || l.includes('ethics')) return "Bias audit: training set is slightly positive-skewed (38.2% vs ideal 33.3%). Hinglish accuracy lags English by 14%. We mitigate via re-weighted loss and multilingual BERT.";
  return "I analyzed your query against the live tweet database. Based on recent patterns, I'd recommend checking the Analytics dashboard for the most recent breakdown. Want me to drill into a specific keyword or model?";
};

const AssistantPage = () => {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Math.random().toString(36).slice(2), role: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Math.random().toString(36).slice(2), role: 'bot', text: replies(userMsg.text) }]);
      setTyping(false);
    }, 700 + Math.random() * 600);
  };

  const suggestions = ['Top trending hashtags?', 'How accurate is BERT?', 'Forecast Modi sentiment', 'Detect fake news signals'];

  return (
    <DashboardLayout>
      <TopBar title="AI Assistant" />
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">AI Assistant — PolitiBot</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <Sparkles className="w-3 h-3" /> ONLINE
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Ask anything about political sentiment, models, forecasts, or trends</p>

          <div className="glass-card rounded-xl flex flex-col h-[calc(100vh-280px)] min-h-[480px]">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'bot' && (
                    <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                  }`}>
                    {m.text}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-xl px-4 py-3 flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map(s => (
                  <button key={s} onClick={() => setInput(s)} className="text-[10px] font-mono px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors">
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask PolitiBot anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  className="bg-secondary border-border"
                />
                <button onClick={send} disabled={!input.trim()} className="px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default AssistantPage;
