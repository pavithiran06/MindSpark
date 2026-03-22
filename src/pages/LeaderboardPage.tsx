import React from 'react';
import { useGame } from '@/context/GameContext';
import { leaderboardData } from '@/data/mockData';
import { Trophy, Medal } from 'lucide-react';

const leagueColors = { bronze: 'text-bronze', silver: 'text-silver', gold: 'text-gold' };
const podiumColors = ['bg-xp', 'bg-silver', 'bg-bronze'];

export default function LeaderboardPage() {
  const { profile } = useGame();

  // Insert user into leaderboard
  const allEntries = [...leaderboardData];
  const userEntry = {
    rank: 0,
    name: profile.name,
    avatar: profile.avatar,
    score: profile.stats.totalScore,
    league: profile.league,
  };

  const userRank = allEntries.filter(e => e.score > profile.stats.totalScore).length + 1;
  userEntry.rank = userRank;

  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6 animate-slide-up flex items-center gap-2">
        <Trophy className="w-6 h-6 text-xp" /> Leaderboard
      </h1>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 mb-8 h-44 animate-slide-up" style={{ animationDelay: '80ms' }}>
        {[1, 0, 2].map((podiumIdx, visualIdx) => {
          const entry = leaderboardData[podiumIdx];
          if (!entry) return null;
          const heights = ['h-36', 'h-28', 'h-24'];
          const sizes = ['text-4xl', 'text-3xl', 'text-3xl'];
          return (
            <div key={entry.rank} className="flex flex-col items-center">
              <span className={`${sizes[visualIdx]} mb-2`}>{entry.avatar}</span>
              <p className="font-display font-bold text-xs text-foreground truncate max-w-[80px]">{entry.name}</p>
              <p className="text-xs text-muted-foreground font-body mb-1">{entry.score.toLocaleString()}</p>
              <div className={`${podiumColors[visualIdx]} w-20 ${heights[visualIdx]} rounded-t-xl flex items-start justify-center pt-2`}>
                <span className="font-display font-bold text-white text-lg">#{podiumIdx + 1}</span>
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
              className={`flex items-center gap-3 p-3 rounded-xl transition-all
                ${isUser ? 'bg-primary/10 border border-primary/20' : 'bg-card border border-border'}`}
            >
              <span className="w-8 text-center font-display font-bold text-foreground">{entry.rank}</span>
              <span className="text-xl">{entry.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-foreground truncate">{entry.name}</p>
                <p className={`text-xs font-display font-bold ${leagueColors[entry.league]}`}>
                  {entry.league.charAt(0).toUpperCase() + entry.league.slice(1)}
                </p>
              </div>
              <span className="font-display font-bold text-foreground">{entry.score.toLocaleString()}</span>
            </div>
          );
        })}

        {/* User's position if not in top 10 */}
        {userRank > 10 && (
          <>
            <div className="text-center text-muted-foreground py-2 font-body">• • •</div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <span className="w-8 text-center font-display font-bold text-foreground">{userRank}</span>
              <span className="text-xl">{profile.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-foreground truncate">{profile.name} (You)</p>
                <p className={`text-xs font-display font-bold ${leagueColors[profile.league]}`}>
                  {profile.league.charAt(0).toUpperCase() + profile.league.slice(1)}
                </p>
              </div>
              <span className="font-display font-bold text-foreground">{profile.stats.totalScore.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
