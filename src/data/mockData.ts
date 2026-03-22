import { UserProfile, DailyMission, LeaderboardEntry } from './types';

export const defaultProfile: UserProfile = {
  name: 'Science Explorer',
  avatar: '🧑‍🔬',
  league: 'bronze',
  xp: 0,
  stats: {
    totalScore: 0,
    accuracy: 0,
    highestStreak: 0,
    completedLevels: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  },
  completedLevelIds: [],
  dailyStreak: 1,
  badges: [
    { id: 'first-quiz', name: 'First Steps', icon: '🎯', description: 'Complete your first quiz', earned: false },
    { id: 'streak-3', name: 'On Fire', icon: '🔥', description: 'Get a 3-answer streak', earned: false },
    { id: 'streak-5', name: 'Unstoppable', icon: '⚡', description: 'Get a 5-answer streak', earned: false },
    { id: 'perfect', name: 'Perfectionist', icon: '💎', description: 'Get 100% on a quiz', earned: false },
    { id: 'all-sectors', name: 'Renaissance', icon: '🌟', description: 'Complete a level in every sector', earned: false },
    { id: 'speed-demon', name: 'Speed Demon', icon: '⏱️', description: 'Finish a quiz with 50%+ time left', earned: false },
  ],
};

export const dailyMissions: DailyMission[] = [
  { id: 'm1', title: 'Quiz Starter', description: 'Complete 1 quiz today', target: 1, progress: 0, xpReward: 25, completed: false },
  { id: 'm2', title: 'Knowledge Seeker', description: 'Answer 10 questions correctly', target: 10, progress: 0, xpReward: 50, completed: false },
  { id: 'm3', title: 'Streak Master', description: 'Get a 3-answer streak', target: 3, progress: 0, xpReward: 75, completed: false },
];

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Nova Stellar', avatar: '👩‍🚀', score: 12450, league: 'gold' },
  { rank: 2, name: 'Atom Smasher', avatar: '🧑‍🔬', score: 11280, league: 'gold' },
  { rank: 3, name: 'Quantum Leap', avatar: '🦸', score: 10890, league: 'gold' },
  { rank: 4, name: 'Lab Wizard', avatar: '🧙', score: 9670, league: 'silver' },
  { rank: 5, name: 'Cell Explorer', avatar: '🔬', score: 8920, league: 'silver' },
  { rank: 6, name: 'Star Gazer', avatar: '🌟', score: 8450, league: 'silver' },
  { rank: 7, name: 'Proton Pete', avatar: '⚛️', score: 7300, league: 'silver' },
  { rank: 8, name: 'Bio Knight', avatar: '🛡️', score: 6780, league: 'bronze' },
  { rank: 9, name: 'Chem Queen', avatar: '👑', score: 5990, league: 'bronze' },
  { rank: 10, name: 'Physics Phil', avatar: '🎓', score: 5240, league: 'bronze' },
];
