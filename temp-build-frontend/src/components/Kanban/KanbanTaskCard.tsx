'use client';

import { motion } from 'framer-motion';
import { Todo } from '@/types';
import { useFocusStore } from '@/context/FocusStore';
import { cn } from '@/lib/utils';
import { Trash2, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface KanbanTaskCardProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onRemove: (id: string) => void;
}

export function KanbanTaskCard({ todo, onUpdate, onRemove }: KanbanTaskCardProps) {
  const { focusedCardId, setFocus } = useFocusStore();

  const isFocused = todo.id === focusedCardId;
  const isAnotherFocused = focusedCardId !== null && !isFocused;

  const priorityColors = {
    0: 'bg-white/20',
    1: 'bg-primary shadow-[0_0_10px_rgba(255,255,0,0.3)]',
    2: 'bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
  };

  const priorityLabels = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
  };

  return (
    <motion.div
      layout
      className={cn(
        'transition-all duration-500',
        isFocused ? 'scale-[1.02] z-20' : 'z-10',
        isAnotherFocused ? 'opacity-30 grayscale-[0.8]' : 'opacity-100'
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => setFocus(isFocused ? null : todo.id)}
    >
      <SpotlightCard
        className={cn(
          'transition-all duration-500',
          isFocused ? 'border-primary/50 ring-1 ring-primary/20 shadow-glow-amber' : 'border-white/[0.05]'
        )}
        glowColor={isFocused ? 'rgba(255, 255, 0, 0.25)' : 'rgba(255, 255, 0, 0.12)'}
      >
        {/* Priority Bar */}
        <div className={cn('h-1 w-full', priorityColors[todo.priority])} />

        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <h4
              className={cn(
                'font-bold text-white transition-all tracking-tight leading-snug',
                todo.columnId === 'completed' && 'line-through text-text-secondary opacity-50'
              )}
            >
              {todo.title}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(todo.id);
              }}
              className="opacity-0 group-hover/spotlight:opacity-100 p-1 hover:text-error transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {todo.description && (
            <p className="text-xs text-text-secondary line-clamp-2 font-medium leading-relaxed opacity-80">
              {todo.description}
            </p>
          )}

          {/* Tags & Metadata */}
          <div className="flex flex-wrap gap-2">
            {(todo.tags || ['Focus', 'Sprint']).map((tag) => (
              <span
                key={tag}
                className="typo-tech text-[9px] px-2 py-0.5 rounded-full border border-primary/20 text-primary bg-primary/5"
              >
                {tag}
              </span>
            ))}
            <span className="typo-tech text-[9px] px-2 py-0.5 rounded-full border border-white/5 text-text-secondary bg-white/5">
              {todo.estimatedTime || '2h'}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 typo-tech text-[10px] text-text-secondary">
                <AlertCircle size={10} className={cn(todo.priority === 2 && 'text-orange-500')} />
                {priorityLabels[todo.priority]}
              </div>

              {todo.columnId === 'completed' ? (
                <div className="flex items-center gap-1 typo-tech text-[10px] text-primary">
                  <CheckCircle size={10} />
                  Done
                </div>
              ) : (
                <div className="flex items-center gap-1 typo-tech text-[10px] text-text-secondary opacity-60">
                  <Clock size={10} />
                  {new Date(todo.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>

            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-surface bg-panel flex items-center justify-center text-[8px] font-black text-white/50"
                  title="Collaborator"
                >
                  {String.fromCharCode(64 + i + (todo.title.charCodeAt(0) % 20))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
