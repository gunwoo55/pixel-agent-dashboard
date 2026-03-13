'use client';

import { Sidebar } from '@/components/Sidebar';
import { useAgentStore } from '@/store/agentStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function StatsPage() {
  const { agents, tasks } = useAgentStore();
  const stats = useAgentStore((state) => state.getStats());

  // Prepare data for charts
  const statusData = [
    { name: '대기중', value: agents.filter(a => a.status === 'idle').length, color: '#22c55e' },
    { name: '작업중', value: agents.filter(a => a.status === 'working').length, color: '#3b82f6' },
    { name: '휴식중', value: agents.filter(a => a.status === 'resting').length, color: '#eab308' },
    { name: '오프라인', value: agents.filter(a => a.status === 'offline').length, color: '#9ca3af' },
  ];

  const taskStatusData = [
    { name: '대기', value: tasks.filter(t => t.status === 'pending').length },
    { name: '진행중', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: '검토중', value: tasks.filter(t => t.status === 'review').length },
    { name: '완료', value: tasks.filter(t => t.status === 'completed').length },
  ];

  const efficiencyData = agents.map(agent => ({
    name: agent.name,
    efficiency: agent.efficiency,
    level: agent.level,
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">통계</h1>
            <p className="text-gray-500 mt-1">팀 및 프로젝트 성과를 분석합니다</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Status Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">에이전트 상태 분포</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Status Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">작업 상태 분포</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Agent Efficiency */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">에이전트별 효율성</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalAgents}</p>
              <p className="text-sm text-gray-500 mt-1">전체 에이전트</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
              <p className="text-sm text-gray-500 mt-1">완료된 작업</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.averageEfficiency}%</p>
              <p className="text-sm text-gray-500 mt-1">평균 효율</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {Math.round((stats.completedTasks / (stats.totalTasks || 1)) * 100)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">작업 완료율</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
