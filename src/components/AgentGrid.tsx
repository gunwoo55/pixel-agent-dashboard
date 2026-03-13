'use client';

import { AgentCard } from './AgentCard';
import { useAgentStore } from '@/store/agentStore';
import { Search, Filter, ArrowUpDown, Plus, UserPlus } from 'lucide-react';
import { useState } from 'react';

const sortOptions = [
  { value: 'level', label: '레벨순' },
  { value: 'efficiency', label: '효율순' },
  { value: 'completedTasks', label: '완료 작업순' },
  { value: 'name', label: '이름순' },
];

const statusOptions = [
  { value: 'all', label: '전체 상태' },
  { value: 'idle', label: '대기 중' },
  { value: 'working', label: '작업 중' },
  { value: 'resting', label: '휴식 중' },
  { value: 'offline', label: '오프라인' },
];

export function AgentGrid() {
  const { 
    getFilteredAgents, 
    filterStatus, 
    sortBy, 
    searchQuery,
    setFilterStatus, 
    setSortBy, 
    setSearchQuery,
    hireAgent,
    setSelectedAgent 
  } = useAgentStore();
  
  const [showHireModal, setShowHireModal] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    avatar: '👤',
    skills: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');

  const agents = getFilteredAgents();

  const handleHire = () => {
    if (!newAgent.name || !newAgent.role) return;
    
    hireAgent({
      name: newAgent.name,
      role: newAgent.role,
      avatar: newAgent.avatar,
      level: 1,
      experience: 0,
      maxExperience: 100,
      status: 'idle',
      skills: newAgent.skills.length > 0 ? newAgent.skills : ['신입'],
      efficiency: 50 + Math.floor(Math.random() * 30),
    });
    
    setShowHireModal(false);
    setNewAgent({ name: '', role: '', avatar: '👤', skills: [] });
  };

  const addSkill = () => {
    if (skillInput.trim() && !newAgent.skills.includes(skillInput.trim())) {
      setNewAgent({ ...newAgent, skills: [...newAgent.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setNewAgent({ ...newAgent, skills: newAgent.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="에이전트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hire Button */}
        <button
          onClick={() => setShowHireModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <UserPlus className="w-4 h-4" />
          에이전트 고용
        </button>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        총 <span className="font-semibold text-gray-900">{agents.length}</span>명의 에이전트
      </p>

      {/* Grid */}
      {agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {agents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}

      {/* Hire Modal */}
      {showHireModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">새 에이전트 고용</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="예: Pixel-006"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">역할</label>
                <input
                  type="text"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                  placeholder="예: 풀스택 개발자"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아바타</label>
                <div className="flex gap-2 flex-wrap">
                  {['👨‍💻', '👩‍💻', '🎨', '📊', '🚀', '🔧', '📱', '💡', '🤖', '👤'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewAgent({ ...newAgent, avatar: emoji })}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                        newAgent.avatar === emoji 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">스킬</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="스킬 입력 후 Enter"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {newAgent.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowHireModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleHire}
                disabled={!newAgent.name || !newAgent.role}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                고용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
