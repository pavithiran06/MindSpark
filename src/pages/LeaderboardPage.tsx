import React from 'react';
import { useGame } from '@/context/GameContext';
import { leaderboardData } from '@/data/mockData';
import { Trophy, Crown } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };
const podiumGradients = [
  'bg-gradient-to-t from-xp/80 to-xp',
  'bg-gradient-to-t from-silver/60 to-silver/80',
  'bg-gradient-to-t from-bronze/60 to-bronze/80',
];

export default function LeaderboardPage() {
  const { profile } = useGame();
  const userRank = leaderboardData.filter(e => e.score > profile.stats.totalScore).length + 1;

  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6 animate-slide-up flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-xp/10 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-xp" />
        </div>
        Leaderboard
      </h1>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 mb-8 h-48 animate-slide-up" style={{ animationDelay: '80ms' }}>
        {[1, 0, 2].map((podiumIdx, visualIdx) => {
          const entry = leaderboardData[podiumIdx];
          if (!entry) return null;
          const heights = ['h-40', 'h-32', 'h-26'];
          const sizes = ['text-4xl', 'text-3xl', 'text-3xl'];
          const containerSize = visualIdx === 0 ? 'w-16 h-16' : 'w-14 h-14';
          return (
            <div key={entry.rank} className="flex flex-col items-center">
              <div className={`${containerSize} rounded-2xl bg-card border border-border/60 shadow-[0_2px_8px_hsl(var(--foreground)/0.06)] flex items-center justify-center mb-1.5`}>
                <span className={sizes[visualIdx]}>{entry.avatar}</span>
              </div>
              {visualIdx === 0 && <Crown className="w-4 h-4 text-xp -mt-1 mb-0.5" />}
              <p className="font-display font-bold text-xs text-foreground truncate max-w-[80px]">{entry.name}</p>
              <p className="text-[10px] text-muted-foreground font-display font-bold tabular-nums mb-1.5">{entry.score.toLocaleString()}</p>
              <div className={`${podiumGradients[visualIdx]} w-20 ${heights[visualIdx]} rounded-t-2xl flex items-start justify-center pt-2.5`}>
                <span className="font-display font-bold text-white text-base">#{podiumIdx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="space-y-2 stagger-children">
        {leaderboardData.map(entry => {
          const isUser = entry.name === profile.name;
          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200
                ${isUser ? 'bg-primary/8 border border-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.06)]' : 'bg-card border border-border/60 shadow-[0_1px_3px_hsl(var(--foreground)/0.03)]'}`}
            >
              <span className="w-8 text-center font-display font-bold text-sm text-muted-foreground tabular-nums">{entry.rank}</span>
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
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
          );
        })}

        {userRank > 10 && (
          <>
            <div className="text-center text-muted-foreground py-2 font-body text-sm">• • •</div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-primary/8 border border-primary/15">
              <span className="w-8 text-center font-display font-bold text-sm text-foreground tabular-nums">{userRank}</span>
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg">{profile.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-foreground truncate">{profile.name} (You)</p>
                <p className={`text-[10px] font-display font-bold ${leagueColors[profile.league]}`}>
                  {profile.league.charAt(0).toUpperCase() + profile.league.slice(1)}
                </p>
              </div>
              <span className="font-display font-bold text-sm text-foreground tabular-nums">{profile.stats.totalScore.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
