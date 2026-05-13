import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { modelMetrics } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ModelComparisonChart = () => {
  const data = {
    labels: modelMetrics.map((m) => m.name),
    datasets: [
      {
        label: 'Accuracy',
        data: modelMetrics.map((m) => m.accuracy * 100),
        backgroundColor: 'hsla(160, 84%, 39%, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Precision',
        data: modelMetrics.map((m) => m.precision * 100),
        backgroundColor: 'hsla(200, 80%, 55%, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Recall',
        data: modelMetrics.map((m) => m.recall * 100),
        backgroundColor: 'hsla(38, 92%, 50%, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'F1 Score',
        data: modelMetrics.map((m) => m.f1Score * 100),
        backgroundColor: 'hsla(280, 60%, 55%, 0.8)',
        borderRadius: 4,
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
        ticks: { color: 'hsl(215, 12%, 50%)', font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        min: 60,
        max: 100,
        ticks: { color: 'hsl(215, 12%, 50%)', callback: (v: any) => `${v}%` },
        grid: { color: 'hsla(220, 14%, 18%, 0.5)' },
      },
    },
  };

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ModelComparisonChart;
