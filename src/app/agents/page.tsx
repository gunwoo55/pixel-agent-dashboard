'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { AgentGrid } from '@/components/AgentGrid';
import { useAgentStore } from '@/store/agentStore';
import { Agent } from '@/types/agent';
import { useRouter } from 'next/navigation';

export default function AgentsPage() {
  const { agents, removeAgent, setSelectedAgent } = useAgentStore();
  const router = useRouter();

  const handleSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    // TODO: Navigate to agent detail page
  };

  const handleFire = (agent: Agent) => {
    if (confirm(`${agent.name} 님을 해고하시겠습니까?`)) {
      removeAgent(agent.id);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">내 에이전트</h1>
            <p className="text-gray-500 mt-1">
              고용한 Pixel Lab 에이전트들을 관리하세요.
            </p>
          </div>
          <button
            onClick={() => router.push('/agents/marketplace')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + 새 에이전트 고용
          </button>
        </div>

        {/* Content */}
        {agents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🦊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">아직 에이전트가 없습니다</h3>
            <p className="text-gray-500 mt-2">
              에이전트 마켓에서 새로운 에이전트를 고용핼 보세요.
            </p>
            <button
              onClick={() => router.push('/agents/marketplace')}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              에이전트 고용하기
            </button>
          </div>
        ) : (
          <AgentGrid
            agents={agents}
            onSelectAgent={handleSelect}
            onFireAgent={handleFire}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
