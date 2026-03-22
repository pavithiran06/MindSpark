import { Sector, Level, Question } from './types';

const physicsQuestions: Question[][] = [
  [
    { id: 'p1q1', question: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctIndex: 1, explanation: 'The Newton (N) is the SI unit of force, named after Sir Isaac Newton.' },
    { id: 'p1q2', question: 'Which law states that every action has an equal and opposite reaction?', options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"], correctIndex: 2 },
    { id: 'p1q3', question: 'What is the speed of light in vacuum?', options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], correctIndex: 1 },
    { id: 'p1q4', question: 'What type of energy does a moving car have?', options: ['Potential', 'Kinetic', 'Thermal', 'Chemical'], correctIndex: 1 },
    { id: 'p1q5', question: 'What instrument measures electric current?', options: ['Voltmeter', 'Ammeter', 'Ohmmeter', 'Barometer'], correctIndex: 1 },
  ],
  [
    { id: 'p2q1', question: 'What is the formula for kinetic energy?', options: ['½mv²', 'mgh', 'Fd', 'mv'], correctIndex: 0 },
    { id: 'p2q2', question: 'Which particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Photon'], correctIndex: 2 },
    { id: 'p2q3', question: 'What does a prism do to white light?', options: ['Absorbs it', 'Reflects it', 'Disperses it into colors', 'Amplifies it'], correctIndex: 2 },
    { id: 'p2q4', question: 'What is the unit of electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctIndex: 2 },
    { id: 'p2q5', question: 'Sound cannot travel through which medium?', options: ['Water', 'Air', 'Steel', 'Vacuum'], correctIndex: 3 },
  ],
  [
    { id: 'p3q1', question: 'What is the acceleration due to gravity on Earth?', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '7.8 m/s²'], correctIndex: 1 },
    { id: 'p3q2', question: 'Which electromagnetic wave has the shortest wavelength?', options: ['Radio', 'Microwave', 'X-ray', 'Gamma ray'], correctIndex: 3 },
    { id: 'p3q3', question: 'What is Ohm\'s Law?', options: ['V = IR', 'F = ma', 'E = mc²', 'P = IV'], correctIndex: 0 },
    { id: 'p3q4', question: 'What causes a rainbow?', options: ['Reflection only', 'Refraction and dispersion', 'Diffraction', 'Polarization'], correctIndex: 1 },
    { id: 'p3q5', question: 'Which force keeps planets in orbit?', options: ['Magnetic', 'Nuclear', 'Gravitational', 'Electromagnetic'], correctIndex: 2 },
  ],
];

const chemistryQuestions: Question[][] = [
  [
    { id: 'c1q1', question: 'What is the chemical symbol for water?', options: ['HO', 'H₂O', 'H₂O₂', 'OH'], correctIndex: 1 },
    { id: 'c1q2', question: 'How many elements are in the periodic table (as of 2024)?', options: ['112', '118', '120', '108'], correctIndex: 1 },
    { id: 'c1q3', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correctIndex: 2 },
    { id: 'c1q4', question: 'What is the pH of pure water?', options: ['5', '7', '9', '14'], correctIndex: 1 },
    { id: 'c1q5', question: 'Which element is the most abundant in Earth\'s crust?', options: ['Iron', 'Silicon', 'Oxygen', 'Aluminum'], correctIndex: 2 },
  ],
  [
    { id: 'c2q1', question: 'What type of bond involves sharing of electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correctIndex: 1 },
    { id: 'c2q2', question: 'What is the atomic number of Carbon?', options: ['4', '6', '8', '12'], correctIndex: 1 },
    { id: 'c2q3', question: 'Which acid is found in vinegar?', options: ['Citric acid', 'Acetic acid', 'Sulfuric acid', 'Lactic acid'], correctIndex: 1 },
    { id: 'c2q4', question: 'What is the lightest element?', options: ['Helium', 'Lithium', 'Hydrogen', 'Carbon'], correctIndex: 2 },
    { id: 'c2q5', question: 'Rust is formed by the reaction of iron with:', options: ['Nitrogen', 'Carbon dioxide', 'Oxygen and water', 'Helium'], correctIndex: 2 },
  ],
  [
    { id: 'c3q1', question: 'What is Avogadro\'s number?', options: ['6.022×10²³', '3.14×10²³', '6.022×10²⁶', '9.81×10²³'], correctIndex: 0 },
    { id: 'c3q2', question: 'Which noble gas is used in neon signs?', options: ['Helium', 'Argon', 'Neon', 'Krypton'], correctIndex: 2 },
    { id: 'c3q3', question: 'What is the process of a solid turning directly into gas?', options: ['Evaporation', 'Sublimation', 'Condensation', 'Deposition'], correctIndex: 1 },
    { id: 'c3q4', question: 'Diamond and graphite are both made of:', options: ['Silicon', 'Carbon', 'Iron', 'Sulfur'], correctIndex: 1 },
    { id: 'c3q5', question: 'Which metal is liquid at room temperature?', options: ['Lead', 'Tin', 'Mercury', 'Gallium'], correctIndex: 2 },
  ],
];

const biologyQuestions: Question[][] = [
  [
    { id: 'b1q1', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correctIndex: 2 },
    { id: 'b1q2', question: 'What pigment makes plants green?', options: ['Melanin', 'Chlorophyll', 'Carotene', 'Hemoglobin'], correctIndex: 1 },
    { id: 'b1q3', question: 'DNA stands for:', options: ['Dioxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Dynamic Natural Acid', 'Di-Nucleotide Acid'], correctIndex: 1 },
    { id: 'b1q4', question: 'How many chromosomes do humans have?', options: ['23', '44', '46', '48'], correctIndex: 2 },
    { id: 'b1q5', question: 'Which organ pumps blood through the body?', options: ['Liver', 'Brain', 'Lungs', 'Heart'], correctIndex: 3 },
  ],
  [
    { id: 'b2q1', question: 'What is the largest organ of the human body?', options: ['Liver', 'Brain', 'Skin', 'Intestine'], correctIndex: 2 },
    { id: 'b2q2', question: 'What type of cell division produces gametes?', options: ['Mitosis', 'Meiosis', 'Binary fission', 'Budding'], correctIndex: 1 },
    { id: 'b2q3', question: 'Which blood type is the universal donor?', options: ['A+', 'B+', 'AB+', 'O-'], correctIndex: 3 },
    { id: 'b2q4', question: 'Photosynthesis occurs in which organelle?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Vacuole'], correctIndex: 2 },
    { id: 'b2q5', question: 'What carries genetic information from DNA to ribosomes?', options: ['tRNA', 'mRNA', 'rRNA', 'DNA polymerase'], correctIndex: 1 },
  ],
  [
    { id: 'b3q1', question: 'What is the study of fungi called?', options: ['Virology', 'Mycology', 'Botany', 'Zoology'], correctIndex: 1 },
    { id: 'b3q2', question: 'Which vitamin is produced by the skin in sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], correctIndex: 3 },
    { id: 'b3q3', question: 'What enzyme breaks down starch in saliva?', options: ['Pepsin', 'Lipase', 'Amylase', 'Trypsin'], correctIndex: 2 },
    { id: 'b3q4', question: 'Red blood cells are produced in the:', options: ['Liver', 'Bone marrow', 'Spleen', 'Kidneys'], correctIndex: 1 },
    { id: 'b3q5', question: 'What is the functional unit of the kidney?', options: ['Alveolus', 'Nephron', 'Neuron', 'Villus'], correctIndex: 1 },
  ],
];

const earthSpaceQuestions: Question[][] = [
  [
    { id: 'e1q1', question: 'What is the closest star to Earth?', options: ['Proxima Centauri', 'Sirius', 'The Sun', 'Alpha Centauri'], correctIndex: 2 },
    { id: 'e1q2', question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctIndex: 1 },
    { id: 'e1q3', question: 'What is the hardest mineral on the Mohs scale?', options: ['Quartz', 'Topaz', 'Corundum', 'Diamond'], correctIndex: 3 },
    { id: 'e1q4', question: 'What causes tides on Earth?', options: ['Wind', 'Moon\'s gravity', 'Earth\'s rotation', 'Solar flares'], correctIndex: 1 },
    { id: 'e1q5', question: 'Which layer of Earth\'s atmosphere do we live in?', options: ['Stratosphere', 'Mesosphere', 'Troposphere', 'Thermosphere'], correctIndex: 2 },
  ],
  [
    { id: 'e2q1', question: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correctIndex: 2 },
    { id: 'e2q2', question: 'What type of rock is formed from cooled lava?', options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'], correctIndex: 2 },
    { id: 'e2q3', question: 'The ozone layer protects us from:', options: ['Infrared rays', 'UV radiation', 'Cosmic rays', 'Radio waves'], correctIndex: 1 },
    { id: 'e2q4', question: 'What is a light-year a measure of?', options: ['Time', 'Speed', 'Distance', 'Brightness'], correctIndex: 2 },
    { id: 'e2q5', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correctIndex: 1 },
  ],
  [
    { id: 'e3q1', question: 'What is the core of the Earth primarily made of?', options: ['Silicon', 'Magnesium', 'Iron and nickel', 'Carbon'], correctIndex: 2 },
    { id: 'e3q2', question: 'What galaxy do we live in?', options: ['Andromeda', 'Milky Way', 'Triangulum', 'Sombrero'], correctIndex: 1 },
    { id: 'e3q3', question: 'What scale measures earthquake magnitude?', options: ['Beaufort', 'Richter', 'Kelvin', 'Decibel'], correctIndex: 1 },
    { id: 'e3q4', question: 'How long does it take light from the Sun to reach Earth?', options: ['1 minute', '8 minutes', '1 hour', '24 hours'], correctIndex: 1 },
    { id: 'e3q5', question: 'What is the name of the largest moon of Saturn?', options: ['Europa', 'Ganymede', 'Titan', 'Io'], correctIndex: 2 },
  ],
];

const generalQuestions: Question[][] = [
  [
    { id: 'g1q1', question: 'Who developed the theory of relativity?', options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Galileo Galilei'], correctIndex: 1 },
    { id: 'g1q2', question: 'What does DNA look like?', options: ['Single helix', 'Double helix', 'Triple helix', 'Flat ribbon'], correctIndex: 1 },
    { id: 'g1q3', question: 'What temperature does water boil at (°C)?', options: ['90°C', '95°C', '100°C', '110°C'], correctIndex: 2 },
    { id: 'g1q4', question: 'Which scientist discovered penicillin?', options: ['Louis Pasteur', 'Alexander Fleming', 'Marie Curie', 'Robert Koch'], correctIndex: 1 },
    { id: 'g1q5', question: 'What is the chemical formula for table salt?', options: ['NaOH', 'NaCl', 'KCl', 'CaCl₂'], correctIndex: 1 },
  ],
  [
    { id: 'g2q1', question: 'How many bones does an adult human have?', options: ['196', '206', '216', '186'], correctIndex: 1 },
    { id: 'g2q2', question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], correctIndex: 2 },
    { id: 'g2q3', question: 'Who proposed the heliocentric model?', options: ['Ptolemy', 'Copernicus', 'Kepler', 'Galileo'], correctIndex: 1 },
    { id: 'g2q4', question: 'What is absolute zero in Celsius?', options: ['-273.15°C', '-100°C', '-459.67°C', '0°C'], correctIndex: 0 },
    { id: 'g2q5', question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'], correctIndex: 1 },
  ],
  [
    { id: 'g3q1', question: 'What particle is responsible for electromagnetic force?', options: ['Gluon', 'Photon', 'W boson', 'Graviton'], correctIndex: 1 },
    { id: 'g3q2', question: 'What is the half-life of Carbon-14?', options: ['2,730 years', '5,730 years', '11,460 years', '1,000 years'], correctIndex: 1 },
    { id: 'g3q3', question: 'Who is known as the father of modern chemistry?', options: ['Dalton', 'Lavoisier', 'Mendeleev', 'Boyle'], correctIndex: 1 },
    { id: 'g3q4', question: 'What is the study of weather called?', options: ['Geology', 'Astronomy', 'Meteorology', 'Oceanography'], correctIndex: 2 },
    { id: 'g3q5', question: 'Which organ is responsible for filtering blood?', options: ['Liver', 'Heart', 'Kidneys', 'Lungs'], correctIndex: 2 },
  ],
];

function buildLevels(questions: Question[][], difficulties: Difficulty[]): Level[] {
  return questions.map((qs, i) => ({
    id: i + 1,
    title: `Level ${i + 1}`,
    difficulty: difficulties[i] || 'hard',
    questions: qs,
    xpReward: (i + 1) * 50,
  }));
}

import { Difficulty } from './types';

export const sectors: Sector[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    description: 'Forces, energy, and the laws of the universe',
    levels: buildLevels(physicsQuestions, ['easy', 'medium', 'hard']),
    colorClass: 'text-physics',
    bgGradient: 'sector-physics',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    description: 'Elements, reactions, and molecular structures',
    levels: buildLevels(chemistryQuestions, ['easy', 'medium', 'hard']),
    colorClass: 'text-chemistry',
    bgGradient: 'sector-chemistry',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    description: 'Life, cells, and the living world',
    levels: buildLevels(biologyQuestions, ['easy', 'medium', 'hard']),
    colorClass: 'text-biology',
    bgGradient: 'sector-biology',
  },
  {
    id: 'earth-space',
    name: 'Earth & Space',
    icon: '🌍',
    description: 'Our planet, the cosmos, and beyond',
    levels: buildLevels(earthSpaceQuestions, ['easy', 'medium', 'hard']),
    colorClass: 'text-earth-space',
    bgGradient: 'sector-earth',
  },
  {
    id: 'general',
    name: 'General Science',
    icon: '🔬',
    description: 'Cross-disciplinary scientific knowledge',
    levels: buildLevels(generalQuestions, ['easy', 'medium', 'hard']),
    colorClass: 'text-general',
    bgGradient: 'sector-general',
  },
];
