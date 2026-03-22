import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { dailyMissions } from '@/data/mockData';
import { Trophy, Flame, Target, Zap, Star } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };
const leagueLabels = { bronze: 'Bronze League', silver: 'Silver League', gold: 'Gold League' };

export default function HomePage() {
  const navigate = useNavigate();
  const { profile, isLevelCompleted } = useGame();

  const getSectorProgress = (sectorId: string, totalLevels: number) => {
    let completed = 0;
    for (let i = 1; i <= totalLevels; i++) {
      if (isLevelCompleted(sectorId as any, i)) completed++;
    }
    return completed;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <p className="text-muted-foreground font-body text-sm font-semibold uppercase tracking-wider">Welcome back</p>
            <h1 className="text-2xl font-display font-bold text-foreground">{profile.avatar} {profile.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-card rounded-2xl px-3 py-1.5 shadow-sm border border-border">
              <Flame className="w-4 h-4 text-streak" />
              <span className="font-display font-bold text-sm">{profile.dailyStreak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-2xl px-3 py-1.5 shadow-sm border border-border">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-display font-bold text-sm">{profile.xp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* League Banner */}
      <div className="px-4 mb-5" style={{ animationDelay: '80ms' }}>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border animate-slide-up" style={{ animationDelay: '80ms' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Trophy className={`w-6 h-6 ${leagueColors[profile.league]}`} />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-foreground">{leagueLabels[profile.league]}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-xp rounded-full animate-progress-fill"
                    style={{ width: `${Math.min((profile.xp % 2000) / 20, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-body font-semibold">
                  {profile.league === 'gold' ? 'MAX' : `${profile.xp % 2000}/2000`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      <div className="px-4 mb-6 animate-slide-up" style={{ animationDelay: '160ms' }}>
        <h2 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> Daily Missions
        </h2>
        <div className="space-y-2">
          {dailyMissions.map(mission => (
            <div key={mission.id} className="bg-card rounded-xl p-3 border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm text-foreground truncate">{mission.title}</p>
                <p className="text-xs text-muted-foreground">{mission.description}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-display font-bold text-xp">+{mission.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors */}
      <div className="px-4">
        <h2 className="font-display font-bold text-lg text-foreground mb-3 animate-slide-up" style={{ animationDelay: '240ms' }}>
          Choose Your Subject
        </h2>
        <div className="space-y-3 stagger-children">
          {sectors.map(sector => {
            const progress = getSectorProgress(sector.id, sector.levels.length);
            return (
              <button
                key={sector.id}
                onClick={() => navigate(`/sector/${sector.id}`)}
                className={`w-full ${sector.bgGradient} rounded-2xl p-5 text-left press-effect shadow-lg shadow-foreground/5 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{sector.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">{sector.name}</h3>
                        <p className="text-white/80 text-sm font-body">{sector.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-500"
                        style={{ width: `${(progress / sector.levels.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-white/90 text-xs font-display font-bold">{progress}/{sector.levels.length}</span>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/5 rounded-full" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
