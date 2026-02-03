'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Todo, TodoColumnId } from '@/types';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onRemove: (id: string) => void;
  onAdd: (title: string, columnId: TodoColumnId) => void;
}

const COLUMNS: { id: TodoColumnId; label: string }[] = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
];

export function KanbanBoard({ todos, onUpdate, onRemove, onAdd }: KanbanBoardProps) {
  const groupedTodos = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = todos
        .filter((t) => (t.columnId || 'todo') === col.id)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return acc;
    }, {} as Record<TodoColumnId, Todo[]>);
  }, [todos]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        <motion.div
          className="flex gap-6 min-w-max px-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              todos={groupedTodos[col.id]}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onAdd={(title) => onAdd(title, col.id)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
