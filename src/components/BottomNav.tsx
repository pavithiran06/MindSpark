import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, User } from 'lucide-react';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/leaderboard', icon: Trophy, label: 'Rank' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on quiz pages
  if (location.pathname.startsWith('/quiz/')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 safe-area-pb">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl press-effect transition-all duration-200
                ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <tab.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-display font-bold">{tab.label}</span>
              {isActive && <div className="w-1 h-1 bg-primary rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
