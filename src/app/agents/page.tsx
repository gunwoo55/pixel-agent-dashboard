'use client';

import { Sidebar } from '@/components/Sidebar';
import { AgentGrid } from '@/components/AgentGrid';

export default function AgentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">에이전트 관리</h1>
            <p className="text-gray-500 mt-1">모든 에이전트를 조회하고 관리합니다</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <AgentGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
