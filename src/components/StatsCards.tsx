'use client';

import { AgentMetrics } from '@/types/agent';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Zap
} from 'lucide-react';

interface StatsCardsProps {
  metrics: AgentMetrics;
}

export function StatsCards({ metrics }: StatsCardsProps) {
  const stats = [
    {
      name: '전체 에이전트',
      value: metrics.totalAgents,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      name: '활성 에이전트',
      value: metrics.activeAgents,
      icon: Zap,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      name: '완료된 작업',
      value: metrics.completedTasks,
      icon: CheckCircle2,
      color: 'bg-purple-500',
      trend: '+23%',
    },
    {
      name: '진행 중 작업',
      value: metrics.inProgressTasks,
      icon: Clock,
      color: 'bg-orange-500',
      trend: metrics.inProgressTasks > 10 ? '+8%' : '-3%',
    },
    {
      name: '평균 효율',
      value: `${Math.round(metrics.averageEfficiency * 100)}%`,
      icon: TrendingUp,
      color: 'bg-pink-500',
      trend: '+4%',
    },
    {
      name: '총 프로젝트',
      value: metrics.totalProjects,
      icon: Users,
      color: 'bg-indigo-500',
      trend: '+2',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`text-xs font-medium ${
                stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
