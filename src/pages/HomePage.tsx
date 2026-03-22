import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { dailyMissions } from '@/data/mockData';
import { Trophy, Flame, Target, Zap, Star, ChevronRight, Atom, FlaskConical, Leaf, Globe, BookOpen } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };
const leagueLabels = { bronze: 'Bronze League', silver: 'Silver League', gold: 'Gold League' };
const leagueBg = { bronze: 'bg-bronze/8', silver: 'bg-silver/8', gold: 'bg-xp/8' };

const sectorIcons: Record<string, React.ElementType> = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
  'earth-space': Globe,
  general: BookOpen,
};

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
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <p className="text-muted-foreground font-body text-xs font-bold uppercase tracking-widest">Welcome back</p>
            <h1 className="text-2xl font-display font-bold text-foreground mt-0.5">{profile.avatar} {profile.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-card rounded-2xl px-3.5 py-2 shadow-[0_1px_3px_hsl(var(--foreground)/0.06),0_4px_12px_hsl(var(--foreground)/0.04)] border border-border/60">
              <Flame className="w-4 h-4 text-streak" />
              <span className="font-display font-bold text-sm tabular-nums">{profile.dailyStreak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-2xl px-3.5 py-2 shadow-[0_1px_3px_hsl(var(--foreground)/0.06),0_4px_12px_hsl(var(--foreground)/0.04)] border border-border/60">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-display font-bold text-sm tabular-nums">{profile.xp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* League Banner */}
      <div className="px-5 mb-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
        <div className="bg-card rounded-2xl p-4 shadow-[0_2px_8px_hsl(var(--foreground)/0.04),0_8px_24px_hsl(var(--foreground)/0.06)] border border-border/60">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${leagueBg[profile.league]} flex items-center justify-center`}>
              <Trophy className={`w-6 h-6 ${leagueColors[profile.league]}`} />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-foreground">{leagueLabels[profile.league]}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-xp to-streak rounded-full animate-progress-fill"
                    style={{ width: `${Math.min((profile.xp % 2000) / 20, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-display font-bold tabular-nums">
                  {profile.league === 'gold' ? 'MAX' : `${profile.xp % 2000}/2000`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Missions */}
      <div className="px-5 mb-7 animate-slide-up" style={{ animationDelay: '160ms' }}>
        <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4.5 h-4.5 text-primary" /> Daily Missions
        </h2>
        <div className="space-y-2.5">
          {dailyMissions.map(mission => (
            <div key={mission.id} className="bg-card rounded-2xl p-3.5 border border-border/60 flex items-center gap-3 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)] hover:shadow-[0_2px_8px_hsl(var(--foreground)/0.08)] transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm text-foreground truncate">{mission.title}</p>
                <p className="text-xs text-muted-foreground font-body">{mission.description}</p>
              </div>
              <div className="shrink-0">
                <span className="text-xs font-display font-bold text-xp bg-xp/10 px-2.5 py-1 rounded-lg">+{mission.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors */}
      <div className="px-5">
        <h2 className="font-display font-bold text-base text-foreground mb-3 animate-slide-up" style={{ animationDelay: '240ms' }}>
          Choose Your Subject
        </h2>
        <div className="space-y-3 stagger-children">
          {sectors.map(sector => {
            const progress = getSectorProgress(sector.id, sector.levels.length);
            const SectorIcon = sectorIcons[sector.id] || BookOpen;
            return (
              <button
                key={sector.id}
                onClick={() => navigate(`/sector/${sector.id}`)}
                className={`w-full ${sector.bgGradient} rounded-2xl p-5 text-left press-effect shadow-[0_4px_16px_hsl(var(--foreground)/0.1)] hover:shadow-[0_8px_32px_hsl(var(--foreground)/0.15)] transition-shadow duration-300 relative overflow-hidden group`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                        <SectorIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">{sector.name}</h3>
                        <p className="text-white/70 text-sm font-body">{sector.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-500"
                        style={{ width: `${(progress / sector.levels.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-display font-bold tabular-nums">{progress}/{sector.levels.length}</span>
                  </div>
                </div>
                <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/8 rounded-full transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute -right-2 -bottom-8 w-20 h-20 bg-white/5 rounded-full" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
