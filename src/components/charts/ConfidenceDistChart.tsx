import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { confidenceDistribution } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ConfidenceDistChart = () => {
  const data = {
    labels: confidenceDistribution.map(d => d.range),
    datasets: [{
      label: 'Tweets',
      data: confidenceDistribution.map(d => d.count),
      backgroundColor: [
        'hsla(0,72%,51%,0.7)',
        'hsla(38,92%,50%,0.7)',
        'hsla(200,80%,55%,0.7)',
        'hsla(160,84%,39%,0.7)',
        'hsla(160,84%,39%,0.9)',
      ],
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { ticks: { color: 'hsl(215,12%,50%)', font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { color: 'hsl(215,12%,50%)' }, grid: { color: 'hsla(220,14%,18%,0.5)' } },
    },
  };

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ConfidenceDistChart;
