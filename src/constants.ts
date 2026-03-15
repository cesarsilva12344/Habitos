import { Habit, HabitCategory, Achievement, StoreItem } from './types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    title: 'Hidratação',
    description: '500ml de água ao acordar',
    duration: 2,
    category: HabitCategory.HEALTH,
    xp: 10,
    completed: false
  },
  {
    id: '2',
    title: 'Meditação',
    description: 'Foco e clareza mental',
    duration: 10,
    category: HabitCategory.MINDFULNESS,
    xp: 25,
    completed: false
  },
  {
    id: '3',
    title: 'Exercício Físico',
    description: 'Treino funcional rápido',
    duration: 20,
    category: HabitCategory.ENERGY,
    xp: 50,
    completed: false
  },
  {
    id: '4',
    title: 'Leitura',
    description: 'Desenvolvimento pessoal',
    duration: 15,
    category: HabitCategory.STUDY,
    xp: 30,
    completed: false
  },
  {
    id: '5',
    title: 'Banho Gelado',
    description: 'Despertar do corpo',
    duration: 5,
    category: HabitCategory.BODY,
    xp: 40,
    completed: false
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Sol Nascente', description: 'Acordou antes das 6h por 3 dias', icon: 'Sun', unlocked: true },
  { id: 'a2', title: 'Energia Pura', description: 'Completou 7 dias de exercícios', icon: 'Zap', unlocked: true },
  { id: 'a3', title: 'Blindado', description: 'Manteve a rotina por 15 dias', icon: 'Shield', unlocked: true },
  { id: 'a4', title: 'Mestre 90', description: '90 dias de invencibilidade', icon: 'Trophy', unlocked: false }
];

export const STORE_ITEMS: StoreItem[] = [
  { id: 's1', title: 'Proteção de Sequência', description: 'Mantém seu streak se falhar um dia', price: 500, icon: 'ShieldCheck', category: 'powerup' },
  { id: 's2', title: 'XP em Dobro', description: '2x XP por 24 horas', price: 1200, icon: 'Zap', category: 'powerup' },
  { id: 's3', title: 'Aura Carmesim', description: 'Efeito visual no perfil', price: 800, icon: 'Palette', category: 'visual' }
];
