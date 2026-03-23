import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ArrowLeft, Lock, CheckCircle2, Star, Atom, FlaskConical, Leaf, Globe, BookOpen, Sparkles } from 'lucide-react';

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
  if (!sector) return <div className="p-8 text-center font-display">Sector not found</div>;

  const SectorIcon = sectorIcons[sector.id] || BookOpen;
  const completedCount = sector.levels.filter(l => isLevelCompleted(sector.id, l.id)).length;
  const progress = Math.round((completedCount / sector.levels.length) * 100);

  // Find first incomplete level to auto-scroll
  const firstIncomplete = sector.levels.find(l => !isLevelCompleted(sector.id, l.id) && isLevelUnlocked(sector.id, l.id));

  useEffect(() => {
    if (firstIncomplete && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-level="${firstIncomplete.id}"]`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    }
  }, [firstIncomplete]);

  // Get stars for completed level
  const getLevelStars = (sectorId: string, levelId: number): number => {
    const key = `sciquest-stars-${sectorId}-${levelId}`;
    const saved = localStorage.getItem(key);
    return saved ? parseInt(saved) : 0;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className={`${sector.bgGradient} px-5 pt-6 pb-12 relative overflow-hidden`}>
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-white/70 mb-5 press-effect hover:text-white/90 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body font-bold text-sm">Back</span>
        </button>
        <div className="relative z-10 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <SectorIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display font-bold text-3xl text-white leading-tight">{sector.name}</h1>
              <p className="text-white/60 font-body text-sm mt-0.5">{sector.description}</p>
            </div>
          </div>
          {/* Progress */}
          <div className="mt-5 bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 font-body text-xs font-bold">Progress</span>
              <span className="text-white font-display font-bold text-sm">{completedCount}/{sector.levels.length} levels</span>
            </div>
            <div className="h-3 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/8 rounded-full" />
        <div className="absolute right-20 -top-8 w-28 h-28 bg-white/5 rounded-full" />
      </div>

      {/* Game Path Level Map */}
      <div ref={scrollRef} className="px-5 -mt-6 relative">
        {/* Connecting path line */}
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
                        ? 'bg-correct/5 border-correct/20 shadow-[0_2px_12px_hsl(var(--correct)/0.08)]'
                        : isCurrent
                          ? 'bg-primary/5 border-primary/30 shadow-[0_4px_20px_hsl(var(--primary)/0.12)] ring-2 ring-primary/20'
                          : unlocked
                            ? 'bg-card border-border/60 hover:shadow-lg'
                            : 'bg-muted/50 border-border/30 opacity-50'
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
                        {/* Stars */}
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
                      ? 'bg-primary border-primary/30 animate-pulse'
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
