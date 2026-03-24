import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ArrowLeft, Lock, CheckCircle2, Star, Atom, FlaskConical, Leaf, Globe, BookOpen, Sparkles, Zap, Flame, Trophy } from 'lucide-react';

const sectorIcons: Record<string, React.ElementType> = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
  'earth-space': Globe,
  general: BookOpen,
};

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-correct/15 text-correct' },
  medium: { label: 'Medium', color: 'bg-xp/15 text-xp' },
  hard: { label: 'Hard', color: 'bg-wrong/15 text-wrong' },
};

export default function SectorPage() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const { isLevelUnlocked, isLevelCompleted, profile } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);

  const sector = sectors.find(s => s.id === sectorId);
  const SectorIcon = sector ? (sectorIcons[sector.id] || BookOpen) : BookOpen;
  const completedCount = sector ? sector.levels.filter(l => isLevelCompleted(sector.id, l.id)).length : 0;
  const progress = sector ? Math.round((completedCount / sector.levels.length) * 100) : 0;
  const firstIncomplete = sector?.levels.find(l => !isLevelCompleted(sector.id, l.id) && isLevelUnlocked(sector.id, l.id));

  useEffect(() => {
    if (firstIncomplete && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-level="${firstIncomplete.id}"]`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    }
  }, [firstIncomplete]);

  if (!sector) return <div className="p-8 text-center font-display text-foreground">Sector not found</div>;

  const getLevelStars = (sectorId: string, levelId: number): number => {
    const key = `mindspark-stars-${sectorId}-${levelId}`;
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved) : 0;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className={`${sector.bgGradient} px-5 pt-6 pb-14 relative overflow-hidden`}>
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-white/70 mb-5 press-effect hover:text-white/90 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body font-bold text-sm">Back</span>
        </button>
        <div className="relative z-10 animate-slide-up">
          <p className="text-white/50 font-body text-xs font-bold uppercase tracking-widest mb-2">Welcome to MindSpark</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10 animate-float">
              <SectorIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display font-bold text-3xl text-white leading-tight">{sector.name}</h1>
              <p className="text-white/60 font-body text-sm mt-0.5">{sector.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 relative z-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10 text-center">
            <p className="font-display font-bold text-xl text-white">{completedCount}/{sector.levels.length}</p>
            <p className="text-white/50 text-[10px] font-body font-bold">Levels</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10 text-center">
            <p className="font-display font-bold text-xl text-white flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-streak" />{profile.dailyStreak}
            </p>
            <p className="text-white/50 text-[10px] font-body font-bold">Streak</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10 text-center">
            <p className="font-display font-bold text-xl text-white flex items-center justify-center gap-1">
              <Trophy className="w-4 h-4 text-xp" />{progress}%
            </p>
            <p className="text-white/50 text-[10px] font-body font-bold">Complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 relative z-10 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="h-3 bg-white/15 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/8 rounded-full" />
        <div className="absolute right-20 -top-8 w-28 h-28 bg-white/5 rounded-full" />
      </div>

      {/* Action Buttons */}
      {firstIncomplete && (
        <div className="px-5 -mt-6 mb-4 relative z-20 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => navigate(`/quiz/${sector.id}/${firstIncomplete.id}`)}
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-base py-4 rounded-2xl press-effect glow-primary flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" /> Continue Learning
          </button>
        </div>
      )}

      {/* Game Path Level Map */}
      <div ref={scrollRef} className="px-5 mt-2 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/40 -translate-x-1/2 z-0" />

        <div className="relative z-10 space-y-1">
          {sector.levels.map((level, idx) => {
            const unlocked = isLevelUnlocked(sector.id, level.id);
            const completed = isLevelCompleted(sector.id, level.id);
            const isCurrent = unlocked && !completed;
            const stars = getLevelStars(sector.id, level.id);
            const isLeft = idx % 2 === 0;
            const diff = difficultyConfig[level.difficulty];

            return (
              <div
                key={level.id}
                data-level={level.id}
                className={`flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Card side */}
                <div className={`flex-1 ${isLeft ? 'pr-4' : 'pl-4'}`}>
                  <button
                    onClick={() => unlocked && navigate(`/quiz/${sector.id}/${level.id}`)}
                    disabled={!unlocked}
                    className={`w-full rounded-2xl p-4 transition-all duration-300 press-effect border-2 text-left
                      ${completed
                        ? 'bg-correct/5 border-correct/20 shadow-[0_2px_12px_hsl(var(--correct)/0.1)]'
                        : isCurrent
                          ? 'glass border-primary/30 shadow-[0_4px_20px_hsl(var(--primary)/0.15)] ring-2 ring-primary/20'
                          : unlocked
                            ? 'glass hover:shadow-lg hover:shadow-primary/10'
                            : 'bg-muted/30 border-border/30 opacity-40'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-lg
                        ${completed ? 'bg-correct/10 text-correct' : isCurrent ? 'bg-primary/10 text-primary' : unlocked ? 'bg-secondary text-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {completed ? <CheckCircle2 className="w-5 h-5" /> : unlocked ? level.id : <Lock className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-sm text-foreground truncate">{level.title}</h3>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-display font-bold uppercase ${diff.color}`}>
                            {diff.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">
                          {level.questions.length} Q · <span className="text-xp font-bold">+{level.xpReward} XP</span>
                        </p>
                        {completed && (
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3].map(s => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= stars ? 'text-xp fill-xp' : 'text-border'}`} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-primary font-display font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5" /> Play Now
                      </div>
                    )}
                  </button>
                </div>

                {/* Center node */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4
                  ${completed
                    ? 'bg-correct border-correct/30'
                    : isCurrent
                      ? 'bg-gradient-to-br from-primary to-accent border-primary/30 glow-primary'
                      : unlocked
                        ? 'bg-card border-border'
                        : 'bg-muted border-border/40'
                  }`}>
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <span className={`font-display font-bold text-xs ${isCurrent ? 'text-white' : unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {level.id}
                    </span>
                  )}
                </div>

                {/* Empty side */}
                <div className="flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}