import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, User } from 'lucide-react';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/leaderboard', icon: Trophy, label: 'Rank' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on quiz pages and landing page
  if (location.pathname.startsWith('/quiz/') || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-2xl border-t border-border/50 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl press-effect transition-all duration-200
                ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <tab.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-display font-bold">{tab.label}</span>
              {isActive && <div className="w-1 h-1 bg-primary rounded-full mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
