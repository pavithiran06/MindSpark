import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile, SectorId } from '@/data/types';
import { defaultProfile } from '@/data/mockData';

interface GameContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeLevel: (sectorId: SectorId, levelId: number, score: number, correctCount: number, totalCount: number, maxStreak: number) => void;
  isLevelUnlocked: (sectorId: SectorId, levelId: number) => boolean;
  isLevelCompleted: (sectorId: SectorId, levelId: number) => boolean;
  usePowerUp: (type: 'fiftyFifty' | 'freezeTime') => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mindspark-profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const saveProfile = useCallback((p: UserProfile) => {
    setProfile(p);
    localStorage.setItem('mindspark-profile', JSON.stringify(p));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('mindspark-profile', JSON.stringify(next));
      return next;
    });
  }, []);

  const isLevelUnlocked = useCallback((sectorId: SectorId, levelId: number) => {
    if (levelId === 1) return true;
    return profile.completedLevelIds.includes(`${sectorId}-${levelId - 1}`);
  }, [profile.completedLevelIds]);

  const isLevelCompleted = useCallback((sectorId: SectorId, levelId: number) => {
    return profile.completedLevelIds.includes(`${sectorId}-${levelId}`);
  }, [profile.completedLevelIds]);

  const completeLevel = useCallback((sectorId: SectorId, levelId: number, score: number, correctCount: number, totalCount: number, maxStreak: number) => {
    setProfile(prev => {
      const levelKey = `${sectorId}-${levelId}`;
      const alreadyCompleted = prev.completedLevelIds.includes(levelKey);
      const newCompleted = alreadyCompleted ? prev.completedLevelIds : [...prev.completedLevelIds, levelKey];
      const totalCorrect = prev.stats.correctAnswers + correctCount;
      const totalQs = prev.stats.totalQuestions + totalCount;
      
      let league = prev.league;
      const newXp = prev.xp + score;
      if (newXp >= 5000) league = 'gold';
      else if (newXp >= 2000) league = 'silver';

      const badges = prev.badges.map(b => {
        if (b.id === 'first-quiz' && !b.earned) return { ...b, earned: true };
        if (b.id === 'streak-3' && maxStreak >= 3) return { ...b, earned: true };
        if (b.id === 'streak-5' && maxStreak >= 5) return { ...b, earned: true };
        if (b.id === 'perfect' && correctCount === totalCount) return { ...b, earned: true };
        return b;
      });

      const next: UserProfile = {
        ...prev,
        xp: newXp,
        league,
        badges,
        completedLevelIds: newCompleted,
        stats: {
          totalScore: prev.stats.totalScore + score,
          accuracy: totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0,
          highestStreak: Math.max(prev.stats.highestStreak, maxStreak),
          completedLevels: newCompleted.length,
          totalQuestions: totalQs,
          correctAnswers: totalCorrect,
        },
      };
      localStorage.setItem('mindspark-profile', JSON.stringify(next));
      return next;
    });
  }, []);

  const usePowerUp = useCallback((_type: 'fiftyFifty' | 'freezeTime') => {
    return true;
  }, []);

  return (
    <GameContext.Provider value={{ profile, updateProfile, completeLevel, isLevelUnlocked, isLevelCompleted, usePowerUp }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}