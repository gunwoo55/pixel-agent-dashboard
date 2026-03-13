import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'working' | 'idle' | 'resting' | 'training';
  level: number;
  experience: number;
  skills: string[];
  currentTask?: string;
  stats: {
    efficiency: number;
    reliability: number;
    speed: number;
    quality: number;
  };
  hireDate: string;
  salary: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  assignedAgentId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Metrics {
  totalAgents: number;
  activeAgents: number;
  completedTasks: number;
  inProgressTasks: number;
  averageEfficiency: number;
  totalProjects: number;
}

interface AgentStore {
  agents: Agent[];
  tasks: Task[];
  metrics: Metrics;
  isLoading: boolean;
  selectedAgent: Agent | null;
  setAgents: (agents: Agent[]) => void;
  setTasks: (tasks: Task[]) => void;
  updateMetrics: (metrics: Partial<Metrics>) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addAgent: (agent: Agent) => void;
  addTask: (task: Task) => void;
  removeAgent: (id: string) => void;
  removeTask: (id: string) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  tasks: [],
  metrics: {
    totalAgents: 0,
    activeAgents: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    averageEfficiency: 0,
    totalProjects: 0,
  },
  isLoading: false,
  selectedAgent: null,
  setAgents: (agents) => set({ agents }),
  setTasks: (tasks) => set({ tasks }),
  updateMetrics: (metrics) => set((state) => ({ 
    metrics: { ...state.metrics, ...metrics } 
  })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSelectedAgent: (selectedAgent) => set({ selectedAgent }),
  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === id ? { ...agent, ...updates } : agent
    ),
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    ),
  })),
  addAgent: (agent) => set((state) => ({ 
    agents: [...state.agents, agent] 
  })),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter((agent) => agent.id !== id),
  })),
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
}));
