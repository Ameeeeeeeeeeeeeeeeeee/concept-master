// Ethiopian curriculum-aligned topic structure for Grades 9-12
export interface CurriculumTopic {
  title: string;
  slug: string;
  concepts: { title: string; slug: string }[];
}

export interface CurriculumSubject {
  name: string;
  slug: string;
  icon: string;
  color: string;
  topics: CurriculumTopic[];
}

export interface CurriculumGrade {
  number: number;
  label: string;
  subjects: CurriculumSubject[];
}

const englishTopics9: CurriculumTopic[] = [
  {
    title: "Parts of Speech",
    slug: "parts-of-speech",
    concepts: [
      { title: "Nouns and Pronouns", slug: "nouns-and-pronouns" },
      { title: "Verbs and Tenses", slug: "verbs-and-tenses" },
      { title: "Adjectives and Adverbs", slug: "adjectives-and-adverbs" },
      { title: "Prepositions and Conjunctions", slug: "prepositions-and-conjunctions" },
    ],
  },
  {
    title: "Sentence Structure",
    slug: "sentence-structure",
    concepts: [
      { title: "Simple Sentences", slug: "simple-sentences" },
      { title: "Compound Sentences", slug: "compound-sentences" },
      { title: "Complex Sentences", slug: "complex-sentences" },
      { title: "Active and Passive Voice", slug: "active-and-passive-voice" },
    ],
  },
  {
    title: "Reading Comprehension",
    slug: "reading-comprehension",
    concepts: [
      { title: "Main Idea and Details", slug: "main-idea-and-details" },
      { title: "Inference and Context Clues", slug: "inference-and-context-clues" },
      { title: "Summarizing Texts", slug: "summarizing-texts" },
    ],
  },
  {
    title: "Writing Skills",
    slug: "writing-skills",
    concepts: [
      { title: "Paragraph Writing", slug: "paragraph-writing" },
      { title: "Essay Structure", slug: "essay-structure" },
      { title: "Descriptive Writing", slug: "descriptive-writing" },
    ],
  },
];

const physicsTopics9: CurriculumTopic[] = [
  {
    title: "Measurements and Units",
    slug: "measurements-and-units",
    concepts: [
      { title: "SI Units", slug: "si-units" },
      { title: "Measurement Tools", slug: "measurement-tools" },
      { title: "Scientific Notation", slug: "scientific-notation" },
      { title: "Significant Figures", slug: "significant-figures" },
    ],
  },
  {
    title: "Motion in One Dimension",
    slug: "motion-in-one-dimension",
    concepts: [
      { title: "Distance and Displacement", slug: "distance-and-displacement" },
      { title: "Speed and Velocity", slug: "speed-and-velocity" },
      { title: "Acceleration", slug: "acceleration" },
      { title: "Equations of Motion", slug: "equations-of-motion" },
    ],
  },
  {
    title: "Forces",
    slug: "forces",
    concepts: [
      { title: "Newton's First Law", slug: "newtons-first-law" },
      { title: "Newton's Second Law", slug: "newtons-second-law" },
      { title: "Newton's Third Law", slug: "newtons-third-law" },
      { title: "Friction", slug: "friction" },
      { title: "Gravitational Force", slug: "gravitational-force" },
    ],
  },
  {
    title: "Work and Energy",
    slug: "work-and-energy",
    concepts: [
      { title: "Work Done by a Force", slug: "work-done-by-a-force" },
      { title: "Kinetic Energy", slug: "kinetic-energy" },
      { title: "Potential Energy", slug: "potential-energy" },
      { title: "Conservation of Energy", slug: "conservation-of-energy" },
    ],
  },
];

const chemistryTopics9: CurriculumTopic[] = [
  {
    title: "Introduction to Chemistry",
    slug: "introduction-to-chemistry",
    concepts: [
      { title: "What is Chemistry?", slug: "what-is-chemistry" },
      { title: "States of Matter", slug: "states-of-matter" },
      { title: "Physical and Chemical Changes", slug: "physical-and-chemical-changes" },
      { title: "Mixtures and Pure Substances", slug: "mixtures-and-pure-substances" },
    ],
  },
  {
    title: "Atomic Structure",
    slug: "atomic-structure",
    concepts: [
      { title: "Atoms and Subatomic Particles", slug: "atoms-and-subatomic-particles" },
      { title: "Atomic Number and Mass Number", slug: "atomic-number-and-mass" },
      { title: "Electron Configuration", slug: "electron-configuration" },
      { title: "Isotopes", slug: "isotopes" },
    ],
  },
  {
    title: "The Periodic Table",
    slug: "the-periodic-table",
    concepts: [
      { title: "Organization of the Periodic Table", slug: "organization-periodic-table" },
      { title: "Groups and Periods", slug: "groups-and-periods" },
      { title: "Metals, Nonmetals, and Metalloids", slug: "metals-nonmetals-metalloids" },
      { title: "Periodic Trends", slug: "periodic-trends" },
    ],
  },
  {
    title: "Chemical Bonding",
    slug: "chemical-bonding",
    concepts: [
      { title: "Ionic Bonds", slug: "ionic-bonds" },
      { title: "Covalent Bonds", slug: "covalent-bonds" },
      { title: "Metallic Bonds", slug: "metallic-bonds" },
      { title: "Properties of Compounds", slug: "properties-of-compounds" },
    ],
  },
];

const biologyTopics9: CurriculumTopic[] = [
  {
    title: "Introduction to Biology",
    slug: "introduction-to-biology",
    concepts: [
      { title: "What is Biology?", slug: "what-is-biology" },
      { title: "Characteristics of Living Things", slug: "characteristics-of-living-things" },
      { title: "Scientific Method", slug: "scientific-method" },
      { title: "Using a Microscope", slug: "using-a-microscope" },
    ],
  },
  {
    title: "Cell Biology",
    slug: "cell-biology",
    concepts: [
      { title: "Cell Theory", slug: "cell-theory" },
      { title: "Animal and Plant Cells", slug: "animal-and-plant-cells" },
      { title: "Cell Organelles", slug: "cell-organelles" },
      { title: "Cell Membrane and Transport", slug: "cell-membrane-and-transport" },
    ],
  },
  {
    title: "Ecology",
    slug: "ecology",
    concepts: [
      { title: "Ecosystems", slug: "ecosystems" },
      { title: "Food Chains and Food Webs", slug: "food-chains-and-food-webs" },
      { title: "Biomes of Ethiopia", slug: "biomes-of-ethiopia" },
      { title: "Conservation", slug: "conservation" },
    ],
  },
  {
    title: "Human Body Systems",
    slug: "human-body-systems",
    concepts: [
      { title: "Digestive System", slug: "digestive-system" },
      { title: "Respiratory System", slug: "respiratory-system" },
      { title: "Circulatory System", slug: "circulatory-system" },
      { title: "Nervous System", slug: "nervous-system" },
    ],
  },
];

// Grade 10 Topics
const physicsTopics10: CurriculumTopic[] = [
  {
    title: "Vectors",
    slug: "vectors",
    concepts: [
      { title: "Scalar and Vector Quantities", slug: "scalar-and-vector" },
      { title: "Vector Addition", slug: "vector-addition" },
      { title: "Vector Components", slug: "vector-components" },
      { title: "Resultant Vector", slug: "resultant-vector" },
    ],
  },
  {
    title: "Projectile Motion",
    slug: "projectile-motion",
    concepts: [
      { title: "Horizontal Projectile", slug: "horizontal-projectile" },
      { title: "Angled Projectile", slug: "angled-projectile" },
      { title: "Range and Maximum Height", slug: "range-and-maximum-height" },
    ],
  },
  {
    title: "Circular Motion",
    slug: "circular-motion",
    concepts: [
      { title: "Angular Velocity", slug: "angular-velocity" },
      { title: "Centripetal Force", slug: "centripetal-force" },
      { title: "Centripetal Acceleration", slug: "centripetal-acceleration" },
    ],
  },
  {
    title: "Waves and Sound",
    slug: "waves-and-sound",
    concepts: [
      { title: "Wave Properties", slug: "wave-properties" },
      { title: "Types of Waves", slug: "types-of-waves" },
      { title: "Sound Waves", slug: "sound-waves" },
      { title: "Doppler Effect", slug: "doppler-effect" },
    ],
  },
];

const chemistryTopics10: CurriculumTopic[] = [
  {
    title: "Chemical Reactions",
    slug: "chemical-reactions",
    concepts: [
      { title: "Types of Chemical Reactions", slug: "types-of-reactions" },
      { title: "Balancing Chemical Equations", slug: "balancing-equations" },
      { title: "Stoichiometry", slug: "stoichiometry" },
      { title: "Limiting Reagent", slug: "limiting-reagent" },
    ],
  },
  {
    title: "Acids and Bases",
    slug: "acids-and-bases",
    concepts: [
      { title: "Properties of Acids and Bases", slug: "properties-acids-bases" },
      { title: "pH Scale", slug: "ph-scale" },
      { title: "Neutralization Reactions", slug: "neutralization-reactions" },
      { title: "Indicators", slug: "indicators" },
    ],
  },
  {
    title: "Electrochemistry",
    slug: "electrochemistry",
    concepts: [
      { title: "Oxidation and Reduction", slug: "oxidation-and-reduction" },
      { title: "Electrochemical Cells", slug: "electrochemical-cells" },
      { title: "Electrolysis", slug: "electrolysis" },
    ],
  },
];

const biologyTopics10: CurriculumTopic[] = [
  {
    title: "Genetics",
    slug: "genetics",
    concepts: [
      { title: "DNA Structure", slug: "dna-structure" },
      { title: "Genes and Chromosomes", slug: "genes-and-chromosomes" },
      { title: "Mendelian Genetics", slug: "mendelian-genetics" },
      { title: "Genetic Crosses", slug: "genetic-crosses" },
    ],
  },
  {
    title: "Cell Division",
    slug: "cell-division",
    concepts: [
      { title: "Mitosis", slug: "mitosis" },
      { title: "Meiosis", slug: "meiosis" },
      { title: "Cell Cycle", slug: "cell-cycle" },
    ],
  },
  {
    title: "Evolution",
    slug: "evolution",
    concepts: [
      { title: "Natural Selection", slug: "natural-selection" },
      { title: "Adaptation", slug: "adaptation" },
      { title: "Evidence of Evolution", slug: "evidence-of-evolution" },
      { title: "Human Evolution", slug: "human-evolution" },
    ],
  },
];

const englishTopics10: CurriculumTopic[] = [
  {
    title: "Grammar Advanced",
    slug: "grammar-advanced",
    concepts: [
      { title: "Conditional Sentences", slug: "conditional-sentences" },
      { title: "Reported Speech", slug: "reported-speech" },
      { title: "Relative Clauses", slug: "relative-clauses" },
      { title: "Modal Verbs", slug: "modal-verbs" },
    ],
  },
  {
    title: "Literature",
    slug: "literature",
    concepts: [
      { title: "Poetry Analysis", slug: "poetry-analysis" },
      { title: "Short Story Elements", slug: "short-story-elements" },
      { title: "Character Analysis", slug: "character-analysis" },
      { title: "Theme and Symbolism", slug: "theme-and-symbolism" },
    ],
  },
  {
    title: "Academic Writing",
    slug: "academic-writing",
    concepts: [
      { title: "Argumentative Essay", slug: "argumentative-essay" },
      { title: "Research Writing", slug: "research-writing" },
      { title: "Citation and References", slug: "citation-and-references" },
    ],
  },
];

// Grade 11 Topics
const physicsTopics11: CurriculumTopic[] = [
  {
    title: "Thermodynamics",
    slug: "thermodynamics",
    concepts: [
      { title: "Temperature and Heat", slug: "temperature-and-heat" },
      { title: "Laws of Thermodynamics", slug: "laws-of-thermodynamics" },
      { title: "Heat Transfer", slug: "heat-transfer" },
      { title: "Thermal Expansion", slug: "thermal-expansion" },
    ],
  },
  {
    title: "Electricity",
    slug: "electricity",
    concepts: [
      { title: "Electric Charge", slug: "electric-charge" },
      { title: "Ohm's Law", slug: "ohms-law" },
      { title: "Series and Parallel Circuits", slug: "series-and-parallel-circuits" },
      { title: "Electrical Power", slug: "electrical-power" },
    ],
  },
  {
    title: "Magnetism",
    slug: "magnetism",
    concepts: [
      { title: "Magnetic Fields", slug: "magnetic-fields" },
      { title: "Electromagnetic Induction", slug: "electromagnetic-induction" },
      { title: "Transformers", slug: "transformers" },
    ],
  },
];

const chemistryTopics11: CurriculumTopic[] = [
  {
    title: "Organic Chemistry",
    slug: "organic-chemistry",
    concepts: [
      { title: "Hydrocarbons", slug: "hydrocarbons" },
      { title: "Alkanes and Alkenes", slug: "alkanes-and-alkenes" },
      { title: "Functional Groups", slug: "functional-groups" },
      { title: "Isomerism", slug: "isomerism" },
    ],
  },
  {
    title: "Chemical Kinetics",
    slug: "chemical-kinetics",
    concepts: [
      { title: "Rate of Reaction", slug: "rate-of-reaction" },
      { title: "Factors Affecting Rate", slug: "factors-affecting-rate" },
      { title: "Catalysts", slug: "catalysts" },
    ],
  },
  {
    title: "Chemical Equilibrium",
    slug: "chemical-equilibrium",
    concepts: [
      { title: "Equilibrium Constant", slug: "equilibrium-constant" },
      { title: "Le Chatelier's Principle", slug: "le-chateliers-principle" },
      { title: "Equilibrium Calculations", slug: "equilibrium-calculations" },
    ],
  },
];

const biologyTopics11: CurriculumTopic[] = [
  {
    title: "Plant Biology",
    slug: "plant-biology",
    concepts: [
      { title: "Photosynthesis", slug: "photosynthesis" },
      { title: "Plant Hormones", slug: "plant-hormones" },
      { title: "Plant Reproduction", slug: "plant-reproduction" },
      { title: "Transport in Plants", slug: "transport-in-plants" },
    ],
  },
  {
    title: "Animal Physiology",
    slug: "animal-physiology",
    concepts: [
      { title: "Homeostasis", slug: "homeostasis" },
      { title: "Excretory System", slug: "excretory-system" },
      { title: "Endocrine System", slug: "endocrine-system" },
      { title: "Immune System", slug: "immune-system" },
    ],
  },
  {
    title: "Microbiology",
    slug: "microbiology",
    concepts: [
      { title: "Bacteria", slug: "bacteria" },
      { title: "Viruses", slug: "viruses" },
      { title: "Fungi", slug: "fungi" },
      { title: "Disease Prevention", slug: "disease-prevention" },
    ],
  },
];

const englishTopics11: CurriculumTopic[] = [
  {
    title: "Advanced Grammar",
    slug: "advanced-grammar",
    concepts: [
      { title: "Subjunctive Mood", slug: "subjunctive-mood" },
      { title: "Participle Phrases", slug: "participle-phrases" },
      { title: "Inversion", slug: "inversion" },
      { title: "Cleft Sentences", slug: "cleft-sentences" },
    ],
  },
  {
    title: "Critical Reading",
    slug: "critical-reading",
    concepts: [
      { title: "Analyzing Arguments", slug: "analyzing-arguments" },
      { title: "Identifying Bias", slug: "identifying-bias" },
      { title: "Evaluating Sources", slug: "evaluating-sources" },
    ],
  },
  {
    title: "Creative Writing",
    slug: "creative-writing",
    concepts: [
      { title: "Narrative Techniques", slug: "narrative-techniques" },
      { title: "Dialogue Writing", slug: "dialogue-writing" },
      { title: "Figurative Language", slug: "figurative-language" },
    ],
  },
];

// Grade 12 Topics
const physicsTopics12: CurriculumTopic[] = [
  {
    title: "Modern Physics",
    slug: "modern-physics",
    concepts: [
      { title: "Quantum Mechanics Intro", slug: "quantum-mechanics-intro" },
      { title: "Photoelectric Effect", slug: "photoelectric-effect" },
      { title: "Nuclear Physics", slug: "nuclear-physics" },
      { title: "Radioactivity", slug: "radioactivity" },
    ],
  },
  {
    title: "Optics",
    slug: "optics",
    concepts: [
      { title: "Reflection and Refraction", slug: "reflection-and-refraction" },
      { title: "Lenses and Mirrors", slug: "lenses-and-mirrors" },
      { title: "Optical Instruments", slug: "optical-instruments" },
      { title: "Diffraction and Interference", slug: "diffraction-and-interference" },
    ],
  },
  {
    title: "Gravitation",
    slug: "gravitation",
    concepts: [
      { title: "Universal Gravitation", slug: "universal-gravitation" },
      { title: "Orbital Motion", slug: "orbital-motion" },
      { title: "Escape Velocity", slug: "escape-velocity" },
    ],
  },
];

const chemistryTopics12: CurriculumTopic[] = [
  {
    title: "Thermochemistry",
    slug: "thermochemistry",
    concepts: [
      { title: "Enthalpy Changes", slug: "enthalpy-changes" },
      { title: "Hess's Law", slug: "hesss-law" },
      { title: "Bond Energies", slug: "bond-energies" },
      { title: "Calorimetry", slug: "calorimetry" },
    ],
  },
  {
    title: "Industrial Chemistry",
    slug: "industrial-chemistry",
    concepts: [
      { title: "Haber Process", slug: "haber-process" },
      { title: "Contact Process", slug: "contact-process" },
      { title: "Petrochemicals", slug: "petrochemicals" },
    ],
  },
  {
    title: "Environmental Chemistry",
    slug: "environmental-chemistry",
    concepts: [
      { title: "Water Pollution", slug: "water-pollution" },
      { title: "Air Pollution", slug: "air-pollution" },
      { title: "Greenhouse Effect", slug: "greenhouse-effect" },
      { title: "Ozone Layer", slug: "ozone-layer" },
    ],
  },
];

const biologyTopics12: CurriculumTopic[] = [
  {
    title: "Molecular Biology",
    slug: "molecular-biology",
    concepts: [
      { title: "DNA Replication", slug: "dna-replication" },
      { title: "Protein Synthesis", slug: "protein-synthesis" },
      { title: "Gene Expression", slug: "gene-expression" },
      { title: "Biotechnology", slug: "biotechnology" },
    ],
  },
  {
    title: "Human Reproduction",
    slug: "human-reproduction",
    concepts: [
      { title: "Reproductive System", slug: "reproductive-system" },
      { title: "Fertilization and Development", slug: "fertilization-and-development" },
      { title: "Birth Control", slug: "birth-control" },
    ],
  },
  {
    title: "Biodiversity",
    slug: "biodiversity",
    concepts: [
      { title: "Classification of Organisms", slug: "classification-of-organisms" },
      { title: "Ethiopian Biodiversity", slug: "ethiopian-biodiversity" },
      { title: "Endangered Species", slug: "endangered-species" },
      { title: "Conservation Strategies", slug: "conservation-strategies" },
    ],
  },
];

const englishTopics12: CurriculumTopic[] = [
  {
    title: "Exam Preparation",
    slug: "exam-preparation",
    concepts: [
      { title: "Reading Strategies", slug: "reading-strategies" },
      { title: "Vocabulary Building", slug: "vocabulary-building" },
      { title: "Essay Writing Tips", slug: "essay-writing-tips" },
      { title: "Common Exam Mistakes", slug: "common-exam-mistakes" },
    ],
  },
  {
    title: "Advanced Literature",
    slug: "advanced-literature",
    concepts: [
      { title: "Novel Analysis", slug: "novel-analysis" },
      { title: "Drama and Theatre", slug: "drama-and-theatre" },
      { title: "African Literature", slug: "african-literature" },
    ],
  },
  {
    title: "Professional Communication",
    slug: "professional-communication",
    concepts: [
      { title: "Formal Letter Writing", slug: "formal-letter-writing" },
      { title: "Presentation Skills", slug: "presentation-skills" },
      { title: "Debate and Discussion", slug: "debate-and-discussion" },
    ],
  },
];

export const curriculumData: CurriculumGrade[] = [
  {
    number: 9,
    label: "Grade 9",
    subjects: [
      { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600", topics: englishTopics9 },
      { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600", topics: physicsTopics9 },
      { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600", topics: chemistryTopics9 },
      { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600", topics: biologyTopics9 },
    ],
  },
  {
    number: 10,
    label: "Grade 10",
    subjects: [
      { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600", topics: englishTopics10 },
      { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600", topics: physicsTopics10 },
      { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600", topics: chemistryTopics10 },
      { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600", topics: biologyTopics10 },
    ],
  },
  {
    number: 11,
    label: "Grade 11",
    subjects: [
      { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600", topics: englishTopics11 },
      { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600", topics: physicsTopics11 },
      { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600", topics: chemistryTopics11 },
      { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600", topics: biologyTopics11 },
    ],
  },
  {
    number: 12,
    label: "Grade 12",
    subjects: [
      { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600", topics: englishTopics12 },
      { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600", topics: physicsTopics12 },
      { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600", topics: chemistryTopics12 },
      { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600", topics: biologyTopics12 },
    ],
  },
];

export function getGrade(gradeNumber: number): CurriculumGrade | undefined {
  return curriculumData.find((g) => g.number === gradeNumber);
}

export function getSubject(gradeNumber: number, subjectSlug: string) {
  const grade = getGrade(gradeNumber);
  return grade?.subjects.find((s) => s.slug === subjectSlug);
}

export function getTopic(gradeNumber: number, subjectSlug: string, topicSlug: string) {
  const subject = getSubject(gradeNumber, subjectSlug);
  return subject?.topics.find((t) => t.slug === topicSlug);
}

export function getConcept(
  gradeNumber: number,
  subjectSlug: string,
  topicSlug: string,
  conceptSlug: string
) {
  const topic = getTopic(gradeNumber, subjectSlug, topicSlug);
  return topic?.concepts.find((c) => c.slug === conceptSlug);
}
