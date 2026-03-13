'use client';

import { Task } from '@/types/agent';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play,
  MoreHorizontal,
  Calendar
} from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onTaskComplete?: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const priorityLabels = {
  low: '낮음',
  medium: '중간',
  high: '높음',
  urgent: '긴급',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-600',
  in_progress: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  failed: 'bg-red-100 text-red-600',
};

const statusLabels = {
  pending: '대기 중',
  in_progress: '진행 중',
  completed: '완료',
  failed: '실패',
};

export function TaskBoard({ tasks, onTaskClick, onTaskComplete }: TaskBoardProps) {
  const columns = [
    { id: 'pending', title: '대기 중', tasks: tasks.filter((t) => t.status === 'pending') },
    { id: 'in_progress', title: '진행 중', tasks: tasks.filter((t) => t.status === 'in_progress') },
    { id: 'completed', title: '완료', tasks: tasks.filter((t) => t.status === 'completed') },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">작업 보드</h2>
        <span className="text-sm text-gray-500">총 {tasks.length}개 작업</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${statusColors[column.id as keyof typeof statusColors]?.split(' ')[0].replace('bg-', 'bg-') || 'bg-gray-400'}`} />
                <h3 className="font-medium text-gray-700">{column.title}</h3>
              </div>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onTaskClick?.(task)}
                >
                  {/* Priority Badge */}
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {task.description}
                  </p>

                  {/* Progress Bar */}
                  {task.status === 'in_progress' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>진행률</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      {task.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(task.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {task.status === 'in_progress' && onTaskComplete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskComplete(task.id);
                        }}
                        className="flex items-center gap-1 text-green-600 hover:text-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        완료
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {column.tasks.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  작업이 없습니다
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
