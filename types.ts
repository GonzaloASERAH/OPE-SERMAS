export enum TopicStatus {
  Pending = 'Pending',
  InReview = 'InReview',
  Mastered = 'Mastered',
}

export enum TopicCategory {
  Legal = 'Marco Legal',
  SERMAS = 'Organización SERMAS',
  IT = 'Informática y Ofimática',
  Other = 'Otros',
}

export interface Subtopic {
  id: string;
  title: string;
  content: string; // Markdown supported
}

export interface Topic {
  id: number;
  title: string;
  category: TopicCategory;
  subtopics: Subtopic[];
}

export interface UserProgress {
  topicId: number;
  status: TopicStatus;
  lastStudied?: string; // ISO Date
  timesReviewed: number;
}

export interface AppState {
  progress: Record<number, UserProgress>;
  darkMode: boolean;
  textSize: number; // percentage, e.g., 100, 110, 120
}