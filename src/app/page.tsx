'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCards } from '@/components/StatsCards';
import { AgentGrid } from '@/components/AgentGrid';
import { TaskBoard } from '@/components/TaskBoard';
import { useAgentStore } from '@/store/agentStore';
import { Agent, Task } from '@/types/agent';

// Mock data for demonstration
const mockAgents = [
  {
    id: '1',
    name: '클로이',
    role: '개발자',
    avatar: './pixel-agents/chloe.png',
    status: 'working' as const,
    level: 5,
    experience: 450,
    skills: ['React', 'TypeScript', 'Node.js'],
    currentTask: undefined,
    stats: {
      efficiency: 0.92,
      reliability: 0.88,
      speed: 0.85,
      quality: 0.90,
    },
    hireDate: '2024-01-15',
    salary: 5000,
  },
  {
    id: '2',
    name: '맥스',
    role: '디자이너',
    avatar: './pixel-agents/max.png',
    status: 'idle' as const,
    level: 4,
    experience: 320,
    skills: ['Figma', 'UI/UX', 'Illustration'],
    currentTask: undefined,
    stats: {
      efficiency: 0.85,
      reliability: 0.92,
      speed: 0.78,
      quality: 0.95,
    },
    hireDate: '2024-02-01',
    salary: 4500,
  },
  {
    id: '3',
    name: '루나',
    role: 'PM',
    avatar: './pixel-agents/luna.png',
    status: 'working' as const,
    level: 6,
    experience: 580,
    skills: ['Project Management', 'Agile', 'Communication'],
    currentTask: undefined,
    stats: {
      efficiency: 0.88,
      reliability: 0.95,
      speed: 0.82,
      quality: 0.87,
    },
    hireDate: '2023-11-20',
    salary: 6000,
  },
];

const mockTasks = [
  {
    id: '1',
    title: '대시보드 UI 개발',
    description: '에이전트 관리 대시보드의 사용자 인터페이스를 개발합니다.',
    status: 'in_progress' as const,
    progress: 65,
    assignedAgentId: '1',
    priority: 'high' as const,
    deadline: '2024-03-20',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    title: '로고 디자인',
    description: 'Pixel Corp의 새로운 브랜드 로고를 디자인합니다.',
    status: 'pending' as const,
    progress: 0,
    priority: 'medium' as const,
    createdAt: '2024-03-10',
  },
  {
    id: '3',
    title: '프로젝트 기획서 작성',
    description: 'Q2 프로젝트의 상세 기획서를 작성합니다.',
    status: 'completed' as const,
    progress: 100,
    assignedAgentId: '3',
    priority: 'urgent' as const,
    completedAt: '2024-03-12',
    createdAt: '2024-03-05',
  },
];

export default function DashboardPage() {
  const { 
    agents, 
    tasks, 
    metrics, 
    setAgents, 
    updateMetrics,
    setIsLoading 
  } = useAgentStore();

  useEffect(() => {
    // Load mock data
    setIsLoading(true);
    
    setTimeout(() => {
      setAgents(mockAgents);
      
      // Calculate metrics
      updateMetrics({
        totalAgents: mockAgents.length,
        activeAgents: mockAgents.filter(a => a.status === 'working').length,
        completedTasks: mockTasks.filter(t => t.status === 'completed').length,
        inProgressTasks: mockTasks.filter(t => t.status === 'in_progress').length,
        averageEfficiency: mockAgents.reduce((acc, a) => acc + a.stats.efficiency, 0) / mockAgents.length,
        totalProjects: 5,
      });
      
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSelectAgent = (agent: Agent) => {
    console.log('Selected agent:', agent);
    // TODO: Open agent detail modal
  };

  const handleTaskClick = (task: Task) => {
    console.log('Selected task:', task);
    // TODO: Open task detail modal
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500 mt-1">
            Pixel Corp의 에이전트와 프로젝트를 한눈에 확인하세요.
          </p>
        </div>

        {/* Stats */}
        <StatsCards metrics={metrics} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agents Section */}
          <div className="lg:col-span-1">
            <AgentGrid
              agents={agents.length > 0 ? agents : mockAgents}
              onSelectAgent={handleSelectAgent}
            />
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <TaskBoard
              tasks={tasks.length > 0 ? tasks : mockTasks}
              onTaskClick={handleTaskClick}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
