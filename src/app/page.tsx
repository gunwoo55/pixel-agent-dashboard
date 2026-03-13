'use client';

import { Sidebar } from '@/components/Sidebar';
import { StatsCards } from '@/components/StatsCards';
import { AgentGrid } from '@/components/AgentGrid';
import { TaskBoard } from '@/components/TaskBoard';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
            <p className="text-gray-500 mt-1">Pixel Corp 에이전트 관리 시스템</p>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <StatsCards />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Agents Section */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">에이전트 현황</h2>
                </div>
                <AgentGrid />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">최근 작업</h2>
                </div>
                <TaskBoard limit={5} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
