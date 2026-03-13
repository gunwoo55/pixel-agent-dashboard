export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'working' | 'break' | 'offline';
  level: number;
  experience: number;
  skills: string[];
  currentTask?: Task;
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
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  assignedAgentId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  assignedAgents: string[];
  tasks: Task[];
  startDate: string;
  endDate?: string;
  budget: number;
}

export interface AgentMetrics {
  totalAgents: number;
  activeAgents: number;
  completedTasks: number;
  inProgressTasks: number;
  averageEfficiency: number;
  totalProjects: number;
}
