import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ArrowLeft, Lock, CheckCircle2, Circle, Atom, FlaskConical, Leaf, Globe, BookOpen } from 'lucide-react';

const difficultyColors = {
  easy: 'bg-correct/12 text-correct',
  medium: 'bg-xp/12 text-xp',
  hard: 'bg-wrong/12 text-wrong',
};

const sectorIcons: Record<string, React.ElementType> = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
  'earth-space': Globe,
  general: BookOpen,
};

export default function SectorPage() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const { isLevelUnlocked, isLevelCompleted } = useGame();

  const sector = sectors.find(s => s.id === sectorId);
  if (!sector) return <div className="p-8 text-center">Sector not found</div>;

  const SectorIcon = sectorIcons[sector.id] || BookOpen;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className={`${sector.bgGradient} px-5 pt-6 pb-10 relative overflow-hidden`}>
        <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-white/70 mb-5 press-effect hover:text-white/90 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body font-bold text-sm">Back</span>
        </button>
        <div className="relative z-10 animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3 backdrop-blur-sm">
            <SectorIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white leading-tight">{sector.name}</h1>
          <p className="text-white/70 font-body mt-1">{sector.description}</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/8 rounded-full" />
        <div className="absolute right-20 -top-6 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      {/* Levels */}
      <div className="px-5 -mt-5 stagger-children">
        {sector.levels.map((level, idx) => {
          const unlocked = isLevelUnlocked(sector.id, level.id);
          const completed = isLevelCompleted(sector.id, level.id);

          return (
            <button
              key={level.id}
              onClick={() => unlocked && navigate(`/quiz/${sector.id}/${level.id}`)}
              disabled={!unlocked}
              className={`w-full bg-card rounded-2xl p-4 mb-3 border shadow-[0_1px_4px_hsl(var(--foreground)/0.04)] flex items-center gap-4 press-effect transition-all duration-200
                ${unlocked ? 'border-border/60 hover:shadow-[0_4px_16px_hsl(var(--foreground)/0.08)]' : 'border-border/40 opacity-50'}
                ${completed ? 'border-correct/25' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                completed ? 'bg-correct/10' : unlocked ? 'bg-primary/8' : 'bg-muted'
              }`}>
                {completed ? (
                  <CheckCircle2 className="w-6 h-6 text-correct" />
                ) : unlocked ? (
                  <Circle className="w-6 h-6 text-primary" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-foreground">{level.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-display font-bold uppercase tracking-wide ${difficultyColors[level.difficulty]}`}>
                    {level.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body mt-0.5">
                  {level.questions.length} questions · <span className="text-xp font-bold">+{level.xpReward} XP</span>
                </p>
              </div>
              {completed && (
                <CheckCircle2 className="w-5 h-5 text-correct shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
