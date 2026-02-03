'use client';

import { motion } from 'framer-motion';
import { Activity, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function IntelligencePanel() {
  const stats = [
    { label: 'Project Velocity', value: '84%', icon: Activity, detail: '+12% from last week' },
    { label: 'System Health', value: 'Stable', icon: ShieldCheck, detail: 'p99 latency < 40ms' },
    { label: 'Completion rate', value: '18/24', icon: Zap, detail: '6 tasks in progress' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.5, type: 'spring', stiffness: 300, damping: 25 }}
          className="relative group overflow-hidden bg-surface p-6 rounded-3xl border border-white/[0.05] hover:border-primary/20 transition-all duration-500"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover:border-primary/20 transition-colors">
                <stat.icon size={20} className="text-primary" />
              </div>
              <TrendingUp size={16} className="text-primary/40" />
            </div>

            <div>
              <p className="text-[9px] text-primary font-black uppercase tracking-[0.3em] pb-2">
                {stat.label}
              </p>
              <h3 className="text-3xl font-normal text-white tracking-widest leading-none font-serif italic">
                {stat.value}
              </h3>
            </div>

            <div className="pt-3 border-t border-white/[0.05]">
              <p className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.2em] opacity-60 italic">
                {stat.detail}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
