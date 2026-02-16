export interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  grade?: number | null;
  streak: number;
  lastActive?: Date | null;
  createdAt: Date;
}

export interface GradeData {
  id: string;
  number: number;
  label: string;
  subjects: SubjectData[];
}

export interface SubjectData {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  gradeId: string;
  topics: TopicData[];
}

export interface TopicData {
  id: string;
  title: string;
  slug: string;
  order: number;
  subjectId: string;
  concepts: ConceptData[];
}

export interface ConceptData {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  explanation?: string | null;
  examples?: string | null;
  formulas?: string | null;
  order: number;
  topicId: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizResultData {
  id: string;
  score: number;
  correct: boolean;
  subject?: string;
  topic?: string;
  createdAt: Date;
}

export interface AIHistoryItem {
  id: string;
  query: string;
  response: string;
  subject?: string;
  type: string;
  createdAt: Date;
}

export interface PerformanceStats {
  totalQuizzes: number;
  averageScore: number;
  strongSubjects: string[];
  weakSubjects: string[];
  streak: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  quizCount: number;
  rank: number;
}
