import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveSentimentPage from "./pages/LiveSentimentPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import TweetsPage from "./pages/TweetsPage";
import DatasetPage from "./pages/DatasetPage";
import EthicsPage from "./pages/EthicsPage";
import SystemPage from "./pages/SystemPage";
import TrainingPage from "./pages/TrainingPage";
import ForecastPage from "./pages/ForecastPage";
import GeoPage from "./pages/GeoPage";
import FakeNewsPage from "./pages/FakeNewsPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import AssistantPage from "./pages/AssistantPage";
import NotFound from "./pages/NotFound";
import InstallPrompt from "./components/pwa/InstallPrompt";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live" element={<LiveSentimentPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/tweets" element={<TweetsPage />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/ethics" element={<EthicsPage />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/geo" element={<GeoPage />} />
          <Route path="/fake-news" element={<FakeNewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <InstallPrompt />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
