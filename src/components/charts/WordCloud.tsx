import { wordCloudData } from '@/data/mockData';

interface WordCloudProps {
  data?: { text: string; value: number }[];
}

const WordCloud = ({ data }: WordCloudProps) => {
  const words = data || wordCloudData;
  const maxValue = Math.max(...words.map((w) => w.value));

  const getSize = (value: number) => {
    const ratio = value / maxValue;
    if (ratio > 0.8) return 'text-3xl font-bold';
    if (ratio > 0.6) return 'text-2xl font-semibold';
    if (ratio > 0.4) return 'text-xl font-medium';
    if (ratio > 0.25) return 'text-base';
    return 'text-sm';
  };

  const getColor = (index: number) => {
    const colors = [
      'text-primary',
      'text-accent',
      'text-foreground',
      'text-muted-foreground',
      'text-primary/70',
      'text-accent/70',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4">
      {words.map((word, i) => (
        <span
          key={word.text}
          className={`${getSize(word.value)} ${getColor(i)} transition-all hover:scale-110 cursor-default font-display`}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
};

export default WordCloud;
