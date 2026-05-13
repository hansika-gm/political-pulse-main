import { motion } from 'framer-motion';
import { Database, Tag, Globe, Calendar, BarChart3, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { datasetStats } from '@/data/mockData';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  return <span className="text-3xl font-black gradient-text">{value.toLocaleString()}{suffix}</span>;
};

const DatasetPage = () => {
  const sentimentPie = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [38.2, 32.5, 29.3],
      backgroundColor: ['hsla(160,84%,39%,0.8)', 'hsla(0,72%,51%,0.8)', 'hsla(200,80%,55%,0.8)'],
      borderWidth: 0,
    }],
  };

  const langBar = {
    labels: datasetStats.languageDistribution.map(l => l.language),
    datasets: [{
      label: 'Tweets',
      data: datasetStats.languageDistribution.map(l => l.count),
      backgroundColor: ['hsla(160,84%,39%,0.8)', 'hsla(38,92%,50%,0.8)', 'hsla(280,60%,55%,0.8)', 'hsla(200,80%,55%,0.8)'],
      borderRadius: 6,
    }],
  };

  const timeline = {
    labels: datasetStats.collectionTimeline.map(t => t.month),
    datasets: [
      {
        label: 'Total Tweets',
        data: datasetStats.collectionTimeline.map(t => t.tweets),
        borderColor: 'hsl(160,84%,39%)',
        backgroundColor: 'hsla(160,84%,39%,0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Labeled',
        data: datasetStats.collectionTimeline.map(t => t.labeled),
        borderColor: 'hsl(200,80%,55%)',
        backgroundColor: 'hsla(200,80%,55%,0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const keywordBar = {
    labels: datasetStats.topKeywords.map(k => k.keyword),
    datasets: [{
      label: 'Frequency',
      data: datasetStats.topKeywords.map(k => k.count),
      backgroundColor: 'hsla(160,84%,39%,0.7)',
      borderRadius: 4,
    }],
  };

  const chartOpts = (title?: string) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'hsl(210,20%,70%)', font: { family: 'Inter', size: 11 } } },
      ...(title ? { title: { display: false } } : {}),
    },
    scales: {
      x: { ticks: { color: 'hsl(215,12%,50%)', font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { color: 'hsl(215,12%,50%)' }, grid: { color: 'hsla(220,14%,18%,0.5)' } },
    },
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Dataset Insights</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Comprehensive overview of the collected and labeled tweet dataset
          </p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Tweets', value: datasetStats.totalTweets, icon: FileText },
              { label: 'Labeled Data', value: datasetStats.labeledTweets, icon: Tag },
              { label: 'Unlabeled', value: datasetStats.unlabeledTweets, icon: Database },
              { label: 'Languages', value: datasetStats.languageDistribution.length, icon: Globe },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
                <s.icon className="w-4 h-4 text-primary mb-2" />
                <AnimatedCounter value={s.value} />
                <p className="text-xs text-muted-foreground font-mono mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Data Source', value: datasetStats.dataSource, icon: Globe },
              { label: 'Labeling Method', value: datasetStats.labelingMethod, icon: Tag },
              { label: 'Collection Period', value: datasetStats.collectionPeriod, icon: Calendar },
            ].map((info) => (
              <div key={info.label} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <info.icon className="w-4 h-4 text-accent" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{info.label}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Sentiment Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <Pie data={sentimentPie} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'hsl(210,20%,70%)' } } } }} />
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Language Distribution</h3>
              <div className="h-64">
                <Bar data={langBar} options={chartOpts()} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Collection Timeline</h3>
              <div className="h-64">
                <Line data={timeline} options={chartOpts()} />
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Top Keywords</h3>
              <div className="h-64">
                <Bar data={keywordBar} options={{
                  ...chartOpts(),
                  indexAxis: 'y' as const,
                }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DatasetPage;
