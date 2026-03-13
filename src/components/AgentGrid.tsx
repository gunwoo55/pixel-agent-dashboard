'use client';

import { useState } from 'react';
import { Agent, Task } from '@/types/agent';
import { AgentCard } from './AgentCard';
import { 
  Users, 
  Plus, 
  Filter,
  Search,
  Grid3X3,
  List
} from 'lucide-react';

interface AgentGridProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onHireAgent?: (agent: Agent) => void;
  onFireAgent?: (agent: Agent) => void;
  isMarketplace?: boolean;
}

const filterOptions = ['전체', '대기 중', '작업 중', '휴식 중', '오프라인'];
const sortOptions = ['이름순', '레벨순', '효율순', '고용일순'];

export function AgentGrid({ 
  agents, 
  onSelectAgent, 
  onHireAgent, 
  onFireAgent,
  isMarketplace = false 
}: AgentGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('전체');
  const [sortBy, setSortBy] = useState('이름순');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and sort agents
  const filteredAgents = agents
    .filter((agent) => {
      if (filter === '전체') return true;
      const statusMap: Record<string, Agent['status']> = {
        '대기 중': 'idle',
        '작업 중': 'working',
        '휴식 중': 'break',
        '오프라인': 'offline',
      };
      return agent.status === statusMap[filter];
    })
    .filter((agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case '이름순':
          return a.name.localeCompare(b.name);
        case '레벨순':
          return b.level - a.level;
        case '효율순':
          return b.stats.efficiency - a.stats.efficiency;
        case '고용일순':
          return new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">
            {isMarketplace ? '에이전트 마켓' : '내 에이전트'}
          </h2>
          <span className="text-sm text-gray-500">({filteredAgents.length})</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="이름, 역할, 스킬 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">정렬:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1" />

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      {filteredAgents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>에이전트가 없습니다</p>
          {isMarketplace && (
            <button className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              새 에이전트 생성
            </button>
          )}
        </div>
      ) : (
        <div className={`grid gap-4 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelect={onSelectAgent}
              onHire={onHireAgent}
              onFire={onFireAgent}
              isHired={!isMarketplace}
            />
          ))}
        </div>
      )}
    </div>
  );
}
