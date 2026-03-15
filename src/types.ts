export enum HabitCategory {
  MINDFULNESS = 'Mindfulness',
  HEALTH = 'Saúde',
  ENERGY = 'Energia',
  STUDY = 'Estudos',
  BODY = 'Corpo'
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: HabitCategory;
  xp: number;
  completed: boolean;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  wp: number; // Warrior Points
  streak: number;
  recordStreak: number;
  invincibilityDays: number;
  waterIntake: number; // in ml
  waterGoal: number; // in ml
  noFapStreak: number;
  noFapRecord: number;
  name: string;
  avatarUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface StoreItem {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: 'powerup' | 'visual' | 'badge';
}
