import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppMode = 'LIVE' | 'DEMO';
export type Theme = 'dark' | 'light';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

interface AppState {
  mode: AppMode;
  theme: Theme;
  notifications: Notification[];
  savedReports: { id: string; name: string; date: string; query: string }[];
  setMode: (m: AppMode) => void;
  toggleTheme: () => void;
  pushNotification: (n: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAllRead: () => void;
  clearNotifications: () => void;
  saveReport: (r: { name: string; query: string }) => void;
  deleteReport: (id: string) => void;
}

const seedNotifications: Notification[] = [
  { id: 'n1', title: 'Model retrained', message: 'BERT model updated to v3.1 — accuracy improved by 1.2%', type: 'success', time: '2m ago', read: false },
  { id: 'n2', title: 'High negative spike', message: '#TaxReform negativity surged 38% in the last hour', type: 'warning', time: '14m ago', read: false },
  { id: 'n3', title: 'Stream connected', message: 'Twitter Filtered Stream is live for 6 active keywords', type: 'info', time: '32m ago', read: true },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      mode: 'DEMO',
      theme: 'dark',
      notifications: seedNotifications,
      savedReports: [
        { id: 'r1', name: 'Modi Sentiment — March', date: '2026-03-04', query: 'Narendra Modi' },
        { id: 'r2', name: 'Election 2026 Coverage', date: '2026-03-02', query: 'elections' },
      ],
      setMode: (mode) => set({ mode }),
      toggleTheme: () =>
        set((s) => {
          const next: Theme = s.theme === 'dark' ? 'light' : 'dark';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('light', next === 'light');
          }
          return { theme: next };
        }),
      pushNotification: (n) =>
        set((s) => ({
          notifications: [
            { ...n, id: Math.random().toString(36).slice(2), time: 'just now', read: false },
            ...s.notifications,
          ].slice(0, 50),
        })),
      markAllRead: () => set((s) => ({ notifications: s.notifications.map((x) => ({ ...x, read: true })) })),
      clearNotifications: () => set({ notifications: [] }),
      saveReport: (r) =>
        set((s) => ({
          savedReports: [
            { id: Math.random().toString(36).slice(2), name: r.name, query: r.query, date: new Date().toISOString().slice(0, 10) },
            ...s.savedReports,
          ],
        })),
      deleteReport: (id) => set((s) => ({ savedReports: s.savedReports.filter((r) => r.id !== id) })),
    }),
    { name: 'politisense-app', partialize: (s) => ({ theme: s.theme, mode: s.mode, savedReports: s.savedReports }) }
  )
);
