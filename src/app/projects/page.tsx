'use client';

import { Sidebar } from '@/components/Sidebar';
import { useAgentStore } from '@/store/agentStore';
import { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Users, 
  ArrowRight,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

const statusConfig = {
  planning: { label: '기획중', color: 'bg-gray-100 text-gray-600' },
  active: { label: '진행중', color: 'bg-blue-100 text-blue-600' },
  paused: { label: '일시정지', color: 'bg-yellow-100 text-yellow-600' },
  completed: { label: '완료', color: 'bg-green-100 text-green-600' },
};

const priorityConfig = {
  low: { label: '낮음', color: 'bg-gray-100 text-gray-600' },
  medium: { label: '중간', color: 'bg-blue-100 text-blue-600' },
  high: { label: '높음', color: 'bg-orange-100 text-orange-600' },
};

export default function ProjectsPage() {
  const { projects, agents, tasks, addProject } = useAgentStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    priority: 'medium' as const,
    startDate: '',
  });

  const handleAddProject = () => {
    if (!newProject.name) return;
    
    addProject({
      id: `proj-${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      status: 'planning',
      progress: 0,
      agents: [],
      tasks: [],
      startDate: newProject.startDate || new Date().toISOString().split('T')[0],
      priority: newProject.priority,
    });
    
    setShowAddModal(false);
    setNewProject({ name: '', description: '', priority: 'medium', startDate: '' });
  };

  const getProjectTasks = (taskIds: string[]) => {
    return tasks.filter((t) => taskIds.includes(t.id));
  };

  const getProjectAgents = (agentIds: string[]) => {
    return agents.filter((a) => agentIds.includes(a.id));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">프로젝트 관리</h1>
              <p className="text-gray-500 mt-1">모든 프로젝트를 조회하고 관리합니다</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 프로젝트
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const status = statusConfig[project.status];
              const priority = priorityConfig[project.priority];
              const projectTasks = getProjectTasks(project.tasks);
              const projectAgents = getProjectAgents(project.agents);
              
              return (
                <div 
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priority.color}`}>
                          {priority.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">진행률</span>
                      <span className="font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{projectAgents.length}명</span>
                    </div>
                  </div>

                  {projectAgents.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">참여 에이전트</p>
                      <div className="flex -space-x-2">
                        {projectAgents.slice(0, 4).map((agent) => (
                          <div 
                            key={agent.id}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm border-2 border-white"
                            title={agent.name}
                          >
                            {agent.avatar}
                          </div>
                        ))}
                        {projectAgents.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                            +{projectAgents.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500">등록된 프로젝트가 없습니다</p>
            </div>
          )}
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">새 프로젝트 추가</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트명</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">낮음</option>
                    <option value="medium">중간</option>
                    <option value="high">높음</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleAddProject}
                  disabled={!newProject.name}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
