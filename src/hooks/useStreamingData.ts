/**
 * React hooks for real-time data with polling fallback
 */
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback, useRef } from 'react';
import { api, type TweetData, type AnalyticsData, type StreamStatus } from '@/services/api';
import { connectSocket, disconnectSocket, onNewTweet, onSentimentUpdate, type SentimentUpdate } from '@/services/socket';

const POLL_INTERVAL = 30_000; // 30s fallback polling

/** Check if backend is reachable */
function useBackendAvailable() {
  const { data } = useQuery({
    queryKey: ['backend-status'],
    queryFn: async () => {
      try {
        await api.getStatus();
        return true;
      } catch {
        return false;
      }
    },
    refetchInterval: 60_000,
    retry: false,
  });
  return data ?? false;
}

/** Fetch tweets with polling */
export function useTweets(keyword?: string) {
  const backendUp = useBackendAvailable();

  return useQuery({
    queryKey: ['tweets', keyword],
    queryFn: () => api.getTweets(200, keyword),
    refetchInterval: backendUp ? POLL_INTERVAL : false,
    enabled: backendUp,
    retry: 2,
  });
}

/** Fetch analytics with polling */
export function useAnalytics(keyword?: string) {
  const backendUp = useBackendAvailable();

  return useQuery({
    queryKey: ['analytics', keyword],
    queryFn: () => api.getAnalytics(keyword),
    refetchInterval: backendUp ? POLL_INTERVAL : false,
    enabled: backendUp,
    retry: 2,
  });
}

/** Real-time tweet stream via Socket.IO with local state accumulation */
export function useLiveStream() {
  const [liveTweets, setLiveTweets] = useState<TweetData[]>([]);
  const [stats, setStats] = useState<SentimentUpdate>({ total: 0, positive: 0, negative: 0, neutral: 0 });
  const [streaming, setStreaming] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [connected, setConnected] = useState(false);
  const maxTweets = 200;

  useEffect(() => {
    const socket = connectSocket();

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    const unsubTweet = onNewTweet((tweet) => {
      setLiveTweets((prev) => [tweet, ...prev].slice(0, maxTweets));
    });

    const unsubStats = onSentimentUpdate((data) => {
      setStats(data);
    });

    socket.on('stream_started', (data: { keyword: string }) => {
      setStreaming(true);
      setKeyword(data.keyword);
    });

    socket.on('stream_stopped', () => {
      setStreaming(false);
    });

    return () => {
      unsubTweet();
      unsubStats();
      disconnectSocket();
    };
  }, []);

  const startStream = useCallback(async (kw: string) => {
    try {
      setLiveTweets([]);
      setStats({ total: 0, positive: 0, negative: 0, neutral: 0 });
      await api.startStream(kw);
      setKeyword(kw);
      setStreaming(true);
    } catch (err) {
      console.error('Failed to start stream:', err);
    }
  }, []);

  const stopStream = useCallback(async () => {
    try {
      await api.stopStream();
      setStreaming(false);
    } catch (err) {
      console.error('Failed to stop stream:', err);
    }
  }, []);

  return { liveTweets, stats, streaming, keyword, connected, startStream, stopStream };
}

/** Stream status */
export function useStreamStatus() {
  const backendUp = useBackendAvailable();

  return useQuery({
    queryKey: ['stream-status'],
    queryFn: () => api.getStatus(),
    refetchInterval: backendUp ? 10_000 : false,
    enabled: backendUp,
    retry: false,
  });
}
