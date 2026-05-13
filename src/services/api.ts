/**
 * PolitiSense API Service
 * Connects to Flask backend for real-time sentiment analysis
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface TweetData {
  id: string;
  text: string;
  clean_text?: string;
  user_name: string;
  handle: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  ml_sentiment?: string;
  bert_sentiment?: string;
  confidence: number;
  keyword: string;
  retweets: number;
  likes: number;
}

export interface AnalyticsData {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  trend: { time: string; positive: number; negative: number; neutral: number }[];
  top_hashtags: { tag: string; count: number }[];
  word_freq: { text: string; value: number }[];
}

export interface StreamStatus {
  streaming: boolean;
  keyword: string;
  tweet_count: number;
}

export interface PredictionResult {
  text: string;
  clean_text: string;
  vader_sentiment: string;
  vader_score: number;
  bert_sentiment: string;
  bert_confidence: number;
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  getStatus: () => apiFetch<StreamStatus>('/api/status'),

  getTweets: (limit = 100, keyword?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (keyword) params.set('keyword', keyword);
    return apiFetch<TweetData[]>(`/api/tweets?${params}`);
  },

  getAnalytics: (keyword?: string) => {
    const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return apiFetch<AnalyticsData>(`/api/analytics${params}`);
  },

  startStream: (keyword: string) =>
    apiFetch<{ status: string; keyword: string }>(`/api/start-stream?keyword=${encodeURIComponent(keyword)}`),

  stopStream: () => apiFetch<{ status: string }>('/api/stop-stream'),

  predict: (text: string) =>
    apiFetch<PredictionResult>('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),

  exportCSV: () => apiFetch<{ status: string; path: string }>('/api/export'),
};
