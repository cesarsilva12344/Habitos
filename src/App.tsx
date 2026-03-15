import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  Timer, 
  BookOpen, 
  BarChart3, 
  User, 
  Store, 
  Users, 
  Library,
  Settings,
  Shield,
  Zap,
  Trophy,
  ChevronRight,
  Play,
  CheckCircle2,
  Heart,
  Flame,
  Search,
  MoreHorizontal,
  ArrowLeft,
  Share2,
  Lock,
  Droplets,
  Plus,
  Trash2,
  Edit2,
  X,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Habit, UserStats, HabitCategory } from './types';
import { INITIAL_HABITS, ACHIEVEMENTS, STORE_ITEMS } from './constants';

// --- Components ---

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Início' },
    { id: 'routine', icon: ListTodo, label: 'Rotina' },
    { id: 'water', icon: Droplets, label: 'Água' },
    { id: 'nofap', icon: Shield, label: 'NoFap' },
    { id: 'stats', icon: BarChart3, label: 'Status' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 pb-6 pt-2 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}
        >
          <tab.icon size={20} className={activeTab === tab.id ? 'fill-primary/10' : ''} />
          <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- Screens ---

const HydrationScreen = ({ stats, onAddWater }: { stats: UserStats, onAddWater: (ml: number) => void }) => {
  const progress = Math.min((stats.waterIntake / stats.waterGoal) * 100, 100);

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-deep-blue">Hidratação</h1>
        <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Settings size={20} /></button>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Progresso Diário</span>
        <div className="flex items-baseline justify-center gap-1 mt-2">
          <span className="text-4xl font-bold text-slate-900">{stats.waterIntake}</span>
          <span className="text-xl font-medium text-slate-400">/ {stats.waterGoal}ml</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full" 
            />
          </div>
          <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="relative flex justify-center items-center py-10">
        {/* PET Bottle Shape */}
        <div className="relative w-32 h-64 flex flex-col items-center">
          {/* Bottle Cap */}
          <div className="w-10 h-4 bg-slate-300 rounded-t-md border-x-2 border-t-2 border-slate-400 z-10" />
          {/* Bottle Neck */}
          <div className="w-14 h-8 bg-white/40 border-x-2 border-slate-200 z-0" />
          {/* Bottle Shoulders */}
          <div className="w-28 h-12 bg-white/40 border-x-2 border-t-2 border-slate-200 rounded-t-[2rem]" />
          {/* Bottle Body */}
          <div className="relative w-28 h-40 border-x-2 border-b-2 border-slate-200 rounded-b-2xl overflow-hidden bg-white/30 shadow-inner">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              className="absolute bottom-0 left-0 right-0 bg-blue-400/80 flex flex-col justify-start items-center pt-8 transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 blur-sm" />
            </motion.div>
            
            {/* Bottle Ridges (Visual detail) */}
            <div className="absolute inset-0 flex flex-col justify-around py-4 pointer-events-none opacity-20">
              <div className="h-[1px] bg-slate-400 w-full" />
              <div className="h-[1px] bg-slate-400 w-full" />
              <div className="h-[1px] bg-slate-400 w-full" />
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-800/20 drop-shadow-sm">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-primary text-white py-2 px-4 rounded-full shadow-lg flex items-center gap-2 z-20">
          <Droplets size={16} />
          <span className="font-bold text-sm">{Math.max(stats.waterGoal - stats.waterIntake, 0)}ml</span>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-center text-slate-500 font-medium">Adicionar Água</p>
        <div className="grid grid-cols-3 gap-4">
          {[200, 300, 500].map(ml => (
            <button 
              key={ml}
              onClick={() => onAddWater(ml)}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 group-hover:bg-primary group-hover:text-white transition-colors">
                <Droplets size={24} />
              </div>
              <span className="text-sm font-bold">{ml}ml</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-4 border border-primary/20">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
          <Info size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Dica do Guerreiro</p>
          <p className="text-xs text-slate-600">Beber água logo ao acordar acelera seu metabolismo e limpa toxinas.</p>
        </div>
      </div>
    </div>
  );
};

const HabitForm = ({ habit, onSave, onCancel }: { habit?: Habit, onSave: (h: Partial<Habit>) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState<Partial<Habit>>(habit || {
    title: '',
    description: '',
    duration: 10,
    category: HabitCategory.HEALTH,
    xp: 20,
    completed: false
  });

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{habit ? 'Editar Hábito' : 'Novo Hábito'}</h2>
        <button onClick={onCancel} className="text-slate-400"><X size={24} /></button>
      </header>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700">Título</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            placeholder="Ex: Meditação"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700">Descrição</label>
          <input 
            type="text" 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            placeholder="Ex: Foco e clareza"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Duração (min)</label>
            <input 
              type="number" 
              value={formData.duration}
              onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">XP</label>
            <input 
              type="number" 
              value={formData.xp}
              onChange={e => setFormData({...formData, xp: parseInt(e.target.value)})}
              className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700">Categoria</label>
          <select 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value as HabitCategory})}
            className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
          >
            {Object.values(HabitCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={() => onSave(formData)}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20"
      >
        Salvar Hábito
      </button>
    </div>
  );
};

const RoutineList = ({ habits, onStartHabit, onEdit, onDelete, onAdd }: { 
  habits: Habit[], 
  onStartHabit: (h: Habit) => void,
  onEdit: (h: Habit) => void,
  onDelete: (id: string) => void,
  onAdd: () => void
}) => {
  return (
    <div className="p-6 space-y-6 pb-24">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-deep-blue">Sua Rotina</h1>
          <p className="text-slate-500 text-sm">Siga a sequência para blindar seu dia</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div 
            key={habit.id} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${habit.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 shadow-sm'}`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${habit.completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                {habit.completed ? <CheckCircle2 size={24} /> : <Play size={24} />}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${habit.completed ? 'text-slate-400' : 'text-slate-800'}`}>{habit.title}</h3>
                <p className="text-xs text-slate-400">{habit.description} • {habit.duration} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!habit.completed && (
                <button 
                  onClick={() => onStartHabit(habit)}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  <Play size={18} fill="currentColor" />
                </button>
              )}
              <button onClick={() => onEdit(habit)} className="p-2 text-slate-400 hover:text-primary"><Edit2 size={18} /></button>
              <button onClick={() => onDelete(habit.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FocusTimer = ({ habit, onComplete, onCancel }: { habit: Habit, onComplete: () => void, onCancel: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(habit.duration * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((habit.duration * 60 - timeLeft) / (habit.duration * 60)) * 100;

  return (
    <div className="flex flex-col h-full bg-deep-blue text-white p-8">
      <button onClick={onCancel} className="self-start p-2 hover:bg-white/10 rounded-full transition-colors">
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{habit.title}</h2>
          <p className="text-blue-200/60 font-medium uppercase tracking-widest text-xs">{habit.category}</p>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
            <motion.circle 
              cx="128" cy="128" r="120" 
              stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={754}
              animate={{ strokeDashoffset: 754 - (754 * progress) / 100 }}
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-mono font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="flex gap-6">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isActive ? <MoreHorizontal size={32} /> : <Play size={32} fill="currentColor" />}
          </button>
          <button 
            onClick={onComplete}
            className="px-8 py-4 bg-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Concluir Agora
          </button>
        </div>
      </div>
    </div>
  );
};

const Journal = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <header className="flex items-center justify-between">
        <button onClick={onComplete} className="p-2 text-slate-400"><ArrowLeft size={24} /></button>
        <h2 className="text-xl font-bold">Reflexão Diária</h2>
        <div className="w-10" />
      </header>
      <div className="flex-1 space-y-4">
        <p className="text-slate-500 text-sm">O que você aprendeu hoje? Como pode ser 1% melhor amanhã?</p>
        <textarea 
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-64 p-4 rounded-2xl border-slate-100 bg-white shadow-inner focus:ring-primary focus:border-primary resize-none"
          placeholder="Escreva seus pensamentos aqui..."
        />
      </div>
      <button 
        onClick={onComplete}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20"
      >
        Salvar Reflexão
      </button>
    </div>
  );
};

const StoreScreen = () => (
  <div className="p-6 space-y-6 pb-24">
    <h1 className="text-2xl font-bold">Loja de Itens</h1>
    <div className="grid grid-cols-2 gap-4">
      {STORE_ITEMS.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-full aspect-square bg-slate-50 rounded-xl flex items-center justify-center text-3xl">{item.icon}</div>
          <div>
            <h3 className="font-bold text-sm">{item.title}</h3>
            <p className="text-[10px] text-slate-400">{item.description}</p>
          </div>
          <button className="w-full py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold flex items-center justify-center gap-1">
            <Zap size={12} fill="currentColor" /> {item.price} WP
          </button>
        </div>
      ))}
    </div>
  </div>
);

const LibraryScreen = () => (
  <div className="p-6 space-y-6 pb-24">
    <h1 className="text-2xl font-bold">Biblioteca</h1>
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
          <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><BookOpen size={32} /></div>
          <div className="flex-1 space-y-1">
            <h3 className="font-bold">Mentalidade de Guerreiro {i}</h3>
            <p className="text-xs text-slate-400">Aprenda as técnicas dos estoicos para manter a calma sob pressão.</p>
            <button className="text-xs font-bold text-primary flex items-center gap-1">Ler agora <ChevronRight size={12} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = ({ stats, habits, onStartHabit }: { stats: UserStats, habits: Habit[], onStartHabit: (h: Habit) => void }) => {
  const nextHabit = habits.find(h => !h.completed);
  const progress = (habits.filter(h => h.completed).length / habits.length) * 100;

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nível {stats.level}</h2>
            <p className="text-lg font-bold text-deep-blue">{stats.name}</p>
          </div>
        </div>
        <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Settings size={20} /></button>
      </header>

      <div className="bg-deep-blue rounded-3xl p-6 text-white shadow-2xl shadow-deep-blue/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={120} /></div>
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-widest">XP Total</p>
              <h3 className="text-3xl font-bold">{stats.xp} <span className="text-sm font-medium text-blue-200/40">/ {stats.xpToNextLevel}</span></h3>
            </div>
            <div className="text-right">
              <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-widest">Willpower</p>
              <h3 className="text-xl font-bold flex items-center justify-end gap-1"><Zap size={16} className="text-yellow-400 fill-yellow-400" /> {stats.wp}</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
                className="h-full bg-primary" 
              />
            </div>
            <p className="text-[10px] text-blue-200/40 font-medium">Faltam {stats.xpToNextLevel - stats.xp} XP para o Nível {stats.level + 1}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"><Flame size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Streak</p>
            <p className="font-bold text-slate-800">{stats.streak} Dias</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><Trophy size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Recorde</p>
            <p className="font-bold text-slate-800">{stats.recordStreak} Dias</p>
          </div>
        </div>
      </div>

      {nextHabit && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Próximo Hábito</h3>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">{nextHabit.category}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary"><Play size={28} fill="currentColor" /></div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{nextHabit.title}</h4>
              <p className="text-xs text-slate-400">{nextHabit.duration} minutos • {nextHabit.xp} XP</p>
            </div>
            <button 
              onClick={() => onStartHabit(nextHabit)}
              className="bg-primary text-white p-3 rounded-xl shadow-lg shadow-primary/20"
            >
              <Play size={20} fill="currentColor" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatsScreen = () => (
  <div className="p-6 space-y-8 pb-24">
    <h1 className="text-2xl font-bold">Seu Desempenho</h1>
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Consistência Semanal</h3>
        <select className="text-xs font-bold text-slate-400 bg-transparent border-none focus:ring-0">
          <option>Esta Semana</option>
        </select>
      </div>
      <div className="flex justify-between items-end h-32 px-2">
        {[45, 80, 60, 90, 70, 85, 40].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className={`w-3 rounded-full ${i === 3 ? 'bg-primary' : 'bg-slate-100'}`} 
            />
            <span className="text-[10px] font-bold text-slate-400">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold px-2">Conquistas</h3>
      <div className="grid grid-cols-2 gap-4">
        {ACHIEVEMENTS.map(ach => (
          <div key={ach.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 ${ach.unlocked ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
            <div className="text-3xl">{ach.icon}</div>
            <h4 className="text-xs font-bold">{ach.title}</h4>
            <p className="text-[10px] text-slate-400">{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Profile = ({ stats, onUpdateProfile }: { stats: UserStats, onUpdateProfile: (name: string, avatarUrl: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(stats.name);
  const [editAvatar, setEditAvatar] = useState(stats.avatarUrl);

  const handleSave = () => {
    onUpdateProfile(editName, editAvatar);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
            <img src={stats.avatarUrl} alt="Profile" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
            <Shield size={16} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{stats.name}</h2>
          <p className="text-sm text-slate-400">Membro desde Março 2024</p>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Nome</label>
            <input 
              type="text" 
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">URL do Avatar</label>
            <input 
              type="text" 
              value={editAvatar}
              onChange={e => setEditAvatar(e.target.value)}
              className="w-full rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-2 bg-primary text-white rounded-xl font-bold text-sm"
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="w-full py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-primary shadow-sm"
        >
          Editar Perfil
        </button>
      )}

      <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Nível</p>
        <p className="text-lg font-bold text-primary">{stats.level}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Streak</p>
        <p className="text-lg font-bold text-orange-500">{stats.streak}</p>
      </div>
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase">WP</p>
        <p className="text-lg font-bold text-deep-blue">{stats.wp}</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Status NoFap</h3>
        <Shield className="text-primary" size={20} />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Dias de Pureza</p>
          <p className="text-3xl font-black text-slate-900">{stats.noFapStreak} Dias</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Recorde</p>
          <p className="text-xl font-bold text-primary">{stats.noFapRecord} Dias</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-bottom border-slate-50 flex items-center justify-between">
        <h3 className="font-bold">Configurações</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {[
          { icon: User, label: 'Dados Pessoais' },
          { icon: Shield, label: 'Privacidade' },
          { icon: Settings, label: 'Preferências' },
          { icon: X, label: 'Sair', color: 'text-red-500' }
        ].map((item, i) => (
          <button key={i} className={`w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${item.color || 'text-slate-700'}`}>
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

const NoFapScreen = ({ stats, onReset }: { stats: UserStats, onReset: () => void }) => {
  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-deep-blue">NoFap Tracker</h1>
        <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Settings size={20} /></button>
      </header>

      <div className="relative flex flex-col items-center justify-center py-10 space-y-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-primary/10 rounded-full" />
          <div className="relative z-10 flex flex-col items-center">
            <Shield size={64} className="text-primary mb-2" />
            <span className="text-6xl font-black text-slate-900">{stats.noFapStreak}</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Dias Limpos</span>
          </div>
          
          {/* Decorative rings */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
            <motion.circle 
              cx="128" cy="128" r="110" 
              stroke="currentColor" strokeWidth="4" fill="transparent" 
              strokeDasharray={691}
              initial={{ strokeDashoffset: 691 }}
              animate={{ strokeDashoffset: 691 - (691 * Math.min(stats.noFapStreak / 90, 1)) }}
              className="text-primary"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Recorde Atual</p>
            <p className="text-xl font-bold text-slate-800">{stats.noFapRecord} Dias</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Próximo Marco</p>
            <p className="text-xl font-bold text-primary">
              {stats.noFapStreak < 7 ? 7 : stats.noFapStreak < 30 ? 30 : stats.noFapStreak < 90 ? 90 : 365} Dias
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 text-center space-y-2">
            <h3 className="font-bold text-primary">Mantenha a Disciplina</h3>
            <p className="text-xs text-slate-600 italic">"O homem que domina a si mesmo é mais forte que o que conquista cidades."</p>
          </div>
          
          <button 
            onClick={() => {
              if (confirm('Você tem certeza que deseja resetar seu streak? A honestidade é a base do guerreiro.')) {
                onReset();
              }
            }}
            className="w-full py-4 text-red-500 font-bold text-sm uppercase tracking-widest hover:bg-red-50 rounded-xl transition-colors"
          >
            Eu falhei (Resetar Streak)
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [stats, setStats] = useState<UserStats>({
    level: 12,
    xp: 750,
    xpToNextLevel: 1000,
    wp: 2450,
    streak: 18,
    recordStreak: 24,
    invincibilityDays: 18,
    waterIntake: 1500,
    waterGoal: 2000,
    noFapStreak: 42,
    noFapRecord: 90,
    name: 'Guerreiro Blindado',
    avatarUrl: 'https://picsum.photos/seed/warrior/200'
  });
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isAddingHabit, setIsAddingHabit] = useState(false);

  const handleStartHabit = (habit: Habit) => {
    setActiveHabit(habit);
  };

  const handleCompleteHabit = () => {
    if (!activeHabit) return;
    
    setHabits(prev => prev.map(h => h.id === activeHabit.id ? { ...h, completed: true } : h));
    setStats(prev => ({
      ...prev,
      xp: prev.xp + activeHabit.xp,
      wp: prev.wp + Math.floor(activeHabit.xp / 2)
    }));
    setActiveHabit(null);
  };

  const handleAddWater = (ml: number) => {
    setStats(prev => ({ ...prev, waterIntake: prev.waterIntake + ml }));
  };

  const handleSaveHabit = (habitData: Partial<Habit>) => {
    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === editingHabit.id ? { ...h, ...habitData } as Habit : h));
    } else {
      const newHabit: Habit = {
        ...habitData,
        id: Math.random().toString(36).substr(2, 9),
        completed: false
      } as Habit;
      setHabits(prev => [...prev, newHabit]);
    }
    setEditingHabit(null);
    setIsAddingHabit(false);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bg-soft shadow-xl relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {activeHabit ? (
          <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60]">
            <FocusTimer 
              habit={activeHabit} 
              onComplete={handleCompleteHabit} 
              onCancel={() => setActiveHabit(null)} 
            />
          </motion.div>
        ) : showJournal ? (
          <motion.div key="journal" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-bg-soft z-50">
            <Journal onComplete={() => setShowJournal(false)} />
          </motion.div>
        ) : showStore ? (
          <motion.div key="store" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-bg-soft z-50">
            <div className="p-4"><button onClick={() => setShowStore(false)} className="text-primary"><ArrowLeft size={24} /></button></div>
            <StoreScreen />
          </motion.div>
        ) : showLibrary ? (
          <motion.div key="library" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-bg-soft z-50">
            <div className="p-4"><button onClick={() => setShowLibrary(false)} className="text-primary"><ArrowLeft size={24} /></button></div>
            <LibraryScreen />
          </motion.div>
        ) : (editingHabit || isAddingHabit) ? (
          <motion.div key="habit-form" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-bg-soft z-50">
            <HabitForm 
              habit={editingHabit || undefined} 
              onSave={handleSaveHabit} 
              onCancel={() => { setEditingHabit(null); setIsAddingHabit(false); }} 
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <>
                <Dashboard stats={stats} habits={habits} onStartHabit={handleStartHabit} />
                <div className="px-6 pb-24 space-y-4">
                  <button 
                    onClick={() => setShowJournal(true)}
                    className="w-full bg-white border-2 border-primary/20 text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <BookOpen size={20} /> Reflexão Diária
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setShowStore(true)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                      <Store className="text-primary" /> <span className="text-xs font-bold">Loja</span>
                    </button>
                    <button onClick={() => setShowLibrary(true)} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                      <Library className="text-primary" /> <span className="text-xs font-bold">Biblioteca</span>
                    </button>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'routine' && (
              <RoutineList 
                habits={habits} 
                onStartHabit={handleStartHabit} 
                onEdit={setEditingHabit} 
                onDelete={handleDeleteHabit}
                onAdd={() => setIsAddingHabit(true)}
              />
            )}
            {activeTab === 'water' && <HydrationScreen stats={stats} onAddWater={handleAddWater} />}
            {activeTab === 'nofap' && <NoFapScreen stats={stats} onReset={() => setStats(prev => ({ ...prev, noFapStreak: 0 }))} />}
            {activeTab === 'stats' && <StatsScreen />}
            {activeTab === 'profile' && (
              <Profile 
                stats={stats} 
                onUpdateProfile={(name, avatarUrl) => setStats(prev => ({ ...prev, name, avatarUrl }))} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeHabit && !showJournal && !showStore && !showLibrary && !editingHabit && !isAddingHabit && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}


