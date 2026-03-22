import React from 'react';
import { useGame } from '@/context/GameContext';
import { Trophy, Target, Zap, Flame, BarChart3, CheckCircle2 } from 'lucide-react';

const avatars = ['🧑‍🔬', '👩‍🚀', '🧙', '🦸', '🧑‍💻', '👨‍🎓', '👩‍🔬', '🦹'];
const leagueConfig = {
  bronze: { label: 'Bronze', color: 'text-bronze', bg: 'bg-bronze/8' },
  silver: { label: 'Silver', color: 'text-silver', bg: 'bg-silver/8' },
  gold: { label: 'Gold', color: 'text-gold', bg: 'bg-xp/8' },
};

export default function ProfilePage() {
  const { profile, updateProfile } = useGame();
  const league = leagueConfig[profile.league];

  return (
    <div className="min-h-screen bg-background pb-24 px-5 pt-6">
      {/* Avatar & Name */}
      <div className="text-center mb-6 animate-slide-up">
        <div className="w-20 h-20 rounded-2xl bg-card border border-border/60 shadow-[0_4px_16px_hsl(var(--foreground)/0.06)] flex items-center justify-center mx-auto mb-3">
          <span className="text-4xl">{profile.avatar}</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">{profile.name}</h1>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${league.bg} mt-2`}>
          <Trophy className={`w-3.5 h-3.5 ${league.color}`} />
          <span className={`font-display font-bold text-xs ${league.color}`}>{league.label} League</span>
        </div>
      </div>

      {/* Avatar selector */}
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '80ms' }}>
        <h3 className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-2.5">Choose Avatar</h3>
        <div className="flex gap-2 flex-wrap">
          {avatars.map(a => (
            <button
              key={a}
              onClick={() => updateProfile({ avatar: a })}
              className={`text-2xl w-11 h-11 rounded-xl flex items-center justify-center press-effect transition-all duration-200
                ${profile.avatar === a ? 'bg-primary/10 ring-2 ring-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]' : 'bg-card border border-border/60 hover:shadow-md'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* XP */}
      <div className="bg-card rounded-2xl p-4 border border-border/60 mb-4 shadow-[0_2px_8px_hsl(var(--foreground)/0.04)] animate-slide-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-xp/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-xp" />
          </div>
          <span className="font-display font-bold text-foreground">Total XP</span>
          <span className="ml-auto font-display font-bold text-xl text-xp tabular-nums">{profile.xp.toLocaleString()}</span>
        </div>
        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-xp to-streak rounded-full animate-progress-fill" style={{ width: `${Math.min((profile.xp / 10000) * 100, 100)}%` }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up" style={{ animationDelay: '160ms' }}>
        {[
          { icon: Target, label: 'Accuracy', value: `${profile.stats.accuracy}%`, color: 'text-primary', bg: 'bg-primary/8' },
          { icon: Flame, label: 'Best Streak', value: profile.stats.highestStreak, color: 'text-streak', bg: 'bg-streak/8' },
          { icon: BarChart3, label: 'Total Score', value: profile.stats.totalScore.toLocaleString(), color: 'text-earth-space', bg: 'bg-earth-space/8' },
          { icon: CheckCircle2, label: 'Levels Done', value: profile.stats.completedLevels, color: 'text-correct', bg: 'bg-correct/8' },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border/60 shadow-[0_1px_4px_hsl(var(--foreground)/0.03)]">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2.5`}>
              <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
            </div>
            <p className="text-xs text-muted-foreground font-body font-semibold mb-0.5">{stat.label}</p>
            <p className="font-display font-bold text-xl text-foreground tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="animate-slide-up" style={{ animationDelay: '240ms' }}>
        <h2 className="font-display font-bold text-base text-foreground mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {profile.badges.map(badge => (
            <div
              key={badge.id}
              className={`bg-card rounded-2xl p-3.5 border text-center transition-all duration-200
                ${badge.earned ? 'border-xp/20 shadow-[0_2px_8px_hsl(var(--xp)/0.08)]' : 'border-border/40 opacity-35'}`}
            >
              <div className="text-2xl mb-1.5">{badge.icon}</div>
              <p className="font-display font-bold text-[11px] text-foreground leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
