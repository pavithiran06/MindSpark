import React from 'react';
import { useGame } from '@/context/GameContext';
import { leaderboardData } from '@/data/mockData';
import { Trophy, Crown, Medal, Star, TrendingUp } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };

export default function LeaderboardPage() {
  const { profile } = useGame();
  const userRank = leaderboardData.filter(e => e.score > profile.stats.totalScore).length + 1;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-xp/8 to-transparent" />
        <div className="relative px-5 pt-6 pb-4">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1 animate-slide-up flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-xp/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-xp" />
            </div>
            Leaderboard
          </h1>
        </div>
      </div>

      {/* Your Rank Card */}
      <div className="px-5 mb-5 animate-slide-up" style={{ animationDelay: '60ms' }}>
        <div className="bg-card rounded-2xl p-4 border border-primary/15 shadow-[0_2px_12px_hsl(var(--primary)/0.08)] flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">{profile.avatar}</span>
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-sm text-foreground">{profile.name} (You)</p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Rank #{userRank}
              </span>
              <span className="text-xs text-xp font-display font-bold">{profile.stats.totalScore.toLocaleString()} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-5 mb-6 animate-slide-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-end justify-center gap-3 h-52">
          {[1, 0, 2].map((podiumIdx, visualIdx) => {
            const entry = leaderboardData[podiumIdx];
            if (!entry) return null;
            const heights = ['h-44', 'h-36', 'h-28'];
            const sizes = ['text-4xl', 'text-3xl', 'text-3xl'];
            const containerSize = visualIdx === 0 ? 'w-18 h-18' : 'w-15 h-15';
            const gradients = [
              'bg-gradient-to-t from-xp/60 to-xp/90',
              'bg-gradient-to-t from-silver/50 to-silver/80',
              'bg-gradient-to-t from-bronze/50 to-bronze/80',
            ];
            return (
              <div key={entry.rank} className="flex flex-col items-center">
                <div className={`${containerSize} rounded-2xl bg-card border-2 ${
                  visualIdx === 0 ? 'border-xp/30' : visualIdx === 1 ? 'border-silver/30' : 'border-bronze/30'
                } shadow-[0_4px_16px_hsl(var(--foreground)/0.06)] flex items-center justify-center mb-1.5`}>
                  <span className={sizes[visualIdx]}>{entry.avatar}</span>
                </div>
                {visualIdx === 0 && <Crown className="w-5 h-5 text-xp -mt-1 mb-0.5 drop-shadow-[0_0_4px_hsl(var(--xp)/0.5)]" />}
                <p className="font-display font-bold text-xs text-foreground truncate max-w-[80px]">{entry.name}</p>
                <p className="text-[10px] text-muted-foreground font-display font-bold tabular-nums mb-1.5">{entry.score.toLocaleString()}</p>
                <div className={`${gradients[visualIdx]} w-22 ${heights[visualIdx]} rounded-t-2xl flex items-start justify-center pt-3 backdrop-blur-sm`}>
                  <span className="font-display font-bold text-white text-lg drop-shadow">#{podiumIdx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full list */}
      <div className="px-5 space-y-2 stagger-children">
        {leaderboardData.slice(3).map(entry => (
          <div
            key={entry.rank}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border/60 shadow-[0_1px_3px_hsl(var(--foreground)/0.03)] hover:shadow-[0_2px_8px_hsl(var(--foreground)/0.06)] transition-shadow"
          >
            <span className="w-8 text-center font-display font-bold text-sm text-muted-foreground tabular-nums">{entry.rank}</span>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <span className="text-lg">{entry.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-foreground truncate">{entry.name}</p>
              <p className={`text-[10px] font-display font-bold ${leagueColors[entry.league]}`}>
                {entry.league.charAt(0).toUpperCase() + entry.league.slice(1)}
              </p>
            </div>
            <span className="font-display font-bold text-sm text-foreground tabular-nums">{entry.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
