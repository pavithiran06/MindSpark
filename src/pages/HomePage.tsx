import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { dailyMissions } from '@/data/mockData';
import { Trophy, Flame, Target, Zap, Star, ChevronRight, Atom, FlaskConical, Leaf, Globe, BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };
const leagueLabels = { bronze: 'Bronze League', silver: 'Silver League', gold: 'Gold League' };
const leagueBg = { bronze: 'bg-bronze/10', silver: 'bg-silver/10', gold: 'bg-xp/10' };

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

  const nextLeagueXp = profile.league === 'bronze' ? 2000 : profile.league === 'silver' ? 5000 : 10000;
  const prevLeagueXp = profile.league === 'bronze' ? 0 : profile.league === 'silver' ? 2000 : 5000;
  const leagueProgress = Math.min(((profile.xp - prevLeagueXp) / (nextLeagueXp - prevLeagueXp)) * 100, 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-xp/5" />
        <div className="relative px-5 pt-6 pb-6">
          <div className="flex items-center justify-between animate-slide-up">
            <div>
              <p className="text-muted-foreground font-body text-xs font-bold uppercase tracking-widest">Welcome back</p>
              <h1 className="text-2xl font-display font-bold text-foreground mt-0.5 flex items-center gap-2">
                {profile.name}
                <Sparkles className="w-5 h-5 text-xp" />
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-sm rounded-2xl px-3.5 py-2 shadow-[0_2px_8px_hsl(var(--foreground)/0.06)] border border-border/60">
                <Flame className="w-4 h-4 text-streak" />
                <span className="font-display font-bold text-sm tabular-nums">{profile.dailyStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-sm rounded-2xl px-3.5 py-2 shadow-[0_2px_8px_hsl(var(--foreground)/0.06)] border border-border/60">
                <Zap className="w-4 h-4 text-xp" />
                <span className="font-display font-bold text-sm tabular-nums">{profile.xp.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* League Banner */}
      <div className="px-5 mb-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
        <div className="bg-card rounded-2xl p-4 shadow-[0_2px_12px_hsl(var(--foreground)/0.06)] border border-border/60 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full" />
          <div className="flex items-center gap-3 relative z-10">
            <div className={`w-14 h-14 rounded-2xl ${leagueBg[profile.league]} flex items-center justify-center`}>
              <Trophy className={`w-7 h-7 ${leagueColors[profile.league]}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-foreground">{leagueLabels[profile.league]}</p>
                <span className="text-xs text-muted-foreground font-display font-bold tabular-nums">
                  {profile.league === 'gold' && profile.xp >= 10000 ? 'MAX' : `${profile.xp.toLocaleString()}/${nextLeagueXp.toLocaleString()}`}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-xp to-streak rounded-full animate-progress-fill"
                    style={{ width: `${leagueProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-5 mb-5 animate-slide-up" style={{ animationDelay: '120ms' }}>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Target, label: 'Accuracy', value: `${profile.stats.accuracy}%`, color: 'text-primary', bg: 'bg-primary/8' },
            { icon: Flame, label: 'Best Streak', value: `${profile.stats.highestStreak}`, color: 'text-streak', bg: 'bg-streak/8' },
            { icon: TrendingUp, label: 'Levels', value: `${profile.stats.completedLevels}`, color: 'text-correct', bg: 'bg-correct/8' },
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-2xl p-3 border border-border/60 shadow-[0_1px_4px_hsl(var(--foreground)/0.03)] text-center">
              <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
              <p className="font-display font-bold text-base text-foreground tabular-nums">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-body font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Missions */}
      <div className="px-5 mb-7 animate-slide-up" style={{ animationDelay: '160ms' }}>
        <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4.5 h-4.5 text-primary" /> Daily Missions
        </h2>
        <div className="space-y-2.5">
          {dailyMissions.map(mission => (
            <div key={mission.id} className="bg-card rounded-2xl p-3.5 border border-border/60 flex items-center gap-3 shadow-[0_1px_3px_hsl(var(--foreground)/0.04)] hover:shadow-[0_4px_16px_hsl(var(--foreground)/0.08)] transition-all duration-300 press-effect">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm text-foreground truncate">{mission.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(mission.progress / mission.target) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-display font-bold tabular-nums">{mission.progress}/{mission.target}</span>
                </div>
              </div>
              <span className="text-xs font-display font-bold text-xp bg-xp/10 px-2.5 py-1 rounded-lg shrink-0">+{mission.xpReward}</span>
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
            const pct = Math.round((progress / sector.levels.length) * 100);
            const SectorIcon = sectorIcons[sector.id] || BookOpen;
            return (
              <button
                key={sector.id}
                onClick={() => navigate(`/sector/${sector.id}`)}
                className={`w-full ${sector.bgGradient} rounded-2xl p-5 text-left press-effect shadow-[0_4px_16px_hsl(var(--foreground)/0.1)] hover:shadow-[0_8px_32px_hsl(var(--foreground)/0.15)] transition-all duration-300 relative overflow-hidden group`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <SectorIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">{sector.name}</h3>
                        <p className="text-white/60 text-xs font-body">{sector.levels.length} levels · {sector.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/90 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-white font-display font-bold text-xs tabular-nums min-w-[40px] text-right">{pct}%</span>
                  </div>
                </div>
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/8 rounded-full transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute -right-2 -bottom-10 w-24 h-24 bg-white/5 rounded-full" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
