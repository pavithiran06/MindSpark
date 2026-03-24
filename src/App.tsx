import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/context/GameContext";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/components/SplashScreen";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import SectorPage from "./pages/SectorPage";
import QuizPage from "./pages/QuizPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => {
    setTimeout(() => setShowSplash(false), 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <GameProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={
                <div className="max-w-md mx-auto min-h-screen relative">
                  <HomePage />
                  <BottomNav />
                </div>
              } />
              <Route path="/sector/:sectorId" element={
                <div className="max-w-md mx-auto min-h-screen relative">
                  <SectorPage />
                  <BottomNav />
                </div>
              } />
              <Route path="/quiz/:sectorId/:levelId" element={
                <div className="max-w-md mx-auto min-h-screen relative">
                  <QuizPage />
                </div>
              } />
              <Route path="/profile" element={
                <div className="max-w-md mx-auto min-h-screen relative">
                  <ProfilePage />
                  <BottomNav />
                </div>
              } />
              <Route path="/leaderboard" element={
                <div className="max-w-md mx-auto min-h-screen relative">
                  <LeaderboardPage />
                  <BottomNav />
                </div>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;