import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentPieChartProps {
  positive: number;
  negative: number;
  neutral: number;
}

const SentimentPieChart = ({ positive, negative, neutral }: SentimentPieChartProps) => {
  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [positive, negative, neutral],
        backgroundColor: [
          'hsla(160, 84%, 39%, 0.8)',
          'hsla(0, 72%, 51%, 0.8)',
          'hsla(200, 80%, 55%, 0.8)',
        ],
        borderColor: [
          'hsl(160, 84%, 39%)',
          'hsl(0, 72%, 51%)',
          'hsl(200, 80%, 55%)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'hsl(210, 20%, 70%)',
          padding: 20,
          font: { family: 'Inter', size: 12 },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default SentimentPieChart;
