import React from 'react';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { Trophy, Target, Zap, Flame, BarChart3, CheckCircle2, Star, TrendingUp, BookOpen, Brain, LogOut } from 'lucide-react';

const avatars = ['🧑‍🔬', '👩‍🚀', '🧙', '🦸', '🧑‍💻', '👨‍🎓', '👩‍🔬', '🦹', '🧑‍🏫', '👨‍⚕️', '🦊', '🐲'];
const leagueConfig = {
  bronze: { label: 'Bronze', color: 'text-bronze', bg: 'bg-bronze/10', gradient: 'from-bronze/20 to-transparent' },
  silver: { label: 'Silver', color: 'text-silver', bg: 'bg-silver/10', gradient: 'from-silver/20 to-transparent' },
  gold: { label: 'Gold', color: 'text-gold', bg: 'bg-xp/10', gradient: 'from-xp/20 to-transparent' },
};

export default function ProfilePage() {
  const { profile, updateProfile, isLevelCompleted } = useGame();
  const league = leagueConfig[profile.league];

  const sectorStats = sectors.map(s => {
    const completed = s.levels.filter(l => isLevelCompleted(s.id, l.id)).length;
    return { name: s.name, completed, total: s.levels.length, pct: Math.round((completed / s.levels.length) * 100) };
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className={`relative overflow-hidden bg-gradient-to-b ${league.gradient} px-5 pt-6 pb-8`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="text-center animate-slide-up relative z-10">
          <button
            onClick={() => {}}
            className="w-24 h-24 rounded-3xl glass flex items-center justify-center mx-auto mb-3 press-effect hover:shadow-[0_8px_32px_hsl(var(--primary)/0.15)] transition-shadow"
          >
            <span className="text-5xl">{profile.avatar}</span>
          </button>
          <h1 className="font-display text-2xl font-bold text-foreground">{profile.name}</h1>
          <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${league.bg} mt-2 border border-border/30`}>
            <Trophy className={`w-4 h-4 ${league.color}`} />
            <span className={`font-display font-bold text-xs ${league.color}`}>{league.label} League</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-2">
        {/* Avatar selector */}
        <div className="mb-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
          <h3 className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-2.5">Choose Avatar</h3>
          <div className="flex gap-2 flex-wrap">
            {avatars.map(a => (
              <button
                key={a}
                onClick={() => updateProfile({ avatar: a })}
                className={`text-2xl w-12 h-12 rounded-xl flex items-center justify-center press-effect transition-all duration-200
                  ${profile.avatar === a ? 'bg-primary/15 ring-2 ring-primary glow-primary' : 'glass hover:border-primary/30'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* XP Card */}
        <div className="glass rounded-2xl p-4 mb-4 animate-slide-up relative overflow-hidden" style={{ animationDelay: '120ms' }}>
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-xp/8 rounded-full blur-xl" />
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-xp/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-xp" />
            </div>
            <div className="flex-1">
              <span className="font-body text-xs text-muted-foreground font-semibold">Total XP</span>
              <p className="font-display font-bold text-2xl text-xp tabular-nums">{profile.xp.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-xp to-streak rounded-full animate-progress-fill" style={{ width: `${Math.min((profile.xp / 10000) * 100, 100)}%` }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 animate-slide-up" style={{ animationDelay: '160ms' }}>
          {[
            { icon: Target, label: 'Accuracy', value: `${profile.stats.accuracy}%`, color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Flame, label: 'Best Streak', value: `${profile.stats.highestStreak}`, color: 'text-streak', bg: 'bg-streak/10' },
            { icon: BarChart3, label: 'Total Score', value: profile.stats.totalScore.toLocaleString(), color: 'text-accent', bg: 'bg-accent/10' },
            { icon: CheckCircle2, label: 'Levels Done', value: `${profile.stats.completedLevels}/125`, color: 'text-correct', bg: 'bg-correct/10' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-2.5`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-muted-foreground font-body font-semibold mb-0.5">{stat.label}</p>
              <p className="font-display font-bold text-xl text-foreground tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Subject Progress */}
        <div className="mb-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Subject Progress
          </h2>
          <div className="space-y-2.5">
            {sectorStats.map(s => (
              <div key={s.name} className="glass rounded-2xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-foreground">{s.name}</span>
                  <span className="text-xs text-muted-foreground font-display font-bold tabular-nums">{s.completed}/{s.total}</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="animate-slide-up" style={{ animationDelay: '240ms' }}>
          <h2 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-xp" /> Badges
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {profile.badges.map(badge => (
              <div
                key={badge.id}
                className={`glass rounded-2xl p-3.5 text-center transition-all duration-200
                  ${badge.earned ? 'border-xp/25 shadow-[0_2px_12px_hsl(var(--xp)/0.15)]' : 'opacity-30 grayscale'}`}
              >
                <div className="text-3xl mb-1.5">{badge.icon}</div>
                <p className="font-display font-bold text-[11px] text-foreground leading-tight">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}