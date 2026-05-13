import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { accuracyTrend } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AccuracyTrendChart = () => {
  const data = {
    labels: accuracyTrend.map(d => `Epoch ${d.epoch}`),
    datasets: [
      {
        label: 'Training Accuracy',
        data: accuracyTrend.map(d => d.train * 100),
        borderColor: 'hsl(160,84%,39%)',
        backgroundColor: 'hsla(160,84%,39%,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'Validation Accuracy',
        data: accuracyTrend.map(d => d.val * 100),
        borderColor: 'hsl(200,80%,55%)',
        backgroundColor: 'hsla(200,80%,55%,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'hsl(210,20%,70%)', font: { family: 'Inter', size: 11 } } },
    },
    scales: {
      x: { ticks: { color: 'hsl(215,12%,50%)', font: { size: 10 } }, grid: { display: false } },
      y: {
        min: 50, max: 100,
        ticks: { color: 'hsl(215,12%,50%)', callback: (v: any) => `${v}%` },
        grid: { color: 'hsla(220,14%,18%,0.5)' },
      },
    },
  };

  return (
    <div className="h-72">
      <Line data={data} options={options} />
    </div>
  );
};

export default AccuracyTrendChart;
