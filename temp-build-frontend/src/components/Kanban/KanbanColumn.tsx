'use client';

import { motion } from 'framer-motion';
import { Todo, TodoColumnId } from '@/types';
import { KanbanTaskCard } from './KanbanTaskCard';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface KanbanColumnProps {
  id: TodoColumnId;
  label: string;
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onRemove: (id: string) => void;
  onAdd: (title: string) => void;
}

export function KanbanColumn({ id, label, todos, onUpdate, onRemove, onAdd }: KanbanColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAdd(newTitle.trim());
      setNewTitle('');
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-[300px] md:w-[350px] flex flex-col h-full snap-center"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sticky top-0 z-20 bg-black/60 backdrop-blur-md py-2 px-1">
        <h3 className="typo-h3 text-white flex items-center gap-3 tracking-snug-sm !font-serif italic font-bold">
          {label}
          <span className="typo-tech text-[9px] px-2 py-0.5 rounded-full border border-primary/30 text-primary font-black">
            {todos.length}
          </span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col gap-4">
        {/* Add Task Input */}
        {isAdding ? (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-surface p-4 rounded-xl border border-primary/30 shadow-glow-amber mb-2"
          >
            <textarea
              autoFocus
              className="w-full bg-transparent border-none text-white text-sm focus:ring-0 resize-none p-0"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
                if (e.key === 'Escape') setIsAdding(false);
              }}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-1 hover:text-white text-text-secondary"
              >
                <X size={18} />
              </button>
              <button
                type="submit"
                className="text-xs font-bold bg-primary text-black px-3 py-1 rounded-lg hover:bg-primary-hover"
              >
                Add
              </button>
            </div>
          </motion.form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors py-2 px-1 group"
          >
            <Plus size={18} className="group-hover:scale-110 transition-transform" />
            <span>Add Task</span>
          </button>
        )}

        {/* Task List */}
        {todos.map((todo) => (
          <KanbanTaskCard
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}

        {todos.length === 0 && !isAdding && (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl py-12 px-4 text-center">
            <p className="text-text-secondary text-sm">No tasks here yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
