export interface Tweet {
  id: string;
  text: string;
  user: string;
  handle: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keyword: string;
  retweets: number;
  likes: number;
}

export interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  speed: string;
  type: string;
}

export const mockTweets: Tweet[] = [
  { id: '1', text: 'The new government policy on renewable energy is a great step forward for the nation!', user: 'Sarah Johnson', handle: '@sarahj', date: '2026-03-05T10:30:00', sentiment: 'positive', confidence: 0.92, keyword: 'government', retweets: 45, likes: 230 },
  { id: '2', text: 'Disappointed with the election results. The people deserve better representation.', user: 'Michael Chen', handle: '@mchen', date: '2026-03-05T10:25:00', sentiment: 'negative', confidence: 0.88, keyword: 'elections', retweets: 120, likes: 340 },
  { id: '3', text: 'The parliament session today discussed infrastructure development across rural areas.', user: 'News Daily', handle: '@newsdaily', date: '2026-03-05T10:20:00', sentiment: 'neutral', confidence: 0.95, keyword: 'government', retweets: 67, likes: 150 },
  { id: '4', text: 'Amazing speech by the Prime Minister on climate change! Real leadership in action.', user: 'Emma Wilson', handle: '@emmaw', date: '2026-03-05T10:15:00', sentiment: 'positive', confidence: 0.94, keyword: 'political leaders', retweets: 890, likes: 2300 },
  { id: '5', text: 'The opposition party has completely failed to deliver on their promises. Total disappointment.', user: 'James Rodriguez', handle: '@jrod', date: '2026-03-05T10:10:00', sentiment: 'negative', confidence: 0.91, keyword: 'political parties', retweets: 230, likes: 560 },
  { id: '6', text: 'Voter registration deadline extended by two weeks according to election commission.', user: 'Election Watch', handle: '@elwatch', date: '2026-03-05T10:05:00', sentiment: 'neutral', confidence: 0.97, keyword: 'elections', retweets: 340, likes: 890 },
  { id: '7', text: 'Historic bipartisan agreement on healthcare reform! This is how democracy should work.', user: 'Policy Insider', handle: '@pinsider', date: '2026-03-05T10:00:00', sentiment: 'positive', confidence: 0.89, keyword: 'government', retweets: 560, likes: 1200 },
  { id: '8', text: 'Corruption scandal rocks the ruling party as new evidence emerges.', user: 'Breaking News', handle: '@breaking', date: '2026-03-05T09:55:00', sentiment: 'negative', confidence: 0.93, keyword: 'political parties', retweets: 1200, likes: 3400 },
  { id: '9', text: 'The senator outlined a comprehensive plan for economic recovery during the press conference.', user: 'Capitol Report', handle: '@capreport', date: '2026-03-05T09:50:00', sentiment: 'neutral', confidence: 0.86, keyword: 'political leaders', retweets: 78, likes: 210 },
  { id: '10', text: 'Incredible voter turnout this election! Democracy is alive and well.', user: 'Civic Watch', handle: '@civicw', date: '2026-03-05T09:45:00', sentiment: 'positive', confidence: 0.96, keyword: 'elections', retweets: 450, likes: 1800 },
  { id: '11', text: 'Tax policy changes will hurt middle-class families the most. Terrible decision by the government.', user: 'Economic Forum', handle: '@ecoforum', date: '2026-03-05T09:40:00', sentiment: 'negative', confidence: 0.87, keyword: 'government', retweets: 670, likes: 1400 },
  { id: '12', text: 'The governor signed the new education bill into law today at the state capitol.', user: 'State News', handle: '@statenews', date: '2026-03-05T09:35:00', sentiment: 'neutral', confidence: 0.92, keyword: 'political leaders', retweets: 120, likes: 340 },
  { id: '13', text: 'प्रधानमंत्री ने किसानों के लिए नई योजना की घोषणा की। बहुत अच्छा कदम!', user: 'Hindi News', handle: '@hindinews', date: '2026-03-05T09:30:00', sentiment: 'positive', confidence: 0.85, keyword: 'Narendra Modi', retweets: 230, likes: 890 },
  { id: '14', text: 'BJP wins landslide in state elections, opposition demands recount in 3 districts.', user: 'India Today', handle: '@indiatoday', date: '2026-03-05T09:25:00', sentiment: 'neutral', confidence: 0.79, keyword: 'BJP', retweets: 1500, likes: 4200 },
  { id: '15', text: 'Congress party releases new manifesto focusing on employment and education reform.', user: 'NDTV', handle: '@ndtv', date: '2026-03-05T09:20:00', sentiment: 'neutral', confidence: 0.83, keyword: 'Congress', retweets: 340, likes: 780 },
  { id: '16', text: 'Trump announces major trade deal with India — markets react positively.', user: 'Reuters', handle: '@reuters', date: '2026-03-05T09:15:00', sentiment: 'positive', confidence: 0.91, keyword: 'Trump', retweets: 2300, likes: 5600 },
  { id: '17', text: 'The budget allocation for defense has been criticized by analysts as insufficient.', user: 'Defense Watch', handle: '@defwatch', date: '2026-03-05T09:10:00', sentiment: 'negative', confidence: 0.84, keyword: 'government', retweets: 190, likes: 420 },
  { id: '18', text: 'New digital India initiative promises broadband connectivity to every village by 2027.', user: 'Tech India', handle: '@techindia', date: '2026-03-05T09:05:00', sentiment: 'positive', confidence: 0.88, keyword: 'government', retweets: 560, likes: 1300 },
  { id: '19', text: 'Unemployment rate hits 8.2% — worst in 5 years according to latest CMIE data.', user: 'Economic Times', handle: '@etimes', date: '2026-03-05T09:00:00', sentiment: 'negative', confidence: 0.95, keyword: 'government', retweets: 890, likes: 2100 },
  { id: '20', text: 'Election Commission announces schedule for upcoming municipal elections across 5 states.', user: 'EC India', handle: '@ecindia', date: '2026-03-05T08:55:00', sentiment: 'neutral', confidence: 0.96, keyword: 'elections', retweets: 450, likes: 670 },
];

export const sentimentTrend = [
  { time: '06:00', positive: 35, negative: 25, neutral: 40 },
  { time: '07:00', positive: 40, negative: 20, neutral: 40 },
  { time: '08:00', positive: 38, negative: 30, neutral: 32 },
  { time: '09:00', positive: 45, negative: 22, neutral: 33 },
  { time: '10:00', positive: 42, negative: 28, neutral: 30 },
  { time: '11:00', positive: 50, negative: 18, neutral: 32 },
  { time: '12:00', positive: 48, negative: 25, neutral: 27 },
  { time: '13:00', positive: 44, negative: 30, neutral: 26 },
  { time: '14:00', positive: 52, negative: 20, neutral: 28 },
  { time: '15:00', positive: 55, negative: 15, neutral: 30 },
];

export const topHashtags = [
  { tag: '#Election2026', count: 12400 },
  { tag: '#Democracy', count: 8900 },
  { tag: '#ClimatePolicy', count: 7600 },
  { tag: '#HealthcareReform', count: 6800 },
  { tag: '#TaxReform', count: 5400 },
  { tag: '#VoterRights', count: 4900 },
  { tag: '#BipartisanDeal', count: 3800 },
  { tag: '#PoliticalDebate', count: 3200 },
];

export const modelMetrics: ModelMetrics[] = [
  { name: 'VADER', accuracy: 0.782, precision: 0.775, recall: 0.780, f1Score: 0.777, speed: '< 1ms', type: 'Rule-Based' },
  { name: 'Logistic Regression', accuracy: 0.847, precision: 0.835, recall: 0.842, f1Score: 0.838, speed: '~ 5ms', type: 'ML' },
  { name: 'Naive Bayes', accuracy: 0.812, precision: 0.808, recall: 0.815, f1Score: 0.811, speed: '~ 3ms', type: 'ML' },
  { name: 'SVM', accuracy: 0.863, precision: 0.858, recall: 0.860, f1Score: 0.859, speed: '~ 8ms', type: 'ML' },
  { name: 'BERT', accuracy: 0.921, precision: 0.918, recall: 0.923, f1Score: 0.920, speed: '~ 120ms', type: 'Deep Learning' },
];

export const confusionMatrix = {
  labels: ['Positive', 'Negative', 'Neutral'],
  data: [
    [145, 8, 12],
    [6, 138, 11],
    [10, 9, 141],
  ],
};

export const wordCloudData = [
  { text: 'election', value: 120 },
  { text: 'government', value: 95 },
  { text: 'democracy', value: 88 },
  { text: 'policy', value: 82 },
  { text: 'reform', value: 75 },
  { text: 'voters', value: 70 },
  { text: 'campaign', value: 65 },
  { text: 'debate', value: 60 },
  { text: 'healthcare', value: 58 },
  { text: 'economy', value: 55 },
  { text: 'climate', value: 52 },
  { text: 'congress', value: 48 },
  { text: 'senate', value: 45 },
  { text: 'president', value: 42 },
  { text: 'legislation', value: 40 },
  { text: 'bipartisan', value: 38 },
  { text: 'candidate', value: 35 },
  { text: 'infrastructure', value: 33 },
  { text: 'education', value: 30 },
  { text: 'taxation', value: 28 },
];

// Dataset insights mock data
export const datasetStats = {
  totalTweets: 24847,
  labeledTweets: 22150,
  unlabeledTweets: 2697,
  dataSource: 'Twitter/X API v2',
  labelingMethod: 'VADER Auto-Label + Manual Review',
  collectionPeriod: 'Jan 2026 – Mar 2026',
  languageDistribution: [
    { language: 'English', count: 18200, percentage: 73.2 },
    { language: 'Hindi', count: 4100, percentage: 16.5 },
    { language: 'Mixed (Hinglish)', count: 1800, percentage: 7.2 },
    { language: 'Other', count: 747, percentage: 3.1 },
  ],
  collectionTimeline: [
    { month: 'Jan 2026', tweets: 6200, labeled: 5500 },
    { month: 'Feb 2026', tweets: 8900, labeled: 8100 },
    { month: 'Mar 2026', tweets: 9747, labeled: 8550 },
  ],
  topKeywords: [
    { keyword: 'Modi', count: 4200 },
    { keyword: 'BJP', count: 3800 },
    { keyword: 'Congress', count: 2900 },
    { keyword: 'election', count: 2600 },
    { keyword: 'Trump', count: 2100 },
    { keyword: 'government', count: 1900 },
    { keyword: 'policy', count: 1700 },
    { keyword: 'democracy', count: 1500 },
  ],
};

// Ethics and bias data
export const biasMetrics = {
  sentimentSkew: {
    positive: 38.2,
    negative: 32.5,
    neutral: 29.3,
  },
  regionBias: [
    { region: 'North India', positive: 42, negative: 30, neutral: 28 },
    { region: 'South India', positive: 35, negative: 28, neutral: 37 },
    { region: 'West India', positive: 38, negative: 35, neutral: 27 },
    { region: 'East India', positive: 33, negative: 38, neutral: 29 },
    { region: 'International', positive: 40, negative: 32, neutral: 28 },
  ],
  languageBias: [
    { language: 'English', accuracy: 0.92, sampleSize: 18200 },
    { language: 'Hindi', accuracy: 0.84, sampleSize: 4100 },
    { language: 'Hinglish', accuracy: 0.78, sampleSize: 1800 },
  ],
  modelBiasWarnings: [
    'VADER has limited support for non-English text and may misclassify Hindi/Hinglish tweets',
    'BERT multilingual model shows ~8% lower accuracy on code-switched (Hinglish) text',
    'Training data has a slight positive sentiment bias (38.2% vs expected 33.3%)',
    'Twitter/X API may introduce sampling bias — not all tweets are captured',
    'Political sentiment can vary significantly by region and demographic',
  ],
};

// System performance mock data
export const systemMetrics = {
  tweetsPerSecond: 12.4,
  apiLatency: 45,
  vaderResponseTime: 0.8,
  bertResponseTime: 118,
  uptime: 99.7,
  dbSize: '142 MB',
  activeConnections: 3,
  queueSize: 0,
};

// Confidence distribution data
export const confidenceDistribution = [
  { range: '50-60%', count: 120, percentage: 4.8 },
  { range: '60-70%', count: 340, percentage: 13.7 },
  { range: '70-80%', count: 890, percentage: 35.8 },
  { range: '80-90%', count: 780, percentage: 31.4 },
  { range: '90-100%', count: 357, percentage: 14.3 },
];

// Accuracy trend over training epochs
export const accuracyTrend = [
  { epoch: 1, train: 0.62, val: 0.58 },
  { epoch: 2, train: 0.71, val: 0.67 },
  { epoch: 3, train: 0.79, val: 0.75 },
  { epoch: 4, train: 0.84, val: 0.81 },
  { epoch: 5, train: 0.87, val: 0.84 },
  { epoch: 6, train: 0.90, val: 0.87 },
  { epoch: 7, train: 0.92, val: 0.89 },
  { epoch: 8, train: 0.93, val: 0.90 },
  { epoch: 9, train: 0.94, val: 0.91 },
  { epoch: 10, train: 0.95, val: 0.921 },
];
