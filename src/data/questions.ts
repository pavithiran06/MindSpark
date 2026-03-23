import { Sector } from './types';
import { generateLevels, getLevelTitle } from './levelGenerator';

// Generate levels dynamically with themed titles
function buildSectorLevels(sectorId: string) {
  const levels = generateLevels(sectorId);
  return levels.map(l => ({
    ...l,
    title: getLevelTitle(sectorId, l.id),
  }));
}

export const sectors: Sector[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    description: 'Forces, energy, and the laws of the universe',
    levels: buildSectorLevels('physics'),
    colorClass: 'text-physics',
    bgGradient: 'sector-physics',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    description: 'Elements, reactions, and molecular structures',
    levels: buildSectorLevels('chemistry'),
    colorClass: 'text-chemistry',
    bgGradient: 'sector-chemistry',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Life, cells, and the living world',
    levels: buildSectorLevels('biology'),
    colorClass: 'text-biology',
    bgGradient: 'sector-biology',
  },
  {
    id: 'earth-space',
    name: 'Earth & Space',
    icon: '🌍',
    description: 'Our planet, the cosmos, and beyond',
    levels: buildSectorLevels('earth-space'),
    colorClass: 'text-earth-space',
    bgGradient: 'sector-earth',
  },
  {
    id: 'general',
    name: 'General Science',
    icon: '🔬',
    description: 'Cross-disciplinary scientific knowledge',
    levels: buildSectorLevels('general'),
    colorClass: 'text-general',
    bgGradient: 'sector-general',
  },
];
