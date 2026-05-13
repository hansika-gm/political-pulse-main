/**
 * Socket.IO client for real-time tweet streaming
 */
import { io, Socket } from 'socket.io-client';
import type { TweetData } from './api';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}

export type SentimentUpdate = {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
};

export interface SocketEvents {
  new_tweet: (tweet: TweetData) => void;
  sentiment_update: (data: SentimentUpdate) => void;
  stream_started: (data: { keyword: string }) => void;
  stream_stopped: () => void;
  error: (data: { message: string }) => void;
}

export function onNewTweet(callback: SocketEvents['new_tweet']) {
  getSocket().on('new_tweet', callback);
  return () => { getSocket().off('new_tweet', callback); };
}

export function onSentimentUpdate(callback: SocketEvents['sentiment_update']) {
  getSocket().on('sentiment_update', callback);
  return () => { getSocket().off('sentiment_update', callback); };
}
