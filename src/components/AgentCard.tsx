'use client';

import { Agent } from '@/types/agent';
import { 
  User, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Star,
  MoreVertical,
  Circle
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onSelect?: (agent: Agent) => void;
  onHire?: (agent: Agent) => void;
  onFire?: (agent: Agent) => void;
  isHired?: boolean;
}

const statusColors = {
  idle: 'bg-green-500',
  working: 'bg-blue-500',
  break: 'bg-yellow-500',
  offline: 'bg-gray-500',
};

const statusLabels = {
  idle: '대기 중',
  working: '작업 중',
  break: '휴식 중',
  offline: '오프라인',
};

export function AgentCard({ agent, onSelect, onHire, onFire, isHired = true }: AgentCardProps) {
  const efficiency = Math.round(agent.stats.efficiency * 100);
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer"
      onClick={() => onSelect?.(agent)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/pixel-agents/default.png';
            }}
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${statusColors[agent.status]}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColors[agent.status]}`}>
              {statusLabels[agent.status]}
            </span>
          </div>
          <p className="text-sm text-gray-500">{agent.role}</p>
          
          {/* Level & Experience */}
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Lv.{agent.level}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full"
                style={{ width: `${agent.experience % 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <TrendingUp className="w-4 h-4 mx-auto text-blue-500" />
          <span className="text-xs text-gray-500">효율</span>
          <p className="font-semibold text-sm">{efficiency}%</p>
        </div>
        <div className="text-center">
          <Clock className="w-4 h-4 mx-auto text-green-500" />
          <span className="text-xs text-gray-500">속도</span>
          <p className="font-semibold text-sm">{Math.round(agent.stats.speed * 100)}%</p>
        </div>
        <div className="text-center">
          <Briefcase className="w-4 h-4 mx-auto text-purple-500" />
          <span className="text-xs text-gray-500">작업</span>
          <p className="font-semibold text-sm">{agent.currentTask ? '진행중' : '없음'}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mt-3">
        {agent.skills.slice(0, 3).map((skill) => (
          <span 
            key={skill}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
          >
            {skill}
          </span>
        ))}
        {agent.skills.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            +{agent.skills.length - 3}
          </span>
        )}
      </div>

      {/* Actions */}
      {isHired ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFire?.(agent);
          }}
          className="w-full mt-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          해고하기
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onHire?.(agent);
          }}
          className="w-full mt-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          고용하기
        </button>
      )}
    </div>
  );
}
