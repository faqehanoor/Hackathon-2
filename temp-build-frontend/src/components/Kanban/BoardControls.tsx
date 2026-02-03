'use client';

import { motion } from 'framer-motion';
import { Kanban, Filter, Search, Plus, Focus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useFocusStore } from '@/context/FocusStore';
import { cn } from '@/lib/utils';

interface BoardControlsProps {
  onAddClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BoardControls({ onAddClick, searchQuery, setSearchQuery }: BoardControlsProps) {
  const { focusedCardId, clearFocus } = useFocusStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.2)]">
          <Kanban className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-normal text-white tracking-tighter italic font-serif">
            Project Board
          </h1>
          <p className="text-[9px] text-primary font-black uppercase tracking-[0.4em] mt-1 opacity-70">
            Workspace / Todos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Focus Mode Indicator */}
        {focusedCardId && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFocus}
            className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary text-primary rounded-xl text-xs font-bold shadow-glow-amber"
          >
            <Focus size={14} className="animate-pulse" />
            Focus Mode
          </motion.button>
        )}

        <Button onClick={onAddClick} size="sm" className="hidden sm:flex">
          <Plus size={18} />
          <span className="ml-2">Add Task</span>
        </Button>
      </div>
    </div>
  );
}
