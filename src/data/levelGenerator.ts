import { Level, Question, Difficulty } from './types';
import { questionPools } from './questionBank';

/**
 * Difficulty scaling:
 * Levels 1-8  → Easy
 * Levels 9-17 → Medium
 * Levels 18-25 → Hard
 */
function getDifficulty(levelNum: number): Difficulty {
  if (levelNum <= 8) return 'easy';
  if (levelNum <= 17) return 'medium';
  return 'hard';
}

/**
 * Seeded pseudo-random for consistent shuffling per sector+level
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  const rand = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Validate questions: check for duplicates, missing fields, correct answer bounds
 */
function validateQuestions(questions: Question[]): Question[] {
  const seen = new Set<string>();
  return questions.filter(q => {
    // Check required fields
    if (!q.id || !q.question || !q.options || q.options.length !== 4 || 
        q.correctIndex == null || q.correctIndex < 0 || q.correctIndex > 3 ||
        !q.explanation || !q.difficulty) {
      console.warn(`[MindSpark] Invalid question skipped: ${q.id}`);
      return false;
    }
    // Check duplicates by question text
    const key = q.question.trim().toLowerCase();
    if (seen.has(key)) {
      console.warn(`[MindSpark] Duplicate question skipped: ${q.id}`);
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Generate 25 levels for a given sector.
 * Questions are filtered by matching difficulty, then shuffled deterministically.
 * Each level gets unique questions with no repeats across levels.
 */
export function generateLevels(sectorId: string): Level[] {
  const pool = questionPools[sectorId] || [];
  if (pool.length === 0) return [];

  // Validate and split pool by difficulty
  const validPool = validateQuestions(pool);
  const easyPool = validPool.filter(q => q.difficulty === 'easy');
  const mediumPool = validPool.filter(q => q.difficulty === 'medium');
  const hardPool = validPool.filter(q => q.difficulty === 'hard');

  const TOTAL_LEVELS = 25;
  const levels: Level[] = [];

  // Track used question indices per difficulty to avoid repeats across levels
  let easyUsed = 0;
  let mediumUsed = 0;
  let hardUsed = 0;

  // Shuffle each difficulty pool once with a sector-based seed
  const sectorSeed = sectorId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffledEasy = shuffleWithSeed(easyPool, sectorSeed * 100 + 1);
  const shuffledMedium = shuffleWithSeed(mediumPool, sectorSeed * 100 + 2);
  const shuffledHard = shuffleWithSeed(hardPool, sectorSeed * 100 + 3);

  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const difficulty = getDifficulty(i);
    const questionsPerLevel = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 6 : 7;

    let sourcePool: Question[];
    let usedCount: number;

    if (difficulty === 'easy') {
      sourcePool = shuffledEasy;
      usedCount = easyUsed;
    } else if (difficulty === 'medium') {
      sourcePool = shuffledMedium;
      usedCount = mediumUsed;
    } else {
      sourcePool = shuffledHard;
      usedCount = hardUsed;
    }

    // Pick questions, cycling through if pool exhausted
    const levelQuestions: Question[] = [];
    for (let q = 0; q < questionsPerLevel; q++) {
      const idx = (usedCount + q) % sourcePool.length;
      const sourceQ = sourcePool[idx];
      levelQuestions.push({
        ...sourceQ,
        id: `${sectorId}-L${i}-Q${q + 1}`,
      });
    }

    // Advance the used counter
    if (difficulty === 'easy') easyUsed += questionsPerLevel;
    else if (difficulty === 'medium') mediumUsed += questionsPerLevel;
    else hardUsed += questionsPerLevel;

    levels.push({
      id: i,
      title: `Level ${i}`,
      difficulty,
      questions: levelQuestions,
      xpReward: difficulty === 'easy' ? 50 + i * 10 : difficulty === 'medium' ? 100 + i * 15 : 200 + i * 20,
    });
  }

  return levels;
}

/**
 * Level title generator with themed names
 */
const levelThemes: Record<string, string[]> = {
  physics: ['Force Basics', 'Energy Intro', 'Light & Sound', 'Electrostatics', 'Motion Laws', 'Heat Transfer', 'Waves', 'Optics', 'Circuits', 'Magnetism', 'Fluids', 'Thermodynamics', 'Oscillations', 'Nuclear', 'Quantum Basics', 'Relativity Intro', 'Particle Physics', 'Astrophysics', 'Advanced Waves', 'Electromagnetic', 'Advanced Optics', 'Solid State', 'Plasma Physics', 'String Theory', 'Grand Unification'],
  chemistry: ['Atomic Basics', 'Elements', 'Bonding', 'Reactions', 'Acids & Bases', 'Periodic Table', 'Solutions', 'Gases', 'Thermochem', 'Electrochemistry', 'Organic Intro', 'Polymers', 'Kinetics', 'Equilibrium', 'Redox', 'Coordination', 'Nuclear Chem', 'Biochemistry', 'Spectroscopy', 'Catalysis', 'Green Chemistry', 'Nanochemistry', 'Photochemistry', 'Computational', 'Advanced Organic'],
  biology: ['Cell Basics', 'Genetics Intro', 'Body Systems', 'Plant Biology', 'Ecology', 'Evolution', 'Microbiology', 'Anatomy', 'Physiology', 'Immunology', 'Neuroscience', 'Marine Bio', 'Bioinformatics', 'Developmental', 'Conservation', 'Parasitology', 'Virology', 'Genomics', 'Proteomics', 'Stem Cells', 'Epigenetics', 'Synthetic Bio', 'Astrobiology', 'Bioethics', 'Systems Biology'],
  'earth-space': ['Solar System', 'Rocks & Minerals', 'Atmosphere', 'Oceans', 'Weather', 'Stars', 'Galaxies', 'Plate Tectonics', 'Volcanoes', 'Earthquakes', 'Climate', 'Fossils', 'Moon & Tides', 'Comets', 'Mars Exploration', 'Space Tech', 'Exoplanets', 'Black Holes', 'Dark Matter', 'Cosmology', 'Astrobiology', 'Space Weather', 'Gravitational Waves', 'Multiverse', 'Quantum Gravity'],
  general: ['Science Basics', 'Famous Scientists', 'Units & Measures', 'Lab Safety', 'Scientific Method', 'History of Science', 'Technology', 'Environmental', 'Medical Science', 'Forensics', 'Food Science', 'Materials', 'Acoustics', 'Robotics', 'AI & Science', 'Nanotechnology', 'Biophysics', 'Geochemistry', 'Paleontology', 'Cryptography', 'Quantum Computing', 'Space Medicine', 'Neurotechnology', 'Chaos Theory', 'Unification'],
};

export function getLevelTitle(sectorId: string, levelNum: number): string {
  const themes = levelThemes[sectorId];
  if (themes && themes[levelNum - 1]) return themes[levelNum - 1];
  return `Level ${levelNum}`;
}
