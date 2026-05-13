import { confusionMatrix } from '@/data/mockData';

const ConfusionMatrixChart = () => {
  const { labels, data } = confusionMatrix;
  const maxVal = Math.max(...data.flat());

  const getColor = (value: number) => {
    const intensity = value / maxVal;
    if (intensity > 0.8) return 'bg-primary/80 text-primary-foreground';
    if (intensity > 0.3) return 'bg-primary/30 text-foreground';
    return 'bg-destructive/20 text-foreground';
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-1">
        <div />
        {labels.map((label) => (
          <div key={label} className="text-center text-xs font-mono text-muted-foreground py-2">
            {label}
          </div>
        ))}
        {data.map((row, i) => (
          <>
            <div key={`label-${i}`} className="text-xs font-mono text-muted-foreground flex items-center justify-end pr-2">
              {labels[i]}
            </div>
            {row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                className={`text-center py-3 rounded-md text-sm font-mono font-semibold ${getColor(val)}`}
              >
                {val}
              </div>
            ))}
          </>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center font-mono mt-2">
        Predicted →  |  Actual ↓
      </p>
    </div>
  );
};

export default ConfusionMatrixChart;
