export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'working' | 'break' | 'offline';
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

export interface AgentMetrics {
  totalAgents: number;
  activeAgents: number;
  completedTasks: number;
  inProgressTasks: number;
  averageEfficiency: number;
  totalProjects: number;
}
