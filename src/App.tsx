import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/components/SplashScreen";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
        <AuthProvider>
          <GameProvider>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={
                  <ProtectedRoute>
                    <div className="max-w-md mx-auto min-h-screen relative">
                      <HomePage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/sector/:sectorId" element={
                  <ProtectedRoute>
                    <div className="max-w-md mx-auto min-h-screen relative">
                      <SectorPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/quiz/:sectorId/:levelId" element={
                  <ProtectedRoute>
                    <div className="max-w-md mx-auto min-h-screen relative">
                      <QuizPage />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <div className="max-w-md mx-auto min-h-screen relative">
                      <ProfilePage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <div className="max-w-md mx-auto min-h-screen relative">
                      <LeaderboardPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
