import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { ComposedChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { forecastData, leaderPopularity } from '@/data/extendedMockData';

const ForecastPage = () => {
  const radarData = leaderPopularity.map(l => ({ leader: l.leader.split(' ')[0], score: l.score }));
  return (
    <DashboardLayout>
      <TopBar title="Prediction Forecast" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Prediction Forecast</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Public opinion forecast and leader popularity projections (LSTM + ARIMA hybrid)</p>

          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">14-Day Positive Sentiment Forecast</h3>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="hsl(var(--primary) / 0.1)" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(var(--background))" />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="forecast" stroke="hsl(var(--accent))" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Leader Popularity Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="leader" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <PolarRadiusAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Popularity Scores</h3>
              <div className="space-y-3">
                {leaderPopularity.map(l => (
                  <div key={l.leader}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {l.score >= 70 && <Award className="w-3.5 h-3.5 text-warning" />}
                        {l.leader}
                      </span>
                      <span className="text-sm font-mono text-primary font-bold">{l.score}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${l.score}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                    <div className="flex gap-3 text-[10px] font-mono text-muted-foreground mt-1">
                      <span className="text-primary">+{l.positive}%</span>
                      <span className="text-destructive">-{l.negative}%</span>
                      <span className="text-accent">·{l.neutral}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default ForecastPage;
