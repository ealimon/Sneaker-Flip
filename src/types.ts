export interface StoryPage {
  pageNumber: number;
  title: string;
  narrative: string;
  illustrationDescription: string;
  theme: 'intro' | 'research' | 'strategy' | 'line' | 'flip_success' | 'hype' | 'all_in' | 'restock_crash' | 'sad_lesson' | 'smart_rebound' | 'educator_guide';
  economicConcept: string;
  merricksNote: string;
  vocabulary: { word: string; definition: string }[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface WorksheetItem {
  id: string;
  type: 'multiple_choice' | 'math_calc' | 'fill_in' | 'scenario_choice' | 'short_answer' | 'table_entry';
  prompt: string;
  subText?: string;
  options?: string[];
  correctAnswer?: string | number | number[];
  unit?: string;
  stepByStepSolution: string;
  rubricHint?: string;
  conceptTag: string;
}

export interface Worksheet {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string;
  estimatedTime: string;
  description: string;
  learningObjectives: string[];
  items: WorksheetItem[];
}

export interface SimulationSneaker {
  id: string;
  name: string;
  colorway: string;
  retailPrice: number;
  currentMarketPrice: number;
  supplyCount: number;
  hypeRating: 'Low' | 'Medium' | 'High' | 'Insane (Bubble Alert)';
  marketTrend: 'up' | 'down' | 'volatile' | 'stable';
  history: number[];
  description: string;
  riskFactor: string;
}

export interface SimulationState {
  cash: number;
  inventory: { sneaker: SimulationSneaker; purchasePrice: number; quantity: number }[];
  round: number;
  maxRounds: number;
  totalProfit: number;
  newsHeadline: string;
  lessonLearned?: string;
  gameOver: boolean;
}
