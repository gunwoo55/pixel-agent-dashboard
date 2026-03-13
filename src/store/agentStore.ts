import { Agent, Task, Project, DashboardStats } from '@/types/agent';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AgentState {
  agents: Agent[];
  tasks: Task[];
  projects: Project[];
  selectedAgent: Agent | null;
  selectedProject: Project | null;
  filterStatus: 'all' | Agent['status'];
  sortBy: 'level' | 'efficiency' | 'completedTasks' | 'name';
  searchQuery: string;
  
  // Actions
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  hireAgent: (agentData: Omit<Agent, 'id' | 'joinedAt' | 'completedTasks'>) => void;
  fireAgent: (id: string) => void;
  
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  assignTask: (taskId: string, agentId: string) => void;
  
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  
  setSelectedAgent: (agent: Agent | null) => void;
  setSelectedProject: (project: Project | null) => void;
  setFilterStatus: (status: 'all' | Agent['status']) => void;
  setSortBy: (sort: 'level' | 'efficiency' | 'completedTasks' | 'name') => void;
  setSearchQuery: (query: string) => void;
  
  // Computed
  getFilteredAgents: () => Agent[];
  getStats: () => DashboardStats;
  getAgentTasks: (agentId: string) => Task[];
  getProjectAgents: (projectId: string) => Agent[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Pixel-001',
    role: '프론트엔드 개발자',
    avatar: '👨‍💻',
    level: 5,
    experience: 450,
    maxExperience: 1000,
    status: 'working',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    currentTask: '대시보드 UI 구현',
    taskProgress: 75,
    efficiency: 92,
    completedTasks: 23,
    joinedAt: '2024-01-15',
  },
  {
    id: 'agent-2',
    name: 'Pixel-002',
    role: '백엔드 개발자',
    avatar: '👩‍💻',
    level: 7,
    experience: 820,
    maxExperience: 1200,
    status: 'idle',
    skills: ['Node.js', 'PostgreSQL', 'Redis'],
    efficiency: 88,
    completedTasks: 45,
    joinedAt: '2023-08-20',
  },
  {
    id: 'agent-3',
    name: 'Pixel-003',
    role: 'UI/UX 디자이너',
    avatar: '🎨',
    level: 4,
    experience: 320,
    maxExperience: 800,
    status: 'resting',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    currentTask: '디자인 시스템 구축',
    taskProgress: 30,
    efficiency: 95,
    completedTasks: 18,
    joinedAt: '2024-03-10',
  },
  {
    id: 'agent-4',
    name: 'Pixel-004',
    role: '데이터 분석가',
    avatar: '📊',
    level: 6,
    experience: 650,
    maxExperience: 1100,
    status: 'working',
    skills: ['Python', 'Pandas', 'Machine Learning'],
    currentTask: '사용자 행동 분석',
    taskProgress: 60,
    efficiency: 85,
    completedTasks: 31,
    joinedAt: '2023-11-05',
  },
  {
    id: 'agent-5',
    name: 'Pixel-005',
    role: 'DevOps 엔지니어',
    avatar: '🚀',
    level: 8,
    experience: 1100,
    maxExperience: 1500,
    status: 'offline',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    efficiency: 90,
    completedTasks: 67,
    joinedAt: '2023-05-12',
  },
];

const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: '대시보드 UI 구현',
    description: '메인 대시보드 레이아웃 및 컴포넌트 개발',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'agent-1',
    createdAt: '2024-03-10',
    deadline: '2024-03-20',
    progress: 75,
    tags: ['frontend', 'ui', 'dashboard'],
  },
  {
    id: 'task-2',
    title: 'API 엔드포인트 설계',
    description: 'RESTful API 설계 및 문서화',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-03-12',
    deadline: '2024-03-25',
    progress: 0,
    tags: ['backend', 'api', 'design'],
  },
  {
    id: 'task-3',
    title: '디자인 시스템 구축',
    description: '컴포넌트 라이브러리 및 스타일 가이드 작성',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'agent-3',
    createdAt: '2024-03-08',
    deadline: '2024-03-30',
    progress: 30,
    tags: ['design', 'ui', 'system'],
  },
  {
    id: 'task-4',
    title: '사용자 행동 분석',
    description: 'GA4 데이터 분석 및 리포트 작성',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'agent-4',
    createdAt: '2024-03-11',
    deadline: '2024-03-22',
    progress: 60,
    tags: ['analytics', 'data', 'report'],
  },
  {
    id: 'task-5',
    title: 'CI/CD 파이프라인 구축',
    description: 'GitHub Actions 워크플로우 설정',
    status: 'completed',
    priority: 'urgent',
    assignedTo: 'agent-5',
    createdAt: '2024-03-01',
    progress: 100,
    tags: ['devops', 'ci/cd', 'automation'],
  },
];

const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Pixel Agent Dashboard',
    description: '에이전트 관리 대시보드 플랫폼',
    status: 'active',
    progress: 65,
    agents: ['agent-1', 'agent-2', 'agent-3'],
    tasks: ['task-1', 'task-2', 'task-3'],
    startDate: '2024-03-01',
    priority: 'high',
  },
  {
    id: 'proj-2',
    name: 'Data Analytics Platform',
    description: '데이터 분석 및 시각화 플랫폼',
    status: 'planning',
    progress: 20,
    agents: ['agent-4'],
    tasks: ['task-4'],
    startDate: '2024-03-15',
    priority: 'medium',
  },
  {
    id: 'proj-3',
    name: 'Infrastructure Migration',
    description: '클라우드 인프라 마이그레이션',
    status: 'completed',
    progress: 100,
    agents: ['agent-5'],
    tasks: ['task-5'],
    startDate: '2024-02-01',
    endDate: '2024-03-05',
    priority: 'high',
  },
];

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      agents: initialAgents,
      tasks: initialTasks,
      projects: initialProjects,
      selectedAgent: null,
      selectedProject: null,
      filterStatus: 'all',
      sortBy: 'level',
      searchQuery: '',

      setAgents: (agents) => set({ agents }),
      addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
      updateAgent: (id, updates) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
      removeAgent: (id) =>
        set((state) => ({
          agents: state.agents.filter((a) => a.id !== id),
        })),
      hireAgent: (agentData) => {
        const newAgent: Agent = {
          ...agentData,
          id: `agent-${generateId()}`,
          joinedAt: new Date().toISOString().split('T')[0],
          completedTasks: 0,
        };
        set((state) => ({ agents: [...state.agents, newAgent] }));
      },
      fireAgent: (id) =>
        set((state) => ({
          agents: state.agents.filter((a) => a.id !== id),
          tasks: state.tasks.map((t) =>
            t.assignedTo === id ? { ...t, assignedTo: undefined, status: 'pending' as const } : t
          ),
        })),

      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      assignTask: (taskId, agentId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, assignedTo: agentId, status: 'in-progress' as const } : t
          ),
        })),

      setProjects: (projects) => set({ projects }),
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      setSelectedAgent: (agent) => set({ selectedAgent: agent }),
      setSelectedProject: (project) => set({ selectedProject: project }),
      setFilterStatus: (filterStatus) => set({ filterStatus }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      getFilteredAgents: () => {
        const { agents, filterStatus, sortBy, searchQuery } = get();
        let filtered = agents;

        if (filterStatus !== 'all') {
          filtered = filtered.filter((a) => a.status === filterStatus);
        }

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (a) =>
              a.name.toLowerCase().includes(query) ||
              a.role.toLowerCase().includes(query) ||
              a.skills.some((s) => s.toLowerCase().includes(query))
          );
        }

        return filtered.sort((a, b) => {
          switch (sortBy) {
            case 'level':
              return b.level - a.level;
            case 'efficiency':
              return b.efficiency - a.efficiency;
            case 'completedTasks':
              return b.completedTasks - a.completedTasks;
            case 'name':
              return a.name.localeCompare(b.name);
            default:
              return 0;
          }
        });
      },

      getStats: () => {
        const { agents, tasks, projects } = get();
        const activeAgents = agents.filter((a) => a.status === 'working').length;
        const completedTasks = tasks.filter((t) => t.status === 'completed').length;
        const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
        const avgEfficiency = agents.length > 0
          ? Math.round(agents.reduce((sum, a) => sum + a.efficiency, 0) / agents.length)
          : 0;
        const projectsActive = projects.filter((p) => p.status === 'active').length;

        return {
          totalAgents: agents.length,
          activeAgents,
          totalTasks: tasks.length,
          completedTasks,
          inProgressTasks,
          averageEfficiency: avgEfficiency,
          projectsActive,
        };
      },

      getAgentTasks: (agentId) => {
        return get().tasks.filter((t) => t.assignedTo === agentId);
      },

      getProjectAgents: (projectId) => {
        const project = get().projects.find((p) => p.id === projectId);
        if (!project) return [];
        return get().agents.filter((a) => project.agents.includes(a.id));
      },
    }),
    {
      name: 'pixel-agent-storage',
    }
  )
);
