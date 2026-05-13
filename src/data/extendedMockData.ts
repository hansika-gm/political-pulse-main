// Extended mock data for new master-level pages

export const trainingRuns = [
  { id: 'run-21', model: 'BERT-multi', epoch: 10, loss: 0.187, accuracy: 0.921, status: 'completed', duration: '42m' },
  { id: 'run-20', model: 'SVM', epoch: 1, loss: 0.241, accuracy: 0.863, status: 'completed', duration: '8m' },
  { id: 'run-19', model: 'LogReg', epoch: 1, loss: 0.298, accuracy: 0.847, status: 'completed', duration: '3m' },
  { id: 'run-18', model: 'BERT-multi', epoch: 8, loss: 0.213, accuracy: 0.908, status: 'completed', duration: '38m' },
];

export const liveTrainingLoss = Array.from({ length: 30 }, (_, i) => ({
  step: i + 1,
  loss: +(0.9 * Math.exp(-i / 8) + 0.15 + Math.random() * 0.04).toFixed(3),
  accuracy: +(0.55 + (1 - Math.exp(-i / 7)) * 0.4 + Math.random() * 0.02).toFixed(3),
}));

export const forecastData = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1;
  const isFuture = day > 7;
  const base = 50 + Math.sin(day / 2) * 8;
  return {
    day: `D${day}`,
    actual: isFuture ? null : Math.round(base + Math.random() * 6),
    forecast: Math.round(base + (isFuture ? Math.random() * 4 - 2 : 0)),
    upper: Math.round(base + 12),
    lower: Math.round(base - 12),
    future: isFuture,
  };
});

export const leaderPopularity = [
  { leader: 'Narendra Modi', positive: 58, negative: 22, neutral: 20, score: 72 },
  { leader: 'Rahul Gandhi', positive: 41, negative: 35, neutral: 24, score: 53 },
  { leader: 'Donald Trump', positive: 46, negative: 39, neutral: 15, score: 54 },
  { leader: 'Mamata Banerjee', positive: 49, negative: 28, neutral: 23, score: 62 },
  { leader: 'Arvind Kejriwal', positive: 44, negative: 31, neutral: 25, score: 57 },
];

export const geoData = [
  { state: 'Maharashtra', lat: 19.7515, lng: 75.7139, sentiment: 0.62, volume: 4200 },
  { state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, sentiment: 0.48, volume: 6100 },
  { state: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, sentiment: 0.71, volume: 3500 },
  { state: 'West Bengal', lat: 22.9868, lng: 87.855, sentiment: 0.39, volume: 2900 },
  { state: 'Karnataka', lat: 15.3173, lng: 75.7139, sentiment: 0.66, volume: 3100 },
  { state: 'Gujarat', lat: 22.2587, lng: 71.1924, sentiment: 0.74, volume: 2700 },
  { state: 'Delhi', lat: 28.7041, lng: 77.1025, sentiment: 0.52, volume: 5400 },
  { state: 'Rajasthan', lat: 27.0238, lng: 74.2179, sentiment: 0.58, volume: 1900 },
  { state: 'Kerala', lat: 10.8505, lng: 76.2711, sentiment: 0.68, volume: 1700 },
  { state: 'Punjab', lat: 31.1471, lng: 75.3412, sentiment: 0.44, volume: 1500 },
];

export const fakeNewsItems = [
  {
    id: 'fn1',
    text: 'BREAKING: Election commission cancels 2026 polls indefinitely due to security threat',
    fakeProbability: 0.94,
    source: '@unknown_news_24',
    reasons: ['Unverified source', 'Sensational tone', 'No major outlet cross-reference', 'Contradicts EC press release'],
    verdict: 'fake',
  },
  {
    id: 'fn2',
    text: 'Parliament passes new healthcare reform bill with 312 votes in favor',
    fakeProbability: 0.08,
    source: '@LokSabhaTV',
    reasons: ['Verified official handle', 'Matches PIB release', 'Specific verifiable numbers'],
    verdict: 'real',
  },
  {
    id: 'fn3',
    text: 'Prime Minister to step down next week, sources confirm',
    fakeProbability: 0.81,
    source: '@viralpolitics',
    reasons: ['Anonymous sources only', 'No official statement', 'Account flagged 3 times before'],
    verdict: 'likely fake',
  },
  {
    id: 'fn4',
    text: 'Budget 2026 allocates ₹1.2 lakh crore for rural infrastructure',
    fakeProbability: 0.12,
    source: '@FinMinIndia',
    reasons: ['Official ministry handle', 'Numbers match budget document'],
    verdict: 'real',
  },
  {
    id: 'fn5',
    text: 'Foreign country secretly funding opposition party — leaked documents reveal',
    fakeProbability: 0.78,
    source: '@anonymous_leaks',
    reasons: ['Unverifiable documents', 'Conspiracy framing', 'No mainstream coverage'],
    verdict: 'likely fake',
  },
];

export const trendingTopics = [
  { topic: '#Budget2026', momentum: 92, change: '+340%', volume: 18400 },
  { topic: '#FarmersProtest', momentum: 78, change: '+180%', volume: 12100 },
  { topic: '#ElectionResults', momentum: 65, change: '+95%', volume: 9800 },
  { topic: '#RBIPolicy', momentum: 54, change: '+62%', volume: 7200 },
  { topic: '#ClimateBill', momentum: 47, change: '+44%', volume: 5400 },
  { topic: '#JobsCrisis', momentum: 41, change: '+31%', volume: 4900 },
];

export const attentionTokens = [
  { token: 'great', weight: 0.92, sentiment: 'positive' },
  { token: 'policy', weight: 0.34, sentiment: 'neutral' },
  { token: 'forward', weight: 0.81, sentiment: 'positive' },
  { token: 'nation', weight: 0.42, sentiment: 'neutral' },
  { token: 'renewable', weight: 0.67, sentiment: 'positive' },
  { token: 'energy', weight: 0.51, sentiment: 'neutral' },
  { token: 'step', weight: 0.58, sentiment: 'positive' },
];

export const systemTimeseries = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  cpu: 25 + Math.sin(i / 2) * 15 + Math.random() * 10,
  memory: 55 + Math.cos(i / 3) * 8 + Math.random() * 5,
  latency: 30 + Math.sin(i / 1.5) * 12 + Math.random() * 8,
  tps: 8 + Math.cos(i / 2) * 4 + Math.random() * 3,
}));
