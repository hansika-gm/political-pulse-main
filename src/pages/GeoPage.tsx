import { motion } from 'framer-motion';
import { Map as MapIcon } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/TopBar';
import { geoData } from '@/data/extendedMockData';

// Simple choropleth-style bubble map on a normalized SVG (India bounding box)
const GeoPage = () => {
  const minLng = 68, maxLng = 97, minLat = 8, maxLat = 37;
  const W = 600, H = 600;
  const project = (lng: number, lat: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * W,
    y: H - ((lat - minLat) / (maxLat - minLat)) * H,
  });
  const colorFor = (s: number) => {
    if (s >= 0.6) return 'hsl(var(--primary))';
    if (s >= 0.5) return 'hsl(var(--accent))';
    return 'hsl(var(--destructive))';
  };

  return (
    <DashboardLayout>
      <TopBar title="Geo Heatmap" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <MapIcon className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Geo-Political Sentiment Heatmap</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Regional sentiment intensity across Indian states</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-xl p-6">
              <div className="aspect-square w-full max-w-2xl mx-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width={W} height={H} fill="hsl(var(--card))" />
                  <rect width={W} height={H} fill="url(#grid)" />
                  {geoData.map((d) => {
                    const { x, y } = project(d.lng, d.lat);
                    const r = 10 + (d.volume / 6100) * 25;
                    return (
                      <g key={d.state}>
                        <motion.circle
                          cx={x} cy={y} r={r}
                          fill={colorFor(d.sentiment)}
                          fillOpacity={0.25}
                          stroke={colorFor(d.sentiment)}
                          strokeWidth={1.5}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: Math.random() * 0.5 }}
                        />
                        <circle cx={x} cy={y} r={3} fill={colorFor(d.sentiment)} />
                        <text x={x} y={y - r - 4} textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontFamily="monospace">
                          {d.state}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-[10px] font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Positive (≥60%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Mixed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Negative</span>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">State Breakdown</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {[...geoData].sort((a, b) => b.sentiment - a.sentiment).map(d => (
                  <div key={d.state} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40">
                    <div>
                      <p className="text-xs font-semibold">{d.state}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{d.volume.toLocaleString()} tweets</p>
                    </div>
                    <span className="text-sm font-bold font-mono" style={{ color: colorFor(d.sentiment) }}>
                      {(d.sentiment * 100).toFixed(0)}%
                    </span>
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
export default GeoPage;
