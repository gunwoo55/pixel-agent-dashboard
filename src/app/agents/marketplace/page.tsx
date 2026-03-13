'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { AgentGrid } from '@/components/AgentGrid';
import { useAgentStore } from '@/store/agentStore';
import { Agent } from '@/types/agent';

// Mock marketplace agents (Pixel Lab characters)
const marketplaceAgents: Agent[] = [
  {
    id: 'market-1',
    name: '클로이',
    role: '풀스택 개발자',
    avatar: 'https://api.pixellab.ai/v1/characters/8eff40b5-72b6-48ad-9ba4-fc8e7ff2b3b3/sprites/south.png',
    status: 'idle',
    level: 1,
    experience: 0,
    skills: ['JavaScript', 'Python', 'SQL'],
    stats: {
      efficiency: 0.75,
      reliability: 0.80,
      speed: 0.70,
      quality: 0.78,
    },
    hireDate: '',
    salary: 3000,
  },
  {
    id: 'market-2',
    name: '맥스',
    role: 'UI/UX 디자이너',
    avatar: 'https://api.pixellab.ai/v1/characters/8eb921ab-866a-4001-8a8f-efb2041c1cdd/sprites/south.png',
    status: 'idle',
    level: 1,
    experience: 0,
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    stats: {
      efficiency: 0.82,
      reliability: 0.75,
      speed: 0.85,
      quality: 0.88,
    },
    hireDate: '',
    salary: 2800,
  },
  {
    id: 'market-3',
    name: '루나',
    role: '프로젝트 매니저',
    avatar: '/pixel-agents/luna.png',
    status: 'idle',
    level: 1,
    experience: 0,
    skills: ['Agile', 'Scrum', 'Communication'],
    stats: {
      efficiency: 0.88,
      reliability: 0.90,
      speed: 0.75,
      quality: 0.85,
    },
    hireDate: '',
    salary: 3500,
  },
  {
    id: 'market-4',
    name: '제이크',
    role: '데이터 분석가',
    avatar: '/pixel-agents/jake.png',
    status: 'idle',
    level: 1,
    experience: 0,
    skills: ['Python', 'R', 'Machine Learning'],
    stats: {
      efficiency: 0.80,
      reliability: 0.85,
      speed: 0.72,
      quality: 0.82,
    },
    hireDate: '',
    salary: 3200,
  },
  {
    id: 'market-5',
    name: '에이미',
    role: '콘텐츠 크리에이터',
    avatar: '/pixel-agents/amy.png',
    status: 'idle',
    level: 1,
    experience: 0,
    skills: ['Writing', 'SEO', 'Social Media'],
    stats: {
      efficiency: 0.85,
      reliability: 0.78,
      speed: 0.88,
      quality: 0.80,
    },
    hireDate: '',
    salary: 2500,
  },
];

export default function MarketplacePage() {
  const { addAgent } = useAgentStore();

  const handleHire = (agent: Agent) => {
    const hiredAgent: Agent = {
      ...agent,
      id: `hired-${Date.now()}`,
      hireDate: new Date().toISOString(),
      level: 1,
      experience: 0,
    };
    
    addAgent(hiredAgent);
    alert(`${agent.name} 님을 고용했습니다!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">에이전트 마켓</h1>
          <p className="text-gray-500 mt-1">
            새로운 Pixel Lab 에이전트를 고용하여 팀을 강화하세요.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg">🚀 빠른 고용</h3>
            <p className="text-blue-100 mt-2">
              원하는 에이전트를 즉시 고용하여 프로젝트에 투입하세요.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg">📊 성장 가능</h3>
            <p className="text-purple-100 mt-2">
              에이전트는 작업을 수행하며 경험치를 쌓고 레벨업합니다.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg">🎯 특화 스킬</h3>
            <p className="text-green-100 mt-2">
              각 에이전트는 고유한 스킬셋을 보유하고 있습니다.
            </p>
          </div>
        </div>

        {/* Agent Grid */}
        <AgentGrid
          agents={marketplaceAgents}
          onSelectAgent={() => {}}
          onHireAgent={handleHire}
          isMarketplace={true}
        />
      </div>
    </DashboardLayout>
  );
}
