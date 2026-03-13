import { Agent } from '@/types/agent';
import { useAgentStore } from '@/store/agentStore';
import { 
  Circle, 
  TrendingUp, 
  Award, 
  Briefcase, 
  MoreVertical,
  Trash2,
  UserX
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const statusConfig = {
  idle: { color: 'bg-green-500', label: '대기 중', textColor: 'text-green-600' },
  working: { color: 'bg-blue-500', label: '작업 중', textColor: 'text-blue-600' },
  resting: { color: 'bg-yellow-500', label: '휴식 중', textColor: 'text-yellow-600' },
  offline: { color: 'bg-gray-400', label: '오프라인', textColor: 'text-gray-500' },
};

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const fireAgent = useAgentStore((state) => state.fireAgent);
  
  const status = statusConfig[agent.status];
  const expPercent = (agent.experience / agent.maxExperience) * 100;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer group relative"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
            {agent.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50`}>
            <Circle className={`w-2 h-2 ${status.color} rounded-full`} fill="currentColor" />
            <span className={`text-xs font-medium ${status.textColor}`}>{status.label}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`${agent.name}를 해고하시겠습니까?`)) {
                fireAgent(agent.id);
              }
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            title="해고"
          >
            <UserX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Level & EXP */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Lv. {agent.level}</span>
          </div>
          <span className="text-xs text-gray-500">{agent.experience} / {agent.maxExperience} XP</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all"
            style={{ width: `${expPercent}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600">효율:</span>
          <span className="font-semibold text-gray-900">{agent.efficiency}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="w-4 h-4 text-purple-500" />
          <span className="text-gray-600">완료:</span>
          <span className="font-semibold text-gray-900">{agent.completedTasks}개</span>
        </div>
      </div>

      {/* Current Task */}
      {agent.currentTask && agent.status === 'working' && (
        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <p className="text-xs text-blue-600 mb-1">현재 작업</p>
          <p className="text-sm font-medium text-blue-900 truncate">{agent.currentTask}</p>
          <div className="mt-2 w-full h-1.5 bg-blue-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${agent.taskProgress}%` }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-1">{agent.taskProgress}% 완료</p>
        </div>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {agent.skills.slice(0, 3).map((skill) => (
          <span 
            key={skill}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {agent.skills.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
            +{agent.skills.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}
