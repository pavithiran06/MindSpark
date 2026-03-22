import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { ArrowLeft, Lock, CheckCircle2, Circle } from 'lucide-react';

const difficultyColors = {
  easy: 'bg-correct/15 text-correct',
  medium: 'bg-xp/15 text-xp',
  hard: 'bg-wrong/15 text-wrong',
};

export default function SectorPage() {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const { isLevelUnlocked, isLevelCompleted } = useGame();

  const sector = sectors.find(s => s.id === sectorId);
  if (!sector) return <div className="p-8 text-center">Sector not found</div>;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className={`${sector.bgGradient} px-4 pt-6 pb-8 relative overflow-hidden`}>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 mb-4 press-effect">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body font-semibold text-sm">Back</span>
        </button>
        <div className="relative z-10 animate-slide-up">
          <span className="text-4xl mb-2 block">{sector.icon}</span>
          <h1 className="font-display font-bold text-3xl text-white leading-tight">{sector.name}</h1>
          <p className="text-white/80 font-body mt-1">{sector.description}</p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute right-16 -top-4 w-20 h-20 bg-white/5 rounded-full" />
      </div>

      {/* Levels */}
      <div className="px-4 -mt-4 stagger-children">
        {sector.levels.map(level => {
          const unlocked = isLevelUnlocked(sector.id, level.id);
          const completed = isLevelCompleted(sector.id, level.id);

          return (
            <button
              key={level.id}
              onClick={() => unlocked && navigate(`/quiz/${sector.id}/${level.id}`)}
              disabled={!unlocked}
              className={`w-full bg-card rounded-2xl p-4 mb-3 border shadow-sm flex items-center gap-4 press-effect transition-all duration-200
                ${unlocked ? 'border-border hover:shadow-md' : 'border-border opacity-60'}
                ${completed ? 'border-correct/30' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                completed ? 'bg-correct/15' : unlocked ? 'bg-primary/10' : 'bg-muted'
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
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body font-bold uppercase ${difficultyColors[level.difficulty]}`}>
                    {level.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {level.questions.length} questions · +{level.xpReward} XP
                </p>
              </div>
              {completed && (
                <span className="text-xs font-display font-bold text-correct">✓ Done</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
