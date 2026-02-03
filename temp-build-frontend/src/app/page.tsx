'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Sparkles, Shield, Rocket, Zap, CheckCircle2, Globe, Cpu, Layers, Fingerprint, Code2, ZapIcon, LockIcon } from 'lucide-react';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, isLoaded, router]);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Simple Task Management',
      description: 'Add, edit, and delete tasks with ease. Keep track of everything in one place.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      title: 'Smart Filtering',
      description: 'Filter tasks by status. See what is active, completed, or view everything at once.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your data stays on your device. No cloud, no servers, just you and your tasks.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Responsive Design',
      description: 'Use TodoFlow on any device. Beautiful on desktop, tablet, and mobile.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Initialize',
      description: 'Create your secure account in seconds with just an email.',
    },
    {
      number: '02',
      title: 'Architect',
      description: 'Organize your tasks into meaningful streams of work.',
    },
    {
      number: '03',
      title: 'Execute',
      description: 'Track progress and complete goals with precision efficiency.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background lines */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </div>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Version Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-8 group cursor-default"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse relative z-10" />
              <span className="typo-tech text-[10px] text-primary tracking-[0.2em] relative z-10">v2.0 STABLE RELEASE</span>
            </motion.div>

            <div className="relative mb-12">
              {/* Unique Neural Pulse Background element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300%] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />

              <h1 className="typo-display text-5xl sm:text-7xl lg:text-8xl">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white block mb-4"
                >
                  Manage tasks with
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="typo-gradient block leading-[0.9] drop-shadow-[0_0_30px_rgba(255,255,0,0.3)] pb-4"
                >
                  modern elegance
                </motion.span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-4 mb-12"
            >
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
                Experience the next generation of productivity. Orchestrate your life with
                high-fidelity AI-assisted workflows and biometric security.
              </p>
              <div className="flex gap-4 items-center typo-tech text-[10px] text-primary/60 tracking-widest">
                <span>ENCRYPTION: AES-256</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>LATENCY: &lt; 2MS</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>STATUS: OPERATIONAL</span>
              </div>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="typo-display text-7xl sm:text-8xl text-white/[0.03] absolute -top-10 -left-4 pointer-events-none">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <h3 className="typo-h3 text-white mb-3 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="typo-h2 mb-4">
              <span className="text-text-primary">Everything you need to</span>
              <br />
              <span className="typo-gradient">stay productive</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="card-hover h-full shadow-glow-amber/5 hover:shadow-glow-teal transition-all">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="typo-h3 text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Uptime', value: '99.9%', icon: Zap },
              { label: 'Security', value: 'AES-256', icon: Shield },
              { label: 'Speed', value: '< 50ms', icon: Rocket },
              { label: 'Tasks Done', value: '1.2M+', icon: CheckCircle2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="typo-h2 text-white mb-1">{stat.value}</div>
                <div className="typo-tech text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Ecosystem Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-square w-full max-w-[400px] mx-auto relative">
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-secondary/10 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-amber">
                    <Cpu className="w-12 h-12 text-black" />
                  </div>
                </div>
                {/* Orbiting Icons */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-secondary" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center shadow-lg">
                  <Fingerprint className="w-6 h-6 text-accent-violet" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <div className="typo-tech text-primary tracking-widest">ECOSYSTEM v2.0</div>
              <h2 className="typo-h2 text-white">Seamlessly integrated across all your devices.</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Experience a unified task management system that synchronizes across your workspace.
                Whether you're on a high-end workstation or a mobile terminal, your progress
                is persistent and secured with biometric-grade encryption.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time synchronization protocol',
                  'Advanced biometric data protection',
                  'Cross-platform neural architecture',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-primary font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fancy Tiers/Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="typo-tech text-primary mb-4">PREMIUM MODULES</div>
            <h2 className="typo-display text-4xl sm:text-5xl text-white">Ascend to your peak performance.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quantum Core',
                price: 'Free',
                features: ['Unlimited local tasks', 'Basic filtering', 'Standard encryption'],
                icon: ZapIcon,
                color: 'primary',
                glow: 'shadow-glow-amber',
              },
              {
                title: 'Neural Link',
                price: 'Pro',
                features: ['Cloud synchronization', 'AI Task Intelligence', 'Multi-device support'],
                icon: Code2,
                color: 'secondary',
                glow: 'shadow-glow-teal',
                featured: true,
              },
              {
                title: 'Vault Matrix',
                price: 'Ultra',
                features: ['Zero-knowledge privacy', 'Advanced analytics', 'Priority L1 Support'],
                icon: LockIcon,
                color: 'accent-violet',
                glow: 'shadow-glow-amber',
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  'relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden group',
                  tier.featured ? 'bg-white/[0.03] border-primary/30 scale-105 z-10' : 'bg-transparent border-white/10 hover:border-white/20'
                )}
              >
                {tier.featured && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-black typo-tech text-[9px] rounded-bl-xl font-bold">
                    RECOMMENDED
                  </div>
                )}
                <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-8 bg-surface border border-white/10 group-hover:scale-110 transition-transform duration-500', tier.glow)}>
                  <tier.icon className={cn('w-6 h-6', `text-${tier.color}`)} />
                </div>
                <div className="typo-tech text-[10px] text-text-secondary mb-2">{tier.price}</div>
                <h3 className="typo-h3 text-white mb-6 tracking-tight">{tier.title}</h3>
                <ul className="space-y-4 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.featured ? 'primary' : 'ghost'} className="w-full">Initialize Module</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-text-secondary mb-6">
                Create your account and start managing tasks today.
              </p>
              <Link href="/signup">
                <Button size="lg">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-400 to-cyan-500" />
              <span className="font-semibold text-text-primary">TodoFlow</span>
            </div>
            <p className="text-sm text-text-secondary">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
