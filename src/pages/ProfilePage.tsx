import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, Target, Zap, Flame, BarChart3, CheckCircle2 } from 'lucide-react';

const avatars = ['🧑‍🔬', '👩‍🚀', '🧙', '🦸', '🧑‍💻', '👨‍🎓', '👩‍🔬', '🦹'];
const leagueConfig = {
  bronze: { label: 'Bronze League', color: 'text-bronze', bg: 'bg-bronze/10' },
  silver: { label: 'Silver League', color: 'text-silver', bg: 'bg-silver/10' },
  gold: { label: 'Gold League', color: 'text-gold', bg: 'bg-gold/10' },
};

export default function ProfilePage() {
  const { profile, updateProfile } = useGame();
  const league = leagueConfig[profile.league];

  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-6">
      {/* Avatar & Name */}
      <div className="text-center mb-6 animate-slide-up">
        <div className="text-6xl mb-3">{profile.avatar}</div>
        <h1 className="font-display text-2xl font-bold text-foreground">{profile.name}</h1>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${league.bg} mt-2`}>
          <Trophy className={`w-4 h-4 ${league.color}`} />
          <span className={`font-display font-bold text-sm ${league.color}`}>{league.label}</span>
        </div>
      </div>

      {/* Avatar selector */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '80ms' }}>
        <h3 className="font-display font-bold text-sm text-muted-foreground mb-2">Choose Avatar</h3>
        <div className="flex gap-2 flex-wrap">
          {avatars.map(a => (
            <button
              key={a}
              onClick={() => updateProfile({ avatar: a })}
              className={`text-2xl w-11 h-11 rounded-xl flex items-center justify-center press-effect transition-all
                ${profile.avatar === a ? 'bg-primary/15 ring-2 ring-primary' : 'bg-card border border-border'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* XP */}
      <div className="bg-card rounded-2xl p-4 border border-border mb-4 animate-slide-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-xp" />
          <span className="font-display font-bold text-foreground">Total XP</span>
          <span className="ml-auto font-display font-bold text-xl text-xp">{profile.xp}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-xp rounded-full animate-progress-fill" style={{ width: `${Math.min((profile.xp / 10000) * 100, 100)}%` }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up" style={{ animationDelay: '160ms' }}>
        {[
          { icon: <Target className="w-5 h-5 text-primary" />, label: 'Accuracy', value: `${profile.stats.accuracy}%` },
          { icon: <Flame className="w-5 h-5 text-streak" />, label: 'Best Streak', value: profile.stats.highestStreak },
          { icon: <BarChart3 className="w-5 h-5 text-earth-space" />, label: 'Total Score', value: profile.stats.totalScore.toLocaleString() },
          { icon: <CheckCircle2 className="w-5 h-5 text-correct" />, label: 'Levels Done', value: profile.stats.completedLevels },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-1">{stat.icon}<span className="text-xs text-muted-foreground font-body font-semibold">{stat.label}</span></div>
            <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="animate-slide-up" style={{ animationDelay: '240ms' }}>
        <h2 className="font-display font-bold text-lg text-foreground mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {profile.badges.map(badge => (
            <div
              key={badge.id}
              className={`bg-card rounded-xl p-3 border text-center transition-all
                ${badge.earned ? 'border-xp/30 shadow-sm' : 'border-border opacity-40'}`}
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <p className="font-display font-bold text-xs text-foreground leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
