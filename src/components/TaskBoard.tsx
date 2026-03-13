'use client';

import { useAgentStore } from '@/store/agentStore';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  PlayCircle,
  User,
  ArrowRight
} from 'lucide-react';

interface TaskBoardProps {
  limit?: number;
}

const statusConfig = {
  'pending': { color: 'bg-gray-100 text-gray-600', icon: Clock, label: '대기' },
  'in-progress': { color: 'bg-blue-100 text-blue-600', icon: PlayCircle, label: '진행중' },
  'review': { color: 'bg-yellow-100 text-yellow-600', icon: AlertCircle, label: '검토중' },
  'completed': { color: 'bg-green-100 text-green-600', icon: CheckCircle2, label: '완료' },
};

const priorityConfig = {
  'low': 'bg-gray-100 text-gray-600',
  'medium': 'bg-blue-100 text-blue-600',
  'high': 'bg-orange-100 text-orange-600',
  'urgent': 'bg-red-100 text-red-600',
};

export function TaskBoard({ limit }: TaskBoardProps) {
  const { tasks, agents, updateTask } = useAgentStore();
  
  const sortedTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit || tasks.length);

  const getAgentName = (agentId?: string) => {
    if (!agentId) return '미할당';
    const agent = agents.find((a) => a.id === agentId);
    return agent ? agent.name : 'Unknown';
  };

  const getAgentAvatar = (agentId?: string) => {
    if (!agentId) return '👤';
    const agent = agents.find((a) => a.id === agentId);
    return agent ? agent.avatar : '👤';
  };

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => {
        const status = statusConfig[task.status];
        const StatusIcon = status.icon;
        
        return (
          <div 
            key={task.id}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{task.title}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${priorityConfig[task.priority]}`}>
                {task.priority === 'low' && '낮음'}
                {task.priority === 'medium' && '중간'}
                {task.priority === 'high' && '높음'}
                {task.priority === 'urgent' && '긴급'}
              </span>
            </div>
            
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">{status.label}</span>
                </div>
                {task.status === 'in-progress' && (
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">{getAgentAvatar(task.assignedTo)}</span>
                <span className="text-xs text-gray-500">{getAgentName(task.assignedTo)}</span>
              </div>
            </div>

            {task.deadline && (
              <div className="mt-2 text-xs text-gray-400">
                마감: {new Date(task.deadline).toLocaleDateString('ko-KR')}
              </div>
            )}
          </div>
        );
      })}

      {sortedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>등록된 작업이 없습니다</p>
        </div>
      )}

      {limit && tasks.length > limit && (
        <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          모든 작업 보기
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
