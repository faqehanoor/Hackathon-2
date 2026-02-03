'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from '@/hooks/useTodos';
import { KanbanBoard } from '@/components/Kanban/KanbanBoard';
import { BoardControls } from '@/components/Kanban/BoardControls';
import { IntelligencePanel } from '@/components/Dashboard/IntelligencePanel';

export default function TodosPage() {
  const {
    todos: allTodos,
    add,
    update,
    remove,
  } = useTodos();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on search
  const filteredTodos = allTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BoardControls
          onAddClick={() => {
            const title = window.prompt('Enter task title');
            if (title) add(title, 'todo');
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </motion.div>

      <IntelligencePanel />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <KanbanBoard
          todos={filteredTodos}
          onUpdate={update}
          onRemove={remove}
          onAdd={add}
        />
      </motion.div>

      {/* Footer Stats / Helpful Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex items-center justify-between text-[10px] text-text-secondary uppercase tracking-widest font-bold"
      >
        <div>
          Total Tasks: {allTodos.length}
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> Low
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> High
          </span>
        </div>
      </motion.div>
    </div>
  );
}
