'use client';

import { useAgentStore } from '@/store/agentStore';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FolderKanban, 
  Settings,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', href: '/' },
  { icon: Users, label: '에이전트', href: '/agents' },
  { icon: ClipboardList, label: '작업', href: '/tasks' },
  { icon: FolderKanban, label: '프로젝트', href: '/projects' },
  { icon: BarChart3, label: '통계', href: '/stats' },
  { icon: Settings, label: '설정', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const stats = useAgentStore((state) => state.getStats());

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-xl">🦊</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">Pixel Corp</h1>
            <p className="text-xs text-gray-500">AI Agent Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Stats Summary */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-3 text-sm opacity-90">회사 현황</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-80">활성 에이전트</span>
              <span className="font-semibold">{stats.activeAgents}/{stats.totalAgents}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">진행중인 작업</span>
              <span className="font-semibold">{stats.inProgressTasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">평균 효율</span>
              <span className="font-semibold">{stats.averageEfficiency}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          © 2024 Pixel Corp
        </p>
      </div>
    </aside>
  );
}
