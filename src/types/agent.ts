export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  level: number;
  experience: number;
  maxExperience: number;
  status: 'idle' | 'working' | 'resting' | 'offline';
  skills: string[];
  currentTask?: string;
  taskProgress?: number;
  efficiency: number; // 0-100
  completedTasks: number;
  joinedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string; // agent id
  createdAt: string;
  deadline?: string;
  progress: number;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'paused' | 'completed';
  progress: number;
  agents: string[]; // agent ids
  tasks: string[]; // task ids
  startDate: string;
  endDate?: string;
  budget?: number;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  averageEfficiency: number;
  projectsActive: number;
}
