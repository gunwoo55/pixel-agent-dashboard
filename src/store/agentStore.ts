import { create } from 'zustand';
import { Agent, Task, Project, AgentMetrics } from '@/types/agent';

interface AgentStore {
  // Agents
  agents: Agent[];
  selectedAgent: Agent | null;
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  selectAgent: (agent: Agent | null) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  assignTask: (taskId: string, agentId: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  
  // Metrics
  metrics: AgentMetrics;
  updateMetrics: (metrics: Partial<AgentMetrics>) => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  selectedAgent: null,
  tasks: [],
  projects: [],
  isLoading: false,
  metrics: {
    totalAgents: 0,
    activeAgents: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    averageEfficiency: 0,
    totalProjects: 0,
  },

  setAgents: (agents) => set({ agents }),
  
  addAgent: (agent) => set((state) => ({
    agents: [...state.agents, agent],
    metrics: {
      ...state.metrics,
      totalAgents: state.metrics.totalAgents + 1,
    },
  })),
  
  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter((a) => a.id !== id),
    metrics: {
      ...state.metrics,
      totalAgents: state.metrics.totalAgents - 1,
    },
  })),
  
  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    ),
  })),
  
  selectAgent: (agent) => set({ selectedAgent: agent }),

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task],
    metrics: {
      ...state.metrics,
      inProgressTasks: state.metrics.inProgressTasks + 1,
    },
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    ),
  })),
  
  assignTask: (taskId, agentId) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === taskId ? { ...t, assignedAgentId: agentId, status: 'in_progress' } : t
    ),
  })),

  addProject: (project) => set((state) => ({
    projects: [...state.projects, project],
    metrics: {
      ...state.metrics,
      totalProjects: state.metrics.totalProjects + 1,
    },
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    ),
  })),

  updateMetrics: (metrics) => set((state) => ({
    metrics: { ...state.metrics, ...metrics },
  })),

  setIsLoading: (loading) => set({ isLoading: loading }),
}));
