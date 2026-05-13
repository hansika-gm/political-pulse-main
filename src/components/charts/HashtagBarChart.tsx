import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { topHashtags } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HashtagBarChartProps {
  data?: { tag: string; count: number }[];
}

const HashtagBarChart = ({ data }: HashtagBarChartProps) => {
  const hashtagData = data || topHashtags;

  const chartData = {
    labels: hashtagData.map((h) => h.tag),
    datasets: [
      {
        label: 'Mentions',
        data: hashtagData.map((h) => h.count),
        backgroundColor: 'hsla(160, 84%, 39%, 0.6)',
        borderColor: 'hsl(160, 84%, 39%)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: 'hsl(215, 12%, 50%)' },
        grid: { color: 'hsla(220, 14%, 18%, 0.5)' },
      },
      y: {
        ticks: { color: 'hsl(210, 20%, 70%)', font: { family: 'JetBrains Mono', size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="h-72">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HashtagBarChart;
