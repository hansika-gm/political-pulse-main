import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { sentimentTrend } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SentimentLineChartProps {
  data?: { time: string; positive: number; negative: number; neutral: number }[];
}

const SentimentLineChart = ({ data }: SentimentLineChartProps) => {
  const trendData = data || sentimentTrend;

  const chartData = {
    labels: trendData.map((d) => d.time),
    datasets: [
      {
        label: 'Positive',
        data: trendData.map((d) => d.positive),
        borderColor: 'hsl(160, 84%, 39%)',
        backgroundColor: 'hsla(160, 84%, 39%, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'Negative',
        data: trendData.map((d) => d.negative),
        borderColor: 'hsl(0, 72%, 51%)',
        backgroundColor: 'hsla(0, 72%, 51%, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'Neutral',
        data: trendData.map((d) => d.neutral),
        borderColor: 'hsl(200, 80%, 55%)',
        backgroundColor: 'hsla(200, 80%, 55%, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'hsl(210, 20%, 70%)', font: { family: 'Inter', size: 12 } },
      },
    },
    scales: {
      x: {
        ticks: { color: 'hsl(215, 12%, 50%)' },
        grid: { color: 'hsla(220, 14%, 18%, 0.5)' },
      },
      y: {
        ticks: { color: 'hsl(215, 12%, 50%)' },
        grid: { color: 'hsla(220, 14%, 18%, 0.5)' },
      },
    },
  };

  return (
    <div className="h-72">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SentimentLineChart;
