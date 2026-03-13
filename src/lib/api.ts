import axios from 'axios';
import { Agent, Task, Project } from '@/types/agent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agents API
export const agentApi = {
  getAll: async (): Promise<Agent[]> => {
    const response = await api.get('/agents');
    return response.data;
  },

  getById: async (id: string): Promise<Agent> => {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  },

  create: async (agent: Omit<Agent, 'id'>): Promise<Agent> => {
    const response = await api.post('/agents', agent);
    return response.data;
  },

  update: async (id: string, updates: Partial<Agent>): Promise<Agent> => {
    const response = await api.patch(`/agents/${id}`, updates);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/agents/${id}`);
  },

  hire: async (agentData: {
    name: string;
    role: string;
    avatar: string;
    skills: string[];
  }): Promise<Agent> => {
    const response = await api.post('/agents/hire', agentData);
    return response.data;
  },

  fire: async (id: string): Promise<void> => {
    await api.post(`/agents/${id}/fire`);
  },

  updateStatus: async (id: string, status: Agent['status']): Promise<Agent> => {
    const response = await api.patch(`/agents/${id}/status`, { status });
    return response.data;
  },
};

// Tasks API
export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  create: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  assign: async (taskId: string, agentId: string): Promise<Task> => {
    const response = await api.post(`/tasks/${taskId}/assign`, { agentId });
    return response.data;
  },

  updateProgress: async (taskId: string, progress: number): Promise<Task> => {
    const response = await api.patch(`/tasks/${taskId}/progress`, { progress });
    return response.data;
  },

  complete: async (taskId: string): Promise<Task> => {
    const response = await api.post(`/tasks/${taskId}/complete`);
    return response.data;
  },
};

// Projects API
export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const response = await api.post('/projects', project);
    return response.data;
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, updates);
    return response.data;
  },

  assignAgents: async (projectId: string, agentIds: string[]): Promise<Project> => {
    const response = await api.post(`/projects/${projectId}/agents`, { agentIds });
    return response.data;
  },
};

// Metrics API
export const metricsApi = {
  getDashboard: async () => {
    const response = await api.get('/metrics/dashboard');
    return response.data;
  },

  getRealtime: async () => {
    const response = await api.get('/metrics/realtime');
    return response.data;
  },
};

export default api;
