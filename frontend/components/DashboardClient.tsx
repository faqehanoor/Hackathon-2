'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatRelativeTime } from '@/lib/utils';
import { CheckCircle2, Circle, Clock, TrendingUp, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useChatBot } from '@/context/ChatBotContext';

export default function DashboardClient({ userName }: { userName: string }) {
  const { user } = useUser();
  const { toggleChatBot } = useChatBot();
  const { stats, allTodos } = useTodos();

  const recentTodos = allTodos
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section with animated gradient text */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="typo-tech text-primary-light font-medium tracking-wide">
              Your Personal Hub
            </span>
          </div>
          <h1 className="typo-display text-4xl sm:text-5xl mb-3">
            <span className="text-text-primary">Welcome back, </span>
            <span className="typo-gradient">{user?.firstName || user?.fullName || userName}!</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Ready to conquer your goals? Let's make today productive and meaningful.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Progress Ring Card */}
          <Card className="lg:col-span-2 relative overflow-hidden group shadow-glow-amber hover:shadow-glow-teal transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="typo-h3 text-text-primary">Overall Progress</h3>
                  <p className="typo-tech text-xs text-text-secondary">Your productivity journey</p>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-panel"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#progressGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 176 }}
                      animate={{ strokeDashoffset: 176 - (176 * completionRate) / 100 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="drop-shadow-lg"
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-text-primary">{completionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Mini Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
                  <p className="text-xs text-text-secondary">Total</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                  <p className="text-xs text-text-secondary">Done</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <p className="text-2xl font-bold text-orange-400">{stats.active}</p>
                  <p className="text-xs text-text-secondary">Pending</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-violet-400" />
                <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <Link href="/dashboard/todos" className="block">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Circle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">Add New Todo</p>
                      <p className="text-xs text-text-secondary">Capture your next task</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                  </motion.div>
                </Link>
                <Link href="/dashboard/todos?filter=active" className="block">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <Clock className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">View Active</p>
                      <p className="text-xs text-text-secondary">{stats.active} tasks waiting</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-orange-400 transition-colors" />
                  </motion.div>
                </Link>
                <Link href="/dashboard/todos?filter=completed" className="block">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">Completed</p>
                      <p className="text-xs text-text-secondary">{stats.completed} tasks done</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-green-400 transition-colors" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Todos Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <h2 className="typo-h3 text-text-primary">Recent Activity</h2>
            </div>
            <Link href="/dashboard/todos" className="typo-tech text-primary hover:text-primary-light transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentTodos.length > 0 ? (
            <div className="space-y-3">
              {recentTodos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="flex items-center gap-4 group">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        todo.completed
                          ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                          : 'border-text-secondary hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20'
                      }`}
                    >
                      {todo.completed && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </motion.button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-text-primary truncate transition-all ${
                          todo.completed ? 'line-through text-text-secondary' : ''
                        }`}
                      >
                        {todo.title}
                      </p>
                      <p className="text-xs text-text-secondary flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(todo.createdAt)}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      todo.completed
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {todo.completed ? 'Done' : 'Active'}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-2">Your journey begins now</h3>
              <p className="text-text-secondary mb-6 max-w-sm mx-auto">
                Start by adding your first todo and watch your productivity soar!
              </p>
              <Link href="/dashboard/todos">
                <Button size="lg" className="shadow-lg shadow-primary/30">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Your First Todo
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-violet-500/10 border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                "The secret of getting ahead is getting started."
              </p>
              <p className="text-sm text-text-secondary">— Mark Twain</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}