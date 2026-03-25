import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { UserProfile, SectorId } from '@/data/types';
import { defaultProfile } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GameContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeLevel: (sectorId: SectorId, levelId: number, score: number, correctCount: number, totalCount: number, maxStreak: number) => void;
  isLevelUnlocked: (sectorId: SectorId, levelId: number) => boolean;
  isLevelCompleted: (sectorId: SectorId, levelId: number) => boolean;
  usePowerUp: (type: 'fiftyFifty' | 'freezeTime') => boolean;
  profileLoaded: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mindspark-profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load profile from Supabase when user logs in
  useEffect(() => {
    if (!user) {
      setProfileLoaded(true);
      return;
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        const loaded: UserProfile = {
          name: data.display_name || user.user_metadata?.full_name || 'Player',
          avatar: data.avatar_url || '🧠',
          league: (data.league as any) || 'bronze',
          xp: data.xp || 0,
          dailyStreak: data.daily_streak || 0,
          completedLevelIds: data.completed_level_ids || [],
          badges: defaultProfile.badges.map(b => ({
            ...b,
            earned: b.earned, // will be computed from progress
          })),
          stats: {
            totalScore: data.total_score || 0,
            accuracy: data.accuracy || 0,
            highestStreak: data.highest_streak || 0,
            completedLevels: data.completed_levels || 0,
            totalQuestions: data.total_questions || 0,
            correctAnswers: data.correct_answers || 0,
          },
        };
        setProfile(loaded);
        localStorage.setItem('mindspark-profile', JSON.stringify(loaded));
      }
      setProfileLoaded(true);
    };

    loadProfile();
  }, [user]);

  const saveToSupabase = useCallback(async (p: UserProfile) => {
    if (!user) return;
    await supabase
      .from('profiles')
      .update({
        display_name: p.name,
        avatar_url: p.avatar,
        xp: p.xp,
        league: p.league,
        daily_streak: p.dailyStreak,
        completed_level_ids: p.completedLevelIds,
        total_score: p.stats.totalScore,
        accuracy: p.stats.accuracy,
        highest_streak: p.stats.highestStreak,
        completed_levels: p.stats.completedLevels,
        total_questions: p.stats.totalQuestions,
        correct_answers: p.stats.correctAnswers,
      })
      .eq('user_id', user.id);
  }, [user]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('mindspark-profile', JSON.stringify(next));
      saveToSupabase(next);
      return next;
    });
  }, [saveToSupabase]);

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
      saveToSupabase(next);
      return next;
    });
  }, [saveToSupabase]);

  const usePowerUp = useCallback((_type: 'fiftyFifty' | 'freezeTime') => {
    return true;
  }, []);

  return (
    <GameContext.Provider value={{ profile, updateProfile, completeLevel, isLevelUnlocked, isLevelCompleted, usePowerUp, profileLoaded }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
