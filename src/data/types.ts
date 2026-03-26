export type SectorId = 'physics' | 'chemistry' | 'biology' | 'earth-space' | 'general';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type League = 'bronze' | 'silver' | 'gold';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export interface Level {
  id: number;
  title: string;
  difficulty: Difficulty;
  questions: Question[];
  xpReward: number;
}

export interface Sector {
  id: SectorId;
  name: string;
  icon: string;
  description: string;
  levels: Level[];
  colorClass: string;
  bgGradient: string;
}

export interface UserStats {
  totalScore: number;
  accuracy: number;
  highestStreak: number;
  completedLevels: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  league: League;
  xp: number;
  stats: UserStats;
  completedLevelIds: string[]; // "sectorId-levelId"
  dailyStreak: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  timeLeft: number;
  answers: (number | null)[];
  powerUps: {
    fiftyFifty: number;
    freezeTime: number;
  };
  eliminatedOptions: number[];
  isTimeFrozen: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  league: League;
}
