'use client';

import { useAgentStore } from '@/store/agentStore';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Activity,
  FolderKanban
} from 'lucide-react';

export function StatsCards() {
  const stats = useAgentStore((state) => state.getStats());

  const cards = [
    {
      title: '전체 에이전트',
      value: stats.totalAgents,
      subtext: `${stats.activeAgents}명 작업 중`,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+2',
    },
    {
      title: '완료된 작업',
      value: stats.completedTasks,
      subtext: '이번 달 기준',
      icon: CheckCircle2,
      color: 'bg-green-500',
      trend: '+12',
    },
    {
      title: '진행중인 작업',
      value: stats.inProgressTasks,
      subtext: '현재 진행률',
      icon: Clock,
      color: 'bg-yellow-500',
      trend: null,
    },
    {
      title: '평균 효율',
      value: `${stats.averageEfficiency}%`,
      subtext: '전체 에이전트 평균',
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: '+5%',
    },
    {
      title: '활성 프로젝트',
      value: stats.projectsActive,
      subtext: '진행중인 프로젝트',
      icon: FolderKanban,
      color: 'bg-pink-500',
      trend: null,
    },
    {
      title: '전체 작업',
      value: stats.totalTasks,
      subtext: '누적 작업 수',
      icon: Activity,
      color: 'bg-indigo-500',
      trend: '+8',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div 
            key={card.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {card.trend && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {card.trend}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-xs text-gray-400 mt-1">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
