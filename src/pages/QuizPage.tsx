import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sectors } from '@/data/questions';
import { useGame } from '@/context/GameContext';
import { QuizState } from '@/data/types';
import { X, Zap, Clock, Snowflake } from 'lucide-react';

const QUESTION_TIME = 20;

export default function QuizPage() {
  const { sectorId, levelId } = useParams<{ sectorId: string; levelId: string }>();
  const navigate = useNavigate();
  const { completeLevel } = useGame();

  const sector = sectors.find(s => s.id === sectorId);
  const level = sector?.levels.find(l => l.id === Number(levelId));

  const [quiz, setQuiz] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctCount: 0,
    timeLeft: QUESTION_TIME,
    answers: [],
    powerUps: { fiftyFifty: 2, freezeTime: 1 },
    eliminatedOptions: [],
    isTimeFrozen: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = level?.questions || [];
  const current = questions[quiz.currentQuestion];
  const progress = ((quiz.currentQuestion) / questions.length) * 100;

  // Timer
  useEffect(() => {
    if (showResult || isComplete || quiz.isTimeFrozen) return;
    if (quiz.timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setTimeout(() => setQuiz(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 })), 1000);
    return () => clearTimeout(timer);
  }, [quiz.timeLeft, showResult, isComplete, quiz.isTimeFrozen]);

  const handleAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === current?.correctIndex;
    const streakBonus = isCorrect ? quiz.streak : 0;
    const timeBonus = isCorrect ? Math.floor(quiz.timeLeft * 2) : 0;
    const basePoints = isCorrect ? 100 : 0;
    const multiplier = 1 + streakBonus * 0.25;
    const points = Math.round((basePoints + timeBonus) * multiplier);

    setQuiz(prev => ({
      ...prev,
      score: prev.score + points,
      streak: isCorrect ? prev.streak + 1 : 0,
      maxStreak: Math.max(prev.maxStreak, isCorrect ? prev.streak + 1 : prev.maxStreak),
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      answers: [...prev.answers, index],
    }));

    setTimeout(() => {
      if (quiz.currentQuestion + 1 >= questions.length) {
        setIsComplete(true);
      } else {
        setQuiz(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          timeLeft: QUESTION_TIME,
          eliminatedOptions: [],
          isTimeFrozen: false,
        }));
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  }, [showResult, current, quiz.streak, quiz.timeLeft, quiz.currentQuestion, questions.length]);

  const handleFiftyFifty = () => {
    if (quiz.powerUps.fiftyFifty <= 0 || showResult || !current) return;
    const wrongIndices = current.options
      .map((_, i) => i)
      .filter(i => i !== current.correctIndex);
    const toRemove = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setQuiz(prev => ({
      ...prev,
      powerUps: { ...prev.powerUps, fiftyFifty: prev.powerUps.fiftyFifty - 1 },
      eliminatedOptions: toRemove,
    }));
  };

  const handleFreezeTime = () => {
    if (quiz.powerUps.freezeTime <= 0 || showResult) return;
    setQuiz(prev => ({
      ...prev,
      isTimeFrozen: true,
      powerUps: { ...prev.powerUps, freezeTime: prev.powerUps.freezeTime - 1 },
    }));
  };

  const handleFinish = () => {
    if (sector && level) {
      completeLevel(sector.id, level.id, quiz.score, quiz.correctCount, questions.length, quiz.maxStreak);
    }
    navigate(`/sector/${sectorId}`);
  };

  if (!sector || !level || !current) {
    return <div className="min-h-screen flex items-center justify-center bg-quiz-bg text-quiz-foreground">Loading...</div>;
  }

  // Complete screen
  if (isComplete) {
    const accuracy = Math.round((quiz.correctCount / questions.length) * 100);
    const stars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : accuracy > 0 ? 1 : 0;
    return (
      <div className="min-h-screen bg-quiz-bg flex flex-col items-center justify-center px-6 text-quiz-foreground">
        <div className="animate-bounce-in text-center">
          <div className="text-6xl mb-4">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '💪'}
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">
            {stars === 3 ? 'Perfect!' : stars === 2 ? 'Great Job!' : 'Keep Going!'}
          </h1>
          <p className="text-quiz-foreground/60 font-body mb-8">Level {level.id} Complete</p>

          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3].map(i => (
              <span key={i} className={`text-4xl transition-all duration-500 ${i <= stars ? 'animate-pop' : 'opacity-20'}`}
                style={{ animationDelay: `${i * 200}ms` }}>⭐</span>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-4 w-full max-w-xs backdrop-blur-sm">
            <div className="flex justify-between">
              <span className="text-quiz-foreground/60 font-body">Score</span>
              <span className="font-display font-bold text-xp">{quiz.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-quiz-foreground/60 font-body">Accuracy</span>
              <span className="font-display font-bold">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-quiz-foreground/60 font-body">Best Streak</span>
              <span className="font-display font-bold text-streak">🔥 {quiz.maxStreak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-quiz-foreground/60 font-body">XP Earned</span>
              <span className="font-display font-bold text-xp">+{quiz.score}</span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full max-w-xs bg-primary text-primary-foreground font-display font-bold text-lg py-4 rounded-2xl press-effect shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const timerColor = quiz.timeLeft <= 5 ? 'text-wrong' : quiz.isTimeFrozen ? 'text-earth-space' : 'text-quiz-foreground';

  return (
    <div className="min-h-screen bg-quiz-bg flex flex-col text-quiz-foreground">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3 animate-slide-up">
        <button onClick={() => navigate(`/sector/${sectorId}`)} className="press-effect">
          <X className="w-6 h-6 text-quiz-foreground/50" />
        </button>
        <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={`flex items-center gap-1 font-display font-bold ${timerColor} transition-colors`}>
          {quiz.isTimeFrozen && <Snowflake className="w-4 h-4" />}
          <Clock className="w-4 h-4" />
          <span>{quiz.timeLeft}</span>
        </div>
      </div>

      {/* Streak indicator */}
      {quiz.streak >= 2 && (
        <div className="px-4 animate-pop">
          <div className="flex items-center justify-center gap-1 text-streak font-display font-bold text-sm">
            🔥 {quiz.streak} Streak! ×{(1 + quiz.streak * 0.25).toFixed(2)} multiplier
          </div>
        </div>
      )}

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="animate-slide-up">
          <p className="text-sm text-quiz-foreground/40 font-body font-semibold mb-2 uppercase tracking-wider">
            Question {quiz.currentQuestion + 1} of {questions.length}
          </p>
          <h2 className="font-display text-2xl font-bold leading-snug mb-8">{current.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 stagger-children">
          {current.options.map((option, i) => {
            const isEliminated = quiz.eliminatedOptions.includes(i);
            const isSelected = selectedAnswer === i;
            const isCorrect = i === current.correctIndex;
            let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10';

            if (showResult) {
              if (isCorrect) optionStyle = 'bg-correct/20 border-correct';
              else if (isSelected && !isCorrect) optionStyle = 'bg-wrong/20 border-wrong animate-shake';
            } else if (isEliminated) {
              optionStyle = 'bg-white/2 border-white/5 opacity-30 pointer-events-none';
            }

            return (
              <button
                key={i}
                onClick={() => !isEliminated && handleAnswer(i)}
                disabled={showResult || isEliminated}
                className={`w-full text-left p-4 rounded-2xl border-2 font-body font-semibold text-base transition-all duration-200 press-effect ${optionStyle}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-display font-bold shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Power-ups */}
      <div className="px-4 pb-6 flex justify-center gap-4">
        <button
          onClick={handleFiftyFifty}
          disabled={quiz.powerUps.fiftyFifty <= 0 || showResult}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body font-bold text-sm press-effect disabled:opacity-30"
        >
          <Zap className="w-4 h-4 text-xp" />
          50/50 ({quiz.powerUps.fiftyFifty})
        </button>
        <button
          onClick={handleFreezeTime}
          disabled={quiz.powerUps.freezeTime <= 0 || showResult || quiz.isTimeFrozen}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body font-bold text-sm press-effect disabled:opacity-30"
        >
          <Snowflake className="w-4 h-4 text-earth-space" />
          Freeze ({quiz.powerUps.freezeTime})
        </button>
      </div>
    </div>
  );
}
